/**
 * Public contact settings.
 *
 * PUBLIC_PHONE stays empty until a real, tested call-tracking number exists
 * (one that rings a person, with a recording notice if calls are recorded).
 * Every "call" surface on the site renders only when this is set, so the
 * site can never show a placeholder number again. Set VITE_PUBLIC_PHONE in
 * Vercel (e.g. "(801) 555-xxxx" style display) and VITE_PUBLIC_PHONE_E164
 * (e.g. "+18015550000") — never a 555-01xx number.
 */
const display = (import.meta.env?.VITE_PUBLIC_PHONE ?? "").trim();
const e164 = (import.meta.env?.VITE_PUBLIC_PHONE_E164 ?? "").trim();

const looksFake = /555-?01\d\d|555[-) ]*555/.test(display);

export const PUBLIC_PHONE =
  display && e164 && !looksFake ? { display, href: `tel:${e164}` } : null;

/** Shown under any phone CTA when calls are recorded. */
export const CALL_RECORDING_NOTICE =
  "Calls may be recorded for quality and to confirm your request.";
