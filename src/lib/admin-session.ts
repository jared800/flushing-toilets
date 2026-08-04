const KEY = "ft-admin-session-v1";
/** Demo only — not real security */
export const ADMIN_DEMO_CODE = "harbor";

export function isAdminAuthed() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(KEY) === "1";
}

export function setAdminAuthed(on: boolean) {
  if (typeof window === "undefined") return;
  if (on) window.localStorage.setItem(KEY, "1");
  else window.localStorage.removeItem(KEY);
}
