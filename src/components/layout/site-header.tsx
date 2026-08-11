import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Droplets, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const links = [
  // The diagnostic sits first on purpose. It is the only page on this site
  // someone would link to, and until 2026-08-11 nothing linked to it at all.
  { to: "/diagnostic", label: "Diagnose it" },
  { to: "/services", label: "Services" },
  { to: "/locations", label: "Locations" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/guides", label: "Guides" },
  { to: "/for-plumbers", label: "For plumbers" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg-elevated/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-harbor text-bg-elevated">
            <Droplets className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold tracking-tight text-harbor">
              Flushing Toilets
            </span>
            <span className="hidden text-[11px] font-medium text-fg-subtle sm:block">
              Local plumbers for toilet trouble
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-2.5 py-1.5 text-sm font-medium text-fg-muted transition-colors hover:bg-surface-muted hover:text-fg"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/get-help">Get a plumber</Link>
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-fg md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-border bg-bg-elevated md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-fg hover:bg-surface-muted"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/get-help"
            onClick={() => setOpen(false)}
            className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-lg bg-signal px-4 text-sm font-semibold text-ink shadow-sm hover:bg-signal-hover"
          >
            Get a plumber
          </Link>
        </nav>
      </div>
    </header>
  );
}
