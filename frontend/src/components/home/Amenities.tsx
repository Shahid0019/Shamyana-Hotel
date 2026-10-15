import {
  AirVent,
  BatteryCharging,
  BellRing,
  Car,
  ConciergeBell,
  Map,
  Plane,
  Shirt,
  UtensilsCrossed,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import type { Amenity } from "@/types";
import { amenities, amenitiesConfirmed } from "@/data/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

const icons: Record<Amenity["icon"], LucideIcon> = {
  wifi: Wifi,
  parking: Car,
  restaurant: UtensilsCrossed,
  "room-service": ConciergeBell,
  laundry: Shirt,
  ac: AirVent,
  power: BatteryCharging,
  reception: BellRing,
  airport: Plane,
  tour: Map,
};

export function AmenitiesGrid() {
  return (
    <>
      <Reveal as="ul" stagger={0.05} y={16} className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-cols-5">
        {amenities.map((a) => {
          const Icon = icons[a.icon];
          return (
            <li
              key={a.id}
              data-reveal
              className="group flex min-h-40 flex-col justify-between gap-6 border-r border-b border-line p-5 transition-colors duration-500 hover:bg-paper sm:p-7"
            >
              <Icon aria-hidden="true" strokeWidth={1.2} className="size-7 text-gold-deep transition-transform duration-500 group-hover:-translate-y-1" />
              <span className="font-display text-xl leading-tight text-ink">{a.label}</span>
            </li>
          );
        })}
      </Reveal>
      {!amenitiesConfirmed && (
        <p className="mt-6 text-sm text-ink-soft">
          Facilities as shown on our travel listings. Some services, such as airport transfers and tour assistance, are
          arranged on request — please confirm what you need when you enquire.
        </p>
      )}
    </>
  );
}

export function Amenities({ index = "07" }: { index?: string }) {
  return (
    <section aria-labelledby="amenities-title" className="section-y bg-cream">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Eyebrow index={index}>Amenities</Eyebrow>
            <h2 id="amenities-title" className="mt-6 text-display-3">
              The essentials,
              <span className="italic-accent text-gold-deep"> thoughtfully kept.</span>
            </h2>
          </div>
        </div>
        <div className="mt-12">
          <AmenitiesGrid />
        </div>
      </div>
    </section>
  );
}
