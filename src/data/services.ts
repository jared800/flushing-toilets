export type Service = {
  slug: string;
  name: string;
  shortName: string;
  urgency: "medium" | "high" | "critical";
  summary: string;
  symptoms: string[];
  whatWeDo: string[];
  seoBlurb: string;
};

export const SERVICES: Service[] = [
  {
    slug: "clogged-toilet",
    name: "Clogged toilet",
    shortName: "Clogged",
    urgency: "high",
    summary:
      "When a toilet won’t drain, overflows, or backs up, you need a local plumber who can clear the clog without wrecking the fixture.",
    symptoms: [
      "Water rises or overflows when you flush",
      "Gurgling sounds in the bowl or nearby drains",
      "Multiple fixtures draining slowly",
      "Plunger isn’t fixing it",
    ],
    whatWeDo: [
      "Diagnose bowl vs. line clog",
      "Auger / snaking as needed",
      "Check for wax ring or flange issues",
      "Advise if sewer line work is needed",
    ],
    seoBlurb:
      "Fast local help for clogged toilets — matched to licensed plumbers near you.",
  },
  {
    slug: "running-toilet",
    name: "Running toilet",
    shortName: "Running",
    urgency: "medium",
    summary:
      "A toilet that never stops running wastes water and money. Most fixes are quick for a pro who knows your fill valve and flapper setup.",
    symptoms: [
      "Constant hissing or running water",
      "Tank refills on its own",
      "Higher water bill",
      "Handle needs jiggling to stop",
    ],
    whatWeDo: [
      "Inspect flapper, chain, and fill valve",
      "Replace worn parts",
      "Adjust water level",
      "Check for silent leaks",
    ],
    seoBlurb:
      "Stop a running toilet for good with a licensed local plumber.",
  },
  {
    slug: "toilet-leak",
    name: "Toilet leak",
    shortName: "Leak",
    urgency: "high",
    summary:
      "Leaks at the base, tank, or supply line can damage floors fast. Get a plumber before water reaches subflooring.",
    symptoms: [
      "Water around the base after flushing",
      "Damp flooring or soft vinyl",
      "Drips from the supply line or tank bolts",
      "Musty smell near the bathroom",
    ],
    whatWeDo: [
      "Locate leak source",
      "Replace wax ring / seal",
      "Tighten or replace supply line",
      "Repair tank-to-bowl issues",
    ],
    seoBlurb:
      "Toilet leaking? Local licensed plumbers for fast diagnosis and repair.",
  },
  {
    slug: "toilet-install",
    name: "Toilet install",
    shortName: "Install",
    urgency: "medium",
    summary:
      "New construction, remodel, or adding a powder room — proper install protects your floors and keeps the seal right the first time.",
    symptoms: [
      "New home or remodel ready for fixture",
      "Rough-in measured",
      "Need code-compliant install",
      "Want a quiet, efficient model set correctly",
    ],
    whatWeDo: [
      "Confirm rough-in and clearance",
      "Set flange and seal correctly",
      "Connect supply and test",
      "Haul-away options with many partners",
    ],
    seoBlurb:
      "Professional toilet installation by licensed local plumbers.",
  },
  {
    slug: "toilet-replacement",
    name: "Toilet replacement",
    shortName: "Replace",
    urgency: "medium",
    summary:
      "Cracked bowls, inefficient older models, or constant repairs — replacement is often cheaper long-term.",
    symptoms: [
      "Cracks in bowl or tank",
      "Chronic clogs on an old fixture",
      "Want water-saving model",
      "Loose or rocking toilet",
    ],
    whatWeDo: [
      "Safe removal of old toilet",
      "Flange inspection / repair",
      "Install and level new unit",
      "Full leak test",
    ],
    seoBlurb:
      "Toilet replacement quotes from licensed plumbers in your city.",
  },
  {
    slug: "emergency-plumber",
    name: "Emergency plumber",
    shortName: "Emergency",
    urgency: "critical",
    summary:
      "Overflowing toilets, active leaks, and after-hours backups need someone who can respond now — not next week.",
    symptoms: [
      "Active overflow or flooding",
      "No working toilet in the home",
      "After-hours or weekend emergency",
      "Water won’t shut off fully",
    ],
    whatWeDo: [
      "Priority dispatch with partner network",
      "Stabilize the situation",
      "Clear clogs / stop leaks",
      "Outline next steps if larger repair needed",
    ],
    seoBlurb:
      "Emergency toilet and drain plumbers near you — day or night.",
  },
  {
    slug: "sewer-backup",
    name: "Sewer backup",
    shortName: "Sewer",
    urgency: "critical",
    summary:
      "Sewer backups are a health and property emergency. Multiple drains backing up usually means a main line issue.",
    symptoms: [
      "Toilet and tub backing up together",
      "Sewage smell from drains",
      "Water coming up floor drains",
      "Yard cleanout overflowing",
    ],
    whatWeDo: [
      "Assess main vs. fixture issue",
      "Snake or hydro-jet as appropriate",
      "Camera inspection when needed",
      "Coordinate larger line repairs",
    ],
    seoBlurb:
      "Sewer backup help from licensed local plumbers — fast response.",
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function urgencyLabel(u: Service["urgency"]) {
  if (u === "critical") return "Critical";
  if (u === "high") return "High";
  return "Standard";
}
