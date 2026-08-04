import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickyMobileCta() {
  return (
    <div className="safe-pb fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg-elevated/95 p-3 backdrop-blur-md sm:hidden">
      <div className="flex gap-2">
        <Button asChild variant="outline" className="min-h-11 flex-1">
          <a href="tel:+18005550192">
            <Phone className="h-4 w-4" />
            Call
          </a>
        </Button>
        <Button asChild className="min-h-11 flex-[1.4]">
          <Link to="/get-help">Get a plumber</Link>
        </Button>
      </div>
    </div>
  );
}
