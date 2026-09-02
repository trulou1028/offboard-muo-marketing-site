# Plan 039 — Homepage visual audit, design rules, and the 1-2-3 narrative

> **Execute with:** Opus 5 · high effort — a homepage re-sequence plus new layout and chat compositions, all verified in a browser at two widths; copy drafts below need owner sign-off before they reach `COPY.md`, but no claim or compliance copy changes.

**Status: AUDIT DELIVERED, build NOT started.** Owner asked (2026-09-02)
for a section-by-section visual audit of the homepage that sets the
design rules for every page after it, plus a simpler homepage story:
build your context, connect it to the AI you use, run the search with
Offboard's tools. This document is the audit, the rules, and the build
plan. Nothing in it has shipped.

Audited at commit `a3c9eee` (`main`), desktop 1440 and mobile 390,
through the repo's own Playwright against `next dev` on this checkout.
Section heights at 1440: hero 764, wherever 798, context 1206,
more-than 1896, Lumo 624, toolkit 802, Pro 780, sponsor 614, belong 716,
community 546, final 543. Total page: 9,824px desktop, 17,096px mobile.

---

## Part 1 · What the page gets right (keep these)

- **The band rhythm holds.** No two adjacent sections share a background.
  Deep hero, mist, paper, sand, forest, paper, paper-soft, paper (with a
  forest inset), mist, paper-soft, deep. This is the strongest thing on
  the page and every rule below protects it.
- **Type is settled.** Newsreader headlines, Inter body, sentence case, the
  question-in-serif / answer-in-Inter device in "More than a job search".
  Do not touch the type scale in this plan.
- **Lime discipline works.** Lime shows only where the AI acts and on the
  two dark primaries. The hero and final CTA read as the two anchors.
- **Photography is good** and the chips on photos are real product actions.
- **Buttons, focus rings, and hover lifts** are consistent and tokenized.

The problems are composition problems, not token problems. The page is a
well-typeset stack of "copy block, then a grid" units. Eleven sections,
and eight of them follow that same shape. That is what reads as
"unfinished" even though every unit is individually correct.

---

## Part 2 · Section-by-section findings

Severity: **P1** = reads as broken or unfinished · **P2** = flat, missed
opportunity · **P3** = polish.

### 2.1 Hero (deep band)

| # | Finding | Sev |
| --- | --- | --- |
| H1 | The chat card is a literal white rectangle sitting on the photo's corner. It is a card, not a composition. Its bottom edge overhangs the photo by 40px so the visual column is 44px taller than it needs to be, and the card's right edge overhangs the container by 18px, which reads as a bug at 1440 rather than as intent. | P1 |
| H2 | Left column bottom-aligns nothing: headline, lead, buttons, trust line stack from the top and the visual is vertically centered against them, so the two columns' baselines never meet. | P2 |
| H3 | Two CTAs plus a trust line plus a photo chip plus a chat card: five competing focal points. The hero should have three (headline, one button, one visual). | P2 |
| H4 | The trust line "Join thousands of people" sits in 62% paper at 14px on deep green. Computed contrast is 6.4:1, which passes, but it is the least legible text on the page and it is the one social-proof line we have. | P3 |
| H5 | Mobile: the photo, then a second full card of chat, stacks to 1,262px before any second section. The chat card loses its shadow and becomes a bordered box, so the "floating" idea disappears exactly where most visitors see it first. | P1 |

### 2.2 Wherever you work (mist)

| # | Finding | Sev |
| --- | --- | --- |
| W1 | The chat is a literal four-message transcript in a bordered box (Louie's first screenshot). It is long, it is the tallest element in the section, and it carries the same weight as the headline. | P1 |
| W2 | The four capabilities under it are a 4-up hairline grid, the second "row of columns" on the page within 800px of the hero. | P2 |
| W3 | "Powered by Offboard Career Context" callout floats between the lead and the link with 8px above and roughly 60px below, so it attaches to nothing. | P3 |
| W4 | Mobile: the section is 1,684px, the chat alone is a full screen. | P1 |

### 2.3 Career Context (paper)

| # | Finding | Sev |
| --- | --- | --- |
| C1 | Eight identical white cards in a 4x2 grid. This is the page's most "template" moment: icon, bold label, two lines of grey, repeated eight times. The cards have hover lifts but link nowhere, so the affordance lies. | P1 |
| C2 | The forest inset under the grid repeats the section's own headline ("Your Career Context" after "One place that remembers your career") and holds the section's second CTA. Two CTAs for one idea. | P2 |
| C3 | Mobile: eight stacked cards run 2,508px. Nobody reads card seven. | P1 |

### 2.4 More than a job search (sand)

| # | Finding | Sev |
| --- | --- | --- |
| M1 | 1,896px tall on desktop. It contains a copy block, a photo triptych, a split (question + Path card), and a 3-column question grid with **five** items, so the second row has two items and an empty third cell (Louie's second complaint, same defect as `/career-context`'s three-in-two `.mh-route-card-grid`). | P1 |
| M2 | The triptych has no relationship to the questions under it. Three photos with chips, then a hard cut to the plan card. The photos are decoration here, which the design system forbids ("photography carries the feeling, product UI does the explaining"). One photo would do more. | P2 |
| M3 | The "What do I do first?" block is vertically centered against a 530px card, so it floats in empty sand with 190px above it. | P2 |
| M4 | The Path card is a light island on sand with a 1px line and no shadow, while the hero chat card has a shadow and no line. Two different "product UI on a band" treatments on one page. | P3 |
| M5 | Mobile: 2,896px; the third photo is hidden with `display: none` (fine) but the first two still cost 520px before the section's actual content. | P2 |

### 2.5 Meet Lumo (forest)

| # | Finding | Sev |
| --- | --- | --- |
| L1 | Five prompt pills of equal width and height in a column: a list styled as buttons that do nothing. Reads as a form. | P2 |
| L2 | This section and "Wherever you work" both say "use AI with your context". They are 2,900px apart and neither references the other. The narrative problem in Part 4 starts here. | P1 |
| L3 | The "Ask Lumo" button is ink on forest, which is the lowest-contrast button on the site (the design system's rule, but it reads as disabled next to the lime hero button). | P3 |

### 2.6 Toolkit (paper)

| # | Finding | Sev |
| --- | --- | --- |
| T1 | Four ruled columns with 3, 3, 2, 2 items, so the right half of the grid ends 180px above the left half. Ragged bottom, same family as M1. | P1 |
| T2 | Every tool is text. Ten product features and not one render, chip, or state. This is the section where "product UI does the explaining" should be strongest. | P2 |

### 2.7 Pro (paper-soft)

| # | Finding | Sev |
| --- | --- | --- |
| P1 | Free card has 5 lines, Pro has 6 longer lines, so Free's button sits 200px below its last bullet with nothing between. `margin-top: auto` pins the button but leaves the void visible. | P2 |
| P2 | Two primaries in one view: "Start free" (forest fill) plus the sticky header's "Build my plan" (lime). The one-primary rule is broken on every scroll position, not only here, because the header is fixed. Recorded, not fixed here; see Rule R9. | P3 |

### 2.8 Sponsored access (forest inset on paper)

Good section. The inset with a ruled list on the right is the best
"not a grid" layout on the page. Keep it as the reference for Pattern
D in Part 3. One polish item: the inset's 56/48px padding differs from
the Career Context inset's 48/56px. Pick one (Rule R7).

### 2.9 Built around you (mist)

| # | Finding | Sev |
| --- | --- | --- |
| B1 | The message is Career Context again ("Your career context should belong to you") with a third Career Context CTA ("Create my Career Context"). Three sections, three CTAs, one idea. | P1 |
| B2 | Portrait photo at 380px wide against a 760px text column is the page's best photo moment and it is spent on a repeat. | P2 |

### 2.10 Community (paper-soft) and Final CTA (deep)

Both fine. Community's ruled rows with a right-aligned link are a good
pattern (Pattern C). Final CTA is correct. No changes.

### 2.11 Cross-cutting

| # | Finding | Sev |
| --- | --- | --- |
| X1 | **Eight sections share the shape "copy block on the left or top, grid below or right."** Wherever, Context, More-than, Lumo, Toolkit, Pro, Sponsor, Belong. Only the hero, community, and final CTA break it. | P1 |
| X2 | **Four orphan grids across the site**: home `.mh-qgrid` (5 in 3), home `.mh-kit-grid` (3/3/2/2), `/career-context` `.mh-route-card-grid` (3 in 2, Louie's screenshot), `/how-it-works` `.mh-verified-grid` is 3 in 3 and fine. Rule R1 bans the shape. | P1 |
| X3 | **Section-top spacing is uniform** at 120px, so bands with a short single-column intro and bands with a 2,000px stack get the same air. The rhythm feels monotonous because it is. | P2 |
| X4 | **Every `.mh-copy-block` is left-aligned at the gutter with a right half empty** when the section is single-column (Context, More-than, Toolkit). At 1440 that is 480px of empty paper beside every intro. | P2 |
| X5 | **Mobile total is 17,096px.** Roughly 43 phone screens. The 1-2-3 re-sequence in Part 4 takes the biggest bite; the abstract chat compositions take the second. | P1 |

---

## Part 3 · Design rules to add to `DESIGN.md`

These are the "foundation for the rest of the pages" the owner asked for.
They go into `DESIGN.md` under a new heading **"Composition rules"** in
the same PR that implements Phase A below. Numbered so later plans can
cite them.

**R1 · No orphan cells.** A repeating grid must fill its last row. If the
item count does not divide by the column count, change the layout, not
the count: use a ruled list (Pattern C), a 2-column with a spanning
lead item (Pattern B), or a stepped layout (Pattern E). `repeat(3, 1fr)`
with 5 items, or `repeat(2, 1fr)` with 3, is a defect. A new e2e
assertion counts the children of every `display: grid` element with a
`repeat()` template and fails on a remainder.

**R2 · Product UI is a composition, never a screenshot.** Chat, tracker,
plan, and packet UI shown on the site is built from 2 to 4 overlapping
pieces on a soft-shadowed base, with at least one piece breaking the
base's edge. A single bordered white rectangle holding a transcript is
not allowed. The pieces come from the catalogue in Part 5. Depth is
`--mh-shadow-overlay`; there is still no third shadow tier.

**R3 · One idea, one section, one CTA.** A concept (Career Context, Lumo,
Offboard Everywhere) gets one section on the homepage and one button.
Repeat mentions elsewhere are a `.mh-section-link`, never a filled button.

**R4 · Vary the section shape.** No more than two consecutive sections
may share the same composition. The five compositions are: Split
(copy | visual), Stacked (intro then a full-width piece), Inset (a dark
card on a light band), Ruled (rows with hairlines), and Stepped (a
numbered sequence). A page plan lists the composition of every section
before build.

**R5 · Intros claim the width or share it.** A single-column
`.mh-copy-block` either caps at `max-width: 820px` **and** has something
in the right half (a visual, a number, a link cluster) or it spans the
full measure as a two-column intro (headline left, lead right, the
Community section's split). Empty right halves beside intros are a
defect at widths above 1180.

**R6 · Photos explain or leave.** One photo per section at most on
jobseeker pages, and it sits beside product UI or a question it answers.
Triptychs and photo strips are retired.

**R7 · Insets share one padding.** `--mh-inset-pad: 48px 56px` desktop,
`36px 28px` below 900. Both forest insets use it.

**R8 · Lists of features carry state.** A toolkit, capability, or
category item shows one real product state (a chip, a count, a status
pill) drawn from the catalogue, or it is a plain ruled row. No more
icon-plus-label cards that link nowhere.

**R9 · The fixed header's button counts as a primary.** On light bands
the section primary is forest; on dark bands it is lime; the header
button is always lime. A section never places its filled button in the
top 96px of the viewport at rest. (Recorded so the one-primary rule
stops being silently broken; no build work in this plan.)

**R10 · Mobile budget.** A homepage section may not exceed 1,400px at
390 wide. Each section's mobile height is measured in the visual suite
and asserted.

---

## Part 4 · The narrative: build, connect, run

### 4.1 The problem in one line

The page tells the Career Context story three times (sections 3, 9, and
the inset in 3), the "use AI" story twice (2 and 5), and puts the
benefits-and-plan story (4) between them. A first-time reader cannot say
what Offboard does in order.

### 4.2 The sequence

Three steps, named in the member's voice and answered in the product's
voice, per the design system's question/answer device:

1. **Build your Career Context.** Tell Offboard about your career once:
   resume, LinkedIn, projects, the stories you use in interviews. It
   becomes a living record you keep adding to.
2. **Connect it to the AI you already use.** Lumo, Offboard's own guide,
   already knows it. ChatGPT and Claude can read and update it (beta).
   Ask a question anywhere and the answer is about you.
3. **Run your search with Offboard's tools.** Decide which roles deserve
   your time, apply with tailored materials, prepare for interviews, and
   keep every application, contact, and deadline in one tracker. Your
   benefits and first-week plan sit beside the search.

### 4.3 Proposed section order

| # | Section | Composition (R4) | Band | Replaces |
| --- | --- | --- | --- | --- |
| 1 | Hero | Split, abstract chat composition (Part 5, Comp A) | deep | Hero |
| 2 | **The three steps** (new): a Stepped strip, three numbered items in one row, each with a one-line answer and a jump link to its section below | Stepped | paper | nothing, new |
| 3 | **Step 1 · Build your Career Context** | Split: copy left, a "record" composition right (Comp C: a context card with three source chips overlapping its top edge). Categories become a single ruled list of eight short rows under the copy, not eight cards | mist | Career Context + Built around you |
| 4 | **Step 2 · Connect it to the AI you use** | Split: copy left, chat composition right (Comp B: two bubbles overlapping a base card, a tracker chip breaking the corner, the three assistant marks along the top). The Lumo prompts become a single rotating prompt line under the copy, not five pills | forest | Wherever you work + Meet Lumo |
| 5 | **Step 3 · Run your search** | Stacked: two-column intro (R5), then a 2x2 of ruled groups (Decide, Apply, Interview, Organize) where each group carries one product state chip (R8), so 10 tools fill four equal cells | paper | Toolkit |
| 6 | **Beside the search: benefits and the first week** | Split: the Path card composition (Comp D) beside the "What do I do first?" question, then the remaining five questions as a **ruled list** (Pattern C), no grid | sand | More than a job search |
| 7 | Pro | Split, unchanged copy; equalize the cards by moving "Don't pay just to keep your job search organized" into the Free card as its footnote so both cards fill | paper-soft | Pro |
| 8 | Sponsored access | Inset, unchanged | paper + forest inset | same |
| 9 | Community | Ruled, unchanged | paper-soft | same |
| 10 | Final CTA | unchanged | deep | same |

Ten sections instead of eleven. Band rhythm check: deep, paper, mist,
forest, paper, sand, paper-soft, paper, paper-soft, deep. No two
adjacent match; two deep anchors (1 and 10); the forest band (4) has a
light band on both sides. Passes the design system's three rhythm
rules.

"Built around you" folds into Step 1 as its closing affirmation line
and its portrait photo becomes Step 1's one photo (R6), placed as a
small inset at the top-left of the record composition. The section's
copy does not disappear from `COPY.md`; it moves.

### 4.4 Draft copy (owner sign-off required before it enters `COPY.md`)

Every line below is new or moved and obeys the never-say list, no em
dashes, no promises of funding, eligibility, interviews, or placement.

**Three-steps strip**

- Kicker: `How Offboard works`
- 01 `Build your Career Context.` — `Tell Offboard about your career once. It becomes a record you keep adding to.`
- 02 `Connect it to the AI you use.` — `Lumo already knows it. ChatGPT and Claude can read it too.`
- 03 `Run your search with real tools.` — `Decide, apply, interview, and keep it all straight, with your benefits beside it.`

**Step 1 · Career Context** (band: mist)

- Kicker: `Step 1 · Build your context`
- H2: `One place that remembers your career.` (unchanged)
- Body: unchanged from today's Career Context body.
- Ruled list of the eight categories: names unchanged, each description trimmed to one line so the list reads at a glance.
- Closing affirmation (moved from Built around you): `Your experience. Your progress. Your context. Available when you need it.`
- CTA: `Build my Career Context` (the section's one button)
- Link: `Learn more about Career Context` → `/career-context`

**Step 2 · Connect** (band: forest)

- Kicker: `Step 2 · Connect it to the AI you use`
- H2: `Ask anywhere. The answer is about you.`
- Body: `Lumo is Offboard's own guide and works from your Career Context from the first question. Prefer ChatGPT or Claude? Connect Offboard and take your context with you.`
- Beta note (required by the facts ledger): `ChatGPT and Claude connections are in beta.`
- Prompt line (one at a time, cycling, no motion under reduced-motion): the five existing Lumo prompts, unchanged.
- CTA: `Ask Lumo` (the AI button, unchanged style)
- Link: `See how Offboard Everywhere works` → `/integrations`
- The chat composition uses the existing four-message Tesserac conversation, but shows only the last exchange in full; the first exchange is a faded bubble behind it (Part 5, Comp B).

**Step 3 · Run your search** (band: paper)

- Kicker: `Step 3 · Run your search`
- H2: `Everything you need when the next opportunity appears.` (unchanged)
- Lead (new, right column of the two-column intro): `Ten tools that read from the same context, so nothing is retyped and nothing is forgotten.`
- Groups and tool copy unchanged. Each group gains one state chip: Decide `Fit · Strong`, Apply `Packet · Ready`, Interview `Thursday · Prep done`, Organize `12 tracked`. **STOP:** every chip must be a state the product can actually show. Verify each against `lumo-plan-builder` `origin/main` before it ships; drop any that cannot be verified.

**Beside the search** (band: sand)

- Kicker: `More than a job search` (unchanged)
- H2: `Losing your job creates more than one problem.` (unchanged)
- Body: unchanged.
- The Path card and "What do I do first?" unchanged.
- The five remaining questions become ruled rows: question in serif on the left, feature label and one-line answer on the right.
- Small print unchanged.

Everything else on the page keeps today's copy verbatim.

---

## Part 5 · The abstract product compositions

Louie's inspiration screenshots show one idea: pieces of UI that
overlap, break each other's edges, and float on soft shadows, so the
eye reads "a product" rather than "a window." We take the overlap and
the depth. We do not take gradients, purple, glassy blur, or emoji, none
of which the system allows.

**Shared rules for every composition**

- A base card (`--mh-white`, `--mh-radius-card`, `--mh-shadow-overlay`),
  and 1 to 3 satellite pieces positioned absolutely, each breaking at
  least one edge of the base by 12 to 32px.
- Satellites are existing atoms only: `YouBubble`, `AiReply` (with its
  lime highlight), `TrackerCard`, `.mh-photo-chip`, a Path step row, an
  integration mark tile from `IntegrationLogos.tsx`.
- Two depths only. Base at overlay shadow; satellites at surface shadow
  when they sit over the base, overlay shadow when they sit over the
  band. No third tier (DESIGN.md rule stands).
- The composition has a fixed aspect box so nothing reflows around it.
  At 900 and below it collapses to the base card with satellites inside
  it, in flow, and keeps its shadow (today's mobile drop to a bordered
  box is the H5 defect).
- Content must be things the product does. Chips name real actions.
- Reveal: satellites rise 120ms after the base, using the existing
  `mh-rise` keyframe; nothing under reduced motion.

**Comp A · Hero.** Photo frame as today. The chat base card shrinks to
one exchange (the "Add it to Offboard" / "Done." pair) and moves so its
top-left corner overlaps the photo's bottom-right by about 120px, no
longer overhanging the container. The `TrackerCard` leaves the card and
becomes a satellite that breaks the card's bottom-right edge. The photo
chip stays.

**Comp B · Connect (Step 2).** Base card holds the last exchange of the
Tesserac conversation. Behind it, offset up and left by 24px and at 60%
opacity, a second card holds the first exchange, cropped. A row of three
marks (Lumo, ChatGPT, Claude) sits in a pill that breaks the base's top
edge. A `Saved · Ruben` contact chip breaks the bottom-right.

**Comp C · Record (Step 1).** Base card is a compact Career Context
record: name of the record, three category rows with counts. Three
source chips (`Resume`, `LinkedIn`, `Interview story`) fan across its
top-left edge, overlapping each other by 8px. The portrait photo from
today's "Built around you" sits behind the card's top-left as a small
4:5 frame.

**Comp D · Path (Beside the search).** Today's `StartingPlanPreview`
becomes the base. One step row (`Write down your key dates`) lifts out
as a satellite with a checked state, breaking the card's right edge, so
the composition shows a task being completed.

**Comp E · Toolkit chips (Step 3).** Not a composition; a rule. Each of
the four group cells shows one chip at its top-right (R8), so the 2x2
reads as four small product moments rather than four text columns.

---

## Part 6 · Layout pattern catalogue (the alternative to grids)

For the rest of the site, every "three things" or "five things" moment
picks from these, per R1 and R4:

- **Pattern A · Split** (`.mh-split`-style two columns, copy | visual).
- **Pattern B · Lead + pair.** First item spans the full width as a
  large row; the remaining two sit as a pair under it. Works for 3
  items. (Replaces `/career-context`'s three-in-two.)
- **Pattern C · Ruled list.** Rows with hairlines, title left, body and
  optional link right. Any count. (Community section is the reference.)
- **Pattern D · Inset with ruled aside.** Dark inset, copy left, ruled
  rows right. (Sponsored access is the reference.)
- **Pattern E · Stepped strip.** Numbered items in one row with hairline
  rules, 3 or 4 items, each the same width. (The new three-steps strip.)
- **Pattern F · Definition rows.** `<dl>` with label column and value
  column. (`/companies` facts list is the reference.)
- **Pattern G · Two-column intro.** Headline left, lead right, no grid.
  (Community's top half.)

New shared CSS: `.mh-steps` (E), `.mh-ruled` (C, generalized from
`.mh-community-rows`), `.mh-lead-pair` (B), `.mh-comp` and
`.mh-comp-satellite` (Part 5). All new tokens go in the token block
first; `npm run lint:css` will fail otherwise.

---

## Part 7 · Build plan

**Phase A · Rules and guards (docs + tests, no visual change).**
`DESIGN.md` gains "Composition rules" R1 to R10 and the pattern
catalogue. An e2e test (`e2e/composition.spec.ts`) adds the orphan-cell
assertion (R1) and the mobile section budget (R10), run against every
route. Expect it to fail on `/`, `/career-context` until Phase B lands;
mark those as known failures with a comment naming this plan.

**Phase B · Homepage re-sequence and compositions.** The order in 4.3,
the compositions in Part 5, the copy in 4.4 into `COPY.md` § 1 with the
decision log updated, drift and regression tests updated, `e2e/homepage.spec.ts`
updated for the new section order and the `#community` anchor kept (the
legacy redirect targets it). Visual baselines will move for every
homepage section; re-capture deliberately and say so.

**Phase C · Sweep the orphan grids elsewhere.** `/career-context`
`.mh-route-card-grid` (3 in 2) to Pattern B. Any other remainder the R1
test finds. Small PR, one route per commit.

**Order:** A, then B, then C. A can merge without an owner gate. B needs
the owner's go on the copy in 4.4 and on the preview. C follows B's
patterns and can merge on the preview alone.

**Verification (every phase):** `npm test`, `npm run build`, `npm run e2e`,
and a per-section screenshot at 1440 and 390 attached to the PR, taken
through the repo's Playwright against the branch's own server.

## STOP conditions

- Any chip, count, or state in Part 5 that cannot be verified against
  `lumo-plan-builder` `origin/main`. Drop it; do not invent product state.
- The beta note for ChatGPT and Claude leaves Step 2. It is a ledger
  requirement.
- A third shadow tier, a gradient, a blur backdrop wider than the
  existing photo chip's, or lime on a light surface. All out.
- The owner has not approved the 4.4 copy. Phase B does not merge.

## Decisions taken under stated assumptions

1. The "three steps" strip goes directly under the hero on paper, not
   inside the hero. Reason: the hero already has five focal points (H3);
   adding three more inside it makes it worse.
2. "Built around you" is folded, not deleted. Its copy moves into Step 1
   and its photo becomes Step 1's one photo. If the owner wants the
   portable-context promise as its own band, it returns as a short
   Pattern G intro above Pro.
3. The four-message Tesserac conversation stays in `COPY.md` unchanged;
   the composition shows two of the four messages in full. The drift
   test compares rendered text, so the hidden messages must still be
   present in the DOM (visually cropped, not removed).
