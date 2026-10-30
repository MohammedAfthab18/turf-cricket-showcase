"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const TICKER: Array<"•" | "1" | "4" | "6" | "W"> = [
  "•",
  "1",
  "•",
  "4",
  "•",
  "1",
  "6",
  "•",
  "W",
];

function LiveTickCard() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % TICKER.length), 1400);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="panel-bezel col-span-2 flex flex-col justify-between p-6">
      <div>
        <p className="font-body text-sm text-arena-chalk-dim">
          Offline-first · Rust FFI
        </p>
        <p className="mt-1 font-body text-arena-chalk">
          Every ball is scored on-device in a compiled engine — sync happens
          later, scoring never waits for it.
        </p>
      </div>
      <div className="mt-6 flex gap-2">
        {TICKER.map((ev, idx) => (
          <motion.span
            key={idx}
            animate={{ opacity: idx === i ? 1 : 0.3, scale: idx === i ? 1.1 : 1 }}
            className="flex h-8 w-8 items-center justify-center rounded-bezel bg-black/30 font-score text-lg text-arena-glow"
          >
            {ev}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function RuleToggleCard() {
  const [netOut, setNetOut] = useState(true);
  return (
    <div className="panel-bezel p-6">
      <p className="font-body text-sm text-arena-chalk-dim">Custom box rules</p>
      <p className="mt-1 font-body text-arena-chalk">
        Net rebounds count as live play.
      </p>
      <button
        onClick={() => setNetOut((v) => !v)}
        className={`mt-4 w-full rounded-bezel px-4 py-2 font-body text-sm ${
          netOut
            ? "bg-arena-glow text-arena-canvas"
            : "border border-white/15 text-arena-chalk-dim"
        }`}
      >
        Net-out rule: {netOut ? "On" : "Off"}
      </button>
    </div>
  );
}

function PodiumCard() {
  const podium = [
    { name: "R. Iyer", stat: "312 runs" },
    { name: "K. Bhat", stat: "18 wkts" },
    { name: "A. Menon", stat: "9 sixes" },
  ];
  return (
    <div className="panel-bezel row-span-2 p-6">
      <p className="font-body text-sm text-arena-chalk-dim">MVP podium</p>
      <ol className="mt-4 space-y-3">
        {podium.map((p, idx) => (
          <li key={p.name} className="flex items-center justify-between">
            <span className="font-score text-2xl text-arena-amber">
              {idx + 1}
            </span>
            <span className="flex-1 px-3 font-body text-arena-chalk">
              {p.name}
            </span>
            <span className="font-body text-sm text-arena-chalk-dim">
              {p.stat}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function SyncCard() {
  const [synced, setSynced] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setSynced((s) => !s), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="panel-bezel p-6">
      <p className="font-body text-sm text-arena-chalk-dim">Cloud sync</p>
      <div className="mt-4 flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${
            synced ? "bg-arena-glow" : "bg-arena-amber"
          }`}
        />
        <span className="font-body text-sm text-arena-chalk">
          {synced ? "Synced to cloud" : "Queued offline"}
        </span>
      </div>
    </div>
  );
}

export default function BentoFeatures() {
  return (
    <section id="features" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="mb-8 font-body text-3xl font-semibold text-arena-chalk">
        Engineered for the turf
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <LiveTickCard />
        <PodiumCard />
        <RuleToggleCard />
        <SyncCard />
      </div>
    </section>
  );
}
