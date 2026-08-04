import { createFileRoute } from "@tanstack/react-router";
import { PartnerShell } from "@/components/partners/partner-shell";
import { usePartnerGate } from "@/components/partners/use-partner-gate";
import { Badge } from "@/components/ui/badge";
import { TIER_META } from "@/data/partners";

export const Route = createFileRoute("/partners/profile")({
  component: PartnerProfilePage,
  head: () => ({ meta: [{ title: "Profile — Partner dashboard" }] }),
});

function PartnerProfilePage() {
  const partner = usePartnerGate();
  if (!partner) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-fg-muted">
        Loading…
      </div>
    );
  }

  const tier = TIER_META[partner.tier];

  return (
    <PartnerShell partner={partner}>
      <h1 className="font-display text-3xl font-semibold text-harbor">Profile</h1>
      <p className="mt-1 text-sm text-fg-muted">
        Public-facing details shown on city pages.
      </p>

      <div className="mt-8 max-w-2xl rounded-xl border border-border bg-surface p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-display text-2xl font-semibold text-harbor">
            {partner.company}
          </h2>
          <Badge variant="harbor">{tier.badge}</Badge>
        </div>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
            <dt className="text-fg-subtle">Contact</dt>
            <dd className="font-medium text-fg">{partner.contactName}</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
            <dt className="text-fg-subtle">Email</dt>
            <dd className="font-medium text-fg">{partner.email}</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
            <dt className="text-fg-subtle">Phone</dt>
            <dd className="font-medium text-fg">{partner.phone}</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
            <dt className="text-fg-subtle">License</dt>
            <dd className="font-medium text-fg">{partner.license}</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
            <dt className="text-fg-subtle">Rating</dt>
            <dd className="font-medium text-fg">
              {partner.rating} ({partner.reviewCount} reviews)
            </dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
            <dt className="text-fg-subtle">Response</dt>
            <dd className="font-medium text-fg">{partner.responsePromise}</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
            <dt className="text-fg-subtle">About</dt>
            <dd className="text-fg-muted">{partner.about}</dd>
          </div>
        </dl>
      </div>
    </PartnerShell>
  );
}
