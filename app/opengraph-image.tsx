import { ImageResponse } from "next/og";

export const alt = "Turf Cricket Manager — Built for the Boundary";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Kept to system-sans here for build simplicity. To use the site's actual
 * Teko/Manrope faces, fetch the .ttf/.woff bytes as an ArrayBuffer (next/font
 * can't be used directly inside ImageResponse) and pass them via the
 * `fonts` option — e.g. fetch(new URL('./teko-600.ttf', import.meta.url)).
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "#0A0D0B",
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(245,246,244,0.04) 0px, rgba(245,246,244,0.04) 1px, transparent 1px, transparent 4px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 28,
            color: "#EDEFEA",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#22C55E",
            }}
          />
          Turf Cricket Manager
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#F5F6F4",
            maxWidth: 920,
          }}
        >
          Built for the boundary.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            padding: "18px 28px",
            borderRadius: 2,
            border: "1px solid rgba(245,246,244,0.15)",
            background: "#12160F",
            fontSize: 40,
            fontWeight: 600,
            color: "#22C55E",
            letterSpacing: 1,
          }}
        >
          178/6 (18.4 ov)
        </div>
      </div>
    ),
    { ...size }
  );
}
