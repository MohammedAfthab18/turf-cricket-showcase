import type { Metadata, Viewport } from "next";
import { Teko, Manrope } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "./globals.css";

const teko = Teko({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-teko",
});
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

const BASE_URL = "https://turfcricketmanager.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Turf Cricket Manager — Built for the Boundary",
    template: "%s | Turf Cricket Manager",
  },
  description:
    "Offline-first turf and box-cricket tournament management app. A compiled Rust scoring engine means zero latency and zero signal required — download the Android APK.",
  keywords: [
    "turf cricket app",
    "box cricket scoring app",
    "offline cricket scorer",
    "cricket tournament management app",
    "cricket league app Android",
  ],
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Turf Cricket Manager",
    title: "Turf Cricket Manager — Built for the Boundary",
    description:
      "Offline-first turf and box-cricket scoring, powered by a compiled Rust engine.",
    locale: "en_US",
    // images: resolved automatically from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Turf Cricket Manager — Built for the Boundary",
    description:
      "Offline-first turf and box-cricket scoring. Zero latency, zero signal required.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0D0B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${teko.variable} ${manrope.variable}`}>
      <body className="bg-arena-canvas font-body antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
