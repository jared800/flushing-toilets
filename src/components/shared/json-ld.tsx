/**
 * Structured data that is actually in the server-rendered HTML.
 *
 * The original build injected JSON-LD from a useEffect, which means it only
 * ever existed in the browser DOM after hydration — search engines parsing the
 * server response saw nothing at all. Rendering the script tag directly puts it
 * in the HTML that comes off the server.
 */
export function JsonLd({
  id,
  data,
}: {
  id: string;
  data: Record<string, unknown>;
}) {
  return (
    <script
      id={`ld-${id}`}
      type="application/ld+json"
      // The payload is built from our own data files, never from user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
