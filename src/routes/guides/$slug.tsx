import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { getGuide } from "@/data/guides";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) throw notFound();
    return { guide };
  },
  component: GuidePage,
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.guide.title ?? "Guide"} — Flushing Toilets` },
      { name: "description", content: loaderData?.guide.excerpt ?? "" },
    ],
  }),
});

function GuidePage() {
  const { guide } = Route.useLoaderData();
  return (
    <SiteShell>
      <PageHero
        kicker={`${guide.readMinutes} min read`}
        title={guide.title}
        description={guide.excerpt}
      />
      <article className="mx-auto max-w-3xl space-y-4 px-4 py-10 sm:px-6">
        {guide.body.map((p) => (
          <p key={p.slice(0, 24)} className="text-base leading-relaxed text-fg-muted">
            {p}
          </p>
        ))}
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <p className="font-display text-lg font-semibold text-harbor">
            Ready for a local plumber?
          </p>
          <p className="mt-1 text-sm text-fg-muted">
            Match with licensed partners in your city.
          </p>
          <Button asChild className="mt-4">
            <Link to="/get-help">Get help</Link>
          </Button>
        </div>
      </article>
    </SiteShell>
  );
}
