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
        title: `${loaderData?.service.name ?? "Service"} — Flushing Toilets`,
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
  const faqs = serviceFaqs(service);
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
              What partners typically do
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
