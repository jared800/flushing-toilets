import { createHmac, timingSafeEqual, randomUUID } from "node:crypto";
import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";

/**
 * Server-verified sessions for the internal ops surfaces (admin lead inbox and
 * the partner portal). Replaces the old localStorage flags, which any visitor
 * could set themselves.
 *
 * Session = base64url(JSON payload) + "." + HMAC-SHA256(payload, secret),
 * stored in an HttpOnly cookie. Nothing sensitive lives in the payload; the
 * signature is what makes it unforgeable.
 *
 * Required env:
 *   OPS_SESSION_SECRET  — random string used to sign sessions
 *   ADMIN_ACCESS_CODE   — code accepted by /admin/login
 *
 * With either unset the corresponding surface FAILS CLOSED: no session can be
 * minted and every gated server function rejects.
 */

const COOKIE = "ft_ops";
const MAX_AGE_SECONDS = 60 * 60 * 12;

export type OpsRole = "admin" | "partner";

export type OpsSession = {
  role: OpsRole;
  /** Set only for role === "partner". */
  partnerId?: string;
  /** Unix seconds. */
  exp: number;
  jti: string;
};

export class OpsUnauthorizedError extends Error {
  constructor(message = "Not authorized") {
    super(message);
    this.name = "OpsUnauthorizedError";
  }
}

function secret(): string | null {
  const v = process.env.OPS_SESSION_SECRET?.trim();
  return v && v.length >= 16 ? v : null;
}

function adminCode(): string | null {
  const v = process.env.ADMIN_ACCESS_CODE?.trim();
  return v ? v : null;
}

function b64url(buf: Buffer): string {
  return buf.toString("base64url");
}

function sign(payload: string, key: string): string {
  return b64url(createHmac("sha256", key).update(payload).digest());
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

function encode(session: OpsSession, key: string): string {
  const payload = b64url(Buffer.from(JSON.stringify(session), "utf8"));
  return `${payload}.${sign(payload, key)}`;
}

function decode(token: string, key: string): OpsSession | null {
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  const mac = token.slice(dot + 1);
  if (!safeEqual(mac, sign(payload, key))) return null;
  try {
    const parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as OpsSession;
    if (parsed.role !== "admin" && parsed.role !== "partner") return null;
    if (typeof parsed.exp !== "number" || parsed.exp * 1000 < Date.now()) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/** True when the deployment has the env it needs to run real ops auth. */
export function opsAuthConfigured() {
  return { secret: Boolean(secret()), adminCode: Boolean(adminCode()) };
}

function issue(session: Omit<OpsSession, "exp" | "jti">): boolean {
  const key = secret();
  if (!key) return false;
  const full: OpsSession = {
    ...session,
    exp: Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS,
    jti: randomUUID(),
  };
  setCookie(COOKIE, encode(full, key), {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
  return true;
}

/** Verify an admin access code and start an admin session. */
export function startAdminSession(code: string): boolean {
  const expected = adminCode();
  if (!expected) return false;
  if (!safeEqual(code.trim(), expected)) return false;
  return issue({ role: "admin" });
}

/** Start a partner session for an already-resolved partner id. */
export function startPartnerSession(partnerId: string): boolean {
  return issue({ role: "partner", partnerId });
}

export function endOpsSession() {
  deleteCookie(COOKIE, { path: "/" });
}

/** Current session, or null. Never throws. */
export function readOpsSession(): OpsSession | null {
  const key = secret();
  if (!key) return null;
  const raw = getCookie(COOKIE);
  if (!raw) return null;
  return decode(raw, key);
}

export function requireAdmin(): OpsSession {
  const s = readOpsSession();
  if (!s || s.role !== "admin") throw new OpsUnauthorizedError();
  return s;
}

/** Admin, or a partner acting on their own data. */
export function requireOps(): OpsSession {
  const s = readOpsSession();
  if (!s) throw new OpsUnauthorizedError();
  return s;
}
