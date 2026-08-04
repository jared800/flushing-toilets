import { BadgeCheck, Star } from "lucide-react";
import type { Partner } from "@/data/partners";
import { TIER_META } from "@/data/partners";
import { Badge } from "@/components/ui/badge";

export function PartnerCard({ partner }: { partner: Partner }) {
  const tier = TIER_META[partner.tier];
  return (
    <article className="rounded-xl border border-border bg-surface p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-semibold text-harbor">
              {partner.company}
            </h3>
            <Badge
              variant={
                partner.tier === "exclusive"
                  ? "harbor"
                  : partner.tier === "preferred"
                    ? "signal"
                    : "stream"
              }
            >
              {tier.badge}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-fg-muted">{partner.about}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-fg-muted">
        <span className="inline-flex items-center gap-1 font-medium text-fg">
          <Star className="h-4 w-4 fill-signal text-signal" />
          {partner.rating.toFixed(1)}
          <span className="font-normal text-fg-subtle">
            ({partner.reviewCount})
          </span>
        </span>
        <span className="inline-flex items-center gap-1">
          <BadgeCheck className="h-4 w-4 text-stream" />
          {partner.license}
        </span>
      </div>
      <p className="mt-2 text-xs text-fg-subtle">{partner.responsePromise}</p>
    </article>
  );
}
