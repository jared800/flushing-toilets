import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { GeoSearch } from "@/components/search/geo-search";
import { LeadForm } from "@/components/leads/lead-form";
import { StickyMobileCta } from "@/components/shared/sticky-mobile-cta";
import { FaqSection } from "@/components/shared/faq-section";
import { getService } from "@/data/services";
import { STATES } from "@/data/locations";
import { serviceFaqs } from "@/data/faqs";
import { guidesForService } from "@/data/guides";
import { METRO_CONTENT } from "@/data/metro-content";

export const Route = createFileRoute("/services/$service")({
  loader: ({ params }) => {
    const service = getService(params.service);
    if (!service) throw notFound();
    return { service };
  },
  component: ServicePage,
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.service.metaTitle ??
          `${loaderData?.service.name ?? "Service"} — Flushing Toilets`,
      },
      {
        name: "description",
        content: loaderData?.service.seoBlurb ?? "",
      },
    ],
  }),
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const faqs = service.faqs ?? serviceFaqs(service);
  const guides = guidesForService(service.slug);
  const localPages = METRO_CONTENT.filter((m) => m.services[service.slug]).map(
    (m) => {
      const state = STATES.find((st) => st.slug === m.stateSlug);
      const city = state?.cities.find((c) => c.slug === m.citySlug);
      return {
        stateSlug: m.stateSlug,
        citySlug: m.citySlug,
        label: `${city?.name ?? m.citySlug}, ${state?.abbr ?? ""}`,
      };
    },
  );
  const isEmergency =
    service.urgency === "critical" || service.slug === "emergency-plumber";

  return (
    <SiteShell>
      <PageHero
        kicker="Service"
        title={service.name}
        description={service.summary}
      >
        <GeoSearch defaultService={service.slug} className="max-w-2xl" />
      </PageHero>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          {service.answer && (
            <section
              aria-label="Short answer"
              className="rounded-xl border border-border bg-surface p-5 shadow-sm"
            >
              <h2 className="font-display text-lg font-semibold text-harbor">
                Short answer
              </h2>
              <p className="mt-2 leading-relaxed text-fg">{service.answer}</p>
            </section>
          )}
          {service.sections?.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-harbor">
                {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="text-base leading-relaxed text-fg-muted"
                >
                  {p}
                </p>
              ))}
              {section.steps && (
                <ol className="list-decimal space-y-2 pl-5 text-base leading-relaxed text-fg-muted">
                  {section.steps.map((st) => (
                    <li key={st.slice(0, 30)}>{st}</li>
                  ))}
                </ol>
              )}
            </section>
          ))}
          <section>
            <h2 className="font-display text-2xl font-semibold text-harbor">
              Common signs
            </h2>
            <ul className="mt-3 space-y-2">
              {service.symptoms.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-fg-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-harbor">
              What a plumber typically does
            </h2>
            <ul className="mt-3 space-y-2">
              {service.whatWeDo.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-fg-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <FaqSection
            title={`FAQ · ${service.name}`}
            items={faqs}
            schemaId={`service-${service.slug}`}
          />
          {guides.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-semibold text-harbor">
                Guides for this problem
              </h2>
              <ul className="mt-3 space-y-2">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <Link
                      to="/guides/$slug"
                      params={{ slug: g.slug }}
                      className="text-sm font-medium text-stream hover:underline"
                    >
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {localPages.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-semibold text-harbor">
                {service.name} by city
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {localPages.map((lp) => (
                  <Link
                    key={`${lp.stateSlug}/${lp.citySlug}`}
                    to="/locations/$state/$city/$service"
                    params={{
                      state: lp.stateSlug,
                      city: lp.citySlug,
                      service: service.slug,
                    }}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-harbor hover:bg-surface-muted"
                  >
                    {lp.label}
                  </Link>
                ))}
              </div>
            </section>
          )}
          {service.sources?.length ? (
            <section aria-label="Sources">
              <h2 className="font-display text-lg font-semibold text-harbor">
                Sources
              </h2>
              <ul className="mt-2 space-y-1 text-sm">
                {service.sources.map((src) => (
                  <li key={src.url}>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stream hover:underline"
                    >
                      {src.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-fg-subtle">
                National ranges. Prices in your area may differ; ask for the
                rate and call-out fee before anyone drives out.
              </p>
            </section>
          ) : null}
          <section>
            <h2 className="font-display text-2xl font-semibold text-harbor">
              Find this service by state
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {STATES.map((state) => (
                <Link
                  key={state.slug}
                  to="/locations/$state"
                  params={{ state: state.slug }}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-harbor hover:bg-surface-muted"
                >
                  {state.name}
                </Link>
              ))}
            </div>
          </section>
        </div>
        <div>
          <LeadForm
            variant={isEmergency ? "emergency" : "full"}
            defaults={{
              serviceSlug: service.slug,
              sourcePath: `/services/${service.slug}`,
              urgency: isEmergency ? "emergency" : "today",
            }}
            title={`Get help: ${service.name.toLowerCase()}`}
          />
        </div>
      </div>
      <StickyMobileCta />
      <div className="h-16 sm:hidden" />
    </SiteShell>
  );
}
