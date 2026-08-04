import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MapPin, Search } from "lucide-react";
import { findCitiesByQuery } from "@/data/locations";
import { SERVICES } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";

export function GeoSearch({
  className,
  defaultService,
  compact,
}: {
  className?: string;
  defaultService?: string;
  compact?: boolean;
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [service, setService] = useState(defaultService ?? "");
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => findCitiesByQuery(query), [query]);
  const showDropdown = focused && query.trim().length > 0;

  function goToCity(stateSlug: string, citySlug: string) {
    setFocused(false);
    if (service) {
      void navigate({
        to: "/locations/$state/$city/$service",
        params: { state: stateSlug, city: citySlug, service },
      });
    } else {
      void navigate({
        to: "/locations/$state/$city",
        params: { state: stateSlug, city: citySlug },
      });
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (results[0]) {
      goToCity(results[0].state.slug, results[0].city.slug);
      return;
    }
    const qs = new URLSearchParams();
    if (query) qs.set("q", query);
    if (service) qs.set("service", service);
    window.location.assign(`/search?${qs.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "relative rounded-xl border border-border bg-surface p-2 shadow-[0_18px_40px_-28px_rgba(11,61,74,0.45)]",
        className,
      )}
    >
      <div
        className={cn(
          "grid gap-2",
          compact ? "md:grid-cols-[1fr_auto]" : "md:grid-cols-[1.2fr_1fr_auto]",
        )}
      >
        <div className="relative">
          <MapPin className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder="City or ZIP"
            className="border-0 bg-bg pl-9 shadow-none focus-visible:ring-0"
            aria-label="City or ZIP"
            autoComplete="off"
          />
          {showDropdown && (
            <div className="absolute top-[calc(100%+6px)] right-0 left-0 z-20 overflow-hidden rounded-lg border border-border bg-surface shadow-lg">
              {results.length === 0 ? (
                <p className="px-3 py-3 text-sm text-fg-muted">
                  No cities match — try a ZIP or browse locations.
                </p>
              ) : (
                <ul>
                  {results.map(({ state, city }) => (
                    <li key={`${state.slug}-${city.slug}`}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-surface-muted"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => goToCity(state.slug, city.slug)}
                      >
                        <span className="font-medium text-fg">
                          {city.name}, {state.abbr}
                        </span>
                        <span className="text-xs text-fg-subtle">
                          {city.zips[0]}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {!compact && (
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="h-11 w-full rounded-lg border-0 bg-bg px-3 text-sm text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stream/25"
            aria-label="Service needed"
          >
            <option value="">Any toilet problem</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        )}

        <Button type="submit" size="lg" className="w-full md:w-auto">
          <Search className="h-4 w-4" />
          Find help
        </Button>
      </div>
    </form>
  );
}
