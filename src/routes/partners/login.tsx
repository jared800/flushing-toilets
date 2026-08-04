import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PARTNERS, getPartnerByEmail } from "@/data/partners";
import { setSessionPartnerId } from "@/lib/partner-session";

export const Route = createFileRoute("/partners/login")({
  component: PartnerLoginPage,
  head: () => ({
    meta: [{ title: "Partner login — Flushing Toilets" }],
  }),
});

function PartnerLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(PARTNERS[0]?.email ?? "");
  const [error, setError] = useState<string | null>(null);

  return (
    <SiteShell>
      <PageHero
        kicker="Partners"
        title="Partner login"
        description="Demo auth — pick a sample partner email. No password required in this preview."
      />
      <div className="mx-auto max-w-md px-4 py-10 sm:px-6">
        <form
          className="space-y-4 rounded-xl border border-border bg-surface p-5 shadow-sm"
          onSubmit={(e) => {
            e.preventDefault();
            const partner = getPartnerByEmail(email);
            if (!partner) {
              setError("No demo partner found for that email.");
              return;
            }
            setSessionPartnerId(partner.id);
            void navigate({ to: "/partners" });
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="email">Work email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full" size="lg">
            Sign in
          </Button>
        </form>

        <div className="mt-6 rounded-xl border border-border bg-bg-elevated p-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-fg-subtle">
            Demo accounts
          </p>
          <ul className="mt-3 space-y-2">
            {PARTNERS.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-left text-sm hover:bg-surface-muted"
                  onClick={() => setEmail(p.email)}
                >
                  <span className="font-semibold text-fg">{p.company}</span>
                  <span className="mt-0.5 block text-xs text-fg-subtle">
                    {p.email} · {p.tier}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-center text-sm text-fg-muted">
          Not a partner yet?{" "}
          <Link to="/for-plumbers/apply" className="font-semibold text-stream">
            Apply
          </Link>
        </p>
      </div>
    </SiteShell>
  );
}
