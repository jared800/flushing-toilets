import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { LeadForm } from "@/components/leads/lead-form";
import { PartnerCard } from "@/components/partners/partner-card";
import { StickyMobileCta } from "@/components/shared/sticky-mobile-cta";
import { CityTrustBlock } from "@/components/shared/city-trust";
import { FaqSection } from "@/components/shared/faq-section";
import { Badge } from "@/components/ui/badge";
import { getCity } from "@/data/locations";
import { partnersForCity } from "@/data/partners";
import { getService, urgencyLabel } from "@/data/services";
import { cityServiceFaqs } from "@/data/faqs";
import {
  getMetroServiceContent,
  getMetroContent,
  hasUniqueLocalContent,
} from "@/data/metro-content";
import { isIndexableCityService } from "@/data/indexable-city-services";

export const Route = createFileRoute("/locations/$state_/$city_/$service")({
  loader: ({ params }) => {
    const match = getCity(params.state, params.city);
    const service = getService(params.service);
    if (!match || !service) throw notFound();
    const partners = partnersForCity(match.state.slug, match.city.slug).filter(
      (p) => p.services.includes(service.slug),
    );
    const metro = getMetroContent(match.state.slug, match.city.slug);
    const metroService = getMetroServiceContent(
      match.state.slug,
      match.city.slug,
      service.slug,
    );
    return { ...match, service, partners, metro, metroService };
  },
  component: CityServicePage,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.service.name ?? "Service"} in ${loaderData?.city.name ?? "your city"}, ${loaderData?.state.abbr ?? ""} — Flushing Toilets`,
      },
      {
        name: "description",
        content: loaderData?.metroService
          ? loaderData.metroService.intro
          : loaderData
            ? `${loaderData.service.seoBlurb} Serving ${loaderData.city.name}, ${loaderData.state.abbr}.`
            : "",
      },
      // City x service pages are near-duplicates of each other across
      // cities, so they stay out of the index unless explicitly allowlisted
      // (src/data/indexable-city-services.ts). Templated cities are always
      // noindexed — see hasUniqueLocalContent().
      ...(loaderData &&
      (!hasUniqueLocalContent(loaderData.state.slug, loaderData.city.slug) ||
        !isIndexableCityService(
          loaderData.state.slug,
          loaderData.city.slug,
          loaderData.service.slug,
        ))
        ? [{ name: "robots", content: "noindex, follow" }]
        : []),
    ],
  }),
});

function CityServicePage() {
  const { state, city, service, partners, metro, metroService } =
    Route.useLoaderData();

  const title = metroService?.headline ?? `${service.name} in ${city.name}`;
  const description =
    metroService?.intro ??
    `${service.summary} Send a request and a person reads it before anything happens.`;

  const faqs = cityServiceFaqs(
    city.name,
    state.abbr,
    service,
    metroService?.localFactors ?? metro?.localFactors,
  );

  const isEmergency =
    service.urgency === "critical" || service.slug === "emergency-plumber";

  return (
    <SiteShell>
      <PageHero
        kicker={`${city.name}, ${state.abbr}`}
        title={title}
        description={description}
      >
        <Badge
          variant={
            service.urgency === "critical"
              ? "danger"
              : service.urgency === "high"
                ? "signal"
                : "stream"
          }
        >
          {urgencyLabel(service.urgency)} intent
        </Badge>
      </PageHero>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-harbor">
              {service.name} help in {city.name}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              {metroService
                ? metroService.intro
                : `${city.blurb} When you need ${service.name.toLowerCase()} service, send a request from a ${city.name} ZIP such as ${city.zips.slice(0, 3).join(", ")} and a person reads it. If an independent plumber who covers your area is available, we pass it on; if not, we tell you.`}
            </p>
            {metroService && (
              <>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-fg-subtle">
                  Local notes
                </p>
                <ul className="mt-2 space-y-2">
                  {metroService.localFactors.map((f) => (
                    <li key={f} className="text-sm text-fg-muted">
                      · {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm font-medium text-stream">
                  {metroService.responseNote}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {metroService.neighborhoods.map((n) => (
                    <span
                      key={n}
                      className="rounded-full border border-border bg-bg px-2.5 py-1 text-xs font-medium text-fg"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </>
            )}
            {!metroService && (
              <ul className="mt-4 space-y-2">
                {service.symptoms.slice(0, 4).map((s) => (
                  <li key={s} className="text-sm text-fg-muted">
                    · {s}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <Link
            to="/diagnostic"
            className="block rounded-xl border border-stream/30 bg-stream-soft/30 p-4 transition hover:border-stream/60"
          >
            <span className="block font-display text-lg font-semibold text-harbor">
              Not sure this is your problem?
            </span>
            <span className="mt-1 block text-sm leading-relaxed text-fg-muted">
              Run the free diagnostic — a few questions and you&rsquo;ll know
              what&rsquo;s actually wrong and whether you need a plumber at all.
            </span>
          </Link>

          <CityTrustBlock
            stateSlug={state.slug}
            citySlug={city.slug}
            cityName={city.name}
            serviceSlug={service.slug}
          />

          {/* The "Matched partners" block was removed 2026-10-22: no plumber
              has signed, so it was an empty claim. It only renders again if a
              real signed plumber is added to src/data/partners.ts. */}
          {partners.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-semibold text-harbor">
                Plumbers who cover this service
              </h2>
              <div className="mt-4 space-y-3">
                {partners.map((p) => (
                  <PartnerCard key={p.id} partner={p} />
                ))}
              </div>
            </section>
          )}

          <FaqSection
            title={`FAQ · ${service.name} in ${city.name}`}
            items={faqs}
            schemaId={`svc-${state.slug}-${city.slug}-${service.slug}`}
          />

          <p className="text-sm text-fg-muted">
            Looking for something else in {city.name}?{" "}
            <Link
              to="/locations/$state/$city"
              params={{ state: state.slug, city: city.slug }}
              className="font-semibold text-stream hover:underline"
            >
              See all services
            </Link>
          </p>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <LeadForm
            variant={isEmergency ? "emergency" : "full"}
            defaults={{
              serviceSlug: service.slug,
              stateSlug: state.slug,
              citySlug: city.slug,
              cityLabel: `${city.name}, ${state.abbr}`,
              zip: city.zips[0],
              sourcePath: `/locations/${state.slug}/${city.slug}/${service.slug}`,
              urgency: isEmergency ? "emergency" : "today",
            }}
            title={`${service.name} in ${city.name}`}
            subtitle="A person reads your request. If a plumber who covers this area is available, we pass it on; if not, we tell you."
          />
        </div>
      </div>
      <StickyMobileCta />
      <div className="h-16 sm:hidden" />
    </SiteShell>
  );
}
