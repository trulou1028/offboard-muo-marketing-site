# Plan 013: Unify the container system and cap content width at 1200px sitewide (header, footer, hero, sections)

> **Execute with:** Opus 5 · medium effort — a container refactor that had to render identically at 1200px. *(Executed. Model line added retroactively 2026-09-01 under plans/README.md § "The model line".)*

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 1cd395b..HEAD -- src/components/marketing/homepage/MarketingHomepage.css`
> Plans 011 and 012 are EXPECTED to have modified this file, so line numbers
> below WILL have shifted — locate rules by selector, not line. If a quoted
> declaration no longer exists at all, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED (sitewide layout change — protected by plan 012's screenshot baseline)
- **Depends on**: plans/012-styling-verification-baseline.md
- **Category**: tech-debt / design
- **Planned at**: commit `1cd395b`, 2026-08-24

## Why this matters

The site has no single content width. Browser measurements (2026-08-24
audit, 1440×900):

- The header computes its gutters against **1384px** while `--mh-page-x`
  (used by every section, the hero, and the footer) computes against
  **1368px** with a different clamp — so the logo and nav sit 7–8px left of
  all page content at every desktop width, and up to 19px off between 561
  and 900px. The misalignment never resolves at any viewport.
- The owner has decided to narrow content to a **1200px max sitewide,
  including the top nav and footer**. Tested live: at 1200px nothing
  overflows, there is no horizontal scroll, and the header finally aligns.
  The one casualty is the homepage hero grid, whose column ratio must be
  rebalanced (Step 4).

After this plan there are exactly two layout inputs — a max width and a
gutter — and every band on every page reads them.

## Current state

All in `src/components/marketing/homepage/MarketingHomepage.css` (locate by
selector; lines are from commit `1cd395b` and will have shifted):

The token block on `.marketing-homepage` (top of file) defines:

```css
--mh-page-x: max(clamp(24px, 4.76vw, 72px), calc((100vw - 1368px) / 2));
```

`.mh-section { padding-inline: var(--mh-page-x); }` — used by ~40 sections
via JSX composition.

The four rules that do NOT use `--mh-page-x` correctly:

```css
.mh-site-header { ... padding-inline: max(clamp(24px, 4.23vw, 64px), calc((100vw - 1384px) / 2)); ... }   /* its own 1384 formula */
.mh-hero { min-height: 983px; padding: 152px var(--mh-page-x) 56px; ... }                                  /* uses the var — OK */
.mh-hero-inner { max-width: 1384px; min-height: 775px; margin: 0 auto; display: grid;
                 grid-template-columns: minmax(0, 680px) minmax(480px, 630px); gap: 62px; ... }            /* unreachable 1384 cap */
.mh-site-footer { min-height: 360px; padding: 62px var(--mh-page-x) 34px; ... }                            /* uses the var — OK */
```

Breakpoint divergences:

```css
@media (max-width: 900px) { .mh-site-header { height: 68px; padding-inline: 24px; } ... .mh-hero { min-height: 0; padding: 116px 24px 56px; } }
@media (max-width: 560px) { .mh-section { padding-inline: 20px; } ... .mh-route-hero { padding-inline: 20px; ... } ... .mh-hero { padding-inline: 20px; } }
```

Between 561–900px the header/hero use 24px while `.mh-section` still uses
the clamp (26.7–42.8px). At ≤560px sections use 20px but the header stays
24px. Additionally the 560px block re-states `padding-inline: 20px` on ~15
individual section selectors that already inherit it from `.mh-section`
(the two big comma lists ending in `padding-inline: 20px; padding-top: 72px; padding-bottom: 72px;`).

Route hero (shares the header alignment problem only via `.mh-section`):

```css
.mh-route-hero { min-height: 720px; padding-top: 172px; padding-bottom: 92px; ... grid-template-columns: minmax(0, 1.45fr) minmax(340px, .55fr); gap: clamp(60px, 8vw, 126px); ... }
```

Repo conventions (AGENTS.md): no Tailwind; tokens in the scoped stylesheet;
user-facing visual changes need owner preview sign-off before merge. Plan
012's screenshot suite (`e2e/visual.spec.ts`) is the verification harness —
this plan intentionally regenerates its baselines.

**Audit measurements to reproduce success against** (1440×900): before —
header content starts at x=61, all sections at x=69. After this plan both
must be equal, and equal to `max(clamp-gutter, (1440-1200)/2) = 120`.

## Commands you will need

| Purpose   | Command              | Expected on success |
|-----------|----------------------|---------------------|
| Tests     | `npm test`           | all pass            |
| CSS lint  | `npm run lint:css`   | exit 0              |
| Build     | `npm run build`      | all routes prerender |
| E2E       | `npm run e2e`        | all pass            |
| Baselines | `npx playwright test e2e/visual.spec.ts --update-snapshots` | regenerates |

## Scope

**In scope**:
- `src/components/marketing/homepage/MarketingHomepage.css`
- `e2e/__screenshots__/` (regenerated baselines)
- `e2e/visual.spec.ts` (only if a wait/mask needs adjusting)

**Out of scope**:
- Any TSX file. This is a pure CSS change.
- Color/typography/radius/shadow tokens (plan 014).
- Per-element `max-width` text measures (e.g. `max-width: 560px` on hero
  copy) — they are inner measures, not containers; plan 014 consolidates them.
- `.mh-article { max-width: 856px }` — article measure is intentional,
  narrower than the cap; leave it.

## Git workflow

- Branch: `claude/013-container-1200`
- Commit per step.
- **Hand over with a preview link** (AGENTS.md "Handing over work for review"):
  when the work is complete, push the branch, open a PR, run
  `node scripts/preview-url.mjs`, and put the URL in your final report with
  specific things to look at — this change alters every page's silhouette, so
  name the pages worth checking at desktop and phone width. Do NOT merge; this
  is exactly the kind of user-facing change the shipping gate exists for.

## Steps

### Step 1: Introduce the two layout inputs and derive `--mh-page-x`

In the `.marketing-homepage` token block, replace the `--mh-page-x` line with:

```css
--mh-page-max: 1200px;
--mh-gutter: clamp(24px, 4.76vw, 72px);
--mh-page-x: max(var(--mh-gutter), calc((100vw - var(--mh-page-max)) / 2));
```

**Verify**: `npm run build` → success. Dev-server check at 1440px: every
`.mh-section` computes `padding-left: 120px`.

### Step 2: Point the header at the shared system

Replace `.mh-site-header`'s `padding-inline: max(clamp(24px, 4.23vw, 64px), calc((100vw - 1384px) / 2))`
with `padding-inline: var(--mh-page-x)`.

**Verify**: dev-server at 1440px: the logo's left edge x-coordinate equals a
section's content left edge (both 120). Check 1280 and 1920 too — equal at
every width.

### Step 3: Align the breakpoints via the variable, not per-selector pixels

1. In the `@media (max-width: 900px)` block: delete `padding-inline: 24px`
   from `.mh-site-header` and change `.mh-hero`'s `padding: 116px 24px 56px`
   to `padding: 116px var(--mh-page-x) 56px`. Add at the top of the block:
   `.marketing-homepage { --mh-gutter: 24px; }`.
2. In the `@media (max-width: 560px)` block: replace
   `.mh-section { padding-inline: 20px; }` with
   `.marketing-homepage { --mh-gutter: 20px; }`, and DELETE the redundant
   `padding-inline: 20px` declarations from the comma-list rules that also
   carry `padding-top/bottom: 72px` (keep the vertical paddings — plan 014
   owns those) and from `.mh-route-hero` and `.mh-hero` (they inherit via
   `var(--mh-page-x)` once their own inline paddings reference it — confirm
   `.mh-route-hero` gets horizontal padding from its `mh-section` class in
   JSX: it does, `PageHero` renders `className="mh-route-hero mh-section"`).

**Verify**: dev-server at 700px width: header, hero, and section left edges
all equal (24px). At 480px: all equal (20px). `npm run lint:css` → exit 0.

### Step 4: Rebalance the homepage hero for 1200px

Current: `.mh-hero-inner { max-width: 1384px; ... grid-template-columns: minmax(0, 680px) minmax(480px, 630px); gap: 62px; }`.
At a 1200px container the audit measured the columns collapsing to
508px/630px — image dominant, headline cramped. Change to:

```css
.mh-hero-inner { max-width: var(--mh-page-max); ... grid-template-columns: minmax(0, 1.15fr) minmax(380px, 1fr); gap: clamp(40px, 4vw, 62px); ... }
```

Then LOOK at it (screenshot at 1440 and 1280): the headline column must be
visibly wider than or equal to the photo column, the h1 "The Modern
Unemployment Office" wrapping on natural word boundaries (3 lines at 1440 is
the expected, owner-previewed result), the photo collage un-cropped. Adjust
the fr ratio (not fixed px) if needed; keep `minmax(0, …)` on the text column
so it can shrink below content width.

**Verify**: screenshot review; no element overflows
(`document.documentElement.scrollWidth === window.innerWidth` in the console
at 1440/1280/1024).

### Step 5: Sweep the leftover width constants

`grep -n "1384\|1368\|1400" src/components/marketing/homepage/MarketingHomepage.css`
→ fix every remaining hit (the search-stage 1400 rule was dead code deleted
in plan 011; if it still exists, STOP — plan 011 didn't land). `min-height: 983px`
on `.mh-hero` and `775px` on `.mh-hero-inner` are pixel-port artifacts of the
old width; retest whether they still make sense — if the hero now has dead
vertical space at 1440, reduce `.mh-hero`'s min-height until the hero bottom
padding visually matches the 56px it declares (report the value you chose).

**Verify**: the grep returns 0 hits; visual pass over `/`, `/about`,
`/pricing` at 1440 shows no dead vertical band in the hero.

### Step 6: Regenerate screenshot baselines and run the full gate

`npx playwright test e2e/visual.spec.ts --update-snapshots`, then eyeball
each before/after pair (the git diff of `e2e/__screenshots__/`) — every page
should show: narrower content band, aligned header, otherwise unchanged
composition.

**Verify**: `npm test && npm run lint && npm run lint:css && npm run typecheck && npm run build && npm run e2e` → all pass. `git status` → only in-scope files.

## Test plan

- Plan 012's screenshot suite is the regression harness; the regenerated
  baselines ARE the review artifact for the owner.
- Add one assertion to `e2e/visual.spec.ts` if absent: for `/` at 1440,
  assert header brand link and `main` first section share the same
  `getBoundingClientRect().left` — this pins the alignment fix as a
  functional test, not just pixels.

## Done criteria

- [ ] Header, hero, sections, and footer left-align at 1280 / 1440 / 1920 / 700 / 480 (alignment assertion passes)
- [ ] Content maxes at 1200px: at 1440 viewport, `.mh-section` padding-left computes 120px
- [ ] `grep -n "1384\|1368\|1400"` in the stylesheet → 0 hits
- [ ] Full gate passes; baselines regenerated and committed
- [ ] Only in-scope files modified; `plans/README.md` updated

## STOP conditions

- Plan 012's visual suite doesn't exist or is red before you start.
- Any page shows horizontal overflow after Step 1 (the audit found none at
  1200 — if you find one, the codebase drifted; report the element).
- The hero rebalance cannot reach a layout where the headline column ≥ the
  photo column without breaking the collage positioning — report with
  screenshots instead of hacking the collage's absolute positions.
- You find yourself wanting to change a TSX file — out of scope, report.

## Maintenance notes

- `--mh-page-max` and `--mh-gutter` are now THE layout contract; new sections
  compose `.mh-section` and never write their own inline-padding formulas.
  The stylelint `declaration-property-value-allowed-list` rule (plan 014)
  should eventually ban raw `calc((100vw…` outside the token block.
- The owner should preview this on Vercel before merge — it changes every
  page's silhouette. Point them at `/`, `/how-it-works`, and `/act` at
  desktop width, plus one phone check.
- Deferred: the intake page's sticky-rail offset constants (96px/110px)
  reference a header height that doesn't pin — cleaned up in plan 017.
