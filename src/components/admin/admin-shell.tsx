import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Droplets, LogOut } from "lucide-react";
import { opsLogoutFn } from "@/lib/ops-auth.functions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const nav = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/leads", label: "All leads" },
  { to: "/admin/economics", label: "Economics" },
  { to: "/admin/notifications", label: "Notify log" },
  { to: "/admin/applications", label: "Applications" },
  { to: "/admin/go-live", label: "Go live" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-harbor-deep text-bg-elevated">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-signal" />
            <div>
              <p className="font-display text-sm font-semibold">Admin</p>
              <p className="text-xs text-bg-elevated/60">Flushing Toilets ops</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-white/20 bg-transparent text-bg-elevated hover:bg-white/10"
            >
              <Link to="/">Site</Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 bg-transparent text-bg-elevated hover:bg-white/10"
              onClick={() => {
                void (async () => {
                  try {
                    await opsLogoutFn();
                  } finally {
                    await navigate({ to: "/admin/login" });
                  }
                })();
              }}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2 sm:px-6">
          {nav.map((item) => {
            const active = item.end
              ? pathname === item.to || pathname === `${item.to}/`
              : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to as "/admin"}
                className={cn(
                  "shrink-0 rounded-lg px-3 py-2 text-sm font-medium",
                  active
                    ? "bg-signal text-ink"
                    : "text-bg-elevated/75 hover:bg-white/10 hover:text-bg-elevated",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
