import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { GeoSearch } from "@/components/search/geo-search";
import { STATES } from "@/data/locations";

export const Route = createFileRoute("/locations/")({
  component: LocationsIndexPage,
  head: () => ({
    meta: [
      { title: "Plumber locations — Flushing Toilets" },
      {
        name: "description",
        content:
          "Browse toilet plumber coverage by state and city across Texas, Florida, and Arizona.",
      },
    ],
  }),
});

function LocationsIndexPage() {
  return (
    <SiteShell>
      <PageHero
        kicker="Locations"
        title="Find a plumber in your city"
        description="Search by city or ZIP, or browse our deep launch markets."
      >
        <GeoSearch className="max-w-2xl" />
      </PageHero>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-6">
          {STATES.map((state) => (
            <section
              key={state.slug}
              className="rounded-xl border border-border bg-surface p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-harbor">
                    <Link
                      to="/locations/$state"
                      params={{ state: state.slug }}
                      className="hover:text-harbor-mid"
                    >
                      {state.name}
                    </Link>
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-fg-muted">
                    {state.blurb}
                  </p>
                </div>
                <Link
                  to="/locations/$state"
                  params={{ state: state.slug }}
                  className="text-sm font-semibold text-stream hover:underline"
                >
                  View state
                </Link>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {state.cities.map((city) => (
                  <Link
                    key={city.slug}
                    to="/locations/$state/$city"
                    params={{ state: state.slug, city: city.slug }}
                    className="rounded-full border border-border bg-bg px-3 py-1.5 text-sm font-medium text-fg hover:border-stream/40 hover:bg-stream-soft/40"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
