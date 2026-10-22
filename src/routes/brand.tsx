import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  Building2,
  Check,
  Droplets,
  MapPinned,
  Phone,
  Search,
  Shield,
  Sparkles,
  Target,
  Wrench,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/brand")({
  // Internal brand sheet: keep it out of search (2026-10-22 claims cleanup).
  head: () => ({ meta: [{ name: "robots", content: "noindex, nofollow" }] }),
  component: BrandSystemPage,
});

const nav = [
  { id: "identity", label: "Identity" },
  { id: "voice", label: "Voice" },
  { id: "color", label: "Color" },
  { id: "type", label: "Type" },
  { id: "offer", label: "Offer sheet" },
  { id: "pages", label: "Page map" },
  { id: "launch", label: "Launch" },
];

const tiers = [
  {
    name: "Connect",
    badge: "Shared",
    tagline: "Affordable entry for growing shops",
    monthly: "$149–$249",
    monthlyNote: "per city / metro",
    lead: "$28–$48",
    leadNote: "shared with up to 2 other plumbers",
    features: [
      "Listed on city & service pages",
      "Shared leads (max 3 recipients)",
      "License & insurance badge",
      "Lead dashboard + email/SMS alerts",
      "Basic territory: selected cities",
    ],
    accent: "stream" as const,
  },
  {
    name: "Preferred",
    badge: "Featured",
    tagline: "Top placement + first look at leads",
    monthly: "$349–$599",
    monthlyNote: "per city / metro",
    lead: "$42–$72",
    leadNote: "priority routing before Connect",
    features: [
      "Everything in Connect",
      "Featured badge & top-of-list placement",
      "Priority lead routing (first 5 min exclusive)",
      "Profile photo, crew notes, response promise",
      "Monthly performance report",
    ],
    accent: "signal" as const,
    highlight: true,
  },
  {
    name: "Exclusive",
    badge: "Territory",
    tagline: "Own the zip or small city",
    monthly: "$799–$1,999",
    monthlyNote: "by market demand",
    lead: "Included allotment",
    leadNote: "or discounted PPL after cap",
    features: [
      "Everything in Preferred",
      "Sole or primary plumber in territory",
      "All matching leads in geo + services",
      "Included lead allotment (tiered by city)",
      "Custom landing blurb on city pages",
      "Quarterly territory review",
    ],
    accent: "harbor" as const,
  },
];

const services = [
  { slug: "clogged-toilet", name: "Clogged toilet", urgency: "High" },
  { slug: "running-toilet", name: "Running toilet", urgency: "Med" },
  { slug: "toilet-leak", name: "Toilet leak", urgency: "High" },
  { slug: "toilet-install", name: "Toilet install", urgency: "Med" },
  { slug: "toilet-replacement", name: "Toilet replacement", urgency: "Med" },
  { slug: "emergency-plumber", name: "Emergency plumber", urgency: "Critical" },
  { slug: "sewer-backup", name: "Sewer backup", urgency: "Critical" },
];

const consumerPages = [
  { path: "/", purpose: "National hub: search, services, trust, how it works" },
  { path: "/services", purpose: "Service index linking all problem types" },
  { path: "/services/{service}", purpose: "National service explainer + geo CTA" },
  { path: "/locations", purpose: "Browse states A–Z" },
  { path: "/locations/{state}", purpose: "State hub: top cities, statewide services" },
  {
    path: "/locations/{state}/{city}",
    purpose: "City hub: local intro, services, plumbers, form",
  },
  {
    path: "/locations/{state}/{city}/{service}",
    purpose: "Money page: city × service SEO + lead capture",
  },
  { path: "/search", purpose: "Structured search results (city/zip + service)" },
  { path: "/get-help", purpose: "Short multi-step lead form (primary conversion)" },
  { path: "/how-it-works", purpose: "Consumer trust & process" },
  { path: "/reviews", purpose: "Aggregate reviews / social proof" },
  { path: "/guides", purpose: "SEO content index" },
  { path: "/guides/{slug}", purpose: "Problem guides & cost articles" },
  { path: "/about", purpose: "Company story, marketplace transparency" },
  { path: "/contact", purpose: "Support for homeowners & partners" },
  { path: "/privacy", purpose: "Privacy policy" },
  { path: "/terms", purpose: "Terms of use" },
  { path: "/tcpa", purpose: "Consent & communications policy" },
];

const partnerPages = [
  { path: "/for-plumbers", purpose: "Sales landing: hybrid model pitch" },
  { path: "/for-plumbers/pricing", purpose: "Public tier comparison" },
  { path: "/for-plumbers/apply", purpose: "Partner application (license upload)" },
  { path: "/partners/login", purpose: "Partner auth" },
  { path: "/partners", purpose: "Dashboard home: leads, stats, territory" },
  { path: "/partners/leads", purpose: "Lead inbox + status + feedback" },
  { path: "/partners/territory", purpose: "Cities/zips & services covered" },
  { path: "/partners/billing", purpose: "Subscription + lead invoices" },
  { path: "/partners/profile", purpose: "Public profile, hours, response SLA" },
];

const colors = [
  {
    name: "Harbor",
    hex: "#0B3D4A",
    token: "harbor",
    use: "Primary brand, headers, nav, trust blocks",
    className: "bg-harbor text-bg-elevated",
  },
  {
    name: "Harbor Deep",
    hex: "#072C36",
    token: "harbor-deep",
    use: "Footer, dark bands, high-contrast panels",
    className: "bg-harbor-deep text-bg-elevated",
  },
  {
    name: "Stream",
    hex: "#1A7A72",
    token: "stream",
    use: "Secondary actions, links, success-adjacent UI",
    className: "bg-stream text-bg-elevated",
  },
  {
    name: "Signal",
    hex: "#D9921F",
    token: "signal",
    use: "Primary CTAs only — call, get help, apply",
    className: "bg-signal text-ink",
  },
  {
    name: "Foam",
    hex: "#F4F1EA",
    token: "bg / foam",
    use: "Page background (warm, not sterile white)",
    className: "bg-bg text-fg border border-border",
  },
  {
    name: "Ink",
    hex: "#152028",
    token: "fg / ink",
    use: "Body text, icons on light surfaces",
    className: "bg-ink text-bg-elevated",
  },
];

function BrandSystemPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-bg-elevated/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-harbor text-bg-elevated">
              <Droplets className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <div className="leading-tight">
              <p className="font-display text-base font-semibold tracking-tight text-harbor">
                Flushing Toilets
              </p>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-fg-subtle">
                Brand system v1
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-md px-2.5 py-1.5 text-sm font-medium text-fg-muted transition-colors hover:bg-surface-muted hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#offer"
            className="rounded-lg bg-signal px-3 py-2 text-sm font-semibold text-ink shadow-sm transition-colors hover:bg-signal-hover"
          >
            Offer sheet
          </a>
        </div>
        <div className="flex gap-1 overflow-x-auto border-t border-border/60 px-4 py-2 lg:hidden">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-fg-muted"
            >
              {item.label}
            </a>
          ))}
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_color-mix(in_oklab,var(--color-stream)_12%,transparent),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_color-mix(in_oklab,var(--color-signal)_10%,transparent),_transparent_50%)]" />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-harbor">
                <Sparkles className="h-3.5 w-3.5 text-signal" />
                Locked decisions · Aug 2026
              </p>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-harbor sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                Brand system & offer sheet for flushingtoilets.com
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
                Hybrid lead marketplace for toilet and drain plumbing. Calm,
                competent brand. Deep launch in a few states. Plumbers pay a
                monthly territory fee plus pay-per-lead.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#identity"
                  className="inline-flex items-center gap-2 rounded-lg bg-harbor px-4 py-2.5 text-sm font-semibold text-bg-elevated transition-colors hover:bg-harbor-mid"
                >
                  Review identity
                </a>
                <a
                  href="#pages"
                  className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm font-semibold text-fg transition-colors hover:bg-surface-muted"
                >
                  See page map
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-5 shadow-[0_20px_50px_-28px_rgba(11,61,74,0.45)]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-subtle">
                Product thesis
              </p>
              <p className="mt-3 font-display text-xl font-medium leading-snug text-harbor">
                “Toilet repair guides, plus a free referral when you need a
                plumber.”
              </p>
              <ul className="mt-5 space-y-3 text-sm text-fg-muted">
                <li className="flex gap-2">
                  <Target className="mt-0.5 h-4 w-4 shrink-0 text-stream" />
                  Consumer: city/state SEO + search + short lead form
                </li>
                <li className="flex gap-2">
                  <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-stream" />
                  Plumber: Connect · Preferred · Exclusive hybrid tiers
                </li>
                <li className="flex gap-2">
                  <MapPinned className="mt-0.5 h-4 w-4 shrink-0 text-stream" />
                  Launch deep: Texas, Florida, Arizona first
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Identity */}
        <Section id="identity" title="Brand identity" kicker="01">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <h3 className="font-display text-xl font-semibold text-harbor">
                Names
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <Row term="Product / site" def="Flushing Toilets" />
                <Row term="Domain" def="flushingtoilets.com" />
                <Row term="Plumber program" def="Flushing Toilets for plumbers" />
                <Row term="Short consumer line" def="Get local toilet help" />
                <Row
                  term="Legal disclaimer (UI)"
                  def="We connect you with independent local plumbers — we are not the plumbing company."
                />
              </dl>
            </Card>
            <Card>
              <h3 className="font-display text-xl font-semibold text-harbor">
                Positioning
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                Flushing Toilets is the{" "}
                <strong className="font-semibold text-fg">
                  toilet-problem specialist
                </strong>{" "}
                in local plumber lead gen — not a generic “all plumbing” dump.
                Narrow focus builds clearer SEO, higher intent leads, and a brand
                plumbers can understand in one sentence.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Pill icon={Shield} label="Trust-first" />
                <Pill icon={Zap} label="Emergency-ready" />
                <Pill icon={Wrench} label="Referral, not a plumbing company" />
                <Pill icon={Search} label="Local SEO engine" />
              </div>
            </Card>
            <Card className="lg:col-span-2">
              <h3 className="font-display text-xl font-semibold text-harbor">
                Taglines (approved set)
              </h3>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <Quote
                  label="Primary"
                  text="Local plumbers for toilet trouble — fast."
                />
                <Quote
                  label="Consumer hero"
                  text="Fix the toilet yourself, or ask for a plumber."
                />
                <Quote
                  label="Partner sales"
                  text="High-intent toilet leads in your cities — without the junk volume."
                />
              </div>
            </Card>
          </div>
        </Section>

        {/* Voice */}
        <Section id="voice" title="Voice & vibe" kicker="02" muted>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <h3 className="font-display text-lg font-semibold text-harbor">
                Brand vibe
              </h3>
              <p className="mt-2 text-2xl font-display font-medium text-fg">
                Harbor Trust
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                Calm, competent emergency service. Feels like a calm local
                pro you’d actually call at 11pm — not a joke site, not a panic
                red ambulance, not generic SaaS purple.
              </p>
            </Card>
            <Card>
              <h3 className="font-display text-lg font-semibold text-harbor">
                Do
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-fg-muted">
                {[
                  "Direct, specific, human",
                  "Name the problem and the fix path",
                  "State response expectations clearly",
                  "Marketplace transparency always",
                  "Short sentences under stress (mobile emergency)",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {t}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="font-display text-lg font-semibold text-harbor">
                Don’t
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-fg-muted">
                {[
                  "Toilet humor as the hero message",
                  "Fake “our techs are en route” if partners go",
                  "Hype adjectives with no proof",
                  "Scammy countdown timers / dark patterns",
                  "Emoji-as-icon or cartoon plunger mascots as identity",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-danger-soft text-[10px] font-bold text-danger">
                      ×
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-subtle">
                Sample microcopy · consumer
              </p>
              <div className="mt-4 space-y-3 rounded-lg border border-border bg-bg p-4">
                <p className="font-display text-xl font-semibold text-harbor">
                  Get help in your city
                </p>
                <p className="text-sm text-fg-muted">
                  Tell us your ZIP and what’s wrong. A person reads it and
                  passes it on if a plumber covers your area.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-lg bg-signal px-3 py-2 text-sm font-semibold text-ink">
                    Get a plumber
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold text-harbor">
                    <Phone className="h-4 w-4" />
                    Call now
                  </span>
                </div>
              </div>
            </Card>
            <Card>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-subtle">
                Sample microcopy · partner
              </p>
              <div className="mt-4 space-y-3 rounded-lg border border-border bg-bg p-4">
                <p className="font-display text-xl font-semibold text-harbor">
                  Toilet-intent leads, not tire-kickers
                </p>
                <p className="text-sm text-fg-muted">
                  Homeowners searching for clogged, running, or emergency toilet
                  help in your cities. Pick Connect, Preferred, or Exclusive.
                </p>
                <span className="inline-flex rounded-lg bg-harbor px-3 py-2 text-sm font-semibold text-bg-elevated">
                  Apply to partner
                </span>
              </div>
            </Card>
          </div>
        </Section>

        {/* Color */}
        <Section id="color" title="Color system" kicker="03">
          <p className="mb-6 max-w-2xl text-fg-muted">
            Six core colors. Signal amber is reserved for primary actions so CTAs
            stay scannable. No purple, no rainbow gradients, no pure #000/#fff as
            the whole system.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colors.map((c) => (
              <div
                key={c.hex}
                className={`rounded-xl border border-border p-4 shadow-sm ${c.className}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-lg font-semibold">{c.name}</p>
                    <p className="mt-0.5 font-mono text-xs opacity-80">{c.hex}</p>
                  </div>
                  <code className="rounded bg-black/10 px-1.5 py-0.5 text-[11px] font-medium">
                    {c.token}
                  </code>
                </div>
                <p className="mt-4 text-sm opacity-90">{c.use}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-subtle">
                Surfaces
              </p>
              <div className="mt-3 space-y-2">
                <Swatch label="Page bg" className="bg-bg border border-border" />
                <Swatch label="Elevated" className="bg-bg-elevated border border-border" />
                <Swatch label="Card" className="bg-surface border border-border" />
                <Swatch label="Muted" className="bg-surface-muted border border-border" />
              </div>
            </Card>
            <Card>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-subtle">
                Semantic
              </p>
              <div className="mt-3 space-y-2">
                <Swatch
                  label="Success"
                  className="bg-success-soft text-success border border-success/20"
                />
                <Swatch
                  label="Danger"
                  className="bg-danger-soft text-danger border border-danger/20"
                />
                <Swatch
                  label="Stream soft"
                  className="bg-stream-soft text-stream border border-stream/20"
                />
                <Swatch
                  label="Signal soft"
                  className="bg-signal-soft text-signal-hover border border-signal/25"
                />
              </div>
            </Card>
            <Card>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-subtle">
                CTA stack
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  className="rounded-lg bg-signal px-4 py-2.5 text-sm font-semibold text-ink hover:bg-signal-hover"
                >
                  Primary — Get a plumber
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-harbor px-4 py-2.5 text-sm font-semibold text-bg-elevated hover:bg-harbor-mid"
                >
                  Secondary — Browse cities
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm font-semibold text-fg hover:bg-surface-muted"
                >
                  Tertiary — How it works
                </button>
              </div>
            </Card>
          </div>
        </Section>

        {/* Type */}
        <Section id="type" title="Typography" kicker="04" muted>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-subtle">
                Display — Fraunces
              </p>
              <p className="mt-4 font-display text-4xl font-semibold tracking-tight text-harbor">
                Local help that shows up.
              </p>
              <p className="mt-3 text-sm text-fg-muted">
                Headings, hero lines, price figures. Optical size friendly;
                slightly human without looking novelty.
              </p>
            </Card>
            <Card>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-subtle">
                Body — DM Sans
              </p>
              <p className="mt-4 text-base leading-relaxed text-fg">
                Forms, navigation, FAQs, and partner dashboard UI. Clean, highly
                legible at 14–16px on mobile — critical when someone’s floor is
                wet and they’re one-handed on a phone.
              </p>
              <p className="mt-3 text-sm text-fg-muted">
                Weights: 400 body · 500 UI · 600 labels/buttons · 700 rare
                emphasis.
              </p>
            </Card>
          </div>
          <Card className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <TypeSample label="Display XL" className="font-display text-4xl font-semibold text-harbor" sample="Austin, TX" />
              <TypeSample label="Display L" className="font-display text-2xl font-semibold text-harbor" sample="Clogged toilet" />
              <TypeSample label="Body" className="text-base text-fg" sample="Ask for a plumber near you." />
              <TypeSample label="Caption" className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-subtle" sample="Response goal" />
            </div>
          </Card>
        </Section>

        {/* Offer */}
        <Section id="offer" title="Offer sheet — hybrid model" kicker="05">
          <div className="mb-8 max-w-3xl">
            <p className="text-lg text-fg-muted">
              Plumbers pay a{" "}
              <strong className="font-semibold text-fg">monthly subscription</strong>{" "}
              for territory access and placement, plus{" "}
              <strong className="font-semibold text-fg">pay-per-lead</strong> on
              real homeowner inquiries. Three named tiers.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-xl border p-5 shadow-sm ${
                  tier.highlight
                    ? "border-signal/50 bg-surface ring-2 ring-signal/30"
                    : "border-border bg-surface"
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-5 rounded-full bg-signal px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink">
                    Best default
                  </span>
                )}
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-2xl font-semibold text-harbor">
                    {tier.name}
                  </h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                      tier.accent === "signal"
                        ? "bg-signal-soft text-signal-hover"
                        : tier.accent === "stream"
                          ? "bg-stream-soft text-stream"
                          : "bg-harbor/10 text-harbor"
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>
                <p className="mt-2 text-sm text-fg-muted">{tier.tagline}</p>
                <div className="mt-5 border-t border-border pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-subtle">
                    Monthly
                  </p>
                  <p className="mt-1 font-display text-3xl font-semibold tabular-nums text-fg">
                    {tier.monthly}
                  </p>
                  <p className="text-xs text-fg-subtle">{tier.monthlyNote}</p>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-subtle">
                    Per lead
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold tabular-nums text-harbor">
                    {tier.lead}
                  </p>
                  <p className="text-xs text-fg-subtle">{tier.leadNote}</p>
                </div>
                <ul className="mt-5 flex-1 space-y-2.5 border-t border-border pt-4">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-fg-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-stream" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <Card>
              <h3 className="font-display text-lg font-semibold text-harbor">
                Lead pricing modifiers
              </h3>
              <div className="mt-4 overflow-hidden rounded-lg border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface-muted text-xs uppercase tracking-wide text-fg-subtle">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Lead type</th>
                      <th className="px-3 py-2 font-semibold">Modifier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-fg-muted">
                    <tr>
                      <td className="px-3 py-2.5">Emergency / after-hours</td>
                      <td className="px-3 py-2.5 font-medium text-fg">+25–40%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2.5">Install / replacement quote</td>
                      <td className="px-3 py-2.5 font-medium text-fg">Base–high</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2.5">Running toilet / minor</td>
                      <td className="px-3 py-2.5 font-medium text-fg">−15–25%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2.5">Sewer backup</td>
                      <td className="px-3 py-2.5 font-medium text-fg">+30–50%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
            <Card>
              <h3 className="font-display text-lg font-semibold text-harbor">
                Operating rules (locked)
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-fg-muted">
                {[
                  "License + insurance required before activation",
                  "Connect: max 3 plumbers per lead; Preferred gets 5-minute exclusive window when both active",
                  "Exclusive: one primary partner per zip (or small city); overflow only if they reject/miss SLA",
                  "Invalid lead credit policy published (wrong number, not plumbing, duplicate <24h)",
                  "TCPA consent captured on every consumer form before call/text",
                  "Clear marketplace disclosure on every conversion page",
                ].map((r) => (
                  <li key={r} className="flex gap-2">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-stream" />
                    {r}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="mt-6">
            <h3 className="font-display text-lg font-semibold text-harbor">
              Core services (V1 taxonomy)
            </h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <div
                  key={s.slug}
                  className="rounded-lg border border-border bg-bg px-3 py-2.5"
                >
                  <p className="text-sm font-semibold text-fg">{s.name}</p>
                  <p className="mt-0.5 text-xs text-fg-subtle">
                    /{s.slug} · {s.urgency} intent
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* Page map */}
        <Section id="pages" title="Page map" kicker="06" muted>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-stream" />
                <h3 className="font-display text-xl font-semibold text-harbor">
                  Consumer site
                </h3>
              </div>
              <p className="mt-2 text-sm text-fg-muted">
                SEO + conversion surface. Every city × service money page ends in
                the same short lead form.
              </p>
              <ul className="mt-5 divide-y divide-border rounded-lg border border-border bg-bg">
                {consumerPages.map((p) => (
                  <li
                    key={p.path}
                    className="grid gap-1 px-3 py-2.5 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] sm:gap-3"
                  >
                    <code className="break-all text-xs font-semibold text-harbor">
                      {p.path}
                    </code>
                    <span className="text-xs text-fg-muted sm:text-sm">
                      {p.purpose}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-stream" />
                <h3 className="font-display text-xl font-semibold text-harbor">
                  Partner / plumber
                </h3>
              </div>
              <p className="mt-2 text-sm text-fg-muted">
                Sales pages public; dashboard behind auth after approval.
              </p>
              <ul className="mt-5 divide-y divide-border rounded-lg border border-border bg-bg">
                {partnerPages.map((p) => (
                  <li
                    key={p.path}
                    className="grid gap-1 px-3 py-2.5 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] sm:gap-3"
                  >
                    <code className="break-all text-xs font-semibold text-harbor">
                      {p.path}
                    </code>
                    <span className="text-xs text-fg-muted sm:text-sm">
                      {p.purpose}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-lg border border-stream/25 bg-stream-soft/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stream">
                  URL conventions
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-fg-muted">
                  <li>
                    States:{" "}
                    <code className="text-harbor">/locations/texas</code>
                  </li>
                  <li>
                    Cities:{" "}
                    <code className="text-harbor">/locations/texas/austin</code>
                  </li>
                  <li>
                    Money:{" "}
                    <code className="text-harbor">
                      /locations/texas/austin/clogged-toilet
                    </code>
                  </li>
                  <li>Lowercase slugs, hyphens, no query-string SEO pages</li>
                </ul>
              </div>
            </Card>
          </div>

          <Card className="mt-6">
            <h3 className="font-display text-lg font-semibold text-harbor">
              Primary user journeys
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Journey
                title="Emergency homeowner"
                steps={[
                  "Land on city or city×service page",
                  "Tap Call or Get a plumber",
                  "ZIP + problem + phone (≤4 fields)",
                  "Matched → partner notified",
                ]}
              />
              <Journey
                title="Planner / non-urgent"
                steps={[
                  "Search city or browse locations",
                  "Compare service guides / FAQs",
                  "Submit form with schedule window",
                  "Preferred/Exclusive partner first",
                ]}
              />
              <Journey
                title="Plumber sales"
                steps={[
                  "/for-plumbers → pricing",
                  "Apply with license proof",
                  "Pick cities + tier",
                  "Go live → lead inbox",
                ]}
              />
            </div>
          </Card>
        </Section>

        {/* Launch */}
        <Section id="launch" title="Launch plan" kicker="07">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <h3 className="font-display text-xl font-semibold text-harbor">
                Phase 1 markets (deep)
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Market
                  state="Texas"
                  slug="texas"
                  cities={[
                    "Houston",
                    "Dallas",
                    "Austin",
                    "San Antonio",
                    "Fort Worth",
                    "El Paso",
                    "Arlington",
                    "Corpus Christi",
                    "Plano",
                    "Lubbock",
                  ]}
                />
                <Market
                  state="Florida"
                  slug="florida"
                  cities={[
                    "Jacksonville",
                    "Miami",
                    "Tampa",
                    "Orlando",
                    "St. Petersburg",
                    "Hialeah",
                    "Port St. Lucie",
                    "Cape Coral",
                    "Tallahassee",
                    "Fort Lauderdale",
                  ]}
                />
                <Market
                  state="Arizona"
                  slug="arizona"
                  cities={[
                    "Phoenix",
                    "Tucson",
                    "Mesa",
                    "Chandler",
                    "Scottsdale",
                    "Gilbert",
                    "Glendale",
                    "Tempe",
                    "Peoria",
                    "Surprise",
                  ]}
                />
              </div>
              <p className="mt-4 text-sm text-fg-muted">
                For each city: hub page + all 7 service money pages. Target ≈{" "}
                <strong className="text-fg">30 cities × 7 services ≈ 210+</strong>{" "}
                high-intent landing pages before national expansion.
              </p>
            </Card>
            <Card>
              <h3 className="font-display text-xl font-semibold text-harbor">
                Build order
              </h3>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-fg-muted">
                <li>
                  <span className="font-semibold text-fg">Consumer shell</span> —
                  home, search, lead form, trust
                </li>
                <li>
                  <span className="font-semibold text-fg">Location engine</span> —
                  state/city/service templates
                </li>
                <li>
                  <span className="font-semibold text-fg">Partner sales</span> —
                  for-plumbers + apply + tiers
                </li>
                <li>
                  <span className="font-semibold text-fg">Partner dashboard</span> —
                  leads, billing stub, territory
                </li>
                <li>
                  <span className="font-semibold text-fg">Content layer</span> —
                  guides + FAQs + schema
                </li>
              </ol>
            </Card>
          </div>

          <Card className="mt-6">
            <h3 className="font-display text-lg font-semibold text-harbor">
              Decision log — locked
            </h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="border-b border-border text-xs uppercase tracking-wide text-fg-subtle">
                  <tr>
                    <th className="py-2 pr-4 font-semibold">Topic</th>
                    <th className="py-2 font-semibold">Decision</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-fg-muted">
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-fg">Business model</td>
                    <td className="py-2.5">Hybrid: monthly sub + PPL (Connect / Preferred / Exclusive)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-fg">Launch</td>
                    <td className="py-2.5">Deep in TX, FL, AZ — not thin nationwide</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-fg">Vibe</td>
                    <td className="py-2.5">Harbor Trust — calm, competent, emergency-ready</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-fg">Primary CTA color</td>
                    <td className="py-2.5">Signal amber (#D9921F) on Foam backgrounds</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-fg">Type</td>
                    <td className="py-2.5">Fraunces (display) + DM Sans (UI/body)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-fg">Focus</td>
                    <td className="py-2.5">Toilet & closely related drain/sewer problems — not full-service plumbing marketplace yet</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </Section>

        <footer className="border-t border-harbor/20 bg-harbor-deep text-bg-elevated">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
            <div>
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-signal" />
                <p className="font-display text-lg font-semibold">Flushing Toilets</p>
              </div>
              <p className="mt-2 max-w-md text-sm text-bg-elevated/75">
                Brand system & offer sheet locked for V1. Ready to build the
                consumer site and partner funnel whenever you are.
              </p>
            </div>
            <p className="text-xs text-bg-elevated/55">
              flushingtoilets.com · Brand system v1 · Aug 2026
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

function Section({
  id,
  title,
  kicker,
  children,
  muted,
}: {
  id: string;
  title: string;
  kicker: string;
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-b border-border ${muted ? "bg-bg-elevated/60" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 flex items-baseline gap-3">
          <span className="font-mono text-sm font-semibold text-signal">
            {kicker}
          </span>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-harbor">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface p-5 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function Row({ term, def }: { term: string; def: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-4">
      <dt className="text-fg-subtle">{term}</dt>
      <dd className="font-medium text-fg">{def}</dd>
    </div>
  );
}

function Pill({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-bg px-3 py-2 text-sm font-medium text-fg">
      <Icon className="h-4 w-4 text-stream" />
      {label}
    </div>
  );
}

function Quote({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-lg border border-border bg-bg p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-signal">
        {label}
      </p>
      <p className="mt-2 font-display text-lg font-medium leading-snug text-harbor">
        “{text}”
      </p>
    </div>
  );
}

function Swatch({ label, className }: { label: string; className: string }) {
  return (
    <div
      className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium ${className}`}
    >
      <span>{label}</span>
    </div>
  );
}

function TypeSample({
  label,
  sample,
  className,
}: {
  label: string;
  sample: string;
  className: string;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
        {label}
      </p>
      <p className={`mt-2 ${className}`}>{sample}</p>
    </div>
  );
}

function Journey({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="rounded-lg border border-border bg-bg p-4">
      <p className="text-sm font-semibold text-harbor">{title}</p>
      <ol className="mt-3 space-y-2">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-2 text-sm text-fg-muted">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-harbor text-[11px] font-bold text-bg-elevated">
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

function Market({
  state,
  slug,
  cities,
}: {
  state: string;
  slug: string;
  cities: string[];
}) {
  return (
    <div className="rounded-lg border border-border bg-bg p-3">
      <p className="font-display text-lg font-semibold text-harbor">{state}</p>
      <code className="text-[11px] text-fg-subtle">/locations/{slug}</code>
      <ul className="mt-3 space-y-1">
        {cities.map((c) => (
          <li key={c} className="text-xs text-fg-muted">
            {c}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[11px] font-medium text-stream">+ more as we expand</p>
    </div>
  );
}
