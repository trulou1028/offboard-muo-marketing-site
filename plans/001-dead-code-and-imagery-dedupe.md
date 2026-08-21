# Plan 001: Remove dead migration components and give each page its own photo

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 9689184..HEAD -- src/ public/marketing/`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: tech-debt
- **Planned at**: commit `9689184`, 2026-08-21
- **Outcome**: PARTIAL — Steps 1–2 (dead code) DONE and reviewed; Steps 3–4
  (imagery) hit a STOP condition and moved to `plans/007-imagery-dedupe.md`.
  See "Execution record" below.

## Execution record (2026-08-21, executor + advisor review)

Executed by a dispatched executor in an isolated worktree; reviewed by the
advisor (every done criterion re-run independently, full diff read).

**Landed** — branch `claude/001-dead-code-imagery-dedupe`, commit `8b57205`,
worktree `.claude/worktrees/agent-ae905affe8d4aeb68`, **not pushed or merged**:
all six dead files deleted (900 lines), `src/journey/` removed. Verified by
the reviewer: `npm test` 7/7 · `npm run lint` exit 0 · `npm run build` exit 0
(all 6 routes) · `git diff --name-status` shows exactly the six deletions and
nothing else.

**Stopped** — Steps 3–4 correctly hit the documented STOP condition. The
advisor independently viewed all three images and confirms: `hero-real-life`,
`final-cta-portrait`, and `maya-walking` all show the same dark loose bun with
escaping strands, the same charcoal crewneck, the same age and three-quarter
gaze, in the same muted documentary light. Swapping one for another does not
solve the "same woman everywhere" problem this plan exists to fix.

**New finding (drove the rewrite in plan 007)**: the likeness bleed is
confined to the *portrait* photos. The advisor spot-checked
`strip-kitchen-table.webp` and `strip-call-outside.webp` — both show clearly
different subjects (an older man with grey curly hair; a different man on a
balcony) in the same visual world. Usable distinct imagery already exists in
the repo; it is landscape "life moment" framing rather than portrait framing.

**Deviation approved on merit**: the executor committed the Step 1–2 work
despite the overall run stopping, and said so plainly. The deletion is in
scope, independently verified, and not invalidated by the imagery blocker.
Approved.

## Why this matters

The 2026-08-21 route-split migration (commit `632fa65`) left ~800 lines of
components that nothing renders, and it reuses one photograph —
`raw/hero-real-life.webp`, a woman writing at a desk — in **four placements
across three pages**, which visitors notice as "the same woman everywhere."
Eight generated photos sit unused in `public/` because only dead code
referenced them. This plan deletes the dead code and gives the two non-hero
placements their own photos. It is pure risk reduction before the content
rebuild that follows in plans 002–004.

## Current state

Files that are **dead** (nothing outside this group imports them — verified
2026-08-21 by grepping all of `src/` for their import paths):

- `src/components/marketing/homepage/ProductScenes.tsx` (287 lines) — old app-repo port
- `src/components/marketing/homepage/HomeSections.tsx` (88 lines) — sections from the retired 17-section homepage
- `src/components/marketing/homepage/ComparisonTable.tsx` (51 lines)
- `src/components/marketing/homepage/SystemDiagram.tsx` (18 lines)
- `src/components/marketing/homepage/fixtures.ts` (322 lines) — only feeds the dead components
- `src/journey/stages.ts` — only imported by `ProductScenes.tsx` and `fixtures.ts`

Live components that MUST keep working (do not delete):
`MarketingHome.tsx`, `MarketingSite.tsx`, `MarketingRoutePages.tsx`,
`SearchShowcase.tsx` (rendered by `/how-it-works`), `MarketingHomepage.css`,
`MarketingHome.test.tsx`.

The duplicated photo, three references (the executor changes the last two):

- `src/components/marketing/homepage/MarketingSite.tsx:248` — homepage hero. **KEEP as is**:
  ```tsx
  <Image src="/marketing/homepage/raw/hero-real-life.webp" alt="A woman at a desk by a window, writing in a notebook as she plans what comes next" fill sizes="(max-width: 900px) 100vw, 42vw" preload />
  ```
- `src/components/marketing/homepage/MarketingSite.tsx:443` — inside
  `HumanSupportSection` (renders on `/` and `/how-it-works`). **CHANGE**:
  ```tsx
  <div className="mh-human-photo"><Image src="/marketing/homepage/raw/hero-real-life.webp" alt="A woman sitting at her desk with a notebook and laptop" fill sizes="(max-width: 900px) 100vw, 42vw" /></div>
  ```
- `src/components/marketing/homepage/MarketingRoutePages.tsx:101` — About-page
  origin story. **CHANGE**:
  ```tsx
  <div className="mh-route-story-photo"><Image src="/marketing/homepage/raw/hero-real-life.webp" alt="A woman at home planning what comes after a layoff" fill sizes="(max-width: 900px) 100vw, 44vw" /></div>
  ```

Unused photos that exist on disk and become the replacements (verify with
`ls public/marketing/homepage/raw/`):
- `public/marketing/homepage/raw/final-cta-portrait.webp` → new HumanSupportSection photo
- `public/marketing/homepage/raw/maya-walking.webp` → new About origin photo

Repo conventions: Next.js 16 App Router, `next/image` `<Image>` with `fill` +
`sizes` for section photos (see the three excerpts above — match exactly,
changing only `src` and `alt`). Copy voice is plain and human; alt text
describes the scene, not the brand.

## Commands you will need

| Purpose   | Command          | Expected on success |
|-----------|------------------|---------------------|
| Install   | `npm ci`         | exit 0              |
| Tests     | `npm test`       | 1 file, 7 tests pass |
| Lint      | `npm run lint`   | exit 0, no output   |
| Build     | `npm run build`  | exit 0, all 6 routes compile |

## Scope

**In scope** (the only files you may modify or delete):
- Delete: the six dead files listed in "Current state"
- Edit: `src/components/marketing/homepage/MarketingSite.tsx` (line 443 image only)
- Edit: `src/components/marketing/homepage/MarketingRoutePages.tsx` (line 101 image only)
- Edit: `plans/README.md` (status row)

**Out of scope** (do NOT touch):
- `public/` — delete NO assets. Several currently-unused files are reserved
  for plans 002–004 (`system-desk.webp`, `strip-*.webp`, toolkit renders).
- `SearchShowcase.tsx` — it references the same `renders/toolkit-*.webp`
  images as dead `ProductScenes.tsx`; it is live, keep it.
- Any copy, layout, CSS, or nav change — those belong to later plans.
- `e2e/` — the Playwright suite does not assert on these images.

## Git workflow

- Branch from `main`: `claude/001-dead-code-imagery-dedupe`
- Commit style (match `git log`): short imperative summary line, e.g.
  "Remove dead migration components and dedupe section photos"
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Prove the six files are still dead

For each of the six files, grep for importers outside the dead group:

```
grep -rn "ProductScenes\|HomeSections\|ComparisonTable\|SystemDiagram\|from \"./fixtures\"\|journey/stages" src --include='*.ts' --include='*.tsx' | grep -v -E "ProductScenes.tsx|HomeSections.tsx|ComparisonTable.tsx|SystemDiagram.tsx|fixtures.ts|stages.ts"
```

**Verify**: zero lines of output. Any hit → STOP condition (a live import
appeared since planning).

### Step 2: Delete the dead files

Delete exactly:
`src/components/marketing/homepage/ProductScenes.tsx`,
`src/components/marketing/homepage/HomeSections.tsx`,
`src/components/marketing/homepage/ComparisonTable.tsx`,
`src/components/marketing/homepage/SystemDiagram.tsx`,
`src/components/marketing/homepage/fixtures.ts`,
`src/journey/stages.ts` (and the `src/journey/` directory if now empty).

**Verify**: `npm test` → 7 tests pass. `npm run lint` → exit 0.

### Step 3: Reassign the HumanSupportSection photo

In `src/components/marketing/homepage/MarketingSite.tsx` line 443, change the
`src` to `/marketing/homepage/raw/final-cta-portrait.webp` and the `alt` to
`"A person pausing outdoors during a walk, taking a breath between next steps"`
— then open the actual image file and correct the alt text to describe what
the photo really shows. Keep `fill`, `sizes`, and className unchanged.

**Verify**: `grep -c "hero-real-life" src/components/marketing/homepage/MarketingSite.tsx` → `1`

### Step 4: Reassign the About origin photo

In `src/components/marketing/homepage/MarketingRoutePages.tsx` line 101,
change the `src` to `/marketing/homepage/raw/maya-walking.webp` and the `alt`
to `"A woman walking through her neighborhood, midway through a career transition"`
— again, open the image and correct the alt to the real scene. Keep the rest
of the element unchanged.

**Verify**: `grep -rn "hero-real-life" src/` → exactly one match, at
`MarketingSite.tsx` (the homepage hero).

### Step 5: Full verification

**Verify**: `npm test` → 7 pass · `npm run lint` → exit 0 · `npm run build`
→ exit 0 · `git status --porcelain` shows only the files in scope.

## Test plan

No new tests. The existing suite (`src/components/marketing/homepage/MarketingHome.test.tsx`)
must keep passing unchanged — it asserts on headings and metadata, not on
image sources. If any test fails after Step 2, a deleted file was not dead:
STOP.

## Done criteria

- [ ] `npm test` exits 0 (7 tests)
- [ ] `npm run lint` exits 0
- [ ] `npm run build` exits 0
- [ ] `grep -rn "hero-real-life" src/` → exactly 1 match (MarketingSite.tsx hero)
- [ ] The six dead files no longer exist
- [ ] `git status` shows no modifications outside the in-scope list
- [ ] `plans/README.md` status row updated

## STOP conditions

- Step 1's grep returns any importer of a "dead" file.
- Either replacement image (`final-cta-portrait.webp`, `maya-walking.webp`)
  is missing from `public/marketing/homepage/raw/`.
- On visual inspection the replacement photo's subject looks like the same
  person as the hero photo. (Known generation artifact: the imagery pipeline's
  style reference bled the hero subject's likeness into some photos. If so,
  report it — regeneration via `npm run imagery` is owner-driven and out of
  scope here.)
- Any test fails after deletion.

## Maintenance notes

- `public/` still holds unused assets (`strip-*.webp`, `collage/scrap-*.webp`,
  `renders/benefits-stack.webp`, `renders/privacy-three-panel.webp`,
  `offboard-logo-dark.png`). Deliberately kept: plans 002–004 may use them;
  prune whatever is still unused after plan 004 lands.
- The imagery pipeline is `scripts/generate-imagery.mjs` (`npm run imagery`);
  it style-locks photos to the hero reference. Any regeneration request goes
  to the owner.
- Reviewer: check the two new alt texts against the actual images.
