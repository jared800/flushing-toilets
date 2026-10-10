import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/for-plumbers/")({
  component: ForPlumbersPage,
  head: () => ({
    meta: [
      { title: "For plumbers — Flushing Toilets Partners" },
      {
        name: "description",
        content:
          "Homeowner toilet and drain requests in your area, sent to you by email. Free while we prove the leads are real.",
      },
    ],
  }),
});

function ForPlumbersPage() {
  return (
    <SiteShell>
      <PageHero
        kicker="Flushing Toilets Partners"
        title="Toilet-intent leads, not tire-kickers"
        description="Homeowners searching for clogged, running, leaking, and emergency toilet help in your area. Right now it costs you nothing: we email you the request, you call them, the job is yours."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/for-plumbers/apply">Apply to partner</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/for-plumbers/pricing">What it costs</Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link to="/partners/login">Partner login</Link>
          </Button>
        </div>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              t: "High intent",
              d: "Pages target toilet problems — not vague “plumber near me” alone.",
            },
            {
              t: "Never shared four ways",
              d: "A request goes to one plumber, and never more than three. You hear from us before we ever start charging.",
            },
            {
              t: "Simple ops",
              d: "Each request arrives by email with the homeowner\u2019s name, phone, ZIP, and problem. Tell us when it closes so we both learn what a lead is worth.",
            },
          ].map((item) => (
            <div
              key={item.t}
              className="rounded-xl border border-border bg-bg-elevated p-5"
            >
              <h3 className="font-display text-lg font-semibold text-harbor">
                {item.t}
              </h3>
              <p className="mt-2 text-sm text-fg-muted">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
