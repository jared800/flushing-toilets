import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminLoginFn } from "@/lib/ops-auth.functions";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
  head: () => ({
    meta: [
      { title: "Admin login — Flushing Toilets" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <SiteShell>
      <PageHero
        kicker="Ops"
        title="Admin login"
        description="Internal lead inbox. Access code required."
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
                const res = await adminLoginFn({ data: { code } });
                if (!res.ok) {
                  setError(res.reason ?? "Sign-in failed.");
                  return;
                }
                await navigate({ to: "/admin" });
              } catch {
                setError("Sign-in failed. Try again.");
              } finally {
                setBusy(false);
              }
            })();
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="code">Access code</Label>
            <Input
              id="code"
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          {error && (
            <p className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full" size="lg" disabled={busy}>
            {busy ? "Checking…" : "Enter admin"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-fg-muted">
          <Link to="/" className="text-stream hover:underline">
            Back to site
          </Link>
        </p>
      </div>
    </SiteShell>
  );
}
