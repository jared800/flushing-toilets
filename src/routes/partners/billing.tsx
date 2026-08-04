import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PartnerShell } from "@/components/partners/partner-shell";
import { usePartnerGate } from "@/components/partners/use-partner-gate";
import { Badge } from "@/components/ui/badge";
import { TIER_META } from "@/data/partners";
import type { Lead } from "@/lib/leads-types";
import { listLeadsFn } from "@/lib/marketplace.functions";

export const Route = createFileRoute("/partners/billing")({
  component: PartnerBillingPage,
  head: () => ({ meta: [{ title: "Billing — Partner dashboard" }] }),
});

function PartnerBillingPage() {
  const partner = usePartnerGate();
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    if (!partner) return;
    void listLeadsFn({ data: { partnerId: partner.id } }).then(setLeads);
  }, [partner]);

  const estimate = useMemo(() => {
    if (!partner) return { sub: 0, leadFees: 0, total: 0 };
    const sub =
      partner.tier === "exclusive"
        ? 1299
        : partner.tier === "preferred"
          ? 449
          : 199;
    const perLead =
      partner.tier === "exclusive" ? 0 : partner.tier === "preferred" ? 55 : 38;
    const billable = leads.filter((l) => l.status !== "invalid").length;
    const leadFees = billable * perLead;
    return { sub, leadFees, total: sub + leadFees, billable, perLead };
  }, [partner, leads]);

  if (!partner) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-fg-muted">
        Loading…
      </div>
    );
  }

  const tier = TIER_META[partner.tier];

  return (
    <PartnerShell partner={partner}>
      <h1 className="font-display text-3xl font-semibold text-harbor">Billing</h1>
      <p className="mt-1 text-sm text-fg-muted">
        Demo estimates from your plan + non-invalid leads this period. No real
        charges.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-harbor">
              Current plan
            </h2>
            <Badge variant="success">Active</Badge>
          </div>
          <p className="mt-3 font-display text-2xl font-semibold text-fg">
            {tier.name}
          </p>
          <p className="text-sm text-fg-muted">{tier.monthly}</p>
          <p className="mt-2 text-sm text-fg-muted">Listed rate: {tier.lead}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-harbor">
            This period (est.)
          </h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-fg-muted">Subscription</dt>
              <dd className="font-semibold tabular-nums">${estimate.sub}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-fg-muted">
                Leads ({estimate.billable} × ${estimate.perLead})
              </dt>
              <dd className="font-semibold tabular-nums">${estimate.leadFees}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-2">
              <dt className="font-semibold text-fg">Estimated total</dt>
              <dd className="font-display text-xl font-semibold tabular-nums text-harbor">
                ${estimate.total}
              </dd>
            </div>
          </dl>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-harbor">
            Invoices
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              { id: "INV-1042", label: "Prior month subscription", amount: `$${estimate.sub}.00` },
              {
                id: "INV-1038",
                label: "Lead fees (sample)",
                amount: `$${Math.max(estimate.leadFees, 120)}.00`,
              },
            ].map((inv) => (
              <li
                key={inv.id}
                className="flex items-center justify-between rounded-lg border border-border bg-bg px-3 py-2"
              >
                <span>
                  <span className="font-medium text-fg">{inv.label}</span>
                  <span className="mt-0.5 block text-xs text-fg-subtle">
                    {inv.id}
                  </span>
                </span>
                <span className="font-semibold tabular-nums text-harbor">
                  {inv.amount}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-fg-subtle">
            Stripe billing hooks would attach here in production.
          </p>
        </div>
      </div>
    </PartnerShell>
  );
}
