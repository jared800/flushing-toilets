-- Flushing Toilets marketplace: leads, notifications, partner applications.

create table if not exists ft_leads (
  id text primary key,
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  zip text not null,
  city_label text not null,
  state_slug text,
  city_slug text,
  service_slug text not null,
  service_name text not null,
  urgency text not null,
  notes text not null default '',
  photo_data_url text,
  source_path text not null,
  status text not null default 'new',
  invalid_reason text,
  assigned_partner_ids text not null default '[]',
  status_history text not null default '[]'
);

create index if not exists ft_leads_created_at_idx on ft_leads (created_at desc);
create index if not exists ft_leads_status_idx on ft_leads (status);

create table if not exists ft_notifications (
  id text primary key,
  lead_id text not null references ft_leads (id) on delete cascade,
  created_at timestamptz not null default now(),
  channel text not null,
  recipient text not null,
  partner_id text not null,
  subject text not null,
  body text not null,
  status text not null default 'sent_stub'
);

create index if not exists ft_notifications_lead_id_idx on ft_notifications (lead_id);
create index if not exists ft_notifications_created_at_idx on ft_notifications (created_at desc);

create table if not exists ft_partner_applications (
  id text primary key,
  created_at timestamptz not null default now(),
  company text not null,
  contact_name text not null,
  phone text not null,
  email text not null,
  license text not null,
  state_slug text not null,
  cities text not null default '',
  tier text not null default 'preferred',
  notes text not null default '',
  status text not null default 'pending'
);

create index if not exists ft_partner_applications_status_idx on ft_partner_applications (status);
