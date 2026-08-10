---
name: Offboard
description: Light-first, warm-paper career-transition platform — a calm, human place to run a job search. Forest-green + lime brand; deep-charcoal + sage dark mode; violet reserved for AI (LUMO).
colors:
  # Brand (light is the canonical/default theme)
  green-900: "#004838"       # --primary — forest green; CTAs, active nav, progress
  lime: "#E2FB6C"            # --primary-foreground — lime text on green CTAs; small "stamp" accents
  # Light surfaces (3-tier warm system)
  canvas: "#FBFBF8"          # --background — warm bone paper
  rail: "#F4F2EC"            # --surface-rail — sidebars, grouped chrome (one shade cooler than canvas)
  card: "#FFFFFF"            # --card — the default content surface
  ink: "#1A1F1D"            # --foreground — primary text
  muted-ink: "#6A736F"       # --muted-foreground — secondary text, captions, axes
  border: "#DEDAD0"          # --border — warm stone hairline
  # Dark surfaces (warm charcoal, sage accent — NOT a green wallpaper)
  canvas-dark: "#161717"     # .dark --background
  card-dark: "#232424"       # .dark --card
  sage: "#74BD47"           # .dark --primary — the dark-mode brand accent
  # Reserved + status
  ai-violet: "#5C2AFF"       # --secondary-accent — AI/LUMO ONLY, never decorative
  ai-violet-glow: "#8C69FF"  # --accent-purple — AI/LUMO ONLY
  destructive: "#F4476B"     # --destructive — errors, destructive actions (NOT unread counts)
  warning: "#C77A17"         # --warning
typography:
  display:
    fontFamily: "Fraunces, serif"   # self-hosted variable font (public/fonts/FrauncesVF.woff2), weight axis 100–900
    fontWeight: 500                 # opt in with `font-serif`; the real 500 renders (no faux weighting)
    letterSpacing: "-0.02em"
  ui:
    fontFamily: "Aspekta, Inter, sans-serif"  # self-hosted variable font (public/fonts/AspektaVF.woff2)
    fontWeight: 500                 # headings h1–h6 default to Aspekta 500, -0.025em
  body:
    fontFamily: "Aspekta, Inter, sans-serif"
    fontWeight: 400
    lineHeight: 1.5
  overline:
    fontFamily: "Aspekta, Inter, sans-serif"
    fontSize: "0.6875rem"           # 11px, uppercase, +0.14em tracking — use `.type-overline`
    fontWeight: 500
rounded:
  xs: "0.25rem"      # fixed 4px, NOT derived from --radius — for small fixed-size
                      # controls (checkbox, chart swatches, heatmap cells) so they
                      # never round into a circle
  md: "0.875rem"     # calc(var(--radius) - 2px)
  lg: "1rem"         # var(--radius)
  card: "1.5rem"     # var(--radius-card) — the generous card corner
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.green-900}"
    textColor: "{colors.lime}"
    rounded: "{rounded.md}"
  button-accent:
    backgroundColor: "{colors.lime}"     # bg-accent-lime; foreground flips per theme (green in light, charcoal in dark)
    rounded: "{rounded.md}"
  card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.card}"
    elevation: "var(--shadow-surface)"   # flat at rest; hairline border + barely-there lift
  dialog:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.card}"
    elevation: "var(--shadow-overlay)"
---

# Design System: Offboard — "Clause"

## 1. Overview

**Creative North Star: "The Quiet Companion."** Offboard is used by people in a
hard, stressful moment — recently laid off, mid-search, checking their phone
between calls. The interface is the steady, warm presence beside them: it leads
with the next thing to do, shows that effort is adding up, and never shouts.
**Calm is the product.**

Clause is **light-first** (a warm bone-paper canvas, white cards, forest-green
brand) with a considered **deep-charcoal + sage dark mode**. It is **quiet**
(flat surfaces, hairline borders, one accent), and **human** (generous rounding,
a display serif for moments that matter, plain and encouraging copy). Forest
green (light) / sage (dark) is the single voice of action and progress. **Violet
is reserved exclusively for AI (LUMO)** so intelligence reads as a distinct,
special thing.

This system explicitly rejects the **generic SaaS dashboard** (blue/navy
gradients, the big-number hero-metric template, endless identical icon-card
grids), the **cold corporate HR tool** (Workday/ADP bureaucracy), and the
**cluttered job board** (Indeed/ZipRecruiter density). Warmth is carried by
type, rounding, and copy — never by loud color or gamified confetti.

**Token contract:** values live in `src/index.css` as `H S% L%` triplets
consumed via `hsl(var(--token))`. Token *names* are stable (`bg-background`,
`text-primary`, `--sidebar-background`, …) so ~5,700 existing consumers re-theme
automatically. **Change a color by remapping a token, never by hardcoding.**

## 2. Colors

Clause is **light-first**; the light values below are canonical, dark mode is the
considered counterpart.

### Brand
- **Forest green** (`--primary`, light `#004838` / dark sage `#74BD47`): the
  single voice of action and progress — primary buttons, active nav, positive
  trends, the hero chart series, selected/done states. Its restraint is the point.
- **Lime** (`--primary-foreground`, `#E2FB6C`): text on green CTAs, and small
  "stamp" accents. Light-on-dark; never a fill for large areas.

### Surfaces (3-tier warm system, light)
- **Canvas** (`--background`, `#FBFBF8`): warm bone paper — the app background.
- **Rail** (`--surface-rail`, `#F4F2EC`): sidebars, pipeline panels, grouped
  chrome — one shade cooler than canvas so cards still pop.
- **Card** (`--card`, `#FFFFFF`): the default content surface. **Never nest a
  card in a card.**
- **Dark**: canvas `#161717`, card `#232424` — warm charcoal, sage as accent,
  **not** a green wallpaper.

### Neutral / text
- **Ink** (`--foreground`, `#1A1F1D`) primary text; **Muted ink**
  (`--muted-foreground`) secondary text/captions/axes. Hold body ≥ 4.5:1.

### AI (reserved)
- **Signal Violet** (`--secondary-accent`, `#5C2AFF`) + **Violet Glow**
  (`--accent-purple`, `#8C69FF`): **LUMO / AI surfaces only.** Never generic
  emphasis or decoration.

### Status
- **Destructive** (`--destructive`): errors and destructive actions **only** —
  not notification counts (those use the brand color).
- **Warning** (`--warning`). Disciplined chart tokens: one hero green,
  everything else grey (`--chart-hero`, `--chart-muted`, `--chart-seq-1..5`).

**The One Voice Rule.** Green is the only action/progress accent. Two competing
accents on a screen = one is wrong. Violet is not a second accent — it is the AI
signifier.

**The Color-Is-Not-Status Rule.** Never encode meaning in hue alone. Pair every
status/trend/severity with a label, icon, or number.

## 3. Typography

Both faces are **self-hosted variable fonts** (`public/fonts/`), so the full
weight range is available in both themes (no CDN dependency, no faux weighting).

- **Aspekta** (`font-sans`, variable 100–900) carries the entire working UI —
  headings, labels, data, body. `h1–h6` default to Aspekta 500, `-0.025em`.
- **Fraunces** (`font-serif`, variable weight axis, self-hosted) is the **display
  serif** — page/section titles opt in with `font-serif` and render at true 500.
  Roman only (no `font-serif italic`). It never appears in buttons, labels,
  inputs, table cells, or body copy (**the Serif-Is-Special Rule**).
- **Named type scale** (`.type-display` 30 · `.type-title` 20 · `.type-body-lg`
  18 · `.type-body` 16 · `.type-caption` 13 · `.type-overline` 11) — a fixed
  rem scale (ratio ~1.2) that sets size/weight/tracking/leading only, so it
  composes with `font-serif` and any `text-*` color. Prefer these over ad-hoc
  `text-[Npx]`; `.type-overline` is the one canonical eyebrow/label (don't
  hand-roll `text-xs uppercase tracking-*`).
- **Tabular numbers**: every changing number (metrics, currency, counts, axes)
  uses `tabular-nums` — helpers in `src/lib/format.ts`.
- Cap prose at 65–75ch; dense tables may run wider.

## 4. Elevation

**Flat by default.** Surfaces rest with a hairline border (`--border`) and no
shadow; depth is tonal (canvas → rail/card → overlay). Shadow is earned by
floating, not decoration.

- **`shadow-elevation-surface`** (`--shadow-surface`): resting cards that need
  separation — a barely-there warm lift + hairline ring.
- **`shadow-elevation-overlay`** (`--shadow-overlay`): floating surfaces —
  dialogs, popovers, dropdowns, toasts.

**Use the tokens, not ad-hoc `shadow-sm/md/lg`.** A heavy drop shadow on a
resting card is wrong — separate it with the surface tone or a 1px border.

## 5. Components

- **Buttons**: `md` radius, uniform across sizes. **Primary** = green fill /
  lime text, one per view. **Accent** = lime fill (`bg-accent-lime`,
  foreground flips per theme). Most buttons are **ghost/outline**, not primary.
- **Cards**: `card` radius (24px), Card `module` variant = the Clause recipe
  (token border + `shadow-elevation-surface`). Never nest cards.
- **Inputs**: `--field` fill, hairline border, sage/green focus ring. Error =
  destructive border **plus** a text message (never color alone). `input.tsx`
  is the reference token-driven component.
- **Badges/counts**: `pill` radius. Notification/unread **counts use the brand
  color** (`Badge` `default`), not destructive red — red is for genuinely
  destructive/critical only.
- **Dialogs**: `bg-card`, `card` radius, `shadow-elevation-overlay` (not a
  black slab). Modal is a last resort — exhaust inline/progressive first.
- **Charts**: `src/components/ui/charts/` (NYT discipline) — one hero-green
  series, everything else grey; direct labels over legends; `role="img"` + a
  visually-hidden data table.

## 5b. Page frame (the one-frame contract)

Every member page in the standard app shell shares one frame. Owner-requested
2026-08-04, shipped in Sprint 327 (plan 191).

- **The shell owns the container.** `DashboardLayout` renders page content in
  `max-w-6xl mx-auto px-3 py-4 md:p-6 lg:py-8 lg:px-12` (the `narrow` route
  variant swaps `max-w-6xl` for `max-w-4xl`; `immersive`/`noPadding` is the
  full-bleed escape for Messages, LumoChat, Job Packet, Resume Studio,
  Interview Practice). A page **never** sets its own `mx-auto`, outer
  `max-w-*`, or outer padding. Need a different width? Change the route's
  `contentWidth`, never the page.
- **Every standard page opens with `PageHeader`** (`components/layouts/`):
  optional icon chip, `font-serif text-3xl md:text-4xl` title, description at
  `max-w-3xl`, plus `action`/`titleAction`/`children` slots. Titles read from
  `src/config/navLabels.ts`, and the icon matches the page's sidebar icon in
  `src/config/domains.ts`. Pages whose header carries bespoke content (the
  spine, Dashboard, SpineHome) still match that title scale.
- **Breadcrumbs follow one policy.** None on sidebar-reachable pages, because
  the sidebar is the wayfinding. Required on nested detail pages (the spine's
  stage and step views), and always rendered by `PageHeader` or its exported
  `PageBreadcrumbs`. There is exactly one breadcrumb implementation.
- **Reading measure is not the frame.** Long prose inside a page may keep an
  inner `max-w-3xl`; that constrains text, not the page. The guard test
  `src/components/layouts/pageFrame.test.ts` only polices outermost
  containers.

## 6. Motion

Motion conveys **state**, not decoration: hover/focus/active, feedback,
loading, reveal. 150–250ms, ease-out (no bounce/elastic). **No orchestrated
page-load sequences** — product surfaces load into a task, they don't perform.
Every animation has a `prefers-reduced-motion: reduce` alternative (handled
globally in `index.css`).

## 7. Do / Don't

**Do**
- Keep green the only action/progress accent; ≤ one primary button per view.
- Reserve violet for AI/LUMO surfaces.
- Keep surfaces flat at rest; separate with tone or a 1px border; float with the
  elevation tokens.
- Use `tabular-nums` + `src/lib/format.ts` for changing numbers.
- Fraunces for display titles only; Aspekta for everything else.
- Pair status with a label/icon, not color alone.
- Hold body contrast ≥ 4.5:1.

**Don't**
- Use gradients — anywhere. Solid colors only.
- Build the generic SaaS dashboard, cold HR tool, or cluttered job-board look.
- Add gamified/confetti energy — warmth comes from type, rounding, and copy.
- Nest a card in a card.
- Use `border-left`/`border-right` > 1px as a colored accent stripe.
- Use `background-clip: text` gradient text.
- Use glassmorphism decoratively.
- Introduce a second accent, or use violet for non-AI emphasis.
- Encode meaning in hue alone.
- Alarm-red for counts/indicators — red is for destructive/critical only.
- Ship em-dashes in user-facing copy.
