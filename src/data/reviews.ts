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

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Megan T.",
    rating: 5,
    text: "Overflowing toilet on a Sunday — partner called in 10 minutes and had us back to normal that afternoon.",
    serviceSlug: "clogged-toilet",
    citySlug: "austin",
    stateSlug: "texas",
    dateLabel: "Jul 2026",
  },
  {
    id: "r2",
    author: "Carlos R.",
    rating: 5,
    text: "Running toilet was wasting a ton of water. Quick flapper/fill valve fix, fair price.",
    serviceSlug: "running-toilet",
    citySlug: "austin",
    stateSlug: "texas",
    dateLabel: "Jun 2026",
  },
  {
    id: "r3",
    author: "Priya S.",
    rating: 5,
    text: "Houston storm week backup. They explained main vs. fixture clearly and got the line cleared.",
    serviceSlug: "sewer-backup",
    citySlug: "houston",
    stateSlug: "texas",
    dateLabel: "May 2026",
  },
  {
    id: "r4",
    author: "Derek L.",
    rating: 4,
    text: "Same-day clog service in Montrose. Communicated ETA well.",
    serviceSlug: "clogged-toilet",
    citySlug: "houston",
    stateSlug: "texas",
    dateLabel: "Jul 2026",
  },
  {
    id: "r5",
    author: "Ana M.",
    rating: 5,
    text: "Condo leak at the base — wax ring and supply line done cleanly, no mess left behind.",
    serviceSlug: "toilet-leak",
    citySlug: "miami",
    stateSlug: "florida",
    dateLabel: "Jun 2026",
  },
  {
    id: "r6",
    author: "Jon H.",
    rating: 5,
    text: "Emergency after-hours in Brickell. Fast callback, stopped the overflow.",
    serviceSlug: "emergency-plumber",
    citySlug: "miami",
    stateSlug: "florida",
    dateLabel: "Apr 2026",
  },
  {
    id: "r7",
    author: "Elena V.",
    rating: 5,
    text: "Hard-water running toilet in Phoenix fixed the first visit.",
    serviceSlug: "running-toilet",
    citySlug: "phoenix",
    stateSlug: "arizona",
    dateLabel: "Jul 2026",
  },
  {
    id: "r8",
    author: "Marcus W.",
    rating: 4,
    text: "Replacement quote was clear; install scheduled within two days.",
    serviceSlug: "toilet-replacement",
    citySlug: "dallas",
    stateSlug: "texas",
    dateLabel: "May 2026",
  },
  {
    id: "r9",
    author: "Sofia G.",
    rating: 5,
    text: "Tampa clog that kept coming back — they found the deeper line issue.",
    serviceSlug: "clogged-toilet",
    citySlug: "tampa",
    stateSlug: "florida",
    dateLabel: "Jun 2026",
  },
  {
    id: "r10",
    author: "Nate B.",
    rating: 5,
    text: "Scottsdale install for a comfort-height model — leveled perfectly.",
    serviceSlug: "toilet-install",
    citySlug: "scottsdale",
    stateSlug: "arizona",
    dateLabel: "Mar 2026",
  },
];

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

export function cityTrustScore(stateSlug: string, citySlug: string) {
  const list = reviewsForCity(stateSlug, citySlug);
  if (!list.length) {
    return { rating: 4.8, count: 0, label: "Network average" };
  }
  const rating =
    list.reduce((sum, r) => sum + r.rating, 0) / list.length;
  return {
    rating: Math.round(rating * 10) / 10,
    count: list.length,
    label: `${list.length} local review${list.length === 1 ? "" : "s"}`,
  };
}
