# Plan 003: Rebuild /how-it-works as the product page (5 steps, toolkit, LUMO)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 9689184..HEAD -- src/app/how-it-works/ src/components/marketing/homepage/ e2e/homepage.spec.ts`
> Expected drift: plans 001 and 002 touched `MarketingSite.tsx`,
> `MarketingHome.tsx`, tests, and e2e. Any drift inside
> `MarketingRoutePages.tsx`'s `MarketingHowItWorks` beyond that is a STOP.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: plans/002-homepage-substance-port.md (reviewed, open as
  PR #6 on branch `claude/002-homepage-substance-port`; base your work on
  that branch, not on `main`)
- **Category**: direction
- **Planned at**: commit `9689184`, 2026-08-21
- **Outcome**: DONE — executed and reviewed 2026-08-21, approved first pass.

## Execution record (2026-08-21, executor + advisor review)

Branch `claude/003-how-it-works-rebuild`, 3 commits ending `e691f86`, based on
`claude/002-homepage-substance-port` (002 was not yet merged). Diff vs that
base: 6 files, +251/-178, all in scope.

`/how-it-works` now renders: PageHero, FiveSteps, ToolkitSection, LumoSection,
HumanSupportSection, ContextSection, FaqSection, FinalCta.

Reviewer verification (re-run independently): `npm test` 7/7 · `npm run lint`
exit 0 · `npm run build` exit 0 · zero em-dashes and zero banned vocabulary in
the diff · "We never promise funding" present verbatim · rendered every new
section at 1280 and 390 with 0px horizontal overflow.

**The amendment worked**: `git diff` shows `HumanSupportSection` untouched
(zero lines, including the `<Image>` inside it), and `git merge-tree` reports
0 conflicts against `claude/007-imagery-dedupe`.

**Deletions audited**: `SearchShowcase.tsx` deleted; `FragmentedSection`,
`PersonalizedSection`, `RunwaySection`, `BenefitsSection` removed after the
orphan check. The executor also removed their private-only helpers
(`TransitionTimeline`, `BenefitsPreview`) and the `START_STEPS` const — beyond
the plan's named list, but a direct mechanical consequence of deleting their
sole callers, disclosed in its report. Reviewer confirmed **zero surviving
references** to all eight deleted symbols. Deviation approved on merit.

**Known leftovers, deliberately not pruned** (candidates for a future
cleanup plan):
- `StartingPlan` (exported) is now unreferenced; its only caller was the
  deleted `PersonalizedSection`. The executor flagged it and left it, per the
  plan's "if in doubt, leave it and say so". Note `StartingPlanPreview` is a
  different component and is still in use.
- CSS for the four deleted sections (`.mh-fragmented`, `.mh-personalized`,
  `.mh-runway`, `.mh-benefits`) remains in `MarketingHomepage.css` as dead
  rules; the plan scoped CSS changes as additive only.
- `src/app/how-it-works/page.tsx` metadata left unchanged; still accurate.

**Site-wide typography note** (not a defect in this plan): the codebase uses
straight quotes and apostrophes throughout, while one line added by plan 002
("California rules verified June 2026") uses curly quotes. Worth a single
consistency pass someday; deliberately not fixed piecemeal here.

## Why this matters

`/how-it-works` is the "how, and why it's better" page. Today it re-renders
generic homepage sections and never names the product's actual tools. The
approved design (Paper artboard "How it works · v1", file "Jazzy journey")
gives it a real spine: the five steps of a transition, a toolkit grid with
the Job Packet as flagship, LUMO with its trust guarantee, the kept-context
section, and integrations. This plan implements that page.

## Current state

- `src/app/how-it-works/page.tsx` — thin route wrapper exporting `metadata`
  and rendering `MarketingHowItWorks`. Keep the file; update only metadata
  description if needed.
- `src/components/marketing/homepage/MarketingRoutePages.tsx` —
  `MarketingHowItWorks()` is the first export (starts ~line 24). Today it
  renders: `PageHero` → `FragmentedSection` → `PersonalizedSection` →
  `RunwaySection` → `BenefitsSection` → `SearchShowcase` →
  `HumanSupportSection` → an inline "product proof" section →
  `FaqSection(PRODUCT_FAQS)` → `FinalCta`.
- `src/components/marketing/homepage/MarketingSite.tsx` — exports `PageHero`
  (props: kicker/title/body/current/aside/cta/ctaHref), `FaqSection`,
  `FinalCta`, `HumanSupportSection`, `PRODUCT_FAQS`, plus the sections being
  retired from this page.
- `src/components/marketing/homepage/SearchShowcase.tsx` — client component
  with tabbed toolkit renders (`renders/toolkit-*.webp`, `renders/path-stage.webp`).
  Superseded by the new toolkit grid; deleted in Step 6.
- E2E: `e2e/homepage.spec.ts` navigates to `/how-it-works` and asserts
  `heading level 1 /start with your situation/i` and hydration of the
  SearchShowcase tablist via `waitForSearchHydration` (`[role="tab"]`).
  Both assertions change in this plan.
- Voice and language rules: same as plan 002 (plain, calm, no em-dashes;
  never *platform/workspace/modules*; never promise funding or outcomes).

## Target page composition

```tsx
<PageHero ... />        {/* new copy, Step 1 */}
<FiveSteps />           {/* NEW, Step 2 */}
<ToolkitSection />      {/* NEW, Step 3 */}
<LumoSection />         {/* NEW, Step 4 */}
<ContextSection />      {/* NEW, Step 5 — includes integrations strip */}
<FaqSection title="What to know about the product." items={PRODUCT_FAQS} />
<FinalCta />
```

`FragmentedSection`, `PersonalizedSection`, `RunwaySection`,
`BenefitsSection`, `SearchShowcase`, and the inline product-proof section
leave this page. **`HumanSupportSection` stays.**

### Why human support stays (amended 2026-08-21)

An earlier draft of this plan dropped `HumanSupportSection` from this page.
Two reasons that was wrong:

1. **Product completeness.** After plan 002, this page is the section's only
   remaining render on the whole site. Dropping it would leave the product's
   "human when needed" pillar represented by nothing but a one-line link in
   the homepage community strip. It also completes the escalation ladder the
   page is already telling: work on your own, ask LUMO, talk to a person.
   Placed directly after `LumoSection`, it reads as the natural next rung.
2. **It would collide with shipped work.** Plan 007 (branch
   `claude/007-imagery-dedupe`, PR #3) changed the photo inside
   `HumanSupportSection`. Deleting the component would conflict with that
   branch and discard the change.

So: keep it, render it with no `compact` prop, and do NOT delete its
definition.

## Copy specification (inline, authoritative)

**PageHero** — kicker `How it works`; title
`One plan that starts where you are.`; body
`Whether you were laid off yesterday, have been searching for months, or are still employed and reading the room, your plan starts from your situation and your state, not a template.`;
cta `Build my free transition plan`; aside: label `The spine and the muscle`,
strong `The plan is the spine. The tools are the muscle.`, paragraph
`Every step links straight into the tool that does the heavy lifting. No blank pages, no starting over.`

**FiveSteps** — kicker `The plan, start to finish`; H2
`Five steps from "what just happened" to "what's next."`
Rows (number / title / body / tool tag):
1. `Tell us where you are` / `A few questions: your situation, your state, your dates. That's enough to build a plan that's actually yours, not a template.` / tag `Your situation & state`
2. `See your money clearly` / `Your runway, how long you can go, beside your money clock: which benefit deadlines are coming and what each one is worth.` / tag `Runway calculator · Money clock`
3. `Claim what exists` / `Step-by-step paths to unemployment benefits, health coverage, and state-approved funded training, with verified official links. We never promise funding. We show you the exact path to find out.` / tag `Benefit sheets · Funded training explorer`
4. `Get ready, then run the search` / `Resume, story, materials, then Job Packets: paste a posting and get a ghost-job check, a fit read, tailored materials, and a warm path to a real person.` / tag `Job Packet · Resume Studio`
5. `Close it, and make it count` / `Interview prep and practice, a paperwork review before you sign, and when you land: mark it, keep your career ledger, and pass what you learned back.` / tag `Interview prep · Paperwork review`

**ToolkitSection** — kicker `The toolkit`; H2
`The tools didn't go anywhere. Now they show up at the right moment.`
Flagship card (forest background): label `Flagship`; title `Job Packet`; body
`Paste a posting and get a ghost-job check, a fit read, tailored materials, and a warm path to a real person, all kept with the role.`;
chips `Ghost check` `Fit read` `Tailored materials` `Warm intro`; link
`Explore the Job Packet` (→ `SIGN_UP_URL` until a dedicated page exists).
Grid of 8 small cards (title / one-liner):
- `Resume Studio` / `Build and tailor resumes from your real history, ready for the role in front of you.`
- `Interview prep & practice` / `Drills grounded in the role, the company, and your strongest stories.`
- `Application tracker` / `Every application, stage, and follow-up stays current without extra busywork.`
- `Ghost-job checker` / `Flags fake or stale listings before you waste an application on them.`
- `Paperwork review` / `A read on your severance or offer paperwork before you sign anything.`
- `Runway calculator` / `See how long your money lasts and which deadlines change the math.`
- `Funded training explorer` / `Search state-approved programs that may be paid for while you train.`
- `Ask LUMO` / `An AI guide that works from your plan, your benefit facts, and your search.`

**LumoSection** (forest band) — kicker `Meet LUMO`; H2
`An AI guide that knows your actual situation.`; body
`LUMO works from your plan, your benefit facts, your runway, and your search, not a blank chat window. It paces with you: triage in week one, interview drills in month three.`
Trust callout (bordered card):
`When LUMO talks about your benefits, it reads from human-verified state facts. It never invents a dollar figure or a deadline.`
Right column, label `Ask questions like`, numbered 01–04:
`What deadlines am I coming up on?` · `Am I eligible for funded training?` ·
`Walk me through this severance agreement.` · `Help me prepare for tomorrow's interview.`

**ContextSection** — kicker `Your context, kept`; H2
`Stop repeating your story to every new tool.`; body
`Your situation, state, runway, roles, resumes, applications, interviews, and outcomes stay connected. Every step of the plan, and every tool, starts from your real context instead of a blank page.`
Chip group `Adds context`: `Your situation & state` `Money clock` `Roles & resumes` `Network`.
Chip group `Improves next`: `Applications` `Interviews` `Runway` `Offers`.
Integrations strip (bottom rule): lead
`Connects to your stack. Your tools provide context. Offboard provides the plan.`
Chips: `Calendar` `Gmail` `Drive` `Slack · soon` `Notion · soon` (the two
"soon" chips styled dashed/muted).

## Commands you will need

| Purpose   | Command          | Expected on success |
|-----------|------------------|---------------------|
| Tests     | `npm test`       | all pass            |
| Lint      | `npm run lint`   | exit 0              |
| Build     | `npm run build`  | exit 0              |
| E2E       | `npm run e2e`    | all pass            |

## Scope

**In scope**:
- `src/components/marketing/homepage/MarketingRoutePages.tsx` (`MarketingHowItWorks` only)
- `src/components/marketing/homepage/MarketingSite.tsx` (add the four new
  section components; do not edit unrelated sections)
- `src/components/marketing/homepage/MarketingHomepage.css` (additive styles)
- Delete `src/components/marketing/homepage/SearchShowcase.tsx` (Step 6)
- `src/app/how-it-works/page.tsx` (metadata description only)
- `src/components/marketing/homepage/MarketingHome.test.tsx` (how-it-works assertions)
- `e2e/homepage.spec.ts` (how-it-works assertions + remove `waitForSearchHydration` if unused)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch):
- The other four route functions in `MarketingRoutePages.tsx`
  (`MarketingPricing`, `MarketingAbout`, `MarketingEmployers`,
  `MarketingPublicPartners`) — even where they render sections this plan
  retires from `/how-it-works`. They are rebuilt in plans 004–005.
- **`HumanSupportSection` — do NOT delete or modify it.** It stays in this
  page's composition (see "Why human support stays"). Another open branch
  edits the photo inside it; touching it here would conflict.
- Component definitions of `FragmentedSection` / `PersonalizedSection` /
  `RunwaySection` / `BenefitsSection` in `MarketingSite.tsx`: remove them
  from this page's composition only. After recomposition, grep each name
  across `src/`; delete a definition ONLY if it has zero remaining renders
  (record which ones you deleted in the PR). If in doubt, leave it and say so.
- Nav, footer, homepage.

## Git workflow

- Branch from `main` (after 002 merges): `claude/003-how-it-works-rebuild`
- Commit per step; short imperative summaries.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

1. **Rewrite the `PageHero` invocation** in `MarketingHowItWorks` per spec.
   Verify: `grep -n "One plan that starts where you are" src/components/marketing/homepage/MarketingRoutePages.tsx` → 1.
2. **Add `FiveSteps`** to `MarketingSite.tsx` + CSS (numbered rows with a
   fixed-width number lane; follow the `NumberedRows` pattern already in the
   file for markup conventions, but this is a new component — do not modify
   `NumberedRows`). Verify: build passes.
3. **Add `ToolkitSection`** (flagship card + 2-column grid of 8; server
   component, static). Verify: `grep -c "Job Packet" src/components/marketing/homepage/MarketingSite.tsx` ≥ 2.
4. **Add `LumoSection`**. Verify: `grep -n "never invents a dollar figure" src/components/marketing/homepage/MarketingSite.tsx` → 1.
5. **Add `ContextSection`** with the integrations strip, and keep
   `<HumanSupportSection />` in the composition between `LumoSection` and
   `ContextSection`. Verify: build passes, and
   `grep -c "HumanSupportSection" src/components/marketing/homepage/MarketingRoutePages.tsx`
   → 2 (the import and the render).
6. **Recompose `MarketingHowItWorks`** to the target order; delete
   `SearchShowcase.tsx`; run the orphan check from Scope (grep each retired
   section name; delete only zero-render definitions). Verify: `npm test`
   fails only on how-it-works assertions not yet updated.
7. **Update tests + e2e**: unit — assert the new H1, the five step titles,
   `Job Packet`, and the LUMO trust line; e2e — replace the
   `/start with your situation/i` H1 assertion with
   `/one plan that starts where you are/i`, remove `waitForSearchHydration`
   and the tablist interaction (the page has no tabs now), keep the
   no-backend-requests check. Verify: `npm test` → all pass.
8. **Full gates**: `npm run lint` → 0 · `npm run build` → 0 · `npm run e2e` → all pass.

## Test plan

- Unit (in `MarketingHome.test.tsx`, the existing how-it-works `it(...)`
  block): new H1; headings for the five steps section, toolkit, LUMO,
  context section; `screen.getByText(/never invents a dollar figure/i)`;
  no fetch calls.
- E2E: navigation from homepage nav link still lands on `/how-it-works`
  with the new H1 visible; zero console errors; zero backend requests.

## Done criteria

- [ ] `npm test`, `npm run lint`, `npm run build`, `npm run e2e` all exit 0
- [ ] `src/components/marketing/homepage/SearchShowcase.tsx` no longer exists
- [ ] `grep -rn "SearchShowcase" src/` → 0 matches
- [ ] `/how-it-works` composition matches the target order
- [ ] No file outside the in-scope list modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

- Plan 002 has not landed (homepage still shows old composition).
- A retired section still renders on another route AND deleting its
  definition would break that route — leave the definition, note it, move on;
  if the recomposition itself breaks another route's test, STOP.
- The `Explore the Job Packet` link target is disputed (no dedicated page
  exists; this plan points it at `SIGN_UP_URL`) — if the operator wants a
  different target, they must say so; do not invent a URL.

## Maintenance notes

- Toolkit render images (`public/marketing/homepage/renders/toolkit-*.webp`,
  `path-stage.webp`) lose their last renderer when `SearchShowcase` is
  deleted. Keep them on disk; a future design pass may re-embed product
  renders in the toolkit cards. Note them in the post-004 asset prune.
- When a dedicated Job Packet landing page ships, update the flagship card
  link and add it under Product in the footer.
- Reviewer: confirm no em-dashes; confirm the funded-training step keeps
  "We never promise funding" verbatim.
