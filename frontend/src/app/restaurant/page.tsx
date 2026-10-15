import { media } from "@/data/media";
import { menuCategories } from "@/data/menu";
import { site } from "@/data/site";
import { galleryItems } from "@/data/gallery";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Media } from "@/components/ui/Media";
import { ChinarLeaf, OrnamentDivider } from "@/components/ui/Ornament";
import { SignatureDishes } from "@/components/home/SignatureDishes";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Marquee } from "@/components/ui/Marquee";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Restaurant — Kashmiri Wazwan near Dal Lake",
  description:
    "Shamyana Restaurant on Boulevard Road, Srinagar serves Kashmiri Wazwan — Rista, Tabak Maaz, Nadru Yakhni — with Indian, Mughlai, barbecue, Chinese-style and vegetarian dishes. Indoor and outdoor seating.",
  path: "/restaurant",
});

const diningModes = [
  {
    title: "Lunch & dinner",
    text: "Settle in for Wazwan classics, slow-cooked curries and biryanis — indoors or outside.",
  },
  {
    title: "Gatherings",
    text: "Planning a meal for family or friends? Tell us your numbers in advance and we'll help you plan the table.",
  },
  {
    title: "Takeaway",
    text: "Enjoy Shamyana's dishes wherever you're staying in Srinagar. Call ahead to order.",
  },
];

export default function RestaurantPage() {
  return (
    <>
      <PageHero
        eyebrow={site.restaurantName}
        title="Tradition Served"
        accent="with Warmth."
        intro="Kashmiri Wazwan at the heart of the menu, with Indian, Mughlai, barbecue and Chinese-style dishes for every guest at the table."
        image={media.tabakMaaz}
        crumbs={[{ name: "Restaurant", path: "/restaurant" }]}
      >
        <ButtonLink href="/restaurant/menu" variant="light">
          View the Menu
        </ButtonLink>
        <ButtonLink href="/reserve-table" variant="ghost-light">
          Reserve a Table
        </ButtonLink>
      </PageHero>

      {/* Introduction */}
      <section className="section-y bg-cream" aria-labelledby="rest-intro">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-20">
          <Reveal className="lg:col-span-6">
            <div data-reveal>
              <Eyebrow index="01">The restaurant</Eyebrow>
            </div>
            <h2 id="rest-intro" data-reveal className="mt-6 text-display-2">
              A table for locals
              <span className="block italic-accent text-gold-deep">and travellers alike.</span>
            </h2>
            <p data-reveal className="mt-8 text-lg text-ink-soft">
              Shamyana Restaurant — known to many as Shamyana Lodge &amp; Restaurant — is a dining room for Srinagar
              residents and visitors exploring the city. Come for a Wazwan feast, a family biryani or a sizzler after
              an evening on the lake.
            </p>
            <ul data-reveal className="mt-8 flex flex-wrap gap-2">
              {site.restaurant.services.map((s) => (
                <li key={s} className="border border-line px-4 py-2 text-sm text-ink-soft">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal variant="mask" className="grid grid-cols-2 gap-3 lg:col-span-6">
            <div data-reveal className="relative row-span-2 aspect-[3/5]">
              <Media asset={media.diningLattice} sizes="(min-width: 1024px) 24vw, 50vw" />
            </div>
            <div data-reveal className="relative aspect-square">
              <Media asset={media.diningGlassTables} sizes="(min-width: 1024px) 24vw, 50vw" />
            </div>
            <div data-reveal className="relative aspect-square">
              <Media asset={media.diningHall} sizes="(min-width: 1024px) 24vw, 50vw" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Culinary heritage */}
      <section className="on-dark relative isolate overflow-hidden bg-night text-cream" aria-labelledby="rest-heritage">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[60svh] lg:min-h-[90svh]">
            <Parallax amount={12}>
              <Media asset={media.wazwanSpread} sizes="(min-width: 1024px) 50vw, 100vw" tagPosition="top-left" />
            </Parallax>
          </div>
          <Reveal className="section-y flex flex-col justify-center px-(--gutter) lg:px-16 xl:px-24">
            <div data-reveal>
              <Eyebrow index="02" tone="light">
                Kashmiri culinary heritage
              </Eyebrow>
            </div>
            <h2 id="rest-heritage" data-reveal className="mt-6 text-display-2 text-cream">
              The art
              <span className="block italic-accent text-gold-light">of Wazwan.</span>
            </h2>
            <div data-reveal className="mt-8 max-w-xl space-y-5 text-cream/80">
              <p>
                Wazwan is Kashmir&apos;s great ceremonial feast — a succession of slow-cooked dishes prepared by the
                waza, the master cooks of the valley. Meat is pounded by hand for Rista and Gushtaba, ribs are simmered
                then crisped for Tabak Maaz, and yoghurt gravies are perfumed with fennel and dried ginger.
              </p>
              <p>Traditionally shared from a single large plate, it is a cuisine made for gathering together.</p>
            </div>
            <div data-reveal className="mt-10">
              <TextLink href="/restaurant/menu#wazwan" tone="light">
                Wazwan on our menu
              </TextLink>
            </div>
          </Reveal>
        </div>
        <Marquee className="border-t border-cream/10 text-gold-light" items={["Rista", "Tabak Maaz", "Nadru Yakhni", "Waza Chicken", "Gushtaba", "Kahwa"]} />
      </section>

      {/* Multi-cuisine */}
      <section className="section-y bg-sand" aria-labelledby="rest-cuisines">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Eyebrow index="03">Beyond Kashmir</Eyebrow>
              <h2 id="rest-cuisines" className="mt-6 text-display-3">
                Something for every guest
              </h2>
            </div>
            <p className="text-ink-soft lg:col-span-6">
              Alongside Wazwan, the kitchen cooks across the subcontinent and beyond — so every member of your group finds
              a favourite.
            </p>
          </div>
          <Reveal as="ul" stagger={0.06} y={16} className="mt-12 grid grid-cols-2 border-t border-l border-line md:grid-cols-4">
            {menuCategories.map((c, i) => (
              <li key={c.id} data-reveal className="border-r border-b border-line">
                <a href={`/restaurant/menu#${c.id}`} className="group flex h-full min-h-44 flex-col justify-between gap-6 p-5 transition-colors duration-500 hover:bg-cream sm:p-7">
                  <span className="text-xs font-semibold text-gold-deep tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-display text-2xl leading-tight transition-colors group-hover:text-gold-deep">{c.name}</span>
                    <span className="mt-2 block text-sm text-ink-soft">{c.intro}</span>
                  </span>
                </a>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <SignatureDishes />

      {/* Dining experiences */}
      <section className="section-y bg-olive text-cream on-dark" aria-labelledby="rest-modes">
        <div className="container-x">
          <Eyebrow index="05" tone="light">
            Ways to dine
          </Eyebrow>
          <h2 id="rest-modes" className="mt-6 max-w-2xl text-display-3 text-cream">
            However you like to eat
          </h2>
          <Reveal as="ul" className="mt-14 grid gap-12 md:grid-cols-3" stagger={0.12}>
            {diningModes.map((d) => (
              <li key={d.title} data-reveal className="border-t border-cream/20 pt-8">
                <ChinarLeaf className="size-7 text-gold-light" />
                <h3 className="mt-6 font-display text-3xl text-cream">{d.title}</h3>
                <p className="mt-3 text-cream/75">{d.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Hours + reservation */}
      <section className="section-y bg-cream" aria-labelledby="rest-visit">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Eyebrow index="06">Visit us</Eyebrow>
            <h2 id="rest-visit" className="mt-6 text-display-2">
              Opening hours
              <span className="block italic-accent text-gold-deep">&amp; reservations.</span>
            </h2>
            <OrnamentDivider className="mt-8" />
          </div>
          <div className="border border-line bg-paper p-8 sm:p-10 lg:col-span-6">
            {site.restaurant.hours ? (
              <dl className="divide-y divide-line">
                {site.restaurant.hours.map((h) => (
                  <div key={h.days} className="flex justify-between py-3">
                    <dt>{h.days}</dt>
                    <dd className="font-display text-xl">{h.hours}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-ink-soft">
                Our hours vary by season. Please call{" "}
                <a href={`tel:${site.phones[0].tel}`} className="text-ink underline underline-offset-4">
                  {site.phones[0].display}
                </a>{" "}
                to check today&apos;s timings.
              </p>
            )}
            <p className="mt-6 text-sm text-ink-soft">{site.address.street}, {site.address.locality}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/reserve-table">Reserve a Table</ButtonLink>
              <ButtonLink href="/restaurant/menu" variant="outline">
                Full Menu
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-y bg-sand" aria-labelledby="rest-gallery">
        <div className="container-x">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow index="07">From the kitchen</Eyebrow>
              <h2 id="rest-gallery" className="mt-6 text-display-3">
                A feast for the eyes
              </h2>
            </div>
            <TextLink href="/gallery">Full gallery</TextLink>
          </div>
          <GalleryGrid items={galleryItems.filter((g) => g.category === "Restaurant" || g.category === "Food").slice(0, 12)} />
        </div>
      </section>
    </>
  );
}
