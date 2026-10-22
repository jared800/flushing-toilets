import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/for-plumbers/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: "What it costs — Flushing Toilets for plumbers" },
      {
        name: "description",
        content:
          "Right now it costs nothing. We are new, we are still proving the lead flow, and we are not charging anyone until we have.",
      },
    ],
  }),
});

/**
 * This page used to advertise a full three-tier subscription table
 * ($149–$1,999/mo plus per-lead pricing) for a marketplace that has never
 * delivered a lead and has no partners. Rewritten 2026-08-11.
 *
 * Do not put priced tiers back until real leads have been delivered and there
 * is a known lead value to price against. A plumber who lands here and sees
 * $1,999/mo from a site with no traffic does not sign up — he closes the tab.
 */
function PricingPage() {
  return (
    <SiteShell>
      <PageHero
        kicker="For plumbers"
        title="Right now, it costs you nothing"
        description="We are new. We would rather prove the leads are real than sell you a subscription first."
      />
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6">
        <div className="rounded-xl border border-stream/30 bg-stream-soft/30 p-5">
          <h2 className="font-display text-xl font-semibold text-harbor">
            The current offer, in one line
          </h2>
          <p className="mt-2 text-base leading-relaxed text-fg-muted">
            When a homeowner in your area sends us a toilet problem, we email it
            to you. You call them. If it turns into work, it is yours. You pay
            us nothing, and there is nothing to sign.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-harbor">
            Why free
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-fg-muted">
            <p>
              Because we have not earned anything yet. This site went live in
              August 2026. We are ranking, we are getting search impressions,
              and we are building the pages that bring homeowners in — but we
              have not sent anyone a paying job, and we are not going to charge
              for something we have not proven.
            </p>
            <p>
              Every other lead service in this space asks for money up front and
              then tells you the leads are shared four ways. We would rather you
              judge us on the first few jobs.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-harbor">
            What we will ask for later
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-fg-muted">
            <p>
              At some point we will start charging, and when we do you will hear
              it from us before it happens — not from an invoice. The likely
              shape is a fee per lead you accept, priced off what a job in your
              market is actually worth, with the option of exclusive coverage in
              a city if you want every lead from it.
            </p>
            <p>
              We are not publishing numbers yet because we do not have the data
              to set them honestly. Anyone showing you a rate card for a network
              this new is guessing.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-bg-elevated p-5">
          <h2 className="font-display text-lg font-semibold text-harbor">
            What we ask of you
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-fg-muted">
            <li>
              · A current licence and current insurance. We check the licence
              number against the state board before you are listed, and we check
              the insurance expiry date — not just that a certificate exists.
            </li>
            <li>
              · Call the homeowner back the same day. A lead nobody calls is
              worse for them than no lead at all.
            </li>
            <li>
              · Tell us when a job closes, so we both learn what a lead here is
              actually worth.
            </li>
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/for-plumbers/apply">Send us your details</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/partners/login">Plumber login</Link>
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
