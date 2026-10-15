import { media } from "@/data/media";
import { site } from "@/data/site";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/motion/Reveal";

/** Wide inset banner followed by a centred story with an "at a glance" list. */
export function Gatherings() {
  const glance = [
    `Cuisine: ${site.restaurant.cuisines.slice(0, 3).join(", ")} & more`,
    `Seating: ${site.restaurant.services[0]}`,
    "Location: Ghat No. 2, Boulevard Road",
  ];

  return (
    <section aria-labelledby="gatherings-title" className="bg-cream pt-8 pb-24 md:pb-36">
      <div className="mx-auto max-w-[90rem] border-t border-line px-(--gutter) pt-8 sm:px-[6%]">
        <Reveal variant="mask" stagger={0.12} className="grid gap-3 sm:grid-cols-3">
          {[media.diningHall, media.diningGlassTables, media.diningWoodHall].map((a) => (
            <figure key={a.id} data-reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Media asset={a} sizes="(min-width: 640px) 30vw, 100vw" imgClassName="transition-transform duration-[1.2s] ease-(--ease-luxe) hover:scale-105" />
              </div>
              <figcaption className="mt-3 text-center text-xs tracking-[0.18em] text-ink-soft uppercase">{a.caption}</figcaption>
            </figure>
          ))}
        </Reveal>
      </div>

      <Reveal className="container-x mx-auto mt-20 max-w-3xl text-center md:mt-28">
        <p data-reveal className="eyebrow flex items-center justify-center gap-3 text-ink-soft">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" /> Gatherings &amp; Wazwan
        </p>
        <h2 id="gatherings-title" data-reveal className="mt-8 text-display-2">
          A feast
          <span className="block italic-accent">made for sharing.</span>
        </h2>
        <p data-reveal className="mx-auto mt-8 max-w-2xl leading-[1.9] text-ink-soft">
          In Kashmir, the Wazwan is how families celebrate — course after course, shared around one great plate. Whether
          it&apos;s a family dinner, a reunion or a meal with friends after a day on the lake, tell us your plans and our
          team will help you set the table.
        </p>
        <div data-reveal className="mx-auto mt-10 h-px w-16 bg-ink/20" />
        <p data-reveal className="mt-8 font-display text-xl italic">
          At a glance
        </p>
        <ul data-reveal className="mt-4 space-y-2 text-sm text-ink-soft">
          {glance.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        <p data-reveal className="mt-8">
          <a href="/reserve-table" className="eyebrow border-b border-ink/30 pb-1 text-ink hover:border-ink">
            Plan a gathering
          </a>
        </p>
      </Reveal>
    </section>
  );
}
