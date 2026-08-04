import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { opsSessionFn } from "@/lib/ops-auth.functions";

/**
 * Asks the SERVER who the caller is. The old version trusted a localStorage
 * flag, which any visitor could set for themselves. This redirect is only UX —
 * the real enforcement is the middleware on every ops server function.
 */
export function useAdminGate() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let alive = true;
    void (async () => {
      let ok = false;
      try {
        const session = await opsSessionFn();
        ok = session.role === "admin";
      } catch {
        ok = false;
      }
      if (!alive) return;
      setAuthed(ok);
      setReady(true);
      if (!ok) void navigate({ to: "/admin/login" });
    })();
    return () => {
      alive = false;
    };
  }, [navigate]);

  return { ready, authed };
}
