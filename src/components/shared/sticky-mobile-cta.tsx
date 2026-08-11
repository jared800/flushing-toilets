import { Link } from "@tanstack/react-router";
import { Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * There is deliberately no phone number here.
 *
 * The original build shipped a "Call" button pointing at (800) 555-0192, which
 * is in the reserved fictional range and does not connect. Removed 2026-08-11.
 * Do not put a number back unless it is one that actually rings.
 */
export function StickyMobileCta() {
  return (
    <div className="safe-pb fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg-elevated/95 p-3 backdrop-blur-md sm:hidden">
      <div className="flex gap-2">
        <Button asChild variant="outline" className="min-h-11 flex-1">
          <Link to="/diagnostic">
            <Stethoscope className="h-4 w-4" />
            Diagnose it
          </Link>
        </Button>
        <Button asChild className="min-h-11 flex-[1.4]">
          <Link to="/get-help">Get a plumber</Link>
        </Button>
      </div>
    </div>
  );
}
