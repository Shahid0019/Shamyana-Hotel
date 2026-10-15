"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { DietType, MenuItem } from "@/types";
import { menuCategories, menuItems } from "@/data/menu";
import { primaryPhone } from "@/data/site";
import { Media } from "@/components/ui/Media";
import { cn } from "@/lib/cn";

type DietFilter = "all" | DietType;

/** Indian food-labelling style marks: green square-dot for veg, brown triangle for non-veg. */
export function DietMark({ diet }: { diet: MenuItem["diet"] }) {
  if (!diet) {
    return <span className="text-[0.6rem] font-semibold tracking-[0.14em] text-ink-soft uppercase">Ask your server</span>;
  }
  const veg = diet === "veg";
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-semibold tracking-[0.14em] uppercase">
      <span
        aria-hidden="true"
        className={cn("flex size-3.5 items-center justify-center border", veg ? "border-[#2f7a3b]" : "border-[#8a3b1f]")}
      >
        {veg ? (
          <span className="size-1.5 rounded-full bg-[#2f7a3b]" />
        ) : (
          <span className="size-0 border-x-[3.5px] border-b-[6px] border-x-transparent border-b-[#8a3b1f]" />
        )}
      </span>
      <span className={veg ? "text-[#2f7a3b]" : "text-[#8a3b1f]"}>{veg ? "Veg" : "Non-veg"}</span>
    </span>
  );
}

function formatINR(v: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v);
}

export function MenuBrowser() {
  const [query, setQuery] = useState("");
  const [diet, setDiet] = useState<DietFilter>("all");
  const q = useDeferredValue(query.trim().toLowerCase());

  const filtered = useMemo(
    () =>
      menuItems.filter((item) => {
        if (diet !== "all" && item.diet !== diet) return false;
        if (!q) return true;
        return `${item.name} ${item.description}`.toLowerCase().includes(q);
      }),
    [q, diet],
  );

  const filtering = q.length > 0 || diet !== "all";

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Category navigation */}
      <nav aria-label="Menu categories" className="lg:col-span-3">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow hidden text-gold-deep lg:block">Categories</p>
          <ul className="no-scrollbar -mx-(--gutter) flex gap-2 overflow-x-auto px-(--gutter) lg:mx-0 lg:mt-5 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-line lg:px-0">
            {menuCategories.map((c) => {
              const count = filtered.filter((i) => i.categoryId === c.id).length;
              return (
                <li key={c.id} className="shrink-0 lg:border-b lg:border-line">
                  <a
                    href={`#${c.id}`}
                    className="flex min-h-11 items-center justify-between gap-4 border border-line px-4 text-sm whitespace-nowrap transition-colors hover:border-ink lg:border-0 lg:px-0 lg:py-3 lg:font-display lg:text-xl lg:hover:text-gold-deep"
                  >
                    {c.name}
                    <span className="text-xs text-ink-soft tabular-nums">{count}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="lg:col-span-9">
        {/* Search + filters */}
        <div className="sticky top-(--header-h) z-10 -mx-(--gutter) border-b border-line bg-cream/95 px-(--gutter) py-4 backdrop-blur-md lg:mx-0 lg:px-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-sm">
              <label htmlFor="menu-search" className="sr-only">
                Search the menu
              </label>
              <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-0 size-4 -translate-y-1/2 text-gold-deep" />
              <input
                id="menu-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dishes — e.g. Rista, biryani"
                className="field-input pr-8 pl-7"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute top-1/2 right-0 inline-flex size-9 -translate-y-1/2 items-center justify-center text-ink-soft hover:text-ink"
                  aria-label="Clear search"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              )}
            </div>
            <div role="group" aria-label="Dietary filter" className="flex gap-2">
              {(
                [
                  ["all", "All"],
                  ["veg", "Veg"],
                  ["non-veg", "Non-veg"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={diet === id}
                  onClick={() => setDiet(id)}
                  className={cn(
                    "min-h-11 border px-4 text-[0.68rem] font-semibold tracking-[0.18em] uppercase transition-colors",
                    diet === id ? "border-ink bg-ink text-cream" : "border-line text-ink-soft hover:border-ink hover:text-ink",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "dish" : "dishes"} shown
          </p>
        </div>

        {filtering && filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="font-display text-3xl">No dishes match your search.</p>
            <p className="mt-3 text-ink-soft">
              Our full menu is larger than what&apos;s listed here — ask our team or call {primaryPhone.display}.
            </p>
          </div>
        )}

        <div className="space-y-16 pt-10">
          {menuCategories.map((c) => {
            const items = filtered.filter((i) => i.categoryId === c.id);
            if (filtering && items.length === 0) return null;
            return (
              <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="scroll-mt-44">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink/20 pb-4">
                  <h2 id={`${c.id}-title`} className="text-display-4">
                    {c.name}
                  </h2>
                  <p className="text-sm text-ink-soft">{c.intro}</p>
                </div>

                {items.length === 0 ? (
                  <p className="py-8 text-ink-soft italic">
                    Dishes in this section are being confirmed with the kitchen. Please ask our team for today&apos;s
                    selection.
                  </p>
                ) : (
                  <ul className="divide-y divide-line">
                    {items.map((item) => (
                      <li key={item.id} className="grid grid-cols-[1fr_auto] gap-x-5 gap-y-3 py-6 sm:grid-cols-[7rem_1fr_auto] sm:gap-x-7">
                        <div className="relative col-span-2 aspect-[16/9] overflow-hidden bg-sand sm:col-span-1 sm:aspect-square">
                          {item.image ? (
                            <Media asset={item.image} sizes="(min-width: 640px) 7rem, 100vw" showTag={false} />
                          ) : (
                            <Media asset={null} sizes="7rem" placeholderLabel={item.name} className="[&_p:last-child]:hidden [&_p]:text-base" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-display text-2xl leading-tight">{item.name}</h3>
                          <p className="mt-1.5 max-w-xl text-sm text-ink-soft">{item.description}</p>
                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                            <DietMark diet={item.diet} />
                            {item.allergens?.length ? (
                              <span className="text-[0.65rem] text-ink-soft">Contains: {item.allergens.join(", ")}</span>
                            ) : null}
                            {item.image && <span className="text-[0.6rem] tracking-[0.1em] text-ink-soft/80 uppercase">Representative image</span>}
                          </div>
                        </div>
                        <p className="self-start text-right font-display text-xl whitespace-nowrap">
                          {item.price !== null ? formatINR(item.price) : <span className="text-sm text-ink-soft italic">Price at restaurant</span>}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>

        <p className="mt-16 border-t border-line pt-6 text-sm text-ink-soft">
          This digital menu lists a selection of dishes and is updated as the kitchen confirms its current menu. Prices,
          availability and ingredients may change — please inform our team of any allergies or dietary requirements
          before ordering.
        </p>
      </div>
    </div>
  );
}
