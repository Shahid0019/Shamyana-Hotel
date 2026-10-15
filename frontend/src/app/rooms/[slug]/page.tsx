import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Clock } from "lucide-react";
import { getRoom, rooms } from "@/data/rooms";
import { media } from "@/data/media";
import { site } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Media } from "@/components/ui/Media";
import { AmenitiesGrid } from "@/components/home/Amenities";
import { RoomCard, TBC, formatPrice, roomFacts } from "@/components/rooms/RoomCard";
import { Reveal } from "@/components/motion/Reveal";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/rooms/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) return {};
  return pageMetadata({
    title: room.name,
    description: `${room.summary} Hotel Shamyana – Dal View, Boulevard Road, Srinagar.`,
    path: `/rooms/${room.slug}`,
  });
}

export default async function RoomPage({ params }: PageProps<"/rooms/[slug]">) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();

  const others = rooms.filter((r) => r.slug !== room.slug);
  const gallery = room.images;

  return (
    <>
      <PageHero
        eyebrow="Rooms"
        title={room.shortName}
        accent={room.name.includes("(") ? room.name.slice(room.name.indexOf("(")).replace(/[()]/g, "") : undefined}
        intro={room.summary}
        image={gallery[0] ?? media.dalLakeMorning}
        crumbs={[
          { name: "Rooms", path: "/rooms" },
          { name: room.shortName, path: `/rooms/${room.slug}` },
        ]}
        size="md"
      >
        <ButtonLink href={`/book-stay?room=${room.slug}`} variant="light">
          Enquire About Availability
        </ButtonLink>
      </PageHero>

      {/* Photo gallery */}
      <section aria-label={`${room.shortName} photographs`} className="bg-cream pt-6">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:grid-rows-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "relative overflow-hidden",
                  i === 0 ? "col-span-2 aspect-[16/10] md:row-span-2 md:aspect-auto md:min-h-[30rem]" : "aspect-[4/3]",
                  i === 0 && "md:col-span-2",
                  i > 0 && "md:col-span-2 md:aspect-auto",
                )}
              >
                <Media asset={gallery[i]} sizes="(min-width: 768px) 50vw, 100vw" placeholderLabel={i === 0 ? room.shortName : "Room photograph"} />
              </div>
            ))}
          </div>
          {gallery.length === 0 && (
            <p className="mt-3 text-xs text-ink-soft">
              Approved photographs of this room are being prepared. Images shown on this site are never stock photos of
              other hotels&apos; rooms.
            </p>
          )}
        </div>
      </section>

      <section className="section-y bg-cream" aria-labelledby="room-about">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <div data-reveal>
              <Eyebrow>About this room</Eyebrow>
            </div>
            <h2 id="room-about" data-reveal className="mt-5 text-display-3">
              {room.name}
            </h2>
            <div data-reveal className="mt-8 space-y-5 text-lg text-ink-soft">
              {room.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <h3 data-reveal className="mt-14 font-display text-3xl">
              Room features
            </h3>
            <ul data-reveal className="mt-6 grid gap-3 sm:grid-cols-2">
              {room.features.map((f) => (
                <li key={f} className="flex items-center gap-3 border-b border-line pb-3">
                  <Check aria-hidden="true" className="size-4 text-gold-deep" /> {f}
                </li>
              ))}
            </ul>
            <p data-reveal className="mt-6 text-xs text-ink-soft">
              Source: {room.source}
            </p>
          </Reveal>

          {/* Sticky fact sheet */}
          <aside className="lg:col-span-5" aria-label="Room facts">
            <div className="border border-line bg-paper p-7 sm:p-10 lg:sticky lg:top-28">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6">
                {roomFacts(room).map((f) => (
                  <div key={f.label}>
                    <dt className="eyebrow text-gold-deep">{f.label}</dt>
                    <dd className={cn("mt-1.5 font-display text-xl", !f.value && "text-base text-ink-soft italic")}>{f.value ?? TBC}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex items-start gap-3 border-t border-line pt-6 text-sm text-ink-soft">
                <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-deep" />
                <p>
                  Check-in from {site.hotel.checkIn} · Check-out by {site.hotel.checkOut}
                </p>
              </div>
              <p className="mt-6 text-sm text-ink-soft">
                {room.pricePerNight !== null ? (
                  <>
                    From <span className="font-display text-2xl text-ink">{formatPrice(room.pricePerNight)}</span> per night
                  </>
                ) : (
                  "Rates depend on dates and occupancy — we'll share them when we confirm availability."
                )}
              </p>
              <ButtonLink href={`/book-stay?room=${room.slug}`} className="mt-8 w-full">
                Enquire About Availability
              </ButtonLink>
              <a
                href={`tel:${site.phones[0].tel}`}
                className="mt-4 flex min-h-11 items-center justify-center text-sm text-ink-soft hover:text-ink"
              >
                Or call {site.phones[0].display}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-y bg-sand" aria-labelledby="room-amenities">
        <div className="container-x">
          <Eyebrow>Property amenities</Eyebrow>
          <h2 id="room-amenities" className="mt-5 mb-10 text-display-3">
            Throughout your stay
          </h2>
          <AmenitiesGrid />
        </div>
      </section>

      <section className="section-y bg-cream" aria-labelledby="room-policies">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Good to know</Eyebrow>
            <h2 id="room-policies" className="mt-5 text-display-3">
              Property policies
            </h2>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            {[
              ["Check-in", `From ${site.hotel.checkIn}. Early check-in on request, subject to availability.`],
              ["Check-out", `By ${site.hotel.checkOut}. Late check-out on request, subject to availability.`],
              ["Confirmation", "Online enquiries are not bookings. Your stay is confirmed once our team contacts you."],
              ["Identification", "Hotels in India generally require valid photo ID for every guest at check-in — please carry yours."],
            ].map(([t, d]) => (
              <li key={t} className="border-t border-line pt-5">
                <h3 className="font-display text-2xl">{t}</h3>
                <p className="mt-2 text-ink-soft">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section-y bg-sand" aria-labelledby="other-rooms">
          <div className="container-x">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <h2 id="other-rooms" className="text-display-3">
                Other rooms
              </h2>
              <TextLink href="/rooms">All rooms</TextLink>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {others.map((r) => (
                <RoomCard key={r.slug} room={r} index={rooms.indexOf(r)} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
