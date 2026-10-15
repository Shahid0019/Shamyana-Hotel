import Link from "next/link";
import { ArrowUp, ArrowUpRight, MapPin } from "lucide-react";
import { footerExplore, footerLegal, footerPlan } from "@/data/navigation";
import { directionsUrl, site } from "@/data/site";
import { SrinagarClock } from "./SrinagarClock";
import { CopyrightYear } from "./CopyrightYear";

const strip = ["Boulevard Road", "Dal Lake", "Kashmiri Wazwan", "Srinagar · Kashmir", "Stay by the Lake", "Savour Kashmir"];

export function Footer() {
  const row = (
    <div className="flex shrink-0 items-center">
      {strip.map((s) => (
        <span key={s} className="flex items-center">
          <span className="px-8 text-[0.65rem] font-semibold tracking-[0.28em] whitespace-nowrap uppercase">{s}</span>
          <span className="text-gold">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <footer className="on-dark relative overflow-hidden bg-walnut text-cream/80">
      {/* Marquee strip */}
      <div aria-hidden="true" className="overflow-hidden border-b border-cream/10 py-4 text-cream/70">
        <div className="marquee-track flex w-max">
          {row}
          {row}
        </div>
      </div>

  
      <div className="container-x relative">
        <div className="grid gap-14 py-16 md:py-20 lg:grid-cols-12">
          {/* Identity + live details */}
          <div className="lg:col-span-5">
            <p className="eyebrow text-gold-light">Visit us</p>
            <h2 className="mt-5 font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] leading-[1.05] text-cream">
              Come stay
              <span className="block font-script text-[1.15em] leading-[1.3] text-gold-light">by the lake.</span>
            </h2>
            <address className="mt-6 max-w-sm leading-relaxed not-italic">
              {site.address.street}, {site.address.locality}, {site.address.region} {site.address.postalCode}
            </address>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex max-w-sm items-center justify-between border-b border-cream/25 pb-3 text-[0.68rem] font-semibold tracking-[0.22em] text-cream uppercase hover:border-cream"
            >
              <span className="flex items-center gap-2">
                <MapPin aria-hidden="true" className="size-4 text-gold-light" /> Get directions
              </span>
              <ArrowUpRight aria-hidden="true" className="size-4" />
              <span className="sr-only">(opens Google Maps in a new tab)</span>
            </a>

            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
              <div>
                <dt className="eyebrow text-cream/60">Srinagar time</dt>
                <dd className="mt-2 font-display text-2xl text-cream">
                  <SrinagarClock />
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-cream/60">Check-in</dt>
                <dd className="mt-2 font-display text-2xl text-cream">{site.hotel.checkIn}</dd>
              </div>
              <div>
                <dt className="eyebrow text-cream/60">Check-out</dt>
                <dd className="mt-2 font-display text-2xl text-cream">{site.hotel.checkOut}</dd>
              </div>
            </dl>
          </div>

          <nav aria-label="Discover" className="lg:col-span-2 lg:col-start-7">
            <h2 className="eyebrow border-b border-cream/15 pb-4 font-sans text-gold-light">Discover</h2>
            <ul className="mt-4 space-y-1">
              {footerExplore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-9 items-center font-display text-lg text-cream hover:text-gold-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Plan" className="lg:col-span-2">
            <h2 className="eyebrow border-b border-cream/15 pb-4 font-sans text-gold-light">Plan</h2>
            <ul className="mt-4 space-y-1">
              {footerPlan.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-9 items-center font-display text-lg text-cream hover:text-gold-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="eyebrow border-b border-cream/15 pb-4 font-sans text-gold-light">Call</h2>
            <ul className="mt-4 space-y-3">
              {site.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="inline-flex flex-col hover:text-cream">
                    <span className="font-display text-lg text-cream">{p.display}</span>
                    <span className="text-xs text-cream/55">{p.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gradient hairline */}
        <div aria-hidden="true" className="mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        <div className="flex flex-wrap items-center justify-between gap-6 py-8">
          <ul className="flex flex-wrap gap-2">
            {site.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center rounded-full border border-cream/25 px-4 text-[0.65rem] font-semibold tracking-[0.2em] uppercase hover:border-cream">
                  {s.name}
                </a>
              </li>
            ))}
            {footerLegal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-10 items-center rounded-full border border-cream/20 px-4 text-[0.65rem] font-semibold tracking-[0.18em] uppercase hover:border-cream hover:text-cream">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href="#top" className="group flex items-center gap-4 text-[0.65rem] font-semibold tracking-[0.24em] uppercase hover:text-cream">
            Back to top
            <span className="inline-flex size-12 items-center justify-center rounded-full border border-cream/30 transition-colors group-hover:bg-cream group-hover:text-walnut">
              <ArrowUp aria-hidden="true" className="size-4" />
            </span>
          </a>
        </div>

        <div className="border-t border-cream/10 py-6 text-center text-xs text-cream/50">
          <p>
            © <CopyrightYear /> {site.name}. All rights reserved.
          </p>
          <p className="mt-2">Online forms send enquiries only — stays and tables are confirmed once our team contacts you.</p>
        </div>
      </div>
    </footer>
  );
}
