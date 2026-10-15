"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import type { FormState } from "@/lib/validation";
import { cn } from "@/lib/cn";

export function Field({
  id,
  label,
  error,
  hint,
  children,
  className,
  optional,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
  optional?: boolean;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow block text-gold-deep">
        {label}
        {optional && <span className="ml-2 tracking-[0.1em] text-ink-soft normal-case">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-xs text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-[#a1442f]">
          <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/** aria attributes linking an input to its hint / error text */
export function describedBy(id: string, error?: string, hint?: string) {
  return {
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  };
}

/** Compact numeric dropdown in the underline style. */
export function NumberSelect({
  id,
  label,
  options,
  defaultValue,
  error,
  className,
}: {
  id: string;
  label: string;
  options: number[];
  defaultValue: number;
  error?: string;
  className?: string;
}) {
  return (
    <Field id={id} label={label} error={error} className={className}>
      <select id={id} name={id} defaultValue={String(defaultValue)} className="field-input" {...describedBy(id, error)}>
        {options.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </Field>
  );
}

/** Number chips (e.g. 1 2 3 4 5 6) backed by native radio inputs. */
export function ChipGroup({
  name,
  legend,
  options,
  defaultValue,
  error,
}: {
  name: string;
  legend: string;
  options: number[];
  defaultValue: number;
  error?: string;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="eyebrow text-gold-deep">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((n) => (
          <label key={n} className="relative">
            <input
              type="radio"
              name={name}
              value={n}
              defaultChecked={n === defaultValue}
              className="peer absolute inset-0 cursor-pointer opacity-0"
            />
            <span className="flex size-11 items-center justify-center border border-line text-sm text-ink transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-cream peer-hover:border-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-deep">
              {n}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-[#a1442f]">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/**
 * Hidden anti-spam fields: a honeypot that people never see, and the time the
 * form was rendered (set after hydration so it reflects a real browser).
 */
export function SpamGuard() {
  const [startedAt, setStartedAt] = useState("");
  useEffect(() => setStartedAt(String(Date.now())), []);
  return (
    <>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input type="hidden" name="startedAt" value={startedAt} />
    </>
  );
}

export function SubmitButton({
  pending,
  children,
  variant = "solid",
}: {
  pending: boolean;
  children: ReactNode;
  variant?: "solid" | "outline";
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={cn(
        "group inline-flex min-h-13 w-full items-center justify-center gap-3 px-10 py-4 text-[0.7rem] font-semibold tracking-[0.26em] uppercase transition-colors duration-500 disabled:cursor-wait disabled:opacity-70 sm:w-auto",
        variant === "solid"
          ? "bg-ink text-cream hover:bg-walnut"
          : "border border-gold-deep/70 text-gold-deep hover:bg-gold-deep hover:text-cream",
      )}
    >
      {pending && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
      {pending ? "Sending…" : children}
    </button>
  );
}

export function FormStatus({ state, id }: { state: FormState; id: string }) {
  return (
    <div id={id} role="status" aria-live="polite" tabIndex={-1} className="outline-none">
      {state.status === "error" && state.message && (
        <p className="flex items-start gap-3 border-l-2 border-[#a1442f] bg-[#a1442f]/5 px-4 py-3 text-sm text-[#7d3322]">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {state.message}
        </p>
      )}
    </div>
  );
}

export function SuccessPanel({
  title,
  state,
  onReset,
  resetLabel,
  children,
}: {
  title: string;
  state: FormState;
  onReset: () => void;
  resetLabel: string;
  children?: ReactNode;
}) {
  return (
    <div role="status" aria-live="polite" className="border border-line bg-paper p-8 text-center sm:p-12">
      <CheckCircle2 aria-hidden="true" strokeWidth={1.2} className="mx-auto size-12 text-olive" />
      <h2 className="mt-6 text-display-4">{title}</h2>
      <p className="mx-auto mt-4 max-w-lg text-ink-soft">{state.message}</p>
      {state.reference && (
        <p className="mt-6 text-sm">
          Reference: <span className="font-semibold tracking-wider tabular-nums">{state.reference}</span>
        </p>
      )}
      {children}
      <button
        type="button"
        onClick={onReset}
        className={cn(
          "mt-8 inline-flex min-h-11 items-center border-b border-ink/30 pb-1 text-[0.7rem] font-semibold tracking-[0.24em] uppercase hover:border-ink",
        )}
      >
        {resetLabel}
      </button>
    </div>
  );
}
