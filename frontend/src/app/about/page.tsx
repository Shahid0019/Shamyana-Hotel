import { media } from "@/data/media";
import { site } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Media } from "@/components/ui/Media";
import { ChinarLeaf, LatticeCorner, OrnamentDivider } from "@/components/ui/Ornament";
import { Location } from "@/components/home/Location";
import { Reveal } from "@/components/motion/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Shamyana",
  description:
    "Shamyana Hotel & Restaurant — also known as Shamyana Lodge & Restaurant — on Boulevard Road, Srinagar: a hotel and an established Kashmiri and multi-cuisine restaurant by Dal Lake.",
  path: "/about",
});

const pillars = [
  {
    title: "A place to stay",
    text: "Hotel Shamyana – Dal View offers comfortable rooms with hot and cold air conditioning, a short walk from Dal Lake.",
  },
  {
    title: "A table to share",
    text: "Shamyana Restaurant serves Kashmiri Wazwan alongside Indian, Mughlai, barbecue, Chinese-style and vegetarian dishes.",
  },
  {
    title: "A Srinagar address",
    text: "Ghat No. 2 on Boulevard Road — the lakeside avenue at the centre of Srinagar's visitor life.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Shamyana"
        title="One address,"
        accent="two ways to welcome you."
        intro={`${site.name} brings a hotel and a restaurant together under one roof on Srinagar's Boulevard Road.`}
        image={media.dalLakePanorama}
        crumbs={[{ name: "About", path: "/about" }]}
        size="md"
      />

      <section className="section-y relative overflow-hidden bg-cream" aria-labelledby="about-story">
        <LatticeCorner className="absolute -top-6 -right-6 size-48 rotate-90 opacity-60" />
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-6">
            <div data-reveal>
              <Eyebrow>Our story</Eyebrow>
            </div>
            <h2 id="about-story" data-reveal className="mt-6 text-display-2">
              Hospitality,
              <span className="block italic-accent text-gold-deep">the Kashmiri way.</span>
            </h2>
            <div data-reveal className="mt-8 space-y-5 text-lg text-ink-soft">
              <p>
                In Kashmir, welcoming a guest is a matter of pride. A cup of kahwa, a warm meal, an unhurried
                conversation about where to go next — this is the spirit Shamyana is built around.
              </p>
              <p>
                Known to many as Shamyana Lodge &amp; Restaurant, the property is both a hotel for visitors exploring
                Srinagar and a restaurant enjoyed by local residents and travellers alike. Stay with us, dine with us,
                or simply stop by for a taste of Wazwan after an evening on the lake.
              </p>
            </div>
          </Reveal>
          <Reveal variant="mask" className="relative lg:col-span-6">
            <div data-reveal className="relative aspect-[4/5]">
              <Media asset={media.exteriorSnowDay} sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-olive text-cream on-dark" aria-labelledby="about-pillars">
        <div className="container-x">
          <h2 id="about-pillars" className="sr-only">
            What Shamyana offers
          </h2>
          <Reveal as="ul" className="grid gap-12 md:grid-cols-3 md:gap-10" stagger={0.15}>
            {pillars.map((p) => (
              <li key={p.title} data-reveal className="border-t border-cream/20 pt-8">
                <ChinarLeaf className="size-7 text-gold-light" />
                <h3 className="mt-6 font-display text-3xl text-cream">{p.title}</h3>
                <p className="mt-4 text-cream/75">{p.text}</p>
              </li>
            ))}
          </Reveal>
          <OrnamentDivider className="mt-16 justify-center text-gold-light" />
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/hotel" variant="light">
              Our Hotel
            </ButtonLink>
            <ButtonLink href="/restaurant" variant="ghost-light">
              Our Restaurant
            </ButtonLink>
          </div>
        </div>
      </section>

      <Location index="" />
    </>
  );
}
