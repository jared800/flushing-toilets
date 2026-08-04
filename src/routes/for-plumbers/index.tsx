import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TIER_META } from "@/data/partners";

export const Route = createFileRoute("/for-plumbers/")({
  component: ForPlumbersPage,
  head: () => ({
    meta: [
      { title: "For plumbers — Flushing Toilets Partners" },
      {
        name: "description",
        content:
          "High-intent toilet leads. Hybrid Connect, Preferred, and Exclusive plans for licensed plumbers.",
      },
    ],
  }),
});

const tiers = [
  {
    key: "connect" as const,
    tagline: "Affordable entry for growing shops",
    features: [
      "Listed on city & service pages",
      "Shared leads (max 3 recipients)",
      "Lead dashboard + alerts",
      "License badge on profile",
    ],
  },
  {
    key: "preferred" as const,
    tagline: "Top placement + first look",
    highlight: true,
    features: [
      "Everything in Connect",
      "Featured badge & ranking",
      "Priority routing window",
      "Monthly performance report",
    ],
  },
  {
    key: "exclusive" as const,
    tagline: "Own the zip or small city",
    features: [
      "Everything in Preferred",
      "Primary territory rights",
      "Included lead allotment",
      "Custom city-page blurb",
    ],
  },
];

function ForPlumbersPage() {
  return (
    <SiteShell>
      <PageHero
        kicker="Flushing Toilets Partners"
        title="Toilet-intent leads, not tire-kickers"
        description="Homeowners searching for clogged, running, leaking, and emergency toilet help in your cities. Hybrid plans: monthly subscription plus pay-per-lead."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/for-plumbers/apply">Apply to partner</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/for-plumbers/territory">Territory board</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/for-plumbers/pricing">See pricing</Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link to="/partners/login">Partner login</Link>
          </Button>
        </div>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-3">
          {tiers.map((tier) => {
            const meta = TIER_META[tier.key];
            return (
              <div
                key={tier.key}
                className={`relative rounded-xl border bg-surface p-5 shadow-sm ${
                  tier.highlight
                    ? "border-signal/50 ring-2 ring-signal/25"
                    : "border-border"
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-5 rounded-full bg-signal px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink">
                    Best default
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl font-semibold text-harbor">
                    {meta.name}
                  </h2>
                  <Badge variant={tier.highlight ? "signal" : "harbor"}>
                    {meta.badge}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-fg-muted">{tier.tagline}</p>
                <p className="mt-4 font-display text-2xl font-semibold text-fg">
                  {meta.monthly}
                </p>
                <p className="text-sm text-fg-muted">Leads: {meta.lead}</p>
                <ul className="mt-5 space-y-2 border-t border-border pt-4">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-fg-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-stream" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            {
              t: "High intent",
              d: "Pages target toilet problems — not vague “plumber near me” alone.",
            },
            {
              t: "Territory control",
              d: "Exclusive zips and Preferred priority windows protect your close rate.",
            },
            {
              t: "Simple ops",
              d: "Lead inbox, status updates, and invalid-lead feedback in one dashboard.",
            },
          ].map((item) => (
            <div
              key={item.t}
              className="rounded-xl border border-border bg-bg-elevated p-5"
            >
              <h3 className="font-display text-lg font-semibold text-harbor">
                {item.t}
              </h3>
              <p className="mt-2 text-sm text-fg-muted">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
