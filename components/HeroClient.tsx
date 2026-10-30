"use client";

import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("@/components/Hero3D"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-arena-canvas" />,
});

export default function HeroClient() {
  return <Hero3D />;
}
