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
      "Requests from Houston ZIPs are reviewed by a person and passed to an independent Texas plumber who covers your area, when one is available.",
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
          "From Montrose rentals to Energy Corridor family homes, Houston clogs range from simple paper jams to deeper line issues after storms. A good plumber works out whether it's the bowl or the main before snaking.",
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
          "Flappers and fill valves are wear parts and eventually stop sealing. A quiet runner can still spike the water bill in a week.",
        localFactors: [
          "Flappers harden with age and stop sealing",
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
          "Stains around the base may hide hairline cracks",
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
      "Requests from Miami ZIPs are reviewed by a person and passed to an independent Florida plumber who covers your area, when one is available.",
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
          "Older tank parts wear out and stop sealing",
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
    trustLine: "Requests from Austin ZIPs are reviewed by a person and passed to an independent Texas plumber who covers your area, when one is available.",
    localFactors: [
      "Older central Austin flanges and wax rings fail often",
      "Student and short-term rentals spike clog calls",
      "Flappers and fill valves wear out with age",
      "New construction still needs correct rough-in installs",
    ],
    neighborhoods: ["South Congress", "East Austin", "Hyde Park", "Mueller", "Domain area", "Round Rock-adjacent"],
    services: {
      "clogged-toilet": {
        headline: "Clogged toilet help in Austin",
        intro: "From Eastside bungalows to South Austin rentals, recurring clogs often need more than a plunger, and the first job is working out whether it's the bowl or the line.",
        localFactors: ["Rental turnover drives wipe-related clogs", "Older clay laterals in central neighborhoods"],
        neighborhoods: ["East Austin", "South Congress", "Hyde Park"],
        responseNote: "Stop flushing after one failed attempt — a second flush is what overflows the bowl.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Austin",
        intro: "A quiet runner still racks up water costs in Austin summers. Most fixes are flapper or fill valve same-day jobs.",
        localFactors: ["Flappers harden with age and stop sealing", "Older tanks often need full fill-valve kits"],
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
        intro: "Remodels and ADUs need correct rough-in and leveling — measuring 10\" vs 12\" rough-ins before buying saves a return trip.",
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
    trustLine: "Requests from Dallas ZIPs are reviewed by a person and passed to an independent Texas plumber who covers your area, when one is available.",
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
        intro: "From Uptown condos to Oak Cliff homes, clogs need clearing and a check on whether the issue is the fixture or deeper.",
        localFactors: ["Wipes in rentals are common", "Shared stacks in multifamily"],
        neighborhoods: ["Uptown", "Oak Cliff", "Lakewood"],
        responseNote: "Stop flushing after one failed attempt — a second flush is what overflows the bowl.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Dallas",
        intro: "Running toilets waste water fast in large DFW homes. Quick part swaps usually solve it.",
        localFactors: ["Worn flappers", "Aging fill valves on 90s homes"],
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
        intro: "After-hours overflows can't wait. Shut the valve behind the toilet, then send a request marked Emergency.",
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
      "Phoenix is a huge metro, and flappers, fill valves and seals wear out in every part of it.",
    trustLine: "Requests from Phoenix ZIPs are reviewed by a person and passed to an independent Arizona plumber who covers your area, when one is available.",
    localFactors: [
      "Flappers and fill valves are wear parts",
      "Desert heat expands/contracts supply lines",
      "Large geography — ZIP routing matters",
      "New construction install volume remains high",
    ],
    neighborhoods: ["Central Phoenix", "Arcadia", "Biltmore", "Ahwatukee", "Scottsdale-adjacent", "Glendale-adjacent"],
    services: {
      "clogged-toilet": {
        headline: "Clogged toilet help in Phoenix",
        intro: "Clogs are the most common toilet problem in any large metro, Phoenix included.",
        localFactors: ["Scale narrows passages over time", "Rental turnover spikes"],
        neighborhoods: ["Central Phoenix", "Ahwatukee", "Arcadia"],
        responseNote: "Stop flushing after one failed attempt — a second flush is what overflows the bowl.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Phoenix",
        intro: "A Phoenix toilet that never fully shuts off usually has a worn flapper or fill valve. Part replacement is usually quick.",
        localFactors: ["Worn or warped flappers", "Fill valves wear out"],
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
        intro: "New homes and remodels need a good wax seal and the right flange height.",
        localFactors: ["Rough-in checks", "Haul-away options"],
        neighborhoods: ["North Phoenix", "Ahwatukee", "Laveen-adjacent"],
        responseNote: "Measure the rough-in (wall to bolt centre, usually 12 in.) before buying a new toilet.",
      },
      "toilet-replacement": {
        headline: "Toilet replacement in Phoenix",
        intro: "Replacing scale-damaged older toilets often ends chronic running and clog issues.",
        localFactors: ["Stains can hide cracks", "Comfort height popular"],
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
    trustLine: "Requests from Tampa ZIPs are reviewed by a person and passed to an independent Florida plumber who covers your area, when one is available.",
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
        intro: "Bay-area homes and rentals see frequent clogs — after storms, a repeat clog can mean a deeper line issue.",
        localFactors: ["Wipes and guest volume", "Post-storm debris"],
        neighborhoods: ["South Tampa", "Seminole Heights", "Ybor"],
        responseNote: "Stop flushing after one failed attempt — a second flush is what overflows the bowl.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Tampa",
        intro: "Tank parts wear out. A short visit usually stops the run.",
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
        intro: "Storm weeks bring after-hours overflows. Shut the water off first, then get help.",
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
      "Freezing winters and older homes with finished basements make toilet leaks and backups a costly problem in Salt Lake City, from the Avenues to Rose Park.",
    trustLine:
      "Requests from Salt Lake City ZIPs are reviewed by a person and passed to an independent Utah plumber who covers your area, when one is available.",
    localFactors: ["Finished basements turn small leaks into ceiling and drywall damage", "Older neighborhoods still have original clay or cast-iron sewer laterals", "Winter cold snaps add frozen and burst pipes to the same week"],
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
        intro: "A Salt Lake toilet that runs or refills on its own usually has a worn flapper, a scaled seat or a tired fill valve. It's usually a cheap part.",
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
      "Heavy-use rentals, student housing and basement apartments make Provo a city of worn flappers, frequent clogs, and leaks into the unit below.",
    trustLine:
      "Requests from Provo ZIPs are reviewed by a person and passed to an independent Utah plumber who covers your area, when one is available.",
    localFactors: ["Shared bathrooms in student and rental housing wear parts out faster", "Basement apartments sit under upstairs bathrooms", "Older laterals near downtown are prone to roots"],
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
        intro: "A toilet that runs or refills on its own usually needs a new flapper or fill valve, which is a cheap part.",
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
  {
    stateSlug: "utah",
    citySlug: "orem",
    heroExtra:
      "Orem is full of 1950s-1970s ramblers and split-levels, many with a basement apartment rented to UVU students, so an upstairs toilet leak often ends up as somebody else's ceiling stain.",
    trustLine:
      "Requests from Orem ZIPs are reviewed by a person and passed to an independent Utah plumber who covers your area, when one is available.",
    localFactors: [
      "Mid-century homes still have original shut-off valves that seize when you finally need them",
      "Basement apartments sit directly under the main-floor bathroom",
      "Flappers, fill valves and rim jets wear and clog with age",
      "Mature trees on older lots send roots into aging sewer laterals",
    ],
    neighborhoods: ["Windsor", "Northridge", "Lakeridge", "Cascade", "Sunset Heights", "Scera Park"],
    services: {
      "clogged-toilet": {
        headline: "Clogged toilet help in Orem",
        intro:
          "In an Orem rambler with a rented basement, two households often share one sewer line. If the basement toilet or shower backs up when someone upstairs flushes, it's the line, not the toilet. A single clogged toilet usually clears with a flange plunger.",
        localFactors: [
          "Upstairs and basement units share the same drain, so one clog can affect both",
          "Older low-flow toilets from the 1990s are common and clog more easily",
        ],
        neighborhoods: ["Scera Park", "Windsor", "Sharon", "Cascade"],
        responseNote:
          "If the basement shower rises when someone flushes upstairs, stop using water in both units and treat it as a main-line clog.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Orem",
        intro:
          "A crusted or pitted flapper seat can keep a new flapper on an old Orem toilet from sealing. If the dye test shows a leak after you've replaced the flapper, scrub the seat smooth or replace the flush valve.",
        localFactors: [
          "Scale on the flush valve seat stops even a new flapper from sealing",
          "Rental units often run for weeks before anyone reports it",
        ],
        neighborhoods: ["Northridge", "Lakeridge", "Sunset Heights", "Orchard"],
        responseNote:
          "Landlords: ask tenants to report a hissing or refilling toilet, because it's on your water bill.",
      },
      "toilet-leak": {
        headline: "Toilet leak repair in Orem",
        intro:
          "In Orem's split-levels and basement-apartment homes, a slow wax-ring leak upstairs usually shows up first as a brown ring on the ceiling below. Catch it early and it's a reseat on a new ring. Wait, and it's subfloor and drywall too.",
        localFactors: [
          "Stains on a basement ceiling under a bathroom usually mean a failed wax ring",
          "Original chrome supply lines and stops from the 1960s and 70s corrode and weep",
        ],
        neighborhoods: ["Windsor", "Cascade", "Scera Park", "Hillcrest"],
        responseNote:
          "Turn the oval valve behind the toilet clockwise. If it won't turn or starts dripping, stop and close the house main instead.",
      },
      "toilet-install": {
        headline: "Toilet installation in Orem",
        intro:
          "Updating a mid-century Orem bathroom often turns up a corroded cast-iron flange or a 10-inch rough-in. Measure before you buy, and expect the flange to need attention once the old toilet is off.",
        localFactors: [
          "Older homes sometimes have a 10-inch rough-in instead of the standard 12",
          "Cast-iron flanges from the original build often crack when the old bolts come out",
        ],
        neighborhoods: ["Sunset Heights", "Northridge", "Lakeridge", "Windsor"],
        responseNote:
          "Measure from the finished wall to the centre of the floor bolts before buying a toilet.",
      },
      "toilet-replacement": {
        headline: "Toilet replacement in Orem",
        intro:
          "Many Orem homes still have their original 3.5-gallon or older toilets. Swapping to a WaterSense model, which EPA says uses 1.28 gallons or less, cuts water use and is a common turnover upgrade for basement rentals.",
        localFactors: [
          "Original high-volume toilets are still common in 1960s and 70s homes",
          "Cracked lids and tanks are a frequent find between tenants",
        ],
        neighborhoods: ["Cascade", "Scera Park", "Orchard", "Sharon"],
        responseNote:
          "Ask whether the quote includes a new wax ring, closet bolts, supply line and haul-away.",
      },
      "emergency-plumber": {
        headline: "Emergency toilet help in Orem",
        intro:
          "With two households under one roof, an overflowing toilet upstairs can be water through the ceiling downstairs within minutes. Shut the valve behind the toilet first. Make sure basement tenants know where the house main is.",
        localFactors: [
          "Basement tenants often don't have access to, or know about, the main shut-off",
          "Original 1960s valves may not close fully, so the house main is the backup",
        ],
        neighborhoods: ["Windsor", "Scera Park", "Northridge", "Lakeridge"],
        responseNote:
          "If water is still running, shut the valve behind the toilet or the house main before anything else.",
      },
      "sewer-backup": {
        headline: "Sewer backup help in Orem",
        intro:
          "Orem's older lots have big trees, and their roots find the joints in aging sewer laterals. If the basement floor drain backs up, stop using water in every unit and get the line cleared from the cleanout.",
        localFactors: [
          "Roots from mature trees are the classic cause in older neighborhoods",
          "The basement floor drain is usually the first place sewage appears",
        ],
        neighborhoods: ["Sharon", "Scera Park", "Cascade", "Hillcrest"],
        responseNote:
          "If more than one drain is backing up, stop using water everywhere in the house until it is cleared.",
      },
    },
  },
  {
    stateSlug: "utah",
    citySlug: "lehi",
    heroExtra:
      "Most of Lehi was built in the last twenty years, so toilet calls here are less about corroded pipes and more about builder-grade parts wearing out, installs that were never quite level, and new basements being finished.",
    trustLine:
      "Requests from Lehi ZIPs are reviewed by a person and passed to an independent Utah plumber who covers your area, when one is available.",
    localFactors: [
      "Builder-grade fill valves and flappers in 2000s and 2010s homes are reaching the end of their life",
      "Toilets set fast during construction can rock and break the wax seal over time",
      "Basement finishes need correct rough-ins, and sometimes an ejector pump",
      "Lehi's pressurized irrigation lines carry untreated water and must never connect to indoor plumbing",
    ],
    neighborhoods: ["Traverse Mountain", "Holbrook Farms", "Ivory Ridge", "Thanksgiving Point area", "Downtown Lehi", "Silicon Slopes area"],
    services: {
      "clogged-toilet": {
        headline: "Clogged toilet help in Lehi",
        intro:
          "Newer Lehi homes mostly have modern toilets that flush well, so frequent clogs usually come from what's going down them: wipes, kids' toys, paper towels. A flange plunger or closet auger fixes most. A brand-new house that keeps clogging may have a construction-debris or slope problem worth a camera look.",
        localFactors: [
          "Construction debris left in new drain lines occasionally causes repeat clogs",
          "Wipes are the top cause in family homes with young kids",
        ],
        neighborhoods: ["Holbrook Farms", "Ivory Ridge", "Traverse Mountain", "Downtown Lehi"],
        responseNote: "Stop flushing after one failed attempt — a second flush is what overflows the bowl.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Lehi",
        intro:
          "If your Lehi home is ten to twenty years old, the original builder-grade fill valves and flappers are due. A toilet that hisses or refills on its own is usually a part you can replace in half an hour.",
        localFactors: [
          "Original plastic fill valves from the build commonly fail at 10-15 years",
          "Flappers are a wear part and fail first",
        ],
        neighborhoods: ["Ivory Ridge", "Traverse Mountain", "Thanksgiving Point area", "Holbrook Farms"],
        responseNote:
          "Do the dye test first: a few drops of food colouring in the tank tells you flapper vs. fill valve.",
      },
      "toilet-leak": {
        headline: "Toilet leak repair in Lehi",
        intro:
          "A toilet that was set quickly during construction can rock slightly, and every rock weakens the wax seal. If the base is damp after flushing or the toilet moves when you sit, it needs resetting on a new seal with proper shims.",
        localFactors: [
          "A toilet that rocks even slightly will eventually break its seal",
          "Plastic supply-line nuts can crack if they were overtightened at install",
        ],
        neighborhoods: ["Holbrook Farms", "Traverse Mountain", "Downtown Lehi", "Ivory Ridge"],
        responseNote: "Turn the supply valve behind the toilet clockwise to stop a leak while you wait.",
      },
      "toilet-install": {
        headline: "Toilet installation in Lehi",
        intro:
          "Lots of Lehi homeowners are finishing basements. A basement bathroom needs the drain below the floor at the right spot, or an up-flush or ejector system if the drain is above it. Confirm the rough-in before you frame walls or buy a toilet.",
        localFactors: [
          "Many newer homes have stubbed-in basement plumbing waiting to be finished",
          "Basement baths below the sewer line need an ejector pump or up-flush toilet",
        ],
        neighborhoods: ["Traverse Mountain", "Ivory Ridge", "Holbrook Farms", "Thanksgiving Point area"],
        responseNote:
          "Never tie a fixture into a pressurized irrigation line. It's untreated water and is not allowed under plumbing code.",
      },
      "toilet-replacement": {
        headline: "Toilet replacement in Lehi",
        intro:
          "Builder-grade toilets in newer Lehi homes work but are often the cheapest models available. Upgrading to a comfort-height WaterSense toilet is a common change, and it's a straight swap on a standard 12-inch rough-in.",
        localFactors: [
          "Builder-grade toilets are often swapped for comfort-height models",
          "Newer homes almost always have a standard 12-inch rough-in",
        ],
        neighborhoods: ["Ivory Ridge", "Downtown Lehi", "Holbrook Farms", "Traverse Mountain"],
        responseNote: "Ask whether the quote includes a new wax ring, closet bolts, supply line and haul-away.",
      },
      "emergency-plumber": {
        headline: "Emergency toilet help in Lehi",
        intro:
          "In newer Lehi homes the main shut-off is usually in the basement or a utility room near where the water line enters. Find it now, not when water is on the floor. For a toilet, the valve behind it is the first stop.",
        localFactors: [
          "In finished basements the main valve can end up behind an access panel",
          "Upstairs laundry and bathrooms mean leaks travel down through two floors",
        ],
        neighborhoods: ["Traverse Mountain", "Holbrook Farms", "Downtown Lehi", "Ivory Ridge"],
        responseNote:
          "If water is still running, shut the valve behind the toilet or the house main before anything else.",
      },
      "sewer-backup": {
        headline: "Sewer backup help in Lehi",
        intro:
          "Sewer backups are less common in new subdivisions, but they do happen: grease, wipes, and occasionally a problem in the city main. If neighbors are backing up too, call Lehi City as well as a plumber.",
        localFactors: [
          "Several homes backing up at once points to the city main, not your lateral",
          "Basement bathrooms are the first to flood when the line is blocked",
        ],
        neighborhoods: ["Downtown Lehi", "Holbrook Farms", "Ivory Ridge", "Thanksgiving Point area"],
        responseNote:
          "If more than one drain is backing up, stop using water everywhere in the house until it is cleared.",
      },
    },
  },
  {
    stateSlug: "utah",
    citySlug: "american-fork",
    heroExtra:
      "American Fork mixes older homes near Main Street, some with original galvanized pipes and cast-iron drains, with newer subdivisions on the benches, and toilet parts wear out in both.",
    trustLine:
      "Requests from American Fork ZIPs are reviewed by a person and passed to an independent Utah plumber who covers your area, when one is available.",
    localFactors: [
      "Scale in rim jets weakens the flush",
      "Older homes near Main Street may still have galvanized supply pipes and cast-iron drains",
      "Pressurized irrigation lines carry untreated water and must never connect to indoor plumbing",
      "Finished basements turn upstairs leaks into ceiling repairs",
    ],
    neighborhoods: ["Historic Main Street", "Downtown", "Robinson Park area", "Art Dye Park area", "North American Fork", "East bench"],
    services: {
      "clogged-toilet": {
        headline: "Clogged toilet help in American Fork",
        intro:
          "A toilet that flushes weakly and clogs often is sometimes a weak-flush problem, not a drain problem. Check that the tank fills to its line and the rim holes are clear, then plunge.",
        localFactors: [
          "Scale in the siphon jet weakens the flush and leads to more clogs",
          "Older cast-iron drains near downtown can be rough inside and catch paper",
        ],
        neighborhoods: ["Historic Main Street", "Robinson Park area", "North American Fork", "East bench"],
        responseNote: "Stop flushing after one failed attempt — a second flush is what overflows the bowl.",
      },
      "running-toilet": {
        headline: "Running toilet repair in American Fork",
        intro:
          "An American Fork toilet that runs or phantom-flushes usually has a worn flapper or fill valve. The dye test tells you which part to buy.",
        localFactors: [
          "Scale on the flush valve seat stops a new flapper from sealing",
          "Sediment clogs the fill valve screen, causing slow refills or hissing",
        ],
        neighborhoods: ["Art Dye Park area", "Downtown", "East bench", "North American Fork"],
        responseNote:
          "Do the dye test first: a few drops of food colouring in the tank tells you flapper vs. fill valve.",
      },
      "toilet-leak": {
        headline: "Toilet leak repair in American Fork",
        intro:
          "In older homes near Main Street, the shut-off valve and supply line behind the toilet are often original. They corrode, weep, and sometimes snap when turned. If you see rust or a drip at the valve, plan to replace it along with any leak repair.",
        localFactors: [
          "Original galvanized stubs and valves corrode where they meet the wall",
          "Wax-ring leaks upstairs show up as stains on a finished basement ceiling",
        ],
        neighborhoods: ["Historic Main Street", "Downtown", "Robinson Park area", "Art Dye Park area"],
        responseNote:
          "If the valve behind the toilet is crusty or won't turn, don't force it. Close the house main instead.",
      },
      "toilet-install": {
        headline: "Toilet installation in American Fork",
        intro:
          "Remodeling an older American Fork bathroom can turn up a cast-iron flange that cracks when the old toilet comes off. A newer bench home is usually a straight swap. Either way, measure the rough-in first.",
        localFactors: [
          "Older homes may have non-standard rough-ins and worn cast-iron flanges",
          "Basement finishes need a drain below the floor or an ejector system",
        ],
        neighborhoods: ["Historic Main Street", "North American Fork", "East bench", "Downtown"],
        responseNote:
          "Never tie a fixture into a pressurized irrigation line. It's untreated water.",
      },
      "toilet-replacement": {
        headline: "Toilet replacement in American Fork",
        intro:
          "If an older toilet flushes weakly even after you've cleared the scale, replacement is usually the better spend. EPA says WaterSense models use 1.28 gallons per flush or less and are tested to clear the bowl.",
        localFactors: [
          "Heavily scaled older toilets rarely flush like new again",
          "Many utilities offer rebates on WaterSense toilets, so check before buying",
        ],
        neighborhoods: ["Robinson Park area", "Art Dye Park area", "East bench", "Downtown"],
        responseNote: "Ask whether the quote includes a new wax ring, closet bolts, supply line and haul-away.",
      },
      "emergency-plumber": {
        headline: "Emergency toilet help in American Fork",
        intro:
          "Winter cold snaps in Utah County freeze exposed pipes, and old valves in older homes may not close when you need them. Find your house main before an emergency. For a toilet, close the valve behind it first.",
        localFactors: [
          "Pipes in exterior walls and crawlspaces can freeze in cold snaps",
          "Original valves in older homes often seize or don't close fully",
        ],
        neighborhoods: ["Downtown", "Historic Main Street", "North American Fork", "East bench"],
        responseNote:
          "If water is still running, shut the valve behind the toilet or the house main before anything else.",
      },
      "sewer-backup": {
        headline: "Sewer backup help in American Fork",
        intro:
          "Older laterals near downtown American Fork are often clay or cast iron, and tree roots find the joints. If the basement floor drain or tub backs up when you flush, stop using water and get the line cleared from the cleanout.",
        localFactors: [
          "Clay and cast-iron laterals in older neighborhoods attract tree roots",
          "Repeat backups are worth a camera inspection to find the cause",
        ],
        neighborhoods: ["Historic Main Street", "Downtown", "Robinson Park area", "Art Dye Park area"],
        responseNote:
          "If more than one drain is backing up, stop using water everywhere in the house until it is cleared.",
      },
    },
  },
  {
    stateSlug: "utah",
    citySlug: "sandy",
    heroExtra:
      "Sandy runs from the Jordan River up into the Wasatch foothills, so water pressure varies a lot from street to street, and most homes have a finished basement where a small leak turns into a big repair.",
    trustLine:
      "Requests from Sandy ZIPs are reviewed by a person and passed to an independent Utah plumber who covers your area, when one is available.",
    localFactors: [
      "Big elevation changes mean some homes see high water pressure that wears out fill valves and supply lines",
      "Many homes have a pressure-reducing valve near the main that eventually fails",
      "Finished basements are the norm, so upstairs leaks reach ceilings fast",
      "1970s-1990s homes are hitting the age where wax rings and shut-off valves fail",
    ],
    neighborhoods: ["Historic Sandy", "Dimple Dell", "Alta Canyon", "Willow Creek", "Pepperwood", "Hidden Valley"],
    services: {
      "clogged-toilet": {
        headline: "Clogged toilet help in Sandy",
        intro:
          "Most Sandy clogs are a single toilet and clear with a flange plunger. If the basement shower or floor drain gurgles when you flush upstairs, the blockage is further down, and plunging will only push water out of the lowest drain.",
        localFactors: [
          "Basement drains are the first to show a main-line problem",
          "Early-1990s low-flow toilets in many homes clog more than modern models",
        ],
        neighborhoods: ["Willow Creek", "Pepperwood", "Historic Sandy", "Alta Canyon"],
        responseNote: "Stop flushing after one failed attempt — a second flush is what overflows the bowl.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Sandy",
        intro:
          "If several toilets in your Sandy home keep running or the fill valves wear out quickly, check your water pressure, not just the parts. High pressure pushes past worn seals. A cheap pressure gauge on a hose bib tells you, and a failed pressure-reducing valve is a common culprit.",
        localFactors: [
          "High water pressure on lower streets shortens fill valve life",
          "A failing pressure-reducing valve can cause several fixtures to act up at once",
        ],
        neighborhoods: ["Dimple Dell", "Hidden Valley", "Willow Creek", "Historic Sandy"],
        responseNote:
          "If more than one toilet runs or the faucets bang, have the water pressure and the pressure-reducing valve checked.",
      },
      "toilet-leak": {
        headline: "Toilet leak repair in Sandy",
        intro:
          "Almost every Sandy home has a finished basement, so a wax-ring leak in an upstairs bathroom usually shows up as a stain on the family-room ceiling. Fix it at the first damp base or brown ring, before the subfloor softens.",
        localFactors: [
          "A ceiling stain under a bathroom is the classic sign of a failed wax ring",
          "Braided supply lines more than about ten years old are worth replacing proactively",
        ],
        neighborhoods: ["Alta Canyon", "Pepperwood", "Willow Creek", "Hidden Valley"],
        responseNote: "Turn the supply valve behind the toilet clockwise to stop a leak while you wait.",
      },
      "toilet-install": {
        headline: "Toilet installation in Sandy",
        intro:
          "Sandy remodels are mostly 1970s-1990s homes getting updated bathrooms. That usually means a standard 12-inch rough-in and a straight swap, but a soft floor around the old toilet means subfloor repair first.",
        localFactors: [
          "Most homes from this era have a standard 12-inch rough-in",
          "Soft flooring around an old toilet means a hidden leak and subfloor work",
        ],
        neighborhoods: ["Willow Creek", "Dimple Dell", "Historic Sandy", "Alta Canyon"],
        responseNote:
          "Measure the rough-in (wall to bolt centre, usually 12 in.) before buying a new toilet.",
      },
      "toilet-replacement": {
        headline: "Toilet replacement in Sandy",
        intro:
          "If your Sandy home still has its original toilets, replacing them with WaterSense models (1.28 gallons per flush or less, according to EPA) is a common update, especially when the bathroom is being redone anyway.",
        localFactors: [
          "Original toilets in 1970s and 80s homes can use far more water per flush",
          "Replacing all toilets at once can lower the per-toilet labor cost",
        ],
        neighborhoods: ["Pepperwood", "Hidden Valley", "Historic Sandy", "Willow Creek"],
        responseNote: "Ask whether the quote includes a new wax ring, closet bolts, supply line and haul-away.",
      },
      "emergency-plumber": {
        headline: "Emergency toilet help in Sandy",
        intro:
          "In Sandy, an upstairs overflow can be through the basement ceiling in minutes. Shut the valve behind the toilet first. The house main is usually in the basement near where the water line enters, often next to the pressure-reducing valve.",
        localFactors: [
          "The main shut-off is often next to the pressure-reducing valve in the basement",
          "Winter cold snaps add frozen-pipe calls to the same week",
        ],
        neighborhoods: ["Historic Sandy", "Alta Canyon", "Dimple Dell", "Willow Creek"],
        responseNote:
          "If water is still running, shut the valve behind the toilet or the house main before anything else.",
      },
      "sewer-backup": {
        headline: "Sewer backup help in Sandy",
        intro:
          "Because Sandy basements sit below the main floor, the basement floor drain or shower is where a sewer backup appears first. Stop using water the moment it does. Clearing the line from the cleanout is a plumber's job.",
        localFactors: [
          "Basement floor drains flood first when the main line blocks",
          "Mature trees in older neighborhoods send roots into laterals",
        ],
        neighborhoods: ["Historic Sandy", "Pepperwood", "Willow Creek", "Hidden Valley"],
        responseNote:
          "If more than one drain is backing up, stop using water everywhere in the house until it is cleared.",
      },
    },
  },
  {
    stateSlug: "utah",
    citySlug: "west-jordan",
    heroExtra:
      "West Jordan has grown in waves, from older homes on the east side to newer subdivisions toward the Oquirrhs, so toilet calls range from cracked 1970s tanks to builder-grade parts in homes a few years old.",
    trustLine:
      "Requests from West Jordan ZIPs are reviewed by a person and passed to an independent Utah plumber who covers your area, when one is available.",
    localFactors: [
      "Older east-side homes have original valves, supply lines and wax rings",
      "Newer west-side homes have builder-grade parts now wearing out",
      "Flappers, fill valves and rim jets wear and clog with age",
      "Finished basements make slow leaks expensive",
    ],
    neighborhoods: ["Jordan Landing", "Copper Hills", "Gardner Village area", "Sugar Factory area", "Ron Wood Park area", "West side subdivisions"],
    services: {
      "clogged-toilet": {
        headline: "Clogged toilet help in West Jordan",
        intro:
          "A single clogged toilet in West Jordan usually clears with a flange plunger or closet auger. In older east-side homes with original toilets, repeat clogs often mean the toilet itself is past its best.",
        localFactors: [
          "Older low-flow toilets clog more than modern WaterSense models",
          "Wipes are a common cause in busy family homes",
        ],
        neighborhoods: ["Sugar Factory area", "Gardner Village area", "Copper Hills", "Jordan Landing"],
        responseNote: "Stop flushing after one failed attempt — a second flush is what overflows the bowl.",
      },
      "running-toilet": {
        headline: "Running toilet repair in West Jordan",
        intro:
          "Age is the usual suspect. On an older east-side toilet, it's often a scaled flapper seat. In a newer west-side home, it's often the original plastic fill valve giving out. The dye test tells you which.",
        localFactors: [
          "Original fill valves in 2000s-2010s homes are reaching end of life",
          "Scale on older flush valve seats stops new flappers sealing",
        ],
        neighborhoods: ["Copper Hills", "West side subdivisions", "Ron Wood Park area", "Jordan Landing"],
        responseNote:
          "Do the dye test first: a few drops of food colouring in the tank tells you flapper vs. fill valve.",
      },
      "toilet-leak": {
        headline: "Toilet leak repair in West Jordan",
        intro:
          "Whether it's a forty-year-old wax ring or a newer toilet that was never quite level, a leak at the base needs the toilet lifted and reset on a new seal. In homes with a finished basement, look for ceiling stains under bathrooms.",
        localFactors: [
          "Original wax rings in older homes dry out and stop sealing",
          "Newer toilets set without shims can rock and break the seal",
        ],
        neighborhoods: ["Sugar Factory area", "Ron Wood Park area", "Gardner Village area", "Copper Hills"],
        responseNote: "Turn the supply valve behind the toilet clockwise to stop a leak while you wait.",
      },
      "toilet-install": {
        headline: "Toilet installation in West Jordan",
        intro:
          "Finishing a basement is common in West Jordan's newer homes, many of which were built with stubbed-in bathroom plumbing. Confirm where the drain stub is before framing, and buy a toilet that matches its rough-in.",
        localFactors: [
          "Many newer homes have basement bathroom plumbing stubbed in during construction",
          "Older east-side bathrooms may need flange repair when the old toilet comes out",
        ],
        neighborhoods: ["West side subdivisions", "Copper Hills", "Jordan Landing", "Ron Wood Park area"],
        responseNote:
          "Measure the rough-in (wall to bolt centre, usually 12 in.) before buying a new toilet.",
      },
      "toilet-replacement": {
        headline: "Toilet replacement in West Jordan",
        intro:
          "A cracked tank lid is cosmetic. A crack in the tank or bowl below the waterline isn't, and it's common in older West Jordan homes. Replace before it splits. EPA says WaterSense models use 1.28 gallons per flush or less.",
        localFactors: [
          "Hairline cracks below the waterline in old tanks can fail suddenly",
          "Builder-grade toilets in newer homes are often upgraded to comfort height",
        ],
        neighborhoods: ["Sugar Factory area", "Gardner Village area", "Copper Hills", "Jordan Landing"],
        responseNote: "Ask whether the quote includes a new wax ring, closet bolts, supply line and haul-away.",
      },
      "emergency-plumber": {
        headline: "Emergency toilet help in West Jordan",
        intro:
          "Shut the valve behind the toilet first. If it won't close, use the house main, usually in the basement or a utility room where the water line comes in. Know where it is before you need it.",
        localFactors: [
          "Old valves in older homes may not close fully",
          "Winter cold snaps can freeze pipes in exterior walls",
        ],
        neighborhoods: ["Jordan Landing", "Copper Hills", "Sugar Factory area", "West side subdivisions"],
        responseNote:
          "If water is still running, shut the valve behind the toilet or the house main before anything else.",
      },
      "sewer-backup": {
        headline: "Sewer backup help in West Jordan",
        intro:
          "If the basement floor drain or the tub backs up when you flush, the main line is blocked. In older neighborhoods, roots are a common cause. If several houses on your street are affected, call the city too.",
        localFactors: [
          "Roots in older laterals on the east side are a common cause",
          "Several homes backing up at once points to the city main",
        ],
        neighborhoods: ["Sugar Factory area", "Gardner Village area", "Ron Wood Park area", "Jordan Landing"],
        responseNote:
          "If more than one drain is backing up, stop using water everywhere in the house until it is cleared.",
      },
    },
  },
  {
    stateSlug: "utah",
    citySlug: "ogden",
    heroExtra:
      "Ogden has some of the oldest housing on the Wasatch Front, with historic districts full of pre-war homes and original cast-iron drains, so seized valves, corroded supply lines and root-filled sewer laterals are everyday calls.",
    trustLine:
      "Requests from Ogden ZIPs are reviewed by a person and passed to an independent Utah plumber who covers your area, when one is available.",
    localFactors: [
      "Pre-war and mid-century homes often have original cast-iron drains and clay sewer laterals",
      "Original shut-off valves seize or snap when finally turned",
      "Mature street trees send roots into older sewer lines",
      "Cold winters freeze pipes in older, less-insulated homes",
    ],
    neighborhoods: ["Jefferson Historic District", "Eccles Avenue area", "East Bench", "Downtown / 25th Street", "Mount Ogden", "Weber State area"],
    services: {
      "clogged-toilet": {
        headline: "Clogged toilet help in Ogden",
        intro:
          "In an older Ogden home, a toilet that clogs repeatedly is often the drain, not the toilet. Old cast iron gets rough inside and catches paper, and clay laterals collect roots. Plunge once. If it keeps coming back, have the line looked at.",
        localFactors: [
          "Rough interior walls in old cast-iron pipe catch paper and wipes",
          "Roots in clay laterals cause clogs that keep coming back",
        ],
        neighborhoods: ["Jefferson Historic District", "Eccles Avenue area", "Downtown / 25th Street", "East Bench"],
        responseNote: "Stop flushing after one failed attempt — a second flush is what overflows the bowl.",
      },
      "running-toilet": {
        headline: "Running toilet repair in Ogden",
        intro:
          "Older toilets in Ogden homes sometimes have outdated ball-float fill valves and non-standard flappers. A universal modern fill valve and a flapper sized to the flush valve (2-inch or 3-inch) usually fix it.",
        localFactors: [
          "Old ball-and-arm fill valves are worth replacing with a modern float-cup valve",
          "Corroded shut-off valves can make even a simple part swap tricky",
        ],
        neighborhoods: ["Mount Ogden", "East Bench", "Weber State area", "Jefferson Historic District"],
        responseNote:
          "If the shut-off valve behind the toilet is crusty or won't turn, don't force it. It can snap on old pipe.",
      },
      "toilet-leak": {
        headline: "Toilet leak repair in Ogden",
        intro:
          "In older Ogden homes, a leak behind the toilet is often the original chrome supply tube or a corroded valve, and a leak at the base can mean a cracked cast-iron flange. Old floors may need shims to stop the toilet rocking once it's reset.",
        localFactors: [
          "Original chrome supply tubes and stops corrode and weep",
          "Cast-iron flanges crack, and old floors are rarely level",
        ],
        neighborhoods: ["Jefferson Historic District", "Eccles Avenue area", "Downtown / 25th Street", "Mount Ogden"],
        responseNote:
          "If the valve won't close, shut the house main. On old pipe, a forced valve can break off.",
      },
      "toilet-install": {
        headline: "Toilet installation in Ogden",
        intro:
          "Historic Ogden bathrooms often have a 10-inch or 14-inch rough-in rather than the modern 12, and old cast-iron flanges that need repair. Measure first, and budget for flange work in a pre-war house.",
        localFactors: [
          "Older bathrooms frequently have non-standard rough-ins",
          "Lead-caulked cast-iron flanges may need a repair ring or replacement",
        ],
        neighborhoods: ["Eccles Avenue area", "Jefferson Historic District", "East Bench", "Weber State area"],
        responseNote:
          "Measure from the finished wall to the centre of the floor bolts before buying a toilet.",
      },
      "toilet-replacement": {
        headline: "Toilet replacement in Ogden",
        intro:
          "Old Ogden toilets can use several gallons per flush; EPA notes older models use as much as 6. A WaterSense replacement (1.28 gallons or less) saves water, and it's a good moment to replace the original valve and supply line too.",
        localFactors: [
          "Older toilets can use several times more water per flush than modern ones",
          "Replacing the original shut-off valve while the water is off is cheap insurance",
        ],
        neighborhoods: ["Mount Ogden", "East Bench", "Jefferson Historic District", "Downtown / 25th Street"],
        responseNote: "Ask whether the quote includes a new wax ring, closet bolts, supply line and haul-away.",
      },
      "emergency-plumber": {
        headline: "Emergency toilet help in Ogden",
        intro:
          "Older Ogden homes are more likely to have valves that won't close and pipes that freeze in a cold snap. Know where your house main is. In many older homes it's in the basement where the line comes through the foundation.",
        localFactors: [
          "Original valves often fail to close fully in an emergency",
          "Older, less-insulated homes are more prone to frozen pipes in winter",
        ],
        neighborhoods: ["Downtown / 25th Street", "Jefferson Historic District", "Weber State area", "East Bench"],
        responseNote:
          "If water is still running, shut the valve behind the toilet or the house main before anything else.",
      },
      "sewer-backup": {
        headline: "Sewer backup help in Ogden",
        intro:
          "Clay sewer laterals and big old street trees make root intrusion a common cause of backups in Ogden's older neighborhoods. If the basement floor drain backs up, stop using water. If it keeps happening, a camera inspection shows whether the pipe needs repair.",
        localFactors: [
          "Clay laterals in historic neighborhoods are prone to roots and cracked joints",
          "Repeat backups usually mean a damaged pipe, not just a clog",
        ],
        neighborhoods: ["Jefferson Historic District", "Eccles Avenue area", "Mount Ogden", "Downtown / 25th Street"],
        responseNote:
          "If more than one drain is backing up, stop using water everywhere in the house until it is cleared.",
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
 * Only the metros listed here have genuinely unique copy. The other 24 cities render the
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
