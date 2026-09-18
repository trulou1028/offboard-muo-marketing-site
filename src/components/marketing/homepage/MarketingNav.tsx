"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  ChevronDown,
  Info,
  LifeBuoy,
  Mail,
  MapPin,
  MessageCircle,
  Plug,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import type { MarketingRoute } from "./MarketingSite";
import { animateNavigationPanel, usePrefersReducedMotion } from "./MarketingMotion";

/* The navigation (plan 037's mega menu, trimmed to the launch set by plan
   043 on 2026-09-07).

   Product ▾ · For Employers · Pricing · Resources ▾.

   Plan 043 trimmed plan 037's four tabs to the launch set; plan 045 (owner
   2026-09-07) brought Product back with its five pages and retired How It
   Works from the nav instead. For Organizations stays a plain link while
   /workforce and /communities are deferred (src/lib/launch.ts); its panel
   is in git history and docs/site-architecture.md.

   Built as a disclosure-navigation pattern, not a menubar: each trigger is a
   plain button with aria-expanded, and each panel is a container of links.
   The ARIA authoring practices recommend this over menu/menuitem roles for
   navigation, because these are links to pages, not commands, and screen
   reader users expect link semantics.

   /act never appears here, in either presentation. */

export type NavLeaf = {
  route?: MarketingRoute;
  href: string;
  label: string;
  blurb: string;
  icon: LucideIcon;
  external?: boolean;
};

export type NavColumn = { heading: string; items: readonly NavLeaf[] };

export type NavFeature = {
  kicker: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  route?: MarketingRoute;
  image: string;
  external?: boolean;
};

export type NavEntry =
  | { kind: "link"; route: MarketingRoute; href: string; label: string }
  | { kind: "group"; id: string; label: string; columns: readonly NavColumn[]; feature: NavFeature };

export const NAV_ENTRIES: readonly NavEntry[] = [
  {
    kind: "group",
    id: "product",
    label: "Product",
    columns: [
      {
        heading: "The system",
        items: [
          { route: "career-context", href: "/career-context", label: "Career Context", blurb: "One living record, used everywhere.", icon: BookOpen },
          { route: "lumo", href: "/lumo", label: "Lumo", blurb: "The guide that knows your situation.", icon: Sparkles },
          { route: "integrations", href: "/integrations", label: "Integrations", blurb: "Use Offboard from the AI you already use.", icon: Plug },
        ],
      },
      {
        heading: "The work",
        items: [
          { route: "application-packet", href: "/application-packet", label: "Application Packet", blurb: "One job link becomes everything you send.", icon: Briefcase },
          { route: "layoff-support", href: "/layoff-support", label: "Layoff & Benefits", blurb: "Deadlines, coverage, and runway.", icon: LifeBuoy },
        ],
      },
    ],
    feature: {
      kicker: "Featured guide",
      title: "What to do in your first week after a layoff",
      body: "A calm, ordered checklist for the first seven days, so the urgent things get handled and the rest can wait.",
      cta: "Read the guide",
      href: "/resources/first-week-after-a-layoff",
      image: "/marketing/homepage/raw/system-desk.webp",
    },
  },
  { kind: "link", route: "employers", href: "/employers", label: "For Employers" },
  { kind: "link", route: "pricing", href: "/pricing", label: "Pricing" },
  {
    kind: "group",
    id: "resources",
    label: "Resources",
    columns: [
      {
        heading: "Resources",
        items: [
          { route: "resources", href: "/resources", label: "Guides", blurb: "Practical answers, checked by people.", icon: BookOpen },
          { route: "privacy-security", href: "/privacy-security", label: "Privacy & Security", blurb: "Who can see your record, and who cannot.", icon: ShieldCheck },
        ],
      },
      {
        heading: "Company",
        items: [
          { route: "about", href: "/about", label: "About", blurb: "Why Offboard exists, and who is behind it.", icon: Info },
          { route: "intake", href: "/intake", label: "Visit Us", blurb: "Talk to a person, online or in Concord.", icon: MapPin },
          { href: "https://join.slack.com/t/offboardco/shared_invite/zt-34fsjpgfn-BcbibJ3d86P5RztYnHsA9w", label: "Slack Community", blurb: "People searching alongside you.", icon: MessageCircle, external: true },
          { href: "mailto:info@offboard.co", label: "Contact", blurb: "info@offboard.co. A human reads it.", icon: Mail, external: true },
        ],
      },
    ],
    feature: {
      kicker: "The newsletter",
      title: "The Offboard Newsletter",
      body: "Weekly job-market analysis and honest takes on tech hiring. 5,000+ subscribers.",
      cta: "Subscribe free",
      href: "https://newsletter.offboard.co",
      image: "/marketing/homepage/raw/hero-real-life.webp",
      external: true,
    },
  },
];

function groupHoldsCurrent(entry: NavEntry, current: MarketingRoute): boolean {
  if (entry.kind !== "group") return false;
  return entry.columns.some((column) => column.items.some((item) => item.route === current)) || entry.feature.route === current;
}

type OpenSource = "hover" | "click";
type SetOpen = (id: string | null, by: OpenSource) => void;

const HOVER_OPEN_DELAY_MS = 100;
const HOVER_CLOSE_DELAY_MS = 120;

function LeafLink({ item, current, onFollow }: { item: NavLeaf; current: MarketingRoute; onFollow: () => void }) {
  const Icon = item.icon;
  const body = (
    <>
      <Icon aria-hidden="true" />
      <span>
        <strong>{item.label}</strong>
        <small>{item.blurb}</small>
      </span>
    </>
  );
  const isCurrent = item.route !== undefined && item.route === current;
  return item.external ? (
    <a href={item.href} onClick={onFollow}>{body}</a>
  ) : (
    <Link href={item.href} aria-current={isCurrent ? "page" : undefined} onClick={onFollow}>{body}</Link>
  );
}

function Feature({ feature, current, onFollow }: { feature: NavFeature; current: MarketingRoute; onFollow: () => void }) {
  const inner = (
    <>
      {/* Title first in the DOM so the link is announced by its page name;
          the image and kicker are placed above it visually with CSS order. */}
      <strong>{feature.title}</strong>
      <span className="mh-nav-feature-visual">
        {/* Eager, not lazy: the panel is display:none until opened, so a lazy
            image only starts loading on the click and the card opens with a
            blank block where the render should be. Three small images. */}
        <Image src={feature.image} alt="" fill sizes="300px" loading="eager" />
      </span>
      <span className="mh-nav-feature-kicker">{feature.kicker}</span>
      <small>{feature.body}</small>
      <span className="mh-nav-feature-cta">{feature.cta} <ArrowRight aria-hidden="true" /></span>
    </>
  );
  const isCurrent = feature.route !== undefined && feature.route === current;
  return feature.external ? (
    <a className="mh-nav-feature" href={feature.href} onClick={onFollow}>{inner}</a>
  ) : (
    <Link className="mh-nav-feature" href={feature.href} aria-current={isCurrent ? "page" : undefined} onClick={onFollow}>{inner}</Link>
  );
}

function NavPanel({
  entry,
  current,
  panelId,
  onFollow,
  triggerRef,
  open,
  reduceMotion,
}: {
  entry: Extract<NavEntry, { kind: "group" }>;
  current: MarketingRoute;
  panelId: string;
  onFollow: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
  open: boolean;
  reduceMotion: boolean;
}) {
  const [presence, setPresence] = useState({ open, present: open });
  const panelRef = useRef<HTMLDivElement>(null);
  const animationRun = useRef(0);
  const animatedPanelNode = useRef<HTMLDivElement | null>(null);

  if (presence.open !== open) {
    setPresence({ open, present: open || !reduceMotion });
  } else if (!open && presence.present && reduceMotion) {
    setPresence({ open: false, present: false });
  }

  useLayoutEffect(() => {
    if (!panelRef.current) return;
    const panel = panelRef.current;

    if (!presence.present) {
      panel.style.opacity = "";
      panel.style.transform = "";
      animatedPanelNode.current = null;
      return;
    }

    const run = animationRun.current + 1;
    animationRun.current = run;

    if (open) {
      if (reduceMotion) {
        panel.style.opacity = "1";
        panel.style.transform = "none";
        animatedPanelNode.current = panel;
        return;
      }

      if (animatedPanelNode.current !== panel) {
        panel.style.opacity = "0";
        panel.style.transform = "translateY(-6px)";
        animatedPanelNode.current = panel;
      }
      const controls = animateNavigationPanel(panel, "enter");
      return () => {
        animationRun.current += 1;
        controls.stop();
      };
    }

    if (panel.contains(document.activeElement)) triggerRef.current?.focus();
    const controls = animateNavigationPanel(panel, "exit");
    void controls.then(() => {
      if (animationRun.current !== run) return;
      setPresence({ open: false, present: false });
    });
    return () => {
      animationRun.current += 1;
      controls.stop();
    };
  }, [open, presence.present, reduceMotion, triggerRef]);

  return (
    <div
      ref={panelRef}
      className="mh-nav-panel"
      id={panelId}
      hidden={!presence.present}
      data-columns={entry.columns.length}
      aria-hidden={presence.present && !open ? true : undefined}
      inert={presence.present && !open}
    >
      {entry.columns.map((column) => (
        <div className="mh-nav-column" key={column.heading}>
          <span className="mh-nav-heading">{column.heading}</span>
          {column.items.map((item) => (
            <LeafLink key={item.label} item={item} current={current} onFollow={onFollow} />
          ))}
        </div>
      ))}
      <Feature feature={entry.feature} current={current} onFollow={onFollow} />
    </div>
  );
}

function NavGroup({
  entry,
  current,
  open,
  openBy,
  setOpen,
  requestHoverOpen,
  requestHoverClose,
  cancelHoverClose,
  reduceMotion,
}: {
  entry: Extract<NavEntry, { kind: "group" }>;
  current: MarketingRoute;
  open: boolean;
  openBy: OpenSource;
  setOpen: SetOpen;
  requestHoverOpen: (id: string) => void;
  requestHoverClose: (id: string) => void;
  cancelHoverClose: () => void;
  reduceMotion: boolean;
}) {
  const panelId = `${useId()}-panel`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const active = groupHoldsCurrent(entry, current);
  const follow = () => setOpen(null, "click");

  return (
    <div
      className="mh-nav-group"
      data-open={open ? "" : undefined}
      onPointerEnter={() => {
        cancelHoverClose();
        requestHoverOpen(entry.id);
      }}
      onPointerLeave={() => requestHoverClose(entry.id)}
      onBlur={(event) => {
        // Closes when focus leaves the group entirely, so tabbing past the
        // last link does not strand an open panel behind the next section.
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(null, "hover");
      }}
    >
      <button
        ref={triggerRef}
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
      <NavPanel
        entry={entry}
        current={current}
        panelId={panelId}
        onFollow={follow}
        triggerRef={triggerRef}
        open={open}
        reduceMotion={reduceMotion}
      />
    </div>
  );
}

export function MarketingNav({ current }: { current: MarketingRoute }) {
  const [openState, setOpenState] = useState<{ id: string | null; by: OpenSource }>({ id: null, by: "hover" });
  const navRef = useRef<HTMLElement>(null);
  const hoverOpenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { id: openId, by: openBy } = openState;

  const clearHoverTimers = useCallback(() => {
    if (hoverOpenTimer.current !== null) clearTimeout(hoverOpenTimer.current);
    if (hoverCloseTimer.current !== null) clearTimeout(hoverCloseTimer.current);
    hoverOpenTimer.current = null;
    hoverCloseTimer.current = null;
  }, []);

  const setOpen = useCallback<SetOpen>((id, by) => {
    clearHoverTimers();
    setOpenState({ id, by });
  }, [clearHoverTimers]);
  const close = useCallback(() => setOpen(null, "hover"), [setOpen]);

  const cancelHoverClose = useCallback(() => {
    if (hoverCloseTimer.current !== null) clearTimeout(hoverCloseTimer.current);
    hoverCloseTimer.current = null;
  }, []);

  const requestHoverOpen = useCallback((id: string) => {
    if (!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) return;
    clearHoverTimers();
    hoverOpenTimer.current = setTimeout(() => {
      setOpenState((state) => state.id === id && state.by === "click"
        ? state
        : { id, by: "hover" });
      hoverOpenTimer.current = null;
    }, HOVER_OPEN_DELAY_MS);
  }, [clearHoverTimers]);

  const requestHoverClose = useCallback((id: string) => {
    if (hoverOpenTimer.current !== null) clearTimeout(hoverOpenTimer.current);
    hoverOpenTimer.current = null;
    if (!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) return;
    hoverCloseTimer.current = setTimeout(() => {
      setOpenState((state) => state.id === id && state.by === "hover"
        ? { id: null, by: "hover" }
        : state);
      hoverCloseTimer.current = null;
    }, HOVER_CLOSE_DELAY_MS);
  }, []);

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

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return clearHoverTimers;
    const desktop = window.matchMedia("(min-width: 1181px)");
    const onBreakpointChange = () => close();
    desktop.addEventListener("change", onBreakpointChange);
    return () => {
      desktop.removeEventListener("change", onBreakpointChange);
      clearHoverTimers();
    };
  }, [clearHoverTimers, close]);

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
            requestHoverOpen={requestHoverOpen}
            requestHoverClose={requestHoverClose}
            cancelHoverClose={cancelHoverClose}
            reduceMotion={reduceMotion}
          />
        ),
      )}
    </nav>
  );
}

/* The mobile menu keeps the same groups, flattened under headings. The
   featured cards are desktop-only; their destinations are all reachable
   as plain links here, so nothing is lost on a phone. */
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
              {entry.columns.flatMap((column) => column.items).map((item) =>
                item.external ? (
                  <a key={item.label} href={item.href}>{item.label}</a>
                ) : (
                  <Link key={item.label} href={item.href} aria-current={item.route !== undefined && current === item.route ? "page" : undefined}>
                    {item.label}
                  </Link>
                ),
              )}
              {entry.feature.external ? (
                <a href={entry.feature.href}>{entry.feature.title}</a>
              ) : (
                <Link href={entry.feature.href} aria-current={current === entry.feature.route ? "page" : undefined}>
                  {entry.feature.title}
                </Link>
              )}
            </div>
          ),
        )}
        <a href={signInUrl}>Sign In</a>
      </div>
    </details>
  );
}
