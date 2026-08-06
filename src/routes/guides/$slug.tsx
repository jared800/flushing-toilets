import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/shared/faq-section";
import { JsonLd } from "@/components/shared/json-ld";
import { getGuide } from "@/data/guides";

const SITE = (
  import.meta.env?.VITE_SITE_URL ?? "https://www.flushingtoilets.com"
).replace(/\/+$/, "");

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) throw notFound();
    return { guide };
  },
  component: GuidePage,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.guide.metaTitle ?? loaderData?.guide.title ?? "Guide"} — Flushing Toilets`,
      },
      { name: "description", content: loaderData?.guide.excerpt ?? "" },
    ],
  }),
});

function GuidePage() {
  const { guide } = Route.useLoaderData();
  const hasSections = !!guide.sections?.length;

  return (
    <SiteShell>
      <JsonLd
        id={`article-${guide.slug}`}
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.excerpt,
          mainEntityOfPage: `${SITE}/guides/${guide.slug}`,
          ...(guide.updated ? { dateModified: guide.updated } : {}),
          publisher: {
            "@type": "Organization",
            name: "Flushing Toilets",
            url: SITE,
          },
        }}
      />
      <JsonLd
        id={`crumbs-${guide.slug}`}
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
            {
              "@type": "ListItem",
              position: 2,
              name: "Guides",
              item: `${SITE}/guides`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: guide.title,
              item: `${SITE}/guides/${guide.slug}`,
            },
          ],
        }}
      />

      <PageHero
        kicker={`${guide.readMinutes} min read`}
        title={guide.title}
        description={guide.excerpt}
      />

      <article className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6">
        {/* Someone with a live problem wants the tool, not an essay. */}
        <div className="rounded-xl border border-stream/30 bg-stream-soft/30 p-4">
          <p className="text-sm leading-relaxed text-fg">
            <span className="font-semibold">Not sure this is your problem? </span>
            Answer two or three questions and we&rsquo;ll tell you what&rsquo;s
            actually wrong.{" "}
            <Link
              to="/diagnostic"
              className="font-semibold text-stream hover:underline"
            >
              Run the diagnostic
            </Link>
            .
          </p>
        </div>

        {hasSections
          ? guide.sections!.map((section) => (
              <section key={section.heading} className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-harbor">
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
                  <ol className="space-y-2 pt-1">
                    {section.steps.map((s, i) => (
                      <li
                        key={s.slice(0, 30)}
                        className="flex gap-3 text-base leading-relaxed text-fg-muted"
                      >
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-harbor text-[11px] font-bold text-white">
                          {i + 1}
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            ))
          : guide.body.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="text-base leading-relaxed text-fg-muted"
              >
                {p}
              </p>
            ))}

        {guide.faqs?.length ? (
          <FaqSection
            title="Common questions"
            items={guide.faqs}
            schemaId={`guide-${guide.slug}`}
          />
        ) : null}

        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <p className="font-display text-lg font-semibold text-harbor">
            Tried it and it didn&rsquo;t hold?
          </p>
          <p className="mt-1 text-sm text-fg-muted">
            Tell us your ZIP and what happened, and we&rsquo;ll find a licensed
            plumber near you.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild>
              <Link to="/get-help">Get help</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/diagnostic">Run the diagnostic</Link>
            </Button>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
