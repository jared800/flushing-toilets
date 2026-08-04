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

export const PARTNERS: Partner[] = [
  {
    id: "p-austin-flow",
    company: "Hill Country Flow Plumbing",
    contactName: "Marcus Hale",
    email: "marcus@demo.flushingtoilets.com",
    phone: "(512) 555-0142",
    tier: "preferred",
    stateSlug: "texas",
    citySlugs: ["austin", "plano"],
    services: [
      "clogged-toilet",
      "running-toilet",
      "toilet-leak",
      "toilet-install",
      "toilet-replacement",
      "emergency-plumber",
    ],
    license: "TX-MPL-44821",
    responsePromise: "Calls returned within 15 minutes during business hours",
    rating: 0,
    reviewCount: 0,
    about:
      "Family-owned Austin plumbing focused on toilet and drain emergencies with flat-rate options on common repairs.",
  },
  {
    id: "p-houston-rapid",
    company: "Bayou Rapid Plumbing",
    contactName: "Elena Ruiz",
    email: "elena@demo.flushingtoilets.com",
    phone: "(713) 555-0198",
    tier: "exclusive",
    stateSlug: "texas",
    citySlugs: ["houston"],
    services: [
      "clogged-toilet",
      "running-toilet",
      "toilet-leak",
      "emergency-plumber",
      "sewer-backup",
    ],
    license: "TX-MPL-39210",
    responsePromise: "Emergency dispatch goal under 60 minutes in core ZIPs",
    rating: 0,
    reviewCount: 0,
    about:
      "Houston emergency specialists for overflows, backups, and after-hours toilet failures.",
  },
  {
    id: "p-dallas-seal",
    company: "North Texas Seal Co.",
    contactName: "James Whit",
    email: "james@demo.flushingtoilets.com",
    phone: "(214) 555-0166",
    tier: "connect",
    stateSlug: "texas",
    citySlugs: ["dallas", "fort-worth", "arlington"],
    services: [
      "clogged-toilet",
      "running-toilet",
      "toilet-leak",
      "toilet-replacement",
    ],
    license: "TX-MPL-50112",
    responsePromise: "Same-day windows when booked before noon",
    rating: 0,
    reviewCount: 0,
    about:
      "DFW install and repair team known for clean job sites and clear quotes.",
  },
  {
    id: "p-miami-tide",
    company: "Tide Line Plumbing",
    contactName: "Sofia Mendes",
    email: "sofia@demo.flushingtoilets.com",
    phone: "(305) 555-0177",
    tier: "preferred",
    stateSlug: "florida",
    citySlugs: ["miami", "hialeah", "fort-lauderdale"],
    services: [
      "clogged-toilet",
      "toilet-leak",
      "emergency-plumber",
      "sewer-backup",
      "toilet-install",
    ],
    license: "FL-CFC-882134",
    responsePromise: "Live answer during posted hours; after-hours on-call",
    rating: 0,
    reviewCount: 0,
    about:
      "South Florida condo and home specialists for leaks, clogs, and sewer emergencies.",
  },
  {
    id: "p-tampa-gulf",
    company: "Gulf Drain Pros",
    contactName: "Chris Nolan",
    email: "chris@demo.flushingtoilets.com",
    phone: "(813) 555-0133",
    tier: "connect",
    stateSlug: "florida",
    citySlugs: ["tampa", "st-petersburg", "orlando"],
    services: [
      "clogged-toilet",
      "running-toilet",
      "toilet-replacement",
      "emergency-plumber",
    ],
    license: "FL-CFC-771902",
    responsePromise: "Quote by phone in under 10 minutes",
    rating: 0,
    reviewCount: 0,
    about:
      "Tampa Bay team for toilet replacement, running toilets, and emergency clogs.",
  },
  {
    id: "p-phoenix-desert",
    company: "Desert Fixture Plumbing",
    contactName: "Ava Chen",
    email: "ava@demo.flushingtoilets.com",
    phone: "(602) 555-0188",
    tier: "exclusive",
    stateSlug: "arizona",
    citySlugs: ["phoenix", "glendale", "peoria"],
    services: [
      "clogged-toilet",
      "running-toilet",
      "toilet-leak",
      "toilet-install",
      "toilet-replacement",
      "emergency-plumber",
      "sewer-backup",
    ],
    license: "AZ-ROC-329881",
    responsePromise: "Priority routing for Exclusive territory ZIPs",
    rating: 0,
    reviewCount: 0,
    about:
      "Phoenix-area Exclusive partner covering hard-water running toilets, installs, and emergencies.",
  },
  {
    id: "p-tucson-canyon",
    company: "Canyon Rim Plumbing",
    contactName: "Diego Santos",
    email: "diego@demo.flushingtoilets.com",
    phone: "(520) 555-0155",
    tier: "preferred",
    stateSlug: "arizona",
    citySlugs: ["tucson", "mesa", "chandler", "gilbert"],
    services: [
      "clogged-toilet",
      "running-toilet",
      "toilet-leak",
      "toilet-install",
      "emergency-plumber",
    ],
    license: "AZ-ROC-318440",
    responsePromise: "On-site windows same day when capacity allows",
    rating: 0,
    reviewCount: 0,
    about:
      "Southern Arizona Preferred partner for toilet problems and preventive replacements.",
  },
];

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
