"use server";

import { rooms } from "@/data/rooms";
import { primaryPhone } from "@/data/site";
import { deliverEnquiry, type EnquiryKind } from "@/lib/enquiries";
import {
  formToRecord,
  validateBooking,
  validateContactForm,
  validateReservation,
  type FieldErrors,
  type FormState,
} from "@/lib/validation";

/** Minimum time a human plausibly needs to fill in a form. */
const MIN_FILL_MS = 2500;

const fallback = `Please call us on ${primaryPhone.display} and we'll be glad to help.`;

function isSpam(data: Record<string, string>) {
  // Honeypot: real visitors never see or fill this field.
  if (data.website) return true;
  const started = Number(data.startedAt);
  if (!Number.isFinite(started) || started <= 0) return true;
  return Date.now() - started < MIN_FILL_MS;
}

function safeValues(data: Record<string, string>) {
  const { website: _hp, startedAt: _ts, ...rest } = data;
  return rest;
}

async function handle(
  kind: EnquiryKind,
  formData: FormData,
  validate: (d: Record<string, string>) => FieldErrors,
  buildPayload: (d: Record<string, string>) => Record<string, unknown>,
  successMessage: string,
): Promise<FormState> {
  const data = formToRecord(formData);
  const values = safeValues(data);

  if (isSpam(data)) {
    return { status: "error", message: `We couldn't send your request. ${fallback}`, values };
  }

  const fieldErrors = validate(data);
  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  const result = await deliverEnquiry(kind, buildPayload(data));
  if (!result.ok) {
    return {
      status: "error",
      message:
        result.reason === "not-configured"
          ? `Online requests are temporarily unavailable. ${fallback}`
          : `Something went wrong while sending your request. ${fallback}`,
      values,
    };
  }

  return { status: "success", message: successMessage, reference: result.reference };
}

const clean = (v: string | undefined, max = 1500) => (v ?? "").trim().slice(0, max);

export async function submitBookingEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  return handle(
    "booking",
    formData,
    (d) => validateBooking(d),
    (d) => ({
      checkIn: d.checkIn,
      checkOut: d.checkOut,
      adults: Number(d.adults),
      children: Number(d.children || 0),
      rooms: Number(d.rooms),
      roomCategory: rooms.find((r) => r.slug === d.roomCategory)?.name ?? "No preference",
      name: clean(d.name, 100),
      email: clean(d.email, 160),
      phone: clean(d.phone, 30),
      message: clean(d.message),
    }),
    "Thank you — your booking enquiry has been sent. Our reception team will contact you to confirm availability and rates. Your stay is not confirmed until you hear from us.",
  );
}

export async function submitTableReservation(_prev: FormState, formData: FormData): Promise<FormState> {
  return handle(
    "reservation",
    formData,
    (d) => validateReservation(d),
    (d) => ({
      date: d.date,
      time: d.time,
      guests: Number(d.guests),
      name: clean(d.name, 100),
      email: clean(d.email, 160),
      phone: clean(d.phone, 30),
      message: clean(d.message),
    }),
    "Thank you — your table request has been sent. The restaurant will contact you to confirm. Your table is not reserved until you hear from us.",
  );
}

export async function submitContactMessage(_prev: FormState, formData: FormData): Promise<FormState> {
  return handle(
    "contact",
    formData,
    (d) => validateContactForm(d),
    (d) => ({
      topic: d.topic,
      name: clean(d.name, 100),
      email: clean(d.email, 160),
      phone: clean(d.phone, 30),
      message: clean(d.message),
    }),
    "Thank you — your message has been sent. We'll reply as soon as we can.",
  );
}
