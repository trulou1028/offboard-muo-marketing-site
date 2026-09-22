# Plan 054: A Career Context product view
> **Execute with:** Fable 5.1 · high - The product view must explain context reuse without inventing product or privacy capabilities.

Status: READY FOR REVIEW in [PR #125](https://github.com/trulou1028/offboard-muo-marketing-site/pull/125)
on `codex/plan-054-career-context-demo`. The owner-requested single product view
is locally verified; awaiting the refreshed Vercel preview and owner approval.
Authored: 2026-09-18. Source baseline: marketing `origin/main` at `5dfebdc`.
Planning branch: `codex/motion-polish-plans`. Depends on plan 052's shared motion
contract/runtime. Recommended order: 052, 053, 054; 053 is not a hard dependency.

## Owner revision (2026-09-22): simplify the page

The approved audit supersedes the earlier supporting-copy direction. Put the
static card grid immediately below a compact text hero. Remove the resume
problem/photo, eight-category inventory, input descriptions, older hero image,
and sibling promo paragraphs. Keep three short benefits, compact Lumo and
integrations links, ownership copy, and a final CTA without a repeated body.
Copy remains governed by COPY.md § 10. Review remains in PR #125.

## Owner revision (2026-09-19)

Replace the interactive source-and-output composition with a single, legible
Career Context app view. Base it on the real app information architecture and
show the evolving neon yellow-green primary accent. Keep the compact `What goes
in` and `What comes out` explanations underneath. The screen is illustrative,
uses fictional information, and has no controls or simulated behavior.

The original interactive direction below is retained as planning history. This
owner revision supersedes its selector, animation, and interaction requirements.

## Original outcome and placement

Let visitors see how the same fictional career record supports different tasks:
a tailored resume, interview preparation, and comparing an opportunity against
preferences. The interaction teaches which parts of the record matter and why.

Replace the static lists within `InOutSection` on `/career-context` with an
interactive source-and-output composition, retaining its existing section heading
and the substance of the input/output explanations. Keep `HoldsSection` and its
eight-category overview, the hero, human photograph, ownership section, sibling
links, and final CTA. Do not introduce a second giant record or repeat every
category inside the example. Update `docs/site-architecture.md` if the final
section role changes; section order stays the same.

No homepage expansion, real uploads, live assistant connection, account access,
user data, new scoring system, synchronization claims, or privacy-policy rewrite.
This demonstration is deterministic and local to the marketing page.

## Recommended implementation models

Verified 2026-09-18:

- **Codex: GPT-6 Astra (`gpt-6-astra`), high**, supported by this task's local host
  catalog. Context-to-output consistency and keyboard interaction justify the
  stronger model; reuse 052's conventions to bound cost and scope.
- **Claude Code: Claude Fable 5.1, high**, following this repository's rule for
  claims and privacy-sensitive UI. Confirmed in
  [Anthropic's catalog](https://platform.claude.com/docs/en/models/overview);
  account-specific Claude Code access must be checked by the executor.
- Escalate Codex to xhigh only if source evidence or interaction races resist a
  focused diagnosis. Recommendations do not authorize implementation or model changes.

## Baseline and evidence

`MarketingCareerContext.tsx` currently contains `HOLDS` (eight categories),
`IMPORT_CHIPS`, `GOES_IN`, `COMES_OUT`, and `OWNERSHIP`. `HoldsSection` is a static
record; `InOutSection` renders two static lists; the hero is a raster composition.
Animate real markup in the new example, not imaginary sub-elements of that image.

Read `COPY.md` section 10, relevant facts/privacy ledger entries, `DESIGN.md`,
`docs/site-architecture.md`, and all shared motion and verification requirements
in plan 052. Read installed Next client/server guidance before code changes.

At execution, fetch `lumo-plan-builder` and inspect its `origin/main` for the
actual Career Context structure and the tools consuming it. Record commit/path
citations for each proposed output. Do not rely on a stale local app checkout or
infer that every input automatically syncs. Marketing copy already shipped here
remains governed by `COPY.md`; flag contradictory new evidence instead of silently
changing privacy or product promises.

## Proposed example and content contract

Use the same fictional Alex Morgan profile as plan 053 if that fixture has landed;
otherwise define it here without waiting for 053. Share only plain fixture data
if both examples need it, not a complicated generic demo component.

Example source record, all clearly fictional:

- Experience: led customer onboarding and coordinated support handoffs.
- Accomplishment: reduced average onboarding time from 14 to 10 days.
- Interview story: resolved a stalled rollout through cross-team coordination.
- Preference: remote work with predictable collaboration hours.
- Goal: move into customer success work with more ownership of adoption.

Draft permanent label: `Fictional example. Explore how the same context can inform different tasks.`
All fixture text, outputs, explanations, controls, and accessible labels must
enter `COPY.md` in the implementation PR. The figures above describe an invented
person's example, not an Offboard performance result.

| Visitor selects | Relevant source highlighted | Adjacent illustrative output |
| --- | --- | --- |
| Tailored resume | Experience + accomplishment | A concise resume bullet that reorganizes those facts for the example role, with no new achievement. |
| Interview preparation | Interview story + experience | One suggested practice question and a short outline based on the recorded story. |
| Compare an opportunity | Preference + goal | A brief comparison to an explicitly fictional job requirement, showing one alignment and one unresolved question. |

Final output shapes must match verified app capabilities. Do not present the
highlights as the model's exact reasoning trace or a shipped source-citation
feature unless the app supports that. Label them as an explanation of this example.
No numerical match score, guaranteed recommendation, or implied external sharing.

Preserve the useful `GOES_IN` descriptions as a compact supporting explanation;
retain all four existing output categories in explanatory text, even though only
three are interactive scenarios. Avoid making Application Packets disappear from
the page just because the adjacent demo is covered in plan 053.

## Interaction and visual design

- Initial server-rendered state shows the first example with its relevant source
  and output. All essential explanations remain available without JS. Enhance
  controls only once usable; no blank demo shell or delayed primary content.
- Use a labeled group of three native selection buttons with `aria-pressed` and
  `aria-controls`. All are keyboard reachable in normal Tab order; no incomplete
  ARIA tabs implementation. Focus stays on the chosen button.
- On selection, change source emphasis and output together. Use text/icon cues
  as well as color, a restrained indicator move, and a 180-240ms output crossfade.
  Latest selection wins during rapid input; no queued animation backlog.
- Keep unselected source facts readable. The point is reuse of one consistent
  record, so do not replace the profile with a new person for each task.
- No autoplay, simulated typing, fake thinking delay, cursor choreography, or
  animated data transfer to third-party logos. Reduced motion switches instantly.
- Announce only a concise selected-example status if needed; do not read the full
  output automatically or move focus into it.
- Desktop: one source card beside one output, with selectors above. Mobile:
  selectors, compact relevant-source summary, then output; remaining source facts
  remain accessible in a native disclosure. Do not force users to scroll past a
  full eight-row record on every selection. No sideways page overflow at 390px.
- Use Civic Modern tokens and the existing typography hierarchy. Keep lime within
  its permitted action/AI roles, not as a generic decorative selection background.

## Implementation sequence after authorization

1. Refresh upstream evidence and current page screenshots. Confirm the three
   output shapes, and adapt fixture wording to verified behavior.
2. Put sample copy, labels, and source-to-output mapping into `COPY.md`. Mark the
   example permanently and avoid claims about exact AI reasoning or permissions.
3. Build a narrow `CareerContextExample` client component with static fixture
   data and immediate deterministic state changes. Reuse 052's motion foundation;
   keep the rest of `MarketingCareerContext.tsx` server-rendered.
4. Integrate into `InOutSection`, preserving its message and existing input/output
   coverage. Adjust scoped CSS and any required tokens/documentation.
5. Add meaningful tests for every source/output mapping, unsupported-fact absence,
   rapid switching, stable focus, reduced motion, static fallback, and copy drift.
   Update existing copy regressions and add a motion-enabled browser case.
6. Run the full shared verification checklist and update `plans/README.md` with
   branch and implementation review state.

Expected files: `MarketingCareerContext.tsx`, a new example component and fixture
file under the marketing tree, `MarketingHomepage.css`, `COPY.md`, relevant unit
and browser tests, and design/architecture docs only as their contracts change.

## Acceptance and verification

- All three scenarios use the same record. Every output fact can be traced to
  fixture evidence; the unresolved comparison question stays visibly unresolved.
- Visitors can understand both the benefit and fictional nature without
  interacting. Essential record descriptions and the ownership section remain.
- Verify keyboard, touch, rapid alternating selection, hydration, route navigation,
  dynamic reduced-motion changes, no-JS, and console/page errors. Output remains
  usable if animation is disabled or interrupted.
- Inspect 1440, 900, and 390px and 200% zoom with the repo's own browser harness.
  Default reduced-motion screenshots are insufficient: test a real intermediate
  transition and its completion under `no-preference` too.
- Meet 052's route JS budget and avoid hydration layout shift, text scaling,
  network requests on selection, and motion running while idle/offscreen.
- Run all commands and CI gates in plan 052, including tests, both linters,
  typecheck, build, browser suite, and the separately reported CMS contract job.
  Review intended screenshot diffs before changing any baseline.

## Review, STOP conditions, and rollback

Push an implementation PR and resolve its real preview with
`node scripts/preview-url.mjs`. Give Louie `/career-context` with three checks:
switch the three examples, inspect how the source supports each output, and try
the compact phone composition. Merge only after his explicit go.

STOP shipping if an output implies an unsupported capability or privacy boundary,
fictional data could pass for real customer data, essential static content is
lost, accessibility/performance checks fail, required verification is pending,
or owner preview review has not happened. Resolve routine layout/copy details
within scope; approval of these plans is not authorization to implement.

Rollback by reverting this route's implementation PR; preserve shared motion and
fixtures still consumed by other pages.

## Implementation record (2026-09-18)

- Refreshed `lumo-plan-builder` `origin/main` at `b63297c523f75b2349232f636feff5c00a2dbb7d`.
  The example shapes are grounded in `src/pages/Context.tsx`,
  `src/components/settings/ContextPanel.tsx`,
  `src/components/profile/PreferencesTab.tsx`,
  `supabase/functions/tailor-resume-v2/schemas.ts`,
  `supabase/functions/generate-interview-briefing/schema.ts`, and
  `supabase/functions/_shared/roleMatch.ts`. The UI remains explicitly
  illustrative and does not claim an exact reasoning trace.
- Added the narrow `CareerContextExample` client boundary. The initial resume
  example is server rendered; usable controls replace the static selector labels
  after hydration. All three scenarios reuse one fictional record, retain button
  focus, and update source emphasis with the output.
- Added a 200ms output transition through the shared `motion/mini` foundation.
  A live reduced-motion preference change cancels subsequent animation. The
  route-specific client chunk is 7,308 bytes raw and 2,432 bytes gzipped.
- Preserved the three input explanations and all four output categories beneath
  the example. At phone width, only the relevant source details remain open and
  the complete record moves into a native disclosure.
- Recorded every new string and the interaction contract in `COPY.md`. No route,
  section-order, privacy, or architecture contract changed.
- Final local verification: `npm run lint`, `npm run lint:css`,
  `npm run typecheck`, `npm test` (212 tests), `npm run build`, and
  `npm run e2e` (138 browser tests) all pass. The focused browser coverage also
  proves no-JavaScript content, latest-selection behavior, focus retention,
  390px overflow, motion under `no-preference`, and a dynamic switch to reduced
  motion. The three reviewed `/career-context` visual baselines were updated.
  The Docker-backed `cms-contract` job remains CI-authoritative and is unrelated
  to this route-only change.

## Owner revision implementation record (2026-09-19)

- Removed the three-state interactive example, its route client boundary,
  route-specific motion, and interaction tests.
- Replaced it with one Career Context product view based on the current app
  structure and restyled with the requested neon yellow-green primary accent.
  The desktop view uses the full landscape composition and mobile reflows the
  same score and About You cards into a legible narrow-screen composition.
- Preserved the existing `What goes in` and `What comes out` explanations and
  recorded the revised introduction, caption, and image description in `COPY.md`.
- Final local verification: `npm run lint`, `npm run lint:css`,
  `npm run typecheck`, `npm test` (209 tests), `npm run build`, and
  `npm run e2e` (135 browser tests) pass. Desktop, tablet, and mobile page
  baselines were reviewed and updated for this replacement.
- Owner refinement: replaced the literal app screenshot with a simplified
  editorial abstraction of one central Career Context connected to experience,
  goals, applications, and interviews. The neon dark theme remains, with
  separate landscape and portrait compositions.
- Owner refinement 2026-09-22: returned to the actual Career Context card grid
  and removed the page title, description, and context score from the image.
  Both `About You` and `Connected Sources` now appear completely in the same
  frame, with a compact dedicated mobile arrangement.
