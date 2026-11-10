/**
 * Permanent 301s for out-of-state location hubs Jared named on 2026-11-10
 * (Phoenix, Austin, Miami, Houston, Tampa, Dallas) and every out-of-state
 * city x service page (already noindex). Hubs go to /locations/utah.
 * City x service pages go to the matching /services/{service} page.
 * Utah routes stay untouched.
 *
 * Used by nitro routeRules (HTTP 301 for crawlers) and the location
 * route loaders (client-side navigations).
 */
import { STATES, getCity, getState } from "./locations";
import { SERVICES, getService } from "./services";

export const UTAH_STATE_SLUG = "utah";
export const HUB_REDIRECT_TARGET = "/locations/utah";

export const REDIRECTED_CITY_HUBS: ReadonlyArray<{
  state: string;
  city: string;
}> = [
  { state: "arizona", city: "phoenix" },
  { state: "texas", city: "austin" },
  { state: "florida", city: "miami" },
  { state: "texas", city: "houston" },
  { state: "florida", city: "tampa" },
  { state: "texas", city: "dallas" },
];

export type RedirectEntry = {
  from: string;
  to: string;
  kind: "hub" | "city-service";
};

function hubKey(state: string, city: string) {
  return `${state}/${city}`;
}

const HUB_SET = new Set(
  REDIRECTED_CITY_HUBS.map((h) => hubKey(h.state, h.city)),
);

export function isRedirectedCityHub(state: string, city: string) {
  return HUB_SET.has(hubKey(state, city));
}

export function redirectForCityHub(
  state: string,
  city: string,
): string | undefined {
  return isRedirectedCityHub(state, city) ? HUB_REDIRECT_TARGET : undefined;
}

export function redirectForCityService(
  state: string,
  city: string,
  service: string,
): string | undefined {
  if (state === UTAH_STATE_SLUG) return undefined;
  if (!getCity(state, city) || !getService(service)) return undefined;
  return `/services/${service}`;
}

export function buildRedirects(): RedirectEntry[] {
  const missingHubs = REDIRECTED_CITY_HUBS.filter(
    (h) => !getCity(h.state, h.city),
  );
  if (missingHubs.length) {
    throw new Error(
      `Redirected hubs missing from locations.ts: ${missingHubs
        .map((h) => `${h.state}/${h.city}`)
        .join(", ")}`,
    );
  }

  const entries: RedirectEntry[] = [];
  for (const state of STATES) {
    for (const city of state.cities) {
      if (isRedirectedCityHub(state.slug, city.slug)) {
        entries.push({
          from: `/locations/${state.slug}/${city.slug}`,
          to: HUB_REDIRECT_TARGET,
          kind: "hub",
        });
      }
      if (state.slug === UTAH_STATE_SLUG) continue;
      for (const service of SERVICES) {
        entries.push({
          from: `/locations/${state.slug}/${city.slug}/${service.slug}`,
          to: `/services/${service.slug}`,
          kind: "city-service",
        });
      }
    }
  }
  return entries;
}

export function nitroRedirectRules(): Record<
  string,
  { redirect: { to: string; status: number } }
> {
  const rules: Record<string, { redirect: { to: string; status: number } }> = {};
  for (const { from, to } of buildRedirects()) {
    rules[from] = { redirect: { to, status: 301 } };
    rules[`${from}/`] = { redirect: { to, status: 301 } };
  }
  return rules;
}

export function assertRedirectTargetsExist(entries = buildRedirects()) {
  const utah = getState(UTAH_STATE_SLUG);
  if (!utah) throw new Error("Utah state route is missing from locations.ts");

  const sources = new Set(entries.map((e) => e.from));
  for (const entry of entries) {
    if (entry.from.startsWith("/locations/utah")) {
      throw new Error(`Utah source must not redirect: ${entry.from}`);
    }
    if (sources.has(entry.to)) {
      throw new Error(`Redirect chain or loop: ${entry.from} -> ${entry.to}`);
    }
    if (entry.kind === "hub") {
      if (entry.to !== HUB_REDIRECT_TARGET) {
        throw new Error(`Hub ${entry.from} must go to ${HUB_REDIRECT_TARGET}`);
      }
    } else {
      const slug = entry.to.replace(/^\/services\//, "");
      if (!getService(slug)) {
        throw new Error(`Missing service target for ${entry.from} -> ${entry.to}`);
      }
    }
  }
  return entries;
}
