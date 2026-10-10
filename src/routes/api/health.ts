import { createFileRoute } from "@tanstack/react-router";

/**
 * Health check: confirms the lead database is reachable. Returns no data —
 * only which backend is active and whether a trivial query succeeded.
 * "pglite" in production means DATABASE_URL is missing and leads would be lost.
 */
export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        const { dbSource, getSql } = await import("@/lib/db");
        let dbOk = false;
        try {
          const sql = await getSql();
          await sql`select 1 as ok`;
          dbOk = true;
        } catch {
          dbOk = false;
        }
        return new Response(JSON.stringify({ ok: dbOk, db: dbSource }), {
          status: dbOk ? 200 : 503,
          headers: {
            "content-type": "application/json",
            "cache-control": "no-store",
            "x-robots-tag": "noindex",
          },
        });
      },
    },
  },
});
