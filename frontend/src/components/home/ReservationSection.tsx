import { Suspense } from "react";
import { BookingForm } from "@/components/forms/BookingForm";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";

export function ReservationSection() {
  return (
    <section id="reserve" aria-labelledby="reserve-title" className="bg-paper py-24 md:py-36">
      <Reveal className="container-x mx-auto max-w-2xl text-center">
        <p data-reveal className="eyebrow flex items-center justify-center gap-3 text-gold-deep">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" /> Reservations
        </p>
        <h2 id="reserve-title" data-reveal className="mt-8 text-display-2">
          Request your stay
          <span className="block italic-accent">at Shamyana.</span>
        </h2>
        <p data-reveal className="mx-auto mt-8 max-w-md leading-[1.9] text-ink-soft">
          Share your dates and preferences and our reception team will get back to you to confirm availability and
          rates. Prefer to call? {site.phones[0].display}.
        </p>
      </Reveal>
      <div className="container-x mx-auto mt-16 max-w-3xl">
        <Suspense>
          <BookingForm />
        </Suspense>
      </div>
    </section>
  );
}
