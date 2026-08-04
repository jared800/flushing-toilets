import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { GeoSearch } from "@/components/search/geo-search";
import { findCitiesByQuery } from "@/data/locations";
import { getService } from "@/data/services";

export const Route = createFileRoute("/search")({
  component: SearchPage,
  head: () => ({
    meta: [{ title: "Search — Flushing Toilets" }],
  }),
});

function SearchPage() {
  const href = useRouterState({ select: (s) => s.location.href });
  const url = new URL(href, "http://local");
  const q = url.searchParams.get("q") ?? "";
  const service = url.searchParams.get("service") ?? undefined;
  const results = findCitiesByQuery(q);
  const serviceMeta = service ? getService(service) : undefined;

  return (
    <SiteShell>
      <PageHero
        kicker="Search"
        title={q ? `Results for “${q}”` : "Search cities"}
        description={
          serviceMeta
            ? `Filtering for ${serviceMeta.name.toLowerCase()}.`
            : "Find toilet plumber coverage by city or ZIP."
        }
      >
        <GeoSearch className="max-w-2xl" defaultService={service} />
      </PageHero>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {results.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface p-8 text-center">
            <p className="text-fg-muted">
              No cities matched. Try a different ZIP or{" "}
              <Link to="/locations" className="font-semibold text-stream">
                browse locations
              </Link>
              .
            </p>
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {results.map(({ state, city }) => (
              <li key={`${state.slug}-${city.slug}`}>
                {service ? (
                  <Link
                    to="/locations/$state/$city/$service"
                    params={{
                      state: state.slug,
                      city: city.slug,
                      service,
                    }}
                    className="block rounded-xl border border-border bg-surface p-4 shadow-sm hover:border-stream/40"
                  >
                    <CityResultLabel
                      cityName={city.name}
                      abbr={state.abbr}
                      zips={city.zips}
                    />
                  </Link>
                ) : (
                  <Link
                    to="/locations/$state/$city"
                    params={{ state: state.slug, city: city.slug }}
                    className="block rounded-xl border border-border bg-surface p-4 shadow-sm hover:border-stream/40"
                  >
                    <CityResultLabel
                      cityName={city.name}
                      abbr={state.abbr}
                      zips={city.zips}
                    />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </SiteShell>
  );
}

function CityResultLabel({
  cityName,
  abbr,
  zips,
}: {
  cityName: string;
  abbr: string;
  zips: string[];
}) {
  return (
    <>
      <p className="font-display text-lg font-semibold text-harbor">
        {cityName}, {abbr}
      </p>
      <p className="mt-1 text-xs text-fg-subtle">
        ZIPs {zips.slice(0, 3).join(", ")}
      </p>
    </>
  );
}
