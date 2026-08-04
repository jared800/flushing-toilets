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
import { adminOnlyMiddleware, opsMiddleware } from "@/lib/ops-auth.middleware";
import type { LeadStatus } from "@/lib/leads-types";

/**
 * PUBLIC (no session): submitLeadFn, submitApplicationFn, getTerritoryBoardFn.
 * Everything else reads or writes customer data and is gated — see
 * `ops-auth.middleware.ts`. Partner callers are scoped server-side to their own
 * leads; the partner id comes from the signed session, never the request body.
 */

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
  .middleware([opsMiddleware])
  .validator((data?: { partnerId?: string }) => data ?? {})
  .handler(async ({ data, context }) =>
    listLeadsServer({
      partnerId: context.role === "partner" ? context.partnerId : data.partnerId,
    }),
  );

export const getLeadFn = createServerFn({ method: "GET" })
  .middleware([opsMiddleware])
  .validator((data: { id: string }) => data)
  .handler(async ({ data, context }) => {
    const lead = await getLeadServer(data.id);
    if (!lead) return null;
    if (
      context.role === "partner" &&
      !lead.assignedPartnerIds.includes(context.partnerId ?? "")
    ) {
      return null;
    }
    return lead;
  });

export const updateLeadStatusFn = createServerFn({ method: "POST" })
  .middleware([opsMiddleware])
  .validator(
    (data: {
      id: string;
      status: LeadStatus;
      by?: "partner" | "admin";
      note?: string;
      invalidReason?: string;
    }) => data,
  )
  .handler(async ({ data, context }) => {
    if (context.role === "partner") {
      const lead = await getLeadServer(data.id);
      if (!lead?.assignedPartnerIds.includes(context.partnerId ?? "")) {
        return null;
      }
    }
    return updateLeadStatusServer(data.id, data.status, {
      // Never let the caller claim to be someone they are not.
      by: context.role,
      note: data.note,
      invalidReason: data.invalidReason,
    });
  });

export const listNotificationsFn = createServerFn({ method: "GET" })
  .middleware([adminOnlyMiddleware])
  .handler(async () => listNotificationsServer());

export const resendNotificationsFn = createServerFn({ method: "POST" })
  .middleware([adminOnlyMiddleware])
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

export const listApplicationsFn = createServerFn({ method: "GET" })
  .middleware([adminOnlyMiddleware])
  .handler(async () => listApplicationsServer());

export const updateApplicationStatusFn = createServerFn({ method: "POST" })
  .middleware([adminOnlyMiddleware])
  .validator(
    (data: { id: string; status: "pending" | "approved" | "rejected" }) => data,
  )
  .handler(async ({ data }) =>
    updateApplicationStatusServer(data.id, data.status),
  );

export const getTerritoryBoardFn = createServerFn({ method: "GET" }).handler(
  async () => buildTerritoryBoard(),
);

export const getDeployReadinessFn = createServerFn({ method: "GET" })
  .middleware([adminOnlyMiddleware])
  .handler(async () => getDeployReadiness());
