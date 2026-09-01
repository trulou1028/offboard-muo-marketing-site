"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import type { MarketingRoute } from "./MarketingSite";

/* The dropdown navigation (plan 037, phase 4 of the site IA roadmap).

   Built as a disclosure-navigation pattern, not a menubar: each trigger is a
   plain button with aria-expanded, and each panel is a container of links.
   The ARIA authoring practices recommend this over menu/menuitem roles for
   navigation, because these are links to pages, not commands, and screen
   reader users expect link semantics.

   Deliberately NOT in the dropdown: Company Transition Centers, which the
   target navigation lists under Resources but which does not exist yet.
   Plan 026's rule is that the dropdown ships only when its pages exist - no
   dead links. It joins Resources when /companies ships.

   /act never appears here, in either the desktop nav or the mobile menu. */

export type NavLeaf = {
  route: MarketingRoute;
  href: string;
  label: string;
  blurb: string;
};

export type NavEntry =
  | { kind: "link"; route: MarketingRoute; href: string; label: string }
  | { kind: "group"; id: string; label: string; items: readonly NavLeaf[] };

export const NAV_ENTRIES: readonly NavEntry[] = [
  { kind: "link", route: "home", href: "/", label: "Home" },
  {
    kind: "group",
    id: "product",
    label: "Product",
    items: [
      { route: "career-context", href: "/career-context", label: "Career Context", blurb: "The record everything else reads from." },
      { route: "lumo", href: "/lumo", label: "Lumo", blurb: "The guide that knows your situation." },
      { route: "job-search", href: "/job-search", label: "Job Search", blurb: "The whole search as one system." },
      { route: "layoff-support", href: "/layoff-support", label: "Layoff & Benefits", blurb: "Deadlines, coverage, and runway." },
      { route: "integrations", href: "/integrations", label: "Offboard Everywhere", blurb: "Use Offboard from the AI you already use." },
    ],
  },
  { kind: "link", route: "how-it-works", href: "/how-it-works", label: "How It Works" },
  {
    kind: "group",
    id: "organizations",
    label: "For Organizations",
    items: [
      { route: "employers", href: "/employers", label: "For Employers", blurb: "Sponsor a group through a layoff." },
      { route: "workforce", href: "/workforce", label: "Workforce & Government", blurb: "Agencies, boards, and public programs." },
      { route: "communities", href: "/communities", label: "Universities & Communities", blurb: "Alumni, members, and career offices." },
    ],
  },
  { kind: "link", route: "pricing", href: "/pricing", label: "Pricing" },
  {
    kind: "group",
    id: "resources",
    label: "Resources",
    items: [
      { route: "resources", href: "/resources", label: "Guides", blurb: "Practical answers, checked by people." },
      { route: "privacy-security", href: "/privacy-security", label: "Privacy & Security", blurb: "Who can see your record, and who cannot." },
    ],
  },
  { kind: "link", route: "about", href: "/about", label: "About" },
];

function groupHoldsCurrent(entry: NavEntry, current: MarketingRoute): boolean {
  return entry.kind === "group" && entry.items.some((item) => item.route === current);
}

function NavGroup({
  entry,
  current,
  open,
  openBy,
  setOpen,
}: {
  entry: Extract<NavEntry, { kind: "group" }>;
  current: MarketingRoute;
  open: boolean;
  openBy: OpenSource;
  setOpen: (id: string | null, by: OpenSource) => void;
}) {
  const panelId = `${useId()}-panel`;
  const active = groupHoldsCurrent(entry, current);

  return (
    <div
      className="mh-nav-group"
      data-open={open ? "" : undefined}
      onMouseEnter={() => setOpen(entry.id, "hover")}
      onMouseLeave={() => {
        // A panel the visitor opened by clicking survives the pointer
        // leaving; only a hover-opened one follows the pointer out.
        if (openBy === "hover") setOpen(null, "hover");
      }}
      onBlur={(event) => {
        // Closes when focus leaves the group entirely, so tabbing past the
        // last link does not strand an open panel behind the next section.
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(null, "hover");
      }}
    >
      <button
        type="button"
        className="mh-nav-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        data-active={active ? "" : undefined}
        onClick={() => {
          // Moving the pointer onto the trigger already opened the panel by
          // hover, so a plain toggle would close it in the same gesture and
          // read as a dead button. A click on a hover-opened panel takes
          // ownership of it instead; the next click closes it.
          if (open && openBy === "click") setOpen(null, "click");
          else setOpen(entry.id, "click");
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(entry.id, "click");
          }
        }}
      >
        <span>{entry.label}</span>
        <ChevronDown aria-hidden="true" />
      </button>
      <div className="mh-nav-panel" id={panelId} hidden={!open}>
        {entry.items.map((item) => (
          <Link
            key={item.route}
            href={item.href}
            aria-current={current === item.route ? "page" : undefined}
            onClick={() => setOpen(null, "click")}
          >
            <strong>{item.label}</strong>
            <small>{item.blurb}</small>
          </Link>
        ))}
      </div>
    </div>
  );
}

type OpenSource = "hover" | "click";

export function MarketingNav({ current }: { current: MarketingRoute }) {
  const [openState, setOpenState] = useState<{ id: string | null; by: OpenSource }>({ id: null, by: "hover" });
  const navRef = useRef<HTMLElement>(null);
  const { id: openId, by: openBy } = openState;

  const setOpen = useCallback((id: string | null, by: OpenSource) => setOpenState({ id, by }), []);
  const close = useCallback(() => setOpenState({ id: null, by: "hover" }), []);

  useEffect(() => {
    if (openId === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      // Focus goes back to the trigger that opened the panel, or Escape
      // would drop the user at the top of the document.
      const trigger = navRef.current?.querySelector<HTMLButtonElement>('[aria-expanded="true"]');
      close();
      trigger?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openId, close]);

  return (
    <nav className="mh-site-nav" aria-label="Marketing navigation" ref={navRef}>
      {NAV_ENTRIES.map((entry) =>
        entry.kind === "link" ? (
          <Link
            key={entry.route}
            href={entry.href}
            aria-current={current === entry.route ? "page" : undefined}
          >
            {entry.label}
          </Link>
        ) : (
          <NavGroup
            key={entry.id}
            entry={entry}
            current={current}
            open={openId === entry.id}
            openBy={openBy}
            setOpen={setOpen}
          />
        ),
      )}
    </nav>
  );
}

export function MarketingMobileMenu({ current, signInUrl }: { current: MarketingRoute; signInUrl: string }) {
  return (
    <details className="mh-mobile-menu">
      <summary>Menu</summary>
      <div>
        {NAV_ENTRIES.map((entry) =>
          entry.kind === "link" ? (
            <Link key={entry.route} href={entry.href} aria-current={current === entry.route ? "page" : undefined}>
              {entry.label}
            </Link>
          ) : (
            <div className="mh-mobile-group" key={entry.id}>
              <strong>{entry.label}</strong>
              {entry.items.map((item) => (
                <Link key={item.route} href={item.href} aria-current={current === item.route ? "page" : undefined}>
                  {item.label}
                </Link>
              ))}
            </div>
          ),
        )}
        <a href={signInUrl}>Sign In</a>
      </div>
    </details>
  );
}
