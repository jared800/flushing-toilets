/**
 * Deep unique content for priority metros (Sprint C).
 * Houston + Miami get fully unique city + city×service copy.
 */
export type MetroServiceContent = {
  headline: string;
  intro: string;
  localFactors: string[];
  neighborhoods: string[];
  responseNote: string;
};

export type MetroContent = {
  stateSlug: string;
  citySlug: string;
  heroExtra: string;
  trustLine: string;
  localFactors: string[];
  neighborhoods: string[];
  services: Record<string, MetroServiceContent>;
};

export const METRO_CONTENT: MetroContent[] = [
  {
    stateSlug: "texas",
    citySlug: "houston",
    heroExtra:
      "Houston’s clay soil, slab foundations, and heavy rain weeks mean toilet seals, cleanouts, and main lines take real stress — especially inside the Loop and older bungalow belts.",
    trustLine:
      "Preferred emergency routing across core Houston ZIPs with licensed Texas plumbers.",
    localFactors: [
      "Expansive clay soil can shift slabs and stress drain lines",
      "Tropical storm weeks spike sewer backup and overflow calls",
      "Older bungalows often need flange and wax-ring attention",
      "Mixed municipal systems — know city vs. HOA cleanout rules",
    ],
    neighborhoods: [
      "Montrose",
      "The Heights",
      "River Oaks",
      "Midtown",
      "Energy Corridor",
      "Sugar Land (nearby)",
    ],
    services: {
      "clogged-toilet": {
        headline: "Clogged toilet help across Houston",
        intro:
          "From Montrose rentals to Energy Corridor family homes, Houston clogs range from simple paper jams to deeper line issues after storms. Local partners diagnose bowl vs. main before they snake.",
        localFactors: [
          "Post-storm debris and wipes are common culprits",
          "Shared walls in townhomes can mask the real source",
        ],
        neighborhoods: ["Montrose", "Heights", "Midtown", "Bellaire"],
        responseNote:
          "Emergency partners target under-60-minute dispatch goals in core ZIPs when capacity allows.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Houston",
        intro:
          "Humidity and mineral content wear flappers and fill valves faster than homeowners expect. A quiet runner can still spike the water bill in a week.",
        localFactors: [
          "Mineral film shortens flapper life",
          "Older tanks often need full fill-valve replacement",
        ],
        neighborhoods: ["West U", "Memorial", "Spring Branch"],
        responseNote: "Most running-toilet fixes are same-day when booked before noon.",
      },
      "toilet-leak": {
        headline: "Toilet leak repair in Houston",
        intro:
          "Slab-adjacent bathrooms and aging wax rings make base leaks a flooring emergency in Houston heat and humidity.",
        localFactors: [
          "Soft vinyl or cupped hardwood near the base is a red flag",
          "Supply-line corrosion is common on older angle stops",
        ],
        neighborhoods: ["River Oaks", "Museum District", "EaDo"],
        responseNote: "Leak calls are treated as high priority to protect subfloors.",
      },
      "toilet-install": {
        headline: "Toilet installation in Houston",
        intro:
          "New builds and remodels need correct rough-in, flange height, and leveling — especially on slabs that have shifted.",
        localFactors: [
          "Confirm 10\" vs 12\" rough-in before purchase",
          "Flange repairs are frequent on older slabs",
        ],
        neighborhoods: ["The Woodlands area", "Katy-adjacent", "Inner Loop"],
        responseNote: "Partners can often haul away the old fixture on install day.",
      },
      "toilet-replacement": {
        headline: "Toilet replacement in Houston",
        intro:
          "Chronic clogs on older low-flow models or cracked tanks are often cheaper as a clean replacement than repeat snake visits.",
        localFactors: [
          "Comfort-height models are popular for aging-in-place homes",
          "Hard-water staining may hide hairline cracks",
        ],
        neighborhoods: ["Memorial", "Heights", "Pearland-adjacent"],
        responseNote: "Ask about flange rebuilds before setting the new unit.",
      },
      "emergency-plumber": {
        headline: "Emergency toilet plumber in Houston",
        intro:
          "Active overflows and after-hours failures need someone who can stabilize the situation now — not a callback next week.",
        localFactors: [
          "Storm weeks overload schedules — submit early",
          "Shut off the supply valve if you can reach it safely",
        ],
        neighborhoods: ["Downtown", "Medical Center", "Galleria"],
        responseNote:
          "Exclusive/Preferred partners get first look on emergency leads in covered ZIPs.",
      },
      "sewer-backup": {
        headline: "Sewer backup help in Houston",
        intro:
          "When the toilet and tub back up together, treat it as a main-line issue. Houston storm systems and older clay laterals make this a frequent emergency.",
        localFactors: [
          "Multiple fixtures = stop using water house-wide",
          "Outdoor cleanouts may overflow during heavy rain",
        ],
        neighborhoods: ["East End", "Northside", "Southwest"],
        responseNote: "Camera inspection is often recommended after severe backups.",
      },
    },
  },
  {
    stateSlug: "florida",
    citySlug: "miami",
    heroExtra:
      "Miami condos, coastal humidity, and older supply lines make toilet leaks and emergency overflows a year-round problem — from Brickell towers to Coral Gables homes.",
    trustLine:
      "South Florida Preferred partners with condo experience and after-hours coverage.",
    localFactors: [
      "High-rise shutoff logistics and building access rules",
      "Salt air and humidity accelerate supply-line corrosion",
      "Older condos may have limited after-hours freight elevators",
      "Seasonal occupancy means clogs spike around holidays",
    ],
    neighborhoods: [
      "Brickell",
      "Coral Gables",
      "Coconut Grove",
      "Little Havana",
      "Miami Beach (nearby)",
      "Kendall (nearby)",
    ],
    services: {
      "clogged-toilet": {
        headline: "Clogged toilet service in Miami",
        intro:
          "Condo stacks and guest-heavy households create frequent clogs. Pros who know building access save hours versus a generalist who can’t get on property.",
        localFactors: [
          "Wipes and hospitality rentals drive repeat clogs",
          "Confirm building vendor requirements when applicable",
        ],
        neighborhoods: ["Brickell", "Downtown", "Edgewater"],
        responseNote: "Same-day windows common outside peak storm periods.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Miami",
        intro:
          "A running toilet in a condo still hits your bill — and can disturb neighbors. Most fixes are flapper, chain, or fill valve related.",
        localFactors: [
          "Hard water and mineral deposits shorten part life",
          "Quiet runners are easy to miss in large units",
        ],
        neighborhoods: ["Coral Gables", "Coconut Grove", "Key Biscayne-adjacent"],
        responseNote: "Often completed in a single short visit.",
      },
      "toilet-leak": {
        headline: "Toilet leak repair in Miami",
        intro:
          "Base leaks in condos can damage the unit below. Treat any water at the base as urgent and shut the supply if safe.",
        localFactors: [
          "Wax ring failures on aging flanges",
          "Corroded supply lines near humid baths",
        ],
        neighborhoods: ["Brickell", "Little Havana", "Coral Way"],
        responseNote: "Leak calls get priority routing to protect floors and neighbors.",
      },
      "toilet-install": {
        headline: "Toilet installation in Miami",
        intro:
          "Remodels and unit flips need code-aware installs, correct rough-in, and clean haul-away — especially in buildings with loading rules.",
        localFactors: [
          "Measure rough-in before ordering the fixture",
          "Coordinate freight elevator times in towers",
        ],
        neighborhoods: ["Design District-adjacent", "Coral Gables", "Downtown"],
        responseNote: "Partners familiar with condo rules reduce reschedule risk.",
      },
      "toilet-replacement": {
        headline: "Toilet replacement in Miami",
        intro:
          "Cracked bowls, chronic clogs, or inefficient older models are strong replacement candidates in humid coastal homes.",
        localFactors: [
          "Comfort height and dual-flush options are popular",
          "Check flange condition before setting the new toilet",
        ],
        neighborhoods: ["Coconut Grove", "South Miami-adjacent", "Brickell"],
        responseNote: "Haul-away is available with many partners.",
      },
      "emergency-plumber": {
        headline: "Emergency plumber for toilets in Miami",
        intro:
          "After-hours overflows in towers need fast callbacks and someone who can work with building access.",
        localFactors: [
          "After-hours security desk procedures matter",
          "Stop using other fixtures if a main backup is possible",
        ],
        neighborhoods: ["Brickell", "Downtown", "Miami Beach-adjacent"],
        responseNote: "Emergency leads trigger email + SMS stubs to Preferred partners.",
      },
      "sewer-backup": {
        headline: "Sewer backup help in Miami",
        intro:
          "Backups affecting multiple fixtures may involve building stacks or lateral lines — get a pro assessment before running more water.",
        localFactors: [
          "Condo stack issues can look like a single-unit clog",
          "Storm surge and heavy rain weeks increase call volume",
        ],
        neighborhoods: ["Little Havana", "Allapattah", "Coral Gables"],
        responseNote: "Critical urgency — partners may recommend camera inspection.",
      },
    },
  },

  {
    stateSlug: "texas",
    citySlug: "austin",
    heroExtra:
      "Austin’s mix of older central homes and fast-growing suburbs means constant demand for clogged toilets, flange repairs, and new installs in South Austin, East Austin, and the Domain corridor.",
    trustLine: "Preferred partners covering core Austin ZIPs with strong same-day capacity.",
    localFactors: [
      "Older central Austin flanges and wax rings fail often",
      "Student and short-term rentals spike clog calls",
      "Hard water deposits wear flappers and fill valves",
      "New construction still needs correct rough-in installs",
    ],
    neighborhoods: ["South Congress", "East Austin", "Hyde Park", "Mueller", "Domain area", "Round Rock-adjacent"],
    services: {
      "clogged-toilet": {
        headline: "Clogged toilet help in Austin",
        intro: "From Eastside bungalows to South Austin rentals, recurring clogs often need more than a plunger — partners diagnose bowl vs. line first.",
        localFactors: ["Rental turnover drives wipe-related clogs", "Older clay laterals in central neighborhoods"],
        neighborhoods: ["East Austin", "South Congress", "Hyde Park"],
        responseNote: "Same-day emergency windows common before late afternoon.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Austin",
        intro: "A quiet runner still racks up water costs in Austin summers. Most fixes are flapper or fill valve same-day jobs.",
        localFactors: ["Mineral film shortens flapper life", "Older tanks often need full fill-valve kits"],
        neighborhoods: ["Tarrytown", "Mueller", "North Loop"],
        responseNote: "Usually completed in a single short visit.",
      },
      "toilet-leak": {
        headline: "Toilet leak repair in Austin",
        intro: "Base leaks damage hardwood and slab-adjacent baths quickly. Treat any water at the base as urgent.",
        localFactors: ["Wax ring failures on aging flanges", "Soft floors near bathrooms in older homes"],
        neighborhoods: ["Hyde Park", "Travis Heights", "Zilker"],
        responseNote: "Leak calls get high-priority routing.",
      },
      "toilet-install": {
        headline: "Toilet installation in Austin",
        intro: "Remodels and ADUs need correct rough-in and leveling — partners who know 10\" vs 12\" rough-ins save callbacks.",
        localFactors: ["Confirm rough-in before purchase", "Haul-away common with install quotes"],
        neighborhoods: ["East Austin", "South Lamar", "Domain area"],
        responseNote: "Many installs complete in half a day.",
      },
      "toilet-replacement": {
        headline: "Toilet replacement in Austin",
        intro: "Chronic clogs or cracked tanks are often cheaper as a clean replacement than repeat service calls.",
        localFactors: ["Comfort-height models popular", "Check flange before setting the new unit"],
        neighborhoods: ["Allandale", "Crestview", "South Congress"],
        responseNote: "Ask about flange rebuilds up front.",
      },
      "emergency-plumber": {
        headline: "Emergency toilet plumber in Austin",
        intro: "Overflows at night and weekend failures need fast callbacks — set urgency to Emergency for priority routing.",
        localFactors: ["Shut off supply if safe", "Avoid other fixtures if a main backup is possible"],
        neighborhoods: ["Downtown", "South Congress", "East Austin"],
        responseNote: "Emergency leads trigger email + SMS stubs to partners.",
      },
      "sewer-backup": {
        headline: "Sewer backup help in Austin",
        intro: "Multi-fixture backups point to a main-line issue. Stop water use and get a local pro assessment.",
        localFactors: ["Older laterals in central Austin", "Roots after wet seasons"],
        neighborhoods: ["Hyde Park", "Clarksville", "East Cesar Chavez"],
        responseNote: "Camera inspection often recommended after severe backups.",
      },
    },
  },
  {
    stateSlug: "texas",
    citySlug: "dallas",
    heroExtra:
      "Dallas spans mid-century homes, high-rise condos, and sprawling suburbs — toilet failures, install work, and after-hours emergencies stay busy year-round.",
    trustLine: "Connect and Preferred partners across core DFW corridors.",
    localFactors: [
      "Condo building access rules slow unprepared techs",
      "Clay soil movement stresses drain lines",
      "Suburban growth drives install and replacement volume",
      "Summer peak strain on emergency capacity",
    ],
    neighborhoods: ["Uptown", "Lakewood", "Oak Cliff", "Park Cities", "Deep Ellum", "Plano-adjacent"],
    services: {
      "clogged-toilet": {
        headline: "Clogged toilet service in Dallas",
        intro: "From Uptown condos to Oak Cliff homes, partners clear clogs and determine if the issue is fixture-level or deeper.",
        localFactors: ["Wipes in rentals are common", "Shared stacks in multifamily"],
        neighborhoods: ["Uptown", "Oak Cliff", "Lakewood"],
        responseNote: "Same-day slots when booked early.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Dallas",
        intro: "Running toilets waste water fast in large DFW homes. Quick part swaps usually solve it.",
        localFactors: ["Hard water deposits", "Aging fill valves on 90s homes"],
        neighborhoods: ["Park Cities", "Lake Highlands", "Richardson-adjacent"],
        responseNote: "Often a short scheduled visit.",
      },
      "toilet-leak": {
        headline: "Toilet leak repair in Dallas",
        intro: "Base and supply leaks can ruin floors — especially on upper condo levels.",
        localFactors: ["Wax ring and flange issues", "Corroded angle stops"],
        neighborhoods: ["Uptown", "Deep Ellum", "East Dallas"],
        responseNote: "High priority to protect property below.",
      },
      "toilet-install": {
        headline: "Toilet installation in Dallas",
        intro: "New builds and remodels need pro installs with correct seals and leveling.",
        localFactors: ["Rough-in verification", "Condo freight timing"],
        neighborhoods: ["Design District-adjacent", "Oak Lawn", "Plano-adjacent"],
        responseNote: "Haul-away available with many partners.",
      },
      "toilet-replacement": {
        headline: "Toilet replacement in Dallas",
        intro: "Replacing inefficient or cracked toilets often ends years of repeat clog calls.",
        localFactors: ["Comfort height demand", "Flange inspection first"],
        neighborhoods: ["Lakewood", "Preston Hollow-adjacent", "Oak Cliff"],
        responseNote: "Quotes typically include labor + basic seal kit.",
      },
      "emergency-plumber": {
        headline: "Emergency plumber in Dallas",
        intro: "After-hours overflows need partners who answer the phone — use Emergency urgency for priority.",
        localFactors: ["Peak storm weeks fill schedules", "Shut off the valve if reachable"],
        neighborhoods: ["Downtown", "Uptown", "Medical District"],
        responseNote: "SMS + email stubs fire for emergency leads.",
      },
      "sewer-backup": {
        headline: "Sewer backup help in Dallas",
        intro: "When multiple fixtures back up, treat it as a main-line emergency and stop running water.",
        localFactors: ["Roots and grease in older laterals", "Outdoor cleanout checks"],
        neighborhoods: ["East Dallas", "Oak Cliff", "Pleasant Grove-adjacent"],
        responseNote: "May recommend camera inspection after clearing.",
      },
    },
  },
  {
    stateSlug: "arizona",
    citySlug: "phoenix",
    heroExtra:
      "Phoenix hard water and extreme heat put constant stress on flappers, fill valves, and seals across a huge metro service area.",
    trustLine: "Exclusive partner coverage on core Phoenix ZIPs with full service menu.",
    localFactors: [
      "Hard water shortens flapper and valve life",
      "Desert heat expands/contracts supply lines",
      "Large geography — ZIP routing matters",
      "New construction install volume remains high",
    ],
    neighborhoods: ["Central Phoenix", "Arcadia", "Biltmore", "Ahwatukee", "Scottsdale-adjacent", "Glendale-adjacent"],
    services: {
      "clogged-toilet": {
        headline: "Clogged toilet help in Phoenix",
        intro: "High household volume and hard-water scale make clogs a daily call type across Phoenix.",
        localFactors: ["Scale narrows passages over time", "Rental turnover spikes"],
        neighborhoods: ["Central Phoenix", "Ahwatukee", "Arcadia"],
        responseNote: "Exclusive partner prioritizes covered ZIPs.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Phoenix",
        intro: "Hard water is the #1 reason Phoenix toilets never fully shut off. Part replacement is usually quick.",
        localFactors: ["Mineral film on flappers", "Fill valves wear early"],
        neighborhoods: ["Biltmore", "North Phoenix", "Desert Ridge-adjacent"],
        responseNote: "Same-day fixes common.",
      },
      "toilet-leak": {
        headline: "Toilet leak repair in Phoenix",
        intro: "Base leaks and supply drips waste water and damage floors in dry heat that hides moisture until it’s worse.",
        localFactors: ["Wax ring failures", "Brittle supply lines"],
        neighborhoods: ["Central Phoenix", "Arcadia", "Maryvale-adjacent"],
        responseNote: "Leak calls prioritized to protect flooring.",
      },
      "toilet-install": {
        headline: "Toilet installation in Phoenix",
        intro: "New homes and remodels need correct seals against hard-water conditions and proper flange height.",
        localFactors: ["Rough-in checks", "Haul-away options"],
        neighborhoods: ["North Phoenix", "Ahwatukee", "Laveen-adjacent"],
        responseNote: "Installs often same-week.",
      },
      "toilet-replacement": {
        headline: "Toilet replacement in Phoenix",
        intro: "Replacing scale-damaged older toilets often ends chronic running and clog issues.",
        localFactors: ["Hard-water staining can hide cracks", "Comfort height popular"],
        neighborhoods: ["Biltmore", "Central Phoenix", "Glendale-adjacent"],
        responseNote: "Flange inspection before set.",
      },
      "emergency-plumber": {
        headline: "Emergency toilet plumber in Phoenix",
        intro: "Summer overflows and after-hours failures need fast routing across a large metro.",
        localFactors: ["Peak heat weeks are busiest", "Shut off supply if safe"],
        neighborhoods: ["Downtown", "Central Phoenix", "Airport area"],
        responseNote: "Emergency SMS stubs included.",
      },
      "sewer-backup": {
        headline: "Sewer backup help in Phoenix",
        intro: "Multi-fixture backups need main-line assessment — stop water use house-wide.",
        localFactors: ["Grease and roots", "Cleanout access varies by subdivision"],
        neighborhoods: ["South Phoenix", "Central", "West Valley-adjacent"],
        responseNote: "Camera inspection may follow clearing.",
      },
    },
  },
  {
    stateSlug: "florida",
    citySlug: "tampa",
    heroExtra:
      "Tampa Bay humidity, older bungalows, and storm seasons drive toilet leaks, clogs, and sewer calls across South Tampa, Seminole Heights, and nearby suburbs.",
    trustLine: "Connect partners with strong Tampa Bay coverage and emergency options.",
    localFactors: [
      "Humidity accelerates supply-line corrosion",
      "Storm weeks spike backup calls",
      "Older bungalow flanges need attention",
      "Condo and rental mix in core neighborhoods",
    ],
    neighborhoods: ["South Tampa", "Seminole Heights", "Hyde Park", "Ybor", "Westchase-adjacent", "St. Pete-adjacent"],
    services: {
      "clogged-toilet": {
        headline: "Clogged toilet service in Tampa",
        intro: "Bay-area homes and rentals see frequent clogs — partners clear and check for deeper line issues after storms.",
        localFactors: ["Wipes and guest volume", "Post-storm debris"],
        neighborhoods: ["South Tampa", "Seminole Heights", "Ybor"],
        responseNote: "Same-day windows when capacity allows.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Tampa",
        intro: "Humidity and mineral content wear tank parts. A short visit usually stops the run.",
        localFactors: ["Flapper wear", "Fill valve failures"],
        neighborhoods: ["Hyde Park", "South Tampa", "Carrollwood-adjacent"],
        responseNote: "Often completed same day.",
      },
      "toilet-leak": {
        headline: "Toilet leak repair in Tampa",
        intro: "Base leaks in humid climates damage subfloors fast — treat standing water as urgent.",
        localFactors: ["Wax ring failures", "Corroded supplies"],
        neighborhoods: ["Seminole Heights", "Hyde Park", "Davis Islands-adjacent"],
        responseNote: "Priority routing for active leaks.",
      },
      "toilet-install": {
        headline: "Toilet installation in Tampa",
        intro: "Remodels and storm repairs need clean installs with proper seals against humidity.",
        localFactors: ["Rough-in verification", "Haul-away common"],
        neighborhoods: ["South Tampa", "Westchase-adjacent", "New Tampa-adjacent"],
        responseNote: "Schedule around building access when needed.",
      },
      "toilet-replacement": {
        headline: "Toilet replacement in Tampa",
        intro: "Replacing cracked or inefficient toilets ends repeat service visits in rental-heavy areas.",
        localFactors: ["Comfort height demand", "Flange checks"],
        neighborhoods: ["Ybor", "Seminole Heights", "South Tampa"],
        responseNote: "Quotes include labor + standard seal kit.",
      },
      "emergency-plumber": {
        headline: "Emergency plumber in Tampa",
        intro: "Storm weeks and after-hours overflows need partners who can stabilize fast.",
        localFactors: ["Stop other water use if main backup suspected", "Supply shutoff first step"],
        neighborhoods: ["Downtown", "South Tampa", "Channelside"],
        responseNote: "Emergency leads send email + SMS stubs.",
      },
      "sewer-backup": {
        headline: "Sewer backup help in Tampa",
        intro: "Multi-fixture backups after heavy rain need main-line help — don’t keep flushing.",
        localFactors: ["Storm surcharge risk", "Cleanout checks"],
        neighborhoods: ["South Tampa", "East Tampa", "Westshore-adjacent"],
        responseNote: "Camera inspection may be advised after clear.",
      },
    },
  },
];

export function getMetroContent(stateSlug: string, citySlug: string) {
  return METRO_CONTENT.find(
    (m) => m.stateSlug === stateSlug && m.citySlug === citySlug,
  );
}

export function getMetroServiceContent(
  stateSlug: string,
  citySlug: string,
  serviceSlug: string,
) {
  const metro = getMetroContent(stateSlug, citySlug);
  if (!metro) return undefined;
  return metro.services[serviceSlug];
}

/**
 * Does this city have hand-written local content, or is it a template fill?
 *
 * Only six metros have genuinely unique copy. The other 24 cities render the
 * same paragraphs with the city name swapped — two sampled pages measured 72.8%
 * identical at ~550 words each. Indexing 168 near-duplicates invites Google to
 * treat the whole /locations/ subfolder as thin and drags the six good metros
 * down with it, so the templated pages are noindexed and kept out of the
 * sitemap until real content is written for them.
 *
 * A city graduates simply by getting an entry in METRO_CONTENT above — nothing
 * else to remember, and the sitemap picks it up on the next build.
 */
export function hasUniqueLocalContent(stateSlug: string, citySlug: string) {
  return Boolean(getMetroContent(stateSlug, citySlug));
}
