import { Shield, Star } from "lucide-react";
import {
  cityTrustScore,
  reviewsForCity,
  reviewsForCityService,
} from "@/data/reviews";
import { Badge } from "@/components/ui/badge";

export function CityTrustBlock({
  stateSlug,
  citySlug,
  cityName,
  serviceSlug,
}: {
  stateSlug: string;
  citySlug: string;
  cityName: string;
  serviceSlug?: string;
}) {
  const trust = cityTrustScore(stateSlug, citySlug);
  const reviews = serviceSlug
    ? reviewsForCityService(stateSlug, citySlug, serviceSlug)
    : reviewsForCity(stateSlug, citySlug);

  return (
    <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold text-harbor">
            How requests in {cityName} are handled
          </h2>
          <p className="mt-1 text-sm text-fg-muted">
            Free referral service · not a plumbing company
          </p>
        </div>
        {trust && (
          <div className="flex items-center gap-2 rounded-lg border border-border bg-bg px-3 py-2">
            <Star className="h-4 w-4 fill-signal text-signal" />
            <span className="font-display text-lg font-semibold tabular-nums text-harbor">
              {trust.rating.toFixed(1)}
            </span>
            <span className="text-xs text-fg-subtle">{trust.label}</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="harbor">
          <span className="inline-flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Not a plumbing company
          </span>
        </Badge>
        <Badge variant="stream">Free for homeowners</Badge>
        <Badge variant="signal">Clear contact consent</Badge>
      </div>

      {reviews.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {reviews.slice(0, 3).map((r) => (
            <li
              key={r.id}
              className="rounded-lg border border-border bg-bg px-3 py-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-fg">{r.author}</p>
                <p className="text-xs text-fg-subtle">
                  {r.rating}/5 · {r.dateLabel}
                </p>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                {r.text}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-fg-muted">
          No customer reviews yet for {cityName}. We only publish reviews real
          customers leave. Before you hire any plumber, ask for their state
          license number and check it with the state licensing board.
        </p>
      )}
    </section>
  );
}
