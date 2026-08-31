# Plan 020 — Homepage v2 (Career Context)

Owner-directed (2026-08-30). Louie supplied a full homepage copy doc
(`offboard-career-context-hp-copy-v1a.md`, in his Drive) and asked for a
homepage v2 built from it, using the hero photo from the Civic Modern design
system export. Stacked on plan 019 (`claude/civic-modern-homepage`).

## What shipped

- `MarketingHome.tsx` fully rebuilt: Hero (light paper band, kitchen-table
  photo, floating AI-chat card with tracker card) → Wherever you work (mist,
  4-message demo conversation + 4 capabilities) → Career Context (8 category
  cards + forest inset card) → More than a job search (sand, photo triptych +
  6 question blocks) → Meet Lumo (forest-deep, 5 prompts, AI button) →
  Toolkit (4 groups, 10 tools) → Pro (paper-deep, Free/Pro plan cards) →
  Sponsored access (forest inset) → Built around you (mist) → Community
  (carried over from v1) → Final CTA (forest-deep, Lumo-filled button).
- Band order and component treatments follow
  `docs/design-system-civic-modern/` (readme + marketing ui_kit). The
  homepage header flips light with the dark wordmark (`Brand` gained a
  `variant` prop; other routes unchanged, ArticleFidelity snapshot intact).
- v1 homepage-only sections and their CSS deleted (hero, problem, identity,
  three-jobs, hook/$12k, connected-plan, pricing-teaser, employer-strip,
  privacy-summary). `VerifiedFactsStrip`, `FinalCta`, `CommunityStrip` kept
  (shared or still used).
- COPY.md § 1 rewritten (version 2.0); ledger rows for CalJOBS and job
  centers marked "Not currently shipped"; 4,000+ moved to /how-it-works;
  primary-CTA rule gains the homepage "Get started free" exception; decision
  log + Open owner items updated.

## Copy-law deviations from the source doc (recorded in COPY.md decision log)

- "recruiting platform" → "recruiting site"; "infrastructure that" → "tools
  that" (never-say vocabulary).
- Community strip kept although absent from the doc (the `/community` legacy
  redirect targets `/#community`; the 5,000+ ledger fact lives there).
- The trust line "Join thousands of people…" shipped pending owner
  verification (Open owner items).

## Lumo-lime audit (AI-only rule)

Lime renders only as: photo-chip AI dots, LumoMarks in chat/callout, the AI
reply highlight, the Meet Lumo eyebrow (dark AI band), the AI-button dot, and
the single Lumo-filled final CTA — all four sanctioned uses from the design
system, verified by a computed-style sweep.

## STOP conditions

- Vercel preview + owner sign-off before merge (stacked PR on top of plan
  019's PR #41 — merge order: 41 first).
- Owner decides: does the $12k hook band return in some form?
