import type { NextConfig } from "next";

/**
 * Next.js uses SWC (Speedy Web Compiler) by default for compilation,
 * minification, and bundling with Turbopack.
 *
 * cacheComponents (the `"use cache"` + Partial Prerendering model) is
 * intentionally NOT enabled here. This site has no cached data-fetching —
 * every section renders from static content — so there's nothing for it to
 * do yet. Turn it on later if you add a real data source (a CMS, a live
 * standings API, etc.) that should be cached and revalidated.
 */
const nextConfig: NextConfig = {
  images: {
    // No remote images in this build — every visual is either the R3F
    // canvas or a procedural/CSS treatment. Add remotePatterns here if you
    // later swap the turf texture for a real photo.
    formats: ["image/avif", "image/webp"],
  },

  typedRoutes: true,
};

export default nextConfig;
