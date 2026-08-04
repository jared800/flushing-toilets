import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { useAdminGate } from "@/components/admin/use-admin-gate";
import { Button } from "@/components/ui/button";
import { leadStats, type Lead } from "@/lib/leads-types";
import {
  listApplicationsFn,
  listLeadsFn,
  listNotificationsFn,
} from "@/lib/marketplace.functions";

export const Route = createFileRoute("/admin/")({
  component: AdminHomePage,
  head: () => ({ meta: [{ title: "Admin — Flushing Toilets" }] }),
});

function AdminHomePage() {
  const { ready, authed } = useAdminGate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [notifyCount, setNotifyCount] = useState(0);
  const [pendingApps, setPendingApps] = useState(0);

  useEffect(() => {
    if (!authed) return;
    void (async () => {
      const [l, n, a] = await Promise.all([
        listLeadsFn({ data: {} }),
        listNotificationsFn(),
        listApplicationsFn(),
      ]);
      setLeads(l);
      setNotifyCount(n.length);
      setPendingApps(a.filter((x) => x.status === "pending").length);
    })();
  }, [authed]);

  if (!ready || !authed) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-fg-muted">
        Checking admin session…
      </div>
    );
  }

  const stats = leadStats(leads);

  return (
    <AdminShell>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-harbor">
            Ops overview
          </h1>
          <p className="mt-1 text-sm text-fg-muted">
            Database-backed marketplace leads (PGLite / Postgres).
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/leads">Open lead inbox</Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label="Total leads" value={stats.total} />
        <Stat label="New" value={stats.new} />
        <Stat label="Emergency" value={stats.emergency} />
        <Stat label="Contacted" value={stats.contacted} />
        <Stat label="Booked" value={stats.booked} />
        <Stat label="Invalid" value={stats.invalid} />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm lg:col-span-2">
          <h2 className="font-display text-lg font-semibold text-harbor">
            Latest leads
          </h2>
          <ul className="mt-3 space-y-2">
            {leads.slice(0, 6).map((l) => (
              <li key={l.id}>
                <Link
                  to="/admin/leads/$leadId"
                  params={{ leadId: l.id }}
                  className="flex items-center justify-between gap-2 rounded-lg border border-border bg-bg px-3 py-2 text-sm hover:border-stream/40"
                >
                  <span className="font-medium text-fg">
                    {l.serviceName} · {l.cityLabel}
                  </span>
                  <span className="text-xs text-fg-subtle">{l.status}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-harbor">
              Notify pipeline
            </h2>
            <p className="mt-2 text-sm text-fg-muted">
              {notifyCount} stub message{notifyCount === 1 ? "" : "s"} logged in
              the database.
            </p>
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link to="/admin/notifications">View notify log</Link>
            </Button>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-harbor">
              Partner applications
            </h2>
            <p className="mt-2 text-sm text-fg-muted">
              {pendingApps} pending review
            </p>
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link to="/admin/applications">Review applications</Link>
            </Button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-fg-subtle">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-harbor">
        {value}
      </p>
    </div>
  );
}
