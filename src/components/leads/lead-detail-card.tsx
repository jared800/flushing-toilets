import { useState } from "react";
import { getPartner } from "@/data/partners";
import type { Lead, LeadStatus } from "@/lib/leads-types";
import {
  resendNotificationsFn,
  updateLeadStatusFn,
} from "@/lib/marketplace.functions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LeadDetailCard({
  lead,
  mode,
  onChange,
}: {
  lead: Lead;
  mode: "partner" | "admin";
  onChange: () => void;
}) {
  const [open, setOpen] = useState(mode === "admin");
  const [invalidReason, setInvalidReason] = useState(
    lead.invalidReason ?? "Wrong number / not a real job",
  );
  const [busy, setBusy] = useState(false);

  async function setStatus(status: LeadStatus) {
    setBusy(true);
    try {
      await updateLeadStatusFn({
        data: {
          id: lead.id,
          status,
          by: mode,
          note: status === "invalid" ? invalidReason : undefined,
          invalidReason: status === "invalid" ? invalidReason : undefined,
        },
      });
      onChange();
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-display text-lg font-semibold text-harbor">
              {lead.serviceName}
            </h2>
            <Badge variant={lead.urgency === "emergency" ? "danger" : "signal"}>
              {lead.urgency}
            </Badge>
            <Badge
              variant={
                lead.status === "new"
                  ? "signal"
                  : lead.status === "invalid"
                    ? "danger"
                    : lead.status === "booked"
                      ? "success"
                      : "stream"
              }
            >
              {lead.status}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-fg-muted">
            {lead.name} · {lead.phone} · {lead.cityLabel} {lead.zip}
          </p>
          <p className="mt-1 text-xs text-fg-subtle">
            {new Date(lead.createdAt).toLocaleString()} · {lead.id}
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={() => setOpen((v) => !v)}>
          {open ? "Hide detail" : "View detail"}
        </Button>
      </div>

      {open && (
        <div className="mt-4 space-y-4 border-t border-border pt-4">
          {lead.notes && (
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-fg-subtle">
                Notes
              </p>
              <p className="mt-1 text-sm text-fg">{lead.notes}</p>
            </div>
          )}

          {lead.photoDataUrl && (
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-fg-subtle">
                Photo
              </p>
              <img
                src={lead.photoDataUrl}
                alt="Customer upload"
                className="mt-2 max-h-48 rounded-lg border border-border object-contain"
              />
            </div>
          )}

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-fg-subtle">
              Source
            </p>
            <p className="mt-1 font-mono text-xs text-fg-muted">{lead.sourcePath}</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-fg-subtle">
              Assigned partners
            </p>
            <ul className="mt-2 space-y-1">
              {lead.assignedPartnerIds.map((id) => {
                const p = getPartner(id);
                return (
                  <li key={id} className="text-sm text-fg-muted">
                    {p ? `${p.company} · ${p.email}` : id}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-fg-subtle">
              Status history
            </p>
            <ul className="mt-2 space-y-1.5">
              {lead.statusHistory.map((h, i) => (
                <li key={`${h.at}-${i}`} className="text-xs text-fg-muted">
                  <span className="font-semibold text-fg">{h.status}</span> ·{" "}
                  {h.by} · {new Date(h.at).toLocaleString()}
                  {h.note ? ` — ${h.note}` : ""}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-fg-subtle">
                Notifications ({lead.notifications.length})
              </p>
              {mode === "admin" && (
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={busy}
                  onClick={() => {
                    void (async () => {
                      setBusy(true);
                      try {
                        await resendNotificationsFn({ data: { id: lead.id } });
                        onChange();
                      } finally {
                        setBusy(false);
                      }
                    })();
                  }}
                >
                  Resend stub
                </Button>
              )}
            </div>
            {lead.notifications.length === 0 ? (
              <p className="mt-2 text-xs text-fg-subtle">No notify events yet.</p>
            ) : (
              <ul className="mt-2 max-h-40 space-y-2 overflow-y-auto">
                {lead.notifications.map((n) => (
                  <li
                    key={n.id}
                    className="rounded-lg border border-border bg-bg px-3 py-2 text-xs text-fg-muted"
                  >
                    <span className="font-semibold text-fg">
                      {n.channel.toUpperCase()}
                    </span>{" "}
                    → {n.to}
                    <br />
                    {n.subject}
                    <br />
                    <span className="text-fg-subtle">
                      {new Date(n.at).toLocaleString()} · {n.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {lead.status === "invalid" && lead.invalidReason && (
            <p className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
              Invalid: {lead.invalidReason}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="secondary"
              disabled={busy}
              onClick={() => void setStatus("contacted")}
            >
              Contacted
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={busy}
              onClick={() => void setStatus("booked")}
            >
              Booked
            </Button>
            <Button
              size="sm"
              variant="ghost"
              disabled={busy}
              onClick={() => void setStatus("new")}
            >
              Reopen
            </Button>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border border-border bg-bg p-3 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-1">
              <p className="text-xs font-semibold text-fg-subtle">Invalid reason</p>
              <Input
                value={invalidReason}
                onChange={(e) => setInvalidReason(e.target.value)}
                placeholder="Wrong number, duplicate, not plumbing…"
              />
            </div>
            <Button
              size="sm"
              variant="outline"
              disabled={busy}
              onClick={() => void setStatus("invalid")}
            >
              Mark invalid
            </Button>
          </div>
        </div>
      )}
    </article>
  );
}
