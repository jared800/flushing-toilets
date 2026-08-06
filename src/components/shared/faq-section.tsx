import type { FaqItem } from "@/data/faqs";
import { JsonLd } from "@/components/shared/json-ld";

export function FaqSection({
  title = "Frequently asked questions",
  items,
  schemaId,
  emitSchema = true,
}: {
  title?: string;
  items: FaqItem[];
  schemaId: string;
  /**
   * Set false when the page already emits its own FAQPage block. Two FAQPage
   * objects on one URL is a structured-data error, not twice the coverage.
   */
  emitSchema?: boolean;
}) {
  return (
    <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      {emitSchema && items.length > 0 && (
        <JsonLd
          id={`faq-${schemaId}`}
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }}
        />
      )}
      <h2 className="font-display text-xl font-semibold text-harbor">{title}</h2>
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-lg border border-border bg-bg px-3 py-2"
          >
            <summary className="cursor-pointer list-none text-sm font-semibold text-fg marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-2">
                {item.question}
                <span className="text-fg-subtle transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-2 pb-1 text-sm leading-relaxed text-fg-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
