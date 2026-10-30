"use client";

/**
 * ScorecardDemo — the "see it score, live" proof point.
 *
 * Deliberately NOT scroll-linked (see CREATIVE_BRIEF.md — the hero HUD
 * ticker is the site's one scroll-driven moment). This one responds to a
 * tap instead: press "Bowl next ball" and the scoreboard updates on the
 * same frame, which is the actual product claim ("scoring never waits").
 * User-triggered motion that shows what changed is explicitly welcome
 * alongside a restrained page — it's the click that earns the animation.
 */

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

type Ball = {
  label: string;
  runs: number;
  wicket?: boolean;
};

const OVERS: Ball[][] = [
  [
    { label: "•", runs: 0 },
    { label: "1", runs: 1 },
    { label: "4", runs: 4 },
    { label: "•", runs: 0 },
    { label: "2", runs: 2 },
    { label: "W", runs: 0, wicket: true },
  ],
  [
    { label: "1", runs: 1 },
    { label: "6", runs: 6 },
    { label: "•", runs: 0 },
    { label: "1", runs: 1 },
    { label: "4", runs: 4 },
    { label: "•", runs: 0 },
  ],
];

const ALL_BALLS = OVERS.flat();
const TOTAL_BALLS = ALL_BALLS.length;

export default function ScorecardDemo() {
  const [ballsBowled, setBallsBowled] = useState(0);
  const reduced = useReducedMotion();

  const bowled = ALL_BALLS.slice(0, ballsBowled);
  const runs = bowled.reduce((sum, b) => sum + b.runs, 0);
  const wickets = bowled.filter((b) => b.wicket).length;
  const completedOvers = Math.floor(ballsBowled / 6);
  const ballsIntoOver = ballsBowled % 6;
  const atEnd = ballsBowled >= TOTAL_BALLS;

  return (
    <div className="panel-bezel p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-body text-sm text-arena-chalk-dim">
            Ball-by-ball, scored on-device
          </p>
          <p className="font-score text-5xl leading-none text-arena-glow">
            {runs}/{wickets}{" "}
            <span className="align-top text-2xl text-arena-chalk-dim">
              ({completedOvers}.{ballsIntoOver} ov)
            </span>
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setBallsBowled(0)}
            className="rounded-bezel border border-white/15 px-4 py-2 font-body text-sm text-arena-chalk-dim transition-colors hover:text-arena-chalk focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arena-glow"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => setBallsBowled((n) => Math.min(TOTAL_BALLS, n + 1))}
            disabled={atEnd}
            className="rounded-bezel bg-arena-glow px-5 py-2 font-body text-sm font-semibold text-arena-canvas transition-opacity disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arena-chalk"
          >
            {atEnd ? "Over complete" : "Bowl next ball"}
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {OVERS.map((over, overIdx) => (
          <div key={overIdx} className="flex items-center gap-2">
            <span className="w-14 shrink-0 font-body text-xs text-arena-chalk-dim">
              Over {overIdx + 1}
            </span>
            <div className="flex gap-2">
              {over.map((ball, ballIdx) => {
                const globalIdx = overIdx * 6 + ballIdx;
                const revealed = globalIdx < ballsBowled;
                return (
                  <div
                    key={ballIdx}
                    className={`flex h-9 w-9 items-center justify-center rounded-bezel font-score text-lg ${
                      revealed
                        ? ball.wicket
                          ? "bg-arena-amber/20 text-arena-amber"
                          : "bg-black/30 text-arena-glow"
                        : "border border-dashed border-white/10"
                    }`}
                  >
                    <AnimatePresence initial={false}>
                      {revealed && (
                        <motion.span
                          key="revealed"
                          initial={reduced ? false : { scale: 0.4, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {ball.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
