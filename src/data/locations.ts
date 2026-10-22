export type City = {
  slug: string;
  name: string;
  blurb: string;
  zips: string[];
};

export type State = {
  slug: string;
  name: string;
  abbr: string;
  blurb: string;
  cities: City[];
};

export const STATES: State[] = [
  {
    slug: "texas",
    name: "Texas",
    abbr: "TX",
    blurb:
      "From Gulf humidity to North Texas clay soil, Texas homes put real stress on toilets, wax rings, and sewer lines. Send a request and a person reads it; if an independent plumber who covers your area is available, we pass it on.",
    cities: [
      {
        slug: "houston",
        name: "Houston",
        blurb:
          "Houston’s mix of older bungalows and sprawling suburbs means frequent clogs, slab-related line issues, and emergency overflow calls after storms.",
        zips: ["77002", "77019", "77024", "77056", "77098"],
      },
      {
        slug: "dallas",
        name: "Dallas",
        blurb:
          "Dallas toilet calls range from mid-century remodels to high-rise condo failures, where building access rules can matter.",
        zips: ["75201", "75205", "75219", "75225", "75230"],
      },
      {
        slug: "austin",
        name: "Austin",
        blurb:
          "Austin’s rapid growth and older central homes create constant demand for installs, replacements, and clogged-toilet emergencies.",
        zips: ["78701", "78704", "78745", "78757", "78759"],
      },
      {
        slug: "san-antonio",
        name: "San Antonio",
        blurb:
          "Aging plumbing stock in San Antonio makes running toilets, leaks, and flange repairs common service calls.",
        zips: ["78205", "78209", "78212", "78230", "78258"],
      },
      {
        slug: "fort-worth",
        name: "Fort Worth",
        blurb:
          "Fort Worth homeowners need reliable local help for clogs, replacements, and after-hours toilet emergencies across expanding suburbs.",
        zips: ["76102", "76107", "76109", "76116", "76132"],
      },
      {
        slug: "el-paso",
        name: "El Paso",
        blurb:
          "Older housing in El Paso means supply-line leaks and running toilets show up often.",
        zips: ["79901", "79902", "79912", "79924", "79936"],
      },
      {
        slug: "arlington",
        name: "Arlington",
        blurb:
          "Between DFW traffic and busy family homes, Arlington residents want plumbers who show up and fix toilet problems the first visit.",
        zips: ["76010", "76012", "76013", "76016", "76018"],
      },
      {
        slug: "corpus-christi",
        name: "Corpus Christi",
        blurb:
          "Coastal humidity and older coastal homes in Corpus Christi increase seal failures, leaks, and emergency backups.",
        zips: ["78401", "78404", "78411", "78412", "78414"],
      },
      {
        slug: "plano",
        name: "Plano",
        blurb:
          "Plano’s suburban housing stock needs dependable install, replacement, and clog service from North Texas plumbers.",
        zips: ["75023", "75024", "75025", "75074", "75075"],
      },
      {
        slug: "lubbock",
        name: "Lubbock",
        blurb:
          "West Texas water and temperature swings keep Lubbock plumbers busy with running toilets, seals, and emergency clogs.",
        zips: ["79401", "79410", "79413", "79416", "79424"],
      },
    ],
  },
  {
    slug: "florida",
    name: "Florida",
    abbr: "FL",
    blurb:
      "Florida’s humidity, older condo stock, and storm seasons drive toilet leaks, sewer backups, and emergency plumbing calls year-round.",
    cities: [
      {
        slug: "jacksonville",
        name: "Jacksonville",
        blurb:
          "Jacksonville’s spread-out metro needs local plumbers who cover both beachside homes and inland neighborhoods for clogs and installs.",
        zips: ["32202", "32205", "32207", "32216", "32224"],
      },
      {
        slug: "miami",
        name: "Miami",
        blurb:
          "Miami condos and older homes see frequent supply-line leaks, running toilets, and after-hours overflow emergencies.",
        zips: ["33125", "33129", "33133", "33134", "33145"],
      },
      {
        slug: "tampa",
        name: "Tampa",
        blurb:
          "Tampa Bay homes deal with humidity-driven seal issues, clogs, and sewer concerns — local help matters.",
        zips: ["33602", "33606", "33609", "33611", "33629"],
      },
      {
        slug: "orlando",
        name: "Orlando",
        blurb:
          "From tourist-area rentals to family suburbs, Orlando needs fast toilet repair, replacement, and emergency response.",
        zips: ["32801", "32803", "32806", "32819", "32822"],
      },
      {
        slug: "st-petersburg",
        name: "St. Petersburg",
        blurb:
          "St. Pete’s bungalows and waterfront properties often need flange repairs, leak fixes, and clogged-toilet service.",
        zips: ["33701", "33704", "33705", "33707", "33710"],
      },
      {
        slug: "hialeah",
        name: "Hialeah",
        blurb:
          "Dense residential blocks in Hialeah mean shared walls and fast-moving leaks — quick local plumbing response is essential.",
        zips: ["33010", "33012", "33013", "33014", "33016"],
      },
      {
        slug: "port-st-lucie",
        name: "Port St. Lucie",
        blurb:
          "Growing Port St. Lucie neighborhoods need install, replacement, and reliable clog service from nearby plumbers.",
        zips: ["34952", "34953", "34983", "34986", "34987"],
      },
      {
        slug: "cape-coral",
        name: "Cape Coral",
        blurb:
          "Cape Coral’s canal-side homes and seasonal occupancy create unique demand for leaks, clogs, and emergency toilet help.",
        zips: ["33904", "33909", "33914", "33990", "33991"],
      },
      {
        slug: "tallahassee",
        name: "Tallahassee",
        blurb:
          "Tallahassee’s mix of student housing and established neighborhoods keeps toilet and drain calls steady year-round.",
        zips: ["32301", "32303", "32304", "32308", "32312"],
      },
      {
        slug: "fort-lauderdale",
        name: "Fort Lauderdale",
        blurb:
          "Fort Lauderdale condos and coastal homes need fast leak response and dependable clogged-toilet service.",
        zips: ["33301", "33304", "33308", "33312", "33316"],
      },
    ],
  },
  {
    slug: "arizona",
    name: "Arizona",
    abbr: "AZ",
    blurb:
      "Rapid suburban growth makes Arizona a busy market for toilet installs, running toilets, and emergency clogs.",
    cities: [
      {
        slug: "phoenix",
        name: "Phoenix",
        blurb:
          "Phoenix metro volume is high — clogs, running toilets, and emergency calls across a huge service area.",
        zips: ["85003", "85012", "85016", "85018", "85020"],
      },
      {
        slug: "tucson",
        name: "Tucson",
        blurb:
          "Tucson’s older homes mean flappers, fill valves, and seals need regular attention.",
        zips: ["85701", "85705", "85711", "85716", "85719"],
      },
      {
        slug: "mesa",
        name: "Mesa",
        blurb:
          "Mesa families need dependable local plumbers for replacements, installs, and after-work emergency toilet failures.",
        zips: ["85201", "85202", "85204", "85206", "85210"],
      },
      {
        slug: "chandler",
        name: "Chandler",
        blurb:
          "Chandler’s newer builds still need pro installs and quick clog response when kids, guests, or rentals stress the system.",
        zips: ["85224", "85225", "85226", "85248", "85249"],
      },
      {
        slug: "scottsdale",
        name: "Scottsdale",
        blurb:
          "Scottsdale homeowners expect polished service for luxury fixture installs, quiet replacements, and discreet emergency calls.",
        zips: ["85251", "85254", "85255", "85258", "85260"],
      },
      {
        slug: "gilbert",
        name: "Gilbert",
        blurb:
          "Gilbert’s family neighborhoods generate steady demand for clogged toilets, replacements, and scheduled installs.",
        zips: ["85233", "85234", "85295", "85296", "85298"],
      },
      {
        slug: "glendale",
        name: "Glendale",
        blurb:
          "Glendale’s mix of established and new housing needs reliable leak repair and emergency overflow help.",
        zips: ["85301", "85302", "85304", "85306", "85308"],
      },
      {
        slug: "tempe",
        name: "Tempe",
        blurb:
          "Tempe rentals and student housing see frequent clogs and running toilets — speed and clear pricing matter.",
        zips: ["85281", "85282", "85283", "85284"],
      },
      {
        slug: "peoria",
        name: "Peoria",
        blurb:
          "Peoria homeowners need plumbers for toilet installs, running toilets, and weekend emergencies.",
        zips: ["85345", "85381", "85382", "85383"],
      },
      {
        slug: "surprise",
        name: "Surprise",
        blurb:
          "Surprise’s growing west-valley communities need coverage for replacements, clogs, and new fixture installs.",
        zips: ["85374", "85378", "85379", "85387", "85388"],
      },
    ],
  },
  {
    slug: "utah",
    name: "Utah",
    abbr: "UT",
    blurb:
      "Freezing winters and a lot of homes with finished basements make toilet leaks, worn fill valves, and backups a costly problem in Utah. Send a request from anywhere between Ogden and Utah County and a person reads it; if an independent plumber who covers your area is available, we pass it on.",
    cities: [
      {
        slug: "salt-lake-city",
        name: "Salt Lake City",
        blurb:
          "Salt Lake City mixes century-old homes in the Avenues and Sugar House with newer condos downtown, so calls range from corroded supply lines to clogged main lines.",
        zips: ["84101", "84102", "84103", "84105", "84106", "84108", "84109", "84111", "84115", "84116"],
      },
      {
        slug: "provo",
        name: "Provo",
        blurb:
          "Provo has a high share of rentals and student housing, where shared bathrooms and heavy use wear out flappers and fill valves and clog toilets often.",
        zips: ["84601", "84604", "84606"],
      },
      {
        slug: "orem",
        name: "Orem",
        blurb:
          "Orem's mid-century homes and basement apartments mean older wax rings, seized shut-off valves, and toilets that leak into the room below.",
        zips: ["84057", "84058", "84097"],
      },
      {
        slug: "lehi",
        name: "Lehi",
        blurb:
          "Lehi's fast-growing neighborhoods have lots of newer toilets, where builder-grade fill valves and loose installs are common first repairs.",
        zips: ["84043"],
      },
      {
        slug: "american-fork",
        name: "American Fork",
        blurb:
          "American Fork homeowners deal with worn flappers and clogged rim jets, and with older homes near Main Street that need valve and seal work.",
        zips: ["84003"],
      },
      {
        slug: "sandy",
        name: "Sandy",
        blurb:
          "Sandy's family homes with finished basements make a slow toilet leak or a main-line backup an expensive problem quickly.",
        zips: ["84070", "84092", "84093", "84094"],
      },
      {
        slug: "west-jordan",
        name: "West Jordan",
        blurb:
          "West Jordan's mix of 1970s-1990s homes and new builds means everything from cracked tanks to first-time toilet installs.",
        zips: ["84081", "84084", "84088"],
      },
      {
        slug: "ogden",
        name: "Ogden",
        blurb:
          "Ogden's older housing stock has many original shut-off valves and cast-iron drains, which raise the odds of seized valves and sewer backups.",
        zips: ["84401", "84403", "84404", "84405"],
      },
    ],
  },
];

export function getState(slug: string) {
  return STATES.find((s) => s.slug === slug);
}

export function getCity(stateSlug: string, citySlug: string) {
  const state = getState(stateSlug);
  if (!state) return undefined;
  const city = state.cities.find((c) => c.slug === citySlug);
  if (!city) return undefined;
  return { state, city };
}

export function allCities() {
  return STATES.flatMap((state) =>
    state.cities.map((city) => ({ state, city })),
  );
}

export function findCitiesByQuery(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const zipHit = /^\d{5}$/.test(q);
  return allCities()
    .filter(({ state, city }) => {
      if (zipHit) return city.zips.includes(q);
      return (
        city.name.toLowerCase().includes(q) ||
        city.slug.includes(q) ||
        state.name.toLowerCase().includes(q) ||
        state.abbr.toLowerCase() === q ||
        city.zips.some((z) => z.startsWith(q))
      );
    })
    .slice(0, 12);
}

export function cityPath(stateSlug: string, citySlug: string) {
  return `/locations/${stateSlug}/${citySlug}`;
}

export function cityServicePath(
  stateSlug: string,
  citySlug: string,
  serviceSlug: string,
) {
  return `/locations/${stateSlug}/${citySlug}/${serviceSlug}`;
}
