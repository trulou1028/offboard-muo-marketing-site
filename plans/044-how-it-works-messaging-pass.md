# Plan 044 — How It Works: the long form of the homepage's four steps

> **Execute with:** Fable 5.1 · high — every change is a copy decision on the one product page in the launch set; it touches the tool glossary, a verified-facts ledger row that is currently breached, and two SEO-load-bearing anchors.

**Owner ask (2026-09-07):** `/how-it-works` "feels disjointed from the homepage
and the overall messaging of the product." Review it and plan the fix.

Sources read: `COPY.md` §§ 1 and 2, § Language rules, § Tool glossary, the
verified-facts ledger; `plans/040-copy-narrative-audit.md`; the shipped
components in `MarketingSite.tsx` and `MarketingRoutePages.tsx`; the tool
names in `lumo-plan-builder` `origin/main` `src/config/navLabels.ts` (read
only, per the owner rule). This document changes no copy.

---

## The one-paragraph verdict

The owner is right, and the cause is on record. Plan 040 finding 1 named
"two spines": the homepage told a three-step Career Context story, How It
Works told a five-step plan story. The owner chose option B, and the homepage
was rebuilt around **four steps: Steady the first week · Build your Career
Context · Connect it to the AI you use · Run your search.** How It Works was
never rebuilt to match. It still ships five different steps, calls the plan
the spine where the homepage calls the record the spine, and **never says the
words "Career Context"** on a page that opens from a button under a hero
whose body is built on them. At launch it is the only product page a visitor
can reach, so the gap is now the first thing a curious visitor meets.

---

## Findings

### 1. Four steps on the homepage, five on this page, and they are not the same steps

| | Homepage (plan 040 round 5, shipped) | How It Works (shipped today) |
| --- | --- | --- |
| Count | Four | Five |
| 1 | Steady the first week | Tell us where you are *(onboarding questions)* |
| 2 | Build your Career Context | See your money clearly |
| 3 | Connect it to the AI you use | Claim what exists |
| 4 | Run your search with real tools | Get ready, then run the search |
| 5 | — | Close it, and make it count |
| What is the spine | The record ("Career Context") | The plan ("The plan is the spine. The tools are the muscle.") |
| Where AI sits | Step 3 of 4, with ChatGPT and Claude | One section near the bottom, Lumo only |

The hero's "See how it works" button lands on a page whose map does not
match the map the visitor just read. Neither story is wrong; plan 040 said
so, and the owner already picked which one wins.

### 2. The homepage's central noun is absent from this page

`Career Context` appears in the homepage hero body, step 2, the step-2 record
card, the plans band and the final CTA. It appears **zero times** in
`COPY.md` § 2 or in the page's shipped code. This page's noun is `plan` /
`transition plan` (hero, hero aside, meta title, meta description, FAQ 3, the
Free tier card). The hero aside states the opposite of the homepage's
premise: "The plan is the spine."

### 3. Three integrations stories, one of them a ledger breach shipping today

- Homepage step 3: Lumo, plus "Prefer ChatGPT or Claude? Connect Offboard and
  take your context with you", with the ledger-governed beta line.
- How It Works "Meet Lumo": Lumo only; the ChatGPT and Claude connections are
  never mentioned.
- How It Works "Your context, kept" integrations line: `Calendar · Gmail ·
  Drive · Slack (soon) · Notion (soon)`.

That last line ships **Gmail as live**. The ledger row "Live integrations"
(owner-confirmed 2026-09-01) has Gmail **in progress with no date**, and
does not list Slack at all. `MarketingSite.tsx` line 77 sets
`{ name: "Gmail", soon: false }`. This is a false claim on a launch page and
should be fixed ahead of the rest of this plan (step 0 below).

### 4. The toolkit is a different set, arranged a different way

The glossary already records that this page "lists a different set and must
not claim a number." It does not claim a number, but the divergence is
still visible to anyone who reads both pages:

| | Homepage / glossary "ten tools" | How It Works toolkit |
| --- | --- | --- |
| Structure | Four stages: Decide · Apply · Interview · Organize | One flagship + eight cards, no stages |
| Missing here | Role Fit, Company Intelligence, Cover Letters, Voice Practice | |
| Extra here | | Paperwork Review, Runway calculator, Funded Training, Ask Lumo |

The four extras are not search tools. Three belong to the first week
(money, benefits, paperwork) and one is Lumo, which is a step of its own.
They are on this page because the page had nowhere else to put them.

### 5. Step 1 is the wrong step, and this page holds the site's best first-week material

How It Works step 1 is the onboarding questionnaire. The homepage's step 1 is
the first week: deadlines, coverage, runway. This page's steps 2 and 3
("See your money clearly", "Claim what exists"), its verified-facts strip and
its "We never promise funding. We show you the exact path to find out." line
are the strongest first-week copy in the launch set, and `/layoff-support`,
the page that owns that story, is deferred. Until it returns, this page is
where that story has to live, under the homepage's own step name.

### 6. Vocabulary that lives only here

`money clock`, `benefit sheets`, `starting plan`, `the plan, start to finish`.
`Money clock` and `benefit sheet` are real internal concepts in the app
(read from `origin/main`: `SituationDialog.tsx`, `App.tsx`) but neither is a
public nav label; the app's public label is `Benefits`. `Starting plan` is a
marketing phrase from plan 016. None of the four appear on the homepage and
none are in the glossary. The onboarding visual's strings (`Where are you
right now?`, `I'm still employed, but at risk`) **are** real product state,
verified in `origin/main` today, and stay.

### 7. Doc and code have drifted on both pages (bookkeeping, same PR)

- `COPY.md` § 2 hero CTA reads `Build my free transition plan`; the code ships
  `Get started free` (plan 040 finding 3). The code is right.
- `COPY.md` § 1 still heads the strip "The three steps", numbers the sections
  Step 1 · Career Context / Step 2 · Connect / Step 3 · toolkit, and carries
  "with your benefits beside it" on the run-your-search line. The code ships
  four steps, Step 1 · Steady the first week through Step 4 · Run your search,
  and round 5's note says the clause was deleted. The code is right.
- `CopyDrift.test.tsx` did not catch either because it checks ledger figures
  and the never-say list, not section structure.

### 8. One section says what two others already said

"Your context, kept" restates the homepage's step 2 and this page's own hero
aside, then carries the integrations line from finding 3. Its eight chips are
the only part with a job, and they belong beside the Career Context step.

---

## What is working, and must survive the rewrite

- **The voice.** "Like a caseworker who answers in seconds, remembers
  everything, and never has a line." "The tools didn't go anywhere. Now they
  show up at the right moment." "We never promise funding. We show you the
  exact path to find out." Plan 040 flagged this register as the site's best
  and asked that it spread, not shrink.
- **Claim discipline.** FAQ 1 and FAQ 4 answer the eligibility and guarantee
  questions exactly right. The verified-facts strip carries the 4,000+ and
  the four live states from the ledger, and `CopyDrift.test.tsx` asserts
  4,000+ on this page; it must keep appearing here.
- **Human support** (the Concord office, "Talk to someone" → `/intake`) is
  on-brand for the office claim and is this page's only route to a person.
- **The onboarding visual** is real product state. It is a good picture of
  how the Career Context starts; it is a poor picture of "step 1 of the
  product", which is how the page uses it now.
- **Two anchors are SEO-load-bearing.** `next.config.ts` sends `/job-packet`
  to `/how-it-works#toolkit` and `/faq` to `/how-it-works#faq`, and
  `e2e/homepage.spec.ts` asserts the `#faq` landing. `id="toolkit"` and
  `id="faq"` survive whatever the sections around them become.

---

## The proposal: rebuild the page as the long form of the four steps

The homepage strip is titled "The short version." This page becomes the long
version, section for section, in the same order, with the same step names as
kickers. Every section keeps the homepage's `Step N · name` kicker so a
visitor who arrives from the strip can find their place.

**Section order:** Hero → Step 1 · Steady the first week (+ verified facts)
→ Step 2 · Build your Career Context (+ onboarding visual) → Step 3 · Connect
it to the AI you use (Meet Lumo + connections) → Step 4 · Run your search
(toolkit in four stages, `id="toolkit"`) → Human support → Product FAQ
(`id="faq"`) → Final CTA.

Draft copy follows. It is a draft for the owner to edit, not approved copy;
nothing below ships until it is in `COPY.md` § 2.

### Hero

- Kicker: `How it works`
- H1, two candidates for the owner:
  - **A.** `Four steps from "what just happened" to "what's next."` — keeps the
    page's best-known line and fixes the count. *(Recommended.)*
  - **B.** `One system that starts where you are.` — keeps today's opening
    shape, swaps `plan` for the homepage's `system` (hero body: "in one
    system").
- Body: `Whether you were laid off yesterday, have been searching for months, or are still employed and reading the room: steady the first week, build your Career Context, connect it to the AI you already use, and run your search from it.` *(names the four steps in order, so the reader has the map before the detail)*
- CTA: `Get started free` *(doc catches up to code)*
- Aside: `The spine and the muscle` / `Your Career Context is the spine. The tools are the muscle.` / `Every step adds to one record, and every tool reads from it. No blank pages, no starting over.` *(same shape, opposite subject, now agrees with the homepage)*

### Step 1 · Steady the first week

- Kicker: `Step 1 · Steady the first week` · H2: `See your money clearly, then claim what exists.` *(the two retired step titles, joined)*
- Body, from today's steps 2 and 3: `Your runway, how long you can go, beside the benefit deadlines that are coming and what each one is worth. Then step-by-step paths to unemployment benefits, health coverage, and state-approved funded training, with verified official links. We never promise funding. We show you the exact path to find out.`
- Rows, each a glossary tool with the one-line job it does here: `Runway calculator` · `Benefits` (the app's public label; owner to confirm whether `benefit deadlines` or `Benefits` is the noun) · `Funded Training` · `Paperwork Review` (`A read on your severance or offer paperwork before you sign anything.`, today's card copy)
- The verified-facts strip and the benefits render move up into this step. They are the evidence for the claim discipline the body makes.
- Small print: the independence line already on the homepage's step 1: `Offboard is independent, not a government agency, and claiming your benefits is always free.`

### Step 2 · Build your Career Context

- Kicker: `Step 2 · Build your Career Context` · H2: `A few questions. A record that's actually yours.` *(today's "Starting plan" H2 with the noun swapped)*
- Body: `Your situation, your state, your dates start it. Your resume, your LinkedIn, and the stories you tell in interviews fill it in. Offboard keeps one living record of your experience, applications, companies, conversations, documents, interviews, goals, and progress, so you never explain yourself from scratch again. Private by default, and you can change any of it.` *(the homepage step-2 list, verbatim nouns; the three sources are the homepage record card's chips)*
- Visual: today's onboarding composition, unchanged in its strings (they are product state). Its role is now "this is where the record starts", which is what it actually shows.
- Chips, from the retired "Your context, kept": *Adds context* `Your situation & state` · `Roles & resumes` · `Network`; *Improves next* `Applications` · `Interviews` · `Runway` · `Offers`. `Money clock` leaves the chip list (finding 6).

### Step 3 · Connect it to the AI you use

- Kicker: `Step 3 · Connect it to the AI you use` · H2: `An AI guide that knows your actual situation.` *(kept)*
- Body: today's Meet Lumo body, kept whole, with `your plan` → `your Career Context`: `Lumo works from your Career Context, your benefit facts, your runway, and your search, not a blank chat window. It paces with you: triage in week one, interview drills in month three. Like a caseworker who answers in seconds, remembers everything, and never has a line.`
- Trust line: kept verbatim.
- New, ledger-governed, the homepage's own sentence: `Prefer ChatGPT or Claude? Connect Offboard and take your context with you.` + `ChatGPT and Claude connections are in beta.`
- `Ask questions like`: the four questions, kept.
- The `Calendar · Gmail · Drive · Slack · Notion` line is retired from this page. The integrations story has a page (`/integrations`, deferred) and a ledger row; a five-word list that contradicts the row is worse than no list.

### Step 4 · Run your search

- Kicker: `Step 4 · Run your search` · H2: `The tools didn't go anywhere. Now they show up at the right moment.` *(kept)* · `id="toolkit"` *(kept; `/job-packet` lands here)*
- Lead: the homepage's `Ten tools that read from the same context, so nothing is retyped and nothing is forgotten.` — this page may now say the number, because it now lists the same ten.
- Structure: the homepage's four stages with their approved one-liners and the glossary names. **Decide** (`Role Fit` · `Ghost Job Checker` · `Company Intelligence`) · **Apply** (`Application Packets` · `Resume Tailoring` · `Cover Letters`) · **Interview** (`Interview Prep` · `Voice Practice`) · **Organize** (`Application Tracker` · `Career Context`).
- The flagship card stays: `Application Packet`, its body, its four chips and its render, placed as the lead of the Apply stage. The three product renders (resumes, interviews, applications) stay on their tools.
- Leaves this section: `Paperwork Review`, `Runway calculator`, `Funded Training` (to step 1) and `Ask Lumo` (step 3 is Lumo).
- The "interview prep & practice" composite card splits into `Interview Prep` and `Voice Practice`, each taking its glossary name, as the glossary note already anticipates.

### Human support · Product FAQ · Final CTA

Unchanged. FAQ keeps `id="faq"`. FAQ 3 says "build a broader transition plan"; owner may leave it (a plan is still a real thing the product builds: `Your Path`) or swap to "build your Career Context".

### Retired from this page

`FiveSteps` (the five-row section and its four tags), the `Your context, kept` section (chips move to step 2, the integrations line is dropped), the "plan is the spine" wording, and the `money clock` / `benefit sheets` / `starting plan` nouns. `StartingPlanSection` is folded into step 2 rather than deleted, so its visual is not orphaned.

### Metadata

- Title: `How Offboard works | Four steps after a layoff`
- Description: `Steady the first week, build your Career Context, connect it to the AI you already use, and run your search with real tools. Verified facts, one record, no starting over.`

---

## Owner decisions (STOP conditions)

1. **H1: A or B.** Nothing else on the page depends on it, but the tests pin it.
2. **Does this page carry the first-week depth while `/layoff-support` is deferred?** The proposal says yes (step 1 above). If no, step 1 shrinks to the homepage's two sentences and the verified-facts strip.
3. **The benefits noun.** `Benefits` (the app's public label), `benefit deadlines` (plain phrase), or keep `benefit sheets` and add it to the glossary as marketing-owned with the app-side concept named. Recommendation: the plain phrase; it needs no glossary row.
4. **Ship step 0 now, ahead of the rest?** Recommendation: yes, today.

## Order of work

0. **Hotfix, separate PR, Sonnet 5 · low:** `MarketingSite.tsx` line 77, Gmail `soon: true`; drop Slack from the list or add it to the ledger row (owner call; dropping is the safe default). Update `COPY.md` § 2's integrations line to match. One-line change, one visual baseline (`how-it-works` × 3, small enough that it may sit under tolerance; inspect directly, per the verification rules).
1. Owner answers the four decisions above.
2. `COPY.md` § 2 rewritten to the approved copy, § 1's stale headings fixed (finding 7), § Tool glossary's "must not claim a number" sentence updated to say the two pages now list the same ten.
3. Code: `MarketingRoutePages.tsx` `MarketingHowItWorks` composition; `MarketingSite.tsx` sections. Every section this page uses is consumed only by this page except `VerifiedFactsStrip` (shared with `/layoff-support`, deferred but still rendering) and `PageHero` (shared by eleven routes). Move, do not edit, those two. `src/app/how-it-works/page.tsx` metadata.
4. Tests, same PR: `MarketingHome.test.tsx` "gives how it works a five-step spine" and `e2e/homepage.spec.ts` "gives how it works its five-step spine" become four-step assertions on the new kickers and H2s; `CopyDrift.test.tsx`'s 4,000+ assertion must still pass (the strip moves, it does not leave); the `#faq` redirect assertion must still pass; `DeadSelectors.test.ts` will name every CSS class the retired sections leave behind, and those rules are deleted, not exempted.
5. Visual: `how-it-works` desktop/tablet/mobile re-captured deliberately. No other route should move; if one does, that is a shared section edited by mistake.
6. Preview link, with the homepage strip and this page open side by side as the thing to check.

**Effort:** M. One page, two files of code, one document, four tests.
