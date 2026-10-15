"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContactMessage } from "@/app/actions";
import { formToRecord, initialFormState, validateContactForm, type FieldErrors } from "@/lib/validation";
import { Field, FormStatus, SpamGuard, SubmitButton, SuccessPanel, describedBy } from "./fields";

const topics = [
  { value: "hotel", label: "Hotel enquiry" },
  { value: "restaurant", label: "Restaurant enquiry" },
  { value: "general", label: "Something else" },
];

export function ContactForm() {
  const [formKey, setFormKey] = useState(0);
  return <ContactFormInner key={formKey} onReset={() => setFormKey((k) => k + 1)} />;
}

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(submitContactMessage, initialFormState);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "error") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return <SuccessPanel title="Message sent" state={state} onReset={onReset} resetLabel="Send another message" />;
  }

  const errors: FieldErrors = { ...state.fieldErrors, ...clientErrors };
  const v = state.values ?? {};

  return (
    <form
      action={formAction}
      noValidate
      onSubmit={(e) => {
        const found = validateContactForm(formToRecord(new FormData(e.currentTarget)));
        setClientErrors(found);
        if (Object.keys(found).length) {
          e.preventDefault();
          e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
        }
      }}
      className="relative space-y-8"
      aria-describedby="contact-status"
    >
      <SpamGuard />
      <div ref={statusRef} tabIndex={-1} className="outline-none">
        <FormStatus state={state} id="contact-status" />
      </div>

      <fieldset>
        <legend className="eyebrow text-gold-deep">Topic</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((t) => (
            <label key={t.value} className="relative">
              <input
                type="radio"
                name="topic"
                value={t.value}
                defaultChecked={(v.topic ?? "hotel") === t.value}
                className="peer absolute inset-0 cursor-pointer opacity-0"
              />
              <span className="flex min-h-11 items-center border border-line px-4 text-sm transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-cream peer-hover:border-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-deep">
                {t.label}
              </span>
            </label>
          ))}
        </div>
        {errors.topic && <p className="mt-2 text-sm text-[#a1442f]">{errors.topic}</p>}
      </fieldset>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="c-name" label="Full name" error={errors.name} className="sm:col-span-2">
          <input id="c-name" name="name" type="text" autoComplete="name" required maxLength={100} defaultValue={v.name} className="field-input" {...describedBy("c-name", errors.name)} />
        </Field>
        <Field id="c-email" label="Email" error={errors.email}>
          <input id="c-email" name="email" type="email" autoComplete="email" required maxLength={160} defaultValue={v.email} className="field-input" {...describedBy("c-email", errors.email)} />
        </Field>
        <Field id="c-phone" label="Phone" error={errors.phone}>
          <input id="c-phone" name="phone" type="tel" autoComplete="tel" required maxLength={30} defaultValue={v.phone} className="field-input" {...describedBy("c-phone", errors.phone)} />
        </Field>
        <Field id="c-message" label="Message" error={errors.message} className="sm:col-span-2">
          <textarea id="c-message" name="message" rows={5} required maxLength={1500} defaultValue={v.message} className="field-input resize-y" {...describedBy("c-message", errors.message)} />
        </Field>
      </div>

      <div className="border-t border-line pt-8">
        <SubmitButton pending={pending}>Send Message</SubmitButton>
      </div>
    </form>
  );
}
