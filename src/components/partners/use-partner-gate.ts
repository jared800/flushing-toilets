import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getPartner, type Partner } from "@/data/partners";
import { opsSessionFn } from "@/lib/ops-auth.functions";

/**
 * Server-verified partner session. `undefined` while resolving, `null` when
 * signed out (and redirects), otherwise the Partner record.
 */
export function usePartnerGate() {
  const navigate = useNavigate();
  const [partner, setPartner] = useState<Partner | null | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    void (async () => {
      let resolved: Partner | null = null;
      try {
        const session = await opsSessionFn();
        if (session.role === "partner") {
          resolved = getPartner(session.partnerId) ?? null;
        }
      } catch {
        resolved = null;
      }
      if (!alive) return;
      setPartner(resolved);
      if (!resolved) void navigate({ to: "/partners/login" });
    })();
    return () => {
      alive = false;
    };
  }, [navigate]);

  return partner;
}
