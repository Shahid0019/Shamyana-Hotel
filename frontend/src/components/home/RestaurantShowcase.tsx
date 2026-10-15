"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signatureDishes, categoryName } from "@/data/menu";
import { media } from "@/data/media";
import { cn } from "@/lib/cn";

const featured = signatureDishes.filter((d) => d.image);

/** Split dining section: full-height food photograph + walnut panel with a dish carousel. */
export function RestaurantShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const dish = featured[index];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % featured.length), 5000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section aria-labelledby="dining-title" className="on-dark grid bg-walnut text-cream lg:grid-cols-2">
      <div className="relative min-h-[60svh] overflow-hidden lg:min-h-[100svh]">
        <Image
          src={media.roganJosh.image}
          alt={media.roganJosh.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          placeholder="blur"
          className="object-cover"
        />
        <span className="absolute top-4 left-4 bg-night/55 px-2.5 py-1 text-[0.6rem] tracking-[0.12em] text-cream/90 uppercase backdrop-blur-sm">
          Representative image
        </span>
      </div>

      <div
        className="flex flex-col items-center justify-center px-(--gutter) py-20 text-center lg:px-16 lg:py-24"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <p className="eyebrow text-cream/70">Kashmiri Wazwan &amp; multi-cuisine</p>
        <h2 id="dining-title" className="mt-5 text-display-2 text-cream">
          Shamyana Restaurant
        </h2>

        <figure className="mt-10 w-full max-w-[17rem]" aria-roledescription="carousel" aria-label="Signature dishes">
          <div className="relative aspect-[4/5] overflow-hidden">
            {featured.map((d, i) => (
              <Image
                key={d.id}
                src={d.image!.image}
                alt={i === index ? d.image!.alt : ""}
                aria-hidden={i !== index}
                fill
                sizes="17rem"
                placeholder="blur"
                className={cn(
                  "object-cover transition-[opacity,transform] duration-1000 ease-(--ease-luxe)",
                  i === index ? "scale-100 opacity-100" : "scale-110 opacity-0",
                )}
              />
            ))}
          </div>
          <figcaption className="mt-5" aria-live="polite">
            <span className="block font-display text-2xl text-cream">{dish.name}</span>
            <span className="eyebrow mt-1 block text-gold-light">{categoryName(dish.categoryId)}</span>
          </figcaption>
        </figure>

        <p className="mt-8 max-w-md leading-[1.9] text-cream/80">
          Slow-cooked Rista, crisp Tabak Maaz and delicate Nadru Yakhni sit alongside Mughlai curries, barbecue, biryanis
          and Chinese-style favourites — for local families and travellers alike, indoors or out.
        </p>

        <div className="mt-8 flex gap-2.5" role="group" aria-label="Choose a dish">
          {featured.map((d, i) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${d.name}`}
              aria-pressed={i === index}
              className="flex h-6 items-center"
            >
              <span className={cn("block h-1.5 rounded-full transition-all duration-500", i === index ? "w-6 bg-cream" : "w-1.5 bg-cream/40")} />
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link href="/restaurant/menu" className="eyebrow border-b border-cream/50 pb-1 text-cream hover:border-cream">
            View the menu
          </Link>
          <Link href="/reserve-table" className="eyebrow border-b border-cream/50 pb-1 text-cream hover:border-cream">
            Reserve a table
          </Link>
        </div>
      </div>
    </section>
  );
}
