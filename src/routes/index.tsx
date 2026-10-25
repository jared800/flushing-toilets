import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Clock3,
  MapPinned,
  Stethoscope,
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
import { WhoRunsThis } from "@/components/shared/who-runs-this";
import { pageUpdated } from "@/data/page-dates";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: "Flushing Toilets — Toilet repair guides and plumber referrals",
      },
      {
        name: "description",
        content:
          "Clogged, running, or leaking toilet? Plain-English fix guides, a free diagnostic, and a free referral request a real person reads.",
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
            {/* Said "Licensed local partners" until 2026-08-11. The partner
                list is empty, so that was a claim about plumbers we have not
                signed. Promote the thing we actually have instead. */}
            <Badge variant="harbor" className="mb-4">
              Free toilet diagnostic
            </Badge>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-harbor sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
              Fix the toilet yourself, or ask for a plumber.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
              Clogged, running, leaking, or emergency? Run the free diagnostic or
              read a fix guide. If you need a plumber, send a request: a person
              reads it and, if an independent plumber covers your area, passes
              it on. We are a referral service, not a plumbing company.
            </p>
            <div className="mt-8">
              <GeoSearch />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-fg-muted">
              <span className="inline-flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-stream" />
                Free referral service · independent plumbers
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4 text-stream" />
                Emergency requests flagged first
              </span>
              {/* This slot held (800) 555-0192 until 2026-08-11 — a reserved
                  fictional number that does not connect. */}
              <Link
                to="/diagnostic"
                className="inline-flex items-center gap-1.5 font-semibold text-harbor hover:underline"
              >
                <Stethoscope className="h-4 w-4" />
                Not sure what is wrong? Diagnose it free
              </Link>
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

      <section className="border-b border-border py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-stream">
            Start here
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-harbor">
            Most-read guides and local pages
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-display text-lg font-semibold text-harbor">
                Fix it yourself
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {[
                  { slug: "why-is-my-toilet-running", label: "Why your toilet keeps running" },
                  { slug: "toilet-leaking-at-base", label: "Water around the base of the toilet" },
                  { slug: "how-to-unclog-a-toilet", label: "How to unclog a toilet" },
                  { slug: "toilet-installation-cost", label: "How much toilet installation costs" },
                ].map((g) => (
                  <li key={g.slug}>
                    <Link
                      to="/guides/$slug"
                      params={{ slug: g.slug }}
                      className="font-semibold text-stream hover:underline"
                    >
                      {g.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/guides" className="text-stream hover:underline">
                    All repair guides
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-harbor">
                Find a plumber in Utah
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                We are starting in Utah, from Ogden to Utah County.
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    to="/locations/$state"
                    params={{ state: "utah" }}
                    className="font-semibold text-stream hover:underline"
                  >
                    Toilet plumbers in Utah
                  </Link>
                </li>
                <li>
                  <Link
                    to="/locations/$state/$city"
                    params={{ state: "utah", city: "salt-lake-city" }}
                    className="font-semibold text-stream hover:underline"
                  >
                    Toilet plumbers in Salt Lake City
                  </Link>
                </li>
                <li>
                  <Link
                    to="/locations/$state/$city"
                    params={{ state: "utah", city: "provo" }}
                    className="font-semibold text-stream hover:underline"
                  >
                    Toilet plumbers in Provo
                  </Link>
                </li>
              </ul>
            </div>
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
                t: "A person reads it",
                d: "If an independent plumber who covers your ZIP is available, we pass your request on. If nobody covers it yet, we tell you instead of leaving you waiting.",
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
                Where we take requests
              </h2>
              <p className="mt-2 max-w-xl text-fg-muted">
                We are starting in Utah, with local pages for eight Wasatch Front
                cities from Ogden to Provo. We also take requests in Texas,
                Florida, and Arizona, but we do not have plumbers signed up
                everywhere yet. If nobody covers your area, we tell you.
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
                We email you toilet jobs in your area. No subscription, nothing to
                sign, and right now it costs you nothing.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="primary" size="lg">
                <Link to="/for-plumbers">How it works for you</Link>
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
              Clear contact consent on every form
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-stream" />
              Referral service, not a plumbing company
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <WhoRunsThis updated={pageUpdated("/")} />
      </div>

      <StickyMobileCta />
      <div className="h-16 sm:hidden" />
    </SiteShell>
  );
}
