import HeroClient from "@/components/HeroClient";
import Navbar from "@/components/Navbar";
import BentoFeatures from "@/components/BentoFeatures";
import ScorecardDemo from "@/components/ScorecardDemo";
import DownloadSection from "@/components/DownloadSection";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";

export default function Page() {
  return (
    <>
      <JsonLd />
      <Navbar />

      <section className="relative h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <HeroClient />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-1/4 px-6 text-center">
          <h1 className="mx-auto max-w-3xl font-body text-4xl font-semibold text-arena-chalk md:text-6xl">
            The ultimate turf cricket engine. Built for the boundary.
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-body text-arena-chalk-dim">
            A local-first Rust scoring core means the scoreboard never waits
            for a signal — in a basement net or an open ground.
          </p>
        </div>
      </section>

      <div className="seam-divider" />
      <Reveal>
        <BentoFeatures />
      </Reveal>
      <div className="seam-divider" />

      <section id="scoring" className="mx-auto max-w-4xl px-6 py-24">
        <Reveal>
          <h2 className="mb-8 font-body text-3xl font-semibold text-arena-chalk">
            See it score, live
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <ScorecardDemo />
        </Reveal>
      </section>

      <div className="seam-divider" />
      <Reveal>
        <DownloadSection />
      </Reveal>
      <Footer />
    </>
  );
}
