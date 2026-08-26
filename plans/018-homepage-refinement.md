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
- **Current phase**: Phase 1 approved and merged; Phase 2 is next
- **Phase 1 merge**: PR #31, merge commit `d0227c5`, 2026-08-25

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
