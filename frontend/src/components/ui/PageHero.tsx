import type { ReactNode } from "react";
import type { MediaAsset } from "@/types";
import { Media } from "./Media";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/** Cinematic, framed hero used by inner pages — centred title with an italic accent line. */
export function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  image,
  crumbs,
  children,
  size = "lg",
}: {
  eyebrow: string;
  title: string;
  /** Italic second line */
  accent?: string;
  intro?: string;
  image?: MediaAsset | null;
  crumbs: Crumb[];
  children?: ReactNode;
  size?: "lg" | "md";
}) {
  return (
    <section
      className={cn(
        "on-dark relative isolate flex items-center justify-center overflow-hidden bg-night text-cream",
        size === "lg" ? "min-h-[min(92svh,58rem)]" : "min-h-[min(74svh,46rem)]",
      )}
    >
      <Parallax amount={14} className="-z-10">
        <Media asset={image} sizes="100vw" preload tagPosition="bottom-right" />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(20_14_10/0.35),rgb(20_14_10/0.7))]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-3 border border-cream/25 sm:inset-6 lg:inset-8" />

      <Reveal immediate className="relative w-full px-6 pt-32 pb-20 text-center" stagger={0.12}>
        <div data-reveal className="flex justify-center">
          <Breadcrumbs items={crumbs} />
        </div>
        <p data-reveal className="eyebrow mt-10 flex items-center justify-center gap-3 text-cream/85">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" /> {eyebrow}
        </p>
        <h1 data-reveal className="mx-auto mt-6 max-w-4xl text-display-1 text-cream">
          {title}
          {accent && <span className="block italic-accent text-gold-light">{accent}</span>}
        </h1>
        {intro && (
          <p data-reveal className="mx-auto mt-7 max-w-xl text-base leading-[1.9] text-cream/85">
            {intro}
          </p>
        )}
        {children && (
          <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3">
            {children}
          </div>
        )}
      </Reveal>
    </section>
  );
}
