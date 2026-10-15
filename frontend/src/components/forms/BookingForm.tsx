"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { submitBookingEnquiry } from "@/app/actions";
import { rooms } from "@/data/rooms";
import { primaryPhone } from "@/data/site";
import {
  formToRecord,
  initialFormState,
  todayInIndia,
  validateBooking,
  type FieldErrors,
} from "@/lib/validation";
import { NumberSelect, Field, FormStatus, SpamGuard, SubmitButton, SuccessPanel, describedBy } from "./fields";

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export interface BookingDefaults {
  room?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: string;
}

export function BookingForm({ defaults = {} }: { defaults?: BookingDefaults }) {
  const [formKey, setFormKey] = useState(0);
  return <BookingFormInner key={formKey} defaults={defaults} onReset={() => setFormKey((k) => k + 1)} />;
}

/** Reads ?room=&checkIn=&checkOut=&adults= (from room pages and the hero bar). */
export function BookingFormFromParams() {
  const params = useSearchParams();
  const pick = (k: string) => params.get(k) ?? undefined;
  return (
    <BookingForm
      defaults={{ room: pick("room"), checkIn: pick("checkIn"), checkOut: pick("checkOut"), adults: pick("adults") }}
    />
  );
}

function BookingFormInner({ defaults, onReset }: { defaults: BookingDefaults; onReset: () => void }) {
  const [state, formAction, pending] = useActionState(submitBookingEnquiry, initialFormState);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [today, setToday] = useState<string | undefined>(undefined);
  const [checkIn, setCheckIn] = useState(defaults.checkIn ?? "");
  const statusRef = useRef<HTMLDivElement>(null);

  // Dates depend on the visitor's clock, so compute them after hydration.
  useEffect(() => setToday(todayInIndia()), []);

  // Move focus to the status message after a failed submission.
  useEffect(() => {
    if (state.status === "error") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <SuccessPanel title="Enquiry received" state={state} onReset={onReset} resetLabel="Send another enquiry">
        <p className="mt-4 text-sm text-ink-soft">
          Need an answer sooner? Call{" "}
          <a className="underline underline-offset-4" href={`tel:${primaryPhone.tel}`}>
            {primaryPhone.display}
          </a>
          .
        </p>
      </SuccessPanel>
    );
  }

  const errors: FieldErrors = { ...state.fieldErrors, ...clientErrors };
  const v: Record<string, string | undefined> = state.values ?? {
    checkIn: defaults.checkIn,
    checkOut: defaults.checkOut,
    adults: defaults.adults,
  };
  const roomDefault = v.roomCategory ?? (rooms.some((r) => r.slug === defaults.room) ? defaults.room : "");

  return (
    <form
      action={formAction}
      noValidate
      onSubmit={(e) => {
        const found = validateBooking(formToRecord(new FormData(e.currentTarget)), today ?? todayInIndia());
        setClientErrors(found);
        if (Object.keys(found).length) {
          e.preventDefault();
          const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`);
          first?.focus();
        }
      }}
      className="relative space-y-10"
      aria-describedby="booking-status"
    >
      <SpamGuard />
      <div ref={statusRef} tabIndex={-1} className="outline-none">
        <FormStatus state={state} id="booking-status" />
      </div>

      <fieldset className="grid gap-8 sm:grid-cols-2">
        <legend className="sr-only">Dates</legend>
        <Field id="checkIn" label="Check-in" error={errors.checkIn}>
          <input
            id="checkIn"
            name="checkIn"
            type="date"
            required
            min={today}
            defaultValue={v.checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="field-input"
            {...describedBy("checkIn", errors.checkIn)}
          />
        </Field>
        <Field id="checkOut" label="Check-out" error={errors.checkOut}>
          <input
            id="checkOut"
            name="checkOut"
            type="date"
            required
            min={checkIn ? addDays(checkIn, 1) : today}
            defaultValue={v.checkOut}
            className="field-input"
            {...describedBy("checkOut", errors.checkOut)}
          />
        </Field>
      </fieldset>

      <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
        <NumberSelect id="adults" label="Adults" options={[1, 2, 3, 4, 5, 6]} defaultValue={Math.min(Math.max(Number(v.adults) || 2, 1), 6)} error={errors.adults} />
        <NumberSelect id="children" label="Children" options={[0, 1, 2, 3, 4]} defaultValue={Number(v.children ?? 0)} error={errors.children} />
        <NumberSelect id="rooms" label="Rooms" options={[1, 2, 3, 4]} defaultValue={Number(v.rooms ?? 1)} error={errors.rooms} className="col-span-2 md:col-span-1" />
      </div>

      <Field id="roomCategory" label="Room category" error={errors.roomCategory}>
        <select id="roomCategory" name="roomCategory" defaultValue={roomDefault} className="field-input">
          <option value="">No preference — please advise</option>
          {rooms.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.name}
            </option>
          ))}
        </select>
      </Field>

      <fieldset className="grid gap-8 sm:grid-cols-2">
        <legend className="sr-only">Your details</legend>
        <Field id="name" label="Full name" error={errors.name} className="sm:col-span-2">
          <input id="name" name="name" type="text" autoComplete="name" required maxLength={100} defaultValue={v.name} className="field-input" {...describedBy("name", errors.name)} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={160} defaultValue={v.email} className="field-input" {...describedBy("email", errors.email)} />
        </Field>
        <Field id="phone" label="Telephone" error={errors.phone} hint="Include country code if outside India.">
          <input id="phone" name="phone" type="tel" autoComplete="tel" required maxLength={30} defaultValue={v.phone} className="field-input" {...describedBy("phone", errors.phone, "Include country code if outside India.")} />
        </Field>
        <Field id="message" label="Special requests" optional error={errors.message} className="sm:col-span-2">
          <textarea id="message" name="message" rows={4} maxLength={1500} defaultValue={v.message} placeholder="Arrival time, view preference, airport transfer, dietary needs…" className="field-input resize-y" {...describedBy("message", errors.message)} />
        </Field>
      </fieldset>

      <div className="flex flex-col items-center gap-5 pt-4 text-center">
        <SubmitButton pending={pending} variant="outline">
          Request a Booking
        </SubmitButton>
        <p className="max-w-md text-xs text-ink-soft">
          This is an enquiry, not a confirmed booking — our reception team will confirm availability and rates. See our{" "}
          <a href="/privacy-policy" className="underline underline-offset-2">privacy policy</a>.
        </p>
      </div>
    </form>
  );
}
