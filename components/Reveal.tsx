"use client";

/**
 * Reveal — the ONE entrance animation used across every section.
 *
 * Per the creative brief: consistency of a restrained motion vocabulary is
 * itself part of the craft signal. Don't reach for a different entrance
 * per section — wrap content in this instead.
 *
 * On prefers-reduced-motion, `motion` (via next/font-independent CSS) skips
 * the animation and renders content at its resting state immediately —
 * handled by Framer Motion's built-in `useReducedMotion` behavior for
 * `initial`/`whileInView`, so no separate branch is needed here.
 */

import { motion, useReducedMotion } from "motion/react";

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
