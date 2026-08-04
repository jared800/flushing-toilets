import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { isAdminAuthed } from "@/lib/admin-session";

export function useAdminGate() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const ok = isAdminAuthed();
    if (!ok) {
      void navigate({ to: "/admin/login" });
      setAuthed(false);
    } else {
      setAuthed(true);
    }
    setReady(true);
  }, [navigate]);

  return { ready, authed };
}
