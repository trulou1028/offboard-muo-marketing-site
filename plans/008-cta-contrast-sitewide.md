# Plan 008: Make the primary CTA readable (it is white-on-lime everywhere)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 9689184..HEAD -- src/components/marketing/homepage/MarketingHomepage.css`

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none technically. Best sequenced AFTER plans 002/003/004
  land, because they add CTAs this fix should also cover.
- **Category**: bug (accessibility)
- **Planned at**: commit `9689184`, 2026-08-21
- **Outcome**: DONE — executed and reviewed 2026-08-21, approved first pass.

## Execution record (2026-08-21, executor + advisor review)

Branch `claude/008-cta-contrast`, commit `820bca5`, based on
`claude/004-pricing-real-numbers`. Diff: 1 file, +2/-2 — CSS only, no markup.

Three changes:
1. Added `.marketing-homepage a.mh-primary-cta { color: var(--mh-deep); }`
   immediately after the base rule.
2. Raised `.mh-header-actions .mh-primary-cta` to
   `.mh-header-actions a.mh-primary-cta` (see below).
3. Deleted plan 004's now-redundant `.mh-price-deck .is-primary
   .mh-primary-cta` patch.

**THE PLAN'S PROPOSED FIX WAS INCOMPLETE, and the executor caught it by
measuring.** This plan asserted the header rule would "still win" after the
new rule landed. That was wrong: `.marketing-homepage a.mh-primary-cta` is
(0,2,1) and `.mh-header-actions .mh-primary-cta` is (0,2,0), so the fix
*broke* the header CTA to 1.0:1 (dark text on its dark background). The
executor measured this rather than assuming, then resolved it in CSS alone by
matching specificity at (0,2,1) — the header rule then wins on source order,
being later in the file. It verified via the TSX that the header CTA always
renders as an `<a>`, so the selector change is safe. Deviation approved: it
was necessary, minimal, in scope, and disclosed.

Reviewer verification (measured independently in a running browser, all 6
routes, 1280px): **23 primary CTAs, zero below 4.5:1, worst case 12.05:1.**
Header CTA confirmed still `rgb(255,255,255)` at 13.61:1 on every route.
Visually confirmed the hero CTA now renders dark-on-lime and the header
retains its white-on-bordered treatment. `npm test` 7/7 · lint 0 · build 0.
`git merge-tree` shows 0 conflicts against the 001, 007, and launch-autoport
branches.

Note on colour: CTAs that previously *looked* correct were inheriting
`--mh-ink` (14.67:1) by accident. They now use the button's own declared
`--mh-deep` (12.05:1). Both pass AA comfortably; this is the intended colour
finally being applied rather than a regression.

## Why this matters

**The site's primary call-to-action is close to invisible on every page.**
Measured on `main` in a running browser, the hero button renders white text
(`rgb(255,255,255)`) on the lime background (`rgb(223,255,90)`): a contrast
ratio of **1.13:1**. Route-page CTAs measure **1.03:1**. WCAG 2.1 AA requires
4.5:1, and the product brief treats AA as a non-negotiable baseline. It is
also a direct conversion problem: "Build my plan" is the button the whole
site exists to get people to press.

This is **pre-existing on `main`**, not introduced by the rebuild work. It was
found while reviewing plan 004, which fixed the single instance inside the
pricing deck; every other instance is still broken.

## Root cause (diagnosed, do not re-derive)

`src/components/marketing/homepage/MarketingHomepage.css` line ~37:

```css
.marketing-homepage a { color: inherit; text-decoration: none; }
```

Specificity (0,1,1). The button's own rule, line ~50:

```css
.mh-primary-cta { ... background: var(--mh-lime); color: var(--mh-deep); ... }
```

Specificity (0,1,0). The global `a` rule **wins**, so `.mh-primary-cta` never
applies its own colour to an `<a>`. Every primary CTA inherits its ancestor's
colour instead. On light sections it inherits dark ink and looks correct by
accident. On dark sections (hero, final CTA, route heroes, contact bands) it
inherits near-white and lands on lime.

Plan 004 patched one instance with a higher-specificity rule
(`.mh-price-deck .is-primary .mh-primary-cta`). That is a symptom fix; this
plan fixes the cause.

## Confirmed failures (measured 2026-08-21 on `main`, 1280px)

| Route | CTA | Ratio |
|---|---|---|
| `/` | Build my plan (hero) | 1.13:1 |
| `/` | Build my plan (final CTA) | 1.13:1 |
| `/about` | Talk to the team | 1.03:1 |
| `/about` | Talk to someone | 1.03:1 |
| `/employers` | Talk about sponsored access | 1.03:1 |
| `/employers` | Talk about employer support | 1.03:1 |
| `/public-partners` | Discuss a partnership | 1.03:1 |
| `/public-partners` | Discuss a public partnership | 1.03:1 |

Correct for comparison: any CTA on a light section measures **14.67:1**
(`rgb(21,33,29)` on lime). The header CTA is a different treatment
(transparent background, white text, 13.61:1) and is CORRECT — do not change it.

## The fix

Raise the specificity of the button's own colour so it stops inheriting.
Prefer ONE rule over per-section patches:

```css
.marketing-homepage a.mh-primary-cta { color: var(--mh-deep); }
```

Specificity (0,2,1) beats the global reset. Place it immediately after the
`.mh-primary-cta` rule so the relationship is obvious to the next reader.

Then check the variants that intentionally differ and make sure they still
win, because they may now need equal or higher specificity:
- `.mh-header-actions .mh-primary-cta` — transparent background, white text.
  MUST stay white; it is correct today at 13.61:1.
- `.mh-price-deck .is-primary .mh-primary-cta` — added by plan 004. Once the
  general fix lands this rule becomes redundant; **delete it** if and only if
  the pricing deck still measures ≥ 4.5:1 without it.

## Commands you will need

| Purpose | Command | Expected |
|---|---|---|
| Install | `npm ci` | exit 0 |
| Tests | `npm test` | all pass |
| Lint | `npm run lint` | exit 0 |
| Build | `npm run build` | exit 0 |
| E2E | `npm run e2e` | all pass |

## Scope

**In scope**: `src/components/marketing/homepage/MarketingHomepage.css` only.

**Out of scope**: every `.tsx` file (this is a pure CSS specificity fix, no
markup change), the header CTA treatment, button backgrounds, and any
copy or layout change.

## Steps

### Step 1: Reproduce before fixing

Start a dev server (NOT on port 3000, which is usually taken; never run
`pkill -f "next dev"`). With Playwright, run from the repo root:

```js
import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1280,height:900} });
await p.goto('http://localhost:<port>/');
const r = await p.evaluate(() => {
  const lum=c=>{const m=c.match(/[\d.]+/g).slice(0,3).map(Number);const q=m.map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*q[0]+0.7152*q[1]+0.0722*q[2]};
  const ratio=(a,b)=>{const l1=lum(a),l2=lum(b);return +((Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)).toFixed(2)};
  const bgOf=el=>{let n=el;while(n){const b=getComputedStyle(n).backgroundColor;if(b&&!/rgba\(0, 0, 0, 0\)/.test(b))return b;n=n.parentElement}return 'rgb(255, 255, 255)'};
  return [...document.querySelectorAll('a.mh-primary-cta')].map(a=>{
    const leaf=[...a.querySelectorAll('*')].find(e=>e.children.length===0&&e.innerText?.trim())||a;
    const cs=getComputedStyle(leaf);
    return {t:leaf.innerText.trim(), c:ratio(cs.color,bgOf(leaf))};
  });
});
console.log(r);
```

**Verify**: you observe at least one CTA below 4.5:1. If everything already
passes, STOP — the bug was fixed elsewhere and this plan is obsolete.

### Step 2: Apply the fix

Add the single rule above. Do not add per-section patches.

**Verify**: `npm run build` → exit 0.

### Step 3: Re-measure every route

Re-run the Step 1 script against `/`, `/how-it-works`, `/pricing`, `/about`,
`/employers`, `/public-partners`.

**Verify**: EVERY `a.mh-primary-cta` measures ≥ 4.5:1. Report the table.

### Step 4: Confirm the intentional variants still look right

**Verify**: the header CTA still renders white text on its transparent
bordered background (≥ 4.5:1 against the dark header), and the pricing deck's
three CTAs still measure ≥ 4.5:1. Screenshot the header and the pricing deck
at 1280 and look at them.

### Step 5: Remove the now-redundant patch

If plan 004's `.mh-price-deck .is-primary .mh-primary-cta` rule is present and
the deck still passes without it, delete that line.

**Verify**: re-measure the deck → still ≥ 4.5:1. `npm run build` → exit 0.

### Step 6: Full gates

**Verify**: `npm test` · `npm run lint` · `npm run build` · `npm run e2e` all pass.

## Test plan

No new unit tests: contrast is a computed-style property that jsdom does not
evaluate meaningfully. The verification is the measured table in Step 3,
which must appear in the executor's report.

Optional, only if it fits the existing e2e conventions cleanly: a Playwright
assertion that every `a.mh-primary-cta` has a computed colour of
`rgb(21, 33, 29)` on routes where it sits on lime. Skip it rather than
contorting the suite.

## Done criteria

- [ ] Every `a.mh-primary-cta` on all 6 routes measures ≥ 4.5:1
- [ ] The header CTA still renders white on its bordered background
- [ ] Only `MarketingHomepage.css` is modified (`git status`)
- [ ] `npm test`, `npm run lint`, `npm run build`, `npm run e2e` all exit 0
- [ ] `plans/README.md` status row updated

## STOP conditions

- Step 1 shows everything already ≥ 4.5:1 (someone else fixed it).
- The single-rule fix breaks the header CTA and cannot be resolved without
  touching markup — report rather than restructuring components.
- Fixing contrast appears to require changing the lime background or the
  brand palette. It does not; the dark-ink-on-lime pairing already measures
  14.67:1 and is used correctly elsewhere. If you conclude otherwise, STOP.

## Maintenance notes

- The underlying trap is `.marketing-homepage a { color: inherit }`. Any
  future component that sets its own link colour with a single class will hit
  the same problem. Consider whether that reset should be narrowed rather
  than out-specified, as a follow-up.
- Contrast bugs pass every automated gate in this repo. When a change puts
  text on a coloured background, measure it; do not eyeball it. Both defects
  found while reviewing plan 002 and this one were invisible to tests, lint,
  build, and e2e.
