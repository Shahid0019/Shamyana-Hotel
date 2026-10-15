import { media } from "@/data/media";
import { site } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RoomsBrowser } from "@/components/rooms/RoomsBrowser";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Rooms",
  description:
    "Rooms at Hotel Shamyana – Dal View on Boulevard Road, Srinagar: Deluxe Room and Family Room with Terrace, both with hot and cold air conditioning. Enquire for availability.",
  path: "/rooms",
});

export default function RoomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Rooms at Shamyana"
        title="Rooms for"
        accent="restful Kashmir days."
        intro="Comfortable rooms with hot and cold air conditioning, a short walk from Dal Lake on Boulevard Road."
        image={media.dalLakeStill}
        crumbs={[{ name: "Rooms", path: "/rooms" }]}
        size="md"
      >
        <ButtonLink href="/book-stay" variant="light">
          Request a Booking
        </ButtonLink>
      </PageHero>

      <section className="section-y bg-cream" aria-labelledby="rooms-list-title">
        <div className="container-x">
          <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Room categories</Eyebrow>
              <h2 id="rooms-list-title" className="mt-5 text-display-3">
                Choose your room
              </h2>
            </div>
            <p className="text-ink-soft lg:col-span-5">
              Photographs show our rooms; exact layouts vary between rooms in each category. Views, bedding and
              occupancy vary, so tell us what matters to you and our team will advise. Check-in {site.hotel.checkIn} ·
              check-out {site.hotel.checkOut}.
            </p>
          </div>
          <RoomsBrowser />
        </div>
      </section>
    </>
  );
}
