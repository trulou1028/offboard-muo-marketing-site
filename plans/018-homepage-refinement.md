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
- **Current phase**: Phase 3 parts 1-2 executed; part 3 held at its STOP condition
- **Phase 1 merge**: PR #31, merge commit `d0227c5`, 2026-08-25
- **Phase 2 branch**: `claude/018-phase2-typography`
- **Phase 3 branch**: `claude/018-phase3-teasers-proof` (stacked on phase 2)

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

#### Part 3: connected-plan preview -- STOPPED

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

Nothing was implemented for part 3. The owner decides: approve the new claims
into the ledger, approve a claim-free subset (the step titles alone carry no
numbers), or keep the current illustrative card.

**Verification for parts 1 and 2.** `npm test` 96 passed, `npm run lint`,
`npm run lint:css`, `npm run typecheck`, `npm run build` (25 static pages),
`npm run e2e` 52 passed. Three homepage baselines updated deliberately.
`/pricing` did not move, which confirms the pricing deck was untouched.

**Follow-up found, not fixed here.** `.mh-five-steps-rows` declares
`margin-top: 54px` that never applies, for the same `.marketing-homepage ol`
specificity reason. Confirmed by measurement: it computes to `0px` on
`/how-it-works`. Left alone because fixing it changes that page's spacing,
which is outside a homepage phase.

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
