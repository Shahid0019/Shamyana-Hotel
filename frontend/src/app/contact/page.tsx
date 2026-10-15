import Link from "next/link";
import { ArrowRight, BedDouble, Mail, MapPin, Navigation, Phone, UtensilsCrossed } from "lucide-react";
import { directionsUrl, fullAddress, site } from "@/data/site";
import { media } from "@/data/media";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { MapEmbed } from "@/components/home/Location";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact & Directions",
  description: `Contact Shamyana Hotel & Restaurant, ${fullAddress}. Call ${site.phones[0].display} for hotel and restaurant enquiries.`,
  path: "/contact",
});

const routes = [
  {
    icon: BedDouble,
    title: "Stay with us",
    text: "Room availability, rates, transfers and special requests.",
    href: "/book-stay",
    cta: "Request a booking",
  },
  {
    icon: UtensilsCrossed,
    title: "Dine with us",
    text: "Tables, group meals, Wazwan for gatherings and takeaway.",
    href: "/reserve-table",
    cta: "Reserve a table",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We'd love"
        accent="to hear from you."
        intro="Call us, send a message, or find your way to Ghat No. 2 on Boulevard Road."
        image={media.dalLakePanorama}
        crumbs={[{ name: "Contact", path: "/contact" }]}
        size="md"
      />

      {/* Fastest routes first */}
      <section className="bg-cream py-16 md:py-24" aria-label="Ways to reach us">
        <div className="container-x grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-walnut p-8 text-cream sm:p-10">
            <Phone aria-hidden="true" strokeWidth={1.3} className="size-8 text-gold-light" />
            <h2 className="mt-6 font-display text-3xl">Call us</h2>
            <ul className="mt-4 space-y-2">
              {site.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="group flex min-h-12 items-center justify-between gap-3 border-b border-cream/15">
                    <span>
                      <span className="block font-display text-xl">{p.display}</span>
                      <span className="block text-xs text-cream/60">{p.label}</span>
                    </span>
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
            {site.email && (
              <a href={`mailto:${site.email}`} className="mt-4 flex min-h-11 items-center gap-2 text-sm">
                <Mail aria-hidden="true" className="size-4 text-gold-light" /> {site.email}
              </a>
            )}
          </div>
          {routes.map((r) => (
            <Link key={r.title} href={r.href} className="group flex flex-col rounded-3xl border border-line bg-paper p-8 transition-colors duration-500 hover:border-ink sm:p-10">
              <r.icon aria-hidden="true" strokeWidth={1.3} className="size-8 text-gold-deep" />
              <h2 className="mt-6 font-display text-3xl">{r.title}</h2>
              <p className="mt-3 text-ink-soft">{r.text}</p>
              <span className="mt-auto flex items-center gap-2 pt-8 text-[0.68rem] font-semibold tracking-[0.22em] uppercase">
                {r.cta} <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Message form */}
      <section className="bg-paper py-20 md:py-28" aria-labelledby="contact-form-title">
        <div className="container-x mx-auto max-w-2xl text-center">
          <p className="eyebrow flex items-center justify-center gap-3 text-ink-soft">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" /> Send a message
          </p>
          <h2 id="contact-form-title" className="mt-6 text-display-2">
            Write
            <span className="italic-accent"> to us.</span>
          </h2>
          <p className="mt-5 text-ink-soft">Questions, feedback or group plans — we&apos;ll reply as soon as we can.</p>
        </div>
        <div className="container-x mx-auto mt-14 max-w-3xl">
          <ContactForm />
        </div>
      </section>

      {/* Directions */}
      <section className="bg-sand py-20 md:py-28" aria-labelledby="directions-title">
        <div className="container-x grid gap-4 lg:grid-cols-12">
          <div className="flex flex-col justify-between rounded-3xl bg-paper p-8 sm:p-10 lg:col-span-4">
            <div>
              <h2 id="directions-title" className="text-display-3">
                Finding us
              </h2>
              <p className="mt-5 flex gap-3 text-ink-soft">
                <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold-deep" />
                {fullAddress}
              </p>
              <p className="mt-4 text-sm text-ink-soft">
                On the lakeside road along Dal Lake, near the Dalgate end of the Boulevard.
              </p>
              <dl className="mt-8 space-y-3 border-t border-line pt-6 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">Hotel check-in</dt>
                  <dd>{site.hotel.checkIn}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">Hotel check-out</dt>
                  <dd>{site.hotel.checkOut}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">Restaurant hours</dt>
                  <dd className="text-right">
                    {site.restaurant.hours ? site.restaurant.hours.map((h) => `${h.days} ${h.hours}`).join(", ") : "Please call to confirm"}
                  </dd>
                </div>
              </dl>
            </div>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-[0.68rem] font-semibold tracking-[0.2em] text-cream uppercase hover:bg-walnut"
            >
              <Navigation aria-hidden="true" className="size-4" /> Open in Google Maps
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          <div className="relative min-h-96 overflow-hidden rounded-3xl lg:col-span-8">
            <MapEmbed className="absolute inset-0" />
          </div>
        </div>
      </section>
    </>
  );
}
