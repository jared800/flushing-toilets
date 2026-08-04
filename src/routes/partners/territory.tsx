import { createFileRoute, Link } from "@tanstack/react-router";
import { PartnerShell } from "@/components/partners/partner-shell";
import { usePartnerGate } from "@/components/partners/use-partner-gate";
import { Badge } from "@/components/ui/badge";
import { getState } from "@/data/locations";
import { SERVICES } from "@/data/services";
import { TIER_META } from "@/data/partners";

export const Route = createFileRoute("/partners/territory")({
  component: PartnerTerritoryPage,
  head: () => ({ meta: [{ title: "Territory — Partner dashboard" }] }),
});

function PartnerTerritoryPage() {
  const partner = usePartnerGate();
  if (!partner) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-fg-muted">
        Loading…
      </div>
    );
  }

  const state = getState(partner.stateSlug);
  const tier = TIER_META[partner.tier];

  return (
    <PartnerShell partner={partner}>
      <h1 className="font-display text-3xl font-semibold text-harbor">
        Territory
      </h1>
      <p className="mt-1 text-sm text-fg-muted">
        {tier.name} coverage in {state?.name}
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-harbor">
            Cities
          </h2>
          <ul className="mt-3 space-y-2">
            {partner.citySlugs.map((slug) => {
              const city = state?.cities.find((c) => c.slug === slug);
              return (
                <li key={slug}>
                  <Link
                    to="/locations/$state/$city"
                    params={{ state: partner.stateSlug, city: slug }}
                    className="flex items-center justify-between rounded-lg border border-border bg-bg px-3 py-2 text-sm hover:border-stream/40"
                  >
                    <span className="font-medium text-fg">
                      {city?.name ?? slug}
                    </span>
                    <Badge variant="harbor">{state?.abbr}</Badge>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-harbor">
            Services
          </h2>
          <ul className="mt-3 space-y-2">
            {SERVICES.filter((s) => partner.services.includes(s.slug)).map(
              (s) => (
                <li
                  key={s.slug}
                  className="rounded-lg border border-border bg-bg px-3 py-2 text-sm font-medium text-fg"
                >
                  {s.name}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </PartnerShell>
  );
}
