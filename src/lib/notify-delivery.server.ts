/**
 * Optional real delivery. Without API keys, callers keep status "sent_stub".
 * With keys set in production env, attempts real send and returns sent/failed.
 */

export type DeliveryResult = {
  status: "sent" | "sent_stub" | "failed";
  detail?: string;
};

export function notifyConfigStatus() {
  const resend = Boolean(process.env.RESEND_API_KEY?.trim());
  const twilio = Boolean(
    process.env.TWILIO_ACCOUNT_SID?.trim() &&
      process.env.TWILIO_AUTH_TOKEN?.trim() &&
      process.env.TWILIO_FROM_NUMBER?.trim(),
  );
  const database = Boolean(process.env.DATABASE_URL?.trim());
  return {
    database,
    resend,
    twilio,
    fromEmail: process.env.NOTIFY_FROM_EMAIL?.trim() || "leads@flushingtoilets.com",
    fallbackEmail: process.env.LEAD_FALLBACK_EMAIL?.trim() || "",
    siteUrl:
      process.env.SITE_URL?.trim() ||
      process.env.VITE_SITE_URL?.trim() ||
      "https://flushingtoilets.com",
  };
}

/**
 * Placeholder partner addresses live on a domain that does not exist, so every
 * send to one hard-bounces and damages the sending reputation of the real
 * domain. Treat them as undeliverable and log a stub instead.
 */
export function isUndeliverableAddress(address: string): boolean {
  const a = address.trim().toLowerCase();
  if (!a.includes("@")) return true;
  const domain = a.slice(a.lastIndexOf("@") + 1);
  return (
    domain === "demo.flushingtoilets.com" ||
    domain.endsWith(".demo.flushingtoilets.com") ||
    domain === "example.com" ||
    domain.endsWith(".invalid") ||
    domain.endsWith(".test") ||
    domain.endsWith(".example")
  );
}

export async function deliverEmail(opts: {
  to: string;
  subject: string;
  text: string;
}): Promise<DeliveryResult> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) {
    return { status: "sent_stub", detail: "RESEND_API_KEY not set" };
  }
  if (isUndeliverableAddress(opts.to)) {
    return {
      status: "sent_stub",
      detail: "placeholder address — not sent (would hard-bounce)",
    };
  }

  const fromEmail =
    process.env.NOTIFY_FROM_EMAIL?.trim() || "leads@flushingtoilets.com";
  const fromName = process.env.NOTIFY_FROM_NAME?.trim() || "Flushing Toilets";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${fromName} <${fromEmail}>`,
        to: [opts.to],
        subject: opts.subject,
        text: opts.text,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      return {
        status: "failed",
        detail: `Resend ${res.status}: ${body.slice(0, 200)}`,
      };
    }
    return { status: "sent", detail: "resend" };
  } catch (e) {
    return {
      status: "failed",
      detail: e instanceof Error ? e.message : "email send error",
    };
  }
}

export async function deliverSms(opts: {
  to: string;
  body: string;
}): Promise<DeliveryResult> {
  const sid = process.env.TWILIO_ACCOUNT_SID?.trim();
  const token = process.env.TWILIO_AUTH_TOKEN?.trim();
  const from = process.env.TWILIO_FROM_NUMBER?.trim();
  if (!sid || !token || !from) {
    return { status: "sent_stub", detail: "Twilio env not set" };
  }
  if (/555-?01\d\d/.test(opts.to)) {
    return { status: "sent_stub", detail: "placeholder number — not sent" };
  }

  // Normalize to E.164-ish: keep digits; if 10-digit US, prefix +1
  const digits = opts.to.replace(/\D/g, "");
  const to =
    digits.length === 10
      ? `+1${digits}`
      : digits.startsWith("1") && digits.length === 11
        ? `+${digits}`
        : opts.to.startsWith("+")
          ? opts.to
          : `+${digits}`;

  try {
    const auth = Buffer.from(`${sid}:${token}`).toString("base64");
    const body = new URLSearchParams({
      To: to,
      From: from,
      Body: opts.body.slice(0, 320),
    });
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      },
    );
    if (!res.ok) {
      const text = await res.text();
      return {
        status: "failed",
        detail: `Twilio ${res.status}: ${text.slice(0, 200)}`,
      };
    }
    return { status: "sent", detail: "twilio" };
  } catch (e) {
    return {
      status: "failed",
      detail: e instanceof Error ? e.message : "sms send error",
    };
  }
}
