import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/how-it-works")({
  component: HowItWorksPage,
  head: () => ({
    meta: [
      { title: "How it works — Flushing Toilets" },
      {
        name: "description",
        content:
          "How Flushing Toilets matches homeowners with independent licensed local plumbers.",
      },
    ],
  }),
});

function HowItWorksPage() {
  return (
    <SiteShell>
      <PageHero
        kicker="How it works"
        title="Simple for homeowners. Clear for plumbers."
        description="We’re a lead marketplace focused on toilet and closely related drain problems — not a national plumbing company."
      />
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6">
        {[
          {
            t: "You describe the problem",
            d: "City or ZIP, service type, urgency, and phone. We keep the form short so you can finish on a wet bathroom floor with one hand.",
          },
          {
            t: "We route to local partners",
            d: "Exclusive and Preferred partners get priority in their territories. Connect partners may share leads with up to two other shops.",
          },
          {
            t: "A licensed plumber contacts you",
            d: "They confirm details, pricing approach, and timing. You’re never obligated to book.",
          },
          {
            t: "Transparency always",
            d: "Every conversion page discloses that independent plumbers perform the work. Partners must show license and insurance to go live.",
          },
        ].map((item, i) => (
          <div
            key={item.t}
            className="rounded-xl border border-border bg-surface p-5 shadow-sm"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal">
              Step {i + 1}
            </p>
            <h2 className="mt-2 font-display text-xl font-semibold text-harbor">
              {item.t}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.d}</p>
          </div>
        ))}
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild size="lg">
            <Link to="/get-help">Get a plumber</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/for-plumbers">Partner with us</Link>
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
