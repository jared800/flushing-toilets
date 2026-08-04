import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Clock3,
  MapPinned,
  Phone,
  Shield,
  Wrench,
} from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { GeoSearch } from "@/components/search/geo-search";
import { LeadForm } from "@/components/leads/lead-form";
import { StickyMobileCta } from "@/components/shared/sticky-mobile-cta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { STATES } from "@/data/locations";
import { SERVICES } from "@/data/services";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: "Flushing Toilets — Local plumbers for toilet trouble",
      },
      {
        name: "description",
        content:
          "Clogged, running, or leaking toilet? Get matched with licensed local plumbers in Texas, Florida, and Arizona.",
      },
    ],
  }),
});

function HomePage() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_color-mix(in_oklab,var(--color-stream)_12%,transparent),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_color-mix(in_oklab,var(--color-signal)_9%,transparent),_transparent_50%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20">
          <div>
            <Badge variant="harbor" className="mb-4">
              Licensed local partners
            </Badge>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-harbor sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
              Local plumbers for toilet trouble — fast.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
              Clogged, running, leaking, or emergency? Search your city and get
              matched with independent licensed plumbers near you.
            </p>
            <div className="mt-8">
              <GeoSearch />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-fg-muted">
              <span className="inline-flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-stream" />
                License verified partners
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4 text-stream" />
                Emergency & same-day options
              </span>
              <a
                href="tel:+18005550192"
                className="inline-flex items-center gap-1.5 font-semibold text-harbor"
              >
                <Phone className="h-4 w-4" />
                (800) 555-0192
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface/90 p-2 shadow-[0_24px_60px_-32px_rgba(11,61,74,0.5)] backdrop-blur-sm">
            <LeadForm
              variant="emergency"
              title="Need help now?"
              subtitle="Emergency: ZIP + phone. Or add details and a photo."
              defaults={{ sourcePath: "/", urgency: "emergency" }}
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-stream">
                Services
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-harbor">
                Toilet problems we cover
              </h2>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link to="/services">All services</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to="/services/$service"
                params={{ service: s.slug }}
                className="group rounded-xl border border-border bg-surface p-4 shadow-sm transition-colors hover:border-stream/40 hover:bg-bg-elevated"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-harbor group-hover:text-harbor-mid">
                    {s.name}
                  </h3>
                  <Wrench className="h-4 w-4 shrink-0 text-fg-subtle" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {s.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-bg-elevated/70 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-stream">
            How it works
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-harbor">
            Three steps to local help
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                n: "1",
                t: "Tell us the problem",
                d: "City or ZIP, what’s wrong, and how urgent it is. Photo optional.",
              },
              {
                n: "2",
                t: "We match a partner",
                d: "Licensed plumbers in your area — Preferred and Exclusive first when available.",
              },
              {
                n: "3",
                t: "They contact you",
                d: "Expect a call or text to confirm details and schedule service.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="rounded-xl border border-border bg-surface p-5 shadow-sm"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-harbor font-display text-sm font-bold text-bg-elevated">
                  {step.n}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-harbor">
                  {step.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-fg-muted">
            Flushing Toilets is a marketplace. We connect you with independent
            local plumbers — we are not the plumbing company performing the work.
          </p>
        </div>
      </section>

      <section className="border-b border-border py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-stream">
                Locations
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-harbor">
                Deep coverage to start
              </h2>
              <p className="mt-2 max-w-xl text-fg-muted">
                Launching deep in Texas, Florida, and Arizona — with fully unique
                depth in Houston and Miami first.
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link to="/locations">Browse all</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {STATES.map((state) => (
              <Link
                key={state.slug}
                to="/locations/$state"
                params={{ state: state.slug }}
                className="rounded-xl border border-border bg-surface p-5 shadow-sm transition-colors hover:border-harbor/30"
              >
                <div className="flex items-center gap-2">
                  <MapPinned className="h-5 w-5 text-stream" />
                  <h3 className="font-display text-xl font-semibold text-harbor">
                    {state.name}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {state.blurb}
                </p>
                <p className="mt-4 text-xs font-semibold text-stream">
                  {state.cities.length} cities · View {state.abbr}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 rounded-2xl border border-border bg-harbor px-6 py-8 text-bg-elevated sm:grid-cols-[1.2fr_auto] sm:items-center sm:px-10 sm:py-10">
            <div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Are you a licensed plumber?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-bg-elevated/80 sm:text-base">
                High-intent toilet leads in your cities. Hybrid plans: Connect,
                Preferred, or Exclusive territory.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="primary" size="lg">
                <Link to="/for-plumbers">See partner plans</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/25 bg-transparent text-bg-elevated hover:bg-white/10"
              >
                <Link to="/for-plumbers/apply">Apply</Link>
              </Button>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-fg-muted">
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-stream" />
              TCPA-compliant consent on every form
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-stream" />
              License & insurance required for partners
            </span>
          </div>
        </div>
      </section>

      <StickyMobileCta />
      <div className="h-16 sm:hidden" />
    </SiteShell>
  );
}
