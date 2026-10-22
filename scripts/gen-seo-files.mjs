/**
 * Emits public/robots.txt and public/sitemap.xml from the site's own data files.
 * Runs before `vite build` so the sitemap can never drift from the routes.
 *
 * Fails loudly (non-zero exit) if it cannot find the expected slugs, rather
 * than writing an empty sitemap that would look fine and index nothing.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE =
  process.env.SITE_URL?.trim().replace(/\/+$/, "") ||
  "https://www.flushingtoilets.com";

function read(rel) {
  return readFileSync(resolve(root, rel), "utf8");
}

// --- locations: state slug followed by its city slugs (indentation tells them apart)
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

const guides = [
  ...read("src/data/guides.ts").matchAll(/slug:\s*"([a-z0-9-]+)"/g),
].map((m) => m[1]);

// Cities with hand-written local copy. Only these get their city x service
// pages listed — the rest are template fills and are noindexed in the route,
// so listing them would ask Google to crawl pages we tell it to drop.
// Mirrors hasUniqueLocalContent() in src/data/metro-content.ts.
const deepMetros = new Set(
  [
    ...read("src/data/metro-content.ts").matchAll(
      /stateSlug:\s*"([a-z-]+)",\s*\n\s*citySlug:\s*"([a-z-]+)"/g,
    ),
  ].map((m) => `${m[1]}/${m[2]}`),
);

// City x service pages allowed in the index. Mirrors isIndexableCityService()
// in src/data/indexable-city-services.ts; everything else is noindex in the
// route, so it stays out of the sitemap too.
const indexableCityServices = new Set(
  [
    ...read("src/data/indexable-city-services.ts").matchAll(
      /"([a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+)"/g,
    ),
  ].map((m) => m[1]),
);

if (deepMetros.size === 0) {
  console.error("[seo] refusing to build — found no deep metros to index");
  process.exit(1);
}

if (states.length === 0 || services.length === 0) {
  console.error(
    `[seo] refusing to write an empty sitemap — states=${states.length} services=${services.length}`,
  );
  process.exit(1);
}

const staticPaths = [
  "/",
  "/how-it-works",
  "/get-help",
  // The diagnostic tool is the site's only genuinely linkable asset — it must
  // never fall out of the sitemap.
  "/diagnostic",
  "/search",
  "/about",
  "/contact",
  "/locations",
  "/services",
  "/guides",
  "/for-plumbers",
  "/for-plumbers/pricing",
  "/for-plumbers/apply",
  "/privacy",
  "/terms",
];

// Private / thin surfaces stay out of the sitemap AND out of the crawl.
const disallow = [
  "/admin",
  "/partners",
  "/brand",
  "/for-plumbers/territory",
];

const urls = new Set(staticPaths);
let skipped = 0;
for (const s of states) {
  urls.add(`/locations/${s.slug}`);
  for (const c of s.cities) {
    if (!deepMetros.has(`${s.slug}/${c}`)) {
      // Template city page is noindexed in the route; keep it out of the sitemap too.
      skipped += services.length;
      continue;
    }
    urls.add(`/locations/${s.slug}/${c}`);
    for (const svc of services) {
      if (!indexableCityServices.has(`${s.slug}/${c}/${svc}`)) {
        skipped += 1;
        continue;
      }
      urls.add(`/locations/${s.slug}/${c}/${svc}`);
    }
  }
}
for (const svc of services) urls.add(`/services/${svc}`);
for (const g of guides) urls.add(`/guides/${g}`);

function priority(path) {
  if (path === "/") return "1.0";
  const depth = path.split("/").filter(Boolean).length;
  if (depth === 1) return "0.8";
  if (depth === 2) return "0.7";
  if (depth === 3) return "0.6";
  return "0.5";
}

const today = new Date().toISOString().slice(0, 10);
const body = [...urls]
  .sort()
  .map(
    (p) =>
      `  <url>\n    <loc>${SITE}${p === "/" ? "/" : p}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority(p)}</priority>\n  </url>`,
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

const robots = [
  "User-agent: *",
  ...disallow.map((d) => `Disallow: ${d}`),
  "",
  `Sitemap: ${SITE}/sitemap.xml`,
  "",
].join("\n");

mkdirSync(resolve(root, "public"), { recursive: true });
writeFileSync(resolve(root, "public/sitemap.xml"), sitemap);
writeFileSync(resolve(root, "public/robots.txt"), robots);

// llms.txt: a plain summary for AI assistants (llmstxt.org format).
const titleOf = (src, slug) => {
  const m = src.match(new RegExp(`slug:\\s*"${slug}",[\\s\\S]*?title:\\s*"([^"]+)"`));
  return m ? m[1] : slug;
};
const guidesSrc = read("src/data/guides.ts");
const llms = [
  "# Flushing Toilets",
  "",
  "> Free referral service for toilet and drain problems. Plain-English repair guides, a free diagnostic, and requests routed to independent, licensed local plumbers. Flushing Toilets is not a plumbing company and does not do the work.",
  "",
  "Coverage: Texas, Florida, Arizona, and Utah (Salt Lake City and Utah County). Contact: hello@flushingtoilets.com",
  "",
  "## Repair guides",
  ...guides.map((g) => `- [${titleOf(guidesSrc, g)}](${SITE}/guides/${g})`),
  "",
  "## Tools",
  `- [Toilet diagnostic](${SITE}/diagnostic): answer a few questions to find the likely cause`,
  `- [Get a plumber](${SITE}/get-help): request form, reviewed by a person`,
  "",
  "## About",
  `- [How it works](${SITE}/how-it-works)`,
  `- [About](${SITE}/about)`,
  `- [Privacy](${SITE}/privacy)`,
  "",
].join("\n");
writeFileSync(resolve(root, "public/llms.txt"), llms);
console.log(
  `[seo] wrote sitemap.xml (${urls.size} urls) and robots.txt for ${SITE}`,
);
console.log(
  `[seo] ${deepMetros.size} deep metros indexed; ${skipped} city x service pages omitted (noindex: templated city or not in src/data/indexable-city-services.ts)`,
);
