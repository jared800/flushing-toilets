import { createServerFn } from "@tanstack/react-start";
import { adminOnlyMiddleware } from "@/lib/ops-auth.middleware";
import type { Outcome } from "@/lib/lead-outcomes.server";

/**
 * Every function here is admin-only and fails closed without a valid signed
 * session cookie — this is lead-level commercial data.
 *
 * The server module is imported inside each handler rather than at the top of
 * the file so the database layer never gets pulled into the client bundle.
 */

export const getOutcomeFn = createServerFn({ method: "GET" })
  .middleware([adminOnlyMiddleware])
  .validator((data: { leadId: string }) => data)
  .handler(async ({ data }) => {
    const { getOutcomeServer } = await import("@/lib/lead-outcomes.server");
    return getOutcomeServer(data.leadId);
  });

export const recordOutcomeFn = createServerFn({ method: "POST" })
  .middleware([adminOnlyMiddleware])
  .validator(
    (data: {
      leadId: string;
      outcome: string;
      handedTo?: string;
      /** Dollars as typed by a human. Converted to cents server-side. */
      jobValueDollars?: number | null;
      note?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const { recordOutcomeServer, isOutcome } = await import(
      "@/lib/lead-outcomes.server"
    );
    if (!isOutcome(data.outcome)) {
      throw new Error(`Unknown outcome: ${data.outcome}`);
    }
    const cents =
      typeof data.jobValueDollars === "number" &&
      Number.isFinite(data.jobValueDollars)
        ? Math.round(data.jobValueDollars * 100)
        : null;
    return recordOutcomeServer({
      leadId: data.leadId,
      outcome: data.outcome as Outcome,
      handedTo: data.handedTo,
      jobValueCents: cents,
      note: data.note,
    });
  });

export const getEconomicsFn = createServerFn({ method: "GET" })
  .middleware([adminOnlyMiddleware])
  .handler(async () => {
    const { getEconomicsServer } = await import("@/lib/lead-outcomes.server");
    return getEconomicsServer();
  });
