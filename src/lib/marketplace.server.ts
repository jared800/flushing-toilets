import { getSql } from "@/lib/db";
import { getPartner, PARTNERS } from "@/data/partners";
import type {
  Lead,
  LeadNotification,
  LeadStatus,
  LeadStatusEvent,
  LeadUrgency,
} from "@/lib/leads-types";
import type { PartnerApplication, TerritoryCell } from "@/lib/marketplace-types";
import {
  deliverEmail,
  deliverSms,
  notifyConfigStatus,
} from "@/lib/notify-delivery.server";

type LeadRow = {
  id: string;
  created_at: string | Date;
  name: string;
  phone: string;
  zip: string;
  city_label: string;
  state_slug: string | null;
  city_slug: string | null;
  service_slug: string;
  service_name: string;
  urgency: string;
  notes: string;
  photo_data_url: string | null;
  source_path: string;
  status: string;
  invalid_reason: string | null;
  assigned_partner_ids: string;
  status_history: string;
};

type NotifRow = {
  id: string;
  lead_id: string;
  created_at: string | Date;
  channel: string;
  recipient: string;
  partner_id: string;
  subject: string;
  body: string;
  status: string;
};

function iso(v: string | Date) {
  return typeof v === "string" ? v : v.toISOString();
}

function parseJsonArray<T>(raw: string, fallback: T[]): T[] {
  try {
    const v = JSON.parse(raw) as T[];
    return Array.isArray(v) ? v : fallback;
  } catch {
    return fallback;
  }
}

async function notificationsForLead(leadId: string): Promise<LeadNotification[]> {
  const sql = await getSql();
  const rows = await sql<NotifRow>`
    select * from ft_notifications where lead_id = ${leadId} order by created_at asc
  `;
  return rows.map((n) => ({
    id: n.id,
    at: iso(n.created_at),
    channel: n.channel as "email" | "sms",
    to: n.recipient,
    partnerId: n.partner_id,
    subject: n.subject,
    body: n.body,
    status: n.status as LeadNotification["status"],
  }));
}

function rowToLead(row: LeadRow, notifications: LeadNotification[]): Lead {
  return {
    id: row.id,
    createdAt: iso(row.created_at),
    name: row.name,
    phone: row.phone,
    zip: row.zip,
    cityLabel: row.city_label,
    stateSlug: row.state_slug ?? undefined,
    citySlug: row.city_slug ?? undefined,
    serviceSlug: row.service_slug,
    serviceName: row.service_name,
    urgency: row.urgency as LeadUrgency,
    notes: row.notes ?? "",
    photoDataUrl: row.photo_data_url ?? undefined,
    sourcePath: row.source_path,
    status: row.status as LeadStatus,
    invalidReason: row.invalid_reason ?? undefined,
    assignedPartnerIds: parseJsonArray<string>(row.assigned_partner_ids, []),
    statusHistory: parseJsonArray<LeadStatusEvent>(row.status_history, [
      { status: "new", at: iso(row.created_at), by: "system" },
    ]),
    notifications,
  };
}

export async function ensureSeedLeads() {
  const sql = await getSql();
  const countRows = await sql<{ c: number }>`select count(*)::int as c from ft_leads`;
  if ((countRows[0]?.c ?? 0) > 0) return;

  const seeds: Array<Omit<Lead, "notifications">> = [
    {
      id: "seed-1",
      createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      name: "Jordan P.",
      phone: "(512) 555-0101",
      zip: "78704",
      cityLabel: "Austin, TX",
      stateSlug: "texas",
      citySlug: "austin",
      serviceSlug: "clogged-toilet",
      serviceName: "Clogged toilet",
      urgency: "emergency",
      notes: "Overflowing after guests — plunger not helping.",
      sourcePath: "/locations/texas/austin/clogged-toilet",
      status: "new",
      assignedPartnerIds: ["p-austin-flow"],
      statusHistory: [
        {
          status: "new",
          at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
          by: "system",
        },
      ],
    },
    {
      id: "seed-2",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      name: "Riley M.",
      phone: "(602) 555-0144",
      zip: "85016",
      cityLabel: "Phoenix, AZ",
      stateSlug: "arizona",
      citySlug: "phoenix",
      serviceSlug: "running-toilet",
      serviceName: "Running toilet",
      urgency: "today",
      notes: "Runs all night — water bill spike.",
      sourcePath: "/locations/arizona/phoenix/running-toilet",
      status: "contacted",
      assignedPartnerIds: ["p-phoenix-desert"],
      statusHistory: [
        {
          status: "new",
          at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
          by: "system",
        },
        {
          status: "contacted",
          at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
          by: "partner",
          note: "Left voicemail",
        },
      ],
    },
    {
      id: "seed-3",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      name: "Sam K.",
      phone: "(713) 555-0190",
      zip: "77019",
      cityLabel: "Houston, TX",
      stateSlug: "texas",
      citySlug: "houston",
      serviceSlug: "sewer-backup",
      serviceName: "Sewer backup",
      urgency: "emergency",
      notes: "Tub filling when toilet flushes.",
      sourcePath: "/locations/texas/houston/sewer-backup",
      status: "booked",
      assignedPartnerIds: ["p-houston-rapid"],
      statusHistory: [
        {
          status: "new",
          at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
          by: "system",
        },
        {
          status: "booked",
          at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
          by: "partner",
        },
      ],
    },
  ];

  for (const s of seeds) {
    try {
      await insertLeadRecord(s);
      await createNotificationsForLead({ ...s, notifications: [] });
    } catch {
      // Concurrent seed or already inserted — safe to ignore
    }
  }
}

async function insertLeadRecord(lead: Omit<Lead, "notifications">) {
  const sql = await getSql();
  await sql`
    insert into ft_leads (
      id, created_at, name, phone, zip, city_label, state_slug, city_slug,
      service_slug, service_name, urgency, notes, photo_data_url, source_path,
      status, invalid_reason, assigned_partner_ids, status_history
    ) values (
      ${lead.id},
      ${lead.createdAt},
      ${lead.name},
      ${lead.phone},
      ${lead.zip},
      ${lead.cityLabel},
      ${lead.stateSlug ?? null},
      ${lead.citySlug ?? null},
      ${lead.serviceSlug},
      ${lead.serviceName},
      ${lead.urgency},
      ${lead.notes},
      ${lead.photoDataUrl ?? null},
      ${lead.sourcePath},
      ${lead.status},
      ${lead.invalidReason ?? null},
      ${JSON.stringify(lead.assignedPartnerIds)},
      ${JSON.stringify(lead.statusHistory)}
    )
    on conflict (id) do nothing
  `;
}

export async function createNotificationsForLead(lead: Lead) {
  const sql = await getSql();
  const at = new Date().toISOString();
  const created: LeadNotification[] = [];
  const cfg = notifyConfigStatus();

  for (const partnerId of lead.assignedPartnerIds) {
    const partner = getPartner(partnerId);
    if (!partner) continue;

    const urgencyTag =
      lead.urgency === "emergency" ? "emergency lead" : "lead";
    const subject = `New ${urgencyTag} · ${lead.serviceName} · ${lead.cityLabel}`;
    const body = [
      `Customer: ${lead.name}`,
      `Phone: ${lead.phone}`,
      `ZIP: ${lead.zip}`,
      `Service: ${lead.serviceName}`,
      `Urgency: ${lead.urgency}`,
      lead.notes ? `Notes: ${lead.notes}` : null,
      lead.photoDataUrl ? "Photo: attached (view in dashboard)" : null,
      `Source: ${cfg.siteUrl}${lead.sourcePath}`,
      `Lead ID: ${lead.id}`,
      "",
      cfg.resend
        ? "— Flushing Toilets lead alert"
        : "— Flushing Toilets notify pipeline (stub: logged; set RESEND_API_KEY to send)",
    ]
      .filter(Boolean)
      .join("\n");

    const emailDelivery = await deliverEmail({
      to: partner.email,
      subject,
      text: body,
    });

    const emailId = `n-${lead.id}-${partnerId}-email-${Date.now()}`;
    await sql`
      insert into ft_notifications (id, lead_id, created_at, channel, recipient, partner_id, subject, body, status)
      values (
        ${emailId}, ${lead.id}, ${at}, ${"email"}, ${partner.email}, ${partner.id},
        ${subject}, ${body}, ${emailDelivery.status}
      )
      on conflict (id) do nothing
    `;
    created.push({
      id: emailId,
      at,
      channel: "email",
      to: partner.email,
      partnerId: partner.id,
      subject,
      body,
      status: emailDelivery.status,
    });

    if (lead.urgency === "emergency") {
      const smsBody = `${lead.name} ${lead.phone} · ${lead.zip} · ${lead.serviceName}`;
      const smsSubject = `SMS alert: ${lead.serviceName} in ${lead.cityLabel}`;
      const smsDelivery = await deliverSms({ to: partner.phone, body: smsBody });
      const smsId = `n-${lead.id}-${partnerId}-sms-${Date.now()}`;
      await sql`
        insert into ft_notifications (id, lead_id, created_at, channel, recipient, partner_id, subject, body, status)
        values (
          ${smsId}, ${lead.id}, ${at}, ${"sms"}, ${partner.phone}, ${partner.id},
          ${smsSubject}, ${smsBody}, ${smsDelivery.status}
        )
        on conflict (id) do nothing
      `;
      created.push({
        id: smsId,
        at,
        channel: "sms",
        to: partner.phone,
        partnerId: partner.id,
        subject: smsSubject,
        body: smsBody,
        status: smsDelivery.status,
      });
    }
  }

  // Safety net: a lead that matched no partner (or only placeholder partners)
  // must still reach a human. LEAD_FALLBACK_EMAIL gets a copy of every lead.
  if (cfg.fallbackEmail) {
    const subject = `Lead copy · ${lead.serviceName} · ${lead.cityLabel}${
      created.some((n) => n.status === "sent") ? "" : " · NO PARTNER NOTIFIED"
    }`;
    const body = [
      `Customer: ${lead.name}`,
      `Phone: ${lead.phone}`,
      `ZIP: ${lead.zip}`,
      `Service: ${lead.serviceName}`,
      `Urgency: ${lead.urgency}`,
      lead.notes ? `Notes: ${lead.notes}` : null,
      `Source: ${cfg.siteUrl}${lead.sourcePath}`,
      `Lead ID: ${lead.id}`,
      "",
      `Partners matched: ${lead.assignedPartnerIds.length}`,
      `Partner emails actually sent: ${created.filter((n) => n.channel === "email" && n.status === "sent").length}`,
    ]
      .filter(Boolean)
      .join("\n");

    const delivery = await deliverEmail({
      to: cfg.fallbackEmail,
      subject,
      text: body,
    });
    const fallbackId = `n-${lead.id}-fallback-email-${Date.now()}`;
    await sql`
      insert into ft_notifications (id, lead_id, created_at, channel, recipient, partner_id, subject, body, status)
      values (
        ${fallbackId}, ${lead.id}, ${at}, ${"email"}, ${cfg.fallbackEmail}, ${"fallback"},
        ${subject}, ${body}, ${delivery.status}
      )
      on conflict (id) do nothing
    `;
    created.push({
      id: fallbackId,
      at,
      channel: "email",
      to: cfg.fallbackEmail,
      partnerId: "fallback",
      subject,
      body,
      status: delivery.status,
    });
  }

  return created;
}

export async function createLeadServer(
  input: Omit<
    Lead,
    "id" | "createdAt" | "status" | "statusHistory" | "notifications"
  >,
): Promise<Lead> {
  await ensureSeedLeads();
  const now = new Date().toISOString();
  const lead: Lead = {
    ...input,
    id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: now,
    status: "new",
    statusHistory: [{ status: "new", at: now, by: "system" }],
    notifications: [],
  };
  await insertLeadRecord(lead);
  const notifications = await createNotificationsForLead(lead);
  return { ...lead, notifications };
}

export async function listLeadsServer(opts?: {
  partnerId?: string;
}): Promise<Lead[]> {
  await ensureSeedLeads();
  const sql = await getSql();
  const rows = await sql<LeadRow>`
    select * from ft_leads order by created_at desc
  `;
  const leads: Lead[] = [];
  for (const row of rows) {
    const notifications = await notificationsForLead(row.id);
    const lead = rowToLead(row, notifications);
    if (opts?.partnerId && !lead.assignedPartnerIds.includes(opts.partnerId)) {
      continue;
    }
    leads.push(lead);
  }
  return leads;
}

export async function getLeadServer(id: string): Promise<Lead | null> {
  await ensureSeedLeads();
  const sql = await getSql();
  const rows = await sql<LeadRow>`select * from ft_leads where id = ${id}`;
  const row = rows[0];
  if (!row) return null;
  return rowToLead(row, await notificationsForLead(id));
}

export async function updateLeadStatusServer(
  id: string,
  status: LeadStatus,
  opts?: { by?: LeadStatusEvent["by"]; note?: string; invalidReason?: string },
): Promise<Lead | null> {
  const lead = await getLeadServer(id);
  if (!lead) return null;
  const event: LeadStatusEvent = {
    status,
    at: new Date().toISOString(),
    by: opts?.by ?? "partner",
    note: opts?.note,
  };
  const nextHistory = [...lead.statusHistory, event];
  const invalidReason =
    status === "invalid"
      ? opts?.invalidReason ?? opts?.note ?? "Marked invalid"
      : lead.invalidReason ?? null;

  const sql = await getSql();
  await sql`
    update ft_leads set
      status = ${status},
      invalid_reason = ${invalidReason},
      status_history = ${JSON.stringify(nextHistory)}
    where id = ${id}
  `;
  return getLeadServer(id);
}

export async function resendNotificationsServer(id: string) {
  const lead = await getLeadServer(id);
  if (!lead) return [];
  return createNotificationsForLead(lead);
}

export async function listNotificationsServer() {
  await ensureSeedLeads();
  const sql = await getSql();
  const rows = await sql<NotifRow>`
    select * from ft_notifications order by created_at desc limit 200
  `;
  return rows.map((n) => ({
    id: n.id,
    leadId: n.lead_id,
    at: iso(n.created_at),
    channel: n.channel as "email" | "sms",
    to: n.recipient,
    partnerId: n.partner_id,
    subject: n.subject,
    body: n.body,
    status: n.status as LeadNotification["status"],
    leadSummary: n.subject,
  }));
}

export async function submitApplicationServer(input: {
  company: string;
  contactName: string;
  phone: string;
  email: string;
  license: string;
  stateSlug: string;
  cities: string;
  tier: string;
  notes: string;
}): Promise<PartnerApplication> {
  const sql = await getSql();
  const id = `app-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const createdAt = new Date().toISOString();
  await sql`
    insert into ft_partner_applications (
      id, created_at, company, contact_name, phone, email, license,
      state_slug, cities, tier, notes, status
    ) values (
      ${id}, ${createdAt}, ${input.company}, ${input.contactName}, ${input.phone},
      ${input.email}, ${input.license}, ${input.stateSlug}, ${input.cities},
      ${input.tier}, ${input.notes}, ${"pending"}
    )
  `;
  return {
    id,
    createdAt,
    company: input.company,
    contactName: input.contactName,
    phone: input.phone,
    email: input.email,
    license: input.license,
    stateSlug: input.stateSlug,
    cities: input.cities,
    tier: input.tier,
    notes: input.notes,
    status: "pending",
  };
}

export async function listApplicationsServer(): Promise<PartnerApplication[]> {
  const sql = await getSql();
  const rows = await sql<{
    id: string;
    created_at: string | Date;
    company: string;
    contact_name: string;
    phone: string;
    email: string;
    license: string;
    state_slug: string;
    cities: string;
    tier: string;
    notes: string;
    status: string;
  }>`select * from ft_partner_applications order by created_at desc`;

  return rows.map((r) => ({
    id: r.id,
    createdAt: iso(r.created_at),
    company: r.company,
    contactName: r.contact_name,
    phone: r.phone,
    email: r.email,
    license: r.license,
    stateSlug: r.state_slug,
    cities: r.cities,
    tier: r.tier,
    notes: r.notes,
    status: r.status as PartnerApplication["status"],
  }));
}

export async function updateApplicationStatusServer(
  id: string,
  status: "pending" | "approved" | "rejected",
) {
  const sql = await getSql();
  await sql`update ft_partner_applications set status = ${status} where id = ${id}`;
  const rows = await listApplicationsServer();
  return rows.find((a) => a.id === id) ?? null;
}

export function buildTerritoryBoard(): TerritoryCell[] {
  const board: TerritoryCell[] = [];
  const byCity = new Map<string, typeof PARTNERS>();
  for (const p of PARTNERS) {
    for (const city of p.citySlugs) {
      const key = `${p.stateSlug}::${city}`;
      const list = byCity.get(key) ?? [];
      list.push(p);
      byCity.set(key, list);
    }
  }

  for (const [key, list] of byCity) {
    const [stateSlug, citySlug] = key.split("::");
    const exclusive = list.find((p) => p.tier === "exclusive") ?? null;
    board.push({
      stateSlug,
      citySlug,
      exclusivePartnerId: exclusive?.id ?? null,
      preferredCount: list.filter((p) => p.tier === "preferred").length,
      connectCount: list.filter((p) => p.tier === "connect").length,
      openForExclusive: !exclusive,
    });
  }

  return board.sort((a, b) =>
    `${a.stateSlug}-${a.citySlug}`.localeCompare(`${b.stateSlug}-${b.citySlug}`),
  );
}

export function getDeployReadiness() {
  const cfg = notifyConfigStatus();
  const steps = [
    {
      id: "database",
      title: "Neon DATABASE_URL",
      required: true,
      done: cfg.database,
      note: cfg.database
        ? "DATABASE_URL is set — production Postgres active."
        : "Create a Neon project and set DATABASE_URL on the host (required for durable leads).",
    },
    {
      id: "host",
      title: "Host + domain DNS",
      required: true,
      done: false,
      note: "Deploy to Vercel (or platform deploy) and point flushingtoilets.com DNS to it.",
    },
    {
      id: "email",
      title: "Resend email notify",
      required: false,
      done: cfg.resend,
      note: cfg.resend
        ? "RESEND_API_KEY set — partner emails will send."
        : "Strongly recommended day one. Without it, notify is logged only (sent_stub).",
    },
    {
      id: "from",
      title: "Verified from address",
      required: false,
      done: Boolean(process.env.NOTIFY_FROM_EMAIL?.trim()),
      note: `Using ${cfg.fromEmail}. Verify this domain in Resend before real sends.`,
    },
    {
      id: "sms",
      title: "Twilio emergency SMS",
      required: false,
      done: cfg.twilio,
      note: cfg.twilio
        ? "Twilio env set — emergency SMS can send."
        : "Optional for launch; email-first is fine.",
    },
  ] as const;

  const softLaunchReady = cfg.database;
  const fullOpsReady = cfg.database && cfg.resend;

  return {
    config: cfg,
    steps: [...steps],
    softLaunchReady,
    fullOpsReady,
    requiredDone: softLaunchReady,
    mode: cfg.database ? ("neon" as const) : ("pglite" as const),
  };
}
