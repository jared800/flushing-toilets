import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({ meta: [{ title: "Privacy — Flushing Toilets" }] }),
});

function PrivacyPage() {
  return (
    <SiteShell>
      <PageHero kicker="Legal" title="Privacy policy" description="Demo summary for the Flushing Toilets marketplace." />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-sm leading-relaxed text-fg-muted sm:px-6">
        <p>
          We collect contact and service details you submit so we can match you
          with independent local plumbers. In this demo build, leads are stored
          in your browser only.
        </p>
        <p>
          We do not sell personal information as a standalone product outside
          the lead marketplace purpose you request. Partners receive lead details
          needed to contact you about the service you requested.
        </p>
        <p>
          For production, this page would include full data retention, cookies,
          analytics, and state-specific rights disclosures.
        </p>
      </div>
    </SiteShell>
  );
}
