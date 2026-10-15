"use client";

import { useState } from "react";
import Link from "next/link";
import { categoryName, signatureDishes } from "@/data/menu";
import { Media } from "@/components/ui/Media";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * Editorial dish index: hovering or focusing a dish name swaps the large
 * image (desktop). On small screens each dish shows its own image inline.
 */
export function SignatureDishes() {
  const [active, setActive] = useState(0);
  const current = signatureDishes[active];

  return (
    <section aria-labelledby="dishes-title" className="section-y bg-cream">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index="05">Signature dishes</Eyebrow>
            <h2 id="dishes-title" className="mt-6 text-display-2">
              From the Wazwan
              <span className="block italic-accent text-gold-deep">to the grill.</span>
            </h2>
          </div>
          <p className="text-ink-soft lg:col-span-5">
            A selection of dishes from Shamyana&apos;s menu. Prices and today&apos;s availability are confirmed at the
            restaurant.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Sticky preview (desktop) */}
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden">
              {signatureDishes.map((d, i) => (
                <div
                  key={d.id}
                  aria-hidden={i !== active}
                  className={cn(
                    "absolute inset-0 transition-[opacity,transform] duration-700 ease-(--ease-luxe)",
                    i === active ? "scale-100 opacity-100" : "scale-105 opacity-0",
                  )}
                >
                  <Media asset={d.image} sizes="40vw" placeholderLabel={d.name} />
                </div>
              ))}
              <p className="absolute right-4 bottom-4 z-[2] bg-cream px-3 py-1.5 text-[0.62rem] font-semibold tracking-[0.2em] text-ink uppercase">
                {categoryName(current.categoryId)}
              </p>
            </div>
          </div>

          <ol className="border-t border-line lg:col-span-7">
            {signatureDishes.map((d, i) => (
              <li key={d.id} className="border-b border-line">
                <Link
                  href={`/restaurant/menu#${d.categoryId}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[2.25rem_1fr] gap-x-4 py-6 sm:grid-cols-[3rem_1fr_auto] sm:py-8"
                >
                  <span className="pt-2 text-xs font-semibold text-gold-deep tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span
                      className={cn(
                        "block font-display text-[clamp(1.9rem,1.4rem+2vw,3.25rem)] leading-none transition-colors duration-300",
                        i === active ? "text-gold-deep lg:italic" : "text-ink group-hover:text-gold-deep",
                      )}
                    >
                      {d.name}
                    </span>
                    <span className="mt-3 block max-w-lg text-ink-soft">{d.description}</span>
                  </span>
                  <span className="col-start-2 mt-3 text-[0.62rem] font-semibold tracking-[0.2em] text-ink-soft uppercase sm:col-start-auto sm:mt-2">
                    {categoryName(d.categoryId)}
                  </span>
                  {/* Inline image on small screens */}
                  <span className="relative col-span-2 mt-5 block aspect-[16/10] overflow-hidden lg:hidden">
                    <Media asset={d.image} sizes="100vw" placeholderLabel={d.name} />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex justify-end">
          <TextLink href="/restaurant/menu">View the full menu</TextLink>
        </div>
      </div>
    </section>
  );
}
