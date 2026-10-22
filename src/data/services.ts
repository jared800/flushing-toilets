import type { GuideFaq, GuideSection } from "@/data/guides";

export type Service = {
  slug: string;
  /** Page <title> written for the query. */
  metaTitle?: string;
  /** 40-60 word direct answer shown first (AEO). */
  answer?: string;
  /** Long-form body; rendered below the summary when present. */
  sections?: GuideSection[];
  /** Overrides the generic service FAQs when present. */
  faqs?: GuideFaq[];
  sources?: { label: string; url: string }[];
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
      "Clogged toilet? Try the safe fixes first, then send a free request if you still need a plumber.",
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
      "Stop a running toilet: find the worn part with a dye test, or send a free request for a plumber.",
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
      "Toilet leaking? Find where the water is coming from, then fix it or send a free request for a plumber.",
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
      "Ask whether haul-away of the old toilet is included",
    ],
    seoBlurb:
      "Toilet installation: what the job involves, what it costs, and a free request if you want a plumber.",
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
      "Toilet replacement: when to replace instead of repair, and a free request if you want a plumber.",
  },
  {
    slug: "emergency-plumber",
    name: "Emergency plumber",
    shortName: "Emergency",
    urgency: "critical",
    metaTitle: "24 Hour Emergency Plumber: Costs & What to Do First",
    answer:
      "A plumbing emergency is water you can't stop, sewage coming up, or your only toilet out of service. Shut off the water first. Emergency plumbers typically charge $100-$350 an hour plus a $150-$250 call-out fee (HomeGuide), and Angi puts the national average at $170 an hour, with holiday rates up to $600.",
    summary:
      "Overflowing toilets, water you can't shut off, and sewage backing up can't wait until Monday. Here's what to do in the first five minutes, what a 24-hour plumber costs, and how to get one.",
    symptoms: [
      "Active overflow or flooding",
      "No working toilet in the home",
      "Sewage coming up a tub, shower or floor drain",
      "Water won’t shut off fully",
    ],
    whatWeDo: [
      "Stop the water and stabilize the situation first",
      "Clear clogs and stop leaks",
      "Clear a main line from the cleanout if needed",
      "Outline next steps if a larger repair is needed",
    ],
    sections: [
      {
        heading: "Is it really an emergency?",
        paragraphs: [
          "Call a 24-hour plumber now if water is running that you can't shut off, sewage is backing up into a tub, shower or floor drain, a pipe has burst, or the only toilet in the house is unusable and you can't wait. Also call if you smell gas near a water heater: leave the house and call your gas utility first.",
          "It can probably wait for a regular appointment if the toilet is running but not overflowing, there's a slow drip at the base you can contain with a towel, one of several toilets is clogged, or a drain is slow but working. Booking during business hours is much cheaper, because emergency rates are typically 1.5 to 3 times normal rates, according to Angi.",
        ],
      },
      {
        heading: "Do this before anyone arrives",
        paragraphs: [],
        steps: [
          "Stop the water. For a toilet, turn the oval valve on the wall or floor behind it clockwise until it stops. If the bowl is about to overflow, lift the tank lid and push the flapper down by hand.",
          "If you can't stop it there, close your house main. In colder places like Utah it's usually in the basement or a utility room where the water line enters; in warmer states it's often outside near the foundation or in a box by the street.",
          "Don't flush again, and if more than one drain is backing up, stop using water anywhere in the house.",
          "Keep people and pets out of standing water, especially sewage. Switch off power to any area where water is near outlets or appliances, if you can reach the panel safely.",
          "Take photos of the damage for insurance before you clean up.",
          "Clear a path to the problem and to any cleanout or main valve, so the plumber can start working immediately.",
        ],
      },
      {
        heading: "What a 24-hour emergency plumber costs",
        paragraphs: [
          "HomeGuide's national figures: emergency plumbers typically charge $100-$350 an hour, plus a $150-$250 service call fee or surcharge for non-business hours. By timing, they list $100-$200 an hour for a same-day visit during business hours, $120-$300 for weekday after-hours, $150-$350 for weekends, and $200-$450 or more for holidays.",
          "Angi's 2026 figures: a national average of $170 an hour, with most homeowners paying $100-$500 an hour, and holiday calls reaching $600. Angi also notes a flat emergency or trip fee of $150-$300 is common.",
          "For specific jobs, HomeGuide puts an after-hours toilet or drain clog at $300-$800 if it can be cleared by snaking, and emergency sewer line work at $500-$3,800.",
          "These are national ranges. What you'll pay depends on your area, the time and the job, so ask for the rate and call-out fee on the phone before anyone drives out.",
        ],
      },
      {
        heading: "How to keep the bill down",
        paragraphs: [
          "Ask for the short-term fix. If it's 11pm on a Saturday, getting the water stopped and one toilet working tonight, then doing the bigger repair on a weekday at normal rates, can save a lot. Angi recommends exactly this.",
          "Know your shut-off valves before you need them. Most emergency damage happens in the minutes before someone finds the main.",
          "Check your homeowners insurance or home warranty. HomeGuide notes that insurance usually covers sudden events like a burst pipe but not damage from neglect.",
        ],
      },
      {
        heading: "Questions to ask on the phone",
        paragraphs: [
          "What's your hourly rate right now, and is there a call-out or trip fee? Is there a minimum charge? How soon can you be here? Are you licensed and insured? Will you give me a price before starting work? HomeGuide says emergency response is typically 30 minutes to 2 hours, depending on location, time and demand.",
        ],
      },
      {
        heading: "How Flushing Toilets fits in",
        paragraphs: [
          "We're a free referral service, not a plumbing company, and we don't promise a response time. Send a request marked Emergency with your ZIP. A person reviews it and passes it on if an independent plumber who covers your area is available, and we follow up by phone. If water is actively flowing, shut it off first, and don't wait on us if you already know a plumber who can come.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a clogged toilet an emergency?",
        answer:
          "Only if it's your only toilet and you can't wait, if it's overflowing and won't stop, or if other drains are backing up too, which points to the main line. A single clogged toilet in a house with another working bathroom can usually wait for a regular appointment, which costs much less.",
      },
      {
        question: "Are 24-hour plumbers more expensive?",
        answer:
          "Yes. Angi says emergency rates typically run 1.5 to 3 times normal, and HomeGuide lists weekend rates of $150-$350 an hour and holiday rates of $200-$450 or more, plus a call-out fee. If it can safely wait until business hours, it's cheaper.",
      },
      {
        question: "How fast does an emergency plumber come?",
        answer:
          "HomeGuide puts typical emergency response at 30 minutes to 2 hours, depending on where you live, the time of day, the weather and how many other calls they have. Always ask for an arrival estimate on the phone.",
      },
      {
        question: "What should I do while waiting for an emergency plumber?",
        answer:
          "Shut off the water at the fixture or the house main, stop using water if more than one drain is backing up, keep everyone out of sewage, take photos for insurance, and clear a path to the problem.",
      },
      {
        question: "Does homeowners insurance cover emergency plumbing?",
        answer:
          "Often for sudden events like a burst pipe and the water damage it causes, but usually not for damage from neglect or wear, according to HomeGuide. Sewer backups often need a separate endorsement. Check your policy and call your insurer early.",
      },
    ],
    sources: [
      { label: "HomeGuide: How much does an emergency plumber cost?", url: "https://homeguide.com/costs/emergency-plumber-cost" },
      { label: "Angi: How much does an emergency plumber cost? (2026)", url: "https://www.angi.com/articles/emergency-plumber-cost.htm" },
    ],
    seoBlurb:
      "24 hour emergency plumber help: what counts as an emergency, what to do first, and sourced costs ($100-$350/hr plus a call-out fee, per HomeGuide)."
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
      "Sewer backup: what to do right now, when it is the main line, and a free request for a plumber.",
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
