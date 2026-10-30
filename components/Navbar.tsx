"use client";

import Link from "next/link";
import { motion } from "motion/react";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#scoring", label: "Live Scoring" },
  { href: "#download", label: "Download" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-arena-canvas/60">
      <Link
        href="/"
        className="flex items-center gap-2 font-score text-xl text-arena-chalk"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-arena-glow opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-arena-glow" />
        </span>
        Turf Cricket Manager
      </Link>

      <nav className="hidden gap-6 font-body text-sm text-arena-chalk-dim md:flex">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="hover:text-arena-chalk">
            {l.label}
          </a>
        ))}
      </nav>

      <motion.a
        href="#download"
        whileHover={{ y: -1 }}
        className="rounded-full bg-arena-glow px-4 py-2 font-body text-sm font-semibold text-arena-canvas"
      >
        Download APK · v1.0.0
      </motion.a>
    </header>
  );
}
