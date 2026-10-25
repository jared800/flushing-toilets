import { Link } from "@tanstack/react-router";
import { formatDate } from "@/data/page-dates";

/**
 * Plain statement of who publishes the site and what happens to a request.
 * Shown on the pages we most want people (and search engines) to trust.
 * Keep it factual: no invented names, credentials, phone numbers or partners.
 */
export function WhoRunsThis({
  updated,
  className = "",
}: {
  updated?: string;
  className?: string;
}) {
  return (
    <aside
      aria-label="Who runs this site"
      className={`rounded-xl border border-border bg-bg-elevated p-4 text-sm leading-relaxed text-fg-muted ${className}`}
    >
      <p>
        <span className="font-semibold text-harbor">Who runs this site: </span>
        Flushing Toilets is a free referral service, not a plumbing company. We
        write the guides from published sources, which are listed on each guide.
        When you send a request, a person reads it and passes it on only if an
        independent plumber covers your area. If nobody does, we tell you.{" "}
        <Link to="/how-it-works" className="font-semibold text-stream hover:underline">
          How requests are handled
        </Link>{" "}
        ·{" "}
        <Link to="/about" className="font-semibold text-stream hover:underline">
          About us
        </Link>
      </p>
      {updated && (
        <p className="mt-1 text-xs text-fg-subtle">
          Last updated <time dateTime={updated}>{formatDate(updated)}</time>
        </p>
      )}
    </aside>
  );
}
