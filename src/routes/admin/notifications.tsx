import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { useAdminGate } from "@/components/admin/use-admin-gate";
import { Badge } from "@/components/ui/badge";
import { listNotificationsFn } from "@/lib/marketplace.functions";

export const Route = createFileRoute("/admin/notifications")({
  component: AdminNotificationsPage,
  head: () => ({ meta: [{ title: "Notify log — Admin" }] }),
});

function AdminNotificationsPage() {
  const { ready, authed } = useAdminGate();
  const [log, setLog] = useState<
    Awaited<ReturnType<typeof listNotificationsFn>>
  >([]);

  useEffect(() => {
    if (authed) void listNotificationsFn().then(setLog);
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
        Notify log
      </h1>
      <p className="mt-1 text-sm text-fg-muted">
        Partner email/SMS stubs stored in the database. Ready to swap in Resend
        / Twilio later.
      </p>

      <div className="mt-8 space-y-3">
        {log.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-surface p-8 text-center text-sm text-fg-muted">
            No notifications yet. Submit a consumer lead to generate stubs.
          </p>
        ) : (
          log.map((n) => (
            <article
              key={n.id}
              className="rounded-xl border border-border bg-surface p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={n.channel === "sms" ? "signal" : "harbor"}>
                  {n.channel}
                </Badge>
                <Badge variant="stream">{n.status}</Badge>
                <span className="text-xs text-fg-subtle">
                  {new Date(n.at).toLocaleString()}
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-fg">{n.subject}</p>
              <p className="mt-1 text-sm text-fg-muted">To: {n.to}</p>
              <p className="mt-2 whitespace-pre-wrap text-xs text-fg-subtle">
                {n.body}
              </p>
              <Link
                to="/admin/leads/$leadId"
                params={{ leadId: n.leadId }}
                className="mt-3 inline-block text-xs font-semibold text-stream hover:underline"
              >
                Open lead {n.leadId}
              </Link>
            </article>
          ))
        )}
      </div>
    </AdminShell>
  );
}
