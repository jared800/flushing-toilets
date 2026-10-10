import { useMemo, useState } from "react";
import { CheckCircle2, Upload, Zap } from "lucide-react";
import { findCitiesByQuery } from "@/data/locations";
import { partnersForCity } from "@/data/partners";
import { SERVICES } from "@/data/services";
import type { LeadUrgency } from "@/lib/leads-types";
import { submitLeadFn } from "@/lib/marketplace.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export type LeadFormDefaults = {
  serviceSlug?: string;
  stateSlug?: string;
  citySlug?: string;
  cityLabel?: string;
  zip?: string;
  sourcePath?: string;
  urgency?: LeadUrgency;
};

export function LeadForm({
  defaults,
  title = "Get a local plumber",
  subtitle = "Takes about a minute. We’ll match you with licensed partners near you.",
  variant = "full",
}: {
  defaults?: LeadFormDefaults;
  title?: string;
  subtitle?: string;
  variant?: "full" | "emergency";
}) {
  const [step, setStep] = useState<"quick" | "full">(
    variant === "emergency" ? "quick" : "full",
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState(defaults?.zip ?? "");
  const [serviceSlug, setServiceSlug] = useState(
    defaults?.serviceSlug ??
      (variant === "emergency" ? "emergency-plumber" : "clogged-toilet"),
  );
  const [urgency, setUrgency] = useState<LeadUrgency>(
    defaults?.urgency ?? (variant === "emergency" ? "emergency" : "today"),
  );
  const [notes, setNotes] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState<string | undefined>();
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const service = SERVICES.find((s) => s.slug === serviceSlug) ?? SERVICES[0];

  const resolved = useMemo(() => {
    if (defaults?.stateSlug && defaults?.citySlug) {
      return {
        stateSlug: defaults.stateSlug,
        citySlug: defaults.citySlug,
        cityLabel:
          defaults.cityLabel ??
          `${defaults.citySlug}, ${defaults.stateSlug.toUpperCase()}`,
      };
    }
    const hit = findCitiesByQuery(zip)[0];
    if (!hit) return null;
    return {
      stateSlug: hit.state.slug,
      citySlug: hit.city.slug,
      cityLabel: `${hit.city.name}, ${hit.state.abbr}`,
    };
  }, [defaults, zip]);

  function onPhotoChange(file: File | null) {
    if (!file) {
      setPhotoDataUrl(undefined);
      setPhotoName(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }
    if (file.size > 2_500_000) {
      setError("Photo must be under 2.5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoDataUrl(
        typeof reader.result === "string" ? reader.result : undefined,
      );
      setPhotoName(file.name);
      setError(null);
    };
    reader.readAsDataURL(file);
  }

  async function submitLead(opts?: { allowQuick?: boolean }) {
    setError(null);

    if (!phone.trim() || !zip.trim()) {
      setError("Phone and ZIP are required.");
      return;
    }
    if (!opts?.allowQuick && !name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!consent) {
      setError("Please agree to be contacted so we can connect you with a plumber.");
      return;
    }

    const partners = resolved
      ? partnersForCity(resolved.stateSlug, resolved.citySlug)
      : [];
    const assigned = partners.slice(0, 3).map((p) => p.id);

    setSubmitting(true);
    try {
      const lead = await submitLeadFn({
        data: {
          name: name.trim() || "Emergency request",
          phone: phone.trim(),
          zip: zip.trim(),
          cityLabel: resolved?.cityLabel ?? zip.trim(),
          stateSlug: resolved?.stateSlug,
          citySlug: resolved?.citySlug,
          serviceSlug: service.slug,
          serviceName: service.name,
          urgency,
          notes: notes.trim(),
          photoDataUrl,
          sourcePath:
            defaults?.sourcePath ??
            (typeof window !== "undefined"
              ? window.location.pathname
              : "/get-help"),
          // Was `: ["p-austin-flow"]` — a Grok demo partner that no longer
          // exists, so every unmatched lead claimed a phantom assignee. An
          // empty array is correct: the server falls back to LEAD_FALLBACK_EMAIL.
          assignedPartnerIds: assigned,
          website,
        },
      });
      setSubmittedId(lead.id);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Could not save lead. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    void submitLead({ allowQuick: step === "quick" });
  }

  if (submittedId) {
    return (
      <div className="rounded-xl border border-stream/30 bg-stream-soft/50 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-stream" />
          <div>
            <h3 className="font-display text-xl font-semibold text-harbor">
              Request received
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              Thanks{name ? `, ${name.split(" ")[0]}` : ""}. We have your{" "}
              {service.name.toLowerCase()} request for{" "}
              {resolved?.cityLabel ?? zip}. A real person reviews every
              request and matches it with a licensed local plumber who covers
              your area. If we cannot find one, we will text you so you are not
              left waiting.
            </p>
            {urgency === "emergency" && (
              <p className="mt-2 text-sm font-medium text-stream">
                Marked as an emergency. If water is actively flooding, shut off
                the supply valve behind the toilet while you wait.
              </p>
            )}
            <p className="mt-3 text-xs text-fg-subtle">
              Reference {submittedId}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSubmittedId(null);
                  setNotes("");
                  setPhotoDataUrl(undefined);
                  setPhotoName(null);
                  setStep(variant === "emergency" ? "quick" : "full");
                }}
              >
                Submit another
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "quick") {
    return (
      <form
        onSubmit={onSubmit}
        className="relative rounded-xl border border-danger/25 bg-surface p-5 shadow-sm sm:p-6"
      >
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />
        <div className="mb-4 flex items-start gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-danger-soft text-danger">
            <Zap className="h-4 w-4" />
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold text-harbor">
              Emergency — two fields
            </h3>
            <p className="mt-1 text-sm text-fg-muted">
              ZIP + phone now. Add details only if you have a second.
            </p>
          </div>
        </div>
        <div className="grid gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="em-zip">ZIP or city</Label>
            <Input
              id="em-zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="77019"
              required
              autoComplete="postal-code"
            />
            {resolved && (
              <p className="text-xs text-stream">Matched: {resolved.cityLabel}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="em-phone">Phone</Label>
            <Input
              id="em-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Mobile number"
              required
              autoComplete="tel"
            />
          </div>
        </div>
        <label className="mt-4 flex items-start gap-2.5 text-sm text-fg-muted">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-border"
          />
          <span>
            By tapping the button, I agree that Flushing Toilets and up to
            three independent local plumbers may call or text me at this
            number, including by automated means, about this request. Consent
            is not a condition of purchase. Msg &amp; data rates may apply.
            Reply STOP to opt out.
          </span>
        </label>
        {error && (
          <p className="mt-3 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button type="submit" size="lg" className="flex-1" disabled={submitting}>
            {submitting ? "Sending…" : "Get emergency help"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => setStep("full")}
          >
            Add more details
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div className="mb-5">
        <h3 className="font-display text-xl font-semibold text-harbor">{title}</h3>
        <p className="mt-1 text-sm text-fg-muted">{subtitle}</p>
        {variant === "emergency" && (
          <button
            type="button"
            className="mt-2 text-xs font-semibold text-stream hover:underline"
            onClick={() => setStep("quick")}
          >
            Back to 2-field emergency form
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="lead-name">Name</Label>
          <Input
            id="lead-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lead-phone">Phone</Label>
          <Input
            id="lead-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Mobile number"
            autoComplete="tel"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lead-zip">ZIP or city</Label>
          <Input
            id="lead-zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="78704 or Austin"
            required
          />
          {resolved && (
            <p className="text-xs text-stream">Matched: {resolved.cityLabel}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lead-service">Problem</Label>
          <select
            id="lead-service"
            value={serviceSlug}
            onChange={(e) => setServiceSlug(e.target.value)}
            className="flex h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm text-fg shadow-sm focus-visible:border-stream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stream/25"
          >
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Urgency</Label>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["emergency", "Emergency now"],
                ["today", "Today"],
                ["this-week", "This week"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setUrgency(value)}
                className={
                  urgency === value
                    ? "rounded-full bg-harbor px-3 py-1.5 text-xs font-semibold text-bg-elevated"
                    : "rounded-full border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-fg-muted hover:bg-surface-muted"
                }
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="lead-notes">What's going on? (optional)</Label>
          <Textarea
            id="lead-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Overflowing, running all night, need install quote…"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="lead-photo">Photo (optional)</Label>
          <label
            htmlFor="lead-photo"
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-bg px-4 py-5 text-center transition-colors hover:border-stream/40 hover:bg-stream-soft/20"
          >
            <Upload className="h-5 w-5 text-fg-subtle" />
            <span className="text-sm text-fg-muted">
              {photoName
                ? photoName
                : "Show the overflow, leak, or fixture — under 2.5MB"}
            </span>
            <input
              id="lead-photo"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => onPhotoChange(e.target.files?.[0] ?? null)}
            />
          </label>
          {photoDataUrl && (
            <div className="mt-2 flex items-center gap-3">
              <img
                src={photoDataUrl}
                alt="Upload preview"
                className="h-16 w-16 rounded-md border border-border object-cover"
              />
              <button
                type="button"
                className="text-xs font-semibold text-danger hover:underline"
                onClick={() => onPhotoChange(null)}
              >
                Remove photo
              </button>
            </div>
          )}
        </div>
      </div>

      <label className="mt-4 flex items-start gap-2.5 text-sm text-fg-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-border text-harbor"
        />
        <span>
          By submitting, I agree that Flushing Toilets and up to three
          independent local plumbers may call, text, or email me at the
          contact details above, including by automated means, about this
          request. Consent is not a condition of purchase. Msg &amp; data rates
          may apply. Reply STOP to opt out.{" "}
          <a
            href="/privacy"
            className="font-medium text-stream underline-offset-2 hover:underline"
          >
            Privacy
          </a>
        </span>
      </label>

      {error && (
        <p className="mt-3 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={submitting}>
          {submitting ? "Saving…" : "Match me with a plumber"}
        </Button>
        <div className="flex items-center gap-2 text-xs text-fg-subtle">
          {/* Do not claim partners here. The partner list is empty and any
              "licensed partners" badge is a claim about plumbers we have not
              signed. Licence checking is a policy we do follow, so say that. */}
          <Badge variant="harbor">Free referral service · not a plumbing company</Badge>
        </div>
      </div>
    </form>
  );
}
