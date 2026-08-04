import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { useAdminGate } from "@/components/admin/use-admin-gate";
import { LeadDetailCard } from "@/components/leads/lead-detail-card";
import type { Lead, LeadStatus } from "@/lib/leads-types";
import { listLeadsFn } from "@/lib/marketplace.functions";

export const Route = createFileRoute("/admin/leads/")({
  component: AdminLeadsPage,
  head: () => ({ meta: [{ title: "Lead inbox — Admin" }] }),
});

function AdminLeadsPage() {
  const { ready, authed } = useAdminGate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [status, setStatus] = useState<"all" | LeadStatus>("all");
  const [q, setQ] = useState("");

  async function refresh() {
    const l = await listLeadsFn({ data: {} });
    setLeads(l);
  }

  useEffect(() => {
    if (authed) void refresh();
  }, [authed]);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (status !== "all" && l.status !== status) return false;
      if (!q.trim()) return true;
      const hay =
        `${l.name} ${l.phone} ${l.cityLabel} ${l.serviceName} ${l.id}`.toLowerCase();
      return hay.includes(q.trim().toLowerCase());
    });
  }, [leads, status, q]);

  if (!ready || !authed) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-fg-muted">
        Loading…
      </div>
    );
  }

  return (
    <AdminShell>
      <h1 className="font-display text-3xl font-semibold text-harbor">
        Lead inbox
      </h1>
      <p className="mt-1 text-sm text-fg-muted">
        Live from the database — survives page reloads in this session.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, phone, city, ID…"
          className="h-11 flex-1 rounded-lg border border-border bg-surface px-3 text-sm"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "all" | LeadStatus)}
          className="h-11 rounded-lg border border-border bg-surface px-3 text-sm"
        >
          <option value="all">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="booked">Booked</option>
          <option value="invalid">Invalid</option>
        </select>
      </div>

      <div className="mt-6 space-y-3">
        {filtered.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-surface p-8 text-center text-sm text-fg-muted">
            No leads match.
          </p>
        ) : (
          filtered.map((lead) => (
            <div key={lead.id} className="space-y-2">
              <div className="flex justify-end">
                <Link
                  to="/admin/leads/$leadId"
                  params={{ leadId: lead.id }}
                  className="text-xs font-semibold text-stream hover:underline"
                >
                  Open full page
                </Link>
              </div>
              <LeadDetailCard lead={lead} mode="admin" onChange={() => void refresh()} />
            </div>
          ))
        )}
      </div>
    </AdminShell>
  );
}
