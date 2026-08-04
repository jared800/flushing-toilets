import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/for-plumbers/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [{ title: "Partner pricing — Flushing Toilets" }],
  }),
});

function PricingPage() {
  return (
    <SiteShell>
      <PageHero
        kicker="Pricing"
        title="Hybrid pricing that scales with demand"
        description="Monthly subscription for placement and territory. Pay-per-lead for real homeowner inquiries. Ranges vary by market."
      />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-muted text-xs uppercase tracking-wide text-fg-subtle">
              <tr>
                <th className="px-4 py-3 font-semibold">Tier</th>
                <th className="px-4 py-3 font-semibold">Monthly</th>
                <th className="px-4 py-3 font-semibold">Per lead</th>
                <th className="px-4 py-3 font-semibold">Routing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-fg-muted">
              <tr>
                <td className="px-4 py-3 font-semibold text-fg">Connect</td>
                <td className="px-4 py-3">$149–$249 / city</td>
                <td className="px-4 py-3">$28–$48</td>
                <td className="px-4 py-3">Shared ≤3</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-fg">Preferred</td>
                <td className="px-4 py-3">$349–$599 / city</td>
                <td className="px-4 py-3">$42–$72</td>
                <td className="px-4 py-3">5-min priority</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-fg">Exclusive</td>
                <td className="px-4 py-3">$799–$1,999</td>
                <td className="px-4 py-3">Allotment / discounted</td>
                <td className="px-4 py-3">Primary territory</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-bg-elevated p-5">
          <h2 className="font-display text-lg font-semibold text-harbor">
            Lead modifiers
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-fg-muted">
            <li>Emergency / after-hours: +25–40%</li>
            <li>Install / replacement quotes: base to high</li>
            <li>Running toilet / minor: −15–25%</li>
            <li>Sewer backup: +30–50%</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/for-plumbers/apply">Apply now</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/partners/login">Partner login</Link>
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
