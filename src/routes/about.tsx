import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Flushing Toilets" },
      {
        name: "description",
        content:
          "Flushing Toilets is a hybrid lead marketplace connecting homeowners with licensed local plumbers for toilet problems.",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        kicker="About"
        title="Built for one stressful problem"
        description="When a toilet fails, you don’t want a generic directory. You want local, licensed help — fast."
      />
      <div className="mx-auto max-w-3xl space-y-5 px-4 py-10 text-sm leading-relaxed text-fg-muted sm:px-6">
        <p>
          Flushing Toilets is a lead-generation marketplace specializing in toilet
          and closely related drain/sewer issues. We publish deep local pages by
          city and service, capture high-intent homeowner requests, and route
          them to independent partner plumbers.
        </p>
        <p>
          Our brand system — Harbor Trust — is intentionally calm and
          professional. No cartoon plungers as the hero story. No fake “our
          technicians are en route” copy when partners do the work.
        </p>
        <p>
          We launch deep in Texas, Florida, and Arizona first, then expand state
          by state once supply and conversion are proven.
        </p>
      </div>
    </SiteShell>
  );
}
