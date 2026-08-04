export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  serviceSlug: string;
  citySlug: string;
  stateSlug: string;
  dateLabel: string;
};

/**
 * EMPTY ON PURPOSE.
 *
 * This file previously held invented customer testimonials for a business that
 * had served no customers. Publishing fabricated consumer reviews is deceptive
 * under the FTC's rule on consumer reviews and testimonials (16 CFR Part 465,
 * effective October 2024), which carries civil penalties per violation.
 *
 * Only add entries here for reviews a real customer actually left, with their
 * permission. Every surface below degrades gracefully when this list is empty.
 */
export const REVIEWS: Review[] = [];

export function reviewsForCity(stateSlug: string, citySlug: string) {
  return REVIEWS.filter(
    (r) => r.stateSlug === stateSlug && r.citySlug === citySlug,
  );
}

export function reviewsForCityService(
  stateSlug: string,
  citySlug: string,
  serviceSlug: string,
) {
  const exact = REVIEWS.filter(
    (r) =>
      r.stateSlug === stateSlug &&
      r.citySlug === citySlug &&
      r.serviceSlug === serviceSlug,
  );
  if (exact.length) return exact;
  return reviewsForCity(stateSlug, citySlug).slice(0, 3);
}

/** Null when there is nothing real to average — never invent a rating. */
export function cityTrustScore(stateSlug: string, citySlug: string) {
  const list = reviewsForCity(stateSlug, citySlug);
  if (!list.length) return null;
  const rating =
    list.reduce((sum, r) => sum + r.rating, 0) / list.length;
  return {
    rating: Math.round(rating * 10) / 10,
    count: list.length,
    label: `${list.length} local review${list.length === 1 ? "" : "s"}`,
  };
}
