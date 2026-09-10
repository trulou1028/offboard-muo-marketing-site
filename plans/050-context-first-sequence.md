# Plan 050: Context first. The site tells the app's four stages, in the app's order

> **Execute with:** Fable 5.1 · high — the step copy carries benefits and beta claims (ledger rows "Live integrations", never-promise rules), the names are a cross-repo port pinned to `lumo-plan-builder` `origin/main`, and a wrong order ships a story the app contradicts on day one.

## Status

- **Status:** PLAN WRITTEN 2026-09-10. Owner review of the copy decisions below, then execute.
- **Priority:** P1. Owner direction 2026-09-10.
- **Effort:** M. One homepage reorder, one deferred-page reorder, the copy law, three test files, visual baselines.
- **Risk:** MED. Changes the first thing the homepage says after the hero. No route, redirect, or pricing change.
- **Depends on:** nothing unmerged. PR #86 (plan 049 imagery) touches the product pages, not the homepage steps; the two can land in either order.
- **Source of truth for the names:** `lumo-plan-builder` `origin/main` at `1d3ef74c9` (2026-09-10): `src/lib/nextAction.ts` `NEXT_STAGES`, and plan 277 § "Appendix: the four steps (site and Home use the same words)". Plan 277's appendix says it directly: "the site copy in the marketing repo must match them."

## Why this plan exists (owner direction, 2026-09-10)

The owner's words, condensed. Putting "Steady the first week" first created friction people were not ready for. Browsing benefits, funded training and financial runway on day one asks for trust the app has not earned yet. In the app, the best first thing for the member and for Offboard is to build the Career Context: it gives Lumo and every recommendation more to work from. The app now sequences context first (plan 277, built as Sprint 423 / PR #645; plan 289 turns the four stages into Home navigation). The site still tells the old order, and the app's own plan says the drop-off step is "the marketing site's step 01."

What the app measured (plan 277, `user_behavior_events`, August cohort n=38): 21% opened benefits, 13% opened runway and 0 entered a number, 0 of 38 filled a money-profile field, 11% sent a Lumo message, 8% built a packet. Six of the last 15 reached a money page before ever touching Lumo. The money features need a state, a last day and severance figures to say anything specific; 25 of 38 skipped the situation question that supplies them.

## The four stages (verbatim from the app, sentence case)

| # | Name (`NEXT_STAGES[i].name`) | Tagline (`NEXT_STAGES[i].tagline`) |
|---|---|---|
| 1 | Build your Career Context | Your resume and where you are. Everything else reads from this. |
| 2 | Bring your AI | Ask LUMO here, or connect the ChatGPT or Claude you already use. |
| 3 | Run your search | Packets, tailoring, and a tracker that all read from your context. |
| 4 | Follow your path | The steps that fit your situation, in order. |

Plan 277's appendix adds the longer lines: stage 2 "reads your context and tells you what matters first, including the money and deadlines you may be owed"; stage 4 "paperwork, benefits, training, the search, the offer." And the rule that matters here: **"Steady the first week" survives as steps inside 04 and as what LUMO says first in 02, not as a step of its own.**

Two site rules override the app's spelling and hedging:

- The site writes **Lumo**, not LUMO (`COPY.md` § Language rules). Names match; casing follows the site.
- Every mention of the ChatGPT and Claude connections carries **beta** (ledger row "Live integrations", `COPY.md:245`). The app's tagline omits it; the site's step keeps it.

## Where the old sequence lives (the inventory, checked 2026-09-10)

| # | Where | What it says today | Change |
|---|---|---|---|
| 1 | `src/components/marketing/homepage/MarketingHome.tsx:137-162` `STEPS` | 01 Steady the first week · 02 Build your Career Context · 03 Connect it to the AI you use · 04 Run your search with real tools | Rewrite, see § Copy |
| 2 | `MarketingHome.tsx:166-172` `FourSteps` lead | "Handle what has a deadline, build a record of your career once, connect it to the AI you already use, and run your search from it." | Rewrite |
| 3 | `MarketingHome.tsx:368-383` `StepSteady` (sand band, `id="steady"`, kicker `Step 1 · Steady the first week`) | The "Losing your job creates more than one problem" band with the Your Path composition | Becomes stage 4, `StepPath`, `id="path"`, moves after `StepSearch` |
| 4 | `MarketingHome.tsx:222-236` `StepContext` (mist, `id="build"`, kicker `Step 2 · Build your context`) | Career Context | Becomes stage 1; kicker takes the full name `Build your Career Context` |
| 5 | `MarketingHome.tsx:271-284` `StepConnect` (forest, `id="connect"`, kicker `Step 3 · Connect it to the AI you use`) | Lumo + connect | Becomes stage 2, `Bring your AI` |
| 6 | `MarketingHome.tsx:310-336` `StepSearch` (paper, `id="run"`, kicker `Step 4 · Run your search`) | Toolkit | Becomes stage 3; copy unchanged except the number |
| 7 | `MarketingHome.tsx:462-472` `MarketingHome` render order | Hero, FourSteps, StepSteady, StepContext, StepConnect, StepSearch, Plans, Community, FinalCta | Hero, FourSteps, StepContext, StepConnect, StepSearch, StepPath, Plans, Community, FinalCta |
| 8 | `MarketingRoutePages.tsx:57-70` `MarketingHowItWorks` (deferred, live through four 301s) | Hero body lists the old order; sections HowStepFirstWeek → benefits visual → VerifiedFactsStrip → HowStepContext → LumoSection → ToolkitSection | Same reorder: HowStepContext, LumoSection, ToolkitSection, then HowStepFirstWeek with its visual and strip |
| 9 | `MarketingSite.tsx:401` `HowStepContext` kicker `Step 2 · Build your Career Context`; `:469` `HowStepFirstWeek` kicker `Step 1 · Steady the first week`; `:521` `ToolkitSection` kicker `Step 4 · Run your search`; `:579` `LumoSection` kicker `Step 3 · Connect it to the AI you use` | | Renumber 1, 4, 3, 2 and rename per § Copy |
| 10 | `COPY.md` § 1 (`:378-540`): section order line, round-5 rationale, the strip entries, the "More than a job search" block | | Rewrite the order, the strip, the kickers; record the reversal and the owner's reason |
| 11 | `COPY.md` § How It Works (`:610-661`), meta description at `:615` | "Steady the first week, build your Career Context, connect it…" | Reorder to match |
| 12 | `src/components/marketing/homepage/MarketingHome.test.tsx:77-79` (strip links) and `:219-225` (how-it-works kickers) | | Update |
| 13 | `e2e/homepage.spec.ts:48-60` (how-it-works kickers) | | Update |
| 14 | `e2e/visual.spec.ts` baselines for `/` and `/how-it-works`, desktop and mobile | | Re-capture deliberately, say so in the report |

Checked and **unchanged**: the Product dropdown already features Career Context as "Start here" (`MarketingNav.tsx:96-104`). `/layoff-support`'s "The first week" band (`MarketingLayoffSupport.tsx:66`) carries no step number and is exactly where stage 4's content belongs. `/career-context`, `/lumo`, `/job-search`, `/integrations` name no step number. The homepage plans band lists "Build your Career Context." first already. `CopyDrift.test.tsx:337` pins "Protect the first week" inside the Your Path card, which stays: it is a real stage name in the app's path. Nothing outside the homepage links to `#steady` (grep of `src`, `e2e`, `docs`, `COPY.md`, `next.config.ts`), so renaming the anchor needs no redirect; hash fragments are not routes.

## Copy (the strings to ship; `COPY.md` carries them first)

**The strip (`STEPS`).** Titles keep the strip's trailing period; bodies are the app's taglines, with the beta clause on stage 2.

1. `Build your Career Context.` — `Your resume and where you are. Everything else reads from this.` — `Build your context` → `#build`
2. `Bring your AI.` — `Ask Lumo here, or connect the ChatGPT or Claude you already use. Connections are in beta.` — `See the connection` → `#connect`
3. `Run your search.` — `Packets, tailoring, and a tracker that all read from your context.` — `See the toolkit` → `#run`
4. `Follow your path.` — `The steps that fit your situation, in order.` — `See the path` → `#path`

Lead: `Build a record of your career once, bring the AI you already use, run your search from it, and follow the steps that fit your situation.`

**Stage 1, `StepContext`.** Kicker `Step 1 · Build your Career Context`. H2, body, primary CTA `Build my Career Context` and section link unchanged. It is now the first thing the page asks for, which matches the app's first action.

**Stage 2, `StepConnect`.** Kicker `Step 2 · Bring your AI` (keeps `is-lime`: the AI accent is the one place lime is allowed). H2 `Ask anywhere. The answer is about you.` unchanged. Body: `Ask Lumo here, or connect the ChatGPT or Claude you already use. Either one reads your Career Context from the first question and tells you what matters first, including the deadlines and the money you may be owed.` Small line `ChatGPT and Claude connections are in beta.` unchanged. The "may be owed" clause is the appendix's; it hedges, it does not promise, and the executor confirms it against `COPY.md` § Language rules before shipping.

**Stage 3, `StepSearch`.** Kicker `Step 3 · Run your search`. Nothing else changes.

**Stage 4, `StepPath`** (was `StepSteady`). Kicker `Step 4 · Follow your path` (keeps `is-sand`). H2 stays `Losing your job creates more than one problem.` (decision 1 below). Body: `Unemployment benefits, health coverage, paperwork, funded training, the search, the offer. Offboard lays out the steps that fit your situation, in order, and Lumo tells you which one matters first.` Section link `See the steps after a layoff` → `/layoff-support`. Composition (the Your Path card with "Protect the first week" and the lifted "Update your LinkedIn profile" step) unchanged: it is a picture of the path, which is what the stage is. The independence note stays.

**`/how-it-works`.** Hero body: `Whether you were laid off yesterday, have been searching for months, or are still employed and reading the room: build your Career Context, bring the AI you already use, run your search from it, and follow the steps that fit your situation.` Meta description reordered the same way. Kickers: `Step 1 · Build your Career Context`, `Step 2 · Bring your AI`, `Step 3 · Run your search`, `Step 4 · Follow your path` (on `HowStepFirstWeek`; its H2 `See your money clearly, then claim what exists.` and its rows stay, since they are the step's content). The benefits visual and `VerifiedFactsStrip` move with it.

## Steps

1. **Pin the source.** Re-read `NEXT_STAGES` on `lumo-plan-builder` `origin/main`. If a name differs from the table above, STOP and report; the app wins.
2. **`COPY.md` first.** § 1: new section order (Hero → The four steps → Step 1 Career Context → Step 2 Bring your AI → Step 3 Toolkit → Step 4 Follow your path → Plans → Community → Final CTA), new band rhythm (deep, paper, mist, forest, paper, sand, paper-deep; no band repeats next to itself), the strip, the four kickers, the stage-4 body and link. Add a dated note under "Round 5": *Reversed 2026-09-10 (owner, plan 050): step one moved the money to the front and created drop-off; the app now sequences context first and the site matches. The H1 is still earned: stage 4 carries the benefits and deadlines, and stage 2 says Lumo raises them first.* § How It Works: same. Changelog row.
3. **Homepage.** Rewrite `STEPS` and the lead. Rename `StepSteady` → `StepPath`, `id="steady"` → `id="path"`, kicker, body, link. Renumber the other three kickers. Reorder the render. Update the header comments on each section (they explain the old order and the plan-040 reason; rewrite, do not leave them contradicting the code). CSS class names (`mh-morethan`, `mh-ctx`, `mh-connect`, `mh-kit`) do not change: `DeadSelectors.test.ts` and the stylesheet stay untouched.
4. **`/how-it-works`.** Reorder `MarketingHowItWorks`, rewrite the hero body and meta description, renumber the four kickers in `MarketingSite.tsx`, fix the header comments.
5. **Tests.** `MarketingHome.test.tsx`: strip links gain `["See the path", "#path"]` and lose nothing else; the how-it-works kicker list becomes the new four in the new order. `e2e/homepage.spec.ts`: same list. Add one assertion that the homepage's four `mh-steps` items read Career Context, Bring your AI, Run your search, Follow your path in that order, so the strip cannot drift from the app again without a red test.
6. **Verify.** `npm test`, `npm run lint`, `npm run lint:css`, `npm run build`, `npm run e2e` (anchors changed). `npm run test:visual`: expect `/` and `/how-it-works` to move at both widths; inspect each diff, confirm it is only the reorder, re-capture, and say so. Read `.github/workflows/ci.yml` and confirm every command ran.
7. **Hand over.** Push, PR, `node scripts/preview-url.mjs`. What to look at: `/` after the hero, the strip reads 1 Career Context, 2 Bring your AI, 3 Run your search, 4 Follow your path; the sand "more than one problem" band now sits between the toolkit and the plans; the lime kicker on the AI band says "Bring your AI". Update the row in `plans/README.md`.

## Decisions for the owner

1. **Stage 4 headline.** Keep `Losing your job creates more than one problem.` (recommended: the eyebrow carries the plain label "Follow your path", and this line is what earns the "unemployment office" H1, R5a). Alternative: the app's flat `The steps that fit your situation.`
2. **Homepage meta description.** Leave it (recommended: it lists what Offboard covers, not an order, and it is SEO-load-bearing). Alternative: reorder it to lead with Career Context.

Assumed without asking: "Lumo" casing, the beta clause, the strip's trailing periods, `is-lime` staying on the AI kicker.

## STOP conditions

- `NEXT_STAGES` names on `origin/main` differ from the table.
- Any step string promises funding, eligibility, interviews or placement, or drops the beta clause.
- A visual diff shows anything beyond the reorder and the copy (a band colour, a composition, the header).
- `CopyDrift.test.tsx` red for a string this plan did not name.

## Done criteria

- Homepage and `/how-it-works` tell the four stages in the app's order with the app's names.
- `COPY.md` § 1 and § How It Works match the DOM; drift test green.
- Every CI command green; visual baselines re-captured with the diff described in the report.
- Preview URL handed over; merge on the owner's go.
