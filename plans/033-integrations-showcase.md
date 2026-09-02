# Plan 033 — Integrations showcase, the CalJOBS hook, and four owner decisions

> **Execute with:** Opus 5 · medium effort — a card-grid rebuild, a ledger-governed hook, and four owner decisions to record exactly. *(Executed. Model line added retroactively 2026-09-01 under plans/README.md § "The model line".)*

Executed directly on 2026-09-01 from the owner's answers to the five open
questions carried out of plan 026 and plan 028. This file is the record of
what shipped and what is still open, not a handoff.

## What the owner decided (2026-09-01)

1. **ChatGPT and Claude are live.** Both custom connections exist and work.
   The owner's framing: call it an alpha or beta launch, since both are
   still being refined. **Shipped as `Beta`.** This closes plan 028's first
   owner-verification flag.
2. **`/integrations` becomes a showcase.** Less written content; a card grid
   with the integration name, logo, description, and a hero band, in the
   style of the reference the owner supplied and of the app's own
   Integrations settings screen, but in Civic Modern. Current integrations:
   Google Calendar, Google Drive, Calendly, ChatGPT, Claude. A few in
   progress as well. Cards are a showcase, not links.
3. **The `~$12,000` CalJOBS hook goes on `/layoff-support`.** "That page is
   perfect for that hook."
4. **`/public-partners` consolidates into `/workforce`** when `/workforce`
   ships. No thin crosslink page is kept; the old URL redirects.
5. **Header CTA label when the dropdown nav ships:** deferred to the
   executor. Decision recorded below.

## What shipped

**`/integrations`**
- New `Showcase` section directly under the hero: kicker `What connects`,
  H2 `Offboard holds the record. You choose the interface.`, then two
  labelled groups of cards, `Connected today` (5) and `In progress` (2).
- Card = hero band (logo tile + status chip) over name and one line of
  description. Status chips: `Live` (Google Calendar, Google Drive,
  Calendly), `Beta` (ChatGPT, Claude), `In progress` (Gmail, Notion).
  In-progress cards are drawn as dashed outlines with a desaturated mark,
  so the two groups differ without being read.
- A note under the grid states the beta framing in the owner's own terms
  and says explicitly that no dates are attached to the in-progress ones.
- **Cut:** the `The idea` editorial block (kicker, long body, three
  contrast cards). It was the page's longest prose section; its H2 now
  titles the grid. Recorded as retired in COPY.md § 11.
- Everything else on the page is unchanged: the three chat demos, the
  four capabilities, the permissions list, the Lumo band, the final CTA.

**Partner marks — `IntegrationLogos.tsx` (new)**
- Seven hand-authored SVG marks in the partners' own colors. Hand-authored
  because the site self-hosts every asset (no icon or font CDNs) and an
  icon dependency would ship hundreds of marks to render seven.
- They are **approximations**, recognizable at 34px and read together with
  the name printed under them. The ChatGPT knot is the loosest of the
  seven. To swap in an official asset, replace one component body; nothing
  else changes.
- This file is the one place on the site allowed to use colors outside the
  Civic Modern palette, because the marks are not ours to restyle.

**`/layoff-support`**
- `HookBand` restored between "The questions underneath" and "What Offboard
  does about it": the approved v7 copy verbatim, the "amounts vary" small
  print, and the sample benefit-payment clock card (labelled a sample).
- Rebuilt on the Civic Modern palette rather than restored verbatim: the
  progress fill is **sage, not lime**, because lime is
  primary-action-on-dark and AI accents only.
- The hook stays off the homepage.

**Governance**
- COPY.md § 11 rewritten, § 13 updated, four decision-log rows added.
- Ledger row `CalJOBS training extension example` moves from "Not currently
  shipped" to `/layoff-support`. New ledger row `Live integrations` governs
  which assistants and tools the grid may claim.
- CopyDrift: the CalJOBS assertion becomes a render assertion again (and
  asserts the small print ships with the number, and that the number stays
  off the homepage); a new assertion holds the grid and the ledger row in
  agreement.

**Unrelated fix taken in passing:** `npm run lint:css` was red on `main`
(`.mh-verified-visual` declared twice since plan 028's band-rhythm sweep).
Folded into one rule; the visual suite confirms `/how-it-works` renders
identically.

## Decision 5, recorded: the header CTA stays "Build my plan"

The strategy doc's target nav writes the header button as "Get started".
Keeping `Build my plan` instead:

- It names what the visitor gets. "Get started" names nothing, and this
  audience is deciding whether Offboard is worth their attention at all.
- The homepage hero already owns `Get started free` (owner-supplied v2
  copy). A header button with different words keeps the hero's CTA the
  primary one on the screen instead of duplicating it.
- It is reversible in one line if the dropdown build shows otherwise.

## Still open

- **Plan 028 flag 2:** the real permissions model. `/integrations` still
  publishes principle only, deliberately. The capability matrix belongs in
  that section when the authorization model is settled.
- **`2,000+ job centers`:** approved ledger phrasing, no owner decision, so
  it stayed off `/layoff-support`.
- **`/workforce` itself** is phase 3 work (plan 026). The redirect from
  `/public-partners` lands with it, not here.

## Verification

- `npm test` (139) green · `npm run build` green · `npm run e2e` (85) green
  · `npm run lint:css` green (was red on `main`).
- Six visual baselines re-captured deliberately: `/integrations` and
  `/layoff-support` at desktop, tablet, and mobile. The other 79 e2e checks
  passed unchanged, which is what proves the CSS refactor touched nothing
  else.
- Band rhythm re-audited on both routes with a temporary spec (deleted):
  zero adjacent same-background sections.
- Both new sections inspected directly at 1440px and 390px: no console
  errors, no horizontal overflow.
