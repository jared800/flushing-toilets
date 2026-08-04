import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { STATES } from "@/data/locations";
import { submitApplicationFn } from "@/lib/marketplace.functions";

export const Route = createFileRoute("/for-plumbers/apply")({
  component: ApplyPage,
  head: () => ({
    meta: [{ title: "Partner application — Flushing Toilets" }],
  }),
});

function ApplyPage() {
  const [doneId, setDoneId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  return (
    <SiteShell>
      <PageHero
        kicker="Apply"
        title="Join the partner network"
        description="License and insurance required. Applications are stored for admin review."
      />
      <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
        {doneId ? (
          <div className="rounded-xl border border-stream/30 bg-stream-soft/50 p-6">
            <div className="flex gap-3">
              <CheckCircle2 className="h-6 w-6 text-stream" />
              <div>
                <h2 className="font-display text-xl font-semibold text-harbor">
                  Application received
                </h2>
                <p className="mt-2 text-sm text-fg-muted">
                  Saved to the database as pending. Reference {doneId}. An admin
                  can approve it in the Applications inbox.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild variant="secondary">
                    <Link to="/partners/login">Partner login</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/for-plumbers/territory">View territory board</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form
            className="space-y-4 rounded-xl border border-border bg-surface p-5 shadow-sm"
            onSubmit={(e) => {
              e.preventDefault();
              setError(null);
              const fd = new FormData(e.currentTarget);
              setSubmitting(true);
              void submitApplicationFn({
                data: {
                  company: String(fd.get("company") ?? ""),
                  contactName: String(fd.get("contact") ?? ""),
                  phone: String(fd.get("phone") ?? ""),
                  email: String(fd.get("email") ?? ""),
                  license: String(fd.get("license") ?? ""),
                  stateSlug: String(fd.get("state") ?? ""),
                  cities: String(fd.get("cities") ?? ""),
                  tier: String(fd.get("tier") ?? "preferred"),
                  notes: String(fd.get("notes") ?? ""),
                },
              })
                .then((app) => setDoneId(app.id))
                .catch((err) =>
                  setError(
                    err instanceof Error ? err.message : "Could not submit",
                  ),
                )
                .finally(() => setSubmitting(false));
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" required placeholder="Your plumbing co." />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="contact">Contact name</Label>
                <Input id="contact" name="contact" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="license">License number</Label>
              <Input id="license" name="license" required placeholder="State license #" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="state">Primary state</Label>
              <select
                id="state"
                name="state"
                className="flex h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select state
                </option>
                {STATES.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cities">Cities / ZIPs wanted</Label>
              <Input
                id="cities"
                name="cities"
                placeholder="Austin, Round Rock · or list ZIPs"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tier">Interested tier</Label>
              <select
                id="tier"
                name="tier"
                className="flex h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm"
                defaultValue="preferred"
              >
                <option value="connect">Connect</option>
                <option value="preferred">Preferred</option>
                <option value="exclusive">Exclusive</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" name="notes" placeholder="Crew size, hours, specialties…" />
            </div>
            {error && (
              <p className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
                {error}
              </p>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit application"}
            </Button>
          </form>
        )}
      </div>
    </SiteShell>
  );
}
