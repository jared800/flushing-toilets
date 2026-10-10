export type GuideSection = {
  heading: string;
  paragraphs: string[];
  /** Optional ordered steps rendered as a numbered list under the heading. */
  steps?: string[];
};

export type GuideFaq = { question: string; answer: string };

export type Guide = {
  slug: string;
  title: string;
  /**
   * Page <title>. Written for the query, not for the site — the H1 can read
   * naturally while this matches how people actually search.
   */
  metaTitle?: string;
  excerpt: string;
  readMinutes: number;
  /** Legacy flat body. Kept so the four original guides still render. */
  body: string[];
  /** Structured body used by everything written after 2026-08-06. */
  sections?: GuideSection[];
  faqs?: GuideFaq[];
  /** Published/updated date for Article schema. */
  updated?: string;
  /**
   * 40-60 word direct answer shown first on the page. Written so a search
   * snippet or an AI answer can quote it whole without losing meaning.
   */
  answer?: string;
  /** Published sources for any number or fact quoted in the guide. */
  sources?: { label: string; url: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "why-toilet-keeps-clogging",
    answer:
      "A toilet that clogs again and again usually has a partial blockage past the bowl, a low-flow bowl that can't clear what your household sends it, a failing wax seal or flange, or a blocked roof vent. Stop flushing wipes, try a closet auger, and call a plumber if more than one drain is slow.",
    title: "Why your toilet keeps clogging",
    metaTitle: "Why Does My Toilet Keep Clogging? 6 Causes and Fixes",
    excerpt:
      "Recurring clogs usually mean something specific is wrong, not just too much paper. Here's how to work out which, in order of likelihood.",
    readMinutes: 7,
    updated: "2026-10-10",
    body: [],
    sections: [
      {
        heading: "One clog is bad luck. Weekly clogs are a symptom",
        paragraphs: [
          "Every toilet clogs occasionally. A toilet that needs the plunger every few days is telling you something, and plunging harder won't fix it. The causes below are in rough order of how often they turn out to be the answer, from the cheapest to check to the most involved.",
          "Before you start, notice one thing: is it only this toilet, or do other drains in the house also drain slowly or gurgle? If it's only this toilet, the problem is in the toilet or the short pipe right below it. If several fixtures are affected, skip to the last section, because you're probably dealing with the main line.",
        ],
      },
      {
        heading: "1. What's going down it",
        paragraphs: [
          "The most common cause is also the least exciting. \"Flushable\" wipes, paper towels, cotton pads, dental floss and thick quilted paper don't break up the way standard toilet paper does. They snag on each other and on any rough spot in the trap, and each one makes the next clog more likely.",
          "If you have kids, tenants or guests, assume something is going down that you don't know about. A small bin next to the toilet and a quick word solve a surprising number of \"bad toilet\" problems.",
        ],
      },
      {
        heading: "2. A partial blockage the plunger keeps pushing around",
        paragraphs: [
          "If the plunger works every time but the clog keeps coming back within days, something is probably lodged in the trap: a toy, a toothbrush cap, a wad of wipes. The plunger pushes water past it, so the toilet drains, but the object stays and catches the next load.",
          "A closet auger (a toilet snake with a protective rubber sleeve, sold at any hardware store) can reach through the trap and either break up the blockage or hook it. If you feel the auger hit something solid it can't get past, the toilet may need to come off the floor so it can be cleared from below.",
        ],
      },
      {
        heading: "3. An older low-flow toilet that was never very good",
        paragraphs: [
          "Federal rules have limited new toilets to 1.6 gallons per flush since the 1990s, and EPA notes that some of the early low-flow models from that era had performance problems that needed double flushing. If your toilet dates from then and has always been weak, it may simply not have enough flushing power for your household.",
          "Today's toilets are a different story: EPA says WaterSense-labeled models use 1.28 gallons or less and are tested to clear waste from the bowl. Replacing a chronically weak old toilet is often cheaper than paying for repeat service calls. See our toilet installation cost guide for what that runs.",
        ],
      },
      {
        heading: "4. Weak flush from the tank side",
        paragraphs: [
          "Sometimes the bowl is fine and the flush just isn't delivering enough water. Check that the tank fills to the line marked inside it (usually about an inch below the overflow tube), that the flapper chain has only a little slack, and that the small holes under the rim aren't crusted with mineral scale. Hard water, which is common along Utah's Wasatch Front and much of Texas, Arizona and Florida, slowly closes those holes.",
          "Our guide to a toilet that won't flush properly walks through each of these checks.",
        ],
      },
      {
        heading: "5. A blocked vent",
        paragraphs: [
          "Your drain system needs air to flow. Vent pipes run up through the roof so the system can breathe. If a vent is blocked by leaves, a bird's nest or ice, the toilet drains sluggishly and you may hear gurgling in the bowl or a nearby sink when something else drains.",
          "Clearing a roof vent means getting on the roof, which isn't a job worth risking a fall for. If the toilet gurgles and drains slowly but plunging finds no clog, mention the vent when you call a plumber.",
        ],
      },
      {
        heading: "6. The problem is further down the line",
        paragraphs: [
          "If the toilet clogs and other drains are slow too, or the tub gurgles or rises when you flush, the blockage is probably in the main drain or the sewer line to the street. Tree roots, grease and collapsed or sagging pipe are the usual causes. No amount of work on the toilet will fix it.",
          "Stop running water in the house and read our guide to telling a toilet clog from a main sewer line clog. This is the point to call a plumber, who can clear the line from a cleanout and, if it keeps happening, run a camera down it.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why does my toilet clog every time I flush?",
        answer:
          "If it clogs on every flush, something is almost certainly stuck in the trap or the toilet's tank isn't delivering a full flush. Try a closet auger first. If it comes back clean and the tank fills properly, the blockage may be past the toilet, especially if other drains are slow.",
      },
      {
        question: "Can too much toilet paper cause repeated clogs?",
        answer:
          "Yes, especially with older low-flow toilets and thick quilted paper. Try flushing halfway through for big loads, or switch to a paper that breaks up faster. If the clogs keep happening with ordinary use, look for one of the other causes.",
      },
      {
        question: "Should I replace a toilet that keeps clogging?",
        answer:
          "If you've ruled out objects in the trap, the tank fill, the rim jets and the main line, and the toilet is an older weak-flushing model, replacement usually makes sense. A modern WaterSense toilet uses less water per flush and is performance-tested to clear the bowl.",
      },
    ],
    sources: [
      { label: "US EPA WaterSense: Residential toilets", url: "https://www.epa.gov/watersense/residential-toilets" },
    ],
  },
  {
    slug: "running-toilet-cost",
    answer:
      "A running toilet wastes water around the clock, and EPA says household leaks can waste 180 gallons a week, with worn toilet flappers among the most common culprits. The fix is usually a flapper or fill valve costing under twenty dollars. To see your cost, multiply the wasted gallons by your utility's water and sewer rate.",
    title: "How much a running toilet really costs",
    metaTitle: "How Much Does a Running Toilet Cost? (And How to Check)",
    excerpt:
      "A quiet runner can waste a lot of water before you notice. Here's how to estimate what yours is costing, and the cheap part that usually fixes it.",
    readMinutes: 6,
    updated: "2026-10-10",
    body: [],
    sections: [
      {
        heading: "Why a running toilet is easy to ignore and expensive to keep",
        paragraphs: [
          "EPA says toilets are the single biggest source of indoor water use, at nearly 30 percent of an average home's indoor water. They're also a leading source of leaks: EPA puts household leaks at up to 180 gallons a week and says most toilet leaks come from old or worn flappers.",
          "The trouble is that a leaking toilet sends the water straight down the drain. There's no puddle, so the first sign is often an unexplained jump in the water bill. And because most utilities bill sewer based on water use, you pay twice: once for the water and once to treat it.",
        ],
      },
      {
        heading: "How to estimate what yours is costing",
        paragraphs: [
          "We won't give you a made-up dollar figure, because the answer depends entirely on how fast your toilet is leaking and what your utility charges. You can work it out in about an hour.",
        ],
        steps: [
          "Find your water meter (usually in a box near the street, or in the basement or garage in colder areas).",
          "Make sure nothing in the house is using water, then note the meter reading.",
          "Wait an hour without using any water, then read it again. The difference is roughly what is leaking per hour, and the toilet is the usual suspect.",
          "Close the shut-off valve behind the toilet and repeat. If the meter stops moving, the toilet was the leak.",
          "Multiply the hourly loss by 24 for a daily figure and by 30 for a month, then multiply by your utility's combined water and sewer rate (it's printed on your bill, usually per 1,000 gallons).",
        ],
      },
      {
        heading: "Signs it's running even if you can't hear it",
        paragraphs: [
          "A hiss or trickle after the tank should be full. Ripples in the bowl long after a flush. The tank refilling for a few seconds on its own every so often, which is called a phantom flush. A bill noticeably higher than the same month last year with no change in household.",
          "The quickest test: put a few drops of food colouring in the tank and don't flush for 15 minutes. Colour in the bowl means water is leaking past the flapper.",
        ],
      },
      {
        heading: "What fixes it, and what that costs",
        paragraphs: [
          "Most running toilets come down to one of three things: a worn or warped flapper, a fill valve that won't shut off, or the water level set so high that it spills into the overflow tube. A flapper or fill valve is typically under twenty dollars at a hardware store, and EPA describes replacing a flapper as quick and easy.",
          "If you'd rather have a plumber do it, HomeGuide puts typical toilet repair at $130-$300 for parts and labor. Even at the high end, that's usually less than a few months of a steady leak. Our guide to why a toilet keeps running walks through the dye test and each fix step by step.",
        ],
      },
      {
        heading: "When the running toilet is a sign to replace",
        paragraphs: [
          "If you've replaced the flapper and it still runs, the flush valve seat underneath may be pitted or scaled. That's common with hard water, and an all-in-one tank rebuild kit or a new toilet fixes it. Older toilets can use as much as 6 gallons per flush, according to EPA, while WaterSense models use 1.28 or less. EPA estimates a family can save nearly 13,000 gallons a year by replacing old toilets, and many utilities offer rebates.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can a running toilet really raise my water bill?",
        answer:
          "Yes. The water runs continuously and goes straight to the drain, and most utilities bill sewer based on water use, so you pay for it twice. A meter test with the toilet's valve open and then closed tells you how much it's actually costing.",
      },
      {
        question: "Is it OK to leave a running toilet until the weekend?",
        answer:
          "It won't cause damage the way a leak onto the floor would, but it wastes water the whole time. If you can't fix it right away, close the shut-off valve behind the toilet between uses and open it to refill before you flush.",
      },
      {
        question: "Do I need a plumber to fix a running toilet?",
        answer:
          "Usually not. Flappers and fill valves are designed to be replaced by homeowners. Call a plumber if the shut-off valve behind the toilet won't turn or starts leaking when you move it, or if the tank is cracked.",
      },
    ],
    sources: [
      { label: "US EPA WaterSense: Residential toilets", url: "https://www.epa.gov/watersense/residential-toilets" },
      { label: "HomeGuide: Toilet installation and repair costs", url: "https://homeguide.com/costs/toilet-installation-cost" },
    ],
  },
  {
    slug: "when-to-replace-vs-repair",
    answer:
      "Repair a toilet when one part has failed on a solid, quiet fixture: flapper, fill valve, handle, or supply line. Replace it when the bowl or tank is cracked, it rocks because the flange has failed, it clogs constantly, or you need a different height or rough-in. Cracked porcelain cannot be reliably repaired.",
    title: "Repair or replace your toilet?",
    metaTitle: "Repair or Replace a Toilet? How to Decide (With Costs)",
    excerpt:
      "Cracks, rocking bases and endless part swaps are signs it may be time for a new toilet. Here's a straight way to decide, with sourced costs.",
    readMinutes: 7,
    updated: "2026-10-10",
    body: [],
    sections: [
      {
        heading: "The quick rule",
        paragraphs: [
          "Toilets are simple machines. Nearly everything that moves (flapper, fill valve, handle, chain, supply line, wax ring, bolts) is a cheap, standard part designed to be replaced. The porcelain itself rarely fails, but when it does, it can't be fixed.",
          "So repair when the problem is a part, and replace when the problem is the porcelain, the fit, or the toilet's basic design.",
        ],
      },
      {
        heading: "Repair it when...",
        paragraphs: [
          "It runs, refills on its own, or the handle feels loose. These are flapper, fill valve and handle problems, and any homeowner can usually fix them for under twenty dollars in parts.",
          "It leaks at the base only after flushing. That's usually the wax ring, which means lifting the toilet and resetting it on a new ring. It's a repair, not a replacement, unless the flange underneath is broken.",
          "It leaks from the supply line or the shut-off valve. Supply lines are cheap. An old shut-off valve that drips when turned is worth replacing while the water is off anyway.",
          "HomeGuide puts typical toilet repair at $130-$300 for parts and labor when a plumber does it.",
        ],
      },
      {
        heading: "Replace it when...",
        paragraphs: [
          "The bowl or tank is cracked. A hairline crack above the waterline may be cosmetic, but a crack below it, or one that weeps, will eventually fail, sometimes suddenly. Epoxy is not a permanent fix for porcelain that holds water under pressure.",
          "It rocks and keeps breaking the seal. A toilet that rocks has usually damaged its flange or the floor underneath. Sometimes that's a flange repair, but if the floor is soft, the toilet has to come up anyway, and it's a natural time to replace an old one.",
          "It clogs or flushes weakly no matter what you fix. Some early low-flow toilets simply weren't good, as EPA itself acknowledges. A modern WaterSense model is performance-tested and uses 1.28 gallons per flush or less.",
          "You're remodeling, or you need a different height or rough-in. Comfort-height toilets and different rough-in sizes (the distance from the wall to the floor bolts, usually 12 inches) mean a new fixture.",
        ],
      },
      {
        heading: "What replacing costs",
        paragraphs: [
          "National cost guides put a professional toilet replacement at roughly $224-$533 for installation (Angi, 2026; average about $374), or $350-$800 including a standard toilet (HomeGuide; average about $600). Removal and disposal of the old one adds $50-$200, and a damaged flange or floor adds more. Our toilet installation cost guide breaks these numbers down.",
        ],
      },
      {
        heading: "What a good replacement includes",
        paragraphs: [
          "A good install includes checking the flange, setting a new wax ring or foam seal, leveling the toilet so it doesn't rock, connecting a new supply line, and testing through several flushes. Skipping those steps is how a \"new\" toilet starts leaking within a month.",
          "Ask whether the quote includes haul-away and whether your shut-off valve should be replaced while the water is off. Old valves often seize or drip once they've been disturbed.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long do toilets last?",
        answer:
          "The porcelain can last decades. HomeGuide says most toilets last 10 to 20 years and some 50 or more, while the internal parts (flapper, fill valve, wax seal) wear out much sooner and are meant to be replaced. Angi suggests replacing a toilet at least every 25 years.",
      },
      {
        question: "Is it worth repairing an old toilet?",
        answer:
          "If it flushes well and the porcelain is sound, yes. Parts are cheap. If it's an older high-volume or weak-flushing model, replacing it can pay back in water savings: EPA estimates nearly 13,000 gallons a year for an average family switching to WaterSense toilets.",
      },
      {
        question: "Can a cracked toilet tank be repaired?",
        answer:
          "Not reliably. Sealants can slow a weep, but a tank or bowl that holds water under pressure and is cracked should be replaced before it fails and floods the floor.",
      },
    ],
    sources: [
      { label: "Angi: Toilet installation cost (2026)", url: "https://www.angi.com/articles/how-much-does-toilet-installation-cost.htm" },
      { label: "HomeGuide: Toilet installation cost", url: "https://homeguide.com/costs/toilet-installation-cost" },
      { label: "US EPA WaterSense: Residential toilets", url: "https://www.epa.gov/watersense/residential-toilets" },
    ],
  },

  // ---------------------------------------------------------------------
  // Problem-first guides, added 2026-08-06.
  //
  // These target the queries people actually type when a toilet misbehaves,
  // which the Ahrefs pull on 2026-08-06 showed is where the volume is:
  // national, symptom-shaped, and low difficulty. The city x service pages
  // target phrases nobody searches ("clogged toilet houston" is 0-10/mo).
  // Each one answers the question honestly first and mentions a plumber only
  // where a plumber is genuinely the right call.
  // ---------------------------------------------------------------------
  {
    slug: "how-to-unclog-a-toilet",
    answer:
      "Use a flange plunger, not a flat cup plunger. Seal it over the drain opening, push down gently first to push the air out, then pump firmly ten to fifteen times without breaking the seal. If that fails twice, use a closet auger. Never use chemical drain cleaner in a toilet.",
    title: "How to unclog a toilet",
    metaTitle: "How to Unclog a Toilet (Without a Plumber, in Most Cases)",
    excerpt:
      "The plunger technique most people get wrong, what to do when it fails, and the one product to keep away from your toilet.",
    readMinutes: 7,
    updated: "2026-08-06",
    body: [],
    sections: [
      {
        heading: "First: stop flushing",
        paragraphs: [
          "The instinct when a toilet doesn't go down is to flush again. Don't. The bowl holds a fixed amount before it goes over the rim, and a second flush sends another few litres into a fixture that has nowhere to put it. If the water is already near the top, take the lid off the tank and push the flapper down by hand to stop the refill.",
          "Then wait. Twenty minutes of doing nothing solves a surprising number of clogs on its own, as water works past the obstruction and the level drops. It also makes everything that follows less messy.",
        ],
      },
      {
        heading: "Use the right plunger, and use it properly",
        paragraphs: [
          "Most failed plunging is a tool problem. The classic red cup-shaped plunger is designed for a flat sink drain and cannot seal a toilet. What you want is a flange plunger: it has a soft rubber sleeve that folds out from inside the cup and seats into the toilet's drain opening. They cost about ten dollars and every hardware store has them.",
          "The second mistake is plunging air. If the bowl is nearly empty, the plunger just compresses air, which does nothing. You need enough water in the bowl to cover the cup completely, because it is the water that transmits force down into the trap.",
        ],
        steps: [
          "Pull the flange sleeve out of the cup and seat it into the drain hole at the bottom of the bowl.",
          "Make sure there is enough water to cover the cup. Add some from a bucket if you need to.",
          "Push down slowly the first time — that pushes out trapped air and sets the seal without splashing.",
          "Then pump firmly 10 to 15 times without breaking the seal. The pull stroke matters as much as the push.",
          "On the last stroke, yank straight up sharply to break the seal.",
          "Repeat the whole cycle two or three times before you conclude it hasn't worked.",
        ],
      },
      {
        heading: "Do not reach for chemical drain cleaner",
        paragraphs: [
          "It is the most common bad advice on this subject. Chemical cleaner is formulated for hair and grease in a narrow sink line. A toilet clog is usually paper, waste, or an object, sitting behind a large water-filled trap that dilutes the chemical before it ever reaches the blockage.",
          "What it reliably does is sit in the bowl as a hazard. If the clog doesn't clear and someone has to pull the toilet or auger it, they are now working with caustic liquid that can splash. Plumbers ask about it for a reason, and some will refuse the job.",
        ],
      },
      {
        heading: "When plunging fails: the toilet auger",
        paragraphs: [
          "A toilet auger — sometimes called a closet auger — is a short cable in a rigid tube with a rubber boot on the end that protects the porcelain. It is the correct tool for a clog sitting in the trapway, past where a plunger can reach.",
          "This is not the same as a drain snake. A bare drain snake from a hardware store will scratch the glaze and can crack a bowl outright, and a cracked bowl turns a thirty-dollar problem into a full replacement.",
        ],
        steps: [
          "Feed the auger in with the boot resting in the drain opening, and crank the handle clockwise as you advance.",
          "Never force it. If it stops hard, back off and re-feed rather than pushing through.",
          "When you feel it break through, work it back and forth a few times before withdrawing.",
          "Flush once and watch. If it drains normally, flush twice more to confirm.",
        ],
      },
      {
        heading: "How to unclog a toilet without a plunger",
        paragraphs: [
          "No plunger in the house? These work on ordinary paper-and-waste clogs. None of them will move a solid object like a toy, so if you suspect one, skip to the next section.",
          "Whatever you try, protect the floor with towels first and don't flush to test it until the water level in the bowl has dropped on its own.",
        ],
        steps: [
          "Dish soap and hot water: squeeze a generous amount of dish soap into the bowl and let it sink for 10 to 15 minutes. Then pour in a bucket of hot tap water from waist height. Use hot, not boiling: boiling water can crack porcelain.",
          "Wait it out: if nothing is urgent, leave it for an hour or overnight. Paper clogs often soften and drain on their own.",
          "Wire coat hanger: straighten one, wrap the end in a rag and tape it so it can't scratch the bowl, then work it gently into the drain opening to break up the clog. It only reaches a few inches, so it helps only if the clog is near the opening.",
          "Wet/dry shop vacuum: if you have one (never an ordinary household vacuum), empty the bowl into a bucket, push the hose into the drain opening, wrap a towel around it for a seal, and suck the clog back out.",
          "Buy a flange plunger or closet auger: honestly, this is the fix. Both are cheap and available at any hardware store, and they work when none of the above do.",
        ],
      },
      {
        heading: "If you suspect an object rather than a blockage",
        paragraphs: [
          "Toys, toothbrushes, phones and cleaning-wand heads behave differently from a paper clog: the water often drains slowly rather than not at all, and plunging may work briefly before failing again as the object shifts back into place.",
          "An auger tends to push an object further in rather than retrieve it. If a child could plausibly have put something in the toilet, say so when you call someone — the fix is usually lifting the toilet off the floor, which is a different job from clearing a clog, and knowing in advance saves a wasted visit.",
        ],
      },
      {
        heading: "The signal that it isn't your toilet at all",
        paragraphs: [
          "Before you spend another hour on this, check the rest of the house. Run the bathroom sink and the tub. Flush a toilet on another floor if you have one.",
          "If flushing this toilet makes a nearby tub gurgle, or other drains have gone slow, the blockage is not in the toilet — it is in the line that both fixtures share, downstream of everything. Plunging cannot help with that and can make the mess worse. Stop using water in the house and get a plumber out, because the next stage is usually wastewater coming up through the lowest drain in the building.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do you unclog a toilet without a plunger?",
        answer:
          "For an ordinary paper clog, squirt dish soap into the bowl, wait 10-15 minutes, then pour in a bucket of hot (not boiling) tap water. Waiting an hour also works surprisingly often. If neither works, a flange plunger or closet auger is the real fix.",
      },
      {
        question: "Can boiling water unclog a toilet?",
        answer:
          "Don't use boiling water. The sudden heat can crack the porcelain bowl. Hot tap water with dish soap does the same job safely.",
      },
      {
        question: "Will a clogged toilet eventually unclog itself?",
        answer:
          "Sometimes. Waste and toilet paper break down in water, so a soft clog often clears on its own within a few hours, and letting the bowl sit is a legitimate first move. An object, a wipe, or anything fibrous will not break down and will not clear itself no matter how long you wait.",
      },
      {
        question: "Does dish soap and hot water actually work?",
        answer:
          "For a soft paper clog it can help. Soap lubricates and warm water helps break the paper down. Use hot tap water, never boiling — boiling water poured into a cold porcelain bowl can crack it, and a cracked bowl means a new toilet.",
      },
      {
        question: "Why does my toilet clog every week?",
        answer:
          "Repeated clogs in the same toilet point at something structural rather than at what is being flushed: a partial blockage further down the branch line, roots in the lateral, or an early low-flow fixture that never had the flush volume for the household. Clearing it repeatedly costs more over a year than a camera inspection that finds the cause.",
      },
      {
        question: "Are flushable wipes safe to flush?",
        answer:
          "No. They pass through the toilet but do not break apart the way toilet paper does, and they are one of the leading causes of both household clogs and municipal sewer problems. The label describes what fits down the pipe, not what dissolves.",
      },
    ],
  },
  {
    slug: "why-is-my-toilet-running",
    answer:
      "A toilet runs because water is escaping past a worn flapper, the fill valve isn't shutting off, or the water level is set above the overflow tube. Put food colouring in the tank and wait fifteen minutes: colour in the bowl means the flapper, no colour means the fill valve or level.",
    title: "Why your toilet keeps running",
    metaTitle: "Why Is My Toilet Running? The 15-Minute Fix (and the Dye Test)",
    excerpt:
      "A running toilet is almost always one of three cheap parts. Here's the test that tells you which, in fifteen minutes.",
    readMinutes: 6,
    updated: "2026-08-06",
    body: [],
    sections: [
      {
        heading: "Why it matters more than it sounds",
        paragraphs: [
          "A toilet that never quite shuts off is easy to live with and easy to ignore. It shouldn't be. It is one of the few household faults that costs money continuously and silently, and because the water goes straight down the drain there is no puddle to remind you.",
          "The good news is that it is nearly always one of three parts, all of them under twenty dollars, and all of them replaceable in under half an hour with no specialist tools.",
        ],
      },
      {
        heading: "The dye test tells you which part it is",
        paragraphs: [
          "Before buying anything, spend fifteen minutes narrowing it down. This is what a plumber would do first and it costs nothing.",
        ],
        steps: [
          "Take the tank lid off and set it somewhere safe — they crack easily.",
          "Put a few drops of food colouring, or a dye tablet, into the tank water.",
          "Wait fifteen minutes and do not flush.",
          "Look in the bowl. Colour in the bowl means water is escaping past the flapper.",
          "No colour, but still hissing or refilling, points at the fill valve.",
          "Water visibly running into the open vertical tube in the middle of the tank means the level is set too high.",
        ],
      },
      {
        heading: "If colour reached the bowl: the flapper",
        paragraphs: [
          "The flapper is the rubber disc at the bottom of the tank that lifts when you flush and drops back to seal. Rubber hardens with age and minerals build up on the seat it lands on, and eventually it stops sealing. This is the single most common cause of a running toilet.",
          "The one thing to get right is matching the part. Flappers are not universal — the two-inch and three-inch types look almost identical until you try to fit the wrong one. Take the old one to the store with you.",
        ],
        steps: [
          "Shut the water off at the valve behind the toilet and flush to empty the tank.",
          "Unclip the old flapper from the two pegs and unhook the chain.",
          "Wipe the seat it lands on with a cloth — grit there will defeat a brand-new flapper.",
          "Clip the new one on and set the chain with about half an inch of slack.",
          "Turn the water back on, let it fill, and run the dye test again to confirm.",
        ],
      },
      {
        heading: "If no colour reached the bowl: the fill valve",
        paragraphs: [
          "The fill valve is the tall assembly, usually on the left, that refills the tank after each flush. When its internal seal wears, it never fully shuts off, so you get a persistent hiss or a toilet that cycles every few minutes for no reason.",
          "Unlike flappers, fill valves genuinely are close to universal, so replacement is straightforward.",
        ],
        steps: [
          "Shut off the supply and flush, then sponge out the last inch of water so it doesn't end up on the floor.",
          "Disconnect the supply line and undo the lock nut underneath the tank.",
          "Lift the old valve out and fit the new one, setting its height so shut-off lands about an inch below the top of the overflow tube.",
          "Reconnect, turn the water on slowly, and watch one full cycle.",
        ],
      },
      {
        heading: "If water is pouring into the overflow tube",
        paragraphs: [
          "Nothing has failed. The tank is simply filling past the point where it can hold, so the excess spills into the central overflow tube and the toilet runs forever trying to reach a level it can never keep.",
          "Find the adjustment on your fill valve — a plastic screw on top on modern ones, a clip on a metal rod on older ball-float designs — and lower the shut-off until the water stops about an inch below the top of that tube. If it will not hold any setting, the valve itself is worn and should be replaced.",
        ],
      },
      {
        heading: "The one thing that should make you stop",
        paragraphs: [
          "All of this depends on the shut-off valve behind the toilet actually closing. Old angle stops seize, and a seized valve that you force can snap or start weeping in a way that will not stop.",
          "If the valve won't turn, or starts dripping once you've moved it, stop there and call someone. The alternative is finding your house main in a hurry.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I stop my toilet from running right now?",
        answer:
          "Take the tank lid off and lift the float arm or float cup up. If the water stops, the fill valve or water level is the problem. If you need it to stop completely, turn the shut-off valve behind the toilet clockwise until it closes.",
      },
      {
        question: "Why does my toilet keep running after I replaced the flapper?",
        answer:
          "The usual reasons: the new flapper is the wrong size (2-inch and 3-inch flush valves need different flappers), the chain is too short and holds it open, the flush valve seat under the flapper is scaled or pitted, or the water level is still above the overflow tube.",
      },
      {
        question: "Is it bad if my toilet keeps running?",
        answer:
          "It won't flood the house, but it wastes water constantly and usually gets worse. EPA says household leaks can waste 180 gallons a week and that worn flappers cause most toilet leaks. Fix it soon.",
      },
      {
        question: "Do I need a plumber for a running toilet?",
        answer:
          "Usually not. Flappers and fill valves are made to be replaced by homeowners in under half an hour. Call a plumber if the shut-off valve won't close or starts dripping, or if the tank is cracked.",
      },
      {
        question: "How much water does a running toilet waste?",
        answer:
          "It depends entirely on how badly it is leaking, from a slow seep past a flapper to a continuous flow into the overflow. Because the water goes straight to the drain there is no visible sign, which is why the first indication is usually an unexpected bill. If your dye test showed colour in the bowl, it is leaking around the clock.",
      },
      {
        question: "Can I just replace the whole tank mechanism?",
        answer:
          "Yes, and it is often the sensible move on an older toilet. All-in-one repair kits replace the flapper, fill valve and overflow together for not much more than the individual parts, and they save you diagnosing it twice if a second component is close to failing.",
      },
      {
        question: "Why does my toilet run for a few seconds every so often?",
        answer:
          "That is called phantom flushing, and it is a slow flapper leak. The tank level drops gradually as water seeps past into the bowl, and when it drops far enough the fill valve kicks in to top it up. It is the same fix as a continuously running toilet: replace the flapper.",
      },
    ],
  },
  {
    slug: "toilet-wont-flush",
    answer:
      "If the toilet isn't clogged but won't flush or flushes weakly, check the tank first: a loose handle or chain, a water level set too low, or a flapper closing early. Then check under the rim, where mineral scale blocks the rinse holes, and the siphon jet at the bottom of the bowl.",
    title: "Toilet won't flush properly",
    metaTitle: "Toilet Won't Flush But Isn't Clogged? Here's What to Check",
    excerpt:
      "When nothing is blocked but the flush is weak, the cause is usually in the tank or under the rim — and both are things you can check yourself.",
    readMinutes: 6,
    updated: "2026-08-06",
    body: [],
    sections: [
      {
        heading: "How a flush actually works",
        paragraphs: [
          "Understanding this makes the diagnosis obvious. A toilet does not push waste down with pressure. It drops a tankful of water into the bowl fast enough that the bowl overfills its own trap, which starts a siphon, and the siphon pulls everything out.",
          "That means a flush needs two things: enough water, and enough speed. Lose either and you get a lazy flush that leaves the bowl dirty and clogs at the slightest provocation — with nothing actually blocked.",
        ],
      },
      {
        heading: "Check one: does the tank fill all the way?",
        paragraphs: [
          "Take the lid off and watch a full cycle. The water should stop about an inch below the top of the overflow tube. If it stops well short of that, you simply do not have the volume for a proper flush.",
          "Raise the fill valve setting and test again. And if there is a brick or a bottle in the tank — a water-saving trick that was popular for decades — take it out. It saves a little per flush and causes double-flushing, which saves nothing and wastes more.",
        ],
      },
      {
        heading: "Check two: does the flapper stay open long enough?",
        paragraphs: [
          "Flush with the lid off and watch the flapper. It should swing fully open and stay up until most of the tank has emptied, then drop.",
          "If it slams shut early, the flush is cut off partway. Usually the chain has too much slack, so the flapper never lifts far enough to catch and hold. Adjust it to about half an inch of slack. If the flapper is old and waterlogged it can also sink too early, in which case replace it.",
        ],
      },
      {
        heading: "Check three: the rim jets",
        paragraphs: [
          "This is the one almost nobody checks, and in hard-water areas it is the most likely culprit on an older toilet. Water enters the bowl through small holes under the rim, and on most designs through one larger jet at the bottom front. In hard water these scale over with mineral deposits.",
          "The tank empties perfectly, but the water arrives too slowly and too gently to start the siphon. The tell is a flush that dribbles around the bowl rather than swirling hard, and a ring of the bowl that never quite gets clean.",
        ],
        steps: [
          "Hold a small mirror under the rim and look at the holes. Chalky white crust is your answer.",
          "Shut off the water and flush to empty the bowl.",
          "Pour white vinegar down the overflow tube in the tank — it distributes around the rim channel rather than running straight out.",
          "Leave it an hour, then clear each hole gently with a bent piece of stiff wire or a small Allen key.",
          "Turn the water back on and flush several times to clear the debris.",
        ],
      },
      {
        heading: "Weak flush, or not flushing all the way",
        paragraphs: [
          "A toilet that flushes but leaves waste behind, or needs two flushes, almost always has one of these problems. Work through them in order; the first three take a minute each.",
        ],
        steps: [
          "Tank water too low: the water should come up to the fill line marked inside the tank, usually about an inch below the top of the overflow tube. Raise it with the adjustment screw or clip on the fill valve.",
          "Flapper closing too early: if the chain has a lot of slack, or the flapper has an adjustable dial, the tank may only half-empty. Give the chain about half an inch of slack and set any dial to its fullest setting.",
          "Clogged rim jets: hard water leaves scale in the small holes under the rim and in the siphon jet at the bottom of the bowl. Use a mirror to look under the rim; if the holes are crusted, scrub them and poke them clear with a small wire or Allen key.",
          "A partial clog in the trap: if the bowl fills higher than normal then drains slowly, something is partly blocking the trap. Use a flange plunger or closet auger.",
          "A blocked vent: gurgling plus a weak flush with no clog found often means the roof vent is blocked. That's a job for a plumber.",
        ],
      },
      {
        heading: "When it is the toilet itself",
        paragraphs: [
          "If the tank fills correctly, the flapper behaves, and the jets are clear, and the flush is still weak, you may simply have a toilet that never flushed well. The first generation of low-flow toilets from the mid-nineties dropped the water volume without redesigning the bowl, and many of them are genuinely poor performers.",
          "No amount of adjustment fixes a bad design. If you are servicing the same toilet repeatedly and it clogs constantly, replacing it usually costs less over a couple of years than continuing to work around it.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why does my toilet flush slowly but not clog?",
        answer:
          "Nearly always a water delivery problem rather than a blockage. Either the tank is not filling high enough, the flapper is closing before the tank empties, or mineral scale under the rim is slowing the water entering the bowl. All three are checkable in a few minutes with the tank lid off and a mirror.",
      },
      {
        question: "Why do I have to hold the handle down to flush?",
        answer:
          "The chain between the handle arm and the flapper has too much slack, so the flapper only lifts while you hold it. Shorten the chain to about half an inch of slack. If the handle itself spins loosely, tighten the nut inside the tank — on most toilets it is reverse-threaded, so it tightens counter-clockwise.",
      },
      {
        question: "Is a weak flush a sign of a sewer problem?",
        answer:
          "Usually not on its own — a weak flush with everything else in the house draining normally points at the toilet. But if the bowl also drains slowly, or a nearby tub or sink gurgles when you flush, that combination suggests a partial blockage or venting problem further down the line and is worth having looked at.",
      },
    ],
  },
  {
    slug: "toilet-leaking-at-base",
    answer:
      "Water at the base of a toilet comes from one of four places: a failed wax ring, loose closet bolts, a leaking supply line or tank bolts dripping down the outside, or condensation. Dry everything, lay paper towel around the base, and see where it gets wet first before you fix anything.",
    title: "Water around the base of the toilet",
    metaTitle: "Toilet Leaking at the Base? Find the Source Before You Fix It",
    excerpt:
      "Four different faults look identical on the floor. Ten minutes with paper towel tells you which one you have.",
    readMinutes: 6,
    updated: "2026-08-06",
    body: [],
    sections: [
      {
        heading: "Find the source before you buy anything",
        paragraphs: [
          "Water on the floor around a toilet has four common causes, and they need four different fixes ranging from free to a full replacement. Guessing wastes an afternoon, so spend ten minutes identifying it properly.",
          "Dry the floor and the whole toilet completely. Lay dry paper towel all the way around the base and behind it, under the supply line. Then flush once and wait a few minutes. Where the paper wets first is your answer.",
        ],
      },
      {
        heading: "Wet only after a flush, appearing under the base: the wax seal",
        paragraphs: [
          "The toilet sits on a wax ring that seals it to the drain flange in the floor. When that ring fails, each flush pushes a little water out under the base. The tell is that it is dry between flushes and wet shortly after one.",
          "This is the serious one, not because the repair is hard but because of where the water goes. Most of it does not appear on your floor — it goes into the subfloor, and rotted subfloor and joists cost many times what the repair does. If the floor near the toilet feels soft or springy, mention that when you call, because the scope is now bigger than a seal.",
          "It is a competent DIY job: shut off water, drain, disconnect, unbolt, lift, scrape, new ring, reset. But a wax ring that is seated slightly wrong leaks invisibly for months and you will not know until the damage is done. Most people should hand this one over, and should ask whoever does it to inspect the flange while the toilet is off.",
        ],
      },
      {
        heading: "Wet behind the toilet, all the time: the supply line",
        paragraphs: [
          "If the paper towel behind the toilet wets first, and it happens regardless of flushing, the leak is in the supply — either the braided hose, one of its two connections, or the shut-off valve on the wall.",
          "This is the friendliest outcome on the list. Dry it, run a finger along the hose and both connections to find the exact point, and snug the connection gently — hand tight plus about a quarter turn. Do not crank it; the plastic nut on the tank side cracks easily. If the hose itself is weeping rather than the joint, replace it. A braided stainless line costs about ten dollars, and a burst one floods a house, so it is worth changing an old one on principle.",
        ],
      },
      {
        heading: "Wet between tank and bowl",
        paragraphs: [
          "Water appearing at the join where the tank meets the bowl runs down the back and pools at the base, which makes it look like a base leak. The cause is either loose tank bolts or a flattened tank-to-bowl gasket.",
          "Shut off the supply, flush, sponge the tank dry, and snug the bolts from inside the tank — alternating sides a little at a time so it seats evenly, and stopping well short of hard. Porcelain does not forgive over-tightening. If even tightening does not stop it, the gasket needs replacing, which means lifting the tank off the bowl and is a reasonable point to call someone.",
        ],
      },
      {
        heading: "Condensation, which is not a leak at all",
        paragraphs: [
          "In humid weather, cold water in the tank chills the porcelain below the dew point and the outside of the tank sweats. The drips run down and puddle at the base, looking exactly like a leak.",
          "The test is simple: if the outside of the tank is uniformly damp and cold to the touch, and the puddle is worst in summer or after several flushes in a row, it is condensation. An insulating tank liner or a mixing valve solves it. Nothing is broken.",
        ],
      },
      {
        heading: "If the toilet rocks",
        paragraphs: [
          "A toilet should not move at all when you sit on it or push it side to side. Rocking means the flange it bolts to has broken, corroded, or pulled out of the floor.",
          "Do not fix a rocking toilet with shims alone. Shims stop the wobble you can feel while the flange keeps deteriorating underneath, and each rock works the wax seal a little looser — so a rocking toilet reliably becomes a leaking toilet. Check whether the closet bolts at the base are simply loose first, but if the movement is coming from the flange, that needs proper repair.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I just caulk around the base to stop the leak?",
        answer:
          "Caulking the base is normal practice, but it is not a repair for a failed seal — it stops mop water getting underneath and holds the toilet steady. Caulking over an active wax-ring leak traps the water under the toilet where you cannot see it, which is worse than the visible puddle. Fix the seal, then caulk, and leave a gap at the back so any future leak still shows itself.",
      },
      {
        question: "How urgent is a leaking toilet base?",
        answer:
          "More urgent than it looks. The visible water is a fraction of what is escaping; the rest goes into the subfloor. Stop using that toilet until it is fixed. If the floor around it already feels soft, the damage has started and it should be looked at within days rather than weeks.",
      },
      {
        question: "How long does a wax ring last?",
        answer:
          "Typically decades if the toilet is stable and never moves. They fail early when a toilet rocks, when it has been reset without replacing the ring, or when the flange sits too low relative to a floor that has had tile added on top of it.",
      },
    ],
  },
  {
    slug: "sewer-backup-vs-clog",
    metaTitle: "Main Sewer Line Clog or Just a Toilet Clog? How to Tell",
    answer:
      "A toilet clog affects one toilet; other drains work. A main sewer line clog shows up in several places: the tub or shower fills when you flush, floor drains gurgle, or the lowest drain in the house backs up first. If more than one fixture is affected, stop using water and call a plumber.",
    title: "Toilet clog or sewer backup?",
    excerpt:
      "Knowing the difference tells you whether to grab the plunger or stop using water and call a plumber, before wastewater spreads.",
    readMinutes: 8,
    updated: "2026-10-10",
    body: [],
    sections: [
      {
        heading: "The one question that tells you which it is",
        paragraphs: [
          "Is it only this toilet? Every drain in your house feeds into one main line that runs out to the city sewer or your septic tank. A clog in the toilet itself affects just that toilet. A clog in the main line affects everything upstream of it, and water from one fixture starts coming up through another.",
          "So before you plunge, run the bathroom sink for ten seconds and watch the toilet and the tub. Then check the lowest drain in the house, such as a basement floor drain, shower or laundry standpipe. If they're all fine, you have a toilet clog. If water appears where it shouldn't, stop.",
        ],
      },
      {
        heading: "Signs of a main sewer line clog",
        paragraphs: [
          "The tub or shower fills or gurgles when you flush the toilet. Several drains are slow at the same time. A basement floor drain or the lowest shower backs up first, because water finds the lowest opening. Sewage smell from drains. Water bubbling up from the cleanout pipe in the yard or basement. The washing machine draining causes the toilet to rise.",
          "Any one of these, together with a clogged toilet, points to the main line rather than the toilet.",
        ],
      },
      {
        heading: "What to do right now",
        paragraphs: [],
        steps: [
          "Stop using water everywhere in the house: no flushing, showers, dishwasher or laundry. Every gallon you send down has nowhere to go but up the lowest drain.",
          "Don't plunge hard. Plunging a toilet against a main-line clog can push sewage out of the tub or floor drain instead.",
          "Keep people and pets away from any backed-up water. Sewage carries bacteria, and you shouldn't clean it up barehanded.",
          "Find your cleanout, a capped pipe (often 3 to 4 inches wide) in the yard near the house, in a basement or crawlspace, or on an outside wall. A plumber will want to know where it is. Don't open it yourself if it's under pressure; it can spray.",
          "Call a plumber. A main-line clog needs a powered drain machine through the cleanout, which isn't a homeowner tool.",
          "Take photos if water has reached floors or walls. You'll want them if you make an insurance claim.",
        ],
      },
      {
        heading: "What causes main line clogs",
        paragraphs: [
          "Tree roots are the classic cause in older neighborhoods. They find tiny gaps in older clay or cast-iron joints, grow into the pipe and catch everything that passes. Grease poured down the kitchen sink cools and coats the pipe until it closes. Wipes, even \"flushable\" ones, snag on roots and joints and build up. Settled or broken pipe can create a low spot (called a belly) where waste collects, or a section can collapse entirely.",
          "Sometimes the problem is the city's main, not yours. If neighbors are having the same problem at the same time, call your city or sewer district too.",
        ],
      },
      {
        heading: "Whose problem is it: yours or the city's?",
        paragraphs: [
          "In most places, the homeowner is responsible for the sewer lateral, the pipe from the house to where it joins the public main, and the city is responsible for the main itself. The exact dividing line varies by city and sometimes by property line, so check with your city or sewer district. If the plumber finds the blockage is in the public main, the city usually handles it.",
        ],
      },
      {
        heading: "What clearing a main line costs",
        paragraphs: [
          "National guides put emergency sewer line work at $500-$3,800, depending on whether it's a simple obstruction cleared with a snake or a broken line that needs partial replacement (HomeGuide). Angi lists main sewer line clog repair at $1,325-$5,000. The spread is wide because a root clog cleared through a cleanout and a collapsed pipe that has to be dug up are very different jobs.",
          "If it keeps happening, ask for a camera inspection. It shows whether you have roots, grease, a belly or a break, so you're paying to fix the cause rather than clearing the same clog every few months.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I know if my main sewer line is clogged?",
        answer:
          "Look for more than one fixture affected at once: the tub fills when you flush, several drains are slow, or the lowest drain in the house backs up first. A clog that affects only one toilet is almost always in the toilet itself.",
      },
      {
        question: "Can I unclog a main sewer line myself?",
        answer:
          "It's not a good idea. Clearing a main line needs a powered drain machine through the cleanout, and opening a cleanout with sewage backed up behind it can spray. Stop using water and call a plumber.",
      },
      {
        question: "Does homeowners insurance cover a sewer backup?",
        answer:
          "It depends on your policy. HomeGuide notes that insurance typically covers sudden events but not damage from neglect, and many policies need a separate sewer or water backup endorsement. Check your policy, document everything with photos, and call your insurer early.",
      },
      {
        question: "Is a sewer backup an emergency?",
        answer:
          "Yes, if sewage is coming into the house. It's a health hazard and the damage spreads the longer water keeps flowing. Stop using water immediately; a plumber can usually clear the line the same day.",
      },
    ],
    sources: [
      { label: "HomeGuide: Emergency plumber cost", url: "https://homeguide.com/costs/emergency-plumber-cost" },
      { label: "Angi: Emergency plumber cost (2026)", url: "https://www.angi.com/articles/emergency-plumber-cost.htm" },
    ],
  },
  // ---------------------------------------------------------------------
  // Low-competition symptom guides, added 2026-10-09 from an Ahrefs US pull
  // (Keywords Explorer overview, 2026-10-09). Volumes are monthly US.
  // ---------------------------------------------------------------------
  {
    // "toilet tank not filling" 3,700/mo KD 0; "toilet tank filling slowly" 600/mo KD 0
    slug: "toilet-tank-not-filling",
    title: "Toilet tank not filling (or filling slowly)",
    metaTitle: "Toilet Tank Not Filling or Filling Slowly? 5 Causes",
    excerpt:
      "A tank that won't refill, or takes minutes to do it, is nearly always the supply valve, the fill valve, or debris in the valve. Here's the order to check.",
    answer:
      "A toilet tank that won't fill, or fills slowly, is usually a partly closed shut-off valve, a fill valve clogged with sediment, a float set too low, or a kinked supply line. Open the valve behind the toilet fully, flush the fill valve to clear debris, and replace the fill valve if it still won't refill.",
    readMinutes: 5,
    updated: "2026-10-09",
    body: [],
    sections: [
      {
        heading: "Check the shut-off valve first",
        paragraphs: [
          "The oval handle on the wall behind the toilet controls all the water going into the tank. If someone turned it during a repair, or it has been bumped, it may be only partly open. Turn it counter-clockwise until it stops.",
          "If the valve won't move, don't force it. Old valves can snap or start leaking at the stem. That is a good reason to call a plumber.",
        ],
      },
      {
        heading: "Clear debris from the fill valve",
        paragraphs: [
          "Sediment and mineral flakes collect in the small opening at the top of the fill valve, especially in hard-water areas. The water still comes in, just slowly.",
        ],
        steps: [
          "Turn the water off at the shut-off valve.",
          "Remove the cap on top of the fill valve (on most modern valves, press down and twist a quarter turn).",
          "Hold a cup upside down over the open valve so you don't spray the ceiling.",
          "Turn the water on for a few seconds to flush grit out, then off again.",
          "Refit the cap, turn the water on, and watch it fill.",
        ],
      },
      {
        heading: "Check the float and water level",
        paragraphs: [
          "If the tank fills but stops well short, the float is set too low. Adjust the screw or clip on the fill valve until the water stops about an inch below the top of the overflow tube.",
          "A float rubbing against the tank wall or the flush valve can stick and shut the water off early. Make sure it moves freely.",
        ],
      },
      {
        heading: "Look at the supply line",
        paragraphs: [
          "The flexible hose from the valve to the tank can kink when a toilet is pushed back, and older plastic or metal lines narrow inside over time. A new braided supply line is a cheap part and a quick swap.",
        ],
      },
      {
        heading: "When to replace the fill valve",
        paragraphs: [
          "If the valve is open, the line is clear and the tank still won't fill properly, the fill valve itself has worn out. Fill valves are close to universal and are one of the easier toilet repairs. If the whole house has low pressure, not just the toilet, that is a plumbing issue to have looked at.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why does my toilet take so long to fill?",
        answer:
          "A slow fill is almost always restricted flow into the tank: a partly closed shut-off valve, debris in the fill valve, or an old supply line. Flushing the fill valve clears it in most cases. If the whole house has low water pressure, the problem is upstream of the toilet.",
      },
      {
        question: "Is a toilet that won't fill an emergency?",
        answer:
          "No, unless water is leaking onto the floor. You can still flush by pouring a bucket of water into the bowl. If the tank is also leaking, turn the shut-off valve clockwise to stop the water and get it repaired.",
      },
      {
        question: "How long should a toilet tank take to refill?",
        answer:
          "Most toilets refill within about a minute. If yours takes several minutes, start by flushing debris out of the fill valve.",
      },
    ],
  },
  {
    // "toilet runs intermittently" 400/mo KD 0; "phantom flush" 150 KD 0; "toilet phantom flush" 100 KD 0
    slug: "toilet-runs-by-itself",
    title: "Toilet runs by itself every few minutes (phantom flush)",
    metaTitle: "Toilet Runs by Itself? How to Fix a Phantom Flush",
    excerpt:
      "A toilet that refills on its own for a few seconds is leaking water from the tank into the bowl. It's a slow, silent leak and usually a cheap fix.",
    answer:
      "A toilet that runs on its own for a few seconds every so often, called a phantom flush, is leaking water from the tank into the bowl. The usual cause is a worn flapper or a dirty flapper seat. Confirm it with a dye test, clean the seat, and replace the flapper if colour still reaches the bowl.",
    readMinutes: 4,
    updated: "2026-10-09",
    body: [],
    sections: [
      {
        heading: "What a phantom flush actually is",
        paragraphs: [
          "Nobody touched the handle, but the toilet refills for a few seconds. What happened is that water has been seeping from the tank into the bowl. When the level drops far enough, the fill valve tops it up. It sounds like a short flush.",
          "Less often, water is siphoning out through the fill valve's refill tube because the tube is pushed too far down into the overflow pipe.",
        ],
      },
      {
        heading: "Confirm it with a dye test",
        paragraphs: [],
        steps: [
          "Put a few drops of food colouring in the tank.",
          "Don't flush for 20 to 30 minutes.",
          "If colour shows up in the bowl, water is getting past the flapper.",
        ],
      },
      {
        heading: "Fix it",
        paragraphs: [
          "Turn off the water and flush to empty the tank. Wipe the ring the flapper lands on; mineral scale or grit there stops even a new flapper from sealing. If the flapper is stiff, warped or slimy, replace it with one the same size (2-inch or 3-inch). Take the old one to the store.",
          "Check the chain too. If it's too short it holds the flapper slightly open. About half an inch of slack is right.",
          "Finally, clip the refill tube so its end sits above the top of the overflow pipe, not down inside it.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does a phantom flush waste a lot of water?",
        answer:
          "It wastes water around the clock, because the leak never stops between refills. It is usually less than a toilet that runs constantly, but it still shows up on the water bill and is worth fixing.",
      },
      {
        question: "I replaced the flapper and it still does it. Why?",
        answer:
          "The seat the flapper sits on may be scratched or scaled, the new flapper may be the wrong size, or the refill tube may be siphoning water. Check those three. If the flush valve seat is damaged, the flush valve or the whole tank kit needs replacing.",
      },
    ],
  },
  {
    // "toilet overflowing" 1,700/mo KD 0 (parent: "what to do if toilet is overflowing")
    slug: "toilet-overflowing",
    title: "Toilet overflowing? What to do right now",
    metaTitle: "Toilet Overflowing? What to Do in the First 60 Seconds",
    excerpt:
      "Stop the water first, then deal with the clog. Here's the order that keeps water off your floor and out of the ceiling below.",
    answer:
      "If a toilet is overflowing, lift the tank lid and push the flapper down to stop water entering the bowl, then turn the shut-off valve behind the toilet clockwise. Don't flush again. Once the water stops, clear the clog with a flange plunger. If other drains are backing up too, call a plumber.",
    readMinutes: 4,
    updated: "2026-10-09",
    body: [],
    sections: [
      {
        heading: "Stop the water (first 60 seconds)",
        paragraphs: [],
        steps: [
          "Lift the tank lid and press the rubber flapper at the bottom of the tank closed. That stops more water flowing into the bowl.",
          "Lift the float or float arm up to stop the tank refilling.",
          "Turn the shut-off valve behind the toilet clockwise until it stops.",
          "If the valve won't turn, shut off the water to the house at the main valve.",
        ],
      },
      {
        heading: "Then clear the clog",
        paragraphs: [
          "Once the bowl level drops, use a flange plunger. Seal it over the drain hole and pump firmly without breaking the seal. If two good tries don't clear it, use a closet auger, not chemicals.",
          "Do not flush to test it until the water in the bowl drains on its own.",
        ],
      },
      {
        heading: "When it's more than a toilet clog",
        paragraphs: [
          "If the tub, shower or a floor drain backs up when the toilet overflows, the blockage is in the main sewer line. Stop using water in the whole house and call a plumber. Plunging won't fix a main line.",
          "If water has soaked into the floor or is coming through a ceiling below, dry it fast and check for damage. Water that sits under flooring causes rot and mould.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will an overflowing toilet stop on its own?",
        answer:
          "Usually, once the tank has emptied into the bowl. But if the fill valve keeps running, or the flapper is stuck open, it can keep overflowing. Push the flapper closed and turn off the shut-off valve to be sure.",
      },
      {
        question: "Is toilet overflow water dangerous?",
        answer:
          "Treat it as contaminated if it came from the bowl. Wear gloves, clean hard surfaces with disinfectant, and throw away soaked rugs or cardboard. Sewage from a main-line backup needs a more thorough clean-up.",
      },
    ],
  },
  {
    // "toilet leaking from tank" 1,900/mo KD 3
    slug: "toilet-leaking-from-tank",
    title: "Toilet leaking from the tank",
    metaTitle: "Toilet Leaking From the Tank? Bolts, Gasket or Crack",
    excerpt:
      "Water dripping from under the tank usually comes from the tank bolts, the tank-to-bowl gasket, or the supply connection, and occasionally a crack.",
    answer:
      "A toilet leaking from the tank is usually leaking at the tank bolts, the rubber tank-to-bowl gasket, or the supply line connection, and sometimes through a hairline crack. Dry the tank, run your hand under each bolt and the fill-valve nut, and look for the first drip. Worn bolts and gaskets come as an inexpensive kit.",
    readMinutes: 5,
    updated: "2026-10-09",
    body: [],
    sections: [
      {
        heading: "Find the drip",
        paragraphs: [
          "Dry the outside of the tank and the floor. Put dry paper towel under the tank and wait. Check, in order: the supply line nut under the left side, the two or three tank bolts underneath, and the joint between the tank and bowl.",
          "Water beading on the whole tank surface on a humid day is condensation, not a leak.",
        ],
      },
      {
        heading: "Tank bolts and gasket",
        paragraphs: [
          "The rubber washers on the tank bolts and the big gasket between tank and bowl harden over time. Tightening a little can stop a drip, but over-tightening cracks porcelain. If it still drips, replace the bolts, washers and gasket together as a kit.",
        ],
      },
      {
        heading: "Supply line and fill valve nut",
        paragraphs: [
          "A drip at the supply connection is usually a worn line or a loose nut. Snug it by hand, then a quarter turn. If the line is old, replace it with a braided one.",
        ],
      },
      {
        heading: "If the tank is cracked",
        paragraphs: [
          "A hairline crack that weeps cannot be reliably repaired. Turn the water off and replace the tank or the whole toilet. A crack can split further without warning.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I keep using a toilet that leaks from the tank?",
        answer:
          "For a slow drip at a bolt, yes, for a short time with a towel underneath, but get it fixed soon. Water under the floor causes rot. For a cracked tank, turn the water off and don't use it.",
      },
    ],
  },
  {
    // "toilet installation cost" 2,300/mo KD 0; "toilet replacement cost" 1,200/mo KD 2;
    // "cost to install/replace a toilet" 600/500; "toilet repair cost" 350. Ahrefs US, 2026-10-09.
    slug: "toilet-installation-cost",
    title: "How much does toilet installation cost?",
    metaTitle: "Toilet Installation Cost (2026): What to Expect to Pay",
    answer:
      "Nationally, professional toilet installation typically costs about $224-$533 (Angi, 2026; average about $374). HomeGuide puts it at $350-$800 including a standard toilet (average about $600), with labor alone at $150-$450. Removing the old toilet adds $50-$200, and a broken flange or damaged floor adds more.",
    excerpt:
      "Sourced national price ranges for installing or replacing a toilet, what's included, the extras that change a quote, and how to get an accurate price.",
    readMinutes: 8,
    updated: "2026-10-10",
    body: [],
    sections: [
      {
        heading: "Why the published numbers don't match",
        paragraphs: [
          "If you've seen very different figures online, it's usually because they're measuring different things. Some quote installation labor only, some include the toilet, and some include removal and haul-away. Here's what two widely used national cost guides say, and what each figure covers.",
          "Angi (2026 data): professional toilet installation typically costs $224-$533, with most homeowners paying around $374. The low end is about $120 and the high end can reach $826. Angi says replacing a toilet, including removing the old one and installing the new one, typically costs $275-$480, averaging around $375.",
          "HomeGuide: $350-$800 for the toilet plus installation labor, with a national average of $600. Labor alone is $150-$450, and can go past $900 for complicated jobs.",
          "These are national figures. Prices in your area may be higher or lower. The only way to know your price is a written quote, and the rest of this guide will help you get an accurate one.",
        ],
      },
      {
        heading: "What the toilet itself costs",
        paragraphs: [
          "If you're buying the toilet yourself and paying only for installation, add the fixture price. HomeGuide puts a standard two-piece toilet (separate tank and bowl, the most common type in the US) at $100-$500 before installation, and a one-piece toilet at $200-$900. Angi lists average prices of about $375 for a two-piece and $800 for a one-piece.",
          "Specialty toilets cost more to buy and often to install. HomeGuide lists wall-mounted toilets at $300-$1,500 before installation, because the tank sits inside the wall, and upflush (macerating) toilets at $750-$1,500 before labor. These are used in basements where there's no drain below the floor.",
        ],
      },
      {
        heading: "Extras that change the quote",
        paragraphs: [
          "Most quotes for a straight swap are close to the national ranges above. These are the things that push a quote up, with the figures the cost guides give.",
          "Removing and disposing of the old toilet: $50-$200 (both Angi and HomeGuide).",
          "A broken or corroded flange, the fitting that anchors the toilet to the drain: $145-$300 on average to replace (Angi). You often don't know until the old toilet is off.",
          "Damaged flooring under the old toilet, usually from a slow leak: $8-$24 per square foot for bathroom flooring (Angi). HomeGuide puts tile and grout repair at $10-$50 per square foot.",
          "Moving the toilet to a new spot: about $3,000 on average, because the drain and vent have to move too (Angi).",
          "After-hours or emergency service: HomeGuide says this sometimes doubles or triples the cost. If your only toilet is broken, a same-day weekday appointment is much cheaper than a Sunday night.",
        ],
      },
      {
        heading: "Before you get quotes",
        paragraphs: [
          "A few minutes of checking makes quotes more accurate and avoids buying the wrong toilet.",
        ],
        steps: [
          "Measure the rough-in: the distance from the finished wall behind the toilet to the center of the floor bolts. Most US homes are 12 inches, but 10 and 14 exist. The new toilet has to match.",
          "Check whether the shut-off valve behind the toilet turns easily. If it's stiff or crusty, ask for it to be replaced at the same time while the water is off.",
          "Press on the floor around the base. Soft or spongy flooring means there's been a leak and there may be subfloor work.",
          "Decide whether you want a standard or comfort-height bowl, and round or elongated. Elongated bowls need a little more room in front.",
          "Look for the WaterSense label. EPA says WaterSense toilets use 1.28 gallons per flush or less, and many utilities offer rebates on them.",
        ],
      },
      {
        heading: "Questions to ask a plumber",
        paragraphs: [
          "Is this a flat price or hourly? Does it include a new wax ring or seal, new closet bolts and a new supply line? Does it include removing and hauling away the old toilet? What happens to the price if the flange is broken? Do you warranty the installation? How long should we wait before using it?",
          "A detailed written quote that answers these is worth more than the lowest number. Leaks from rushed installs often show up weeks later, under the floor.",
        ],
      },
      {
        heading: "Repair instead of replace?",
        paragraphs: [
          "If the toilet is running, leaking at the base, or the handle is loose, you may not need a new one. HomeGuide puts typical toilet repair at $130-$300 for parts and labor. Our repair-or-replace guide explains how to decide.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does it cost to replace a toilet?",
        answer:
          "Angi puts toilet replacement, including removing the old toilet and installing the new one, at about $275-$480, averaging around $375. HomeGuide's range of $350-$800 includes a standard toilet. A specialty toilet, a broken flange or floor damage increases the cost.",
      },
      {
        question: "How long does it take to install a toilet?",
        answer:
          "HomeGuide says a professional typically installs a toilet in 2 to 3 hours. A wall-mounted toilet or a toilet in a new location can take 4 to 6 hours or more because of the extra plumbing and wall work.",
      },
      {
        question: "Is toilet installation cheaper if I buy the toilet myself?",
        answer:
          "Often, because you control the fixture price, and installation-only labor runs $150-$450 according to HomeGuide. Make sure it matches your rough-in and that the plumber is willing to install a customer-supplied toilet; some don't warranty fixtures they didn't supply.",
      },
      {
        question: "Can I install a toilet myself?",
        answer:
          "Many homeowners do. It's mostly lifting, leveling and making a good seal. The risks are a cracked bowl from overtightened bolts, a wax ring that doesn't seal, and a seized shut-off valve that breaks. If the flange is damaged or the floor is soft, call a plumber.",
      },
    ],
    sources: [
      { label: "Angi: How much does toilet installation cost? (2026)", url: "https://www.angi.com/articles/how-much-does-toilet-installation-cost.htm" },
      { label: "HomeGuide: How much does toilet installation cost?", url: "https://homeguide.com/costs/toilet-installation-cost" },
      { label: "US EPA WaterSense: Residential toilets", url: "https://www.epa.gov/watersense/residential-toilets" },
    ],
  },
];

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}

/**
 * Internal links: each guide points at the service page that fixes the
 * problem and at closely related guides. Service pages read this in reverse
 * to list "guides for this problem".
 */
export const GUIDE_LINKS: Record<string, { service: string; guides: string[] }> = {
  "why-toilet-keeps-clogging": { service: "clogged-toilet", guides: ["how-to-unclog-a-toilet", "toilet-wont-flush", "sewer-backup-vs-clog"] },
  "running-toilet-cost": { service: "running-toilet", guides: ["why-is-my-toilet-running", "toilet-runs-by-itself", "toilet-tank-not-filling"] },
  "when-to-replace-vs-repair": { service: "toilet-replacement", guides: ["toilet-installation-cost", "toilet-leaking-at-base", "why-toilet-keeps-clogging"] },
  "how-to-unclog-a-toilet": { service: "clogged-toilet", guides: ["why-toilet-keeps-clogging", "toilet-overflowing", "sewer-backup-vs-clog"] },
  "why-is-my-toilet-running": { service: "running-toilet", guides: ["toilet-runs-by-itself", "running-toilet-cost", "toilet-tank-not-filling"] },
  "toilet-wont-flush": { service: "clogged-toilet", guides: ["how-to-unclog-a-toilet", "why-toilet-keeps-clogging", "toilet-tank-not-filling"] },
  "toilet-leaking-at-base": { service: "toilet-leak", guides: ["toilet-leaking-from-tank", "when-to-replace-vs-repair", "toilet-installation-cost"] },
  "sewer-backup-vs-clog": { service: "sewer-backup", guides: ["how-to-unclog-a-toilet", "toilet-overflowing", "why-toilet-keeps-clogging"] },
  "toilet-tank-not-filling": { service: "running-toilet", guides: ["why-is-my-toilet-running", "toilet-wont-flush", "toilet-runs-by-itself"] },
  "toilet-runs-by-itself": { service: "running-toilet", guides: ["why-is-my-toilet-running", "running-toilet-cost", "toilet-leaking-from-tank"] },
  "toilet-overflowing": { service: "emergency-plumber", guides: ["how-to-unclog-a-toilet", "sewer-backup-vs-clog", "toilet-wont-flush"] },
  "toilet-leaking-from-tank": { service: "toilet-leak", guides: ["toilet-leaking-at-base", "toilet-runs-by-itself", "when-to-replace-vs-repair"] },
  "toilet-installation-cost": { service: "toilet-install", guides: ["when-to-replace-vs-repair", "toilet-leaking-at-base", "why-toilet-keeps-clogging"] },
};

export function relatedGuides(slug: string): Guide[] {
  return (GUIDE_LINKS[slug]?.guides ?? [])
    .map((g) => getGuide(g))
    .filter((g): g is Guide => Boolean(g));
}

/** Guides whose fix is this service, for the service page. */
export function guidesForService(serviceSlug: string): Guide[] {
  const extra: Record<string, string[]> = {
    "toilet-install": ["when-to-replace-vs-repair"],
    "toilet-replacement": ["toilet-installation-cost"],
    "emergency-plumber": ["sewer-backup-vs-clog", "how-to-unclog-a-toilet"],
  };
  const slugs = [
    ...Object.entries(GUIDE_LINKS)
      .filter(([, v]) => v.service === serviceSlug)
      .map(([k]) => k),
    ...(extra[serviceSlug] ?? []),
  ];
  return [...new Set(slugs)]
    .map((g) => getGuide(g))
    .filter((g): g is Guide => Boolean(g));
}
