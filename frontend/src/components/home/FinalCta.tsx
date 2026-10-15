import { media } from "@/data/media";
import { Media } from "@/components/ui/Media";
import { ButtonLink } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { ChinarLeaf } from "@/components/ui/Ornament";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="on-dark relative isolate overflow-hidden bg-night text-cream">
      <div className="relative flex min-h-[min(90svh,52rem)] items-center justify-center">
        <Parallax amount={18} className="-z-10">
          <Media asset={media.nishatBagh} sizes="100vw" tagPosition="top-left" />
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-night/55" />

        <Reveal className="container-x py-28 text-center">
          <div data-reveal className="flex justify-center">
            <ChinarLeaf className="size-10 text-gold-light" />
          </div>
          <h2 id="final-cta-title" data-reveal className="mx-auto mt-8 max-w-5xl text-display-1 text-cream">
            Your Kashmir Story
            <span className="block italic-accent text-gold-light">Begins Here.</span>
          </h2>
          <div data-reveal className="mt-12 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/book-stay" variant="light">
              Book Your Stay
            </ButtonLink>
            <ButtonLink href="/reserve-table" variant="ghost-light">
              Reserve Your Table
            </ButtonLink>
          </div>
        </Reveal>
      </div>
      <Marquee
        className="border-t border-cream/10 text-gold-light"
        items={["Stay by the Lake", "Savour Kashmir", "Boulevard Road", "Srinagar", "Wazwan", "Dal Lake"]}
      />
    </section>
  );
}
