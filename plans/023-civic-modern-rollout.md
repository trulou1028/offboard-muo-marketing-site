# Plan 023 — Civic Modern rollout to every route

Owner-directed (2026-08-31): "can we apply our new style guide to the rest of
the pages?" Completes the adoption that plan 021 started on the homepage.

## What changed

- **Tokens promoted.** The Civic Modern values moved from the
  `.marketing-homepage.mh-page-home` override block into the base
  `.marketing-homepage` token block, and the override block was deleted.
  Every route now renders the same palette, type, rhythm, radii, and shadow.
  `--mh-mist`, `--mh-sand`, `--mh-sand-eyebrow`, `--mh-sage`,
  `--mh-secondary` and `--mh-chip-fill` are no longer homepage-only.
- **Fonts.** `--mh-font-body` / `--mh-font-display` point at Inter and
  Newsreader for every route. Aspekta and Fraunces are still loaded in
  `layout.tsx` but no rule consumes them (removal is a follow-up).
- **Lime → AI-only, site-wide.** Every decorative lime consumer took its
  Civic Modern role: skip link and intake submit → forest; on-dark eyebrows,
  footer column headings, active-nav underline, mobile menu, progress mark,
  ACT privacy eyebrows, toolkit flagship link → paper; pricing badge → mist.
  The lightened-lime hovers (`#e7ff7a`) → forest-deep. Lime now renders only
  on the AI avatar, the AI reply highlight, AI chip dots, the LUMO section
  eyebrow, and the homepage's Lumo final CTA.
- **On-dark whites → paper family.** 24 `rgb(255,255,255,…)` literals and
  every `color: white` became `rgb(246 244 238 / …)` / `var(--mh-paper)`, so
  dark bands read warm. Card surfaces stay `#fff` (Civic Modern's
  surface-card).
- **Buttons.** Primary CTA is forest-on-paper everywhere, paper-on-ink on
  dark bands, 6px radius (the route hero and contact CTAs lost their pill).

## Defects this pass found and fixed

Three were specificity traps of the kind this file already warns about, all
caught by an all-routes audit rather than by eye:

1. `a.mh-skip-link` — `.marketing-homepage a { color: inherit }` is (0,1,1)
   and outranked the bare class, so the skip link painted ink on forest
   (1.42:1). Pre-existing; the rollout exposed it.
2. `.mh-route-hero` and `.mh-final-cta` CTAs rendered paper text on a paper
   fill (invisible) because `.marketing-homepage a.mh-primary-cta` (0,2,1)
   outranked the on-dark rule. Introduced by this pass, fixed before commit.
3. The article-header eyebrow was lime on paper (~1.3:1) on every guide page.
   Pre-existing; now forest.

## Verification

A temporary Playwright spec (`e2e/tmp-rollout-audit.spec.ts`, deleted before
the PR) walked all 10 routes asserting three things: no text below 3:1, no
legacy-palette color still rendering, and no Lumo lime outside the sanctioned
AI elements. All 10 passed. Page heights moved less than 3% on every route —
the smaller type offsets the looser rhythm.

## Deferred (recorded in DESIGN.md)

- The design system's flat 32px container gutter: the site keeps its clamp,
  which the CI container-alignment test is written against.
- Full component-level type-scale adoption: tokenized headings use the
  system's sizes as desktop clamp endpoints; card and label sizes keep
  their own values.
- Route pages keep their own band order rather than the system's homepage
  rhythm. Restructuring them is a design decision, not a token swap.
- Removing Aspekta/Fraunces from `layout.tsx` now that nothing consumes them.

## STOP conditions

- Preview + owner sign-off before merge (visual change on every route).
- Stacked on plan 022's repair/polish PR #43, which should merge first.
