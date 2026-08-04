import { createServerFn } from "@tanstack/react-start";
import {
  createLeadServer,
  getLeadServer,
  listApplicationsServer,
  listLeadsServer,
  listNotificationsServer,
  resendNotificationsServer,
  submitApplicationServer,
  updateApplicationStatusServer,
  updateLeadStatusServer,
  buildTerritoryBoard,
  getDeployReadiness,
} from "@/lib/marketplace.server";
import type { LeadStatus } from "@/lib/leads-types";

export const submitLeadFn = createServerFn({ method: "POST" })
  .validator(
    (data: {
      name: string;
      phone: string;
      zip: string;
      cityLabel: string;
      stateSlug?: string;
      citySlug?: string;
      serviceSlug: string;
      serviceName: string;
      urgency: "emergency" | "today" | "this-week";
      notes: string;
      photoDataUrl?: string;
      sourcePath: string;
      assignedPartnerIds: string[];
    }) => data,
  )
  .handler(async ({ data }) => createLeadServer(data));

export const listLeadsFn = createServerFn({ method: "GET" })
  .validator((data?: { partnerId?: string }) => data ?? {})
  .handler(async ({ data }) => listLeadsServer(data));

export const getLeadFn = createServerFn({ method: "GET" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => getLeadServer(data.id));

export const updateLeadStatusFn = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id: string;
      status: LeadStatus;
      by?: "partner" | "admin";
      note?: string;
      invalidReason?: string;
    }) => data,
  )
  .handler(async ({ data }) =>
    updateLeadStatusServer(data.id, data.status, {
      by: data.by,
      note: data.note,
      invalidReason: data.invalidReason,
    }),
  );

export const listNotificationsFn = createServerFn({ method: "GET" }).handler(
  async () => listNotificationsServer(),
);

export const resendNotificationsFn = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => resendNotificationsServer(data.id));

export const submitApplicationFn = createServerFn({ method: "POST" })
  .validator(
    (data: {
      company: string;
      contactName: string;
      phone: string;
      email: string;
      license: string;
      stateSlug: string;
      cities: string;
      tier: string;
      notes: string;
    }) => data,
  )
  .handler(async ({ data }) => submitApplicationServer(data));

export const listApplicationsFn = createServerFn({ method: "GET" }).handler(
  async () => listApplicationsServer(),
);

export const updateApplicationStatusFn = createServerFn({ method: "POST" })
  .validator(
    (data: { id: string; status: "pending" | "approved" | "rejected" }) => data,
  )
  .handler(async ({ data }) =>
    updateApplicationStatusServer(data.id, data.status),
  );

export const getTerritoryBoardFn = createServerFn({ method: "GET" }).handler(
  async () => buildTerritoryBoard(),
);

export const getDeployReadinessFn = createServerFn({ method: "GET" }).handler(
  async () => getDeployReadiness(),
);
