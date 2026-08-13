import { getSql } from "@/lib/db";

/**
 * Lead outcome tracking — the data that decides what a lead is worth.
 *
 * Server-only. Everything here is reached through `lead-outcomes.functions.ts`,
 * which puts `adminOnlyMiddleware` in front of all of it.
 */

export const OUTCOME_VALUES = [
  "pending",
  "won",
  "lost",
  "unreachable",
  "not_a_job",
] as const;

export type Outcome = (typeof OUTCOME_VALUES)[number];

export function isOutcome(v: string): v is Outcome {
  return (OUTCOME_VALUES as readonly string[]).includes(v);
}

export const OUTCOME_LABELS: Record<Outcome, string> = {
  pending: "Handed over, waiting",
  won: "Became a paid job",
  lost: "Lost — went elsewhere",
  unreachable: "Never reached the homeowner",
  not_a_job: "Not a real job",
};

export type LeadOutcome = {
  leadId: string;
  updatedAt: string;
  outcome: Outcome;
  handedTo: string | null;
  handedAt: string | null;
  jobValueCents: number | null;
  note: string;
};

type Row = {
  lead_id: string;
  updated_at: string | Date;
  outcome: string;
  handed_to: string | null;
  handed_at: string | Date | null;
  job_value_cents: number | null;
  note: string;
};

function iso(v: string | Date | null): string | null {
  if (v === null) return null;
  return v instanceof Date ? v.toISOString() : new Date(v).toISOString();
}

function toOutcome(r: Row): LeadOutcome {
  return {
    leadId: r.lead_id,
    updatedAt: iso(r.updated_at) as string,
    outcome: isOutcome(r.outcome) ? r.outcome : "pending",
    handedTo: r.handed_to,
    handedAt: iso(r.handed_at),
    jobValueCents: r.job_value_cents,
    note: r.note ?? "",
  };
}

export async function getOutcomeServer(
  leadId: string,
): Promise<LeadOutcome | null> {
  const sql = await getSql();
  const rows = await sql<Row>`
    select * from ft_lead_outcomes where lead_id = ${leadId}
  `;
  return rows[0] ? toOutcome(rows[0]) : null;
}

export async function listOutcomesServer(): Promise<LeadOutcome[]> {
  const sql = await getSql();
  const rows = await sql<Row>`
    select * from ft_lead_outcomes order by updated_at desc
  `;
  return rows.map(toOutcome);
}

export async function recordOutcomeServer(input: {
  leadId: string;
  outcome: Outcome;
  handedTo?: string;
  jobValueCents?: number | null;
  note?: string;
}): Promise<LeadOutcome | null> {
  const handedTo = input.handedTo?.trim() || null;
  const note = input.note?.trim() ?? "";

  // A value only makes sense on a won job. Storing one against a lost lead
  // would quietly inflate every average on the economics page.
  const value =
    input.outcome === "won" && typeof input.jobValueCents === "number"
      ? Math.max(0, Math.round(input.jobValueCents))
      : null;

  const sql = await getSql();
  await sql`
    insert into ft_lead_outcomes
      (lead_id, outcome, handed_to, handed_at, job_value_cents, note, updated_at)
    values (
      ${input.leadId},
      ${input.outcome},
      ${handedTo},
      ${handedTo ? new Date().toISOString() : null},
      ${value},
      ${note},
      ${new Date().toISOString()}
    )
    on conflict (lead_id) do update set
      outcome = excluded.outcome,
      handed_to = coalesce(excluded.handed_to, ft_lead_outcomes.handed_to),
      handed_at = coalesce(ft_lead_outcomes.handed_at, excluded.handed_at),
      job_value_cents = excluded.job_value_cents,
      note = excluded.note,
      updated_at = excluded.updated_at
  `;
  return getOutcomeServer(input.leadId);
}

export type Economics = {
  /** Leads captured, regardless of what happened next. */
  totalLeads: number;
  /** Leads with any outcome row — i.e. ones we actually handed to someone. */
  handedOver: number;
  counts: Record<Outcome, number>;
  /** Leads still with no outcome recorded at all. */
  untracked: number;
  wonValueCents: number;
  /** Average value of a job that closed. Null until at least one has. */
  avgJobValueCents: number | null;
  /**
   * Won ÷ (won + lost + unreachable). Excludes not_a_job and pending, because
   * a spam submission is not a lead a plumber would have paid for, and a
   * pending one has not resolved yet. Null until the denominator is non-zero.
   */
  winRate: number | null;
  /**
   * What one deliverable lead has been worth in closed job value. This is the
   * number that sets the price: charge a fraction of it, never more.
   * Null until there is at least one resolved lead.
   */
  revenuePerDeliverableLeadCents: number | null;
  /** Resolved leads = the denominator above. Shown so the sample size is visible. */
  resolvedLeads: number;
};

export async function getEconomicsServer(): Promise<Economics> {
  const sql = await getSql();

  const leadRows = await sql<{ c: number }>`
    select count(*)::int as c from ft_leads
  `;
  const totalLeads = leadRows[0]?.c ?? 0;

  const outcomes = await listOutcomesServer();

  const counts: Record<Outcome, number> = {
    pending: 0,
    won: 0,
    lost: 0,
    unreachable: 0,
    not_a_job: 0,
  };
  let wonValueCents = 0;
  let wonWithValue = 0;

  for (const o of outcomes) {
    counts[o.outcome] += 1;
    if (o.outcome === "won" && typeof o.jobValueCents === "number") {
      wonValueCents += o.jobValueCents;
      wonWithValue += 1;
    }
  }

  const resolvedLeads = counts.won + counts.lost + counts.unreachable;

  return {
    totalLeads,
    handedOver: outcomes.length,
    counts,
    untracked: Math.max(0, totalLeads - outcomes.length),
    wonValueCents,
    avgJobValueCents: wonWithValue > 0 ? Math.round(wonValueCents / wonWithValue) : null,
    winRate: resolvedLeads > 0 ? counts.won / resolvedLeads : null,
    revenuePerDeliverableLeadCents:
      resolvedLeads > 0 ? Math.round(wonValueCents / resolvedLeads) : null,
    resolvedLeads,
  };
}
