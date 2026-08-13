-- Lead outcome tracking.
--
-- The whole pricing model rests on one number: what fraction of the leads we
-- hand a plumber turn into paid work, and what those jobs are worth. Until we
-- know it we cannot price a lead honestly, which is why the current offer is
-- free. This table is how that number accrues, starting from lead #1.
--
-- Deliberately a separate table rather than columns on ft_leads: outcomes are
-- recorded by hand, long after the lead is written, and nothing here should be
-- able to break the lead-capture path.

create table if not exists ft_lead_outcomes (
  lead_id text primary key references ft_leads (id) on delete cascade,
  updated_at timestamptz not null default now(),

  -- pending     — handed over, no result yet
  -- won         — became a paid job
  -- lost        — plumber quoted or attended, homeowner went elsewhere
  -- unreachable — homeowner never answered / bad number
  -- not_a_job   — DIY fix, spam, out of area, duplicate
  outcome text not null default 'pending',

  -- Free text on purpose. Plumbers are handed leads by phone long before any
  -- of them exist as a partner record, so this must not be a foreign key.
  handed_to text,
  handed_at timestamptz,

  -- Cents, to avoid float rounding. Null until a job actually closes.
  job_value_cents integer,

  note text not null default ''
);

create index if not exists ft_lead_outcomes_outcome_idx
  on ft_lead_outcomes (outcome);
create index if not exists ft_lead_outcomes_updated_at_idx
  on ft_lead_outcomes (updated_at desc);
