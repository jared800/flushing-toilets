import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PartnerShell } from "@/components/partners/partner-shell";
import { usePartnerGate } from "@/components/partners/use-partner-gate";
import { LeadDetailCard } from "@/components/leads/lead-detail-card";
import type { Lead } from "@/lib/leads-types";
import { listLeadsFn } from "@/lib/marketplace.functions";

export const Route = createFileRoute("/partners/leads")({
  component: PartnerLeadsPage,
  head: () => ({ meta: [{ title: "Leads — Partner dashboard" }] }),
});

function PartnerLeadsPage() {
  const partner = usePartnerGate();
  const [leads, setLeads] = useState<Lead[]>([]);

  async function refresh() {
    if (!partner) return;
    const all = await listLeadsFn({ data: { partnerId: partner.id } });
    setLeads(all);
  }

  useEffect(() => {
    void refresh();
  }, [partner]);

  if (!partner) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-fg-muted">
        Loading…
      </div>
    );
  }

  return (
    <PartnerShell partner={partner}>
      <h1 className="font-display text-3xl font-semibold text-harbor">Leads</h1>
      <p className="mt-1 text-sm text-fg-muted">
        Database-backed inbox for {partner.company}.
      </p>

      <div className="mt-8 space-y-3">
        {leads.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface p-8 text-center text-sm text-fg-muted">
            No leads assigned yet. Submit a homeowner request from one of your
            city pages.
          </div>
        ) : (
          leads.map((lead) => (
            <LeadDetailCard
              key={lead.id}
              lead={lead}
              mode="partner"
              onChange={() => void refresh()}
            />
          ))
        )}
      </div>
    </PartnerShell>
  );
}
