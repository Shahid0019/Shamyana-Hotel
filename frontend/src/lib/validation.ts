/**
 * Shared validation for enquiry forms. Runs in the browser for instant
 * feedback and again on the server (the server result is authoritative).
 */

export type FieldErrors = Partial<Record<string, string>>;

export interface FormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: FieldErrors;
  /** Echo of submitted values so the form can be repopulated after an error */
  values?: Record<string, string>;
  reference?: string;
}

export const initialFormState: FormState = { status: "idle" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9\s\-()]{7,20}$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

export const MAX_STAY_NIGHTS = 30;
export const MAX_BOOKING_AHEAD_DAYS = 540;

/** Today's date in Srinagar (IST) as YYYY-MM-DD. */
export function todayInIndia(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(now);
}

function daysBetween(a: string, b: string) {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000);
}

function isRealDate(v: string) {
  if (!ISO_DATE.test(v)) return false;
  const d = new Date(`${v}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
}

function str(data: Record<string, string>, key: string) {
  return (data[key] ?? "").trim();
}

function int(value: string) {
  return /^\d+$/.test(value) ? Number(value) : NaN;
}

function validateContact(data: Record<string, string>, errors: FieldErrors) {
  const name = str(data, "name");
  if (name.length < 2) errors.name = "Please enter your full name.";
  else if (name.length > 100) errors.name = "Please shorten your name to 100 characters.";

  const email = str(data, "email");
  if (!EMAIL.test(email) || email.length > 160) errors.email = "Please enter a valid email address.";

  const phone = str(data, "phone");
  if (!PHONE.test(phone) || phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Please enter a valid phone number, including country code if outside India.";
  }

  if (str(data, "message").length > 1500) errors.message = "Please keep your message under 1,500 characters.";
}

export function validateBooking(data: Record<string, string>, today = todayInIndia()): FieldErrors {
  const errors: FieldErrors = {};
  const checkIn = str(data, "checkIn");
  const checkOut = str(data, "checkOut");

  if (!isRealDate(checkIn)) errors.checkIn = "Please choose a check-in date.";
  else if (checkIn < today) errors.checkIn = "Check-in can't be in the past.";
  else if (daysBetween(today, checkIn) > MAX_BOOKING_AHEAD_DAYS) errors.checkIn = "Please choose a date within the next 18 months.";

  if (!isRealDate(checkOut)) errors.checkOut = "Please choose a check-out date.";
  else if (!errors.checkIn && checkOut <= checkIn) errors.checkOut = "Check-out must be after check-in.";
  else if (!errors.checkIn && daysBetween(checkIn, checkOut) > MAX_STAY_NIGHTS)
    errors.checkOut = `For stays longer than ${MAX_STAY_NIGHTS} nights, please call us directly.`;

  const adults = int(str(data, "adults"));
  if (!(adults >= 1 && adults <= 12)) errors.adults = "Please choose between 1 and 12 adults.";
  const children = int(str(data, "children") || "0");
  if (!(children >= 0 && children <= 8)) errors.children = "Please choose between 0 and 8 children.";
  const roomsCount = int(str(data, "rooms"));
  if (!(roomsCount >= 1 && roomsCount <= 6)) errors.rooms = "Please choose between 1 and 6 rooms.";

  validateContact(data, errors);
  return errors;
}

export function validateReservation(data: Record<string, string>, today = todayInIndia()): FieldErrors {
  const errors: FieldErrors = {};
  const date = str(data, "date");
  if (!isRealDate(date)) errors.date = "Please choose a date.";
  else if (date < today) errors.date = "The date can't be in the past.";
  else if (daysBetween(today, date) > 180) errors.date = "Please choose a date within the next 6 months.";

  if (!TIME.test(str(data, "time"))) errors.time = "Please choose a preferred time.";

  const guests = int(str(data, "guests"));
  if (!(guests >= 1 && guests <= 40)) errors.guests = "Please enter between 1 and 40 guests. For larger events, please call us.";

  validateContact(data, errors);
  return errors;
}

export function validateContactForm(data: Record<string, string>): FieldErrors {
  const errors: FieldErrors = {};
  if (!["hotel", "restaurant", "general"].includes(str(data, "topic"))) errors.topic = "Please choose a topic.";
  validateContact(data, errors);
  if (str(data, "message").length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  return errors;
}

export function formToRecord(form: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  form.forEach((v, k) => {
    if (typeof v === "string") out[k] = v;
  });
  return out;
}
