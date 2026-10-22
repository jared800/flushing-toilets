import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "Flushing Toilets — Local plumbers for toilet trouble",
      },
      { property: "og:site_name", content: "Flushing Toilets" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      {
        name: "description",
        content:
          "Free referral service for clogged, running, leaking, or overflowing toilets. Plain-English fix guides, a free diagnostic, and a free plumber referral request.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap",
      },
    ],
  }),
  component: RootComponent,
});

/** Absolute site origin used for canonical URLs. */
const SITE_ORIGIN = (
  import.meta.env?.VITE_SITE_URL ?? "https://www.flushingtoilets.com"
).replace(/\/+$/, "");

/**
 * One self-referencing canonical per page, derived from the current pathname.
 * Without this, the same page reachable with a trailing slash, a tracking
 * parameter, or on the apex host counts as a separate URL to search engines.
 */
function CanonicalLink() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const clean =
    pathname === "/" ? "/" : pathname.replace(/\/+$/, "") || "/";
  return <link rel="canonical" href={`${SITE_ORIGIN}${clean}`} />;
}

/**
 * Sitewide entity markup. Deliberately Organization, not LocalBusiness or
 * Plumber: Flushing Toilets is a referral service with no storefront, and
 * marking it up as a local plumbing business would be a false claim. Add
 * `telephone` here only once PUBLIC_PHONE (src/data/site-config.ts) is real.
 */
const ORG_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_ORIGIN}/#org`,
      name: "Flushing Toilets",
      url: `${SITE_ORIGIN}/`,
      email: "hello@flushingtoilets.com",
      description:
        "Free referral service and toilet repair guides. A person reads each request and passes it to an independent plumber when one covers the area. Not a plumbing company.",
      areaServed: ["Texas", "Florida", "Arizona", "Utah"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#site`,
      url: `${SITE_ORIGIN}/`,
      name: "Flushing Toilets",
      publisher: { "@id": `${SITE_ORIGIN}/#org` },
    },
  ],
};

function OrgJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(ORG_LD).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <CanonicalLink />
        <OrgJsonLd />
      </head>
      <body className="min-h-screen bg-bg text-fg antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
