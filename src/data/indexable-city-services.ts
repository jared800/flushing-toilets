/**
 * City x service pages that stay indexable (and in the sitemap).
 *
 * Every other /locations/{state}/{city}/{service} page is `noindex, follow`
 * and left out of sitemap.xml. Reason (2026-10-22 diagnosis): the 98 deep
 * city x service pages share ~57% of their 5-word shingles with the same
 * service in other cities (~73% once city names are neutralised), and only
 * ~17% of each page's text is unique to it. That is scaled-template content
 * and the likeliest trigger for the Sep 25, 2026 visibility cliff.
 *
 * A page earns a spot here only when (1) it targets a query with measured
 * demand (Ahrefs US) and (2) it has been rewritten with genuinely local copy.
 * Keep entries as "state/city/service" string literals:
 * scripts/gen-seo-files.mjs parses this file with a regex.
 */
export const INDEXABLE_CITY_SERVICES: ReadonlySet<string> = new Set<string>([
  // EMPTY ON PURPOSE (2026-10-22). Jared approved noindex for the city x
  // service set. The recovery plan keeps 6 Utah pages, but only AFTER each is
  // rewritten and scores under 0.25 5-gram Jaccard vs its closest sibling.
  // Today they are still the shared template (~0.57), so they stay noindex.
  // Add each one back here, as a quoted state/city/service literal, only
  // when its rewrite ships and passes the check:
  //   utah/salt-lake-city/emergency-plumber  (300/mo)
  //   utah/provo/emergency-plumber           (150/mo)
  //   utah/ogden/emergency-plumber           (150/mo)
  //   utah/lehi/emergency-plumber            (100/mo)
  //   utah/orem/emergency-plumber            (70/mo)
  //   utah/salt-lake-city/toilet-install     (80/mo)
  // Do not put quoted slugs in these comments: gen-seo-files.mjs reads every
  // quoted state/city/service string in this file with a regex.
]);

export function isIndexableCityService(
  stateSlug: string,
  citySlug: string,
  serviceSlug: string,
) {
  return INDEXABLE_CITY_SERVICES.has(`${stateSlug}/${citySlug}/${serviceSlug}`);
}
