import { createServerFn } from "@tanstack/react-start";

export type OpsSessionView =
  | { role: "admin" }
  | { role: "partner"; partnerId: string }
  | { role: null };

/** Who is the caller? Used by the route gates instead of localStorage. */
export const opsSessionFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<OpsSessionView> => {
    const { readOpsSession } = await import("./ops-auth.server");
    const s = readOpsSession();
    if (!s) return { role: null };
    if (s.role === "admin") return { role: "admin" };
    return { role: "partner", partnerId: s.partnerId ?? "" };
  },
);

export const adminLoginFn = createServerFn({ method: "POST" })
  .validator((data: { code: string }) => data)
  .handler(async ({ data }): Promise<{ ok: boolean; reason?: string }> => {
    const { startAdminSession, opsAuthConfigured } = await import(
      "./ops-auth.server"
    );
    const cfg = opsAuthConfigured();
    if (!cfg.secret || !cfg.adminCode) {
      return {
        ok: false,
        reason:
          "Admin sign-in is disabled until OPS_SESSION_SECRET and ADMIN_ACCESS_CODE are set.",
      };
    }
    if (!startAdminSession(data.code ?? "")) {
      return { ok: false, reason: "Incorrect access code." };
    }
    return { ok: true };
  });

export const partnerLoginFn = createServerFn({ method: "POST" })
  .validator((data: { email: string }) => data)
  .handler(async ({ data }): Promise<{ ok: boolean; reason?: string }> => {
    const { startPartnerSession, opsAuthConfigured } = await import(
      "./ops-auth.server"
    );
    const { getPartnerByEmail } = await import("@/data/partners");
    if (!opsAuthConfigured().secret) {
      return {
        ok: false,
        reason: "Partner sign-in is disabled until OPS_SESSION_SECRET is set.",
      };
    }
    const partner = getPartnerByEmail(data.email ?? "");
    // Same message either way so this cannot be used to enumerate partners.
    if (!partner || !startPartnerSession(partner.id)) {
      return { ok: false, reason: "That email is not on the partner list." };
    }
    return { ok: true };
  });

export const opsLogoutFn = createServerFn({ method: "POST" }).handler(
  async () => {
    const { endOpsSession } = await import("./ops-auth.server");
    endOpsSession();
    return { ok: true };
  },
);
