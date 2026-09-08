# Plan 046 — Product pages: the visual pass after the messaging pass

> **Execute with:** Opus 5 · high — five page compositions verified in a browser at two widths, one new shared hero pattern, product renders that must match real product state; no claim copy changes, but every image is a decision the owner sees.

**Owner ask (2026-09-07):** after bringing the five product pages back, "do a
messaging polishing pass on those product pages, look for any redundancies
that are not useful, and suggest visuals and any other improvements, with the
goal being clarity, conciseness, and aesthetically pleasing."

**What the messaging pass already did (plan 045 part 2, same PR as the
structure swap):** cut the sections that said what a neighbouring section or
a sibling page already said. Details in `COPY.md` §§ 10, 11, 12, 14. Short
version: `/career-context` lost its second sibling-page promo; `/lumo`'s
eight "what it knows" cards became a one-line hand-off to Career Context plus
the three things only Lumo carries; `/integrations` lost the four
capabilities that restated its three demos; `/job-search` lost the eight-row
loop that walked the same process its four stages structure. Two openings were
trimmed, one cooler paragraph was rewritten in the site's warmer register, and
the Lumo prompt list got its contrast back. `/layoff-support` needed nothing:
plan 041 rebuilt it four days ago and it is the strongest of the five.

This document is the part that needs the owner: what the pages should look
like. It is a plan, not a build.

---

## Read across the five pages, what still holds them back

1. **Four of five heroes are half empty.** `PageHero` puts the copy in the
   left column and an aside card in the right. `/career-context` has an
   aside (its record card, plan 042). `/lumo`, `/integrations`,
   `/job-search` and `/layoff-support` ship `aside={false}`, so the first
   screen of each is a headline and a button beside 700px of dark green.
   The homepage hero just moved to a full-bleed photograph; these four now
   read as the site's emptiest screens.
2. **Every page's second section is the same move.** A `ContrastSection`
   (kicker "The problem" or "The difference", an H2, a body, a bold payoff
   line, a composition on the right). Plan 042 built the compositions well,
   but a visitor who reads two product pages sees the template (plan 040
   finding 6 said this about the copy; it is now true of the layout).
3. **No photographs.** The homepage, `/about`, `/employers` and the final
   CTAs carry people. The five product pages carry cards, chips and grids
   only. Eight photographs in `public/marketing/homepage/raw` and
   `collage` are referenced nowhere (see the table below). Plan 007's rule,
   every image referenced once, is not the constraint; it is a guide to
   where they go.
4. **The eight-card icon grid appears on two pages and says "features"**
   (`.mh-ctx-grid`: `/career-context` What it holds, and until today
   `/lumo` What it knows). Icon + title + one line, sixteen times. It is
   the pattern DESIGN.md's composition rules exist to retire.
5. **The Lumo prompt list is a column of eight bordered boxes.** They are
   questions a person would type; they should look like it.

---

## Proposal, page by page

Compositions below reuse the primitives that already exist
(`.mh-comp`, `.mh-comp-base`, `.mh-comp-satellite`, `YouBubble`,
`AiReply`, `.mh-record-card`, `.mh-plan-preview`, `.mh-packet-mini`). One
new shared pattern: a hero variant that takes a **composition** in the
aside slot instead of a card. Estimated new CSS: under 60 lines.

### A. Heroes get their composition, and the contrast section goes

Move each page's plan-042 composition up into the hero aside and delete the
`ContrastSection` that held it. The payoff line (the bold sentence) moves
into the hero body as its last sentence, so nothing approved is lost. Each
page opens on its object and gets a full screen shorter.

| Page | Hero aside (from the section below it) | Payoff line into the hero |
| --- | --- | --- |
| `/career-context` | keeps its record card; the resume-sheet composition (`RESUME.PDF` + three chips) replaces "The problem" with a **photo** instead (see C) | `Every time you explain yourself to a new tool or a new chat window, the context evaporates when the tab closes.` |
| `/lumo` | the record card + blank composer (`Any other assistant / Tell me about yourself...`) | `You spend the conversation on the decision instead of on context.` |
| `/job-search` | the Application Packet mini card + "every other tool" stack | `The tenth application takes less effort than the first.` |
| `/integrations` | none today. New: the five partner marks as a row of `.mh-int-card` tiles, ChatGPT and Claude carrying their `Beta` chips (the marks and chips already exist in `IntegrationLogos.tsx`) | none; the hero body is already tight |
| `/layoff-support` | the `Your Path` card + `Runway · sample` satellite, which is the first-week composition | none; keep the first-week section's copy, drop only its composition (it moved up) |

Owner decision 1: **approve moving the compositions into the heroes.** It is
the one change that fixes findings 1 and 2 together.

### B. One shared "you can also" pattern instead of three promo bands

Each page still ends with one band promoting a sibling (`/career-context` →
Lumo band; `/lumo` → "Prefer ChatGPT or Claude?"; `/integrations` → "Or use
Lumo"; `/job-search` → "The last step feeds the first" → Career Context).
Four different bands for one job. Replace with one shared component, a
ruled two-item strip under the kicker `Also part of the system`, each item a
title, one line and an arrow link, placed directly above the final CTA. Same
words as today's bands; the H2s become the item titles.

### C. One photograph per page, at the human moment

| Page | Photograph (unused today) | Where |
| --- | --- | --- |
| `/career-context` | `raw/system-desk.webp` (a desk with the real record in front of someone) | replaces the resume-sheet composition in "The problem", which becomes a split: photo left, copy right |
| `/lumo` | `raw/hero-kitchen-table.webp` (the plan-039 kitchen-table scene; the homepage no longer uses it) | behind the "Straight answers" forest band, as the final CTAs do (`.mh-final2`'s photo treatment already exists) |
| `/job-search` | `raw/strip-interview-prep.webp` | the "Four stages" intro, photo beside the copy block |
| `/integrations` | none. This page is the one place a photo would fight the partner marks; keep it product-only | — |
| `/layoff-support` | `collage/scrap-calendar.webp` or `scrap-runway.webp` | the "Been out a while?" band, which is the page's only copy-only section |

Owner decision 2: **approve the photo placements**, or name different ones.
`system-desk` and `hero-kitchen-table` were generated for the homepage and
match its palette; the two collage scraps were generated for a retired
homepage section and should be checked at size before use.

### D. The eight-card grid becomes the record

`/career-context` "What it holds": render the eight kinds as **one
`.mh-record-card` with eight rows** (label left, one-line description right,
the same row the hero card uses), the five source chips underneath as today.
The page then shows the record three times in one consistent shape (hero,
holds, Lumo composition) instead of a card, a grid and a card. The
`.mh-ctx-grid` rule can be deleted once `/lumo` no longer uses it (it does
not, since today).

### E. Lumo's prompts as messages

Render the eight prompts with `YouBubble`, staggered in two columns, the
Lumo mark once at the top. They are the site's existing chat primitive and
they say "type this". The section's plan-045 contrast fix stays.

### F. Smaller things, batched

- `/career-context` "Every step makes it smarter" and "One record. Every
  output.": two thin ruled sections back to back, one inputs and one
  outputs. Merge into one split: **In** (apply, interview, talk it through)
  on the left, **Out** (resumes, packets, prep, decisions) on the right, one
  kicker `In and out`.
- `/integrations` Permissions rows and `/career-context` "Yours, and
  private" rows overlap (connected assistants see what you authorize;
  sponsors never see your record). Keep both lists, but the Career Context
  list drops to three rows and ends with the link `See exactly who can see
  what` → `/privacy-security`, which owns the full answer.
- `/job-search` "Four stages" columns: the stage names take the same icons
  the homepage strip uses (`Search`, `FileText`, `MessageSquare`,
  `ListChecks`), so the two pages read as one system.
- Every product page's meta description is a paragraph; two are over 200
  characters. Trim each to one sentence under 160.

---

## Order of work

1. Owner answers decisions 1 and 2.
2. A (heroes) and B (the shared strip), one PR: touches all five pages and
   `PageHero`; re-capture five routes' baselines deliberately.
3. C (photos) and D (the record grid), one PR.
4. E and F, one PR.

Every PR: `COPY.md` first where a word moves (A moves payoff lines, B
retitles bands, F merges two sections), `MarketingHome.test.tsx` and
`e2e/homepage.spec.ts` where a heading moves, both widths verified through
the repo's own Playwright harness, preview link with the five pages named.

## STOP conditions

- No new product state in any composition. Every chip, row and value is a
  string the product produces (`lumo-plan-builder` `origin/main`), the same
  contract plan 039 set. If a composition wants a value that does not exist
  in the product, it does not get invented.
- No numbers on `/layoff-support` beyond the ledger's (plan 041's day-count
  rule holds).
- Partner marks stay the only colour outside the Civic Modern palette.
