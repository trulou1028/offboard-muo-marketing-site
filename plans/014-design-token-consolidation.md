# Plan 014: Consolidate the design tokens (spacing rhythm, type scale, colors, radii, shadows) and rewrite DESIGN.md to match what ships

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 1cd395b..HEAD -- src/components/marketing/homepage/MarketingHomepage.css DESIGN.md`
> Plans 011–013 are EXPECTED to have modified the stylesheet; locate rules by
> selector, and treat a missing selector (not a shifted line) as drift.

## Status

- **Priority**: P2
- **Effort**: L
- **Risk**: MED (many small visual deltas — protected by plan 012's screenshot suite and staged commits)
- **Depends on**: plans/012-styling-verification-baseline.md, plans/013-container-unification-1200.md
- **Category**: tech-debt / design
- **Planned at**: commit `1cd395b`, 2026-08-24

## Why this matters

The 2026-08-24 audit quantified the "messy design system": **15 distinct
section vertical-padding values** (seven of them inside a visually
indistinguishable 86–98px band), **31 distinct font sizes** with no scale,
**16 border radii** where DESIGN.md allows 5, **6 ad-hoc shadows** where it
allows 2, **36+ hardcoded colors** outside the 12-token block — including
two different limes side by side in the header, five near-identical
"muted text on dark green" greys, and three different warning colors.
Meanwhile **DESIGN.md disagrees with the shipped CSS on 10 of 13 colors and
inverts the heading-font rule**, so any agent following the doc produces
pages that clash with the site. This plan makes the stylesheet expressible
in tokens and makes the doc true, which is the precondition for "an agent
cleanly creates new pages that keep the site consistent."

## Current state

- `src/components/marketing/homepage/MarketingHomepage.css` — single scoped
  stylesheet. Token block (top of file) currently:

```css
.marketing-homepage {
  --mh-paper: #f7f4ec;  --mh-paper-soft: #f2efe6;  --mh-white: #ffffff;
  --mh-line: #d7d3c8;   --mh-muted: #40534c;       --mh-ink: #15211d;
  --mh-forest: #004838; --mh-deep: #00352a;        --mh-footer: #002e26;
  --mh-lime: #dfff5a;   --mh-violet: #c5b7ff;
  /* + --mh-page-max / --mh-gutter / --mh-page-x from plan 013 */
```

- `DESIGN.md` (repo root) — describes the app repo's "Clause" system:
  lime `#E2FB6C`, canvas `#FBFBF8`, ink `#1A1F1D`, muted `#6A736F`, border
  `#DEDAD0`, AI violet `#5C2AFF`, an `hsl(var(--token))` mechanism in a
  `src/index.css` that does not exist in this repo, "h1–h6 default to
  Aspekta 500" (the site ships Fraunces on h1–h3), and a 5-step radius scale.
- Key audit inventories (verified against the stylesheet at `1cd395b`):
  - **Vertical rhythm**: pt/pb values 48, 56, 64, 70, 72, 86, 88, 90, 92,
    94, 96, 98, 100, 104, 110 (+ hero offsets 148/152/172). The ≤900px media
    block collapses ~30 sections to a single 72px — proof one value suffices.
  - **h2 clamps**: `clamp(46px, 4vw, 62px)` copy-pasted at 7 selectors
    (`.mh-home-trust h2`, `.mh-pricing-teaser-heading h2`,
    `.mh-route-content-heading h2`, `.mh-route-independence h2`,
    `.mh-route-contact h2`, `.mh-route-privacy .mh-copy-block h2`,
    `.mh-route-agency .mh-copy-block h2`); `clamp(44px, 3.7vw, 56px)` ×2;
    `clamp(42px, 3.45vw, 54px)` and `clamp(38px, 3.2vw, 48px)` once each.
    Three separate mobile lists force 40px on overlapping selector sets.
  - **The two limes**: `--mh-lime: #dfff5a` used ~17×; the raw `#e2fb6c`
    appears once — `.mh-header-actions a.mh-primary-cta { border: 1px solid #e2fb6c; }`.
  - **On-dark muted text**: `#cfe0d9` (×7), `#d6e0dc`, `#d1ded9`, `#c9d8d3`,
    `#cbd9d4` — five values, one role.
  - **Status colors**: warning `#8a6516`/`#9a5b0b`/`#b7791f`; success
    `#4c7a34`/`#007a55`/`#006b52`; error `#b3261e`/`#7a231c` (+ surfaces
    `#fbeceb`/`#f0c6c2`). DESIGN.md's destructive is `#F4476B`, warning `#C77A17`.
  - **Radii**: 999px, 50%, 4, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 28, 36.
  - **Shadows**: six one-off `box-shadow`s (three were on dead selectors
    removed by plan 011 — re-inventory).
- Repo conventions (AGENTS.md): design tokens over hardcoded values; violet
  reserved for LUMO/AI; no Tailwind; user-facing visual changes need owner
  preview sign-off.

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
- `DESIGN.md` (rewrite to describe THIS repo truthfully)
- `e2e/__screenshots__/` (regenerated at the end)
- `.stylelintrc.json` (tighten color rules at the end)

**Out of scope**:
- TSX changes of any kind (if a consolidation seems to require one, STOP).
- Copy strings / COPY.md.
- Container widths and gutters (plan 013 owns them; already tokens).
- The app repo's design system — DESIGN.md here diverges deliberately;
  do not "sync" values from lumo-plan-builder.

## Git workflow

- Branch: `claude/014-token-consolidation`
- ONE COMMIT PER STAGE below, so the owner can review each visual delta
  independently.
- **Hand over with a preview link** (AGENTS.md "Handing over work for review"):
  when the work is complete, push the branch, open a PR, run
  `node scripts/preview-url.mjs`, and put the URL in your final report, calling
  out per stage what shifted (tone, rounding, rhythm). Do NOT merge — the owner
  signs off on each visual delta.

## Steps

### Step 1: Decide-and-record — the palette question

The site's shipped palette (`#f7f4ec` paper, `#dfff5a` lime, etc.) has been
owner-approved on every preview to date; DESIGN.md's values have not. Treat
the **shipped CSS as the source of truth** and the doc as stale — with ONE
exception: the header CTA's lone `#e2fb6c` border versus `--mh-lime:#dfff5a`
is an internal inconsistency, not a doc question. Normalize it to
`var(--mh-lime)`.

Record this decision at the top of the rewritten DESIGN.md (Step 6).

**Verify**: `grep -c "e2fb6c\|E2FB6C" src/components/marketing/homepage/MarketingHomepage.css` → 0.

### Step 2: Vertical rhythm

Add tokens:

```css
--mh-section-y: 88px;        /* default band */
--mh-section-y-loose: 104px; /* heavyweight bands (pricing teaser, route content) */
--mh-section-y-tight: 64px;  /* strips (employer strip, sb617) */
```

Map every section's pt/pb onto the nearest token: 86/88/90/92/94/96/98 → `var(--mh-section-y)`;
100/104/110 → loose; 48/56/64/70/72 → tight — EXCEPT: `.mh-final-cta` and
`.mh-faq` keep their current values if the mapping changes them by more than
12px (list any such exceptions in your report). Hero top offsets
(148/152/172) are not section rhythm; leave them. In the ≤900px media block,
replace the big per-selector 72px reset lists with
`.marketing-homepage { --mh-section-y: 72px; --mh-section-y-loose: 72px; --mh-section-y-tight: 56px; }`
and delete the now-redundant pt/pb declarations from those lists (keep other
declarations those lists carry).

**Verify**: `grep -nE "padding-top: (8[0-9]|9[0-9]|10[0-9])px" src/components/marketing/homepage/MarketingHomepage.css` → 0 hits on section rules. `npm run e2e` after regenerating visual baselines for this stage → green; eyeball diffs (≤12px shifts only). Commit as "Token: section rhythm".

### Step 3: Heading scale

Add:

```css
--mh-h1: clamp(56px, 5.3vw, 82px);
--mh-h2: clamp(46px, 4vw, 62px);
--mh-h2-sm: clamp(38px, 3.2vw, 48px);
```

Point the 7 duplicated h2 rules at `var(--mh-h2)`; map the ×2
`clamp(44px,3.7vw,56px)` and the lone `clamp(42px,3.45vw,54px)` onto
`var(--mh-h2)` as well (delta ≤8px at any viewport — verify visually);
`.mh-verified-heading h2` keeps its smaller size via `var(--mh-h2-sm)`.
Merge the three mobile 40px override lists into one list setting
`--mh-h2: 40px` (as a font-size token consumed everywhere, the override
collapses naturally — set the var, delete the per-selector font-sizes).
Leave the homepage `.mh-hero-copy h1` and `.mh-route-hero h1` clamps as-is
but route them through `--mh-h1` where the value matches.

**Verify**: `grep -c "clamp(46px, 4vw, 62px)" …css` → 1 (the token
definition). Visual baselines regenerate green with only sub-8px heading
shifts. Commit as "Token: heading scale".

### Step 4: Color roles

Add and apply:

```css
--mh-on-dark-muted: #cfe0d9;      /* replaces #cfe0d9/#d6e0dc/#d1ded9/#c9d8d3/#cbd9d4 */
--mh-hairline-on-dark: rgba(255,255,255,.18);
--mh-surface-on-dark: rgba(255,255,255,.06);
--mh-border-on-dark: rgba(255,255,255,.16);
--mh-success: #006b52;
--mh-warning: #9a5b0b;
--mh-danger: #b3261e;
--mh-danger-surface: #fbeceb;
--mh-danger-border: #f0c6c2;
```

Sweep every occurrence of the replaced literals onto the vars.
`#0a3d32` (a fourth dark green): map onto `--mh-deep` if the usage sites are
on-dark cards (they were, in the now-deleted dead benefits block — re-check;
if all uses died with plan 011, nothing to do). The violet token stays
`--mh-violet` and stays used at most where it is today (AGENTS.md: violet is
LUMO-only).

**Verify**: `grep -cE "#(cfe0d9|d6e0dc|d1ded9|c9d8d3|cbd9d4|8a6516|b7791f|4c7a34|007a55|7a231c)" …css` → 0. Visual diffs show only the intended near-identical-grey unifications. Commit as "Token: color roles".

### Step 5: Radii and shadows

Add `--mh-radius-sm: 8px; --mh-radius-md: 12px; --mh-radius-lg: 18px; --mh-radius-card: 24px; --mh-radius-pill: 999px;`
and `--mh-shadow-surface: 0 18px 40px rgba(24,42,36,.15); --mh-shadow-overlay: 0 28px 60px rgba(29,59,51,.22);`.
Map: 4/8/9/10 → sm (4px stays literal where it's a deliberate square-ish
quote card — judge per site, report exceptions); 12/14 → md; 16/18/20/22 → lg;
24/28 → card; 36 → card unless it visibly changes the onboarding frame
(then keep as a one-off with a comment); 999px/50% → pill/50% (50% on
avatars stays). Map the surviving shadows onto the two tokens.

**Verify**: `grep -cE "border-radius: (14|16|18|2[0-8])px" …css` → 0;
remaining literal radii are only documented exceptions. Visual diffs ≤ a few
px of corner rounding. Commit as "Token: radii + shadows".

### Step 6: Rewrite DESIGN.md to describe this repo

Replace DESIGN.md's body with the truth of this site (keep the YAML-ish
frontmatter format the file already uses so other tooling that reads it
keeps working — check how `CopyDrift.test.tsx`/other tests reference
DESIGN.md first: `grep -rn "DESIGN.md" src e2e` and preserve whatever they
assert). The rewritten doc must contain:

1. A provenance note: "This describes the marketing site's shipped system
   (`--mh-*` tokens in MarketingHomepage.css). It deliberately diverges from
   the app repo's Clause system; do not copy values from the app repo."
   Include the decision date (2026-08-24) and that shipped CSS won over the
   old doc values.
2. The real palette (the `--mh-*` hex values), the real typography rule
   (Fraunces 500 on h1–h3 by default, Aspekta for UI/article bodies), the
   real type scale tokens, the rhythm tokens, radius scale, shadow pair,
   container tokens (`--mh-page-max: 1200px`, `--mh-gutter`), and the
   breakpoints (1180/900/560).
3. The hard rules carried over unchanged: violet is LUMO/AI-only; no
   side-accent color bars on rounded containers; one primary CTA per view;
   no em dashes in site copy (owned by COPY.md — reference, don't duplicate).
4. A "how to add a section" recipe: compose `.mh-section`, consume
   `--mh-section-y`, `--mh-h2`, color roles; never introduce a literal hex,
   px font-size, radius, or shadow without adding a token first.

**Verify**: `npm test` → pass (if any test reads DESIGN.md, its assertions
still hold). Manual read-through: every value stated in the doc greps to a
matching token in the stylesheet.

### Step 7: Lock it in with stylelint

In `.stylelintrc.json`, add:

```json
"declaration-property-value-disallowed-list": {
  "/^background|^color|^border(-.*)?$|fill|stroke/": ["/#[0-9a-fA-F]{3,8}/"]
}
```

with `/* stylelint-disable-next-line */` comments on the token block itself
(where hex literals are the point). If the rule as written is too coarse for
this stylesheet's shorthand patterns, scope it or swap for a
`color-no-hex: true` rule with the token-block disable — the requirement is:
a NEW hex color outside the token block fails `npm run lint:css`.

**Verify**: plant `color: #ff0000` on a rule → `npm run lint:css` fails;
revert → passes. Full gate: `npm test && npm run lint && npm run lint:css && npm run typecheck && npm run build && npm run e2e` → all green.

## Test plan

- Plan 012's screenshot suite gates each stage; regenerate + review diffs per
  commit, not once at the end.
- The stylelint hex rule is the permanent regression test for token discipline.
- No new vitest files needed.

## Done criteria

- [ ] Token block defines rhythm, heading, color-role, radius, shadow tokens; all consumed
- [ ] The greps in Steps 1–5 all return 0
- [ ] DESIGN.md describes this repo's shipped values, with the provenance note
- [ ] New hex colors outside the token block fail `npm run lint:css` (proven)
- [ ] Full gate green; baselines regenerated per stage; only in-scope files modified
- [ ] `plans/README.md` status row updated

## STOP conditions

- Plans 012/013 not landed (check `plans/README.md`).
- Any single stage's visual diff shows a change you cannot attribute to the
  documented mapping (an unexpected layout shift, not a tone/rounding delta).
- A consolidation requires editing a TSX file.
- A test asserts specific DESIGN.md content that the rewrite would break —
  report the assertion before changing either side.
- The owner's preview review rejects a stage — keep the approved stages,
  report the rejected one; stages are independent commits for exactly this.

## Maintenance notes

- After this plan, "add a page that fits the system" is mechanical: compose
  `.mh-section`, consume tokens, obey the DESIGN.md recipe — which is what
  makes agent-built pages consistent. Consider adding that recipe to
  AGENTS.md's design section (one line pointing at DESIGN.md § recipe).
- The five on-dark greys collapsing to one is the diff most worth the
  owner's eyes — text tone on dark sections shifts by a hair.
- Deferred deliberately: renaming existing classes to a BEM-ish scheme
  (churn without user value), dark mode (DESIGN.md's old dark values
  described the app, not this site).
