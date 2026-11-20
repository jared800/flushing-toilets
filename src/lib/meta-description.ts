/**
 * Build a meta description that stays within ~155 characters.
 *
 * `lead` names the place and service (always kept). Whole sentences are then
 * added from the first body text that fits; nothing is cut mid-sentence. If no
 * body sentence fits, the first `fallbacks` entry that fits is used, else the
 * lead alone.
 */
export const META_DESCRIPTION_MAX = 155;

function sentences(text: string) {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+(?=[A-Z0-9“"])/);
}

export function fitMetaDescription(
  lead: string,
  bodies: Array<string | undefined>,
  fallbacks: Array<string | undefined> = [],
  max = META_DESCRIPTION_MAX,
) {
  for (const body of bodies) {
    if (!body) continue;
    let out = lead;
    for (const s of sentences(body)) {
      const next = `${out} ${s}`;
      if (next.length > max) break;
      out = next;
    }
    if (out !== lead) return out;
  }
  for (const f of fallbacks) {
    if (f && `${lead} ${f}`.length <= max) return `${lead} ${f}`;
  }
  return lead;
}

export const META_FALLBACK =
  "A person reads your request and passes it to an independent local plumber when one is available.";

/** "Clogs, leaks ... in A, B and nearby." from a metro's neighborhood list. */
export function nearbyMetaLine(neighborhoods?: string[]) {
  if (!neighborhoods || neighborhoods.length < 2) return undefined;
  return `Clogs, leaks, running toilets and installs in ${neighborhoods[0]}, ${neighborhoods[1]} and nearby. A person reads your request.`;
}
