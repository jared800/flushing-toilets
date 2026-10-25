/**
 * Last real content change for each non-guide page in the sitemap, as
 * YYYY-MM-DD. Guides use `updated` in src/data/guides.ts instead.
 *
 * scripts/gen-seo-files.mjs reads this file for <lastmod>, and pages show the
 * same date to visitors, so the two can't drift. Bump a date ONLY when the
 * page's own content changes in a way a reader would notice. Shared
 * boilerplate (header, footer, the "who runs this site" line) doesn't count.
 * Dates before 2026-10-25 come from the git history of each page's files.
 */
export const PAGE_UPDATED: Record<string, string> = {
  "/": "2026-10-25",
  "/about": "2026-10-22",
  "/contact": "2026-10-22",
  "/diagnostic": "2026-10-25",
  "/for-plumbers": "2026-10-22",
  "/for-plumbers/apply": "2026-10-22",
  "/for-plumbers/pricing": "2026-10-22",
  "/get-help": "2026-10-22",
  "/guides": "2026-10-09",
  "/how-it-works": "2026-10-22",
  "/locations": "2026-10-10",
  "/locations/arizona": "2026-10-25",
  "/locations/arizona/phoenix": "2026-10-22",
  "/locations/florida": "2026-10-25",
  "/locations/florida/miami": "2026-10-22",
  "/locations/florida/tampa": "2026-10-22",
  "/locations/texas": "2026-10-25",
  "/locations/texas/austin": "2026-10-22",
  "/locations/texas/dallas": "2026-10-22",
  "/locations/texas/houston": "2026-10-22",
  "/locations/utah": "2026-10-25",
  "/locations/utah/american-fork": "2026-10-25",
  "/locations/utah/lehi": "2026-10-25",
  "/locations/utah/ogden": "2026-10-25",
  "/locations/utah/orem": "2026-10-25",
  "/locations/utah/provo": "2026-10-25",
  "/locations/utah/salt-lake-city": "2026-10-25",
  "/locations/utah/sandy": "2026-10-25",
  "/locations/utah/west-jordan": "2026-10-25",
  "/privacy": "2026-10-22",
  "/search": "2026-08-03",
  "/services": "2026-10-22",
  "/services/clogged-toilet": "2026-10-22",
  "/services/emergency-plumber": "2026-10-22",
  "/services/running-toilet": "2026-10-22",
  "/services/sewer-backup": "2026-10-22",
  "/services/toilet-install": "2026-10-22",
  "/services/toilet-leak": "2026-10-22",
  "/services/toilet-replacement": "2026-10-22",
  "/terms": "2026-10-22",
};

/** "2026-10-25" -> "October 25, 2026" (no timezone shift). */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}

export function pageUpdated(path: string): string | undefined {
  return PAGE_UPDATED[path];
}
