"use client";

/**
 * SmoothScrollProvider — wraps the app in Lenis's inertial scroll.
 *
 * Why Lenis over CSS `scroll-behavior: smooth`: CSS only smooths anchor
 * jumps, not continuous wheel/trackpad/touch scroll. Lenis normalises all
 * three input types into one eased value and exposes it per-frame, which is
 * what the scroll-linked HUD ticker in Hero3D and the Reveal primitive both
 * read from.
 *
 * Accessibility: `prefers-reduced-motion` fully disables Lenis and falls
 * back to native scrolling — not a reduced-duration Lenis instance, an
 * actual no-op. Motion-sensitive visitors get the plain browser scrollbar.
 */

import { useSyncExternalStore } from "react";
import { ReactLenis } from "lenis/react";

function subscribeToReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  if (reducedMotion) {
    // No Lenis instance at all — native scroll, zero animation cost.
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3), // cubic ease-out
        smoothWheel: true,
        touchMultiplier: 1.4, // don't over-smooth touch; it reads as laggy
      }}
    >
      {children}
    </ReactLenis>
  );
}
