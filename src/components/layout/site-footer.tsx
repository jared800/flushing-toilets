import { Link } from "@tanstack/react-router";
import { Droplets } from "lucide-react";
import { STATES } from "@/data/locations";
import { SERVICES } from "@/data/services";

export function SiteFooter() {
  return (
    <footer className="border-t border-harbor/20 bg-harbor-deep text-bg-elevated">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-signal" />
            <p className="font-display text-lg font-semibold">Flushing Toilets</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-bg-elevated/75">
            Local plumbers for toilet trouble — fast. We connect homeowners with
            independent licensed plumbers. We are not the plumbing company.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal">
            Services
          </p>
          <ul className="mt-3 space-y-2">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$service"
                  params={{ service: s.slug }}
                  className="text-sm text-bg-elevated/80 transition-colors hover:text-bg-elevated"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal">
            Locations
          </p>
          <ul className="mt-3 space-y-2">
            {STATES.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/locations/$state"
                  params={{ state: s.slug }}
                  className="text-sm text-bg-elevated/80 transition-colors hover:text-bg-elevated"
                >
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/locations/$state/$city"
                params={{ state: "texas", city: "houston" }}
                className="text-sm text-bg-elevated/80 hover:text-bg-elevated"
              >
                Houston
              </Link>
            </li>
            <li>
              <Link
                to="/locations/$state/$city"
                params={{ state: "texas", city: "austin" }}
                className="text-sm text-bg-elevated/80 hover:text-bg-elevated"
              >
                Austin
              </Link>
            </li>
            <li>
              <Link
                to="/locations/$state/$city"
                params={{ state: "florida", city: "miami" }}
                className="text-sm text-bg-elevated/80 hover:text-bg-elevated"
              >
                Miami
              </Link>
            </li>
            <li>
              <Link
                to="/locations/$state/$city"
                params={{ state: "arizona", city: "phoenix" }}
                className="text-sm text-bg-elevated/80 hover:text-bg-elevated"
              >
                Phoenix
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal">
            Company
          </p>
          <ul className="mt-3 space-y-2 text-sm text-bg-elevated/80">
            <li>
              <Link to="/how-it-works" className="hover:text-bg-elevated">
                How it works
              </Link>
            </li>
            <li>
              <Link to="/for-plumbers" className="hover:text-bg-elevated">
                For plumbers
              </Link>
            </li>
            <li>
              <Link to="/for-plumbers/territory" className="hover:text-bg-elevated">
                Territory board
              </Link>
            </li>
            <li>
              <Link to="/partners/login" className="hover:text-bg-elevated">
                Partner login
              </Link>
            </li>
            <li>
              <Link to="/admin/login" className="hover:text-bg-elevated">
                Admin
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-bg-elevated">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-bg-elevated">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-bg-elevated">
                Find a plumber
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-bg-elevated">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-bg-elevated">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/brand" className="hover:text-bg-elevated">
                Brand system
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-bg-elevated/55 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Flushing Toilets. All rights reserved.</p>
          <p>Leads stored in database · notify pipeline stubbed for email/SMS</p>
        </div>
      </div>
    </footer>
  );
}
