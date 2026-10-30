# Master Creative Brief — Turf Cricket Manager Showcase
### (Research-backed, Awwwards/CSS Design Awards caliber)

This supersedes the original prompt's design section. Use this as the
standing brief for any further section, animation, or copy work on this
site — it encodes what's actually separating 2026 award winners from
generic template sites, not just aesthetic preference.

---

## What the research says (Awwwards / FWA / CSS Design Awards, 2026 SOTD pattern)

Current Site-of-the-Day winners consistently share five traits, and the
absence of any one of them is what knocks a well-built site out of
award contention:

1. **Restraint** — one or two strong signature moments, not ten small
   effects. A site that does five things loudly reads as a template; a
   site that does one thing precisely reads as authored.
2. **Scroll-driven narrative** — the scroll itself is the storytelling
   device, not a container you fill with static sections.
3. **Technical craft** — Lighthouse mobile 90+ is table stakes now, not
   a differentiator. Janky scroll or a slow LCP disqualifies a site
   regardless of visual quality.
4. **Accessibility as craft, not compliance** — winners visibly respect
   `prefers-reduced-motion` rather than bolting on a checkbox.
5. **Distinctive over decorative** — generic particle fields and
   copy-paste 3D backgrounds are now a negative signal (over-saturated);
   a custom shader or interaction tied to the *product's own vocabulary*
   reads as bespoke.

**Implication for this brief:** the site's one signature moment is the
**live scoreboard HUD tied to scroll** — not a generic particle
background, not five different hover effects per card. Everything else
on the page should be quiet by comparison.

---

## The one strong moment (signature interaction)

As the visitor scrolls past the hero, the floating cricket ball's HUD
readout (`178/6 (18.4 ov)`) **ticks forward in scroll-linked lockstep** —
the run count and over count advance as a function of scroll progress,
not on a timer. This is the site's single Awwwards-caliber beat: it's
specific to a cricket-scoring product (nothing generic about it), it's
driven by the interaction medium itself (scroll), and it directly
demonstrates the product's core claim — that scoring updates happen in
real time, with zero lag — inside the first viewport.

Everything else on the page (card hovers, section reveals) stays
understated so this moment isn't diluted.

## Motion language

- **Lenis** for the base scroll feel — inertial, eased, identical
  across wheel/trackpad/touch. This is the floor every winning site
  sits on; native `scroll-behavior: smooth` isn't sufficient because it
  only smooths anchor jumps, not continuous scroll.
- **Section reveals**: a single `Reveal` primitive (fade + 16px rise,
  triggered once via `whileInView`) used everywhere. No per-section
  bespoke entrance — consistency of a *restrained* motion vocabulary is
  itself part of the craft signal.
- **No parallax stacking** — at most one layer of parallax (the hero
  headline drifting slightly slower than the canvas beneath it). Winners
  in 2026 are marked down for parallax that doesn't serve the narrative.
- **`prefers-reduced-motion`** disables Lenis entirely (native scroll),
  freezes the scroll-linked HUD ticker at its final value instead of
  hiding it, and turns every `Reveal` into an instant opacity swap. This
  is implemented below, not left as a TODO.

## Non-negotiables carried over from the existing brief

- Palette, type (`Teko`/`Manrope`), and the scoreboard-bezel panel
  system stay exactly as built — the research validates them (dark
  arena canvas + amber accent is a distinctive, product-specific
  choice, not a generic dark-mode default).
- No new particle backgrounds, no generic WebGL shader washes behind
  content — if 3D is added anywhere beyond the existing hero ball, it
  must render something specific to cricket (a pitch, a stump, a seam),
  never abstract geometry for atmosphere alone.
