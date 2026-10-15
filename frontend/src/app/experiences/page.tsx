import { media } from "@/data/media";
import { experiences, experiencesNote } from "@/data/experiences";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/motion/Reveal";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Experiences around Dal Lake",
  description:
    "Things to do near Shamyana on Boulevard Road, Srinagar: shikara rides on Dal Lake, the Mughal Gardens, Pari Mahal, local markets, Kashmiri crafts and Wazwan.",
  path: "/experiences",
});

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Experiences"
        title="Explore the beauty"
        accent="around you."
        intro="Boulevard Road puts the best of Srinagar within easy reach. A few favourites from our team."
        image={media.shikarasBoulevard}
        crumbs={[{ name: "Experiences", path: "/experiences" }]}
      />

      {/* Quick index */}
      <nav aria-label="Jump to an experience" className="sticky top-0 z-20 border-b border-line bg-cream/90 backdrop-blur-md">
        <ul className="container-x no-scrollbar flex gap-2 overflow-x-auto py-3">
          {experiences.map((e, i) => (
            <li key={e.id} className="shrink-0">
              <a
                href={`#${e.id}`}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line px-4 text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink"
              >
                <span className="text-xs text-gold-deep tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                {e.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="bg-cream py-20 md:py-32" aria-label="Experiences">
        <div className="container-x space-y-24 md:space-y-36">
          {experiences.map((e, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal as="article" id={e.id} key={e.id} className="grid scroll-mt-24 items-center gap-10 md:grid-cols-12 md:gap-16">
                <div data-reveal className={cn("relative aspect-[4/3] overflow-hidden rounded-3xl md:col-span-7", flip && "md:order-2")}>
                  <Media asset={e.image} sizes="(min-width: 768px) 55vw, 100vw" tagPosition="top-left" />
                </div>
                <div className={cn("md:col-span-5", flip && "md:order-1")}>
                  <p data-reveal className="font-script text-6xl leading-none text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 data-reveal className="mt-4 text-display-3">
                    {e.title}
                  </h2>
                  {e.distance && (
                    <p data-reveal className="eyebrow mt-4 text-gold-deep">
                      {e.distance}
                    </p>
                  )}
                  <p data-reveal className="mt-5 text-lg leading-[1.9] text-ink-soft">
                    {e.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-sand py-24 md:py-32" aria-labelledby="exp-help">
        <div className="container-x mx-auto max-w-2xl text-center">
          <p className="eyebrow flex items-center justify-center gap-3 text-ink-soft">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" /> Plan with us
          </p>
          <h2 id="exp-help" className="mt-6 text-display-2">
            Need a hand
            <span className="block italic-accent">planning your days?</span>
          </h2>
          <p className="mt-6 leading-[1.9] text-ink-soft">{experiencesNote}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/book-stay">Request a Booking</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Ask our team
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
