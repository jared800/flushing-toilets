import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { partnerLoginFn } from "@/lib/ops-auth.functions";

export const Route = createFileRoute("/partners/login")({
  component: PartnerLoginPage,
  head: () => ({
    meta: [
      { title: "Partner login — Flushing Toilets" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function PartnerLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <SiteShell>
      <PageHero
        kicker="Partners"
        title="Partner login"
        description="Sign in with the work email on your partner account."
      />
      <div className="mx-auto max-w-md px-4 py-10 sm:px-6">
        <form
          className="space-y-4 rounded-xl border border-border bg-surface p-5 shadow-sm"
          onSubmit={(e) => {
            e.preventDefault();
            setError(null);
            setBusy(true);
            void (async () => {
              try {
                const res = await partnerLoginFn({ data: { email } });
                if (!res.ok) {
                  setError(res.reason ?? "Sign-in failed.");
                  return;
                }
                await navigate({ to: "/partners" });
              } catch {
                setError("Sign-in failed. Try again.");
              } finally {
                setBusy(false);
              }
            })();
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="email">Work email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          {error && (
            <p className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full" size="lg" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </Button>
        </form>

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
