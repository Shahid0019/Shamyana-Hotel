import { media } from "@/data/media";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/motion/Reveal";

/** Centred statement with photographs bleeding off either edge. */
export function Welcome() {
  return (
    <section id="intro" aria-labelledby="welcome-title" className="relative overflow-hidden bg-cream py-24 md:py-40">
      {/* Flanking images (desktop) */}
      <Reveal variant="mask" className="pointer-events-none absolute inset-0 hidden lg:block" stagger={0.2}>
        <div data-reveal className="absolute top-[38%] left-0 aspect-[4/5] w-[min(19vw,20rem)] overflow-hidden">
          <Media asset={media.exteriorSnowNight} sizes="20vw" showTag={false} />
        </div>
        <div data-reveal className="absolute top-[44%] right-0 aspect-[5/6] w-[min(19vw,20rem)] overflow-hidden">
          <Media asset={media.diningLattice} sizes="20vw" showTag={false} />
        </div>
      </Reveal>

      <Reveal className="container-x relative mx-auto max-w-3xl text-center">
        <p data-reveal className="eyebrow flex items-center justify-center gap-3 text-ink-soft">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" /> A Kashmir experience
        </p>
        <h2 id="welcome-title" data-reveal className="mt-8 text-display-2 text-ink">
          Where every stay
          <span className="block italic-accent">has a story.</span>
        </h2>
        <p data-reveal className="mx-auto mt-10 max-w-xl leading-[2] text-ink-soft">
          On Srinagar&apos;s celebrated Boulevard Road, Shamyana brings together comfortable accommodation, warm
          hospitality and the flavours of Kashmir. Spend your days on Dal Lake and in the Mughal Gardens — then return to
          a place that welcomes you like family, with a table set downstairs.
        </p>
      </Reveal>

      {/* Mobile: images below the text */}
      <Reveal variant="mask" className="container-x mt-14 grid grid-cols-2 gap-3 lg:hidden">
        <div data-reveal className="relative aspect-[4/5]">
          <Media asset={media.exteriorSnowNight} sizes="50vw" showTag={false} />
        </div>
        <div data-reveal className="relative mt-10 aspect-[4/5]">
          <Media asset={media.diningLattice} sizes="50vw" showTag={false} />
        </div>
      </Reveal>
    </section>
  );
}
