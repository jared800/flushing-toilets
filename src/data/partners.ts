export type PartnerTier = "connect" | "preferred" | "exclusive";

export type Partner = {
  id: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  tier: PartnerTier;
  stateSlug: string;
  citySlugs: string[];
  services: string[];
  license: string;
  responsePromise: string;
  /** Real reviews only. 0 means "none yet" and every surface hides the score. */
  rating: number;
  reviewCount: number;
  about: string;
};

/**
 * Real, signed partners only.
 *
 * This list was seeded by the original build with seven invented plumbing
 * companies carrying invented Texas licence numbers and @demo.flushingtoilets.com
 * addresses. Those rendered publicly on every city page next to a verified-licence
 * checkmark, which is a false licence claim about a business that does not exist.
 * They were removed 2026-08-05.
 *
 * Do not add an entry here as a placeholder, a "coming soon", or a company you
 * have researched but not yet spoken to. An entry means: the plumber has agreed
 * to receive leads, and every field below is their real, verified information.
 * `license` must be checked against the state licensing board, not against what
 * the company prints on its own website.
 *
 * Until this list has entries, every lead still reaches LEAD_FALLBACK_EMAIL, so
 * the site captures leads exactly as before — it simply does not claim to have
 * plumbers it has not signed.
 */
export const PARTNERS: Partner[] = [];

export const TIER_META: Record<
  PartnerTier,
  { name: string; badge: string; monthly: string; lead: string }
> = {
  connect: {
    name: "Connect",
    badge: "Shared",
    monthly: "$149–$249 / city",
    lead: "$28–$48 shared",
  },
  preferred: {
    name: "Preferred",
    badge: "Featured",
    monthly: "$349–$599 / city",
    lead: "$42–$72 priority",
  },
  exclusive: {
    name: "Exclusive",
    badge: "Territory",
    monthly: "$799–$1,999 / market",
    lead: "Allotment included",
  },
};

export function partnersForCity(stateSlug: string, citySlug: string) {
  return PARTNERS.filter(
    (p) => p.stateSlug === stateSlug && p.citySlugs.includes(citySlug),
  ).sort((a, b) => {
    const order = { exclusive: 0, preferred: 1, connect: 2 };
    return order[a.tier] - order[b.tier];
  });
}

export function getPartner(id: string) {
  return PARTNERS.find((p) => p.id === id);
}

export function getPartnerByEmail(email: string) {
  return PARTNERS.find(
    (p) => p.email.toLowerCase() === email.trim().toLowerCase(),
  );
}
