import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Room } from "@/types";
import { Media } from "@/components/ui/Media";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export const TBC = "Confirm on enquiry";

export function roomFacts(room: Room) {
  return [
    { label: "Bed", value: room.details.bed },
    { label: "Size", value: room.details.area },
    { label: "Occupancy", value: room.details.occupancy },
    { label: "View", value: room.details.view },
  ];
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

/** Editorial room card: image above, facts and actions below. */
export function RoomCard({ room, index, className }: { room: Room; index: number; className?: string }) {
  return (
    <article className={cn("group flex h-full flex-col bg-paper", className)}>
      <Link href={`/rooms/${room.slug}`} className="relative block aspect-[16/10] overflow-hidden" tabIndex={-1} aria-hidden="true">
        <Media
          asset={room.images[0]}
          sizes="(min-width: 1024px) 45vw, 90vw"
          placeholderLabel={room.shortName}
          imgClassName="transition-transform duration-[1.4s] ease-(--ease-luxe) group-hover:scale-105"
        />
        <span className="absolute top-4 right-4 z-[1] bg-cream/90 px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.2em] text-ink tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="font-display text-[clamp(1.6rem,1.3rem+1vw,2.1rem)] leading-tight text-ink">
          <Link href={`/rooms/${room.slug}`} className="transition-colors hover:text-gold-deep">
            {room.name}
          </Link>
        </h3>
        <p className="mt-3 text-ink-soft">{room.summary}</p>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 text-sm">
          {roomFacts(room).map((f) => (
            <div key={f.label}>
              <dt className="eyebrow text-gold-deep">{f.label}</dt>
              <dd className="mt-1 text-ink">
                {f.value ?? (
                  <Link href={`/book-stay?room=${room.slug}`} className="text-ink-soft italic underline decoration-line underline-offset-4 hover:text-ink">
                    {TBC}
                  </Link>
                )}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Room features">
          {room.features.map((f) => (
            <li key={f} className="border border-line px-3 py-1.5 text-xs text-ink-soft">
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-4 pt-8">
          <ButtonLink href={`/book-stay?room=${room.slug}`} variant="solid">
            Enquire to Book
          </ButtonLink>
          <Link
            href={`/rooms/${room.slug}`}
            className="inline-flex min-h-11 items-center gap-2 text-[0.7rem] font-semibold tracking-[0.24em] text-ink uppercase hover:text-gold-deep"
          >
            View Details <ArrowUpRight aria-hidden="true" className="size-3.5" />
            <span className="sr-only">for {room.name}</span>
          </Link>
          {room.pricePerNight !== null && (
            <p className="ml-auto text-sm text-ink-soft">
              From <span className="font-display text-xl text-ink">{formatPrice(room.pricePerNight)}</span> / night
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
