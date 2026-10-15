import { media } from "@/data/media";
import { rooms } from "@/data/rooms";
import { site } from "@/data/site";
import { hotelFaqs } from "@/data/experiences";
import { galleryItems } from "@/data/gallery";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Media } from "@/components/ui/Media";
import { OrnamentDivider } from "@/components/ui/Ornament";
import { Faq } from "@/components/ui/Faq";
import { RoomCard } from "@/components/rooms/RoomCard";
import { AmenitiesGrid } from "@/components/home/Amenities";
import { ExperiencesSlider } from "@/components/home/ExperiencesSlider";
import { FinalCta } from "@/components/home/FinalCta";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Hotel — Hotel near Dal Lake on Boulevard Road",
  description:
    "Hotel Shamyana – Dal View is a 3-star hotel (as listed on travel platforms) at Ghat No. 2, Boulevard Road, Srinagar — about a 3-minute walk from Dal Lake, with an on-site restaurant.",
  path: "/hotel",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: hotelFaqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function HotelPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHero
        eyebrow={site.hotelName}
        title="A welcoming base"
        accent="on Boulevard Road."
        intro="Comfortable rooms, warm Kashmiri hospitality and our own restaurant downstairs — moments from the shore of Dal Lake."
        image={media.dalLakeWide}
        crumbs={[{ name: "Our Hotel", path: "/hotel" }]}
      >
        <ButtonLink href="/book-stay" variant="light">
          Request a Booking
        </ButtonLink>
        <ButtonLink href="/rooms" variant="ghost-light">
          View Rooms
        </ButtonLink>
      </PageHero>

      {/* Introduction */}
      <section className="section-y bg-cream" aria-labelledby="hotel-intro">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-20">
          <Reveal className="lg:col-span-6">
            <div data-reveal>
              <Eyebrow index="01">The hotel</Eyebrow>
            </div>
            <h2 id="hotel-intro" data-reveal className="mt-6 text-display-2">
              Kashmir at
              <span className="block italic-accent text-gold-deep">your doorstep.</span>
            </h2>
            <div data-reveal className="mt-8 space-y-5 text-lg text-ink-soft">
              <p>
                Hotel Shamyana – Dal View sits on Boulevard Road at Ghat No. 2, Dalgate — the lakeside avenue that
                runs along Dal Lake. Shikara ghats, houseboats and the evening promenade are all close by.
              </p>
              <p>
                Rooms are simple and comfortable, with hot and cold air conditioning for every season. When you return
                from a day in the city, Shamyana Restaurant is right here, serving Kashmiri Wazwan and much more.
              </p>
            </div>
            <dl data-reveal className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-3">
              <div>
                <dt className="eyebrow text-gold-deep">Category</dt>
                <dd className="mt-2 font-display text-xl">3-star</dd>
                <dd className="text-xs text-ink-soft">as listed on travel platforms</dd>
              </div>
              <div>
                <dt className="eyebrow text-gold-deep">Check-in</dt>
                <dd className="mt-2 font-display text-xl">{site.hotel.checkIn}</dd>
              </div>
              <div>
                <dt className="eyebrow text-gold-deep">Check-out</dt>
                <dd className="mt-2 font-display text-xl">{site.hotel.checkOut}</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal variant="mask" className="grid grid-cols-5 gap-3 lg:col-span-6">
            <div data-reveal className="relative col-span-3 aspect-[3/4]">
              <Media asset={media.exteriorDay} sizes="(min-width: 1024px) 28vw, 60vw" />
            </div>
            <div data-reveal className="relative col-span-2 mt-16 aspect-[3/5]">
              <Media asset={media.exteriorSnowNight} sizes="(min-width: 1024px) 18vw, 40vw" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Accommodation */}
      <section className="section-y bg-sand" aria-labelledby="hotel-rooms">
        <div className="container-x">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow index="02">Accommodation</Eyebrow>
              <h2 id="hotel-rooms" className="mt-6 text-display-3">
                Room categories
              </h2>
            </div>
            <TextLink href="/rooms">Compare rooms</TextLink>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {rooms.map((r, i) => (
              <RoomCard key={r.slug} room={r} index={i} />
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-soft">
            Views differ between rooms, and not every room overlooks Dal Lake. If a view matters to you, mention it
            when you enquire.
          </p>
        </div>
      </section>

      {/* Amenities */}
      <section className="section-y bg-cream" aria-labelledby="hotel-amenities">
        <div className="container-x">
          <Eyebrow index="03">Amenities</Eyebrow>
          <h2 id="hotel-amenities" className="mt-6 mb-12 text-display-3">
            Practical comforts
          </h2>
          <AmenitiesGrid />
        </div>
      </section>

      {/* Gallery */}
      <section className="section-y bg-sand" aria-labelledby="hotel-gallery">
        <div className="container-x">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow index="04">Inside Shamyana</Eyebrow>
              <h2 id="hotel-gallery" className="mt-6 text-display-3">
                The hotel &amp; rooms
              </h2>
            </div>
            <TextLink href="/gallery">Full gallery</TextLink>
          </div>
          <GalleryGrid items={galleryItems.filter((g) => g.category === "The Hotel" || g.category === "Rooms").slice(0, 8)} />
        </div>
      </section>

      <ExperiencesSlider />

      {/* FAQ */}
      <section className="section-y bg-cream" aria-labelledby="hotel-faq">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="06">Questions</Eyebrow>
            <h2 id="hotel-faq" className="mt-6 text-display-3">
              Before you arrive
            </h2>
            <OrnamentDivider className="mt-8" />
          </div>
          <div className="lg:col-span-8">
            <Faq items={hotelFaqs} />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
