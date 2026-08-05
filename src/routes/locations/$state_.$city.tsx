import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { LeadForm } from "@/components/leads/lead-form";
import { PartnerCard } from "@/components/partners/partner-card";
import { StickyMobileCta } from "@/components/shared/sticky-mobile-cta";
import { CityTrustBlock } from "@/components/shared/city-trust";
import { FaqSection } from "@/components/shared/faq-section";
import { getCity } from "@/data/locations";
import { partnersForCity } from "@/data/partners";
import { SERVICES } from "@/data/services";
import { cityFaqs } from "@/data/faqs";
import { getMetroContent } from "@/data/metro-content";

export const Route = createFileRoute("/locations/$state_/$city")({
  loader: ({ params }) => {
    const match = getCity(params.state, params.city);
    if (!match) throw notFound();
    const partners = partnersForCity(match.state.slug, match.city.slug);
    const metro = getMetroContent(match.state.slug, match.city.slug);
    return { ...match, partners, metro };
  },
  component: CityPage,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Toilet plumbers in ${loaderData?.city.name ?? "your city"}, ${loaderData?.state.abbr ?? ""} — Flushing Toilets`,
      },
      {
        name: "description",
        content:
          loaderData?.metro?.heroExtra ?? loaderData?.city.blurb ?? "",
      },
    ],
  }),
});

function CityPage() {
  const { state, city, partners, metro } = Route.useLoaderData();
  const description = metro
    ? `${city.blurb} ${metro.heroExtra}`
    : city.blurb;
  const faqs = cityFaqs(city.name, state.abbr);

  return (
    <SiteShell>
      <PageHero
        kicker={`${state.name} / ${city.name}`}
        title={`Toilet plumbers in ${city.name}, ${state.abbr}`}
        description={description}
      >
        {metro && (
          <p className="max-w-2xl text-sm font-medium text-stream">
            {metro.trustLine}
          </p>
        )}
      </PageHero>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          {metro && (
            <section className="rounded-xl border border-stream/25 bg-stream-soft/40 p-5">
              <h2 className="font-display text-xl font-semibold text-harbor">
                Local factors in {city.name}
              </h2>
              <ul className="mt-3 space-y-2">
                {metro.localFactors.map((f) => (
                  <li key={f} className="text-sm text-fg-muted">
                    · {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-fg-subtle">
                Neighborhoods often served
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {metro.neighborhoods.map((n) => (
                  <span
                    key={n}
                    className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-fg"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="font-display text-2xl font-semibold text-harbor">
              Services in {city.name}
            </h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {SERVICES.map((s) => {
                const metroSvc = metro?.services[s.slug];
                return (
                  <Link
                    key={s.slug}
                    to="/locations/$state/$city/$service"
                    params={{
                      state: state.slug,
                      city: city.slug,
                      service: s.slug,
                    }}
                    className="rounded-lg border border-border bg-surface px-3 py-3 text-sm font-semibold text-harbor shadow-sm hover:border-stream/40"
                  >
                    {s.name}
                    <span className="mt-1 block text-xs font-normal text-fg-muted">
                      {metroSvc?.headline ?? s.seoBlurb}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          <CityTrustBlock
            stateSlug={state.slug}
            citySlug={city.slug}
            cityName={city.name}
          />

          <section>
            <h2 className="font-display text-2xl font-semibold text-harbor">
              Partner plumbers
            </h2>
            {partners.length > 0 && (
              <p className="mt-1 text-sm text-fg-muted">
                Exclusive and Preferred partners appear first.
              </p>
            )}
            <div className="mt-4 space-y-3">
              {partners.length === 0 ? (
                <p className="rounded-lg border border-dashed border-border bg-bg px-4 py-6 text-sm text-fg-muted">
                  We are still signing plumbers in {city.name}. Send your
                  request anyway — it comes straight to us, and we call you back
                  with a licensed local plumber instead of leaving you waiting
                  on a listing.
                </p>
              ) : (
                partners.map((p) => <PartnerCard key={p.id} partner={p} />)
              )}
            </div>
          </section>

          <FaqSection
            title={`FAQ · ${city.name}`}
            items={faqs}
            schemaId={`city-${state.slug}-${city.slug}`}
          />

          <section className="rounded-xl border border-border bg-bg-elevated p-5">
            <h2 className="font-display text-lg font-semibold text-harbor">
              Nearby ZIPs
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {city.zips.map((z) => (
                <span
                  key={z}
                  className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-fg-muted"
                >
                  {z}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <LeadForm
            variant="emergency"
            defaults={{
              stateSlug: state.slug,
              citySlug: city.slug,
              cityLabel: `${city.name}, ${state.abbr}`,
              zip: city.zips[0],
              sourcePath: `/locations/${state.slug}/${city.slug}`,
              urgency: "emergency",
            }}
            title={`Get help in ${city.name}`}
            subtitle="Emergency starts with ZIP + phone. Expand for full details."
          />
        </div>
      </div>
      <StickyMobileCta />
      <div className="h-16 sm:hidden" />
    </SiteShell>
  );
}
