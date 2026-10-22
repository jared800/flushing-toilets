import type { Service } from "@/data/services";
import { SERVICES } from "@/data/services";

export type FaqItem = { question: string; answer: string };

export function serviceFaqs(service: Service): FaqItem[] {
  return [
    {
      question: `How fast can I get help for a ${service.name.toLowerCase()}?`,
      answer:
        service.urgency === "critical" || service.urgency === "high"
          ? "Many local plumbers offer same-day or after-hours service. Send a request with your ZIP and urgency set to Emergency, and a person will try to match you with one who covers your area. If water is still running, shut the valve behind the toilet first."
          : "It depends on which plumbers cover your area and how busy they are. We send your request on as soon as a person has reviewed it, and we follow up by phone if we can't find anyone.",
    },
    {
      question: `Do I need to buy parts myself for a ${service.name.toLowerCase()}?`,
      answer:
        "Usually not. Most plumbers carry common parts (flappers, fill valves, wax rings, supply lines). Specialty fixtures may need a return trip or a parts allowance on the quote, so ask when they call.",
    },
    {
      question: "Is Flushing Toilets the plumbing company?",
      answer:
        "No. We are a free referral service. A person reads your request and passes it to an independent plumber when one covers your area. The plumber who contacts you quotes and does the work.",
    },
    {
      question: "What should I do while I wait?",
      answer:
        "Shut off the toilet supply valve if it’s safe to reach, avoid flushing other fixtures if you suspect a main backup, and keep kids/pets out of standing water.",
    },
  ];
}

export function cityFaqs(cityName: string, stateAbbr: string): FaqItem[] {
  return [
    {
      question: `How do I check a plumber's license in ${cityName}?`,
      answer: `Ask the plumber for their ${stateAbbr} license number before any work starts and look it up with the state licensing board. Flushing Toilets is a referral service; the plumber you hire does the work and gives you the quote.`,
    },
    {
      question: `What happens to my request in ${cityName}?`,
      answer:
        "A person reviews your request. If an independent plumber who covers your ZIP code is available, we pass it on. If no plumber covers your area yet, we follow up by phone so you can call someone else right away.",
    },
    {
      question: "Will I get multiple calls?",
      answer:
        "We pass your request to one plumber at a time, and only one who covers your area. You are never obligated to hire anyone who calls.",
    },
  ];
}

export function cityServiceFaqs(
  cityName: string,
  stateAbbr: string,
  service: Service,
  localNotes?: string[],
): FaqItem[] {
  const base = [
    {
      question: `Who handles ${service.name.toLowerCase()} in ${cityName}?`,
      answer: `Any independent plumber who covers ${cityName}, ${stateAbbr}. If you send the form on this page, a person reads it and passes it on when a plumber who covers your area is available. We are a referral service, not the plumbing company.`,
    },
    ...serviceFaqs(service).slice(0, 2),
    {
      question: `What does a typical ${service.name.toLowerCase()} visit include in ${cityName}?`,
      answer: service.whatWeDo.join("; ") + ".",
    },
  ];
  if (localNotes?.length) {
    base.push({
      question: `Anything unique about ${cityName} homes?`,
      answer: localNotes.join(" "),
    });
  }
  return base;
}

export function defaultServiceFaqList() {
  return SERVICES.flatMap((s) => serviceFaqs(s).slice(0, 1));
}
