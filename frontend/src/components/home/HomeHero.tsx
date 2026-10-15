"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BedDouble, UtensilsCrossed } from "lucide-react";
import { media } from "@/data/media";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { HeroBookingBar } from "./HeroBookingBar";

const modes = {
  stay: {
    label: "Stay",
    icon: BedDouble,
    image: media.exteriorSnowNight,
    focus: "50% 58%",
    script: "Stay by the Lake",
    line: "A welcoming retreat on Srinagar's iconic Boulevard Road",
    cta: { href: "/rooms", label: "Explore our rooms" },
  },
  dine: {
    label: "Dine",
    icon: UtensilsCrossed,
    image: media.diningLattice,
    focus: "50% 50%",
    script: "Savour Kashmir",
    line: "Kashmiri Wazwan and multi-cuisine dining by Dal Lake",
    cta: { href: "/restaurant", label: "Discover our restaurant" },
  },
} as const;

type Mode = keyof typeof modes;

export function HomeHero() {
  const [mode, setMode] = useState<Mode>("stay");
  const current = modes[mode];

  return (
    <section
      aria-labelledby="hero-title"
      className="on-dark relative isolate flex min-h-svh flex-col overflow-hidden bg-night text-cream"
    >
      {/* Background video (image shows while loading, and for reduced-motion users) */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image
          src={modes.stay.image.image}
          alt=""
          fill
          sizes="100vw"
          preload
          placeholder="blur"
          className="object-cover"
          style={{ objectPosition: modes.stay.focus }}
        />
        <video
          className="absolute inset-0 size-full object-cover motion-reduce:hidden"
          src="/Creating_promotional_video_for_h…_20261015144730.mp4"
          poster={modes.stay.image.image.src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      {/* Overlays for text legibility */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(20_14_10/0.2),rgb(20_14_10/0.6))]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/55 via-transparent to-night/55" />

      {/* Inset hairline frame */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-3 border border-cream/25 sm:inset-6 lg:inset-8" />

      <Reveal immediate stagger={0.15} delay={0.1} className="relative flex w-full flex-1 flex-col items-center justify-center px-6 pt-28 pb-10 text-center">
        <p data-reveal className="eyebrow text-cream/85">
          Shamyana Hotel &amp; Restaurant · Srinagar
        </p>
        <h1 id="hero-title" data-reveal className="mt-4">
          <span className="sr-only">Stay by the Lake. Savour Kashmir.</span>
          <span
            key={mode}
            aria-hidden="true"
            className="hero-script block font-script text-[clamp(3.4rem,1.8rem+8vw,10rem)] leading-[1.2] font-normal text-cream"
          >
            {current.script}
          </span>
        </h1>
        <p data-reveal className="mx-auto mt-1 max-w-xl text-sm text-cream/85 sm:text-base">
          {current.line}
        </p>

        <div data-reveal className="mt-10">
          <p className="eyebrow text-cream/90">Choose your experience</p>
          <div
            role="group"
            aria-label="Choose your experience"
            className="mt-4 inline-flex rounded-full border border-cream/30 bg-night/35 p-1 backdrop-blur-md"
          >
            {(Object.keys(modes) as Mode[]).map((m) => {
              const Icon = modes[m].icon;
              const active = m === mode;
              return (
                <button
                  key={m}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setMode(m)}
                  className={cn(
                    "flex min-h-10 items-center gap-2 rounded-full px-5 text-[0.68rem] font-semibold tracking-[0.22em] uppercase transition-colors duration-500 sm:px-7",
                    active ? "bg-cream text-ink" : "text-cream/85 hover:text-cream",
                  )}
                >
                  <Icon aria-hidden="true" className={cn("size-3.5", active && "text-gold-deep")} />
                  {modes[m].label}
                </button>
              );
            })}
          </div>
        </div>

        <div data-reveal className="mt-8 flex flex-col items-center gap-3">
          <Link
            href={current.cta.href}
            className="eyebrow border-b border-cream/40 pb-1 text-cream transition-colors hover:border-cream"
          >
            {current.cta.label}
          </Link>
          <a href="#intro" aria-label="Scroll to introduction" className="relative mt-2 block h-14 w-px overflow-hidden bg-cream/25">
            <span className="scroll-cue-line absolute inset-0 bg-cream" />
          </a>
        </div>
      </Reveal>

      {/* Docked availability bar (tablet & desktop; phones use the bottom action bar) */}
      <div className="relative hidden px-6 pb-10 md:block lg:px-14 lg:pb-14">
        <div className="mx-auto max-w-5xl">
          <HeroBookingBar />
        </div>
      </div>
    </section>
  );
}