import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { Partner } from "@/data/partners";
import { getSessionPartner } from "@/lib/partner-session";

export function usePartnerGate() {
  const navigate = useNavigate();
  const [partner, setPartner] = useState<Partner | null | undefined>(undefined);

  useEffect(() => {
    const p = getSessionPartner();
    if (!p) {
      void navigate({ to: "/partners/login" });
      setPartner(null);
      return;
    }
    setPartner(p);
  }, [navigate]);

  return partner;
}
