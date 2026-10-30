"use client";

/**
 * Hero3D — the showstopper canvas.
 *
 * Scene composition:
 *  - Turf floor: a large plane with a tiled synthetic-grass texture (procedural
 *    stripe shader below, swap for a real texture map if you have one) fading
 *    to black at the horizon via exponential fog.
 *  - Cricket ball: an icosphere with a bump-mapped "seam" ring, tilts toward
 *    the pointer using pointer-driven spring rotation (no full orbit-drag —
 *    this is a hero object, not a product-viewer).
 *  - Floodlight rig: three cone SpotLights from high angles, matching the
 *    "night turf" brief, plus a low warm rim light for the amber accent.
 *  - HUD overlay: an HTML scoreboard readout anchored to the ball via
 *    <Html> from drei, so it stays crisp text (not baked into the 3D scene).
 *
 * Perf: pointer-tilt only (cheap), capped pixel ratio, and a static <img>
 * fallback for prefers-reduced-motion / low-end devices (see bottom).
 *
 * Signature moment (see CREATIVE_BRIEF.md): the HUD score ticks forward in
 * lockstep with scroll progress through the hero, rather than sitting at a
 * static number. This is the site's one Awwwards-caliber beat — deliberately
 * not paired with any other scroll-linked effect elsewhere on the page.
 */

import { Suspense, useMemo, useRef, useState, useEffect, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Environment } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

const FINAL_RUNS = 178;
const FINAL_WICKETS = 6;
const FINAL_OVERS = 18.4;

/** Scroll progress through the hero viewport, 0 → 1. Native `scroll` event
 * works whether Lenis is driving the scrollTop or the browser is (Lenis
 * updates real scrollTop rather than virtualizing it), so no Lenis-specific
 * API is needed here. */
function useHeroScrollProgress() {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const range = window.innerHeight * 0.8;
        setProgress(Math.min(1, Math.max(0, window.scrollY / range)));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return reduced ? 1 : progress;
}

function subscribeToLowPower(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getIsLowPowerSnapshot() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4;
  return reduced || (coarsePointer && lowCores);
}

function useIsLowPower() {
  return useSyncExternalStore(
    subscribeToLowPower,
    getIsLowPowerSnapshot,
    () => false
  );
}

function SeamRing({ rotationOffset = 0 }: { rotationOffset?: number }) {
  // A torus following the ball's "seam" great-circle, offset per hemisphere.
  return (
    <mesh rotation={[Math.PI / 2, rotationOffset, 0]}>
      <torusGeometry args={[1.001, 0.012, 8, 128]} />
      <meshStandardMaterial color="#F5F6F4" roughness={0.6} metalness={0} />
    </mesh>
  );
}

function CricketBall({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  const runs = Math.round(FINAL_RUNS * progress);
  const overs = (FINAL_OVERS * progress).toFixed(1);
  // Wickets tick in as discrete steps rather than scaling smoothly —
  // wickets are events, not a continuous quantity.
  const wickets = Math.min(FINAL_WICKETS, Math.floor(progress * (FINAL_WICKETS + 1)));

  useFrame((state, delta) => {
    if (!group.current) return;
    // Pointer position in [-1, 1], eased toward with a spring-like lerp.
    target.current.x = THREE.MathUtils.lerp(target.current.x, state.pointer.y * 0.35, 0.06);
    target.current.y = THREE.MathUtils.lerp(target.current.y, state.pointer.x * 0.45, 0.06);
    group.current.rotation.x = target.current.x;
    group.current.rotation.y += delta * 0.15 + target.current.y * delta; // idle spin + tilt
  });

  return (
    <group ref={group}>
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1, 4]} />
        <meshPhysicalMaterial
          color="#8B2E2E"
          roughness={0.35}
          clearcoat={0.6}
          clearcoatRoughness={0.25}
          sheen={0.4}
          sheenColor="#C97B2E"
        />
      </mesh>
      <SeamRing rotationOffset={0} />
      <SeamRing rotationOffset={Math.PI / 2} />

      {/* HUD readout, billboarded, offset above the ball — the values tick
          forward with scroll progress (see useHeroScrollProgress above) */}
      <Html position={[0, 1.6, 0]} center distanceFactor={6} occlude>
        <div className="panel-bezel led-scan px-4 py-2 shadow-live-glow whitespace-nowrap">
          <div className="font-score text-3xl leading-none tracking-wide text-arena-glow">
            {runs}/{wickets}{" "}
            <span className="text-arena-chalk-dim text-xl align-top">({overs} ov)</span>
          </div>
        </div>
      </Html>
    </group>
  );
}

function TurfFloor() {
  // Procedural mown-stripe pattern via a canvas texture — no external asset needed.
  const texture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const stripes = 16;
    for (let i = 0; i < stripes; i++) {
      ctx.fillStyle = i % 2 === 0 ? "#173F2A" : "#1F5D3C";
      ctx.fillRect(0, (i * size) / stripes, size, size / stripes);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(6, 24);
    return tex;
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, -4]} receiveShadow>
      <planeGeometry args={[40, 80]} />
      <meshStandardMaterial map={texture} roughness={0.9} />
    </mesh>
  );
}

function FloodlightRig() {
  return (
    <>
      <spotLight
        position={[6, 8, 4]}
        angle={0.35}
        penumbra={0.5}
        intensity={120}
        color="#EAF6FF"
        castShadow
      />
      <spotLight
        position={[-6, 7, 5]}
        angle={0.35}
        penumbra={0.5}
        intensity={90}
        color="#EAF6FF"
      />
      {/* Low warm rim light — the amber "stump light" accent from the brief */}
      <pointLight position={[0, -0.5, 3]} intensity={12} color="#F59E0B" distance={6} />
      <ambientLight intensity={0.15} />
    </>
  );
}

function Scene({ progress }: { progress: number }) {
  return (
    <>
      <fog attach="fog" args={["#0A0D0B", 6, 22]} />
      <FloodlightRig />
      <TurfFloor />
      <CricketBall progress={progress} />
      <Suspense fallback={null}>
        <Environment preset="night" />
      </Suspense>
    </>
  );
}

export default function Hero3D() {
  const lowPower = useIsLowPower();
  const progress = useHeroScrollProgress();

  if (lowPower) {
    // Static fallback: same HUD readout, no canvas, no JS animation cost —
    // but still ticks with scroll, since it's a cheap DOM text update, not
    // a WebGL cost. Only the 3D scene is dropped for low-power devices.
    const runs = Math.round(FINAL_RUNS * progress);
    const overs = (FINAL_OVERS * progress).toFixed(1);
    const wickets = Math.min(FINAL_WICKETS, Math.floor(progress * (FINAL_WICKETS + 1)));
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-arena-canvas">
        <div className="panel-bezel led-scan px-6 py-4 shadow-live-glow">
          <div className="font-score text-4xl text-arena-glow">
            {runs}/{wickets}{" "}
            <span className="text-arena-chalk-dim text-2xl align-top">({overs} ov)</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.4, 5], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <Scene progress={progress} />
    </Canvas>
  );
}
