# Plan 045: The Product dropdown and its five pages come back; `/how-it-works` is deferred instead

> **Execute with:** Fable 5.1 · high — it moves four routes in and out of the indexed launch set and rewrites copy on five pages, so a wrong call ships either a hidden page that should be found or a claim nobody reviewed.

> **Reconstructed 2026-09-14.** This plan was executed on 2026-09-07 and
> shipped as [PR #78](https://github.com/trulou1028/offboard-muo-marketing-site/pull/78)
> (`3b9350e`), but its file never reached `main` — `plans/README.md` carried a
> row pointing at a document that did not exist. What follows is written from
> the shipped commit, `COPY.md` §§ 10 to 14, and `docs/site-architecture.md`,
> so the backlog row resolves to a readable record. It is a record of what was
> done, not the brief that was written before doing it.

## Status

- **Status:** BUILT 2026-09-07, merged via PR #78. This file restored 2026-09-14.
- **Priority:** P1. Owner reversal of plan 043's launch trim.
- **Effort:** L, in two parts.
- **Risk:** MED. Changes which routes are indexed and which are hidden.

## Why this plan exists (owner reversal, 2026-09-07)

Plan 043 trimmed the launch set to get live in a week, which meant hiding the
five product pages behind a trimmed nav. Reviewing `/how-it-works` after that
trim, the owner reversed it: the product pages are the substance, and
`/how-it-works` is "not valuable enough to be a more in-depth version of the
homepage."

## What shipped

**Part 1: the swap.**

- `src/lib/launch.ts` now defers `/how-it-works`, `/workforce`, `/communities`
  and `/companies`. The five product pages drop their `robots` override and
  rejoin the sitemap.
- The Product mega menu returns, with Career Context as its featured card.
  The footer's Product column fills back in.
- The homepage's four "See …" step links return.
- The hero's "See how it works" and `/layoff-support`'s crosslink scroll to the
  homepage's own four-step strip (`id="how-it-works"`) rather than leaving the
  page.
- `/how-it-works` stays live and routable: four legacy URLs 301 to it. Deferred
  means hidden from search and nav, never 404.

**Part 2: the messaging pass on the five product pages.** Cut what a
neighbouring section or a sibling page already said:

- `/career-context` loses its second sibling promo ("Your context goes with you").
- `/lumo`'s eight "what it knows" cards become a one-line hand-off to Career
  Context plus the three things only Lumo carries (plan 040 finding 10).
- `/integrations` loses the four capabilities that restated its three demos, and
  the showcase's redundant lede.
- `/job-search` loses the eight-row loop that walked the same process its four
  stages already structure; its one idea now titles the closing band.
- Two openings trimmed, Lumo's "difference" paragraph rewritten in the warmer
  register, one glossary casing fix.

## Verification as run

Every visual baseline re-captured deliberately: each route grew by the footer's
restored rows (88px desktop, 132px tablet and mobile), and the homepage by that
plus its four links. Article-fidelity snapshots moved in the nav and footer
markup only. `npm test`, `npm run lint`, `npm run lint:css`, `npm run build`
and `npm run e2e` green.

## What this plan left open

Plan 046 (the product pages' visual pass) was written as part of this work and
executed next.
