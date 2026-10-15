"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { todayInIndia } from "@/lib/validation";

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Quick availability enquiry. A plain GET form to /book-stay, so it works
 * without JavaScript; the full enquiry form opens pre-filled with these values.
 */
export function HeroBookingBar() {
  const [today, setToday] = useState<string>();
  const [checkIn, setCheckIn] = useState("");

  useEffect(() => setToday(todayInIndia()), []);

  const cell = "flex flex-col justify-center px-6 py-3.5 transition-colors focus-within:bg-cream/10 hover:bg-cream/5";
  const label = "text-[0.58rem] font-semibold tracking-[0.26em] text-cream/65 uppercase";
  const input =
    "mt-1 w-full cursor-pointer border-0 bg-transparent p-0 font-display text-xl text-cream outline-none [color-scheme:dark] focus-visible:outline-none";

  return (
    <form
      action="/book-stay"
      method="get"
      aria-label="Check availability"
      className="grid grid-cols-[1fr_1fr_0.8fr_auto] divide-x divide-cream/15 overflow-hidden rounded-full border border-cream/25 bg-night/35 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.5)] backdrop-blur-xl"
    >
      <label className={`${cell} pl-8`}>
        <span className={label}>Arrive</span>
        <input type="date" name="checkIn" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={input} />
      </label>
      <label className={cell}>
        <span className={label}>Depart</span>
        <input type="date" name="checkOut" min={checkIn ? addDays(checkIn, 1) : today} className={input} />
      </label>
      <label className={cell}>
        <span className={label}>Guests</span>
        <select name="adults" defaultValue="2" className={`${input} [&>option]:text-ink`}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "adult" : "adults"}
            </option>
          ))}
        </select>
      </label>
      <div className="flex items-center p-2">
        <button
          type="submit"
          className="group flex h-full min-h-14 items-center gap-3 rounded-full bg-cream px-7 text-[0.68rem] font-semibold tracking-[0.22em] text-ink uppercase transition-colors duration-500 hover:bg-gold-light"
        >
          Check availability
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
