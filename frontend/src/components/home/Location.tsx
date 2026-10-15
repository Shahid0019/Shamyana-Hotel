import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { directionsUrl, mapEmbedUrl, site } from "@/data/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buttonClasses } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function MapEmbed({ className }: { className?: string }) {
  return (
    <div className={className}>
      <iframe
        title={`Map showing ${site.name}, ${site.address.street}, ${site.address.locality}`}
        src={mapEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full border-0 grayscale-[35%] sepia-[15%]"
        allowFullScreen
      />
    </div>
  );
}

export function Location({ index = "10" }: { index?: string }) {
  return (
    <section aria-labelledby="location-title" className="section-y bg-sand">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div data-reveal>
            <Eyebrow index={index}>Location</Eyebrow>
          </div>
          <h2 id="location-title" data-reveal className="mt-6 text-display-2">
            At the Heart
            <span className="block italic-accent text-gold-deep">of Srinagar.</span>
          </h2>
          <p data-reveal className="mt-8 text-ink-soft">
            On Boulevard Road, which runs along the shore of Dal Lake — close to the shikara ghats, the
            Mughal Gardens road and the city centre at Dalgate.
          </p>

          <ul data-reveal className="mt-10 space-y-6">
            <li className="flex gap-4">
              <MapPin aria-hidden="true" strokeWidth={1.4} className="mt-1 size-5 shrink-0 text-gold-deep" />
              <address className="not-italic">
                <span className="font-display text-xl">{site.address.street}</span>
                <br />
                {site.address.locality}, Kashmir – {site.address.postalCode}
              </address>
            </li>
            <li className="flex gap-4">
              <Phone aria-hidden="true" strokeWidth={1.4} className="mt-1 size-5 shrink-0 text-gold-deep" />
              <div className="flex flex-col">
                {site.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="inline-flex min-h-10 items-center font-display text-xl hover:text-gold-deep">
                    {p.display}
                  </a>
                ))}
              </div>
            </li>
            <li className="flex gap-4">
              <Clock aria-hidden="true" strokeWidth={1.4} className="mt-1 size-5 shrink-0 text-gold-deep" />
              <p>
                Hotel check-in {site.hotel.checkIn} · check-out {site.hotel.checkOut}
                <br />
                <span className="text-ink-soft">Restaurant hours: please call to confirm.</span>
              </p>
            </li>
          </ul>

          <div data-reveal className="mt-10 flex flex-wrap gap-3">
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("solid")}>
              <Navigation aria-hidden="true" className="size-4" /> Get Directions
              <span className="sr-only">(opens Google Maps in a new tab)</span>
            </a>
            <a href={`tel:${site.phones[0].tel}`} className={buttonClasses("outline")}>
              <Phone aria-hidden="true" className="size-4" /> Call Us
            </a>
          </div>
        </Reveal>

        <Reveal variant="mask" className="lg:col-span-7">
          <div data-reveal className="relative aspect-[4/5] overflow-hidden bg-cream sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[36rem]">
            <MapEmbed className="absolute inset-0" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
