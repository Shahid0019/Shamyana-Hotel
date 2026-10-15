import { Clock, Footprints, MapPin, UtensilsCrossed } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";

/** At-a-glance facts guests look for first (all verified from listings). */
const facts = [
  { icon: Footprints, label: "Dal Lake", value: "About 3 min walk" },
  { icon: MapPin, label: "Address", value: "Ghat No. 2, Boulevard Rd" },
  { icon: Clock, label: "Check-in / out", value: `${site.hotel.checkIn} · ${site.hotel.checkOut}` },
  { icon: UtensilsCrossed, label: "Dining", value: "On-site restaurant" },
];

export function FactsStrip() {
  return (
    <section aria-label="Key facts" className="bg-cream pb-20 md:pb-28">
      <div className="container-x">
      <Reveal as="ul" stagger={0.08} y={16} className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f) => (
          <li key={f.label} data-reveal className="flex items-center gap-4 bg-paper px-5 py-5 sm:px-7 sm:py-8">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sand text-gold-deep">
              <f.icon aria-hidden="true" strokeWidth={1.4} className="size-5" />
            </span>
            <span>
              <span className="block text-[0.6rem] font-semibold tracking-[0.22em] text-ink-soft uppercase">{f.label}</span>
              <span className="mt-1 block font-display text-lg leading-snug text-ink sm:text-xl">{f.value}</span>
            </span>
          </li>
        ))}
      </Reveal>
      </div>
    </section>
  );
}
