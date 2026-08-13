import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { useAdminGate } from "@/components/admin/use-admin-gate";
import { LeadDetailCard } from "@/components/leads/lead-detail-card";
import { LeadOutcomeForm } from "@/components/admin/lead-outcome-form";
import type { Lead } from "@/lib/leads-types";
import { getLeadFn } from "@/lib/marketplace.functions";

export const Route = createFileRoute("/admin/leads/$leadId")({
  component: AdminLeadDetailPage,
  head: () => ({ meta: [{ title: "Lead detail — Admin" }] }),
});

function AdminLeadDetailPage() {
  const { leadId } = Route.useParams();
  const { ready, authed } = useAdminGate();
  const [lead, setLead] = useState<Lead | null | undefined>(undefined);

  async function refresh() {
    setLead(await getLeadFn({ data: { id: leadId } }));
  }

  useEffect(() => {
    if (authed) void refresh();
  }, [authed, leadId]);

  if (!ready || !authed || lead === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-fg-muted">
        Loading…
      </div>
    );
  }

  if (!lead) {
    return (
      <AdminShell>
        <p className="text-sm text-fg-muted">Lead not found.</p>
        <Link
          to="/admin/leads"
          className="mt-3 inline-block text-sm font-semibold text-stream"
        >
          Back to inbox
        </Link>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <Link
        to="/admin/leads"
        className="text-sm font-semibold text-stream hover:underline"
      >
        ← All leads
      </Link>
      <h1 className="mt-3 font-display text-3xl font-semibold text-harbor">
        Lead detail
      </h1>
      <p className="mt-1 font-mono text-xs text-fg-subtle">{lead.id}</p>
      <div className="mt-6 space-y-6">
        <LeadDetailCard lead={lead} mode="admin" onChange={() => void refresh()} />
        <LeadOutcomeForm leadId={lead.id} />
      </div>
    </AdminShell>
  );
}
