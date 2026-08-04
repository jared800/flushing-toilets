export type LeadUrgency = "emergency" | "today" | "this-week";

export type LeadStatus = "new" | "contacted" | "booked" | "invalid";

export type LeadStatusEvent = {
  status: LeadStatus;
  at: string;
  by: "system" | "partner" | "admin";
  note?: string;
};

export type LeadNotification = {
  id: string;
  at: string;
  channel: "email" | "sms";
  to: string;
  partnerId: string;
  subject: string;
  body: string;
  status: "queued" | "sent_stub" | "sent" | "failed";
};

export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  zip: string;
  cityLabel: string;
  stateSlug?: string;
  citySlug?: string;
  serviceSlug: string;
  serviceName: string;
  urgency: LeadUrgency;
  notes: string;
  photoDataUrl?: string;
  sourcePath: string;
  status: LeadStatus;
  invalidReason?: string;
  assignedPartnerIds: string[];
  statusHistory: LeadStatusEvent[];
  notifications: LeadNotification[];
};

export function leadStats(leads: Lead[]) {
  return {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    booked: leads.filter((l) => l.status === "booked").length,
    invalid: leads.filter((l) => l.status === "invalid").length,
    emergency: leads.filter((l) => l.urgency === "emergency").length,
  };
}
