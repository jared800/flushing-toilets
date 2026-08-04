import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function PageHero({
  kicker,
  title,
  description,
  children,
  className,
}: {
  kicker?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "border-b border-border bg-[radial-gradient(ellipse_at_top_right,_color-mix(in_oklab,var(--color-stream)_10%,transparent),_transparent_55%)]",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {kicker && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-stream">
            {kicker}
          </p>
        )}
        <h1 className="max-w-3xl font-display text-3xl font-semibold tracking-tight text-harbor sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
            {description}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
