# Turf Cricket Manager — Showcase Site

Single-page Awwwards-style showcase. See `CREATIVE_BRIEF.md` before touching
any motion, section, or effect — it names the site's one deliberate
signature moment (the scroll-linked HUD ticker in the hero) so nothing else
gets added on top of it.

## Stack (verified current as of Sep 2026)

| Package | Version | Note |
|---|---|---|
| next | ^16.3.0 | App Router, Turbopack default, `proxy.ts` not needed here (no request interception) |
| react / react-dom | ^19.2.0 | React Compiler stable, `useEffectEvent` available |
| @react-three/fiber | ^9.6.1 | **v8 does not run under React 19** — this is pinned to v9 deliberately, don't let it drift back |
| @react-three/drei | ^10.0.7 | matching major for r3f v9 |
| three | ^0.184.0 | |
| motion | ^12.0.0 | package is `motion`, imported as `motion/react` — not `framer-motion` |
| lenis | ^1.3.26 | imported as `lenis/react` for the `ReactLenis` component |
| tailwindcss | ^4.0.0 | CSS-first `@theme` in `app/globals.css`, no `tailwind.config.ts` |
| qrcode | ^1.5.4 | used server-side in `DownloadSection.tsx` |

Next.js uses SWC (Speedy Web Compiler) for high-performance Rust-based
compilation, minification, and bundling. No Babel configuration or plugins
are required.

`cacheComponents` (the `"use cache"` + Partial Prerendering model) is **not**
enabled — this site has no cached data fetching to speak of, so there's
nothing for it to do. Turn it on if you add a real backend later.

## Setup

```bash
pnpm install
pnpm dev
```

```bash
pnpm build
pnpm start
```

## Structure

```
turf-cricket-showcase/
├── app/
│   ├── layout.tsx          # fonts, SEO metadata, wraps body in SmoothScrollProvider
│   ├── page.tsx             # thin composition layer — all logic lives in components/
│   ├── globals.css          # Tailwind v4 @theme tokens + panel-bezel/led-scan/seam-divider utilities
│   ├── sitemap.ts           # -> /sitemap.xml
│   ├── robots.ts            # -> /robots.txt
│   └── opengraph-image.tsx  # OG/Twitter share image via next/og
├── components/
│   ├── Navbar.tsx
│   ├── Hero3D.tsx                # client, ssr:false — scroll-linked HUD ticker (the one signature moment)
│   ├── SmoothScrollProvider.tsx  # Lenis, wraps <body>
│   ├── Reveal.tsx                # the one section-entrance primitive, used everywhere
│   ├── BentoFeatures.tsx
│   ├── ScorecardDemo.tsx         # tap-to-advance ball-by-ball demo — user-triggered, not scroll-linked
│   ├── DownloadSection.tsx       # async Server Component; QR generated server-side, no client JS
│   ├── JsonLd.tsx                # SoftwareApplication structured data
│   └── Footer.tsx
├── CREATIVE_BRIEF.md
├── next.config.ts
├── package.json
├── postcss.config.mjs           # Tailwind v4's PostCSS plugin
├── eslint.config.mjs            # flat config (current default)
└── tsconfig.json
```

## Notes on choices made while filling gaps

- **`ScorecardDemo.tsx`** is deliberately *not* a second scroll-linked
  effect — the brief is explicit that the hero HUD ticker is the one
  signature moment. This section demonstrates the same "scoring never
  waits" claim through a tap instead: press "Bowl next ball" and the
  scoreboard updates on the same frame. User-triggered motion that shows
  what changed is fine alongside a restrained page; it's the click that
  earns the animation.
- **`DownloadSection.tsx`** is an `async` Server Component — the QR code is
  generated server-side with `qrcode`'s `toDataURL()` during render, not in
  a client-side `useEffect`. No `"use client"` needed, no JS shipped for
  this section.
- **Navbar links** trim down to sections that actually exist on the page
  (`#features`, `#scoring`, `#download`) — the original draft nav had
  `#engine` / `#tournaments` anchors with no matching sections.
- **`Hero3D.tsx`**: fixed `icosahedronGeometry` detail from `16` → `4`.
  Icosahedron detail is `20 · 4^n` faces — `16` would ask the GPU for
  quadrillions of triangles and hang the tab; `4` gives a smooth ~5k-face
  ball at negligible cost. Nothing else in that file needed changes — its
  `useFrame`/`<Html>`/`<Environment>` usage is unchanged between r3f v8→v9.
- Placeholder content you'll want to swap: `APK_URL`/checksum in
  `DownloadSection.tsx`, the MVP podium names in `BentoFeatures.tsx`, and
  the `BASE_URL` domain in `layout.tsx`/`sitemap.ts`/`robots.ts`.
