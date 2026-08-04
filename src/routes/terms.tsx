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
      <PageHero kicker="Legal" title="Terms of use" description="Demo terms for the Flushing Toilets site." />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-sm leading-relaxed text-fg-muted sm:px-6">
        <p>
          Flushing Toilets provides a platform that connects consumers with
          independent plumbing contractors. We do not perform plumbing services
          and are not responsible for workmanship of partner plumbers.
        </p>
        <p>
          Partner pricing, lead fees, and territory rules are described on the
          partner pricing page and in individual partner agreements.
        </p>
        <p>
          Submitting a request does not guarantee service availability or a
          specific arrival time.
        </p>
      </div>
    </SiteShell>
  );
}
