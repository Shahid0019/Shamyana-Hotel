"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { rooms } from "@/data/rooms";
import { media } from "@/data/media";
import { cn } from "@/lib/cn";
import { TBC } from "@/components/rooms/RoomCard";

/**
 * Rooms showcase. A softly blurred copy of the room photo fills the stage
 * (so the property's modest-resolution photos never look stretched), while
 * the crisp photograph sits in a framed panel with thumbnails.
 */
export function FeaturedRooms() {
  const [index, setIndex] = useState(0);
  const [photo, setPhoto] = useState(0);
  const count = rooms.length;
  const room = rooms[index];
  const photos = room.images.length ? room.images : [media.dalLakeStill];
  const current = photos[Math.min(photo, photos.length - 1)];

  const selectRoom = (i: number) => {
    setIndex(i);
    setPhoto(0);
  };
  const go = (dir: 1 | -1) => selectRoom((index + dir + count) % count);

  const facts = [
    { label: "Bed", value: room.details.bed },
    { label: "Size", value: room.details.area },
    { label: "Sleeps", value: room.details.occupancy },
    { label: "View", value: room.details.view },
  ];

  return (
    <section
      aria-labelledby="rooms-title"
      aria-roledescription="carousel"
      className="on-dark relative isolate overflow-hidden bg-night py-20 text-cream md:py-28"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      {/* Blurred ambient backdrop */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image
          key={current.id}
          src={current.image}
          alt=""
          fill
          sizes="40vw"
          className="scale-125 object-cover opacity-70 blur-2xl motion-safe:animate-[fade-up_1s_var(--ease-luxe)]"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/75 via-night/55 to-night/80" />

      {/* Header */}
      <div className="container-x relative">
        <p className="eyebrow flex items-center gap-3 text-cream/90">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" /> Rooms
        </p>
        <div className="mt-6 text-center">
          <h2 id="rooms-title" className="text-display-2 text-cream">
            Your place to rest
            <span className="block italic-accent">by Dal Lake</span>
          </h2>
          <div
            role="tablist"
            aria-label="Room types"
            className="no-scrollbar -mx-(--gutter) mt-8 flex gap-2 overflow-x-auto px-(--gutter) md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0"
          >
            {rooms.map((r, i) => (
              <button
                key={r.slug}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => selectRoom(i)}
                className={cn(
                  "min-h-11 shrink-0 rounded-full px-6 text-[0.68rem] font-semibold tracking-[0.2em] uppercase backdrop-blur-md transition-colors duration-500",
                  i === index ? "bg-cream text-ink" : "bg-walnut/60 text-cream hover:bg-walnut/80",
                )}
              >
                {r.shortName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stage */}
      <div className="container-x relative mt-12 grid items-center gap-8 md:mt-16 lg:grid-cols-12 lg:gap-12">
        {/* Photo panel */}
        <div className="lg:order-2 lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] ring-1 ring-cream/15">
            {photos.map((p) => (
              <Image
                key={p.id}
                src={p.image}
                alt={p === current ? `${room.shortName}: ${p.alt}` : ""}
                aria-hidden={p !== current}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                placeholder="blur"
                className={cn(
                  "object-cover transition-[opacity,transform] duration-700 ease-(--ease-luxe)",
                  p === current ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
                )}
              />
            ))}
            <p className="absolute right-4 bottom-4 rounded-full bg-night/60 px-3 py-1 font-display text-lg text-cream backdrop-blur-md" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
              <span className="text-cream/60">/{String(count).padStart(2, "0")}</span>
            </p>
          </div>

          {photos.length > 1 && (
            <div className="mt-4 flex gap-2" role="group" aria-label={`${room.shortName} photos`}>
              {photos.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPhoto(i)}
                  aria-label={`Show photo ${i + 1} of ${photos.length}`}
                  aria-pressed={p === current}
                  className={cn(
                    "relative aspect-[4/3] w-20 overflow-hidden rounded-lg ring-2 transition-all duration-300 sm:w-24",
                    p === current ? "ring-cream" : "opacity-60 ring-transparent hover:opacity-100",
                  )}
                >
                  <Image src={p.image} alt="" fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details card */}
        <div className="lg:order-1 lg:col-span-5">
          <div
            key={room.slug}
            role="tabpanel"
            aria-live="polite"
            className="rounded-2xl border border-cream/15 bg-cream/10 p-6 shadow-[0_20px_60px_rgb(0_0_0/0.25)] backdrop-blur-xl motion-safe:animate-[fade-up_0.8s_var(--ease-luxe)] sm:p-8"
          >
            <h3 className="font-display text-[clamp(2rem,1.6rem+1.4vw,2.75rem)] leading-tight text-cream">{room.shortName}</h3>
            <p className="mt-3 leading-relaxed text-cream/80">{room.summary}</p>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-cream/15 pt-5 text-sm">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[0.6rem] font-semibold tracking-[0.22em] text-cream/60 uppercase">{f.label}</dt>
                  <dd className="mt-1 text-cream">
                    {f.value ?? (
                      <Link
                        href={`/book-stay?room=${room.slug}`}
                        className="italic underline decoration-cream/40 underline-offset-4 opacity-85 hover:opacity-100"
                      >
                        {TBC}
                      </Link>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="eyebrow mt-6 text-cream/70">Included</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {room.features.map((f) => (
                <li key={f} className="rounded-full border border-cream/25 bg-cream/10 px-3 py-1 text-xs text-cream">
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href={`/book-stay?room=${room.slug}`}
                className="inline-flex min-h-11 items-center rounded-full bg-cream px-6 text-[0.65rem] font-semibold tracking-[0.2em] text-ink uppercase transition-colors hover:bg-gold-light"
              >
                Enquire
              </Link>
              <Link href={`/rooms/${room.slug}`} className="eyebrow border-b border-cream/40 pb-0.5 text-cream hover:border-cream">
                Room details
              </Link>
            </div>
          </div>

          {/* Prev / next */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous room"
              className="flex min-h-11 items-center gap-3 text-[0.62rem] font-semibold tracking-[0.3em] text-cream/80 uppercase hover:text-cream"
            >
              <ChevronLeft aria-hidden="true" className="size-5" /> Prev
            </button>
            <div className="flex gap-2" aria-hidden="true">
              {rooms.map((r, i) => (
                <span key={r.slug} className={cn("h-0.5 transition-all duration-700", i === index ? "w-8 bg-cream" : "w-4 bg-cream/40")} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next room"
              className="flex min-h-11 items-center gap-3 text-[0.62rem] font-semibold tracking-[0.3em] text-cream/80 uppercase hover:text-cream"
            >
              Next <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
