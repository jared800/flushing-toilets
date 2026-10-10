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
};

export const GUIDES: Guide[] = [
  {
    slug: "why-toilet-keeps-clogging",
    answer:
      "A toilet that clogs again and again usually has a partial blockage past the bowl, a low-flow bowl that can't clear what your household sends it, a failing wax seal or flange, or a blocked roof vent. Stop flushing wipes, try a closet auger, and call a plumber if more than one drain is slow.",
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
    answer:
      "A running toilet costs money every hour it runs, because the water goes straight to the drain. The fix is usually a flapper or fill valve that costs under twenty dollars. A plumber's visit for the same repair is typically a short service call, so the real cost of waiting is the water bill.",
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
    answer:
      "Repair a toilet when one part has failed on a solid, quiet fixture: flapper, fill valve, handle, or supply line. Replace it when the bowl or tank is cracked, it rocks because the flange has failed, it clogs constantly, or you need a different height or rough-in. Cracked porcelain cannot be reliably repaired.",
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
      "Knowing the difference helps you call the right help before wastewater spreads.",
    readMinutes: 5,
    body: [
      "A simple toilet clog usually affects one fixture. Water rises in the bowl; other sinks and showers still drain normally.",
      "A sewer backup often shows up as multiple fixtures draining slowly, water appearing in a tub when you flush, sewage odor, or a cleanout overflowing outside.",
      "If you suspect a main-line backup, avoid running water elsewhere in the home. Stop using sinks, laundry, and other toilets until a plumber assesses the line.",
      "A plumber can clear the line from a cleanout and, if it keeps happening, run a camera to check for roots, grease, or a broken pipe.",
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
];

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}
