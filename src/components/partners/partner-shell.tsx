import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Droplets, LogOut } from "lucide-react";
import type { Partner } from "@/data/partners";
import { TIER_META } from "@/data/partners";
import { opsLogoutFn } from "@/lib/ops-auth.functions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

const nav: { to: string; label: string; end?: boolean }[] = [
  { to: "/partners", label: "Overview", end: true },
  { to: "/partners/leads", label: "Leads" },
  { to: "/partners/territory", label: "Territory" },
  { to: "/partners/billing", label: "Billing" },
  { to: "/partners/profile", label: "Profile" },
];

export function PartnerShell({
  partner,
  children,
}: {
  partner: Partner;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const tier = TIER_META[partner.tier];

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-bg-elevated">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-harbor text-bg-elevated">
                <Droplets className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-sm font-semibold text-harbor">
                  Partners
                </span>
                <span className="text-xs text-fg-subtle">{partner.company}</span>
              </span>
            </Link>
            <Badge variant="harbor">{tier.name}</Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              void (async () => {
                try {
                  await opsLogoutFn();
                } finally {
                  await navigate({ to: "/partners/login" });
                }
              })();
            }}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2 sm:px-6">
          {nav.map((item) => {
            const active = item.end
              ? pathname === item.to || pathname === `${item.to}/`
              : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to as "/partners"}
                className={cn(
                  "shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-harbor text-bg-elevated"
                    : "text-fg-muted hover:bg-surface-muted hover:text-fg",
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
