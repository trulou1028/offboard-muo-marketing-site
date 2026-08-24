# Plan 011: Fix the four shipped CSS defects (guide-page collision, About re-skin, mobile dead space, hand-rolled heroes) and delete dead CSS

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 1cd395b..HEAD -- src/components/marketing/homepage/MarketingHomepage.css src/components/marketing/homepage/MarketingSite.tsx src/components/marketing/homepage/MarketingRoutePages.tsx src/app/not-found.tsx src/components/marketing/intake/MarketingIntakeConfirmed.tsx`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `1cd395b`, 2026-08-24

## Why this matters

Four real visual defects are live on the site, all confirmed in a browser
during the 2026-08-24 audit:

1. All 11 guide pages (`/resources/<slug>`) render with a stray 90px of
   page-level padding, the wrong background color, and a border drawn under
   the footer, because the page wrapper's class collides with a section class.
2. The About page's privacy section was silently re-skinned from white to
   dark forest green when the /act page's styles were added, because the same
   CSS selector is defined twice.
3. On phones, three sections reserve 720–760px of height for ~300px of
   content, leaving screens of empty space mid-page.
4. The intake-confirmation page (the last screen a converting user sees)
   renders a half-empty hero: its hand-rolled markup omits the `<aside>` that
   the hero's two-column grid expects.

Additionally ~130 lines (~14%) of the stylesheet describe sections that no
longer exist in any TSX. Deleting them first shrinks every later audit and
refactor. This plan is deliberately "fixes only" — no token work, no layout
changes beyond the defects.

## Current state

- `src/components/marketing/homepage/MarketingHomepage.css` — the site's only
  stylesheet (958 lines, `.marketing-homepage` scope, `--mh-*` tokens).
- `src/components/marketing/homepage/MarketingSite.tsx` — shell, header,
  footer, `PageHero`, shared sections.
- `src/components/marketing/homepage/MarketingRoutePages.tsx` — per-route
  page compositions.

**Defect 1 — class collision.** The shell stamps a `mh-route-<route>` class
on the page wrapper (`MarketingSite.tsx:181`):

```tsx
export function MarketingShell({ current, children }: { ... }) {
  return (
    <div className={`marketing-homepage mh-route-${current}`}>
```

On `/resources` and `/resources/[slug]` that class is `mh-route-resources`,
which the stylesheet defines as a *section* rule (`MarketingHomepage.css:580`):

```css
.mh-route-resources { padding-top: 90px; padding-bottom: 90px; background: var(--mh-paper-soft); border-bottom: 1px solid var(--mh-line); }
```

The intended consumer is the category section in
`MarketingRoutePages.tsx:128`:

```tsx
<section key={category} className="mh-route-resources mh-section" aria-labelledby={headingId}>
```

Browser-verified: on `/resources/negotiating-your-severance` the wrapper
computes `paddingTop: 90px`, background `rgb(242,239,230)`, and a bottom
border — all wrong at page level.

**Defect 2 — duplicate selector.** `.mh-route-privacy` is defined at both
`MarketingHomepage.css:529` (About's version, white) and `:627` (ACT's
version, forest green — under the comment `/* ACT pilot landing page */`).
The later one wins everywhere:

```css
529: .mh-route-privacy { padding-top: 90px; padding-bottom: 90px; background: white; border-bottom: 1px solid var(--mh-line); }
627: .mh-route-privacy { padding-top: 100px; padding-bottom: 100px; background: var(--mh-forest); color: var(--mh-paper); border-bottom: 1px solid rgba(255,255,255,.18); }
```

Users: `MarketingRoutePages.tsx:204` (About) and `:380` (ACT). The About
variant's child rule `:530` (`.mh-route-privacy .mh-copy-block { max-width: 660px }`)
is dead, overridden by `:628` (`max-width: 780px`). The selector also appears
in *both* the `:875` and `:886` groups inside the same `max-width: 560px`
media block — a duplicate within a duplicate.

**Defect 3 — min-heights that survive the mobile reset.**

- `:500` `.mh-human.is-compact { min-height: 760px; }` — specificity (0,2,0)
  beats the reset at `:798` which only lists `.mh-human` (0,1,0).
- `:524` `.mh-route-story { min-height: 760px; ... }` — absent from every
  mobile reset list (`:813`, `:821`, `:823`, `:875`, `:886`).
- `:540` `.mh-route-sponsor { min-height: 720px; ... }` — same omission.

**Defect 4 — two pages hand-roll the hero.** `PageHero`
(`MarketingSite.tsx:203-245`) renders `.mh-route-hero` with a default
`<aside>`; 7 route pages use it. Two don't:

- `src/app/not-found.tsx:9-17` duplicates the markup inline (with its own aside).
- `src/components/marketing/intake/MarketingIntakeConfirmed.tsx:6-14`
  duplicates it *without* any `<aside>`. `.mh-route-hero` is
  `grid-template-columns: minmax(0, 1.45fr) minmax(340px, .55fr)` with
  `min-height: 720px` (`MarketingHomepage.css:479`), so the headline squeezes
  into ~63% width beside an empty column in a 720px-tall band.

**Dead CSS.** These class families are defined in the stylesheet and
referenced by zero `.tsx` files under `src/` (verified via grep at plan time;
re-verify in Step 1): `mh-fragmented`, `mh-fragment-collage`,
`mh-personalized`, `mh-starting-card`, `mh-runway`, `mh-timeline-card`,
`mh-timeline-list`, `mh-form-pair`, `mh-top-rule`, `mh-check-list`,
`mh-benefits`, `mh-benefits-preview`, `mh-benefits-body`,
`mh-benefit-matches`, `mh-search-tabs`, `mh-search-stage`, `mh-search-copy`,
`mh-search-lumo`, `mh-search-heading`, `mh-privacy`, `mh-privacy-heading`,
`mh-privacy-links`, `mh-information-flow`. Their desktop blocks live roughly
at `:220-230`, `:232-289`, `:260-274`, `:307-335`, `:337-358`, `:376-400`,
and they also appear inside the media queries (e.g. `:730-733`, `:787-813`
reset lists, `:840-845`, `:917-922`, `:932-944`).

**Repo conventions (from AGENTS.md, which you must follow):** no Tailwind;
all styles in the scoped stylesheet with `--mh-*` tokens; copy changes are
out of scope here (this plan changes zero user-facing strings); user-facing
visual changes need the owner's preview sign-off before merge.

## Commands you will need

| Purpose   | Command              | Expected on success |
|-----------|----------------------|---------------------|
| Install   | `npm ci`             | exit 0              |
| Tests     | `npm test`           | 59+ tests pass      |
| Lint      | `npm run lint`       | exit 0              |
| Build     | `npm run build`      | all routes prerender |
| E2E       | `npm run e2e`        | all pass            |
| Typecheck | `npx tsc --noEmit`   | exit 0              |

## Scope

**In scope** (the only files you should modify):
- `src/components/marketing/homepage/MarketingHomepage.css`
- `src/components/marketing/homepage/MarketingSite.tsx` (shell class prefix + `PageHero` single-column variant)
- `src/components/marketing/homepage/MarketingRoutePages.tsx` (only if the shell-prefix rename requires matching selectors — see Step 2)
- `src/app/not-found.tsx`
- `src/components/marketing/intake/MarketingIntakeConfirmed.tsx`
- `src/components/marketing/homepage/MarketingHome.test.tsx` (only if a selector-based assertion breaks)

**Out of scope** (do NOT touch, even though they look related):
- Any user-facing copy string, `COPY.md`, or the copy tests' expectations.
- Token values, spacing scale, container widths (plans 013/014 own those).
- `src/app/globals.css`, `src/app/layout.tsx`.

## Git workflow

- Branch: `claude/011-css-defects`
- Commit per step; imperative messages matching repo style (e.g. "Fix guide-page wrapper class collision").
- Do NOT push or merge; the owner reviews on a Vercel preview per AGENTS.md's shipping gate.

## Steps

### Step 1: Re-verify the dead-class list, then delete the dead CSS

For each class family listed in "Current state → Dead CSS", run
`grep -rn "<class>" src --include="*.tsx"` and confirm zero hits. If ANY hit
exists, remove that family from your deletion list and note it in your
report. Then delete each dead family's rules from the stylesheet, including
their entries inside `@media` blocks (a selector inside a comma-separated
reset list is removed from the list, not the whole list).

**Verify**: `grep -c "mh-benefits\|mh-search-stage\|mh-fragmented\|mh-information-flow\|mh-starting-card\|mh-timeline" src/components/marketing/homepage/MarketingHomepage.css` → `0`; `npm test` → all pass; `npm run build` → succeeds.

### Step 2: Fix the shell class collision

In `MarketingSite.tsx:181` change the wrapper template from
`mh-route-${current}` to `mh-page-${current}`:

```tsx
<div className={`marketing-homepage mh-page-${current}`}>
```

Then check for CSS rules that intentionally targeted the *wrapper* class
(not the section): `grep -n "mh-route-home\|mh-route-act\b\|mh-route-intake" src/components/marketing/homepage/MarketingHomepage.css`.
At plan time there were none — the wrapper class was purely a hook with no
styles except the accidental `mh-route-resources` collision. If grep finds
any, rename those selectors to the `mh-page-` prefix.

**Verify**: `npm test` → pass. `npm run build && npm run e2e` → pass. Then start the dev server and confirm in a browser (or via `curl` + inspection) that `/resources/first-week-after-a-layoff` has no 90px top padding on the wrapper: the rendered `<div class="marketing-homepage mh-page-resources">` must not match the `.mh-route-resources` rule.

### Step 3: Split the duplicate `.mh-route-privacy` selector

1. Rename the ACT block at `:627-635` to `.mh-act-privacy` (all five rules:
   the section, `.mh-copy-block`, `.mh-copy-block h2`, `.mh-copy-block p`,
   `.mh-route-privacy-columns` stays as-is since it's a distinct class).
2. Update the ACT page's JSX (`MarketingRoutePages.tsx:380` region) to use
   `mh-act-privacy` in place of `mh-route-privacy`.
3. Leave About's `:529-531` block as the sole `.mh-route-privacy` owner. Its
   `max-width: 660px` child rule becomes live again — this restores About's
   originally-authored look (white background).
4. In the media queries, update the reset lists: at `:822-823` and
   `:886-887` the `.mh-route-privacy` entries must now ALSO cover
   `.mh-act-privacy` (add it to the same comma lists), and the duplicate
   `.mh-route-privacy` entry appearing in two groups of the 560px block is
   collapsed to one.
5. The 560px h2 override at `:888` (`.mh-route-privacy .mh-copy-block h2`)
   belongs to the ACT variant — rename it to `.mh-act-privacy .mh-copy-block h2`.

**Verify**: `grep -c "^\.mh-route-privacy {" src/components/marketing/homepage/MarketingHomepage.css` → `1`. `npm test && npm run build` → pass. In the browser: `/about`'s privacy section renders white with dark text; `/act`'s renders forest green with light text.

### Step 4: Delete the three surviving mobile `min-height`s

Remove `min-height: 760px` from `.mh-human.is-compact` (`:500`),
`min-height: 760px` from `.mh-route-story` (`:524`), and
`min-height: 720px` from `.mh-route-sponsor` (`:540`) — delete the
declaration entirely rather than adding more reset entries (content + padding
already size these sections on desktop; verify visually).

**Verify**: `grep -n "min-height: 760px\|min-height: 720px" src/components/marketing/homepage/MarketingHomepage.css` → only `.mh-route-hero` at `:479` remains (that one is intentional). Browser check at 390px width: `/about` and `/how-it-works` no longer show multi-screen empty gaps; at desktop width these sections look unchanged (their content is taller than the deleted min-heights at desktop, so nothing moves — if a desktop section visibly shrinks, STOP).

### Step 5: Give `PageHero` a single-column variant and adopt it on the two outlier pages

1. In `MarketingHomepage.css`, add next to `:479`:
   `.mh-route-hero.is-single { grid-template-columns: 1fr; min-height: 0; padding-bottom: 72px; }`
2. In `MarketingSite.tsx`, extend `PageHero` with `aside?: ReactNode | false`
   — when `aside === false`, render `<section className="mh-route-hero mh-section is-single">`
   and no `<aside>` element.
3. Replace the hand-rolled hero in `MarketingIntakeConfirmed.tsx:6-14` with
   `PageHero` using `aside={false}`, `current="home"` is not in its union —
   note `PageHero`'s `current` prop type is `Exclude<MarketingRoute, "home">`;
   the confirmation page renders inside the intake route. Pass
   `current="intake"` if that member exists in `MarketingRoute`; if it does
   not, widen the aside/summary label handling minimally rather than
   restructuring (check `MarketingRoute`'s definition at the top of
   `MarketingSite.tsx` first). Keep the exact copy strings byte-identical —
   they are covered by COPY.md.
4. Replace the hand-rolled hero in `not-found.tsx` with `PageHero`
   (`kicker="Page not found"`, same title/body/copy strings byte-identical,
   `cta="Return home"`, `ctaHref="/"`, and the existing aside content passed
   via the `aside` prop).

**Verify**: `npm test` → pass (copy tests confirm strings unchanged). `npm run build` → pass. Browser: `/intake/confirmed` hero is a single centered column with no empty right half; `/_not-found` (visit any bad URL) looks identical to before.

### Step 6: Full gate

**Verify**: `npm test && npm run lint && npx tsc --noEmit && npm run build && npm run e2e` → all pass, and `git status` shows only in-scope files modified.

## Test plan

- No new test files required. The existing suites are the gate:
  `MarketingHome.test.tsx` + `CopyDrift.test.tsx` (copy unchanged),
  `e2e/homepage.spec.ts`, `e2e/intake.spec.ts` (structure unchanged).
- Manual browser verification per step (this plan intentionally precedes the
  screenshot-test baseline in plan 012; the visual checks here are by hand).

## Done criteria

- [ ] `npm test`, `npm run lint`, `npx tsc --noEmit`, `npm run build`, `npm run e2e` all exit 0
- [ ] `grep -rn "mh-route-\${current}" src` → no matches (template now `mh-page-`)
- [ ] `grep -c "^\.mh-route-privacy {" src/components/marketing/homepage/MarketingHomepage.css` → 1
- [ ] Dead-class grep from Step 1 returns 0
- [ ] Only in-scope files modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The "Current state" excerpts don't match the live code (drift).
- Step 1's grep finds a live reference to any class on the dead list.
- Step 2's grep finds wrapper-class selectors beyond the `mh-route-resources`
  collision that are load-bearing on multiple pages.
- Deleting a `min-height` in Step 4 visibly changes a *desktop* layout.
- Any copy assertion in `npm test` fails — that means a copy string changed,
  which this plan must never do.

## Maintenance notes

- The `mh-page-<route>` prefix is now reserved for the wrapper; `mh-route-*`
  and section names must never be reused for page-level hooks. Plan 012 adds
  an automated guard for this.
- Plan 013 (container unification) and 014 (tokens) assume this plan's
  deletions have landed; their line numbers will have shifted — they carry
  their own drift checks.
- Reviewer focus: the About privacy section deliberately changes appearance
  (back to its authored white); flag that to the owner as the one intended
  visual change beyond the guide pages.
