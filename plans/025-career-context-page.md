# Plan 025 — Career Context pillar page

> **Execute with:** Opus 5 · medium effort — the first pillar page and the plumbing template every later page copied. *(Executed. Model line added retroactively 2026-09-01 under plans/README.md § "The model line".)*

Phase 1 of the owner's site-architecture strategy (see plan 026 for the
full roadmap). Built 2026-08-31 on `claude/career-context-page`, stacked
on plan 024's PR #45.

## What shipped

- `/career-context` (`src/app/career-context/page.tsx` +
  `MarketingCareerContext.tsx`): hero → why a resume isn't enough →
  bring what you already have (8 import sources) → improves as you go →
  outputs → how Lumo uses it → works with the AI you already use (chat
  demo) → yours-and-private → final CTA. **Zero new CSS classes** — every
  section reuses an existing pattern; band rhythm holds (one deep anchor,
  no adjacent same-color bands).
- Chat primitives (LumoMark, YouBubble, AiReply, TrackerCard) moved from
  MarketingHome to MarketingSite for reuse — a verified no-visual-change
  refactor commit.
- Homepage: Career Context h2 widened to "One place that remembers your
  career." (owner strategy doc); the section gains a "Learn more about
  Career Context" link; the footer Product column gains the page. Header
  nav deliberately untouched (the dropdown waits for phase 4).
- Copy drafted in COPY.md § 10 first (copy law). Deliberate omission: the
  strategy doc's "70 to 80 percent" build-speed claim was NOT shipped —
  a load-bearing number needs a verified-facts ledger row, and none
  exists; the copy says "in minutes" instead. Owner can add the number
  with a ledger row if it is real.
- Wiring: CopyDrift sweep + outplacement-absence lists, MarketingRoute
  union, DeadSelectors MARKETING_ROUTES, visual + reset-shadowing +
  mobile-overflow route lists, sitemap.ts.

## Owner gate

Page copy (COPY.md § 10) and the homepage h2 change need Louie's explicit
sign-off before merge, plus the standard preview review.
