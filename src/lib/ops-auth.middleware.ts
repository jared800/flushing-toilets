import { createMiddleware } from "@tanstack/react-start";

/**
 * Authorization for the ops server functions. Every function that reads or
 * writes lead / notification / application data must carry one of these.
 *
 * `adminOnlyMiddleware` — admin session required.
 * `opsMiddleware`       — admin OR partner; handlers get `context.role` and
 *                         `context.partnerId` and MUST scope partner reads.
 *
 * Both fail closed: no valid signed cookie, no data.
 */

export const adminOnlyMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const { requireAdmin } = await import("./ops-auth.server");
    const session = requireAdmin();
    return next({ context: { role: session.role, partnerId: undefined } });
  },
);

export const opsMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const { requireOps } = await import("./ops-auth.server");
    const session = requireOps();
    return next({
      context: { role: session.role, partnerId: session.partnerId },
    });
  },
);
