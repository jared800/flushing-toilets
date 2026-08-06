/**
 * Symptom-first toilet diagnostic.
 *
 * The point of this tool is to be genuinely useful to someone whose toilet is
 * misbehaving RIGHT NOW, whether or not they ever become a lead. Honest DIY
 * answers earn the trust (and the links) that a directory page never will.
 *
 * Every outcome carries a `severity` that decides what we show:
 *   diy        — they can fix it themselves; we say so plainly and don't upsell
 *   call       — a plumber is the sensible call, but it isn't urgent
 *   emergency  — stop using water and get someone out now
 *
 * `serviceSlug` and `urgency` prefill the lead form so a person who reaches a
 * "call" or "emergency" outcome doesn't have to re-describe the problem.
 */

import type { LeadUrgency } from "@/lib/leads-types";

export type Severity = "diy" | "call" | "emergency";

export type Outcome = {
  id: string;
  severity: Severity;
  title: string;
  /** What is actually happening, in plain language. */
  cause: string;
  /** Ordered things to try or check. Shown as a numbered list. */
  steps: string[];
  /** The honest line about when to stop and call someone. */
  stopIf?: string;
  /** Rough money expectation, so nobody is blindsided. */
  costNote?: string;
  serviceSlug: string;
  urgency: LeadUrgency;
};

export type Answer = {
  label: string;
  hint?: string;
  /** Either the next question, or the outcome we land on. */
  next?: string;
  outcome?: string;
};

export type Question = {
  id: string;
  prompt: string;
  help?: string;
  answers: Answer[];
};

export const START = "start";

export const QUESTIONS: Question[] = [
  {
    id: "start",
    prompt: "What is the toilet doing?",
    help: "Pick the closest match. You can go back and change it.",
    answers: [
      {
        label: "The bowl fills up and drains slowly, or not at all",
        hint: "Water rises when you flush",
        next: "clog-scope",
      },
      {
        label: "It runs constantly, or refills on its own",
        hint: "You hear hissing or trickling between flushes",
        next: "running-type",
      },
      {
        label: "There is water on the floor",
        hint: "Around the base, behind the tank, or at the supply line",
        next: "leak-location",
      },
      {
        label: "It flushes weakly, or the bowl empties slowly with no clog",
        hint: "Nothing is blocked but the flush is lazy",
        next: "weak-flush",
      },
      {
        label: "It gurgles or bubbles, or other drains act up when I flush",
        hint: "Sink burbles, tub backs up, smell of sewage",
        next: "multi-fixture",
      },
    ],
  },
  {
    id: "clog-scope",
    prompt: "When the toilet backs up, what happens elsewhere in the house?",
    help: "This is the single most useful question. It separates a five-minute fix from a serious problem.",
    answers: [
      {
        label: "Nothing — every other drain works normally",
        next: "clog-tried",
      },
      {
        label: "Other drains are slow too, or the tub gurgles when I flush",
        outcome: "sewer-main",
      },
      {
        label: "Sewage is coming up somewhere — a tub, a shower, a floor drain",
        outcome: "sewage-backup",
      },
    ],
  },
  {
    id: "clog-tried",
    prompt: "Have you tried a flange plunger yet?",
    help: "A flange plunger has an extra rubber sleeve that folds out of the cup. The flat cup kind is for sinks and will not seal a toilet.",
    answers: [
      { label: "No, or I only have a flat sink plunger", outcome: "clog-plunge" },
      {
        label: "Yes, and it cleared but keeps coming back",
        outcome: "clog-recurring",
      },
      { label: "Yes, properly, and it did nothing", outcome: "clog-stubborn" },
    ],
  },
  {
    id: "running-type",
    prompt: "Put a few drops of food colouring in the tank and wait 15 minutes without flushing. Does colour appear in the bowl?",
    help: "This is the standard dye test. It tells you which of two parts has failed, and it costs nothing.",
    answers: [
      { label: "Yes — colour seeped into the bowl", outcome: "flapper" },
      {
        label: "No colour in the bowl, but it still refills or hisses",
        outcome: "fill-valve",
      },
      {
        label: "Water is spilling into the open tube in the middle of the tank",
        outcome: "overflow-level",
      },
      { label: "I would rather not test it", outcome: "running-generic" },
    ],
  },
  {
    id: "leak-location",
    prompt: "Where is the water coming from?",
    help: "Dry everything, lay down paper towel, and flush once. Where the paper wets first is your answer.",
    answers: [
      {
        label: "From under the base, and it appears after a flush",
        outcome: "wax-seal",
      },
      {
        label: "From the little valve or hose behind the toilet",
        outcome: "supply-line",
      },
      {
        label: "From between the tank and the bowl",
        outcome: "tank-bolts",
      },
      {
        label: "The bowl or tank itself is cracked",
        outcome: "cracked-fixture",
      },
      {
        label: "The toilet rocks when I sit on it",
        outcome: "rocking-flange",
      },
    ],
  },
  {
    id: "weak-flush",
    prompt: "Does the tank fill all the way up?",
    help: "Take the lid off and watch one full cycle. The water should stop about an inch below the top of the overflow tube.",
    answers: [
      { label: "No — it stops well short", outcome: "low-tank-level" },
      {
        label: "Yes, it fills, but the flush is still weak",
        outcome: "clogged-rim-jets",
      },
      {
        label: "The handle feels loose or you have to hold it down",
        outcome: "flush-chain",
      },
    ],
  },
  {
    id: "multi-fixture",
    prompt: "How many fixtures are affected?",
    help: "Gurgling means air is being pulled through water somewhere it shouldn't be. Where it happens tells you how far down the problem is.",
    answers: [
      {
        label: "Just this one toilet gurgles a bit at the end of a flush",
        outcome: "vent-partial",
      },
      {
        label: "The tub or sink nearest the toilet reacts when I flush",
        outcome: "sewer-main",
      },
      {
        label: "Fixtures all over the house, or there is a sewage smell",
        outcome: "sewage-backup",
      },
    ],
  },
];

export const OUTCOMES: Outcome[] = [
  {
    id: "clog-plunge",
    severity: "diy",
    title: "Almost certainly a standard clog — plunge it properly first",
    cause:
      "A blockage sitting in the toilet's own trap, within a few inches of the bowl. This is the most common toilet problem there is, and the great majority clear without a plumber.",
    steps: [
      "If the bowl is near the rim, wait 20 minutes — the level usually drops on its own as water seeps past.",
      "Use a flange plunger, not a flat sink plunger. Pull the rubber sleeve out of the cup so it seats into the drain hole.",
      "Add enough water to cover the plunger cup. Plunging air does nothing; you need water to transmit the force.",
      "Push down gently to seat it, then pump hard 10 to 15 times without breaking the seal, and yank up sharply on the last one.",
      "Repeat the cycle two or three times before deciding it hasn't worked.",
    ],
    stopIf:
      "If three honest rounds of plunging do nothing, stop. Continuing risks pushing the blockage into the trap where it is harder to reach.",
    costNote:
      "A flange plunger is about $10 at any hardware store and will pay for itself the first time.",
    serviceSlug: "clogged-toilet",
    urgency: "today",
  },
  {
    id: "clog-stubborn",
    severity: "call",
    title: "The blockage is past the trap — this needs an auger",
    cause:
      "If a properly seated flange plunger cannot move it, the obstruction is either lodged in the trapway or is something solid that will not break up. A toilet auger reaches around the bend without scratching the porcelain.",
    steps: [
      "Do not add chemical drain cleaner. It rarely clears a toilet, and it makes the job hazardous for whoever opens it up next.",
      "If you own a toilet auger (the short one with a rubber sleeve, not a drain snake), feed it in gently and crank — never force it.",
      "Stop using that toilet. Every extra flush adds water that has nowhere to go.",
      "If a child could have dropped something in, mention it when you call. A toy usually means the toilet has to come off the floor, which changes the job.",
    ],
    stopIf:
      "A drain snake from a hardware store can crack a bowl. If you don't have a proper toilet auger, this is the point to hand it over.",
    costNote:
      "A straightforward auger visit is typically a minimum service call. Pulling the toilet to retrieve an object costs meaningfully more.",
    serviceSlug: "clogged-toilet",
    urgency: "today",
  },
  {
    id: "clog-recurring",
    severity: "call",
    title: "Clearing it repeatedly means you haven't found the real cause",
    cause:
      "A toilet that clogs every few weeks has something structural behind it: a partial blockage further down the branch line, roots in the lateral, a low-flow fixture that never had the flush volume for the household, or a poorly glazed trapway on an older bowl that catches everything.",
    steps: [
      "Note what triggers it — one particular user, laundry day, after rain. The pattern is diagnostic and worth telling a plumber.",
      "Stop flushing anything but waste and toilet paper. Wipes marked flushable are a leading cause of recurring residential clogs.",
      "Ask for a camera inspection rather than another clearing. Paying to clear the same clog four times costs more than finding out why.",
      "If the toilet is a pre-1994 or early low-flow model, replacement is often cheaper than continuing to service it.",
    ],
    costNote:
      "A camera inspection is usually a modest add-on and is the only way to tell roots from grease from a collapsed section.",
    serviceSlug: "clogged-toilet",
    urgency: "this-week",
  },
  {
    id: "sewer-main",
    severity: "emergency",
    title: "This looks like the main line, not the toilet",
    cause:
      "When flushing a toilet makes a tub gurgle or a sink drain slowly, the two fixtures are sharing a blocked line downstream of both. The toilet is the symptom, not the problem.",
    steps: [
      "Stop running water anywhere in the house — no laundry, no dishwasher, no showers. Every gallon you send down has to go somewhere.",
      "If you can find the cleanout (a capped pipe outside, often near the foundation), look at whether it is full. Do not remove the cap if it is under pressure.",
      "Do not pour anything down the drain. Chemical cleaner sitting in a blocked line is a hazard for the person who opens it.",
      "Call a plumber now rather than in the morning. A main-line blockage does not resolve on its own and the next thing that happens is usually sewage on a floor.",
    ],
    stopIf:
      "This is past DIY. Snaking a main line needs equipment you don't rent casually.",
    costNote:
      "Main-line clearing is a bigger job than a toilet clog. Ask whether the quote includes a camera check afterwards.",
    serviceSlug: "sewer-backup",
    urgency: "emergency",
  },
  {
    id: "sewage-backup",
    severity: "emergency",
    title: "Sewage is backing up — treat this as urgent and stop using water",
    cause:
      "Wastewater coming up through a tub, shower or floor drain means the main line is blocked and the house has nowhere to drain. This is a health hazard, not an inconvenience.",
    steps: [
      "Stop all water use immediately, including other bathrooms.",
      "Keep people and pets away from the affected area. Raw sewage carries bacteria that matter, especially for children.",
      "Do not try to clear it yourself and do not add chemicals.",
      "Call for emergency service now. If you rent, call the landlord or property manager at the same time.",
      "Photograph everything before cleanup begins — you will want it for insurance.",
    ],
    stopIf: "There is no DIY version of this one.",
    costNote:
      "Emergency and after-hours rates apply. Many homeowner policies cover sewage backup only under a specific rider — worth checking while you wait.",
    serviceSlug: "sewer-backup",
    urgency: "emergency",
  },
  {
    id: "flapper",
    severity: "diy",
    title: "The flapper is leaking — a genuinely easy fix",
    cause:
      "Dye reaching the bowl without a flush means the rubber flapper at the bottom of the tank is no longer sealing. Rubber hardens and mineral deposits build on the seat. This is the single most common cause of a running toilet.",
    steps: [
      "Shut the water off at the valve behind the toilet and flush to empty the tank.",
      "Unclip the old flapper and take it to the hardware store. Match it — flappers are not universal, and the 2-inch and 3-inch types look similar until you try to fit one.",
      "Wipe the seat it lands on with a cloth. Grit there will defeat a brand-new flapper.",
      "Clip the new one on, set the chain with about half an inch of slack, turn the water back on, and dye test again.",
    ],
    costNote:
      "The part is usually $8 to $15 and the job takes about fifteen minutes. A leaking flapper can add a surprising amount to a water bill, so it is worth doing this week rather than next month.",
    serviceSlug: "running-toilet",
    urgency: "this-week",
  },
  {
    id: "fill-valve",
    severity: "diy",
    title: "The fill valve is the likely culprit",
    cause:
      "No dye in the bowl but continued hissing or cycling points at the fill valve — the tall assembly on the left side of the tank that refills it after each flush. When its internal seal wears, it never quite shuts off.",
    steps: [
      "Shut off the supply valve and flush to drain the tank.",
      "Sponge out the last inch of water so you don't flood the floor when you disconnect it.",
      "Unscrew the lock nut under the tank, lift the old valve out, and fit a universal replacement — these genuinely are near-universal, unlike flappers.",
      "Set the height so the shut-off is about an inch below the top of the overflow tube, then turn the water back on and watch a full cycle.",
    ],
    stopIf:
      "If the supply valve behind the toilet won't turn, or drips once you move it, stop there — old angle stops seize and snapping one turns a small job into a flooded bathroom.",
    costNote: "A universal fill valve runs about $12 to $20.",
    serviceSlug: "running-toilet",
    urgency: "this-week",
  },
  {
    id: "overflow-level",
    severity: "diy",
    title: "The water level is set too high — adjust it, don't replace anything",
    cause:
      "Water spilling into the overflow tube means the tank is filling past the point where it should stop. The toilet then runs forever trying to reach a level it can never hold. Nothing has failed; it is just set wrong.",
    steps: [
      "Find the adjustment on your fill valve — usually a plastic screw on top, or a clip on a vertical rod.",
      "Lower the shut-off level so the water stops about one inch below the top of the overflow tube.",
      "Flush and watch a full cycle to confirm it stops on its own.",
      "If it won't hold any setting, the fill valve itself is worn and should be replaced.",
    ],
    costNote: "Free, if the adjustment holds.",
    serviceSlug: "running-toilet",
    urgency: "this-week",
  },
  {
    id: "running-generic",
    severity: "diy",
    title: "It is one of three parts, and all three are cheap",
    cause:
      "A constantly running toilet comes down to the flapper not sealing, the fill valve not shutting off, or the water level set too high. Without the dye test you can still narrow it by watching one cycle with the lid off.",
    steps: [
      "Take the tank lid off and watch. If water is visibly pouring into the open central tube, your level is too high — adjust it down.",
      "If the tank is quiet but the bowl surface ripples faintly, the flapper is leaking past.",
      "If you hear a hiss from the tall assembly on the left, the fill valve is the one to replace.",
      "All three parts are under $20 and none of them need a plumber for a standard toilet.",
    ],
    costNote:
      "Worth acting on. A running toilet is one of the few household faults that quietly costs real money every day.",
    serviceSlug: "running-toilet",
    urgency: "this-week",
  },
  {
    id: "wax-seal",
    severity: "call",
    title: "Water at the base after a flush usually means the seal has failed",
    cause:
      "The toilet sits on a wax ring that seals it to the drain flange in the floor. When that ring fails, water escapes at the base on each flush. It is a modest job, but it means lifting the toilet off the floor.",
    steps: [
      "Confirm it before acting — dry the floor completely, lay paper towel around the base, and flush. Wetness appearing at the base rather than from the tank or supply confirms it.",
      "Stop using the toilet. Water escaping under the base goes into the subfloor, and rot is far more expensive than the seal.",
      "If the floor near the toilet feels soft or spongy, say so when you call. That changes the scope.",
    ],
    stopIf:
      "This is doable for a confident DIYer, but a wrongly seated wax ring leaks invisibly into the floor for months. Given what water does to a subfloor, most people should hand this one over.",
    costNote:
      "The ring itself is a few dollars; you are paying for pulling and correctly re-seating the toilet. Ask them to check the flange while it is off.",
    serviceSlug: "toilet-leak",
    urgency: "today",
  },
  {
    id: "supply-line",
    severity: "diy",
    title: "A supply line or shut-off valve drip — often a tightening away",
    cause:
      "The braided hose from the wall valve to the tank, or the valve itself, is weeping. Connections loosen over time and the rubber washers inside harden.",
    steps: [
      "Dry it, then run a finger along the hose and both connections to find the exact source.",
      "If it is a connection, snug it gently by hand and then a quarter turn with a wrench. Over-tightening cracks the plastic nut on the tank side.",
      "If the hose itself is weeping, replace it — braided stainless lines are inexpensive and a burst one floods a house.",
      "If the wall valve is dripping from its stem, that is a valve replacement rather than a tightening.",
    ],
    stopIf:
      "If the shut-off valve won't close, don't force it. You need the house main shut off before that valve comes apart, and that is a plumber's call.",
    costNote: "A braided supply line is about $10.",
    serviceSlug: "toilet-leak",
    urgency: "this-week",
  },
  {
    id: "tank-bolts",
    severity: "diy",
    title: "Water between tank and bowl — the tank bolts or gasket",
    cause:
      "The tank bolts onto the bowl over a large rubber gasket. Bolts loosen, the gasket flattens with age, and water escapes at the join, usually appearing to come from underneath the tank.",
    steps: [
      "Shut off the supply, flush, and sponge the tank dry.",
      "Snug the tank bolts from inside the tank, alternating sides a little at a time so it seats evenly. Do not crank them — porcelain cracks.",
      "Refill and watch. If it still weeps, the gasket needs replacing, which means taking the tank off the bowl.",
    ],
    stopIf:
      "If tightening evenly doesn't stop it, replacing the gasket is a two-person job on an awkward fixture. Reasonable point to call.",
    costNote: "A tank-to-bowl kit with new bolts and gasket runs about $15.",
    serviceSlug: "toilet-leak",
    urgency: "this-week",
  },
  {
    id: "cracked-fixture",
    severity: "call",
    title: "A cracked bowl or tank is a replacement, not a repair",
    cause:
      "Porcelain does not get repaired. A crack that is weeping today can fail suddenly, and a tank letting go releases several gallons at once.",
    steps: [
      "Shut the water off at the valve behind the toilet now.",
      "Stop using it entirely.",
      "Photograph the crack — if the toilet is under warranty or the crack is recent and unexplained, that may matter.",
      "When you call, have the rough-in measurement ready: the distance from the wall to the centre of the bolts at the base, usually 12 inches. It determines which toilet fits.",
    ],
    costNote:
      "Budget for the fixture plus installation. Ask about haul-away of the old one and whether the shut-off valve should be replaced while everything is open.",
    serviceSlug: "toilet-replacement",
    urgency: "today",
  },
  {
    id: "rocking-flange",
    severity: "call",
    title: "A rocking toilet is a flange problem — and it gets worse",
    cause:
      "A toilet should not move at all. Rocking means the flange it bolts to has broken, corroded, or pulled loose from the floor. Every rock breaks the wax seal a little further, so a rocking toilet becomes a leaking toilet.",
    steps: [
      "Don't fix it with shims alone. Shimming a rocking toilet hides the problem while the flange keeps deteriorating underneath.",
      "Check whether the closet bolts at the base are simply loose — if snugging them gently stops the movement and there is no water, you may have caught it early.",
      "Stop using it if there is any water appearing at the base.",
      "Mention the rocking when you call. Repairing a broken flange is a different job from resetting a toilet, and they will want to bring the parts.",
    ],
    costNote:
      "Cost depends on whether the flange can be repaired with a reinforcement ring or has to be replaced, which sometimes means cutting floor.",
    serviceSlug: "toilet-leak",
    urgency: "today",
  },
  {
    id: "low-tank-level",
    severity: "diy",
    title: "Weak flush from a low tank level — usually an adjustment",
    cause:
      "The flush is powered by the weight of water dropping out of the tank. Fill it short and you get a lazy flush that leaves the bowl dirty and clogs easily.",
    steps: [
      "Take the lid off and mark where the water stops. It should be about an inch below the top of the overflow tube.",
      "Raise the fill valve setting — the screw on top, or the clip on the float rod — and test a full cycle.",
      "If someone has put a brick or bottle in the tank to save water, take it out. It saves a little water per flush and causes double-flushing, which saves none.",
      "If it will not hold a higher setting, the fill valve is worn out and should be replaced.",
    ],
    costNote: "Usually free.",
    serviceSlug: "running-toilet",
    urgency: "this-week",
  },
  {
    id: "clogged-rim-jets",
    severity: "diy",
    title: "Mineral deposits in the rim jets are strangling the flush",
    cause:
      "Water enters the bowl through small holes under the rim and, on most toilets, one larger jet at the bottom. In hard water these scale over. The tank empties fine, but the water arrives too slowly to make a proper siphon.",
    steps: [
      "Look up under the rim with a mirror. Chalky white deposits over the holes are the tell.",
      "Shut the water off, flush to empty the bowl, and work white vinegar into the holes — a funnel into the overflow tube distributes it around the rim channel.",
      "Leave it an hour, then clear each hole gently with a bent piece of stiff wire or an Allen key.",
      "Turn the water back on and flush several times.",
    ],
    costNote:
      "A bottle of vinegar. If it does not improve after a proper descale, an older low-flow toilet may simply never have flushed well and replacement is the honest answer.",
    serviceSlug: "clogged-toilet",
    urgency: "this-week",
  },
  {
    id: "flush-chain",
    severity: "diy",
    title: "The chain or handle needs adjusting",
    cause:
      "Too much slack in the chain and the flapper barely lifts, giving a partial flush. Too little and the flapper never seats, so the toilet runs. Handles also corrode and lose their grip on the arm.",
    steps: [
      "Take the lid off and flush while watching. The flapper should swing fully open and drop back cleanly.",
      "Adjust the chain to roughly half an inch of slack — enough to fall closed, not enough to catch under the flapper.",
      "If the handle spins or feels loose, tighten the nut inside the tank. It is reverse-threaded on most toilets, so it tightens counter-clockwise.",
      "Replace a corroded handle and arm as a set; they are a few dollars.",
    ],
    costNote: "Free to adjust, about $10 for a new handle.",
    serviceSlug: "running-toilet",
    urgency: "this-week",
  },
  {
    id: "vent-partial",
    severity: "call",
    title: "Gurgling on one toilet points at a venting or partial-blockage issue",
    cause:
      "Drains need air behind the water. A gurgle at the end of a flush means the system is pulling air through the trap instead of down the vent — either the vent stack is partly blocked, or there is a partial blockage in the branch line creating suction.",
    steps: [
      "Note whether it is new. A gurgle that started recently is more likely a developing blockage than a design fault.",
      "Check whether it happens after heavy rain or in cold weather — leaves and frost both close vent stacks.",
      "It is not urgent today, but it is a genuine early warning. Gurgling frequently precedes a full backup by weeks.",
      "A plumber can check the vent from the roof and scope the branch line.",
    ],
    costNote:
      "Clearing a blocked vent is generally straightforward. The value here is catching it before it becomes the emergency version.",
    serviceSlug: "sewer-backup",
    urgency: "this-week",
  },
];

export function getQuestion(id: string) {
  return QUESTIONS.find((q) => q.id === id);
}

export function getOutcome(id: string) {
  return OUTCOMES.find((o) => o.id === id);
}

export const SEVERITY_META: Record<
  Severity,
  { label: string; blurb: string }
> = {
  diy: {
    label: "You can probably fix this yourself",
    blurb:
      "No plumber needed for most people. Here is how to do it — and where to stop if it goes wrong.",
  },
  call: {
    label: "Worth calling a plumber",
    blurb:
      "Doable for a confident DIYer, but the failure mode is expensive. Here is what is happening and what to ask for.",
  },
  emergency: {
    label: "Call someone now",
    blurb:
      "Stop using water in the house. Here is what to do while you wait.",
  },
};
