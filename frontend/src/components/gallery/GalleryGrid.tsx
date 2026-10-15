"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import type { MediaAsset } from "@/types";
import { kindLabel } from "@/data/media";
import { cn } from "@/lib/cn";

export interface GalleryItem {
  asset: MediaAsset;
  category: string;
}

/** Repeating rhythm of tile shapes for a balanced, editorial masonry. */
const shapes = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "sm:row-span-2",
  "",
  "sm:col-span-2",
  "",
  "sm:row-span-2",
  "sm:col-span-2",
];

export function GalleryGrid({
  items,
  filterable = false,
}: {
  items: GalleryItem[];
  filterable?: boolean;
}) {
  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category)))];
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? items : items.filter((i) => i.category === filter);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = (i: number, el: HTMLElement) => {
    triggerRef.current = el;
    setOpenIndex(i);
  };
  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + visible.length) % visible.length)),
    [visible.length],
  );

  // Sync the native <dialog> with state (gives focus trapping + Escape for free).
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (openIndex !== null && !d.open) d.showModal();
    if (openIndex === null && d.open) {
      d.close();
      triggerRef.current?.focus();
    }
  }, [openIndex]);

  // Transient UI: close if this route is hidden by Activity.
  useLayoutEffect(() => () => setOpenIndex(null), []);

  const current = openIndex !== null ? visible[openIndex] : null;

  return (
    <div>
      {filterable && (
        <div role="group" aria-label="Filter gallery" className="no-scrollbar mb-10 flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                "min-h-11 shrink-0 border px-5 text-[0.68rem] font-semibold tracking-[0.2em] uppercase transition-colors",
                filter === c ? "border-ink bg-ink text-cream" : "border-line text-ink-soft hover:border-ink hover:text-ink",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <ul className="grid auto-rows-[44vw] grid-flow-dense grid-cols-2 gap-2 sm:auto-rows-[15rem] sm:grid-cols-4 sm:gap-3 lg:auto-rows-[17rem]">
        {visible.map((item, i) => (
          <li key={item.asset.id} className={cn("relative", shapes[i % shapes.length])}>
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className="group relative block size-full overflow-hidden bg-sand"
              aria-label={`View larger: ${item.asset.alt}`}
            >
              <Image
                src={item.asset.image}
                alt=""
                fill
                placeholder="blur"
                sizes="(min-width: 640px) 50vw, 50vw"
                className="object-cover transition-transform duration-[1.4s] ease-(--ease-luxe) group-hover:scale-105"
                style={{ objectPosition: item.asset.focus ?? "50% 50%" }}
              />
              <span className="absolute inset-0 bg-night/0 transition-colors duration-500 group-hover:bg-night/25" />
              <span className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-cream/90 text-ink opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Maximize2 aria-hidden="true" className="size-4" />
              </span>
              <span className="absolute top-3 left-3 bg-night/55 px-2 py-1 text-[0.55rem] font-medium tracking-[0.14em] text-cream/90 uppercase backdrop-blur-sm">
                {item.category}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="lightbox m-0 size-full max-h-none max-w-none bg-transparent p-0 text-cream"
        aria-label="Image viewer"
        onClose={close}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-8 sm:py-5">
              <p className="text-xs tracking-[0.2em] text-cream/70 uppercase tabular-nums">
                {String((openIndex ?? 0) + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={close}
                className="inline-flex size-11 items-center justify-center rounded-full border border-cream/30 hover:bg-cream hover:text-ink"
                aria-label="Close image viewer"
                autoFocus
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1 px-2 sm:px-20" onClick={(e) => e.target === e.currentTarget && close()}>
              <div className="relative size-full">
                <Image
                  key={current.asset.id}
                  src={current.asset.image}
                  alt={current.asset.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              <button
                type="button"
                onClick={() => step(-1)}
                className="absolute top-1/2 left-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 bg-night/40 hover:bg-cream hover:text-ink sm:left-5"
                aria-label="Previous image"
              >
                <ArrowLeft aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="absolute top-1/2 right-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 bg-night/40 hover:bg-cream hover:text-ink sm:right-5"
                aria-label="Next image"
              >
                <ArrowRight aria-hidden="true" className="size-5" />
              </button>
            </div>

            <div className="px-4 py-4 text-center sm:px-8 sm:py-6">
              <p className="font-display text-xl text-cream italic">{current.asset.caption ?? current.asset.alt}</p>
              <p className="mt-1 text-[0.65rem] tracking-[0.14em] text-cream/55 uppercase">
                {kindLabel[current.asset.kind]}
                {current.asset.credit && (
                  <>
                    {" · Photo: "}
                    <a href={current.asset.credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-cream">
                      {current.asset.credit.author}
                    </a>{" "}
                    · {current.asset.credit.license}
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
