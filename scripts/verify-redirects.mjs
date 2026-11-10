/**
 * Validate out-of-state 301 map against locations.ts, services.ts, and
 * the generated sitemap. Writes /workspace/flushingtoilets/redirect-map-2026-11-10.csv
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://www.flushingtoilets.com";

function read(rel) {
  return readFileSync(resolve(root, rel), "utf8");
}

const locationsSrc = read("src/data/locations.ts");
const states = [];
let current = null;
for (const line of locationsSrc.split("\n")) {
  const m = line.match(/slug:\s*"([a-z0-9-]+)"/);
  if (!m) continue;
  const indent = line.length - line.trimStart().length;
  if (indent <= 4) {
    current = { slug: m[1], cities: [] };
    states.push(current);
  } else if (current) {
    current.cities.push(m[1]);
  }
}

const services = [
  ...read("src/data/services.ts").matchAll(/slug:\s*"([a-z0-9-]+)"/g),
].map((m) => m[1]);

const hubs = [
  ...read("src/data/out-of-state-redirects.ts").matchAll(
    /state:\s*"([a-z0-9-]+)",\s*city:\s*"([a-z0-9-]+)"/g,
  ),
].map((m) => ({ state: m[1], city: m[2] }));

const errors = [];
if (hubs.length !== 6) errors.push(`expected 6 hubs, found ${hubs.length}`);
if (!states.some((s) => s.slug === "utah")) errors.push("utah state missing");
if (!services.length) errors.push("no services found");

const cityExists = (state, city) =>
  states.some((s) => s.slug === state && s.cities.includes(city));

for (const h of hubs) {
  if (!cityExists(h.state, h.city)) {
    errors.push(`hub not a real route: /locations/${h.state}/${h.city}`);
  }
  if (h.state === "utah") errors.push(`utah hub listed for redirect: ${h.city}`);
}

const HUB_TARGET = "/locations/utah";
const entries = [];
for (const h of hubs) {
  entries.push({
    from: `/locations/${h.state}/${h.city}`,
    to: HUB_TARGET,
    kind: "hub",
  });
}
for (const s of states) {
  if (s.slug === "utah") continue;
  for (const c of s.cities) {
    for (const svc of services) {
      entries.push({
        from: `/locations/${s.slug}/${c}/${svc}`,
        to: `/services/${svc}`,
        kind: "city-service",
      });
    }
  }
}

const sources = new Set(entries.map((e) => e.from));
const targets = new Set(entries.map((e) => e.to));
for (const e of entries) {
  if (sources.has(e.to)) {
    errors.push(`chain or loop: ${e.from} -> ${e.to}`);
  }
  if (e.from.startsWith("/locations/utah")) {
    errors.push(`utah source redirected: ${e.from}`);
  }
  if (e.kind === "hub" && e.to !== HUB_TARGET) {
    errors.push(`hub ${e.from} target ${e.to}`);
  }
  if (e.kind === "city-service") {
    const slug = e.to.slice("/services/".length);
    if (!services.includes(slug)) {
      errors.push(`unknown service target: ${e.from} -> ${e.to}`);
    }
  }
}

const utahCities = states.find((s) => s.slug === "utah")?.cities ?? [];
const sitemap = read("public/sitemap.xml");
const sitemapPaths = [
  ...sitemap.matchAll(/<loc>https:\/\/www\.flushingtoilets\.com([^<]*)<\/loc>/g),
].map((m) => m[1] || "/");

for (const h of hubs) {
  const path = `/locations/${h.state}/${h.city}`;
  if (sitemapPaths.includes(path)) {
    errors.push(`sitemap still lists redirected hub ${path}`);
  }
}
for (const e of entries.filter((x) => x.kind === "city-service")) {
  if (sitemapPaths.includes(e.from)) {
    errors.push(`sitemap lists redirected city-service ${e.from}`);
  }
}
if (!sitemapPaths.includes("/locations/utah")) {
  errors.push("sitemap missing /locations/utah");
}
for (const city of utahCities) {
  const path = `/locations/utah/${city}`;
  if (!sitemapPaths.includes(path)) {
    errors.push(`sitemap missing Utah city ${path}`);
  }
}
for (const svc of services) {
  if (!sitemapPaths.includes(`/services/${svc}`)) {
    errors.push(`sitemap missing service /services/${svc}`);
  }
}

const csvPath = "/workspace/flushingtoilets/redirect-map-2026-11-10.csv";
const csv = [
  "from,to,kind,from_url,to_url",
  ...entries.map(
    (e) =>
      `${e.from},${e.to},${e.kind},${SITE}${e.from},${SITE}${e.to}`,
  ),
].join("\n");
writeFileSync(csvPath, csv + "\n");

console.log(
  `[redirects] ${entries.length} canonical 301s (${hubs.length} hubs, ${
    entries.length - hubs.length
  } city-service); ${entries.length * 2} nitro rules with trailing slashes`,
);
console.log(`[redirects] wrote ${csvPath}`);
console.log(
  `[redirects] sitemap has ${sitemapPaths.length} urls after drop`,
);

if (errors.length) {
  console.error("[redirects] FAILED:");
  for (const err of errors) console.error(" -", err);
  process.exit(1);
}
console.log("[redirects] OK: every target exists, no chains or loops, Utah untouched");
