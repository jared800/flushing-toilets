import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { GeoSearch } from "@/components/search/geo-search";
import { getState } from "@/data/locations";
import { SERVICES } from "@/data/services";
import { WhoRunsThis } from "@/components/shared/who-runs-this";
import { pageUpdated } from "@/data/page-dates";

/** Utah's official license lookup (Division of Professional Licensing). */
const UTAH_LICENSE_LOOKUP = "https://secure.utah.gov/llv/search/index.html";

export const Route = createFileRoute("/locations/$state")({
  loader: ({ params }) => {
    const state = getState(params.state);
    if (!state) throw notFound();
    return { state };
  },
  component: StatePage,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Toilet plumbers in ${loaderData?.state.name ?? "your state"} — Flushing Toilets`,
      },
      {
        name: "description",
        content: loaderData?.state.blurb ?? "",
      },
    ],
  }),
});

function StatePage() {
  const { state } = Route.useLoaderData();

  return (
    <SiteShell>
      <PageHero
        kicker={`Locations / ${state.abbr}`}
        title={`Toilet plumbers in ${state.name}`}
        description={state.blurb}
      >
        <GeoSearch className="max-w-2xl" />
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <section
          aria-label="Short answer"
          className="mb-10 max-w-3xl rounded-xl border border-border bg-surface p-5 shadow-sm"
        >
          <h2 className="font-display text-lg font-semibold text-harbor">
            Short answer
          </h2>
          {state.slug === "utah" ? (
            <p className="mt-2 leading-relaxed text-fg">
              Send a free request from anywhere between Ogden and Utah County.
              A person reads it and passes it to an independent plumber who
              covers your ZIP when one is available. If nobody does, we tell you
              instead of leaving you waiting. We are not a plumbing company.
              Before you hire anyone, check their license with Utah&rsquo;s
              Division of Professional Licensing.
            </p>
          ) : (
            <p className="mt-2 leading-relaxed text-fg">
              You can send a free request from {state.name}. A person reads it
              and passes it on only if an independent plumber covers your ZIP.
              We are starting in Utah and do not have plumbers signed up
              everywhere in {state.name} yet, so if nobody covers your area we
              tell you. For many problems you can start with our free
              diagnostic and repair guides.
            </p>
          )}
          <p className="mt-3 text-sm">
            {state.slug === "utah" ? (
              <a
                href={UTAH_LICENSE_LOOKUP}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-stream hover:underline"
              >
                Utah license lookup (Division of Professional Licensing)
              </a>
            ) : (
              <span className="text-fg-muted">
                Before you hire any plumber, ask for their state license number
                and check it with the state licensing board.
              </span>
            )}
            {" · "}
            <Link to="/diagnostic" className="font-semibold text-stream hover:underline">
              Run the free diagnostic
            </Link>
          </p>
        </section>

        <h2 className="font-display text-2xl font-semibold text-harbor">
          Cities with local pages
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {state.cities.map((city) => (
            <Link
              key={city.slug}
              to="/locations/$state/$city"
              params={{ state: state.slug, city: city.slug }}
              className="rounded-xl border border-border bg-surface p-4 shadow-sm transition-colors hover:border-stream/40"
            >
              <h3 className="font-display text-lg font-semibold text-harbor">
                {city.name}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-fg-muted">
                {city.blurb}
              </p>
              <p className="mt-3 text-xs font-semibold text-stream">
                View services in {city.name}
              </p>
            </Link>
          ))}
        </div>

        <h2 className="mt-12 font-display text-2xl font-semibold text-harbor">
          Popular services in {state.name}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              to="/services/$service"
              params={{ service: s.slug }}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-fg hover:bg-surface-muted"
            >
              {s.name}
            </Link>
          ))}
        </div>

        <WhoRunsThis
          className="mt-12"
          updated={pageUpdated(`/locations/${state.slug}`)}
        />
      </div>
    </SiteShell>
  );
}
