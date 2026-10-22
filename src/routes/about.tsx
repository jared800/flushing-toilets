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
          "Flushing Toilets is a free referral service and set of toilet repair guides. We are not a plumbing company.",
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
        description="Plain-English toilet guides, a free diagnostic, and a referral request a real person reads."
      />
      <div className="mx-auto max-w-3xl space-y-5 px-4 py-10 text-sm leading-relaxed text-fg-muted sm:px-6">
        <p>
          Flushing Toilets is a referral service for toilet and closely related
          drain and sewer problems. We publish repair guides and a free
          diagnostic, and we take requests from homeowners who want a plumber.
          When an independent plumber who covers the area is available, we
          pass the request on. When nobody covers it, we say so.
        </p>
        <p>
          We are not a plumbing company and we do not send technicians. We
          write plain-English guides for the most common toilet problems, a
          free diagnostic to help you decide whether you need a pro at all,
          and a short request form that a real person reviews. The service is
          free for homeowners. Before you hire any plumber, ask for their state
          license number and check it with the state licensing board.
        </p>
        <p>
          We are starting in Utah. We do not have plumbers signed up in every
          city listed on this site, and we will tell you if nobody covers your
          area.
        </p>
      </div>
    </SiteShell>
  );
}
