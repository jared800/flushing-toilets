import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { useAdminGate } from "@/components/admin/use-admin-gate";
import { getEconomicsFn } from "@/lib/lead-outcomes.functions";

export const Route = createFileRoute("/admin/economics")({
  component: EconomicsPage,
  head: () => ({ meta: [{ title: "Lead economics — Admin" }] }),
});

type Economics = Awaited<ReturnType<typeof getEconomicsFn>>;

function usd(cents: number | null | undefined) {
  if (cents === null || cents === undefined) return "—";
  return `$${(cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

function pct(v: number | null) {
  if (v === null) return "—";
  return `${Math.round(v * 100)}%`;
}

/**
 * The single question this page exists to answer: what is one lead worth?
 *
 * Until that number is real, the offer to plumbers stays free. When it is real,
 * the price is a fraction of it. Everything else on this page is supporting
 * detail for that one figure.
 */
function EconomicsPage() {
  const { ready, authed } = useAdminGate();
  const [data, setData] = useState<Economics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authed) return;
    void (async () => {
      try {
        setData(await getEconomicsFn());
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load economics.");
      }
    })();
  }, [authed]);

  if (!ready || !authed) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-fg-muted">
        Loading…
      </div>
    );
  }

  const enough = (data?.resolvedLeads ?? 0) >= 10;

  return (
    <AdminShell>
      <h1 className="font-display text-3xl font-semibold text-harbor">
        Lead economics
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted">
        What a lead is actually worth. Record an outcome on every lead you hand
        to a plumber and this fills itself in. Until the sample is real, the
        offer to plumbers stays free — you cannot price something you have not
        measured.
      </p>

      {error && (
        <p className="mt-4 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      {data && (
        <>
          {/* The headline number. */}
          <div
            className={
              enough
                ? "mt-6 rounded-xl border border-stream/40 bg-stream-soft/40 p-6"
                : "mt-6 rounded-xl border border-dashed border-border bg-bg-elevated p-6"
            }
          >
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-fg-subtle">
              Closed job value per deliverable lead
            </p>
            <p className="mt-2 font-display text-5xl font-semibold text-harbor">
              {usd(data.revenuePerDeliverableLeadCents)}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">
              {enough ? (
                <>
                  Based on {data.resolvedLeads} resolved leads. A plumber can
                  pay some fraction of this per lead and still make money — the
                  industry range for plumbing is $25–$90, with exclusive,
                  pre-qualified leads at the top of it. Price below this number,
                  never at it.
                </>
              ) : (
                <>
                  Not enough data yet — {data.resolvedLeads} of the 10 resolved
                  leads needed before this figure means anything. Keep handing
                  leads over and recording what happened.
                </>
              )}
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Leads captured" value={String(data.totalLeads)} />
            <Stat
              label="Handed to a plumber"
              value={String(data.handedOver)}
              hint={
                data.untracked > 0
                  ? `${data.untracked} with no outcome recorded`
                  : undefined
              }
            />
            <Stat
              label="Win rate"
              value={pct(data.winRate)}
              hint="won ÷ (won + lost + unreachable)"
            />
            <Stat
              label="Average closed job"
              value={usd(data.avgJobValueCents)}
              hint={`${data.counts.won} job${data.counts.won === 1 ? "" : "s"} closed`}
            />
          </div>

          <div className="mt-6 rounded-xl border border-border bg-surface p-5 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-harbor">
              Where the leads went
            </h2>
            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Became a paid job" value={data.counts.won} />
              <Row label="Lost — went elsewhere" value={data.counts.lost} />
              <Row
                label="Never reached the homeowner"
                value={data.counts.unreachable}
              />
              <Row
                label="Not a real job (spam, DIY, out of area)"
                value={data.counts.not_a_job}
                muted
              />
              <Row
                label="Handed over, still waiting"
                value={data.counts.pending}
                muted
              />
              <Row
                label="No outcome recorded yet"
                value={data.untracked}
                muted
              />
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-fg-subtle">
              Leads marked “not a real job” are excluded from the win rate on
              purpose — a spam submission is not something a plumber would have
              paid for, and counting it would understate what a real lead is
              worth.
            </p>
            <p className="mt-3 text-sm">
              <Link
                to="/admin/leads"
                className="font-semibold text-stream hover:underline"
              >
                Record an outcome on a lead →
              </Link>
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-bg-elevated p-5">
            <h2 className="font-display text-lg font-semibold text-harbor">
              What to do with this number
            </h2>
            <ol className="mt-3 space-y-2 text-sm leading-relaxed text-fg-muted">
              <li>
                <span className="font-semibold text-fg">Under 10 resolved:</span>{" "}
                stay free. Keep handing leads over by phone and recording what
                came of them.
              </li>
              <li>
                <span className="font-semibold text-fg">10 to 50 resolved:</span>{" "}
                start charging per lead, one plumber per city, priced well below
                the figure above. Invoice monthly rather than per lead.
              </li>
              <li>
                <span className="font-semibold text-fg">
                  Once a city produces steady volume:
                </span>{" "}
                offer exclusivity in it for a monthly fee on top. Exclusive,
                pre-qualified leads close far better than shared ones, which is
                the whole reason a plumber would pay more for yours.
              </li>
            </ol>
          </div>
        </>
      )}
    </AdminShell>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-fg-subtle">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-semibold text-harbor">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-fg-subtle">{hint}</p>}
    </div>
  );
}

function Row({
  label,
  value,
  muted,
}: {
  label: string;
  value: number;
  muted?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2 last:border-0">
      <dt className={muted ? "text-fg-subtle" : "text-fg-muted"}>{label}</dt>
      <dd
        className={
          muted
            ? "font-mono text-sm text-fg-subtle"
            : "font-mono text-sm font-semibold text-fg"
        }
      >
        {value}
      </dd>
    </div>
  );
}
