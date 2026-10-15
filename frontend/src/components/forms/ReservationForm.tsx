"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitTableReservation } from "@/app/actions";
import { primaryPhone } from "@/data/site";
import {
  formToRecord,
  initialFormState,
  todayInIndia,
  validateReservation,
  type FieldErrors,
} from "@/lib/validation";
import { Field, FormStatus, SpamGuard, SubmitButton, SuccessPanel, describedBy } from "./fields";

/** Half-hourly slots. Opening hours are unconfirmed, so the restaurant confirms the final time. */
const timeSlots = Array.from({ length: 29 }, (_, i) => {
  const minutes = 8 * 60 + i * 30; // 08:00 → 22:00
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  // Formatted by hand so server and browser output match exactly (no hydration mismatch).
  const label = `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
  return { value, label };
});

export function ReservationForm() {
  const [formKey, setFormKey] = useState(0);
  return <ReservationFormInner key={formKey} onReset={() => setFormKey((k) => k + 1)} />;
}

function ReservationFormInner({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(submitTableReservation, initialFormState);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [today, setToday] = useState<string | undefined>(undefined);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => setToday(todayInIndia()), []);
  useEffect(() => {
    if (state.status === "error") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <SuccessPanel title="Table request received" state={state} onReset={onReset} resetLabel="Make another request">
        <p className="mt-4 text-sm text-ink-soft">
          For same-day tables, please call{" "}
          <a className="underline underline-offset-4" href={`tel:${primaryPhone.tel}`}>
            {primaryPhone.display}
          </a>
          .
        </p>
      </SuccessPanel>
    );
  }

  const errors: FieldErrors = { ...state.fieldErrors, ...clientErrors };
  const v = state.values ?? {};

  return (
    <form
      action={formAction}
      noValidate
      onSubmit={(e) => {
        const found = validateReservation(formToRecord(new FormData(e.currentTarget)), today ?? todayInIndia());
        setClientErrors(found);
        if (Object.keys(found).length) {
          e.preventDefault();
          e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
        }
      }}
      className="relative space-y-10"
      aria-describedby="reservation-status"
    >
      <SpamGuard />
      <div ref={statusRef} tabIndex={-1} className="outline-none">
        <FormStatus state={state} id="reservation-status" />
      </div>

      <fieldset className="grid gap-8 sm:grid-cols-3">
        <legend className="sr-only">Your table</legend>
        <Field id="date" label="Date" error={errors.date}>
          <input id="date" name="date" type="date" required min={today} defaultValue={v.date} className="field-input" {...describedBy("date", errors.date)} />
        </Field>
        <Field id="time" label="Preferred time" error={errors.time}>
          <select id="time" name="time" required defaultValue={v.time ?? ""} className="field-input" {...describedBy("time", errors.time)}>
            <option value="" disabled>
              Select a time
            </option>
            {timeSlots.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="guests" label="Guests" error={errors.guests}>
          <input id="guests" name="guests" type="number" inputMode="numeric" min={1} max={40} required defaultValue={v.guests ?? "2"} className="field-input" {...describedBy("guests", errors.guests)} />
        </Field>
      </fieldset>

      <fieldset className="grid gap-8 sm:grid-cols-2">
        <legend className="sr-only">Your details</legend>
        <Field id="name" label="Full name" error={errors.name} className="sm:col-span-2">
          <input id="name" name="name" type="text" autoComplete="name" required maxLength={100} defaultValue={v.name} className="field-input" {...describedBy("name", errors.name)} />
        </Field>
        <Field id="phone" label="Phone" error={errors.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required maxLength={30} defaultValue={v.phone} className="field-input" {...describedBy("phone", errors.phone)} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={160} defaultValue={v.email} className="field-input" {...describedBy("email", errors.email)} />
        </Field>
        <Field id="message" label="Special requests" optional error={errors.message} className="sm:col-span-2">
          <textarea id="message" name="message" rows={4} maxLength={1500} defaultValue={v.message} placeholder="Occasion, seating preference (indoor / outdoor), dietary needs, Wazwan for a group…" className="field-input resize-y" {...describedBy("message", errors.message)} />
        </Field>
      </fieldset>

      <div className="flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs text-ink-soft">
          This is a reservation request. Your table is confirmed once the restaurant contacts you.
        </p>
        <SubmitButton pending={pending}>Request a Table</SubmitButton>
      </div>
    </form>
  );
}
