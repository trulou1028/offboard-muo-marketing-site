# Plan 041 — /layoff-support: the first week, the paperwork, and the benefits

> **Execute with:** Fable 5.1 · high effort — every new sentence on this page is a benefits or legal claim; each number needs a verified-facts ledger row, and one wrong judgment ships a false promise.

**Status: BUILT 2026-09-04, awaiting owner review.** Written 2026-09-04 from a design critique
the owner requested, reviewed at commit `5d7e110` (`main`) at 1440 and 390
wide through the repo's own Playwright harness, and from an inventory of
`lumo-plan-builder` `origin/main`. The owner approved the direction the
same day.

## Why

The page is the strategic pillar (plan 030: without it the product pages
drift toward an AI job-search tool). Today it reads as a careful FAQ with
one strong moment, the $12,000 clock. It gives one sentence each to the
stabilization topics and then its sixth question card is the job search.
The app ships far more non-search substance than the page shows.

What the app ships on `origin/main` that the page does not say:

| App feature (path on origin/main) | On the page today |
| --- | --- |
| Situation intake: situation, state, last day, benefits status, severance; branches for "just laid off", "out a while", "at risk" (`src/lib/situationIntake.ts`) | Implied by the hero. Never shown. |
| Stage 1 "Protect the first week": key dates, COBRA options, secure accounts and access, save layoff documents, request personnel file, employer email template (`src/components/layoff-plan/layoffPlanItems.ts`, `src/journey/stages.ts`) | Absent. The homepage Your Path card shows it; this page does not. |
| Stage 2 "Steady yourself": file early, weekly certification habit, runway, recheck what you are owed (`src/journey/journeyItems.ts`) | Two of six cards, one sentence each. |
| Paperwork Review: AI read of severance agreements, NDAs, PIPs; deadlines, money, red flags; glossary; "AI guidance, not legal advice" (`src/config/legalReviewCopy.ts`, route `/stabilize/legal-review`) | Absent. The most differentiated non-search feature. |
| Health coverage facts: 60-day COBRA election, retroactive, compare against marketplace subsidies (`layoffPlanItems.ts` item `cobra`) | "The windows you are inside." Abstract on a concrete topic reads as evasive. |
| Runway calculator with exhaustion date and risk bands (`src/lib/financial/runwayEngine.ts`, `RunwayCalculator.tsx`) | One sentence, no visual. |
| "Out a while" branch: "Funded training doesn't expire with your benefits." | Absent. The page speaks only to week one. |
| Benefits registry with a "last verified" stamp per rule | Covered by `VerifiedFactsStrip`. Keep. |

Two smaller defects: the hero says "Offboard helps you take them in
order" while the app's path says "Do them in any order"; and "How it
helps" restates the hero in four tiles.

## Section plan (composition named per DESIGN.md R4)

| # | Section | Band | Composition | Change |
| --- | --- | --- | --- | --- |
| 1 | Hero | deep | existing PageHero | Body: "in order" → "in the order that matters to you." |
| 2 | **Protect the first week** (new) | sand | Split: copy left, composition right | Base card: the app's stage 1 step list, real strings. Satellite: the runway card ("Runway · sample", months figure, exhaustion month). Under R2 this is a composition, never a bordered transcript. |
| 3 | **Money and paperwork** (new) | paper | Split: copy left, composition right | Paperwork Review. Base card: a document analysis summary (deadline, dollar line, one flag). Satellite: a glossary chip ("Revocation period · 7 days"). Disclaimer `<small>`: "AI guidance, not legal advice." |
| 4 | **Benefits** (rework of cards 2, 4, 5) | white | Ruled (Pattern C) | Three rows: file and certify weekly; the training extension window; funded training after benefits end. Remove the search card and the "first" card; both are now covered. |
| 5 | One example: the $12,000 clock | forest | existing HookBand | Unchanged. Ledger row already lists this page. |
| 6 | **Been out a while** (new, short) | mist | Stacked intro with a section link | "Start with what you are still owed." Section link to the sign-up URL, not to `/workforce` (that page is B2G). Placed after the hook, not before it, so the week-16 example is not undercut by "you may be past it" immediately beforehand. |
| 7 | Verified facts strip | white | existing | Unchanged. |
| 8 | Straight answers | forest | existing | **Unchanged. Compliance-reviewed wording; do not touch.** |
| 9 | And then the job | mist | existing | Unchanged; this band is where the search lives now. |
| 10 | Final CTA | deep | existing | Unchanged. |

Band rhythm check: deep, sand, paper, white, forest, mist, white, forest,
mist, deep. No adjacent repeats.

Section shape check (R4): sections 2 and 3 are both split-with-composition,
which is the maximum two in a row, and they mirror each other (copy left then
copy right) so the pair does not read as one repeated unit. Section 4 breaks
the run with a ruled list.

"How it helps" is deleted; its four claims are absorbed by sections 2 to 4.
"Six questions" is deleted as a section; its `.mh-qblock` styling stays in
the stylesheet because `/career-context` uses it.

## Copy (draft; lands in COPY.md § 13 (Layoff & Benefits) before or with the build)

Every string below is a draft for owner sign-off. Strings marked *(app)*
are verbatim from `lumo-plan-builder` `origin/main` and may ship as is.

**Section 2 · Protect the first week**
- Kicker: `The first week`
- H2: `Before the search, protect yourself and your paperwork.`
- Body: `The first days after a layoff decide more than people expect. Work logins disappear, notices have short windows, and the documents you will need later are easiest to get now. Offboard starts here.`
- Composition base, heading `Protect the first week` *(app stage name)*, steps *(app)*: `Write down your key dates` · `Understand your COBRA / health insurance options` · `Secure your accounts and access` · `Save all layoff documents in one place` · `Request your personnel file`
- Satellite: a labelled sample runway chip. Sample values only, labelled `Sample` exactly as the money-clock card on this page already is.

**Section 3 · Money and paperwork**
- Kicker: `Paperwork Review`
- H2: `Read the agreement before you sign it.`
- Body: `Severance agreements, offers, PIPs, NDAs: a plain-English breakdown of deadlines, money, and red flags before you sign.` *(app, lightly cut)*
- `<small>`: `AI guidance, not legal advice. Offboard does not replace qualified legal, tax, financial, healthcare, or benefits guidance.`
- Composition base: `Severance agreement · Reviewed` · `Signing deadline · On your calendar` · `Release of claims · Explained in plain English` · `Health coverage · COBRA notice enclosed`
- Satellite chip: `Plain English · every clause`

**Section 4 · Benefits (three ruled rows)**
1. `File early, then keep certifying.` — `Payments do not start the day you are laid off, and a missed weekly certification pauses them. It takes far longer to fix than to prevent.`
2. `Keep health coverage without a gap.` — `COBRA is not your only option, and the decision has a deadline. Offboard puts that date in front of you with the alternatives beside it.`
3. `Training money runs on its own clock.` — `State-approved programs may be paid for while you train, and that clock is not your benefits clock. Every program links to the official source that decides it.`

**Section 8 · Been out a while**
- Kicker: `Not week one?`
- H2: `Been out a while? Start with what you are still owed.`
- Body: `Benefits may be running low or gone. Funded training does not expire with them. Tell Offboard where you are and it starts from there.` *(first sentence app)*
- Link: `Tell Offboard what happened` → sign-up URL (the shared `SIGN_UP_URL`).

**Hero body** (one word change): `...Offboard helps you take them in the order that matters to you.`

## Claim discipline (STOP conditions)

- **Owner decision, 2026-09-04: no new numbers. The marketing site does not
  get this granular.** The five figures this plan originally proposed (60-day
  COBRA election, retroactive coverage, "2 to 3 weeks" to first payment,
  21-day consideration, 7-day revocation) are **cut**, not deferred. Every
  sentence that carried one is qualitative instead. No new ledger rows are
  needed and none were added.

  This matches a call the owner already made once. `MarketingSite.tsx` carries
  the note above `PLAN_PREVIEW_STEPS`: the same two figures were dropped from
  the homepage plan card on 2026-08-26 because the site "does not mint a new
  claim to decorate a screenshot." The rule now covers this page too.

  The only figures on the page remain the ones that already have ledger rows:
  the CalJOBS `~$12,000` / `week 16` hook and the `VerifiedFactsStrip`.
- Never-say list holds: no "platform", "solutions", "modules", "workspace", "outplacement", "agents".
- Never promise funding, eligibility, or amounts. Recreate plan 030's temporary spec: the page must not contain `outplacement`, `platform`, `guarantee`, `you qualify`, `you are eligible`, `we will get you`, or an em dash, and must contain `We never promise funding`, `not a government agency`, and `AI guidance, not legal advice`.
- "Straight answers" band wording is compliance-reviewed. Do not reword.
- Sample composition values (7 months, day 21) carry `Sample` labels, as the money clock does.

## Build notes

- Compositions use `.mh-comp`, `.mh-comp-base`, `.mh-comp-satellite`
  (see `RecordComposition` in `MarketingHome.tsx`). New per-card classes
  extend the `--mh-*` token set; no hardcoded colors.
- Ruled rows: reuse `.mh-plain-list.ruled` or Pattern C markup already in
  the stylesheet. R1 does not apply to single-column lists.
- Mobile: each composition stacks base then satellite. Page target under
  8,000px at 390 (today 7,440; the page gets longer, but not by more than
  one screen).
- Update `CopyDrift.test.tsx` (the page is in the absence list and the
  CalJOBS test renders it), `MarketingHome.test.tsx` if it asserts this
  page, and `e2e/visual.spec.ts` baselines for `/layoff-support` only,
  re-captured deliberately with the diff described in the PR.

## Definition of done

`npm test`, `npm run lint`, `npm run lint:css`, `npm run build`,
`npm run e2e` green. Browser check at 1440 and 390 with zero console
errors. Preview URL via `node scripts/preview-url.mjs` in the handover, with
the three new sections named as the things to look at. Owner signs off on
copy before merge. Update the row in `plans/README.md`.

## Execution record (2026-09-04)

Built as planned, with three deviations worth recording.

1. **No new numbers, and no new ledger rows.** The owner's call arrived
   before the build, so the five figures were cut rather than verified. See
   the claim-discipline section above. `CopyDrift.test.tsx` now enforces it:
   `/layoff-support` must not say `60 days`, `21 days`, `45 days`, `7 days`,
   `14 days`, or `2-3 weeks`.
2. **Plan 030's throwaway spec is now permanent**, not re-created and
   deleted. The plan told a future executor to write it again from a
   paragraph; it is a `describe` block in `CopyDrift.test.tsx` instead, and
   it also asserts the job search stayed in its own band.
3. **Satellite geometry is load-bearing and was got wrong once.** Both
   compositions were first built with the satellite anchored so it covered
   the card's last row. The stylesheet now carries the arithmetic in a
   comment: overlap = satellite height - the composition's bottom padding,
   and DESIGN.md R2 wants 12 to 32px. Measured after the fix: 21px on the
   path card, 18px on the review card, clearing the last row by 14px and
   11px. Anyone changing either card's bottom padding must re-check this.

**Verification run.** Every command in `.github/workflows/ci.yml`'s
`test-and-build` and `e2e` jobs: `npm run lint`, `npm run lint:css`,
`npm run typecheck`, `npm test` (174), `npm run build`, `npm run e2e` (105).
All green. The `cms-contract` job was **not** run locally - it needs Docker
and a Supabase stack, and this change touches no migration, no CMS content,
and no database path.

Browser check at 1440 and 390 through the repo's own Playwright: zero
console errors, `scrollWidth === innerWidth` at both widths, and the band
order asserted from computed styles - deep, sand, paper, white, forest,
mist, white, forest, mist, deep, with no two adjacent bands sharing a
background.

**Three visual baselines were re-captured**, deliberately:
`layoff-support-desktop`, `-tablet`, and `-mobile`. They are the only
snapshots that moved; the other 102 e2e assertions passed untouched before
the re-capture, which is the evidence that the new CSS is scoped to this
page. The page is longer: desktop 4,925px to 6,304px, mobile 7,440px to
9,313px. That is the cost of three new sections, two of them compositions,
and it is a deliberate trade against a page that previously said one
sentence per topic.
