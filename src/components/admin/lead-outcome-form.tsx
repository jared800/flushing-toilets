import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getOutcomeFn, recordOutcomeFn } from "@/lib/lead-outcomes.functions";

const OPTIONS = [
  { value: "pending", label: "Handed over, waiting" },
  { value: "won", label: "Became a paid job" },
  { value: "lost", label: "Lost — went elsewhere" },
  { value: "unreachable", label: "Never reached the homeowner" },
  { value: "not_a_job", label: "Not a real job (spam, DIY, out of area)" },
] as const;

/**
 * Recording this on every lead is the only way the pricing model ever gets
 * built. One minute per lead, and after ten of them /admin/economics tells you
 * what to charge.
 */
export function LeadOutcomeForm({ leadId }: { leadId: string }) {
  const [outcome, setOutcome] = useState<string>("pending");
  const [handedTo, setHandedTo] = useState("");
  const [jobValue, setJobValue] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const existing = await getOutcomeFn({ data: { leadId } });
        if (existing) {
          setOutcome(existing.outcome);
          setHandedTo(existing.handedTo ?? "");
          setJobValue(
            existing.jobValueCents !== null
              ? String(existing.jobValueCents / 100)
              : "",
          );
          setNote(existing.note);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load outcome.");
      } finally {
        setLoading(false);
      }
    })();
  }, [leadId]);

  async function save() {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const parsed = Number.parseFloat(jobValue.replace(/[^0-9.]/g, ""));
      await recordOutcomeFn({
        data: {
          leadId,
          outcome,
          handedTo: handedTo.trim() || undefined,
          jobValueDollars: Number.isFinite(parsed) ? parsed : null,
          note: note.trim() || undefined,
        },
      });
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save outcome.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-surface p-5 text-sm text-fg-muted shadow-sm">
        Loading outcome…
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <h2 className="font-display text-lg font-semibold text-harbor">
        What happened to this lead?
      </h2>
      <p className="mt-1 text-sm text-fg-muted">
        This is what sets the price. Takes a minute.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="outcome">Outcome</Label>
          <select
            id="outcome"
            value={outcome}
            onChange={(e) => {
              setOutcome(e.target.value);
              setSaved(false);
            }}
            className="flex h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm text-fg shadow-sm focus-visible:border-stream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stream/25"
          >
            {OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="handed-to">Handed to</Label>
          <Input
            id="handed-to"
            value={handedTo}
            onChange={(e) => {
              setHandedTo(e.target.value);
              setSaved(false);
            }}
            placeholder="Brick Plumbing"
          />
          <p className="text-xs text-fg-subtle">
            Company name. Free text — they do not need to be a partner.
          </p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="job-value">Job value (if it closed)</Label>
          <Input
            id="job-value"
            inputMode="decimal"
            value={jobValue}
            onChange={(e) => {
              setJobValue(e.target.value);
              setSaved(false);
            }}
            placeholder="450"
            disabled={outcome !== "won"}
          />
          <p className="text-xs text-fg-subtle">
            {outcome === "won"
              ? "What the plumber billed, in dollars."
              : "Only applies to a job that closed."}
          </p>
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="outcome-note">Note (optional)</Label>
          <Textarea
            id="outcome-note"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              setSaved(false);
            }}
            placeholder="Called back in 20 min, booked for Thursday…"
          />
        </div>
      </div>

      {error && (
        <p className="mt-3 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      <div className="mt-4 flex items-center gap-3">
        <Button type="button" onClick={() => void save()} disabled={saving}>
          {saving ? "Saving…" : "Save outcome"}
        </Button>
        {saved && (
          <span className="text-sm font-medium text-stream">Saved.</span>
        )}
      </div>
    </div>
  );
}
