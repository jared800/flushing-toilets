import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { LeadForm } from "@/components/leads/lead-form";

export const Route = createFileRoute("/get-help")({
  component: GetHelpPage,
  head: () => ({
    meta: [
      { title: "Get a plumber — Flushing Toilets" },
      {
        name: "description",
        content:
          "Send a free request for help with toilet clogs, leaks, installs, and emergencies. A person reads every request.",
      },
    ],
  }),
});

function GetHelpPage() {
  const href = useRouterState({ select: (s) => s.location.href });
  const url = new URL(href, "http://local");
  const service = url.searchParams.get("service") ?? undefined;
  const zip = url.searchParams.get("zip") ?? undefined;
  const emergency = url.searchParams.get("emergency") === "1";

  return (
    <SiteShell>
      <PageHero
        kicker="Get help"
        title="Match with a local plumber"
        description="Share a few details. A person reads your request and passes it on if a plumber who covers your area is available."
      />
      <div className="mx-auto max-w-xl space-y-6 px-4 py-10 sm:px-6">
        <LeadForm
          variant={emergency || !service ? "emergency" : "full"}
          defaults={{
            serviceSlug: service,
            zip,
            sourcePath: "/get-help",
            urgency: emergency ? "emergency" : "today",
          }}
        />
      </div>
    </SiteShell>
  );
}
