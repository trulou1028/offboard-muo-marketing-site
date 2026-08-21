# Plan 007: Give the human-support and About sections photos that are not the hero woman

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 9689184..HEAD -- src/components/marketing/homepage/MarketingSite.tsx src/components/marketing/homepage/MarketingRoutePages.tsx`
> Expected drift: plan 001's deletions (other files) and, if already landed,
> plans 002–005. If the two image lines in "Current state" no longer match
> the live code, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans/001-dead-code-and-imagery-dedupe.md (dead-code half; landed on branch `claude/001-dead-code-imagery-dedupe`)
- **Category**: tech-debt
- **Planned at**: commit `9689184`, 2026-08-21
- **Owner decision made 2026-08-21: Option B** (use the existing strip
  photos). This plan is unblocked and executable as written.

## Why this matters

One photograph — `raw/hero-real-life.webp`, a woman with a dark loose bun in a
charcoal crewneck — renders in three places across two pages: the homepage
hero, the human-support section (which appears on `/` and `/how-it-works`),
and the About origin story. Visitors read it as "the same woman everywhere,"
which undercuts a site whose whole promise is that it meets *your* specific
situation.

Plan 001 tried to fix this by swapping in two other photos and correctly
stopped: those photos are the same woman. This plan exists because the fix
needs a decision the executor cannot make.

## What the previous attempt established (verified, do not re-litigate)

The imagery pipeline (`scripts/generate-imagery.mjs`) style-locks generated
photos to `hero-real-life.webp` as a reference. That reference bled the
subject's likeness into every other **portrait**:

- `raw/hero-real-life.webp` — woman, dark loose bun, charcoal crewneck (the hero)
- `raw/final-cta-portrait.webp` — same bun, same charcoal crewneck, same gaze
- `raw/maya-walking.webp` — same bun, same charcoal crewneck, same gaze

The bleed did **not** reach the landscape "life moment" strip photos, which
have genuinely distinct subjects in the same visual world (verified by
viewing two of the five):

- `raw/strip-kitchen-table.webp` — an older man, grey curly hair, at a desk.
  Note: same room as the hero photo (same bookshelf, same blue handprint art,
  same window).
- `raw/strip-call-outside.webp` — a different man on a balcony, on the phone.
- `raw/strip-school-dropoff.webp`, `raw/strip-interview-prep.webp`,
  `raw/strip-walking-in.webp` — **not yet viewed**; the imagery notes on
  record say the school-dropoff subject resembles the hero woman. View before
  using.

All strip photos are landscape (roughly 3:2); the two placements being fixed
are currently portrait-ish fills.

## Owner decision required

**Option A — regenerate two distinct portraits (higher fidelity, owner-run).**
The owner runs `npm run imagery` with `--only` for the two placements,
generating photos with deliberately different subjects (age, gender,
ethnicity, dress) rather than style-locking to the hero. Produces
portrait-framed photos that drop into the existing layout unchanged. This
requires an OpenAI key and is owner-driven; an executor must not run it.

**Option B — use existing strip photos (no generation, ships today).**
Point the two placements at `strip-call-outside.webp` (human support: a person
reaching out, on the phone) and `strip-kitchen-table.webp` (About origin: a
person at their own desk). Both are verified-distinct subjects. Cost: they are
landscape, so the two containers need `object-fit: cover` treatment or a
modest aspect adjustment in `MarketingHomepage.css`, and the About photo
shares the hero's room, which a sharp-eyed visitor may notice.

**Advisor recommendation: B now, A later.** B removes the duplication
immediately at near-zero risk and unblocks the content plans; A is worth doing
as part of a deliberate photography pass, not as a blocker for copy work.

**Decision (owner, 2026-08-21): Option B.** Execute the steps below as
written. Option A remains available later as a deliberate photography pass;
if it happens, it supersedes this plan's photo choices but not its CSS work.

## Current state

The two lines to change (the homepage hero at `MarketingSite.tsx:248` is
**not** one of them — it keeps `hero-real-life.webp`):

- `src/components/marketing/homepage/MarketingSite.tsx:443`, inside
  `HumanSupportSection` (renders on `/` and, until plan 003 lands,
  `/how-it-works`):
  ```tsx
  <div className="mh-human-photo"><Image src="/marketing/homepage/raw/hero-real-life.webp" alt="A woman sitting at her desk with a notebook and laptop" fill sizes="(max-width: 900px) 100vw, 42vw" /></div>
  ```
- `src/components/marketing/homepage/MarketingRoutePages.tsx:101`, the About
  origin story:
  ```tsx
  <div className="mh-route-story-photo"><Image src="/marketing/homepage/raw/hero-real-life.webp" alt="A woman at home planning what comes after a layoff" fill sizes="(max-width: 900px) 100vw, 44vw" /></div>
  ```

Conventions: Next.js App Router, `next/image` with `fill` + `sizes` for
section photos. Keep `fill`, `sizes`, and the wrapper `className` unchanged —
change only `src` and `alt`. Alt text describes the scene plainly, not the
brand. The CSS classes `.mh-human-photo` and `.mh-route-story-photo` live in
`src/components/marketing/homepage/MarketingHomepage.css`.

## Commands you will need

| Purpose   | Command          | Expected on success |
|-----------|------------------|---------------------|
| Install   | `npm ci`         | exit 0              |
| Tests     | `npm test`       | all pass (7 at time of writing) |
| Lint      | `npm run lint`   | exit 0, no output   |
| Build     | `npm run build`  | exit 0, all routes compile |

## Scope

**In scope**:
- `src/components/marketing/homepage/MarketingSite.tsx` (line 443 image only)
- `src/components/marketing/homepage/MarketingRoutePages.tsx` (line 101 image only)
- `src/components/marketing/homepage/MarketingHomepage.css` (only
  `.mh-human-photo` / `.mh-route-story-photo` object-fit or aspect rules)
- `plans/README.md` (status row)

**Out of scope**:
- The homepage hero image — it keeps `hero-real-life.webp`
- `public/` — add, delete, or regenerate NO assets. Never run `npm run imagery`.
- Any copy, layout, nav, or route change

## Git workflow

- Branch: `claude/007-imagery-dedupe`
- Commit style: short imperative summary, e.g. "Give human-support and About their own photos"
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: View the candidate photos before wiring them

Use the Read tool on `public/marketing/homepage/raw/strip-call-outside.webp`
and `public/marketing/homepage/raw/strip-kitchen-table.webp`. Confirm each
subject is clearly NOT the woman in `public/marketing/homepage/raw/hero-real-life.webp`
(view that too, for comparison).

**Verify**: you can state, from having viewed them, who appears in each photo.
If either matches the hero subject → STOP condition.

### Step 2: Reassign the human-support photo

`src/components/marketing/homepage/MarketingSite.tsx:443` — set `src` to
`/marketing/homepage/raw/strip-call-outside.webp` and write an `alt` that
describes what you actually saw in Step 1 (a person on a phone call outdoors
on a balcony). Keep `fill`, `sizes`, and `className` unchanged.

**Verify**: `grep -c "hero-real-life" src/components/marketing/homepage/MarketingSite.tsx` → `1`

### Step 3: Reassign the About origin photo

`src/components/marketing/homepage/MarketingRoutePages.tsx:101` — set `src` to
`/marketing/homepage/raw/strip-kitchen-table.webp` and write an `alt` from
what you saw. Keep the rest unchanged.

**Verify**: `grep -rn "hero-real-life" src/` → exactly 1 match, at
`MarketingSite.tsx` (the homepage hero)

### Step 4: Re-tune the crop for the new landscape photos

`object-fit: cover` is **already set** on both containers — do not re-add it.
What needs changing is `object-position`, which is currently tuned for the
portrait photos being replaced. Current state in
`src/components/marketing/homepage/MarketingHomepage.css`:

```css
.mh-human-photo { position: relative; min-height: 624px; overflow: hidden; border-radius: 16px; }   /* line 252 */
.mh-human-photo img { object-fit: cover; object-position: 56% 50%; }                                 /* line 253 */
.mh-route-story-photo { position: relative; min-height: 610px; overflow: hidden; border-radius: 24px; } /* line 396 */
.mh-route-story-photo img { object-fit: cover; object-position: 54% center; }                        /* line 397 */
```

The containers are tall (624px / 610px, with responsive overrides at lines
444, 491, 522, 572) and the replacement photos are landscape (~3:2), so
`cover` crops the sides away aggressively. Set `object-position` on lines 253
and 397 so the subject stays in frame and no head is cut off:

- `strip-call-outside.webp` — the man is right-of-center in the frame.
- `strip-kitchen-table.webp` — the man is center-left, at a desk.

Pick values from what you actually see. Change ONLY the `object-position`
values on lines 253 and 397; leave the `min-height` values, the responsive
overrides, and everything else in the file untouched.

**Verify**: `npm run build` → exit 0, and
`git diff --stat src/components/marketing/homepage/MarketingHomepage.css`
shows a small diff (2 changed lines, no additions/deletions of rules).

Then verify visually if you can: start the dev server and load `/` and
`/about`, or render the images at the container aspect ratio. If you cannot
verify visually, say so plainly in your report — do not claim visual
verification you did not perform. Getting the crop wrong is the main risk in
this plan, so an honest "not visually verified" is far more useful than a
guess presented as confirmed.

### Step 5: Full verification

**Verify**: `npm test` → all pass · `npm run lint` → exit 0 ·
`npm run build` → exit 0 · `git status --porcelain` → only in-scope files.

## Test plan

No new tests — the suite asserts on headings and metadata, not image sources,
and should pass untouched. If a test fails, something outside scope changed:
STOP.

## Done criteria

- [ ] `npm test` exits 0
- [ ] `npm run lint` exits 0
- [ ] `npm run build` exits 0
- [ ] `grep -rn "hero-real-life" src/` → exactly 1 match (homepage hero)
- [ ] The three rendered photos (hero, human support, About) show three
      visibly different people
- [ ] No file outside the in-scope list modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

- A candidate strip photo turns out to show the hero subject after all.
- The two image lines don't match the "Current state" excerpts.
- Fixing the crop requires restructuring the section layout rather than an
  `object-fit` / `object-position` rule — report instead of redesigning.

## Maintenance notes

- The root cause is unfixed: `scripts/generate-imagery.mjs` style-locks to the
  hero photo, so any future portrait generated the same way will reproduce
  this bleed. If the owner does a photography pass (option A), consider
  removing the hero as a style reference for portraits, or varying the subject
  prompt explicitly.
- Three strip photos remain unviewed (`strip-school-dropoff`,
  `strip-interview-prep`, `strip-walking-in`); the notes on record suggest
  school-dropoff is contaminated. View before any future use.
- After plan 003 lands, `HumanSupportSection` no longer renders on
  `/how-it-works`, so this photo appears only on the homepage.
- Reviewer: confirm alt text matches the photo actually wired in, and that the
  hero photo was not touched.
