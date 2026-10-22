import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [{ title: "Contact — Flushing Toilets" }],
  }),
});

function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        kicker="Contact"
        title="Talk to us"
        description="Homeowners: use Get help. Plumbers and press can use the channels below."
      />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-3 sm:px-6">
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-harbor">
            Need a plumber
          </h2>
          <p className="mt-2 text-sm text-fg-muted">
            Send us the details. A person reads every request, and we tell you if nobody covers your area.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Button asChild>
              <Link to="/get-help">Get help</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/diagnostic">Not sure what is wrong? Diagnose it</Link>
            </Button>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-harbor">
            For plumbers
          </h2>
          <p className="mt-2 text-sm text-fg-muted">
            Get toilet and drain requests from homeowners in your area.
          </p>
          <Button asChild className="mt-4" variant="secondary">
            <Link to="/for-plumbers/apply">Apply now</Link>
          </Button>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-harbor">
            Support
          </h2>
          <p className="mt-2 text-sm text-fg-muted">
            hello@flushingtoilets.com
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
