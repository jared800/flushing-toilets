import * as React from "react";
import { cn } from "@/lib/cn";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-11 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-fg shadow-sm transition-colors placeholder:text-fg-subtle focus-visible:border-stream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stream/25 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";
