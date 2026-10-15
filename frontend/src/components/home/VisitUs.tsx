import { ArrowUpRight, Navigation, Phone } from "lucide-react";
import { directionsUrl, listings, site } from "@/data/site";
import { MapEmbed } from "./Location";
import { Reveal } from "@/components/motion/Reveal";

/** Location, contact and independent review links — everything needed to decide and arrive. */
export function VisitUs() {
  return (
    <section aria-labelledby="visit-title" className="bg-sand py-24 md:py-32">
      <Reveal className="container-x mx-auto max-w-2xl text-center">
        <p data-reveal className="eyebrow flex items-center justify-center gap-3 text-ink-soft">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" /> Location
        </p>
        <h2 id="visit-title" data-reveal className="mt-8 text-display-2">
          At the heart
          <span className="block italic-accent">of Srinagar.</span>
        </h2>
      </Reveal>

      <div className="container-x mt-14 grid gap-4 lg:grid-cols-12">
        <div className="relative min-h-80 overflow-hidden rounded-3xl bg-cream lg:col-span-8 lg:min-h-[30rem]">
          <MapEmbed className="absolute inset-0" />
        </div>

        <div className="flex flex-col gap-4 lg:col-span-4">
          <div className="flex-1 rounded-3xl bg-paper p-7 sm:p-9">
            <p className="text-[0.6rem] font-semibold tracking-[0.22em] text-ink-soft uppercase">Address</p>
            <address className="mt-3 font-display text-2xl leading-snug not-italic">
              {site.address.street}, {site.address.locality} {site.address.postalCode}
            </address>
            <p className="mt-6 text-[0.6rem] font-semibold tracking-[0.22em] text-ink-soft uppercase">Call</p>
            <ul className="mt-2">
              {site.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="inline-flex min-h-10 items-center font-display text-2xl hover:text-gold-deep">
                    {p.display}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-[0.65rem] font-semibold tracking-[0.2em] text-cream uppercase transition-colors hover:bg-walnut"
              >
                <Navigation aria-hidden="true" className="size-4" /> Directions
                <span className="sr-only">(opens Google Maps in a new tab)</span>
              </a>
              <a
                href={`tel:${site.phones[0].tel}`}
                className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/25 px-5 text-[0.65rem] font-semibold tracking-[0.2em] uppercase transition-colors hover:border-ink"
              >
                <Phone aria-hidden="true" className="size-4" /> Call now
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-walnut p-7 text-cream sm:p-9">
            <p className="text-[0.6rem] font-semibold tracking-[0.22em] text-cream/65 uppercase">Read guest reviews</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {listings.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-cream/25 px-4 text-sm transition-colors hover:bg-cream hover:text-walnut"
                  >
                    {l.name}
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
