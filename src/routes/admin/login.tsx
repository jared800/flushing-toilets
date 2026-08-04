import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ADMIN_DEMO_CODE, setAdminAuthed } from "@/lib/admin-session";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
  head: () => ({ meta: [{ title: "Admin login — Flushing Toilets" }] }),
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <SiteShell>
      <PageHero
        kicker="Ops"
        title="Admin login"
        description="Demo access for the internal lead inbox. Not real security."
      />
      <div className="mx-auto max-w-md px-4 py-10 sm:px-6">
        <form
          className="space-y-4 rounded-xl border border-border bg-surface p-5 shadow-sm"
          onSubmit={(e) => {
            e.preventDefault();
            if (code.trim().toLowerCase() !== ADMIN_DEMO_CODE) {
              setError(`Use demo code “${ADMIN_DEMO_CODE}”.`);
              return;
            }
            setAdminAuthed(true);
            void navigate({ to: "/admin" });
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="code">Access code</Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={ADMIN_DEMO_CODE}
              autoComplete="off"
            />
          </div>
          {error && (
            <p className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full" size="lg">
            Enter admin
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-fg-muted">
          Demo code: <code className="font-semibold text-harbor">{ADMIN_DEMO_CODE}</code>
          {" · "}
          <Link to="/" className="text-stream hover:underline">
            Back to site
          </Link>
        </p>
      </div>
    </SiteShell>
  );
}
