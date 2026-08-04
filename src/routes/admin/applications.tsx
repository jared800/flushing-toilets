import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { useAdminGate } from "@/components/admin/use-admin-gate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PartnerApplication } from "@/lib/marketplace-types";
import {
  listApplicationsFn,
  updateApplicationStatusFn,
} from "@/lib/marketplace.functions";

export const Route = createFileRoute("/admin/applications")({
  component: AdminApplicationsPage,
  head: () => ({ meta: [{ title: "Applications — Admin" }] }),
});

function AdminApplicationsPage() {
  const { ready, authed } = useAdminGate();
  const [apps, setApps] = useState<PartnerApplication[]>([]);

  async function refresh() {
    setApps(await listApplicationsFn());
  }

  useEffect(() => {
    if (authed) void refresh();
  }, [authed]);

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
        Partner applications
      </h1>
      <p className="mt-1 text-sm text-fg-muted">
        Review license info and approve or reject. Demo only — no real activation
        email.
      </p>

      <div className="mt-8 space-y-3">
        {apps.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-surface p-8 text-center text-sm text-fg-muted">
            No applications yet. Submit one from For plumbers → Apply.
          </p>
        ) : (
          apps.map((app) => (
            <article
              key={app.id}
              className="rounded-xl border border-border bg-surface p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-lg font-semibold text-harbor">
                      {app.company}
                    </h2>
                    <Badge
                      variant={
                        app.status === "approved"
                          ? "success"
                          : app.status === "rejected"
                            ? "danger"
                            : "signal"
                      }
                    >
                      {app.status}
                    </Badge>
                    <Badge variant="harbor">{app.tier}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-fg-muted">
                    {app.contactName} · {app.email} · {app.phone}
                  </p>
                  <p className="mt-1 text-sm text-fg-muted">
                    License {app.license} · {app.stateSlug}
                    {app.cities ? ` · ${app.cities}` : ""}
                  </p>
                  {app.notes && (
                    <p className="mt-2 text-sm text-fg">{app.notes}</p>
                  )}
                  <p className="mt-2 text-xs text-fg-subtle">
                    {new Date(app.createdAt).toLocaleString()} · {app.id}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      void updateApplicationStatusFn({
                        data: { id: app.id, status: "approved" },
                      }).then(refresh)
                    }
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      void updateApplicationStatusFn({
                        data: { id: app.id, status: "rejected" },
                      }).then(refresh)
                    }
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      void updateApplicationStatusFn({
                        data: { id: app.id, status: "pending" },
                      }).then(refresh)
                    }
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </AdminShell>
  );
}
