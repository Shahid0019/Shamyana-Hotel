import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MediaAsset } from "@/types";
import { media } from "@/data/media";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/motion/Reveal";

const panels: Array<{
  index: string;
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  asset: MediaAsset;
}> = [
  {
    index: "01",
    eyebrow: "Stay at Shamyana",
    title: "Rest by Dal Lake",
    text: "Comfortable rooms on Boulevard Road, a short walk from the shikara ghats.",
    cta: "Explore Rooms",
    href: "/rooms",
    asset: media.dalLakeShikaras,
  },
  {
    index: "02",
    eyebrow: "Dine at Shamyana",
    title: "The flavours of Kashmir",
    text: "Wazwan classics alongside Indian, barbecue and Chinese-style favourites.",
    cta: "Explore Dining",
    href: "/restaurant",
    asset: media.wazwanSpread,
  },
];

export function StayOrDine() {
  return (
    <section id="stay-or-dine" aria-label="Stay or dine" className="bg-cream">
      <Reveal className="grid md:grid-cols-2" stagger={0.18} variant="mask">
        {panels.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            data-reveal
            className="group on-dark relative isolate flex aspect-[4/5] items-end overflow-hidden text-cream md:aspect-auto md:min-h-[min(92svh,60rem)]"
          >
            <Media
              asset={p.asset}
              sizes="(min-width: 768px) 50vw, 100vw"
              tagPosition="top-left"
              className="-z-10"
              imgClassName="transition-transform duration-[1.6s] ease-(--ease-luxe) group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/85 via-night/20 to-transparent transition-opacity duration-700 group-hover:opacity-90" />

            <div className="w-full p-6 sm:p-10 lg:p-14">
              <p className="eyebrow flex items-center gap-3 text-gold-light">
                <span className="tabular-nums">{p.index}</span>
                <span aria-hidden="true" className="h-px w-8 bg-current" />
                {p.eyebrow}
              </p>
              <h2 className="mt-5 text-display-3 text-cream">{p.title}</h2>
              <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-(--ease-luxe) md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-visible:grid-rows-[1fr]">
                <p className="overflow-hidden text-cream/80">
                  <span className="block max-w-sm pt-4">{p.text}</span>
                </p>
              </div>
              <span className="mt-7 inline-flex items-center gap-3 border-b border-cream/40 pb-1.5 text-[0.7rem] font-semibold tracking-[0.24em] uppercase transition-colors group-hover:border-cream">
                {p.cta}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}
