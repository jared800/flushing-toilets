import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-surface-muted text-fg-muted",
        harbor: "bg-harbor/10 text-harbor",
        stream: "bg-stream-soft text-stream",
        signal: "bg-signal-soft text-signal-hover",
        success: "bg-success-soft text-success",
        danger: "bg-danger-soft text-danger",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
