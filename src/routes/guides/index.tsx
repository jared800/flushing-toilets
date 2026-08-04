import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { GUIDES } from "@/data/guides";

export const Route = createFileRoute("/guides/")({
  component: GuidesIndexPage,
  head: () => ({
    meta: [
      { title: "Guides — Flushing Toilets" },
      {
        name: "description",
        content:
          "Practical guides on clogged toilets, running toilets, replacements, and sewer backups.",
      },
    ],
  }),
});

function GuidesIndexPage() {
  return (
    <SiteShell>
      <PageHero
        kicker="Guides"
        title="Know what you’re dealing with"
        description="Short, practical articles to help you decide when to call a plumber."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {GUIDES.map((g) => (
            <Link
              key={g.slug}
              to="/guides/$slug"
              params={{ slug: g.slug }}
              className="rounded-xl border border-border bg-surface p-5 shadow-sm hover:border-stream/40"
            >
              <p className="text-xs font-semibold text-fg-subtle">
                {g.readMinutes} min read
              </p>
              <h2 className="mt-2 font-display text-xl font-semibold text-harbor">
                {g.title}
              </h2>
              <p className="mt-2 text-sm text-fg-muted">{g.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
