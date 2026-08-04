import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { Badge } from "@/components/ui/badge";
import { SERVICES, urgencyLabel } from "@/data/services";

export const Route = createFileRoute("/services/")({
  component: ServicesIndexPage,
  head: () => ({
    meta: [
      { title: "Toilet plumbing services — Flushing Toilets" },
      {
        name: "description",
        content:
          "Clogged toilets, running toilets, leaks, installs, replacements, emergencies, and sewer backups.",
      },
    ],
  }),
});

function ServicesIndexPage() {
  return (
    <SiteShell>
      <PageHero
        kicker="Services"
        title="Toilet problems we help with"
        description="Pick a service to learn what to expect, then search your city for a licensed local plumber."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              to="/services/$service"
              params={{ service: s.slug }}
              className="rounded-xl border border-border bg-surface p-5 shadow-sm transition-colors hover:border-stream/40"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-display text-xl font-semibold text-harbor">
                  {s.name}
                </h2>
                <Badge
                  variant={
                    s.urgency === "critical"
                      ? "danger"
                      : s.urgency === "high"
                        ? "signal"
                        : "default"
                  }
                >
                  {urgencyLabel(s.urgency)}
                </Badge>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {s.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
