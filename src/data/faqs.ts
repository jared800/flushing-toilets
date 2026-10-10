import type { Service } from "@/data/services";
import { SERVICES } from "@/data/services";

export type FaqItem = { question: string; answer: string };

export function serviceFaqs(service: Service): FaqItem[] {
  return [
    {
      question: `How fast can I get help for a ${service.name.toLowerCase()}?`,
      answer:
        service.urgency === "critical" || service.urgency === "high"
          ? "Many partner plumbers offer same-day or emergency windows. Submit a request with your ZIP and urgency set to Emergency for priority routing."
          : "Most non-emergency requests are handled same-day or next-day depending on partner capacity in your city.",
    },
    {
      question: `Do I need to buy parts myself for a ${service.name.toLowerCase()}?`,
      answer:
        "Usually not. Partner plumbers typically bring common parts (flappers, fill valves, wax rings, supply lines). Specialty fixtures may require a return trip or a parts allowance on the quote.",
    },
    {
      question: "Is Flushing Toilets the plumbing company?",
      answer:
        "No. We are a marketplace that connects you with independent licensed local plumbers. The partner who contacts you performs the work.",
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
      question: `Are plumbers in ${cityName} licensed?`,
      answer: `Any plumber we send to a ${cityName}, ${stateAbbr} request must give us a current ${stateAbbr} license number and proof of insurance first. Flushing Toilets is a referral service; the plumber you hire does the work and gives you the quote.`,
    },
    {
      question: `How does matching work in ${cityName}?`,
      answer:
        "A person reviews your request and sends it to a licensed independent plumber who covers your ZIP code. If no plumber covers your area yet, we text you so you can call someone else right away.",
    },
    {
      question: "Will I get multiple calls?",
      answer:
        "No more than three plumbers will ever receive your request, and usually just one. You are never obligated to hire anyone who calls.",
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
      answer: `Licensed partner plumbers covering ${cityName}, ${stateAbbr}. Submit the form on this page to get matched — we are not the plumbing company.`,
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
