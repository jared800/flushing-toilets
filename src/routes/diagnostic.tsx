import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, RotateCcw, Wrench } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/shared/page-hero";
import { LeadForm } from "@/components/leads/lead-form";
import { Badge } from "@/components/ui/badge";
import { FaqSection } from "@/components/shared/faq-section";
import { JsonLd } from "@/components/shared/json-ld";
import {
  OUTCOMES,
  QUESTIONS,
  SEVERITY_META,
  START,
  getOutcome,
  getQuestion,
} from "@/data/diagnostic";

const TITLE = "Toilet problem diagnostic — find out what's wrong in 30 seconds";
const DESCRIPTION =
  "Answer two or three questions about what your toilet is doing and get a straight answer: what's causing it, whether you can fix it yourself, and when you actually need a plumber.";

export const Route = createFileRoute("/diagnostic")({
  component: DiagnosticPage,
  head: () => ({
    meta: [
      { title: `${TITLE} — Flushing Toilets` },
      { name: "description", content: DESCRIPTION },
    ],
  }),
});

const FAQS = [
  {
    question: "Why won't my toilet flush but it isn't clogged?",
    answer:
      "The usual cause is that the tank isn't filling high enough, so there isn't enough water weight to create a proper siphon. Take the lid off and check that the water stops about an inch below the top of the overflow tube. The other common cause is mineral scale blocking the small holes under the rim, which starves the bowl of water even though the tank empties normally.",
  },
  {
    question: "Is a gurgling toilet serious?",
    answer:
      "It can be. Gurgling means air is being pulled through the water in the trap, which happens when a vent is blocked or a drain line is partly obstructed. If only the toilet gurgles slightly it is worth investigating but not urgent. If flushing the toilet makes a nearby tub or sink react, the shared line downstream is blocking and that frequently precedes a full backup.",
  },
  {
    question: "Can I pour drain cleaner down a toilet?",
    answer:
      "It is a bad idea. Chemical drain cleaner rarely clears a toilet clog because it cannot reach past the trap in useful concentration, and it sits there as a hazard for whoever opens the fixture next. A flange plunger clears most toilet clogs, and a toilet auger clears most of the rest.",
  },
  {
    question: "How do I know if it's the toilet or the sewer line?",
    answer:
      "Check what happens to other fixtures. A toilet-only problem leaves every other drain in the house working normally. If flushing makes a tub gurgle, a sink drain slowly, or water appear anywhere else, the blockage is downstream of both fixtures and it is a main line problem rather than a toilet problem.",
  },
  {
    question: "How much does it cost to fix a running toilet?",
    answer:
      "If you do it yourself, usually between $8 and $20 for the part — a flapper, a fill valve, or nothing at all if the water level just needs adjusting. If you call someone it is normally a minimum service call since the labour is short. A toilet that runs continuously wastes water every day, so it is worth doing promptly either way.",
  },
];

function DiagnosticPage() {
  const [history, setHistory] = useState<string[]>([START]);
  const [outcomeId, setOutcomeId] = useState<string | null>(null);

  const currentId = history[history.length - 1];
  const question = getQuestion(currentId);
  const outcome = outcomeId ? getOutcome(outcomeId) : null;

  function choose(next?: string, landed?: string) {
    if (landed) {
      setOutcomeId(landed);
      return;
    }
    if (next) setHistory((h) => [...h, next]);
  }

  function back() {
    if (outcomeId) {
      setOutcomeId(null);
      return;
    }
    setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
  }

  function restart() {
    setHistory([START]);
    setOutcomeId(null);
  }

  return (
    <SiteShell>
      {/* Rendered server-side so search engines actually see it. */}
      <JsonLd
        id="diagnostic-faq"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <PageHero
        kicker="Free tool"
        title="What's wrong with my toilet?"
        description="Answer two or three questions and get a straight answer — what's causing it, whether it's a fix you can do yourself, and when it's worth calling someone. No email required."
      />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          {!outcome && question && (
            <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-fg-subtle">
                  Step {history.length}
                </span>
                {history.length > 1 && (
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-stream hover:underline"
                  >
                    <ArrowLeft className="h-3 w-3" /> Back
                  </button>
                )}
              </div>

              <h2 className="mt-2 font-display text-2xl font-semibold text-harbor">
                {question.prompt}
              </h2>
              {question.help && (
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {question.help}
                </p>
              )}

              <div className="mt-5 space-y-2">
                {question.answers.map((a) => (
                  <button
                    key={a.label}
                    type="button"
                    onClick={() => choose(a.next, a.outcome)}
                    className="w-full rounded-lg border border-border bg-bg px-4 py-3 text-left transition hover:border-stream/50 hover:bg-stream-soft/30"
                  >
                    <span className="block text-sm font-semibold text-fg">
                      {a.label}
                    </span>
                    {a.hint && (
                      <span className="mt-0.5 block text-xs text-fg-subtle">
                        {a.hint}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </section>
          )}

          {outcome && (
            <section className="space-y-5">
              <div
                className={
                  outcome.severity === "emergency"
                    ? "rounded-xl border border-danger/40 bg-danger-soft/30 p-5"
                    : outcome.severity === "call"
                      ? "rounded-xl border border-signal/40 bg-signal-soft/30 p-5"
                      : "rounded-xl border border-stream/40 bg-stream-soft/30 p-5"
                }
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant={
                      outcome.severity === "emergency"
                        ? "danger"
                        : outcome.severity === "call"
                          ? "signal"
                          : "stream"
                    }
                  >
                    {outcome.severity === "emergency" ? (
                      <AlertTriangle className="mr-1 inline h-3 w-3" />
                    ) : (
                      <Wrench className="mr-1 inline h-3 w-3" />
                    )}
                    {SEVERITY_META[outcome.severity].label}
                  </Badge>
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-stream hover:underline"
                  >
                    <ArrowLeft className="h-3 w-3" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-fg-subtle hover:underline"
                  >
                    <RotateCcw className="h-3 w-3" /> Start over
                  </button>
                </div>

                <h2 className="mt-3 font-display text-2xl font-semibold text-harbor">
                  {outcome.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {SEVERITY_META[outcome.severity].blurb}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-fg-subtle">
                  What's going on
                </h3>
                <p className="mt-2 text-base leading-relaxed text-fg-muted">
                  {outcome.cause}
                </p>

                <h3 className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-fg-subtle">
                  What to do
                </h3>
                <ol className="mt-2 space-y-2">
                  {outcome.steps.map((s, i) => (
                    <li key={s.slice(0, 30)} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-harbor text-[11px] font-bold text-white">
                        {i + 1}
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>

                {outcome.stopIf && (
                  <p className="mt-5 rounded-lg border border-signal/30 bg-signal-soft/20 px-3 py-2 text-sm leading-relaxed text-fg">
                    <span className="font-semibold">When to stop: </span>
                    {outcome.stopIf}
                  </p>
                )}

                {outcome.costNote && (
                  <p className="mt-3 text-sm leading-relaxed text-fg-subtle">
                    <span className="font-semibold text-fg-muted">Cost: </span>
                    {outcome.costNote}
                  </p>
                )}
              </div>

              {outcome.severity === "diy" && (
                <p className="text-sm leading-relaxed text-fg-muted">
                  That should be everything you need. If you try it and it
                  doesn't hold, come back and we'll find you someone local.
                </p>
              )}
            </section>
          )}

          <FaqSection
            title="Common questions"
            items={FAQS}
            schemaId="diagnostic"
            emitSchema={false}
          />
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <LeadForm
            variant={outcome?.urgency === "emergency" ? "emergency" : "full"}
            defaults={{
              serviceSlug: outcome?.serviceSlug,
              urgency: outcome?.urgency ?? "today",
              sourcePath: "/diagnostic",
            }}
            title={
              outcome?.severity === "emergency"
                ? "Get someone out now"
                : "Want a plumber instead?"
            }
            subtitle={
              outcome
                ? "Your ZIP finds local help. We already know what the problem is."
                : "Enter a ZIP and phone number and a person will read your request."
            }
          />
          <p className="mt-3 px-1 text-xs leading-relaxed text-fg-subtle">
            General guidance, not a substitute for an on-site inspection by a
            licensed plumber. If you smell gas or see sewage, stop and call a
            professional.
          </p>
        </div>
      </div>
    </SiteShell>
  );
}

/** Exported for the sitemap generator's sanity check. */
export const DIAGNOSTIC_OUTCOME_COUNT = OUTCOMES.length;
export const DIAGNOSTIC_QUESTION_COUNT = QUESTIONS.length;
