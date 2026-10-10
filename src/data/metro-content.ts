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
      "Requests from Houston ZIPs go to an independent, licensed Texas plumber who covers your area.",
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
        responseNote: "Stop flushing after one failed attempt — a second flush is what overflows the bowl.",
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
        responseNote: "Do the dye test first: a few drops of food colouring in the tank tells you flapper vs. fill valve.",
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
        responseNote: "Turn the supply valve behind the toilet clockwise to stop a leak while you wait.",
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
        responseNote: "Measure the rough-in (wall to bolt centre, usually 12 in.) before buying a new toilet.",
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
        responseNote: "Ask whether the quote includes a new wax ring, closet bolts, supply line and haul-away.",
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
        responseNote: "If water is still running, shut the valve behind the toilet or the house main before anything else.",
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
        responseNote: "If more than one drain is backing up, stop using water everywhere in the house until it is cleared.",
      },
    },
  },
  {
    stateSlug: "florida",
    citySlug: "miami",
    heroExtra:
      "Miami condos, coastal humidity, and older supply lines make toilet leaks and emergency overflows a year-round problem — from Brickell towers to Coral Gables homes.",
    trustLine:
      "Requests from Miami ZIPs go to an independent, licensed Florida plumber who covers your area.",
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
        responseNote: "Stop flushing after one failed attempt — a second flush is what overflows the bowl.",
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
        responseNote: "Do the dye test first: a few drops of food colouring in the tank tells you flapper vs. fill valve.",
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
        responseNote: "Turn the supply valve behind the toilet clockwise to stop a leak while you wait.",
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
        responseNote: "Measure the rough-in (wall to bolt centre, usually 12 in.) before buying a new toilet.",
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
        responseNote: "Ask whether the quote includes a new wax ring, closet bolts, supply line and haul-away.",
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
        responseNote: "If water is still running, shut the valve behind the toilet or the house main before anything else.",
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
        responseNote: "If more than one drain is backing up, stop using water everywhere in the house until it is cleared.",
      },
    },
  },

  {
    stateSlug: "texas",
    citySlug: "austin",
    heroExtra:
      "Austin’s mix of older central homes and fast-growing suburbs means constant demand for clogged toilets, flange repairs, and new installs in South Austin, East Austin, and the Domain corridor.",
    trustLine: "Requests from Austin ZIPs go to an independent, licensed Texas plumber who covers your area.",
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
        responseNote: "Stop flushing after one failed attempt — a second flush is what overflows the bowl.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Austin",
        intro: "A quiet runner still racks up water costs in Austin summers. Most fixes are flapper or fill valve same-day jobs.",
        localFactors: ["Mineral film shortens flapper life", "Older tanks often need full fill-valve kits"],
        neighborhoods: ["Tarrytown", "Mueller", "North Loop"],
        responseNote: "Do the dye test first: a few drops of food colouring in the tank tells you flapper vs. fill valve.",
      },
      "toilet-leak": {
        headline: "Toilet leak repair in Austin",
        intro: "Base leaks damage hardwood and slab-adjacent baths quickly. Treat any water at the base as urgent.",
        localFactors: ["Wax ring failures on aging flanges", "Soft floors near bathrooms in older homes"],
        neighborhoods: ["Hyde Park", "Travis Heights", "Zilker"],
        responseNote: "Turn the supply valve behind the toilet clockwise to stop a leak while you wait.",
      },
      "toilet-install": {
        headline: "Toilet installation in Austin",
        intro: "Remodels and ADUs need correct rough-in and leveling — partners who know 10\" vs 12\" rough-ins save callbacks.",
        localFactors: ["Confirm rough-in before purchase", "Haul-away common with install quotes"],
        neighborhoods: ["East Austin", "South Lamar", "Domain area"],
        responseNote: "Measure the rough-in (wall to bolt centre, usually 12 in.) before buying a new toilet.",
      },
      "toilet-replacement": {
        headline: "Toilet replacement in Austin",
        intro: "Chronic clogs or cracked tanks are often cheaper as a clean replacement than repeat service calls.",
        localFactors: ["Comfort-height models popular", "Check flange before setting the new unit"],
        neighborhoods: ["Allandale", "Crestview", "South Congress"],
        responseNote: "Ask whether the quote includes a new wax ring, closet bolts, supply line and haul-away.",
      },
      "emergency-plumber": {
        headline: "Emergency toilet plumber in Austin",
        intro: "Overflows at night and weekend failures need fast callbacks — set urgency to Emergency for priority routing.",
        localFactors: ["Shut off supply if safe", "Avoid other fixtures if a main backup is possible"],
        neighborhoods: ["Downtown", "South Congress", "East Austin"],
        responseNote: "If water is still running, shut the valve behind the toilet or the house main before anything else.",
      },
      "sewer-backup": {
        headline: "Sewer backup help in Austin",
        intro: "Multi-fixture backups point to a main-line issue. Stop water use and get a local pro assessment.",
        localFactors: ["Older laterals in central Austin", "Roots after wet seasons"],
        neighborhoods: ["Hyde Park", "Clarksville", "East Cesar Chavez"],
        responseNote: "If more than one drain is backing up, stop using water everywhere in the house until it is cleared.",
      },
    },
  },
  {
    stateSlug: "texas",
    citySlug: "dallas",
    heroExtra:
      "Dallas spans mid-century homes, high-rise condos, and sprawling suburbs — toilet failures, install work, and after-hours emergencies stay busy year-round.",
    trustLine: "Requests from Dallas ZIPs go to an independent, licensed Texas plumber who covers your area.",
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
        responseNote: "Stop flushing after one failed attempt — a second flush is what overflows the bowl.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Dallas",
        intro: "Running toilets waste water fast in large DFW homes. Quick part swaps usually solve it.",
        localFactors: ["Hard water deposits", "Aging fill valves on 90s homes"],
        neighborhoods: ["Park Cities", "Lake Highlands", "Richardson-adjacent"],
        responseNote: "Do the dye test first: a few drops of food colouring in the tank tells you flapper vs. fill valve.",
      },
      "toilet-leak": {
        headline: "Toilet leak repair in Dallas",
        intro: "Base and supply leaks can ruin floors — especially on upper condo levels.",
        localFactors: ["Wax ring and flange issues", "Corroded angle stops"],
        neighborhoods: ["Uptown", "Deep Ellum", "East Dallas"],
        responseNote: "Turn the supply valve behind the toilet clockwise to stop a leak while you wait.",
      },
      "toilet-install": {
        headline: "Toilet installation in Dallas",
        intro: "New builds and remodels need pro installs with correct seals and leveling.",
        localFactors: ["Rough-in verification", "Condo freight timing"],
        neighborhoods: ["Design District-adjacent", "Oak Lawn", "Plano-adjacent"],
        responseNote: "Measure the rough-in (wall to bolt centre, usually 12 in.) before buying a new toilet.",
      },
      "toilet-replacement": {
        headline: "Toilet replacement in Dallas",
        intro: "Replacing inefficient or cracked toilets often ends years of repeat clog calls.",
        localFactors: ["Comfort height demand", "Flange inspection first"],
        neighborhoods: ["Lakewood", "Preston Hollow-adjacent", "Oak Cliff"],
        responseNote: "Ask whether the quote includes a new wax ring, closet bolts, supply line and haul-away.",
      },
      "emergency-plumber": {
        headline: "Emergency plumber in Dallas",
        intro: "After-hours overflows need partners who answer the phone — use Emergency urgency for priority.",
        localFactors: ["Peak storm weeks fill schedules", "Shut off the valve if reachable"],
        neighborhoods: ["Downtown", "Uptown", "Medical District"],
        responseNote: "If water is still running, shut the valve behind the toilet or the house main before anything else.",
      },
      "sewer-backup": {
        headline: "Sewer backup help in Dallas",
        intro: "When multiple fixtures back up, treat it as a main-line emergency and stop running water.",
        localFactors: ["Roots and grease in older laterals", "Outdoor cleanout checks"],
        neighborhoods: ["East Dallas", "Oak Cliff", "Pleasant Grove-adjacent"],
        responseNote: "If more than one drain is backing up, stop using water everywhere in the house until it is cleared.",
      },
    },
  },
  {
    stateSlug: "arizona",
    citySlug: "phoenix",
    heroExtra:
      "Phoenix hard water and extreme heat put constant stress on flappers, fill valves, and seals across a huge metro service area.",
    trustLine: "Requests from Phoenix ZIPs go to an independent, licensed Arizona plumber who covers your area.",
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
        responseNote: "Stop flushing after one failed attempt — a second flush is what overflows the bowl.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Phoenix",
        intro: "Hard water is the #1 reason Phoenix toilets never fully shut off. Part replacement is usually quick.",
        localFactors: ["Mineral film on flappers", "Fill valves wear early"],
        neighborhoods: ["Biltmore", "North Phoenix", "Desert Ridge-adjacent"],
        responseNote: "Do the dye test first: a few drops of food colouring in the tank tells you flapper vs. fill valve.",
      },
      "toilet-leak": {
        headline: "Toilet leak repair in Phoenix",
        intro: "Base leaks and supply drips waste water and damage floors in dry heat that hides moisture until it’s worse.",
        localFactors: ["Wax ring failures", "Brittle supply lines"],
        neighborhoods: ["Central Phoenix", "Arcadia", "Maryvale-adjacent"],
        responseNote: "Turn the supply valve behind the toilet clockwise to stop a leak while you wait.",
      },
      "toilet-install": {
        headline: "Toilet installation in Phoenix",
        intro: "New homes and remodels need correct seals against hard-water conditions and proper flange height.",
        localFactors: ["Rough-in checks", "Haul-away options"],
        neighborhoods: ["North Phoenix", "Ahwatukee", "Laveen-adjacent"],
        responseNote: "Measure the rough-in (wall to bolt centre, usually 12 in.) before buying a new toilet.",
      },
      "toilet-replacement": {
        headline: "Toilet replacement in Phoenix",
        intro: "Replacing scale-damaged older toilets often ends chronic running and clog issues.",
        localFactors: ["Hard-water staining can hide cracks", "Comfort height popular"],
        neighborhoods: ["Biltmore", "Central Phoenix", "Glendale-adjacent"],
        responseNote: "Ask whether the quote includes a new wax ring, closet bolts, supply line and haul-away.",
      },
      "emergency-plumber": {
        headline: "Emergency toilet plumber in Phoenix",
        intro: "Summer overflows and after-hours failures need fast routing across a large metro.",
        localFactors: ["Peak heat weeks are busiest", "Shut off supply if safe"],
        neighborhoods: ["Downtown", "Central Phoenix", "Airport area"],
        responseNote: "If water is still running, shut the valve behind the toilet or the house main before anything else.",
      },
      "sewer-backup": {
        headline: "Sewer backup help in Phoenix",
        intro: "Multi-fixture backups need main-line assessment — stop water use house-wide.",
        localFactors: ["Grease and roots", "Cleanout access varies by subdivision"],
        neighborhoods: ["South Phoenix", "Central", "West Valley-adjacent"],
        responseNote: "If more than one drain is backing up, stop using water everywhere in the house until it is cleared.",
      },
    },
  },
  {
    stateSlug: "florida",
    citySlug: "tampa",
    heroExtra:
      "Tampa Bay humidity, older bungalows, and storm seasons drive toilet leaks, clogs, and sewer calls across South Tampa, Seminole Heights, and nearby suburbs.",
    trustLine: "Requests from Tampa ZIPs go to an independent, licensed Florida plumber who covers your area.",
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
        responseNote: "Stop flushing after one failed attempt — a second flush is what overflows the bowl.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Tampa",
        intro: "Humidity and mineral content wear tank parts. A short visit usually stops the run.",
        localFactors: ["Flapper wear", "Fill valve failures"],
        neighborhoods: ["Hyde Park", "South Tampa", "Carrollwood-adjacent"],
        responseNote: "Do the dye test first: a few drops of food colouring in the tank tells you flapper vs. fill valve.",
      },
      "toilet-leak": {
        headline: "Toilet leak repair in Tampa",
        intro: "Base leaks in humid climates damage subfloors fast — treat standing water as urgent.",
        localFactors: ["Wax ring failures", "Corroded supplies"],
        neighborhoods: ["Seminole Heights", "Hyde Park", "Davis Islands-adjacent"],
        responseNote: "Turn the supply valve behind the toilet clockwise to stop a leak while you wait.",
      },
      "toilet-install": {
        headline: "Toilet installation in Tampa",
        intro: "Remodels and storm repairs need clean installs with proper seals against humidity.",
        localFactors: ["Rough-in verification", "Haul-away common"],
        neighborhoods: ["South Tampa", "Westchase-adjacent", "New Tampa-adjacent"],
        responseNote: "Measure the rough-in (wall to bolt centre, usually 12 in.) before buying a new toilet.",
      },
      "toilet-replacement": {
        headline: "Toilet replacement in Tampa",
        intro: "Replacing cracked or inefficient toilets ends repeat service visits in rental-heavy areas.",
        localFactors: ["Comfort height demand", "Flange checks"],
        neighborhoods: ["Ybor", "Seminole Heights", "South Tampa"],
        responseNote: "Ask whether the quote includes a new wax ring, closet bolts, supply line and haul-away.",
      },
      "emergency-plumber": {
        headline: "Emergency plumber in Tampa",
        intro: "Storm weeks and after-hours overflows need partners who can stabilize fast.",
        localFactors: ["Stop other water use if main backup suspected", "Supply shutoff first step"],
        neighborhoods: ["Downtown", "South Tampa", "Channelside"],
        responseNote: "If water is still running, shut the valve behind the toilet or the house main before anything else.",
      },
      "sewer-backup": {
        headline: "Sewer backup help in Tampa",
        intro: "Multi-fixture backups after heavy rain need main-line help — don’t keep flushing.",
        localFactors: ["Storm surcharge risk", "Cleanout checks"],
        neighborhoods: ["South Tampa", "East Tampa", "Westshore-adjacent"],
        responseNote: "If more than one drain is backing up, stop using water everywhere in the house until it is cleared.",
      },
    },
  },
  {
    stateSlug: "utah",
    citySlug: "salt-lake-city",
    heroExtra:
      "Hard water, freezing winters, and older homes with finished basements make toilet leaks and backups a costly problem in Salt Lake City, from the Avenues to Rose Park.",
    trustLine:
      "Requests from Salt Lake City ZIPs go to an independent, licensed Utah plumber who covers your area.",
    localFactors: ["Hard water along the Wasatch Front scales up flappers, fill valves, and rim jets", "Finished basements turn small leaks into ceiling and drywall damage", "Older neighborhoods still have original clay or cast-iron sewer laterals", "Winter cold snaps add frozen and burst pipes to the same week"],
    neighborhoods: ["Sugar House", "The Avenues", "Rose Park", "Liberty Wells", "Capitol Hill", "East Bench"],
    services: {
      "clogged-toilet": {
        headline: "Clogged toilet help in Salt Lake City",
        intro: "Most Salt Lake clogs are a single toilet and clear with a flange plunger or auger. In older Avenues and Sugar House homes, a toilet that clogs repeatedly can point to an aging drain line instead.",
        localFactors: ["Older homes may still have original clay or cast-iron sewer laterals", "Low-flow toilets from the 1990s often clog more than modern ones"],
        neighborhoods: ["Sugar House", "The Avenues", "Rose Park", "Liberty Wells"],
        responseNote: "Stop flushing after one failed attempt — a second flush is what overflows the bowl.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Salt Lake City",
        intro: "Hard water leaves scale on flappers, seats and fill valves, so Salt Lake toilets start running sooner than in soft-water cities. It's usually a cheap part.",
        localFactors: ["Mineral scale on the flapper seat stops a new flapper sealing", "Fill valves clog with sediment and hiss or refill slowly"],
        neighborhoods: ["Sugar House", "Capitol Hill", "Glendale", "East Bench"],
        responseNote: "Do the dye test first: a few drops of food colouring in the tank tells you flapper vs. fill valve.",
      },
      "toilet-leak": {
        headline: "Toilet leak repair in Salt Lake City",
        intro: "A leak at the base or tank can soak into subfloor fast, and in homes with finished basements it shows up as a stained ceiling below.",
        localFactors: ["Finished basements turn a slow upstairs leak into drywall damage", "Original chrome supply lines and angle stops corrode and weep"],
        neighborhoods: ["The Avenues", "Federal Heights", "Yalecrest", "Sugar House"],
        responseNote: "Turn the supply valve behind the toilet clockwise to stop a leak while you wait.",
      },
      "toilet-install": {
        headline: "Toilet installation in Salt Lake City",
        intro: "Remodels in older Salt Lake homes often uncover an off-height or cracked flange. A correct install fixes that before the new toilet is set.",
        localFactors: ["Older bathrooms may have a 10-inch or 14-inch rough-in, not 12", "Uneven old floors need shimming so the toilet doesn't rock"],
        neighborhoods: ["Sugar House", "9th and 9th", "Marmalade", "Rose Park"],
        responseNote: "Measure the rough-in (wall to bolt centre, usually 12 in.) before buying a new toilet.",
      },
      "toilet-replacement": {
        headline: "Toilet replacement in Salt Lake City",
        intro: "Replacing an old 3.5-gallon toilet or a cracked tank is often cheaper long term than repeated repairs, and it saves water in a dry state.",
        localFactors: ["Hairline cracks in old tanks can split without warning", "Comfort-height models are popular in older homes being updated"],
        neighborhoods: ["East Bench", "Sugar House", "Liberty Wells", "Poplar Grove"],
        responseNote: "Ask whether the quote includes a new wax ring, closet bolts, supply line and haul-away.",
      },
      "emergency-plumber": {
        headline: "Emergency toilet help in Salt Lake City",
        intro: "An overflowing toilet or a leak that won't stop needs the water shut off first. Then a plumber can clear or repair it.",
        localFactors: ["Winter cold snaps add frozen-pipe calls to the same week", "Old shut-off valves often seize when you need them most"],
        neighborhoods: ["Downtown", "Sugar House", "Rose Park", "The Avenues"],
        responseNote: "If water is still running, shut the valve behind the toilet or the house main before anything else.",
      },
      "sewer-backup": {
        headline: "Sewer backup help in Salt Lake City",
        intro: "When the basement floor drain or tub backs up as you flush, the blockage is in the main line. Older Salt Lake laterals are prone to tree roots.",
        localFactors: ["Mature trees in older neighborhoods send roots into clay sewer pipe", "The lowest drain in the house, often a basement floor drain, backs up first"],
        neighborhoods: ["The Avenues", "Sugar House", "Westpointe", "Fairpark"],
        responseNote: "If more than one drain is backing up, stop using water everywhere in the house until it is cleared.",
      },
    },
  },
  {
    stateSlug: "utah",
    citySlug: "provo",
    heroExtra:
      "Heavy-use rentals and student housing, hard water, and basement apartments make Provo a city of worn flappers, frequent clogs, and leaks into the unit below.",
    trustLine:
      "Requests from Provo ZIPs go to an independent, licensed Utah plumber who covers your area.",
    localFactors: ["Shared bathrooms in student and rental housing wear parts out faster", "Utah County hard water scales flappers and fill valves", "Basement apartments sit under upstairs bathrooms", "Older laterals near downtown are prone to roots"],
    neighborhoods: ["Joaquin", "Pleasant View", "Grandview", "Edgemont", "Riverbottoms", "North Park"],
    services: {
      "clogged-toilet": {
        headline: "Clogged toilet help in Provo",
        intro: "In shared student and rental housing, toilets get heavy use and clog more often. Most clear with a flange plunger; repeat clogs point further down the line.",
        localFactors: ["Shared bathrooms see far more flushes per day than a typical home", "Wipes and paper towels are a common cause in rentals"],
        neighborhoods: ["Joaquin", "Pleasant View", "North Park", "Grandview"],
        responseNote: "Stop flushing after one failed attempt — a second flush is what overflows the bowl.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Provo",
        intro: "Utah County's hard water scales up flappers and fill valves. A toilet that runs or refills on its own is usually a cheap part.",
        localFactors: ["Scale on the flapper seat causes slow tank-to-bowl leaks", "Heavily used rental toilets wear out flappers sooner"],
        neighborhoods: ["Edgemont", "Riverbottoms", "Joaquin", "Carterville"],
        responseNote: "Do the dye test first: a few drops of food colouring in the tank tells you flapper vs. fill valve.",
      },
      "toilet-leak": {
        headline: "Toilet leak repair in Provo",
        intro: "A leak at the base often means a failed wax ring. In basement apartments, it can drip straight into the unit below.",
        localFactors: ["Basement apartments sit under many upstairs bathrooms", "Rocking toilets break the wax seal over time"],
        neighborhoods: ["Pleasant View", "Grandview", "Sherwood Hills", "Edgemont"],
        responseNote: "Turn the supply valve behind the toilet clockwise to stop a leak while you wait.",
      },
      "toilet-install": {
        headline: "Toilet installation in Provo",
        intro: "New construction and basement finishes across Utah County need correct flange height and a solid seal on the first try.",
        localFactors: ["Basement bathrooms may need an up-flush or ejector setup", "Confirm the rough-in before buying"],
        neighborhoods: ["Riverbottoms", "Edgemont", "Lakeview", "Sunset"],
        responseNote: "Measure the rough-in (wall to bolt centre, usually 12 in.) before buying a new toilet.",
      },
      "toilet-replacement": {
        headline: "Toilet replacement in Provo",
        intro: "For landlords, replacing a worn-out toilet often costs less than repeated service calls between tenants.",
        localFactors: ["Older rentals often have high-volume tanks that waste water", "Cracked lids and tanks are common turnover finds"],
        neighborhoods: ["Joaquin", "Carterville", "Franklin", "Timp"],
        responseNote: "Ask whether the quote includes a new wax ring, closet bolts, supply line and haul-away.",
      },
      "emergency-plumber": {
        headline: "Emergency toilet help in Provo",
        intro: "Overflowing toilets in shared housing affect everyone. Shut off the valve behind the toilet first, then get it cleared.",
        localFactors: ["Winter freezes can crack exposed pipes in older rentals", "Tenants often can't find the house main, so know where it is"],
        neighborhoods: ["Downtown", "Joaquin", "East Bay", "Pleasant View"],
        responseNote: "If water is still running, shut the valve behind the toilet or the house main before anything else.",
      },
      "sewer-backup": {
        headline: "Sewer backup help in Provo",
        intro: "If the shower or a floor drain fills when you flush, the main line is blocked. Stop using water until it's cleared.",
        localFactors: ["Older laterals near downtown are prone to roots", "Multi-unit buildings share lines, so one blockage hits several units"],
        neighborhoods: ["Downtown", "Maeser", "Franklin", "Timp"],
        responseNote: "If more than one drain is backing up, stop using water everywhere in the house until it is cleared.",
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
