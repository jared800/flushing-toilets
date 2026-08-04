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
import { getMetroServiceContent, getMetroContent } from "@/data/metro-content";

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
    ],
  }),
});

function CityServicePage() {
  const { state, city, service, partners, metro, metroService } =
    Route.useLoaderData();

  const title = metroService?.headline ?? `${service.name} in ${city.name}`;
  const description =
    metroService?.intro ??
    `${service.summary} Local pages like this help you find licensed help fast in ${city.name}.`;

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
                : `${city.blurb} When you need ${service.name.toLowerCase()} service, Flushing Toilets matches you with independent licensed plumbers covering ${city.name} ZIPs including ${city.zips.slice(0, 3).join(", ")}.`}
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

          <CityTrustBlock
            stateSlug={state.slug}
            citySlug={city.slug}
            cityName={city.name}
            serviceSlug={service.slug}
          />

          <section>
            <h2 className="font-display text-xl font-semibold text-harbor">
              Matched partners for this service
            </h2>
            <div className="mt-4 space-y-3">
              {partners.length === 0 ? (
                <p className="text-sm text-fg-muted">
                  No partner currently lists this exact service in {city.name}.
                  Submit the form and we’ll still route your request.
                </p>
              ) : (
                partners.map((p) => <PartnerCard key={p.id} partner={p} />)
              )}
            </div>
          </section>

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
            subtitle="We’ll notify local partner plumbers who cover this area."
          />
        </div>
      </div>
      <StickyMobileCta />
      <div className="h-16 sm:hidden" />
    </SiteShell>
  );
}
