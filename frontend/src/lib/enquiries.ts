import "server-only";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export type EnquiryKind = "booking" | "reservation" | "contact";

export interface DeliveryResult {
  ok: boolean;
  reference?: string;
  reason?: "not-configured" | "delivery-failed";
}

function makeReference(kind: EnquiryKind) {
  const prefix = { booking: "STAY", reservation: "TBL", contact: "MSG" }[kind];
  return `${prefix}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

/**
 * Delivers an enquiry to the property.
 *
 * Integration points (in order):
 *  1. ENQUIRY_WEBHOOK_URL — POSTs JSON to any endpoint you control (an email
 *     relay, CRM, Google Apps Script, Zapier/Make, PMS or booking engine).
 *     Optional ENQUIRY_WEBHOOK_SECRET is sent as a Bearer token.
 *  2. Development only — appends to .data/enquiries.jsonl for local testing.
 *
 * In production with nothing configured, delivery fails honestly so the
 * visitor is told to call instead of being shown a false confirmation.
 */
export async function deliverEnquiry(kind: EnquiryKind, payload: Record<string, unknown>): Promise<DeliveryResult> {
  const reference = makeReference(kind);
  const record = { kind, reference, receivedAt: new Date().toISOString(), ...payload };

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.ENQUIRY_WEBHOOK_SECRET
            ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_SECRET}` }
            : {}),
        },
        body: JSON.stringify(record),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) {
        console.error(`[enquiries] webhook responded ${res.status} for ${reference}`);
        return { ok: false, reason: "delivery-failed" };
      }
      return { ok: true, reference };
    } catch (err) {
      console.error(`[enquiries] webhook error for ${reference}`, err);
      return { ok: false, reason: "delivery-failed" };
    }
  }

  if (process.env.NODE_ENV !== "production") {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "enquiries.jsonl"), `${JSON.stringify(record)}\n`, "utf8");
    console.info(`[enquiries] stored ${reference} in .data/enquiries.jsonl (development only)`);
    return { ok: true, reference };
  }

  console.error("[enquiries] ENQUIRY_WEBHOOK_URL is not configured — enquiry not delivered");
  return { ok: false, reason: "not-configured" };
}
