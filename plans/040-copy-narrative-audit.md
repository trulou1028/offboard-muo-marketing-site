# Plan 040 — Copy and messaging narrative audit (six pages)

> **Execute with:** Fable 5.1 · high — every finding below is a copy decision, several touch the category claim and the ledger, and two need the owner before any code moves.

Owner request, 2026-09-03: a copy and messaging narrative audit across the
homepage, How It Works, Career Context, Lumo, Job Search, and Employers.
Source of truth read: `COPY.md` §§ 1, 2, 5, 10, 12, 14, the language rules,
and the verified-facts ledger. This document is findings and recommendations.
It changes no copy. Fixes land in `COPY.md` first (copy law), then code.

---

## The one-paragraph verdict

Each page reads well on its own. Read in sequence, the site tells **two
different product stories**, names the **same tools two different ways**,
asks the visitor to click **five different primary buttons** that all go to
the same signup, and spells the assistant's name **two ways**. None of these
is a writing problem. All of them are a decision-not-yet-made problem, and
each one is visible to a visitor who reads two pages.

---

## P1 · Fix before the next page ships

### 1. Two spines: the homepage and How It Works describe different products

| | Homepage (v4) | How It Works |
| --- | --- | --- |
| The organizing idea | Build your Career Context → Connect it to your AI → Run your search | Five steps from "what just happened" to "what's next" |
| What is the spine | The record ("Career Context") | The plan ("The plan is the spine. The tools are the muscle.") |
| Benefits and money | A clause in step 3, then a "beside the search" section | Steps 2 and 3 of 5 (money clock, runway, benefit sheets, funded training) |
| AI | Step 2 of 3 | One section near the bottom |
| Vocabulary | Career Context, connect, ChatGPT, Claude, tracker | transition plan, Job Packet, Resume Studio, money clock, funded training explorer, paperwork review |

The homepage's "See how it works" button lands on a page whose vocabulary
never appeared on the homepage. Neither story is wrong. How It Works is the
pre-v2 "one plan" narrative and it is the warmest writing on the site. The
homepage is the v3/v4 "career context" narrative the owner chose in
September. **They have not been reconciled.**

This also surfaces the tension `COPY.md` § 13 names in its own words: the
Layoff & Benefits page exists because "without it the product pages drift
toward an AI job-search tool and away from the modern unemployment office."
The homepage H1 claims the office. The homepage's three steps describe the
AI job-search tool. The benefits story survives only as "with your benefits
beside it."

**Owner decision needed.** Three honest options:

- **A. The homepage spine wins.** Rewrite How It Works as the long form of
  Build → Connect → Run, and move "Five steps" copy to Layoff & Benefits,
  where its first-week content already belongs. Cheapest to reason about;
  loses the plan-as-spine framing everywhere except one page.
- **B. Four steps, not three.** Add a first step to the homepage strip:
  *Steady the first week* (benefits, coverage, runway) → Build → Connect →
  Run. The strip's card takes four cells cleanly (R1). Re-earns the H1.
  Costs one owner-approved headline and a fourth composition.
- **C. Leave both, bridge them.** Keep both stories and add one sentence to
  How It Works' hero that names the three steps, so the reader sees the map
  before the detail. Least work, does not resolve the drift.

Recommendation: **B.** It is the only option where the H1 and the steps say
the same thing.

### 2. The tools have two names each

Two tool lists ship today, and only the tracker survives the crossing intact.

| How It Works toolkit | Homepage / Job Search toolkit | Same thing? |
| --- | --- | --- |
| Job Packet | Application Packets | Yes |
| Resume Studio | Resume Tailoring | Yes |
| Ghost-job checker | Ghost Job Check | Yes |
| Interview prep & practice | Interview Prep + Voice Practice | Yes, split in two |
| Application tracker | Application Tracker | Yes, casing differs |
| Ask LUMO | Career Context (as a tool) | No |
| Paperwork review | — | Missing from home |
| Runway calculator | — | Missing from home |
| Funded training explorer | — | Missing from home |
| — | Role Fit | Missing from HIW |
| — | Company Intelligence | Missing from HIW |
| — | Cover Letters | Missing from HIW |

"Ten tools" is claimed on the homepage and Job Search. How It Works lists
nine, under different names. A reader who counts does not get ten twice.

**Fix:** a canonical tool glossary in `COPY.md` (one name, one casing, one
sentence each), then a sweep. The names on the app's own navigation should
win; verify against `lumo-plan-builder` `origin/main` before choosing.

### 3. Five primary buttons for one URL

| Page | Primary CTA label | Destination |
| --- | --- | --- |
| Nav (every page) | Build my plan | signup |
| Homepage | Get started free | signup |
| How It Works, Job Search, Layoff & Benefits | Build my free transition plan | signup |
| Career Context | Create my Career Context | signup |
| Lumo | Ask Lumo | signup |

`COPY.md` records "Get started free" as a homepage-only exception "until the
owner rolls the new one out." The exception has since spread into three more
labels. "Ask Lumo" as a signup button is the exact problem the owner removed
from the homepage in round 4 ("unclear where this would go"); it is still the
hero primary on the Lumo page.

**Owner decision needed:** one sitewide label. Recommendation: **Get started
free** everywhere, since it is the one the owner chose for the highest-
traffic page, and it makes no promise about a plan, a context, or a chat.
The nav button follows.

### 4. Lumo / LUMO

How It Works and Employers spell it **LUMO** (eight occurrences). Every other
page, the nav, and the product spell it **Lumo**. One casing, one sweep. The
DESIGN.md sentence-case rule already implies the answer.

---

## P2 · Fix in the next copy pass

### 5. "Career Context" is said four ways

`Career Context` (product noun), `career context` (homepage hero body,
Career Context page H1), `career record` (three-steps lead), `your record`
(Lumo, Job Search, Integrations). The product noun should be capitalized
every time it means the product, and "your record" is fine as the plain
pronoun for it. "career record" should go.

### 6. The three pillar pages share one rhetorical template

Career Context, Job Search, and Lumo each open with a three-column contrast
block, and two of the three end it with a column literally titled **"What
that changes."**

| Career Context | Job Search | Lumo |
| --- | --- | --- |
| What a resume holds | Ten tools, ten starting points | Pasting a resume into a chat |
| What your career holds | One system, one record | Asking Lumo |
| What keeps getting lost | What that changes | What that changes |

A visitor who reads two pillars feels the template. Keep the device on one
page (Career Context, where the resume contrast is strongest) and give the
other two a different opening move: Job Search could open on the loop (it is
the page's real argument), Lumo on the eight things it knows.

### 7. Career Context says "a resume is not your career" three times before saying anything new

Hero body, then "A resume is a fraction of your career." H2, then that
section's body, all restate the same idea in the same words as the
homepage's Step 1. Cut the hero body to one sentence and let section two
carry the argument. The page gets to "Bring what you already have" a full
screen sooner.

### 8. One H2 ships on two pages

"Offboard holds the record. You choose the interface." is the H2 of the
Integrations showcase and of Career Context's "Works with the AI you already
use" section. Good line; one home. Keep it on Integrations, where it titles
the grid, and give Career Context's section its own.

### 9. The Employers FAQ answers five questions the page already answered

Q1 restates the price card. Q2 restates step 2. Q3 restates the pull-quote.
Q4 restates the price card again. Q5 restates step 3. A FAQ that repeats the
page trains the reader to skip FAQs. Cut to the two that add something the
page does not say (there are none today; write two, e.g. *Can we sponsor
people who already left?* and *What happens after the 90 days?*), or drop the
section and let the contact band close.

### 10. Lumo's "What it knows" re-lists Career Context's "What it holds"

Applications, companies, interviews, goals appear in both eight-card grids.
Expected overlap, but the Lumo page could say *It knows everything in your
Career Context* once, link, and spend its eight cards on what is unique to
Lumo (your plan, benefits context, previous conversations, your pace).

---

## P3 · Nits, batch them

- Homepage hero body lists five nouns ("job search, benefits, applications,
  career context, and next steps"). "Applications" is inside "job search."
  Three nouns read faster.
- How It Works step 5 "keep your career ledger" introduces a fifth name for
  the record. Delete "ledger."
- Job Search hero says "the interview you just finished"; the page's own
  loop ends at "Record what happened." Align the hero to the loop's last
  step or the loop to the hero.
- Employers pull-quote "Not the CEO, not HR, nobody." is the best sentence on
  the page. It is buried third. Consider leading the section with it.
- The homepage "Join thousands of people" trust line is ledger-approved but
  is the only social proof on six pages. Not a copy defect; a gap.

---

## What is working, and should be protected

- **How It Works has the site's best voice.** "Like a caseworker who answers
  in seconds, remembers everything, and never has a line." "The plan is the
  spine. The tools are the muscle." Whatever spine decision the owner makes,
  this register should spread to the pillar pages, which run cooler ("the
  structured, continuously updated state of your career").
- **Claim discipline holds.** Across six pages, no promise of funding,
  eligibility, interviews, or placement. The independence line appears where
  benefits do. "We never promise funding. We show you the exact path to find
  out." is used verbatim. The FAQ on How It Works answers the eligibility
  question exactly right.
- **The "modern unemployment office" claim is used where it should be** (home
  H1, Employers body) and stays off the pages it must (none of the six is
  `/act`).
- **Employers earns "outplacement"** and uses it as the buyer's word, with
  the price comparison doing the persuading. The page's structure is the
  clearest of the six.
- **Round 4's inversion held.** The homepage names the ten tools, Job Search
  describes them, and the copy matches line for line.

---

## Order of work

1. Owner decides **#1 (spine)** and **#3 (CTA label)**. Nothing else should
   move first; both change headlines on multiple pages.
2. **#2 tool glossary** in `COPY.md`, verified against the app repo. One PR,
   with the `CopyDrift` fixtures.
3. **#4 Lumo casing**, **#5 Career Context casing**, **#8 duplicate H2**, and
   the P3 nits, as one mechanical sweep PR.
4. **#6, #7, #9, #10** as one "pillar pages second draft" PR, owner reviews
   the new openings on Job Search and Lumo.

Every step is a `COPY.md` change first, and every PR updates
`MarketingHome.test.tsx` / `e2e/homepage.spec.ts` where a headline moves.
