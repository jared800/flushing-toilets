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
      <PageHero
        kicker="Legal"
        title="Privacy policy"
        description="How Flushing Toilets handles the details you send us."
      />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-sm leading-relaxed text-fg-muted sm:px-6">
        <p>
          When you submit a request we collect your name, phone number, ZIP
          code, a description of the problem, and any photo you choose to
          attach. We use it for one purpose: passing your request to an
          independent plumber who covers your area, if one is available.
        </p>
        <p>
          That information is stored in our database and is sent by email to
          Flushing Toilets and to the plumber or plumbers we match you with, so
          they can call you back. It is not sold, and it is not shared with
          anyone outside that matching process.
        </p>
        <p>
          You can ask us to delete your request at any time by emailing{" "}
          <a className="underline" href="mailto:hello@flushingtoilets.com">
            hello@flushingtoilets.com
          </a>
          , and we will remove it. Requests we have not acted on are deleted
          after 12 months.
        </p>
        <p>
          If you are a resident of California, Colorado, Connecticut, Utah, or
          Virginia, you have the right to know what personal information we
          hold about you, to request its deletion, and to opt out of its sale —
          we do not sell it. Use the same address above to exercise any of
          those rights.
        </p>
      </div>
    </SiteShell>
  );
}
