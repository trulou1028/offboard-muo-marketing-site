# Plan 024 — Sticky nav, Home link, neon CTAs, motion pass

> **Execute with:** Opus 5 · medium effort — sticky nav, motion, and neon CTAs; reduced-motion and contrast had to be verified, not assumed. *(Executed. Model line added retroactively 2026-09-01 under plans/README.md § "The model line".)*

Owner-directed (2026-08-31), four asks in one PR, stacked on plan 023's
PR #44. Each retires a previously documented rule, deliberately:

| Change | Rule it retires | New rule |
| --- | --- | --- |
| Fixed (sticky) header | "Nothing is fixed or sticky; the page is a document" | The nav stays interactive while scrolling; a shadow marks the scrolled state |
| Neon primary CTAs on dark green (incl. header) | "Lume lime is AI-only" (plan 023, a week old) | **Lime = the primary action on dark green + AI accents**; never on light, never decorative |
| Motion pass | "No entrance animation, no scroll reveals" | One calm reveal gesture, ≤400ms, reduced-motion honored absolutely |

Plus: Home joins the nav (6 links).

## Mechanics worth remembering

- Header went `position: absolute` → `fixed`; heroes already padded past
  it. In-page anchor targets gained `scroll-margin-top: 96px` (targets of
  the SEO-load-bearing `/faq`, `/job-packet`, `/community` redirects), and
  the intake cards' 24px margin (tuned for a header that scrolled away)
  grew to 96px.
- `MotionController.tsx` is the marketing tree's **first client
  component**. Reveals are strictly opt-in: the CSS hidden state exists
  only under the `mh-motion` class the controller adds, and it never adds
  it under reduced motion or without IntersectionObserver — so no-JS,
  reduced-motion, and test visitors get a fully visible static page. The
  header scroll shadow toggles regardless (state, not motion). matchMedia
  and IO are feature-detected: jsdom has neither.
- Hero load-in is pure CSS keyframes (`both` fill) so it starts at first
  paint with no hydration flash, and Playwright's `animations: "disabled"`
  fast-forwards it to the visible end state.
- `playwright.config.ts` gained `contextOptions: { reducedMotion:
  "reduce" }` (the flat `reducedMotion` use-option is not in this
  Playwright version's types): every suite sees the static page. Suites
  assert content/layout/contrast, never motion.
- Two-commit baseline discipline: commit a (sticky+Home+neon) regenerated
  all 33 baselines after verifying the ArticleFidelity snapshot diff was
  exactly the Home link twice per article; commit b (motion) moved **zero**
  baselines — the proof the gating leaks nowhere.
- Motion itself was verified with a temporary Playwright spec (overriding
  reducedMotion per-describe): reveals fire on scroll, hero resolves
  visible, reduced-motion serves everything statically. Spec deleted after
  passing; the in-app browser pane could not verify this (hidden documents
  throttle IntersectionObserver).

## Owner gate

Preview + sign-off before merge (visual change on every route).
