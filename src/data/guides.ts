export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  readMinutes: number;
  body: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: "why-toilet-keeps-clogging",
    title: "Why your toilet keeps clogging",
    excerpt:
      "Recurring clogs often mean more than too much paper — here’s what pros check first.",
    readMinutes: 5,
    body: [
      "A one-off clog is annoying. A toilet that clogs every week usually has an underlying issue: partial blockage further down the line, a low-flow fixture mismatched to your household, a failing flange, or a venting problem.",
      "Start with the basics: only human waste and toilet paper in the bowl. Wipes labeled “flushable” still cause a large share of residential clogs.",
      "If plunging only helps temporarily, a plumber can snake past the bowl trap and determine whether the clog is local or in the main. Multiple fixtures backing up together is a red flag for a sewer-line issue.",
      "Chronic clogs on an older toilet are sometimes cheaper to solve with a modern replacement than repeated service calls — especially if the trapway is narrow or glazed poorly.",
    ],
  },
  {
    slug: "running-toilet-cost",
    title: "How much a running toilet really costs",
    excerpt:
      "A silent runner can waste hundreds of gallons a month. Spot it early and fix the right part.",
    readMinutes: 4,
    body: [
      "A toilet that never fully shuts off can waste hundreds of gallons per month. You may hear a faint hiss, see ripples in the bowl, or notice the tank warm to the touch from constant refill.",
      "Most running toilets come down to a worn flapper, a mis-set chain, a failing fill valve, or a tank water level set too high so water spills into the overflow tube.",
      "Parts are inexpensive; labor is usually a short visit. Waiting rarely saves money — water bills climb quietly while mineral deposits make the flapper worse.",
      "If dye testing shows a leak from tank to bowl, don’t ignore it. A local plumber can replace the right component and confirm the flush valve seat isn’t damaged.",
    ],
  },
  {
    slug: "when-to-replace-vs-repair",
    title: "Repair or replace your toilet?",
    excerpt:
      "Cracks, rocking bases, and endless part swaps are signals it may be time for a new fixture.",
    readMinutes: 6,
    body: [
      "Repair makes sense for isolated flapper, fill valve, or supply-line issues on a solid, quiet toilet that still flushes well.",
      "Replacement is usually smarter when the bowl or tank is cracked, the toilet rocks because the flange is failed, you’re dealing with repeated clogs on an inefficient model, or a remodel needs a different rough-in or comfort height.",
      "A good install includes inspecting the flange, setting a proper seal, leveling the base, and testing through several flushes. Skipping those steps is how “new” toilets start leaking in a month.",
      "Ask partners for haul-away and whether your shutoff valve should be replaced while the supply is open — old angle stops often seize or drip after disturbance.",
    ],
  },
  {
    slug: "sewer-backup-vs-clog",
    title: "Toilet clog or sewer backup?",
    excerpt:
      "Knowing the difference helps you call the right help before wastewater spreads.",
    readMinutes: 5,
    body: [
      "A simple toilet clog usually affects one fixture. Water rises in the bowl; other sinks and showers still drain normally.",
      "A sewer backup often shows up as multiple fixtures draining slowly, water appearing in a tub when you flush, sewage odor, or a cleanout overflowing outside.",
      "If you suspect a main-line backup, avoid running water elsewhere in the home. Stop using sinks, laundry, and other toilets until a plumber assesses the line.",
      "Emergency partners can stabilize the situation, clear accessible blockages, and recommend camera inspection when roots, grease, or collapse are possible.",
    ],
  },
];

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}
