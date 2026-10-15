"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Accessible, dependency-free carousel built on native scroll-snap:
 * touch swipe and trackpad scrolling work natively; arrow buttons and the
 * keyboard (← →) move one slide at a time.
 */
export function Carousel({
  children,
  label,
  slideClassName,
  className,
  tone = "dark",
  controlsPosition = "bottom",
  header,
}: {
  children: ReactNode;
  label: string;
  slideClassName?: string;
  className?: string;
  tone?: "dark" | "light";
  controlsPosition?: "bottom" | "top";
  /** Rendered to the left of the controls */
  header?: ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const slides = Children.toArray(children);
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(count <= 1);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const left = el.scrollLeft;
    let nearest = 0;
    let best = Infinity;
    items.forEach((item, i) => {
      const d = Math.abs(item.offsetLeft - el.offsetLeft - left);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setIndex(nearest);
    setAtStart(left <= 4);
    setAtEnd(left + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const target = items[Math.min(Math.max(index + dir, 0), items.length - 1)];
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  };

  const btn = cn(
    "inline-flex size-12 items-center justify-center rounded-full border transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-30",
    tone === "dark"
      ? "border-ink/25 text-ink hover:enabled:bg-ink hover:enabled:text-cream"
      : "border-cream/35 text-cream hover:enabled:bg-cream hover:enabled:text-ink",
  );

  const controls = (
    <div className="flex items-center justify-between gap-6">
      <div className="min-w-0 flex-1">{header}</div>
      <div className="flex shrink-0 items-center gap-5">
        <p
          className={cn("text-xs font-semibold tracking-[0.2em] tabular-nums", tone === "dark" ? "text-ink-soft" : "text-cream/70")}
          aria-live="polite"
        >
          <span className={tone === "dark" ? "text-ink" : "text-cream"}>{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-2">/</span>
          {String(count).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
          <button type="button" className={btn} onClick={() => go(-1)} disabled={atStart} aria-label="Previous slide">
            <ArrowLeft aria-hidden="true" className="size-4" />
          </button>
          <button type="button" className={btn} onClick={() => go(1)} disabled={atEnd} aria-label="Next slide">
            <ArrowRight aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className={className}>
      {controlsPosition === "top" && <div className="mb-8">{controls}</div>}
      <div
        ref={track}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(-1);
          }
        }}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth focus-visible:outline-offset-8 sm:gap-6"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className={cn("shrink-0 snap-start", slideClassName)}
          >
            {slide}
          </div>
        ))}
      </div>
      {controlsPosition === "bottom" && <div className="mt-8">{controls}</div>}
    </div>
  );
}
