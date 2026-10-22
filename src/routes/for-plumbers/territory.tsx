import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCity } from "@/data/locations";
import { getPartner } from "@/data/partners";
import type { TerritoryCell } from "@/lib/marketplace-types";
import { getTerritoryBoardFn } from "@/lib/marketplace.functions";

export const Route = createFileRoute("/for-plumbers/territory")({
  component: TerritoryBoardPage,
  head: () => ({
    meta: [
      { title: "Territory board — Flushing Toilets" },
      {
        name: "description",
        content:
          "See which cities are open for Exclusive, Preferred, or Connect coverage.",
      },
    ],
  }),
});

function TerritoryBoardPage() {
  const [board, setBoard] = useState<TerritoryCell[]>([]);
  const [stateFilter, setStateFilter] = useState("all");

  useEffect(() => {
    void getTerritoryBoardFn().then(setBoard);
  }, []);

  const filtered = useMemo(() => {
    if (stateFilter === "all") return board;
    return board.filter((c) => c.stateSlug === stateFilter);
  }, [board, stateFilter]);

  const openExclusive = board.filter((c) => c.openForExclusive).length;

  return (
    <SiteShell>
      <PageHero
        kicker="Territory"
        title="Where Exclusive is still open"
        description="Live board of partner coverage by city. Exclusive means one primary partner — grab it before a competitor does."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/for-plumbers/apply">Apply for a territory</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/for-plumbers/pricing">See pricing</Link>
          </Button>
        </div>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-fg-muted">
            <span className="font-semibold text-harbor">{openExclusive}</span>{" "}
            cities open for Exclusive · {board.length} cities with any partner
            coverage
          </p>
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="h-10 rounded-lg border border-border bg-surface px-3 text-sm"
          >
            <option value="all">All states</option>
            <option value="texas">Texas</option>
            <option value="florida">Florida</option>
            <option value="arizona">Arizona</option>
          </select>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cell) => {
            const match = getCity(cell.stateSlug, cell.citySlug);
            const exclusive = cell.exclusivePartnerId
              ? getPartner(cell.exclusivePartnerId)
              : null;
            return (
              <div
                key={`${cell.stateSlug}-${cell.citySlug}`}
                className="rounded-xl border border-border bg-surface p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-display text-lg font-semibold text-harbor">
                      {match?.city.name ?? cell.citySlug}
                    </h2>
                    <p className="text-xs text-fg-subtle">
                      {match?.state.abbr ?? cell.stateSlug}
                    </p>
                  </div>
                  {cell.openForExclusive ? (
                    <Badge variant="success">Exclusive open</Badge>
                  ) : (
                    <Badge variant="harbor">Exclusive taken</Badge>
                  )}
                </div>
                <ul className="mt-3 space-y-1 text-sm text-fg-muted">
                  <li>
                    Exclusive:{" "}
                    {exclusive ? exclusive.company : "— available —"}
                  </li>
                  <li>Preferred partners: {cell.preferredCount}</li>
                  <li>Connect partners: {cell.connectCount}</li>
                </ul>
                <Link
                  to="/locations/$state/$city"
                  params={{ state: cell.stateSlug, city: cell.citySlug }}
                  className="mt-3 inline-block text-xs font-semibold text-stream hover:underline"
                >
                  View city page
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </SiteShell>
  );
}
