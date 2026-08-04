import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PartnerShell } from "@/components/partners/partner-shell";
import { usePartnerGate } from "@/components/partners/use-partner-gate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TIER_META } from "@/data/partners";
import { getState } from "@/data/locations";
import type { Lead } from "@/lib/leads-types";
import { listLeadsFn } from "@/lib/marketplace.functions";

export const Route = createFileRoute("/partners/")({
  component: PartnerDashboardPage,
  head: () => ({ meta: [{ title: "Partner dashboard — Flushing Toilets" }] }),
});

function PartnerDashboardPage() {
  const partner = usePartnerGate();
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    if (!partner) return;
    void listLeadsFn({ data: { partnerId: partner.id } }).then(setLeads);
  }, [partner]);

  if (!partner) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-fg-muted">
        Loading partner session…
      </div>
    );
  }

  const tier = TIER_META[partner.tier];
  const state = getState(partner.stateSlug);
  const newCount = leads.filter((l) => l.status === "new").length;

  return (
    <PartnerShell partner={partner}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-harbor">
            Overview
          </h1>
          <p className="mt-1 text-sm text-fg-muted">
            {partner.company} · {tier.name} · {state?.name}
          </p>
        </div>
        <Button asChild>
          <Link to="/partners/leads">View leads</Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="New leads" value={String(newCount)} />
        <Stat label="Total in inbox" value={String(leads.length)} />
        <Stat label="Cities covered" value={String(partner.citySlugs.length)} />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-harbor">
            Plan
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant="harbor">{tier.name}</Badge>
            <span className="text-sm text-fg-muted">{tier.monthly}</span>
          </div>
          <p className="mt-2 text-sm text-fg-muted">Lead fee: {tier.lead}</p>
          <p className="mt-3 text-sm text-fg-muted">{partner.responsePromise}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-harbor">
            Recent leads
          </h2>
          {leads.length === 0 ? (
            <p className="mt-3 text-sm text-fg-muted">
              No leads yet. Submit a consumer request from a city page in your
              territory.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {leads.slice(0, 5).map((l) => (
                <li
                  key={l.id}
                  className="flex items-center justify-between gap-2 rounded-lg border border-border bg-bg px-3 py-2 text-sm"
                >
                  <span className="font-medium text-fg">
                    {l.serviceName} · {l.cityLabel}
                  </span>
                  <Badge
                    variant={
                      l.status === "new"
                        ? "signal"
                        : l.status === "invalid"
                          ? "danger"
                          : "stream"
                    }
                  >
                    {l.status}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </PartnerShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
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
