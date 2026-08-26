# Plan 018: Refine the homepage hierarchy, pacing, proof, and interaction polish

> **Executor instructions**: Follow this plan in phases. Run the required
> verification after every phase and honor the review and STOP conditions.
> Update the Plan 018 row in `plans/README.md` when the review state changes.
>
> **Drift check**: Before each phase, fetch `origin`, compare the current
> branch with `origin/main`, and re-read `DESIGN.md`, `COPY.md`,
> `docs/site-architecture.md`, and the touched homepage components.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED (homepage-wide visual changes protected by the visual suite and preview gates)
- **Depends on**: plans/012-styling-verification-baseline.md, plans/013-container-unification-1200.md, plans/014-design-token-consolidation.md
- **Category**: design / conversion / accessibility
- **Planned at**: commit `c551bf6`, 2026-08-25
- **Branch**: `codex/018-homepage-refinement`
- **Current phase**: COMPLETE - all four phases owner-approved and merged to `main` 2026-08-26
- **Merges**: phase 1 PR #31 (`d0227c5`), phase 2 PR #33, phase 3 PR #34, phase 4 PR #36 (`859ec5e`)
- **Phase 1 merge**: PR #31, merge commit `d0227c5`, 2026-08-25
- **Phase 2 branch**: `claude/018-phase2-typography`
- **Phase 3 branch**: `claude/018-phase3-teasers-proof` (stacked on phase 2)
- **Phase 4 branch**: `claude/018-phase4-cta-polish` (stacked on phase 3)

## Objective

Refine the shipped homepage without changing its identity, approved copy, or
section order. The page should read as an orientation experience rather than
a compressed version of the whole site, while preserving its strongest
elements: the dark-green hero, documentary imagery, Fraunces and Aspekta type
pairing, lime accent, editorial ledgers, and verified-facts discipline.

## Baseline

Measured against the current production homepage and the matching local
checkout at `c551bf6`:

- Desktop full-page height at 1440px: 9,191px.
- Mobile full-page height at 390px: 13,973px.
- Mobile hero height: 1,400px.
- Connected-plan proof begins at 4,624px desktop and 6,444px mobile.
- Ten of eleven homepage h2 elements use the same 40px / 46px mobile treatment.
- The page has no horizontal overflow at 390px and no console errors.

Baseline verification:

- `npm test`: 96 passed.
- `npm run lint`: passed.
- `npm run lint:css`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed, 25 static pages generated.
- `npm run e2e`: 50 passed on the first run with two unrelated
  `networkidle` timeouts on `/how-it-works`; both timed-out cases passed on
  the focused rerun.

## Guardrails

- Preserve every homepage section and its order from
  `docs/site-architecture.md`.
- Keep user-facing strings byte-identical by default.
- If copy must change, update `COPY.md`, drift tests, and regression tests in
  the same commit.
- Do not add a new color, font, radius, shadow, or spacing value without
  extending the documented design system first.
- Violet remains reserved for LUMO and AI.
- Do not invent product UI. Source new product substance from
  `lumo-plan-builder` `origin/main`.
- Use existing imagery first. Never run `npm run imagery` without owner
  approval.
- Keep one primary signup CTA per view.
- Do not merge any visible phase before the owner approves its Vercel preview.

## Phase 1: Homepage pacing and mobile hero

1. Group the existing homepage sequence into four visual acts without
   changing section order or copy: orientation, proof, ways to continue, and
   final action.
2. Use homepage-scoped spacing, surface, and divider treatments to make
   supporting sections more compact while retaining the shared route system.
3. Recompose the mobile hero so the primary CTA and at least part of the human
   image appear within the first 844px.
4. Keep the disclaimer inside the hero, but allow it to follow the visual on
   mobile if needed.
5. Preserve the current desktop hero composition unless shared markup requires
   a demonstrably neutral adjustment.

### Phase 1 review gate

Push the branch, open a PR, resolve the real Vercel preview URL with
`node scripts/preview-url.mjs`, and stop for owner review before Phase 2.

### Phase 1 implementation record

- Preserved the desktop hero composition while moving the existing trust note
  into its own grid row.
- On mobile and tablet, placed the documentary image before the trust note and
  reduced the mobile image height from 490px to 420px.
- Grouped the orientation sequence by removing redundant dividers between the
  problem and identity sections.
- Distinguished the proof sequence with the existing soft-paper surface and
  tightened the verified-facts section.
- Tightened the pricing, community, privacy, and other supporting sections with
  existing spacing tokens only.
- Desktop page height changed from 9,191px to 8,910px.
- Mobile page height changed from 13,973px to 13,704px.
- The mobile hero image now begins at 730px, inside the first 844px view; the
  trust note follows at 1,172px.
- Desktop, tablet, and mobile inspection found no horizontal overflow and no
  console errors.
- The three homepage visual baselines were reviewed and deliberately updated.
- Verification passed: 96 unit tests, lint, CSS lint, typecheck, 25-page build,
  38 visual checks, and all 52 end-to-end checks.

## Phase 2: Typography and hierarchy

1. Classify homepage sections as narrative anchors or supporting sections.
2. Reserve the largest Fraunces h2 treatment for narrative anchors.
3. Apply a documented smaller section-heading treatment to verified facts,
   pricing, community, and privacy.
4. Check heading wraps at 390, 560, 900, 1200, and 1440px.

### Phase 2 implementation record

**Classification.** Narrative anchors keep the full `--mh-h2`: problem,
identity contrast, three jobs, the $12,000 hook, the connected plan, and the
final CTA. Supporting sections move to `--mh-h2-sm`: verified facts, pricing
teaser, community, and privacy. The employer strip already sat a step below
the supporting tier on its own `clamp(26px, 2.4vw, 34px)` and was left alone.

**What changed.** One grouped rule scoped to `.mh-page-home` sizes the
pricing teaser, community, and privacy headings; verified facts was already
on `--mh-h2-sm`. The scoping follows the phase 1 convention, and three of the
four sections are homepage-only components in any case.

**The mobile tier was the real defect.** At `≤560px` the stylesheet flattened
`--mh-h2` to `40px` while `--mh-h2-sm`'s clamp floor stayed at `38px`, and a
separate override forced `.mh-verified-heading h2` back to `40px`. That is
why the baseline measured ten of eleven homepage h2 elements at an identical
40px / 46px. Phase 2 gives `--mh-h2-sm` its own `32px` small-phone step and
drops the verified-facts override, so the two tiers stay legible on a phone.

**Measured heading sizes after the change** (anchor / supporting):

| Width | Anchor | Supporting | Employer strip |
| --- | --- | --- | --- |
| 390px | 40px | 32px | 26px |
| 560px | 40px | 32px | 26px |
| 900px | 46px | 38px | 26px |
| 1200px | 48px | 38.4px | 28.8px |
| 1440px | 57.6px | 46.08px | 34px |

**One layout follow-on, caused by the size change.** The privacy band's head
is a kicker-left / heading-right pair whose `1.4fr` heading column was sized
around the full `--mh-h2`. At the supporting size the heading stopped filling
that column and stranded a visible gap after "yours." at 1440px, so the
homepage now sizes that column to its own content. The first attempt at this
regressed phones — `.mh-page-home ...` outranks the plain `≤900px`
single-column reset — so the reset is restated at the homepage's specificity
inside the `≤900px` block.

**Verification.** `npm test` 96 passed, `npm run lint`, `npm run lint:css`,
`npm run typecheck`, `npm run build` (25 static pages), `npm run e2e` 52
passed. Heading metrics and wraps were measured at 390, 560, 900, 1200, and
1440px with a temporary Playwright spec, which was then deleted. No console
errors and no horizontal overflow at 390px or 1440px. Desktop page height
8,910px to 8,833px; mobile 13,704px to 13,474px.

**Baselines deliberately updated: four.** The three homepage screenshots, and
`how-it-works-mobile`. The `/how-it-works` move is intentional and is the
only cross-route effect: that page shares the verified-facts strip, which
sits on `--mh-h2-sm` at every other width, so dropping the `≤560px` override
makes its phone rendering agree with its own desktop rendering. Verified by
direct measurement that exactly one heading on that page changed (40px to
32px) and the other nine were untouched. No other route's baseline moved.

**No copy changed**, so `COPY.md` and the drift tests are untouched.

## Phase 3: Teaser patterns and product proof

1. Replace the homepage pricing teaser's three equal cards with an asymmetric
   Free-first composition and compact Pro and Sponsored support.
2. Replace the privacy summary's equal cards with a compact numbered ledger or
   ruled guarantee list.
3. Rebuild the connected-plan preview from real product state sourced from
   `lumo-plan-builder` `origin/main`.
4. Retain every approved pricing, privacy, and example-data string.

### STOP condition

If authentic product state requires new claims or unapproved copy, stop and
present the proposed visual and exact copy additions before implementation.

### Phase 3 implementation record

**Parts 1 and 2 are done. Part 3 is stopped at the condition above.**

#### Part 1: pricing teaser

Free leads as a tall card in the forest treatment `/pricing` already applies
to it; Pro and Sponsored sit beside it as compact support. The change is grid
placement plus an `is-primary` class -- the same three articles and the same
strings. Free's content is centred rather than pinned top-and-bottom: two
lines of body cannot fill a card as tall as the two beside it, and pinning
the feature line to the floor left a visible hole.

#### Part 2: privacy summary

Three 230px boxes carrying three one-line guarantees become a ruled numbered
ledger, reusing the identity-contrast section's editorial rule rather than
inventing a pattern. Strings unchanged.

One real defect surfaced here: the ledger's `margin-top` computed to `0px`
because the reset at the top of the stylesheet zeroes margin on
`.marketing-homepage ol`, which outranks a bare class selector. The rule now
reads `ol.mh-home-trust-ledger`. This was caught by measuring, not by
looking -- the first screenshot only showed the top rule sitting oddly close
to the heading.

#### Part 3: connected-plan preview -- STOPPED, then resolved

The real product state was read from `lumo-plan-builder` `origin/main`
(`src/journey/stages.ts`, `src/journey/journeyItems.ts`,
`src/components/layoff-plan/layoffPlanItems.ts`,
`src/components/journey/PathListRow.tsx`, `src/pages/path/YourPath.tsx`).

The authentic shape is **not** what the homepage currently shows. The real
`/path` page is an "Up next" card (overline, serif step title, one caption
line, "Open this step") followed by stage groups: a stage name with an
`N left` caption, then rows of checkbox + step title + one quiet line. There
is no `Now / This week / Coming up` control, no `Priority / Possible / Next`
status column, no `Money / Support / Job search` category column, and no LUMO
row inside the plan card. Every one of those is invented product UI.

Rebuilding faithfully therefore requires **new user-facing copy and two new
factual claims that are not in the COPY.md verified-facts ledger**:

| Proposed string | Source | Why it needs a decision |
| --- | --- | --- |
| `Takes 2-3 weeks to start` (stake on "File for unemployment benefits") | `LEGACY_STAKES.unemployment` | New timing claim about unemployment benefits; not in the ledger |
| `Benefits can take 2-3 weeks to start, so filing early extends your financial runway.` | `unemployment.whyItMatters` | Same claim in sentence form |
| `21 or 45 days to decide` (stake on "Review your severance agreement") | `LEGACY_STAKES.severance` | New legal/severance window claim; not in the ledger. Only needed if stage 2 is shown |
| `Funded training (WIOA) still works even after your unemployment checks stop.` | `benefits-recheck.rowLine` | Benefits claim; adjacent to the ledger's job-centre row but not the same statement |

It also **retires approved copy**: the `Now / This week / Coming up` tabs, the
three `Priority / Possible / Next` rows with their category labels, and the
`Ask Lumo what to do first / Context already attached` row are all recorded in
COPY.md and would be removed.

**Owner decision 2026-08-26: ship the claim-free subset.** The card now
renders real product state with every number-bearing step left out:

- Heading `Your Path` and the lede `The steps that fit your situation. Do them
  in any order.` (a verbatim prefix of the page description).
- Stage row `Protect the first week` / `3 left`, then three steps with their
  real caption lines: key dates, COBRA, secure your accounts.
- `Show 2 done`, the real affordance for handled steps. `3 left` plus
  `Show 2 done` is internally consistent -- five steps in the stage, three
  open.

`File for unemployment benefits` and `Review your severance agreement` are
excluded: their copy carries the two unbacked figures. COPY.md records the
new strings, the retired invented UI, and the exclusion rule.

`--mh-radius-xs: 4px` was added to the token scale and to DESIGN.md -- a 16px
checkbox at `--mh-radius-sm` (8px) renders as a circle, and the scale had no
smaller step.

**Drift guards added** (`CopyDrift.test.tsx`, 15 new cases): the card's strings
must appear in both the render and COPY.md; the six retired invented strings
must not come back; and the two unbacked claims must stay off the homepage AND
out of the ledger. Proven non-vacuous by inverting two of them -- restoring
`Your starting plan` failed 2 cases, and putting `Takes 2-3 weeks to start` on
a row failed its guard.

**Verification for phase 3.** `npm test` 111 passed (96 before the new drift
guards), `npm run lint`, `npm run lint:css`, `npm run typecheck`,
`npm run build` (25 static pages), `npm run e2e` 52 passed. Three homepage
baselines updated deliberately across the phase; `/pricing` never moved, which
confirms the pricing deck was untouched.

Worth recording: after the part 3 rebuild the desktop homepage baseline passed
while tablet and mobile failed, because the card change sits under the suite's
1% pixel tolerance at 1440px. The desktop result is therefore not evidence of
anything -- each width was inspected directly with section screenshots instead.

**Follow-ups found, not fixed here.**

1. `.mh-five-steps-rows` declares `margin-top: 54px` that never applies, for
   the same `.marketing-homepage ol` specificity reason. Confirmed by
   measurement: it computes to `0px` on `/how-it-works`. Left alone because
   fixing it changes that page's spacing, which is outside a homepage phase.
2. The rebuilt card drops the LUMO row, which was invented UI -- the real
   `/path` list has no LUMO affordance. That removes the homepage's only
   product-surface mention of LUMO; the pricing teaser's feature line is now
   the only one. Worth a deliberate decision about where LUMO appears on the
   homepage, rather than restoring UI the product does not have.

## Phase 4: Imagery, CTA roles, and interaction polish

1. Inspect unused existing documentary assets and add at most one lower-page
   image if it materially improves pacing.
2. Reserve the filled primary CTA for signup and give internal route links a
   distinct secondary treatment.
3. Add context-aware focus indicators, pressed states, restrained link and
   arrow feedback, and a visible mobile-menu open state.
4. Preserve `prefers-reduced-motion` behavior.

### STOP condition

If no existing image fits, keep the current image count. Do not generate new
imagery without owner approval.

### Phase 4 implementation record

**No new imagery was generated.** `npm run imagery` was not run.

#### 1. Imagery

Three existing raw photos were unused: `final-cta-portrait.webp`,
`strip-interview-prep.webp`, `system-desk.webp`. The first is purpose-named
for this exact slot and is the one added. The homepage ran six text-only bands
between the hero photo and the footer; the closing band now pairs copy with a
portrait, echoing the hero's composition.

`FinalCta` gained an opt-in `photo` prop. Only the homepage passes it, so the
three other routes that share the component render the markup they rendered
before and never download the image. Verified by direct screenshot that
`/how-it-works`'s closing band is unchanged.

#### 2. CTA roles

`.mh-secondary-cta` is new: the primary CTA's geometry with a 1px ink outline
instead of the lime fill. Two internal route links moved onto it — the
homepage's `See how Offboard works` (to `/how-it-works`) and the Sponsored
card's `Learn about sponsored access` (to `/employers`) on `/pricing`. The
homepage previously showed the same filled lime button for signup and for a
route link on the same screen.

Mailto CTAs and `/intake` ("Talk to someone") were deliberately left on
`.mh-primary-cta`: neither is signup nor an internal route link, and re-roling
them is a separate decision, not this plan's.

#### 3. Focus, pressed, and menu states

The real find. Every focus ring on the site was a flat white, set once in a
single rule. Against paper (`#f7f4ec`) that is about **1.06:1** — a keyboard
user had no visible focus indicator across the light two-thirds of every page.
WCAG 2.1 SC 1.4.11 wants 3:1. This was shipped, not introduced by this plan.

The ring is now the inherited `--mh-focus-ring` token: ink by default, paper
re-declared on dark bands. Because custom properties inherit, a control inside
a dark band needs no rule of its own.

Writing the regression test caught a case direct inspection had missed: the
mobile-menu panel is a *light* dropdown inside the *dark* header, so it
inherited the light ring and painted paper on paper. It now sets the token
back to ink.

Also added: `:active` returns the CTA lift and the arrow nudge to rest so a
click reads as a press; `.mh-section-link` and `.mh-secondary-cta` nudge their
arrow 3px on hover; and the mobile-menu trigger finally has an open state
(surface, border, lime label) — it previously looked identical open or closed.

#### 4. Reduced motion

Everything added is `transition`-based, so the existing
`prefers-reduced-motion` block switches it all off. No new animation, no
transform that persists without a transition.

#### Verification

`npm test` 111 passed, `npm run lint`, `npm run lint:css`, `npm run typecheck`,
`npm run build` (25 static pages), `npm run e2e` **53 passed** (52 before, plus
the new focus-contrast guard).

The new guard asserts every focusable resolves the token to one of the two
documented values, that both values are in use, and that the resolved ring
clears 3:1 against the surface behind it. Proven non-vacuous: pointing the
token at paper everywhere reproduces the original defect and the test fails
with `Expected >= 3, Received 1`.

**Two evidence traps worth recording.**

1. Reading `outlineColor` back off a focused element reports **white even when
   the ring paints ink**. An early measurement pass "confirmed" the fix had not
   worked when it had. Ground truth came from screenshots of focused controls,
   and the committed test asserts the token, not the computed outline.
2. `/pricing`'s visual baseline **passed** after its Sponsored button changed
   from filled to outlined, because the button is under the suite's 1% pixel
   tolerance. Worse, `--update-snapshots` does not rewrite a snapshot whose
   comparison passed, so the committed baseline silently kept the old button.
   It needed `--update-snapshots=all`. Any future small-element change has the
   same trap: a green visual suite is not evidence, and a routine re-capture
   will not fix the stale reference.

   This bit a second time when the stack was rebased onto `main` after
   [PR #35](https://github.com/trulou1028/offboard-muo-marketing-site/pull/35)
   landed: the three `pricing` baselines conflicted, and resolving them to
   either side produced a **green** suite while the committed image still
   showed the old filled button. Only a forced re-capture surfaced it. When a
   screenshot baseline conflicts, re-capture it -- never resolve it by picking
   a side and trusting the suite.

## Verification for every visible phase

1. `npm test`
2. `npm run lint`
3. `npm run lint:css`
4. `npm run typecheck`
5. `npm run build`
6. `npm run e2e`
7. `npm run test:visual`
8. Inspect desktop, tablet, and mobile output directly.
9. Confirm no console errors and no horizontal overflow at 390px.
10. Review every changed screenshot before deliberately updating a baseline.

## Definition of done

- The approved content and section order remain intact.
- The page has a clear visual hierarchy between anchor and supporting sections.
- The mobile hero introduces human imagery earlier.
- Pricing and privacy no longer repeat the equal three-card pattern.
- The connected-plan proof is grounded in the real product.
- CTA and interaction roles are consistent and keyboard-visible.
- Required checks pass and intentional visual baselines are reviewed.
- The owner receives a Git-backed Vercel preview with specific review points.
- The PR remains unmerged until the owner approves the final preview.
