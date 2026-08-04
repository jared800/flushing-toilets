import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Circle, ExternalLink } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { useAdminGate } from "@/components/admin/use-admin-gate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDeployReadinessFn } from "@/lib/marketplace.functions";

export const Route = createFileRoute("/admin/go-live")({
  component: GoLivePage,
  head: () => ({ meta: [{ title: "Go live checklist — Admin" }] }),
});

function GoLivePage() {
  const { ready, authed } = useAdminGate();
  const [data, setData] = useState<
    Awaited<ReturnType<typeof getDeployReadinessFn>> | null
  >(null);

  useEffect(() => {
    if (authed) void getDeployReadinessFn().then(setData);
  }, [authed]);

  if (!ready || !authed) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-fg-muted">
        Loading…
      </div>
    );
  }

  return (
    <AdminShell>
      <h1 className="font-display text-3xl font-semibold text-harbor">
        Go live checklist
      </h1>
      <p className="mt-1 max-w-2xl text-sm text-fg-muted">
        Ordered steps to put flushingtoilets.com in production. Environment
        status below reflects this running instance.
      </p>

      {data && (
        <>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant={data.mode === "neon" ? "success" : "signal"}>
              DB: {data.mode === "neon" ? "Neon (production-ready)" : "PGLite (preview)"}
            </Badge>
            <Badge variant={data.softLaunchReady ? "success" : "danger"}>
              Soft launch: {data.softLaunchReady ? "ready" : "needs DATABASE_URL"}
            </Badge>
            <Badge variant={data.fullOpsReady ? "success" : "stream"}>
              Full ops (email): {data.fullOpsReady ? "ready" : "optional for v1"}
            </Badge>
          </div>

          <ol className="mt-8 space-y-3">
            {data.steps.map((step, i) => (
              <li
                key={step.id}
                className="flex gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm"
              >
                {step.done ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                ) : (
                  <Circle className="mt-0.5 h-5 w-5 shrink-0 text-fg-subtle" />
                )}
                <div>
                  <p className="font-semibold text-fg">
                    {i + 1}. {step.title}
                    {step.required ? (
                      <span className="ml-2 text-xs font-medium text-danger">
                        required
                      </span>
                    ) : (
                      <span className="ml-2 text-xs font-medium text-fg-subtle">
                        optional
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-sm text-fg-muted">{step.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </>
      )}

      <section className="mt-10 rounded-xl border border-border bg-bg-elevated p-5">
        <h2 className="font-display text-xl font-semibold text-harbor">
          Your action list (outside this preview)
        </h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-fg-muted">
          <li>
            <strong className="text-fg">Create Neon project</strong> → copy
            pooled connection string → set as <code className="text-harbor">DATABASE_URL</code>
          </li>
          <li>
            <strong className="text-fg">Create Vercel project</strong> from this
            repo (or accept platform deploy) → add the same env vars
          </li>
          <li>
            <strong className="text-fg">Point DNS</strong> for flushingtoilets.com
            to Vercel (A/CNAME per their dashboard)
          </li>
          <li>
            <strong className="text-fg">Resend</strong> (recommended day one):
            verify domain, create API key →{" "}
            <code className="text-harbor">RESEND_API_KEY</code> +{" "}
            <code className="text-harbor">NOTIFY_FROM_EMAIL</code>
          </li>
          <li>
            <strong className="text-fg">Smoke test production</strong>: submit a
            lead → confirm row in Neon → confirm partner email arrives
          </li>
          <li>
            <strong className="text-fg">Later</strong>: Twilio SMS, Stripe, real
            partner logins
          </li>
        </ol>
        <p className="mt-4 text-xs text-fg-subtle">
          Full variable list is in <code>.env.example</code> in the project.
        </p>
      </section>

      <div className="mt-8 flex flex-wrap gap-2">
        <Button asChild>
          <Link to="/admin/leads">Test lead inbox</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/admin/notifications">Notify log</Link>
        </Button>
        <Button asChild variant="ghost">
          <a
            href="https://console.neon.tech"
            target="_blank"
            rel="noreferrer"
          >
            Neon console
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </div>
    </AdminShell>
  );
}
