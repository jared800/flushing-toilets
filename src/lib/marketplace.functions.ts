import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { partnersForCity } from "@/data/partners";
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

/**
 * Public lead intake. Validated server-side: the browser no longer decides who
 * receives a lead (assignedPartnerIds from the client is ignored and recomputed
 * from the city), sizes are capped, and a hidden honeypot field drops bots.
 */
const MAX_PHOTO_DATA_URL = 3_000_000; // ~2.2 MB image
const leadInput = z.object({
  name: z.string().trim().max(120),
  phone: z
    .string()
    .trim()
    .max(32)
    .refine((v) => v.replace(/\D/g, "").length >= 10, "Enter a full phone number."),
  zip: z.string().trim().min(3).max(64),
  cityLabel: z.string().trim().max(120),
  stateSlug: z.string().max(40).optional(),
  citySlug: z.string().max(60).optional(),
  serviceSlug: z.string().max(60),
  serviceName: z.string().max(80),
  urgency: z.enum(["emergency", "today", "this-week"]),
  notes: z.string().max(2000).default(""),
  photoDataUrl: z
    .string()
    .max(MAX_PHOTO_DATA_URL, "Photo is too large.")
    .refine((v) => v.startsWith("data:image/"), "Photo must be an image.")
    .optional(),
  sourcePath: z.string().max(300),
  assignedPartnerIds: z.array(z.string()).max(10).optional(),
  /** Honeypot. Real visitors never see or fill this. */
  website: z.string().max(200).optional(),
});

export const submitLeadFn = createServerFn({ method: "POST" })
  .validator((data: z.input<typeof leadInput>) => leadInput.parse(data))
  .handler(async ({ data }) => {
    const { website, assignedPartnerIds: _ignored, ...rest } = data;
    if (website && website.trim()) {
      // Pretend success so bots get no signal; nothing is stored or sent.
      return { id: "ok", notifications: [] } as unknown as Awaited<
        ReturnType<typeof createLeadServer>
      >;
    }
    const assigned =
      rest.stateSlug && rest.citySlug
        ? partnersForCity(rest.stateSlug, rest.citySlug)
            .slice(0, 3)
            .map((p) => p.id)
        : [];
    return createLeadServer({ ...rest, assignedPartnerIds: assigned });
  });

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
