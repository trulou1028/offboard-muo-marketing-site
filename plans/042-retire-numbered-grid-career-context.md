# Plan 042 — Retire the numbered grid; restructure /career-context around the record

> **Execute with:** Opus 5 · high effort — a sitewide layout replacement across ten routes plus a page re-sequence, all verified in a browser at two widths; no claim or compliance copy changes, but the visual baselines for ten routes move and each diff must be proven intentional.

**Status: PLANNED, not built.** Written 2026-09-04 from the owner's design
critique request, reviewed at commit `5d7e110` (`main`). Owner decision
2026-09-04: the contrast sections become **product compositions**, not
prose comparisons.

Depends on: 039 (composition rules R2, R4, R5a; Patterns C and H). Can run
in parallel with 041; both touch `MarketingHomepage.css`, so land 041
first if they overlap.

## Part 1 · Why the numbered grid reads as lazy

`EditorialGrid` (`MarketingSite.tsx`, `.mh-route-card-grid`) renders a
copy block, then a two-column bordered grid of `01 / 02 / 03` cards. It is
called on ten routes: `/career-context`, `/job-search`, `/lumo`,
`/communities`, `/workforce`, and five in `MarketingRoutePages.tsx`
(`/pricing`, `/about`, `/employers` twice, `/act`).

- **The numerals lie.** "01 What a resume holds / 02 What your career
  holds / 03 What keeps getting lost" is a contrast, not a sequence.
  Numbers say "steps." The same is true on `/lumo` ("Not a smarter
  chatbot"), `/job-search` ("A bag of tools makes you the integration"),
  and `/about` ("Calm is part of the product"). Only `/pricing` ("How
  credits work") is a real sequence.
- **Boxes hold air.** Cards are 280px tall for a title and one sentence,
  with a 70px gap between numeral and title. About 60 percent of each cell
  is empty; the eye reads the rules, not the words.
- **The lead card promotes the wrong item.** The R1 lead-plus-pair fix for
  odd counts makes item 01 visually primary. On `/career-context` that
  makes "What a resume holds" the hero of a section whose point is that the
  resume is the small thing.
- **One treatment for four content types.** Contrasts, principles,
  sequences, and audience descriptions all get the same grid. Nothing tells
  the reader what kind of thing they are looking at.
- **It is a copy block then a grid**, the unit `DESIGN.md` names as the
  reason the homepage read unfinished before plan 039.

## Part 2 · Replacement by content type

| Content type | Callers (kicker · title) | Replacement |
| --- | --- | --- |
| **Contrast** | `/career-context` The problem · A resume is a fraction of your career; `/job-search` The difference · A bag of tools makes you the integration; `/lumo` The difference · Not a smarter chatbot. A better starting point. | **Split with a product composition** (R2). Copy block left (kicker, headline, the existing body paragraph). Right: a base card that shows the "small thing" and satellites that show what it misses. See Part 3 for each. The three card bodies become the satellite labels or are cut; nothing is lost that the body paragraph does not already say. |
| **Principles** | `/about` What guides the work · Calm is part of the product; `/communities` Who this is for · Programs whose people come back; `/workforce` Beside what you already run · Agencies decide... | **Editorial statements** (new Pattern C variant, `.mh-statements`). Single column, max 760px. Each item: 31px serif line, one-sentence Inter body, hairline rule between. No numerals, no boxes. |
| **Sequence** | `/pricing` How credits work · Pay only for the work that needs more horsepower. | **Numbered rows.** `.mh-numbered-rows` already exists (employers steps, company pages) and reads as steps. Keep the numerals here only. |
| **What you get / audience** | `/employers` The member experience; `/employers` Why companies do this; `/act` What residents get | **Ruled feature list.** The `/layoff-support` qblock pattern (`.mh-qgrid`, ink top rule, uppercase feature label) at three columns when the count divides by three, otherwise `.mh-statements`. Counts must satisfy R1. |

Compositions per contrast page:

- **`/career-context`**: base card is a resume page: a name line, two role
  headers, four greyed bullet lines (no real text, muted bars). Three
  satellites break its edges: `Project outcome · +38% renewals` (sample),
  `Interview story · The migration that slipped`, `Goal · Staff role,
  remote, by spring`. The reader sees the resume as a thin sheet inside a
  larger record. Lime never appears; nothing here is an AI action.
- **`/job-search`**: base card is a row of four disconnected tool tiles
  (tracker, resume tool, notes, chat) with a muted "you" line joining them
  by hand. Satellite: one Offboard Application Packet card with the same
  four items inside it, connected. Reuse the packet card styling from
  `/job-search` further down the page if it exists; do not draw a new one.
- **`/lumo`**: base card is an empty chat composer, `Tell me about
  yourself...`, with a cursor. Satellite: the Career Context record card
  from the homepage (`RecordComposition`, reused, not copied). Lime chip on
  the satellite only, because this is where the AI acts.

Every composition has an `aria-label` and its sample values carry no ledger
claim (no dollar figures, no program names, no deadlines).

`EditorialGrid` itself is deleted once no caller remains.
`.mh-route-card-grid` and its `:nth-last-child` rules are deleted with it;
`DeadSelectors.test.ts` will enforce that.

## Part 3 · /career-context restructure

Content is solid. The structure is the same unit nine times, and two
sections say the same thing.

Findings at 1440 and 390:

| Finding | Severity |
| --- | --- |
| "Bring what you already have" (8 cards) and "Eight kinds of record" (8 cards) use the identical card style back to back: 16 cards in a row. Content overlaps: "Goals & preferences" vs "Preferences" plus "Goals"; "Applications & contacts" vs "Applications" plus "Contacts"; "Resume import" vs "Experience" and "Documents." | Critical |
| Mobile height 10,742px at 390 (about 13 screens). `/layoff-support` is 7,440. The two grids are 16 stacked cards. | Critical |
| Hero has `aside={false}`. The page is about an object and never shows it; the homepage already has the record composition. | Moderate |
| Nine sections at the same kicker + h2 scale. No visual peak between hero and final CTA. | Moderate |
| "Every step makes it smarter" is a loop shown as three static columns. | Minor |
| Ownership list bakes `01` into the copy strings. | Minor |
| Card body text is 14px muted on paper; it carries the page's explanation. | Minor |

New section order (composition per R4; bands per the existing rhythm):

| # | Section | Band | Composition | Change |
| --- | --- | --- | --- | --- |
| 1 | Hero | deep | PageHero **with aside** | Reuse `RecordComposition` from the homepage as the aside. Export it from `MarketingHome.tsx` or move it to `MarketingSite.tsx`. |
| 2 | The problem | paper | Split + composition | Part 2's resume composition. |
| 3 | **What it holds** (merged) | mist | Stacked: intro, 4x2 record grid, then a chip row | Keep the eight `HOLDS` cards (`.mh-ctx-grid`, 4x2, R1 clean). Under them one line, `Built from what you already have:` and a chip row: Resume · LinkedIn · ChatGPT history · Documents · Interview stories. `IMPORT_SOURCES` is deleted; its two unique bodies ("Import the career context you have already built up in your ChatGPT history", "Start from the document you have") move into the intro paragraph. |
| 4 | Every step makes it smarter | sand | Ruled (Pattern C), three rows | Same copy, `.mh-statements` instead of three columns. Optional: a small three-node loop SVG in the right half to satisfy R5; skip if it costs more than an hour. |
| 5 | One record. Every output. | paper | Ruled, four rows | `.mh-capabilities` at 4 columns stays if it looks right beside the new section 4; otherwise `.mh-statements`. Do not have two consecutive ruled sections of the same shape (R4): if 4 is ruled, 5 keeps the four-column strip. |
| 6 | Meet Lumo | forest | existing | Unchanged. |
| 7 | Your context goes with you | mist | existing split + chat card | Unchanged. |
| 8 | Your Career Context belongs to you | white | existing ruled list | Move the `01` to a CSS counter on `.mh-plain-list.ruled.is-numbered`; copy strings lose the prefix. Update the drift test. |
| 9 | Final CTA | deep | existing | Unchanged. |

Bands after the change: deep, paper, mist, sand, paper, forest, mist,
white, deep. No adjacent repeats. Mobile target: under 8,000px at 390.

Card body size: `.mh-ctx-card p` from 14px to 15px, line-height 1.5.

## Part 4 · Rules to add to DESIGN.md

- **R11 · Numerals only on sequences.** A `01 / 02 / 03` label means the
  reader should do these in order. Contrasts, principles, and lists of
  benefits carry no numerals.
- **R12 · One sentence gets a rule, not a box.** A card whose body is one
  sentence is a row of a ruled list. Boxes are for compositions and for
  bodies of two or more sentences.
- **R13 · A contrast is a composition.** "This vs that" sections show the
  two things (R2), never a grid of equal cells describing them.

`e2e/composition.spec.ts` (R1) still applies to every replacement grid.

## Copy

No user-facing sentence changes except: the three `RESUME_CONTRAST` bodies
and the eight `IMPORT_SOURCES` bodies leave the page (two sentences are
folded into the section 3 intro), and the `01`-`04` prefixes leave the
ownership strings. Update `COPY.md § 10` (Career Context page) and the
drift and regression tests in the same PR. The `/lumo`, `/job-search`,
`/about`, `/communities`, `/workforce`, `/pricing`, `/employers`, `/act`
sections keep their titles, bodies, and item copy; only the layout
changes. `/act` keeps its own vocabulary and its B2G firewall; a layout
swap must not import any string from another page into it.

## Verification (STOP conditions)

- Visual baselines for all ten routes move. **Never re-capture to make the
  suite pass.** For each route, screenshot before and after, confirm the
  only diff is the replaced section, then re-capture and say so in the PR
  with the list of routes.
- Browser check at 1440 and 390 on every touched route, zero console
  errors, no horizontal overflow (`scrollWidth === innerWidth`).
- `DeadSelectors.test.ts` green after `.mh-route-card-grid` is removed.
- `/act` diffed by hand against `docs/site-architecture.md`'s firewall
  list after the swap.
- `npm test`, `npm run lint`, `npm run lint:css`, `npm run build`,
  `npm run e2e` green. Preview URL via `node scripts/preview-url.mjs`,
  with `/career-context` first and the three contrast pages named as
  things to look at.
