"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { experiences, experiencesNote } from "@/data/experiences";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * Horizontally scrolling experience cards that tilt in 3D according to their
 * distance from the centre of the row. Native scroll = touch swipe works.
 */
export function ExperiencesSlider() {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const total = String(experiences.length).padStart(2, "0");

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const centre = rect.left + rect.width / 2;
    for (const card of Array.from(el.querySelectorAll<HTMLElement>("[data-card]"))) {
      const r = card.getBoundingClientRect();
      const offset = (r.left + r.width / 2 - centre) / (rect.width / 2); // -1 … 1
      const clamped = Math.max(-1.2, Math.min(1.2, offset));
      card.style.transform = `perspective(1200px) rotateY(${clamped * -16}deg) translateZ(${-Math.abs(clamped) * 50}px)`;
    }
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = (card?.offsetWidth ?? 320) + 32;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section aria-labelledby="experiences-title" className="overflow-hidden bg-cream py-24 md:py-36">
      <Reveal className="container-x mx-auto max-w-2xl text-center">
        <p data-reveal className="eyebrow flex items-center justify-center gap-3 text-ink-soft">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" /> Experiences
        </p>
        <h2 id="experiences-title" data-reveal className="mt-8 text-display-2">
          Days by the lake,
          <span className="block italic-accent">evenings in the old city.</span>
        </h2>
        <p data-reveal className="mx-auto mt-8 max-w-lg leading-[1.9] text-ink-soft">
          Shikara mornings, Mughal Gardens and bazaars, chinar-lined walks — Srinagar at its most beautiful begins
          right outside our door.
        </p>
      </Reveal>

      <div className="mt-16 md:mt-20">
        <div
          ref={track}
          tabIndex={0}
          role="region"
          aria-label="Experiences around Shamyana"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-(--gutter) px-(--gutter) py-8 md:gap-10"
        >
          {experiences.map((e, i) => (
            <article
              key={e.id}
              data-card
              className="group relative aspect-[4/5] w-[78vw] shrink-0 snap-start sm:snap-center overflow-hidden bg-sand shadow-[0_30px_60px_-30px_rgb(43_33_25/0.5)] transition-transform duration-300 ease-out will-change-transform sm:w-[22rem] lg:w-[calc((100vw-2*var(--gutter)-5rem)/3)] lg:max-w-[28rem]"
            >
              <Image
                src={e.image.image}
                alt={e.image.alt}
                fill
                sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 78vw"
                placeholder="blur"
                className="object-cover transition-transform duration-[1.4s] ease-(--ease-luxe) group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-night/25" />
              <span className="absolute top-5 left-5 font-display text-sm tracking-[0.3em] text-cream/85 tabular-nums">
                {String(i + 1).padStart(2, "0")} / {total}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6 text-cream sm:p-8">
                <h3 className="font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.25rem)] leading-tight">{e.title}</h3>
                <span aria-hidden="true" className="mt-3 block h-px w-8 bg-cream/60 transition-all duration-500 group-hover:w-14" />
                <p className="mt-4 max-h-0 overflow-hidden text-sm text-cream/85 opacity-0 transition-all duration-700 group-hover:max-h-40 group-hover:opacity-100 group-focus-within:max-h-40 group-focus-within:opacity-100 max-md:max-h-40 max-md:opacity-100">
                  {e.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="container-x mt-8 flex flex-col items-center gap-6">
        <div className="flex gap-3">
          {(
            [
              [-1, "Previous experience", ArrowLeft, atStart],
              [1, "Next experience", ArrowRight, atEnd],
            ] as const
          ).map(([dir, label, Icon, disabled]) => (
            <button
              key={label}
              type="button"
              onClick={() => go(dir)}
              disabled={disabled}
              aria-label={label}
              className={cn(
                "inline-flex size-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors",
                "hover:enabled:bg-ink hover:enabled:text-cream disabled:opacity-30",
              )}
            >
              <Icon aria-hidden="true" className="size-4" />
            </button>
          ))}
        </div>
        <p className="max-w-xl text-center text-xs leading-relaxed text-ink-soft">{experiencesNote}</p>
      </div>
    </section>
  );
}
