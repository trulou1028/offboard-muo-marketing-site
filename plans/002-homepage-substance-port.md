# Plan 002: Rebuild the homepage with the approved v7 substance

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 9689184..HEAD -- src/app/page.tsx src/components/marketing/homepage/ e2e/homepage.spec.ts`
> Expected, harmless drift if those plans have landed: 001 deletes dead files
> (no overlap with this plan), and 007 changes one image line in
> `MarketingSite.tsx` plus two `object-position` values in the CSS. Any OTHER
> change to the excerpted code below is a STOP condition.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: none (hard). Plan 001 is *recommended* first for tidiness,
  but it is not a technical prerequisite: verified 2026-08-21 that none of
  this plan's in-scope files import any module 001 deletes, so this plan
  executes correctly from `main` whether or not 001 has landed.
- **Category**: direction
- **Planned at**: commit `9689184`, 2026-08-21
- **Outcome**: DONE — executed and reviewed 2026-08-21 over three rounds.
  See "Execution record".

## Execution record (2026-08-21, executor + advisor review)

Branch `claude/002-homepage-substance-port`, 4 commits ending `2eea650`, based
on `main`, **not merged**. Worktree `.claude/worktrees/agent-aa3917f56a94299f1`.
Diff: 5 files, +263/-28 (all in scope).

Homepage now renders the 9 target sections in order: Hero, Problem, Three
jobs, Hook band, Connected plan, Verified facts, Pricing teaser, Community,
Final CTA.

Reviewer verification (re-run independently): `npm test` 7/7 · `npm run lint`
exit 0 · `npm run build` exit 0 · `npm run e2e` 4/4 · zero em-dashes and zero
banned vocabulary in new copy · the $12,000 example ships with its California
/ week-16 conditions and "we never promise funding" small print · 18 spec
strings spot-checked verbatim · tests assert real content (problem H2, the
$12,000 hook, verified-facts, `$0 forever`, `$20/month`, `5,000+ subscribers`,
"Find out first") and keep the no-backend-requests check.

**A false start worth recording**: the first dispatch stopped without writing
code because this plan listed "plan 001 has not landed" as a STOP condition
and 001 was still in an unmerged PR. That was a plan defect, since the two
plans share no files; corrected before the second dispatch.

**Two bugs found in review, both invisible to every automated gate** (tests,
lint, build, and e2e all passed on the broken layout):

1. Community rows rendered with the CTA on the left and the title pushed
   right. `.mh-community-rows a` was pinned to `grid-row: 1 / 3` with no
   `grid-column`, so grid placed the row-locked link into column 1 and the
   unplaced `<h3>` into column 2. Fixed with explicit `grid-column` on both.
2. The follow-on fix regressed mobile: the `@media (max-width: 900px)`
   override resets `grid-row` but not `grid-column`, so the link asked for a
   column 2 that no longer existed and grid invented an implicit one. Fixed
   by adding `grid-column: auto` to that override. (Reviewer-caused; the
   first instruction was incomplete.)

Both fixes verified by rendering at 1280 / 768 / 390: rows read title,
description, CTA, with 0px horizontal overflow at every width.

**Tooling note**: the Browser pane's screenshot tool returned black images
with `visibilityState: "hidden"` across three attempts in two independent
agents. Driving Playwright directly (`chromium.launch()` from the repo root
so `@playwright/test` resolves) works and is how both bugs were caught.

**Merge safety**: `git merge-tree` shows 0 conflicts against both
`claude/001-dead-code-imagery-dedupe` and `claude/007-imagery-dedupe`, despite
002 and 007 both editing `MarketingSite.tsx` and the CSS.

**Owner gate CLEARED 2026-08-21**: the owner confirmed the pricing figures
($0 / $20 per month / 30 vs 300 monthly credits / 3 LUMO messages a day /
first Job Packet free) and confirmed "5,000+ subscribers" is the correct
number (the strategy doc's 8,000+ is superseded). No blocker remains on this
plan.

## Why this matters

The homepage currently carries the right structure but abstract copy: no
proof numbers, no named tools, no concrete example of what Offboard catches.
The approved copy (the company's "landing page v7" strategy doc, already
proven on the previous production site) is specific: a $12,000 deadline
example, a verified-facts guarantee, real pricing, real community numbers.
This plan ports that substance into the existing route-split homepage. The
design is approved as the Paper artboard "Homepage · MUO v3 (post-audit)"
(file "Jazzy journey"); this plan is its code twin.

## Current state

- `src/app/page.tsx` — renders `MarketingHome` (metadata + one import; do not restructure)
- `src/components/marketing/homepage/MarketingHome.tsx` — homepage composition. Today (lines 12–26):
  ```tsx
  export default function MarketingHome() {
    return (
      <MarketingShell current="home">
        <main id="main-content">
          <HomeHero />
          <HowItWorksOverview />
          <ConnectedPlanSummary />
          <PrivacySummary />
          <HumanSupportSection compact />
          <PricingTeaser />
          <FinalCta />
        </main>
      </MarketingShell>
    );
  }
  ```
- `src/components/marketing/homepage/MarketingSite.tsx` — all shared sections.
  Landmarks: `SIGN_UP_URL`/`SIGN_IN_URL`/`HUMAN_SUPPORT_URL` consts at top;
  `HomeHero()` (~line 236); `HowItWorksOverview()` (~line 262);
  `PricingTeaser()` (~line 482); `FinalCta()` (~line 507).
- `src/components/marketing/homepage/MarketingHomepage.css` — all `mh-*`
  classes. New sections follow its conventions: section classes `mh-<name>`,
  shared paddings via `mh-section`, kickers `mh-kicker` (lime variant
  `is-lime` on dark), split layouts `mh-split`.
- Design tokens (already in the CSS): paper `#F7F4EC`, forest `#003F33`,
  ink `#0A3D32`, lime `#DFFF5A`, Fraunces display / Aspekta UI (local fonts).
- Tests: `src/components/marketing/homepage/MarketingHome.test.tsx` asserts
  homepage headings ("A layoff gives you three jobs at once.", "One place for
  the decisions…", "Your transition is yours.", `/start free.*add support/i`).
  E2E: `e2e/homepage.spec.ts` asserts the same headings and that no
  `supabase.co|api.offboard.co` requests fire from marketing pages.

Voice rules (from the app repo's product brief, binding for all new copy):
plain-spoken and calm, **no em-dashes**, no hype, never promise funding or
outcomes. Language rules: say *laid off, unemployment, what you're owed, your
plan, tools*; never say *platform, infrastructure, solutions, modules,
workspace, career transition services*.

## Target homepage composition

Replace the composition body with this order (components defined in Steps 2–7):

```tsx
<HomeHero />            {/* edited copy, Step 2 */}
<ProblemSection />      {/* NEW, Step 3 */}
<HowItWorksOverview />  {/* recaptioned, Step 4 */}
<HookBand />            {/* NEW, Step 5 */}
<ConnectedPlanSummary />{/* unchanged */}
<VerifiedFactsStrip />  {/* NEW, Step 6 */}
<PricingTeaser />       {/* replaced with 3 real cards, Step 7 */}
<CommunityStrip />      {/* NEW, Step 7 */}
<FinalCta />            {/* edited copy, Step 8 */}
```

`PrivacySummary` and `HumanSupportSection` leave the homepage (the section
components stay in `MarketingSite.tsx` — `/how-it-works` and `/about` still
render them until plans 003/005 land).

## Copy specification (inline, authoritative)

**Hero (edit `HomeHero`)** — keep the H1 exactly
"The Modern Unemployment Office" (two spans, current markup). Change:
- Kicker: `For the moment work stops`
- Body: `Your layoff comes with help nobody tells you about. Offboard turns the weeks after it into one calm plan: the benefits you can claim, the deadlines that matter, how long your money lasts, and what to do next, with tools that help you execute every step.`
- Primary CTA label: `Build my free transition plan` (still `SIGN_UP_URL`)
- Small print: `No credit card required. Benefit facts are verified by people, never generated by AI. Offboard is independent, not a government agency, and claiming your benefits is always free.`

**ProblemSection (new)** — kicker `The real problem`; H2
`Most people find out what they were entitled to when it's too late.`; body:
`A layoff comes with a system attached: unemployment benefits, health-coverage windows, severance review periods, and billions of dollars in federal training money. Nobody markets it, the paperwork is hostile, and the deadlines expire silently while you're busy rewriting your resume.`
Right column, label `The questions behind every layoff`, numbered 01–06:
`What am I actually entitled to?` · `How long will my money last?` ·
`Is my severance agreement normal?` · `What happens to my health insurance?` ·
`Could I get paid to retrain?` · `When do I really need to be back at work?`

**HowItWorksOverview (recaption only — keep image, pills, layout)**:
- Kicker: `The three jobs`
- Intro paragraph: `Claim the support that exists. Make your money last. Land what comes next. Offboard connects all three in one plan.`
- Rail items: 01 `Claim what you're owed` / `Unemployment benefits, health-coverage windows, severance review, and state-approved funded training, with the deadlines watched.` · 02 `Make your money last` / `Your runway beside your money clock: which benefit deadlines are coming and what each one is worth.` · 03 `Land what's next` / `Job Packets, resume tailoring, interview prep, and application tracking, kept connected in one search.`
- Image pill labels: 01 `Claim`, 02 `Money`, 03 `Next role`

**HookBand (new, forest-green band)** — kicker `One example`; H2
`There is a deadline worth roughly $12,000 that most people have never heard of.`; body:
`If you were laid off in California, you may be able to keep your unemployment benefits while you train full-time, including an extension worth roughly $12,000. But only if you contact EDD before week 16 of your benefit payments. Most people have never heard of it. Offboard watches that clock for you.`
Small print (required, claims discipline):
`Amounts and timing vary by situation. We never promise funding, we show you the exact path to find out.`
Right: a static "money clock" card labeled `Benefit payments` + `Sample · CA`,
headline `Week 12 of 16`, a progress bar at 75%, endpoints `Now · week 12` /
`Deadline · week 16`, footer row `~$12,000 at stake` / `4 weeks left to contact EDD`.

**VerifiedFactsStrip (new, white band)** — kicker `Verified facts`; H2
`Deadlines and dollar figures are checked by people, never generated.`
Right of heading: label `Live states` with chips `CA` (filled) `NY` `NJ` `WA`.
Three columns: `A verification date on every rule` / `Every state rule in Offboard shows when a person last checked it: "California rules verified June 2026."` ·
`Deepest coverage in California` / `Including 4,000+ state-approved training programs, with verified official links for every state.` ·
`Paid partners are disclosed` / `If a partner pays us, the recommendation says so, right where it appears.`

**PricingTeaser (replace body)** — kicker `Pricing`; H2
`Start free. Upgrade when you need more support.`; link `Compare all pricing details` → `/pricing`. Three cards:
1. `Free` — `$0 forever` — `See your plan, your runway, and your benefit deadlines. Then build your first Job Packet.` — feature line: `Transition plan & benefit sheets · Runway calculator · First Job Packet free · Application tracking · 3 LUMO messages a day`
2. `Offboard Pro` — `$20/month` — `For an active transition that needs more room: research, tailoring, preparation, and paperwork review.` — feature line: `Unlimited LUMO · More Job Packets and tailoring · Deeper application and interview support`
3. `Sponsored` — badge `May be covered` — `Outplacement, modernized. Your former employer, school, or workforce organization may cover your access.` — feature line: `Full benefit delivered to you · Your activity stays private · Sponsors see aggregate reporting only`

**CommunityStrip (new)** — kicker `Community`; H2
`Job searching is hard enough without doing it alone.`; body `Practical job-market intelligence, people navigating the same uncertainty, and a real person when you feel stuck.`
Three rows: `The Offboard Newsletter` / `Weekly job-market analysis and honest takes on tech hiring. 5,000+ subscribers.` / link `Subscribe free` ·
`Slack community` / `Job seekers sharing leads, asking questions, and keeping each other accountable.` / link `Join the Slack` ·
`Meet with a human` / `Stuck on your search? Share where you are and our team reaches out directly. Free.` / link → `HUMAN_SUPPORT_URL`.
Newsletter/Slack hrefs: use `https://offboard.co/newsletter` and
`https://offboard.co/community` unless the operator supplies canonical URLs
(surface this in the PR description).

**FinalCta (edit)** — H2 `Find out first.`; body
`Bring your situation. In a few minutes you will see how long your money lasts, which deadlines are coming, and what may be waiting for you. Then a clear plan for what to do about it.`
Primary CTA label `Build my free transition plan`. Keep the secondary
`Talk to a person` link and layout.

## Commands you will need

| Purpose   | Command          | Expected on success |
|-----------|------------------|---------------------|
| Tests     | `npm test`       | all pass            |
| Lint      | `npm run lint`   | exit 0              |
| Build     | `npm run build`  | exit 0              |
| E2E       | `npm run e2e`    | all pass (builds + serves automatically per `playwright.config.ts`) |

## Scope

**In scope**:
- `src/components/marketing/homepage/MarketingHome.tsx`
- `src/components/marketing/homepage/MarketingSite.tsx` (HomeHero, HowItWorksOverview, PricingTeaser, FinalCta edits + new section components)
- `src/components/marketing/homepage/MarketingHomepage.css` (styles for new sections)
- `src/app/page.tsx` (metadata `description` only, if you update it to match the new subhead)
- `src/components/marketing/homepage/MarketingHome.test.tsx`
- `e2e/homepage.spec.ts`
- `plans/README.md` (status row)

**Out of scope** (do NOT touch):
- `MarketingRoutePages.tsx` and any other route — plans 003–005 own them.
  The other five routes must keep building and passing tests untouched.
- The header/nav (`NAV_LINKS`) and footer — later plans change navigation.
- `PrivacySummary`, `HumanSupportSection`, `StartingPlan`, `FragmentedSection`,
  `PersonalizedSection`, `RunwaySection`, `BenefitsSection` component
  definitions — remove them from the homepage composition only.
- Fonts, tokens, and existing section CSS beyond additive new classes.

## Git workflow

- Branch from `main` (after 001 merges): `claude/002-homepage-substance-port`
- Commit per step; short imperative summaries (match `git log` style).
- Do NOT push or open a PR unless the operator instructed it.

## Steps

1. **Edit `HomeHero` copy** per spec. Verify: `npm test` fails only on
   assertions you have not yet updated (expected); `grep -n "verified by people" src/components/marketing/homepage/MarketingSite.tsx` → 1 match.
2. **Add `ProblemSection`** to `MarketingSite.tsx` + CSS (`mh-problem`,
   two-column `mh-split`, numbered ruled list like the existing
   `mh-plain-list ruled` pattern at `MarketingHomepage.css`). Verify: renders
   in `npm test` DOM (add temp assertion later in Step 9).
3. **Recaption `HowItWorksOverview`** per spec (text only). Verify:
   `grep -n "Claim what you're owed" src/components/marketing/homepage/MarketingSite.tsx` → 1 match.
4. **Add `HookBand`** + money-clock card markup/CSS (`mh-hook`, dark band:
   reuse the forest-background pattern from `mh-final-cta` styles). Static
   markup only, no state, no timers. Verify: build passes.
5. **Add `VerifiedFactsStrip`** (`mh-verified`, white band, three columns +
   state chips). Verify: build passes.
6. **Replace `PricingTeaser` body** with the three-card teaser per spec
   (server component, plain markup). Verify:
   `grep -n "\$20" src/components/marketing/homepage/MarketingSite.tsx` → 1 match.
7. **Add `CommunityStrip`** per spec. Verify: build passes.
8. **Edit `FinalCta`** default copy per spec. Verify:
   `grep -n "Find out first." src/components/marketing/homepage/MarketingSite.tsx` → 1 match.
9. **Recompose `MarketingHome.tsx`** to the target order; update
   `MarketingHome.test.tsx` homepage assertions to the new headings
   (keep the assertions that no fetch fires and that other routes' metadata
   is intact); update `e2e/homepage.spec.ts` homepage heading assertions
   (`three jobs at once` stays; replace `your transition is yours` with
   `checked by people, never generated`; add the `$12,000` hook heading).
   Verify: `npm test` → all pass.
10. **Full gates.** Verify: `npm run lint` → 0 · `npm run build` → 0 ·
    `npm run e2e` → all pass.

## Test plan

- Update the homepage unit test to assert (at minimum): H1 unchanged; the
  problem H2; the hook H2 (regex `/\$12,000/`); the verified-facts H2; the
  pricing teaser shows `$0` and `$20`; community strip renders `5,000+`;
  no `fetch` calls fire on render.
- Keep every non-homepage assertion in the file untouched.
- E2E: homepage heading set per Step 9; the existing no-backend-requests
  check must stay.

## Done criteria

- [ ] `npm test`, `npm run lint`, `npm run build`, `npm run e2e` all exit 0
- [ ] `grep -c "PrivacySummary\|HumanSupportSection" src/components/marketing/homepage/MarketingHome.tsx` → 0
- [ ] Homepage renders the 9 sections in the target order (inspect `MarketingHome.tsx`)
- [ ] No file outside the in-scope list modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

- ~~Pricing numbers / subscriber count~~ — CONFIRMED by the owner
  2026-08-21. Both figures are settled; no gate remains.
- A copy line in this spec conflicts with the em-dash/voice rules — report,
  do not rewrite on your own.

## Maintenance notes

- The money-clock card is intentionally static sample data labeled
  `Sample · CA`. If anyone makes it dynamic later, facts must come from the
  app's verified state registry, never generated text.
- The `$12,000 / week 16` example ships with its conditions attached
  (California, contact EDD before week 16). Reviewers: never let the small
  print get trimmed; it is a legal/claims-discipline requirement.
- Reviewer checklist: no em-dashes in new copy; every new claim matches this
  spec verbatim; homepage still makes zero backend requests.
