import { getPartner, type Partner } from "@/data/partners";

const KEY = "ft-partner-session-v1";

export function getSessionPartnerId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(KEY);
}

export function setSessionPartnerId(id: string | null) {
  if (typeof window === "undefined") return;
  if (id) window.localStorage.setItem(KEY, id);
  else window.localStorage.removeItem(KEY);
}

export function getSessionPartner(): Partner | null {
  const id = getSessionPartnerId();
  if (!id) return null;
  return getPartner(id) ?? null;
}
