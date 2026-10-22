import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({ meta: [{ title: "Terms — Flushing Toilets" }] }),
});

function TermsPage() {
  return (
    <SiteShell>
      <PageHero kicker="Legal" title="Terms of use" description="The short version of how Flushing Toilets works." />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-sm leading-relaxed text-fg-muted sm:px-6">
        <p>
          Flushing Toilets provides a platform that connects consumers with
          independent plumbing contractors. We do not perform plumbing services
          and are not responsible for the workmanship of any plumber.
        </p>
        <p>
          The service is free for homeowners. Plumbers who receive requests
          agree to separate plumber terms. Any quote, price, warranty, or
          schedule comes from the plumber you choose, not from us.
        </p>
        <p>
          When you submit a request you agree that we and up to three
          independent plumbers may contact you about it by call, text, or
          email, as described on the form. Reply STOP to any text to opt out,
          or email hello@flushingtoilets.com.
        </p>
        <p>
          Guides on this site are general information. If you are unsure, or
          a shut-off valve will not turn, stop and call a licensed plumber.
        </p>
        <p>
          Submitting a request does not guarantee service availability or a
          specific arrival time.
        </p>
      </div>
    </SiteShell>
  );
}
