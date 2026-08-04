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
            Trust in {cityName}
          </h2>
          <p className="mt-1 text-sm text-fg-muted">
            License-verified partners · marketplace transparency
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
            License checked
          </span>
        </Badge>
        <Badge variant="stream">Independent local plumbers</Badge>
        <Badge variant="signal">TCPA consent on form</Badge>
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
          No customer reviews yet for {cityName} — we only publish reviews real
          customers leave. Every partner still has to show a license and proof
          of insurance before we activate them.
        </p>
      )}
    </section>
  );
}
