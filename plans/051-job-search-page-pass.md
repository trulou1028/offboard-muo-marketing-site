# Plan 051: `/job-search` earns the link the homepage now sends it

> **Execute with:** Fable 5.1 · high — the page will say which packet steps are free and which are Pro (pricing claims, ledger-governed), it ports the packet's step list from the app, and it retires the one section the page has, so a wrong judgment ships a thinner page than today.

## Status

- **Status:** PLAN WRITTEN 2026-09-11. Owner review of the three decisions below, then execute.
- **Priority:** P1. The homepage's Step 3 now sends every reader who wants detail here ("See what each tool does"), and the page is not ready for them.
- **Effort:** M. One new band, one rebuilt band, one new FAQ, copy law, tests, baselines.
- **Risk:** MED. Claims about what is free. No route, nav or redirect change.
- **Depends on:** PR #90 (Step 3 rows, merged) for the row pattern this plan reuses. PR #91 (shared closing band) for the final CTA.
- **Source of truth for the app facts:** `lumo-plan-builder` `origin/main` at `1d3ef74c9`: `src/components/job-packet/packetSteps.ts` (the six packet steps and which cost credits), plan 292 (the app's coming `/search-tools` page groups tools Decide · Apply · Interview · Organize, the same four the site uses).

## What is wrong with the page today (audited 2026-09-11 at 1440px, full page 3,153px)

1. **It is one section.** Hero, "Four stages", the shared Also strip, the closing band. `/lumo` has three bands between hero and strip, `/layoff-support` has six, `/career-context` four. A reader who clicked "See what each tool does" gets one screen of detail and a goodbye.
2. **"Four stages" is the layout the owner just rejected on the homepage.** `.mh-kit-grid` is four equal columns with 3/3/2/2 tools, so Interview and Organize end a full tool short of Decide and Apply, and the ten descriptions sit as 14px grey text under 15px bold names. PR #90 replaced this shape on the homepage with numbered full-width rows for exactly these reasons; this page still has the old one.
3. **The section lead talks about the website.** `The same ten tools the homepage names, described.` A reader does not care what the homepage names. The stage rows also repeat the homepage's four decision lines word for word, which is fine for the names but leaves the section with no idea of its own.
4. **The flagship is never shown working.** The Application Packet is the product's best argument ("one job link becomes a full packet", the app's own framing) and the thing Free includes one of. The hero composition shows a finished packet card; nothing on the page shows the six steps it runs, which are free, or the `Ready for review` state the homepage chip already promises. `/how-it-works` (deferred, hidden) has a flagship Application Packet block that belongs here.
5. **No plain answers.** `/lumo` and `/layoff-support` close their argument with a Straight answers band. This page has nothing for "does it apply for me", "is it a job board", "what does free include".
6. **The photograph has no job.** The kitchen-table photo sits beside the "Four stages" intro because plan 046 wanted a photograph per page. It illustrates interview prep, one of ten tools, next to a heading about all four stages. R6: photos explain or leave.
7. **One copy-law drift.** COPY.md § 14 says the hero CTA is `Build my free transition plan`; the code ships `Get started free` (the sitewide label since plan 040). The code is right; the doc lags.

## Target page (section order)

| # | Band | Colour | What it does |
|---|---|---|---|
| 1 | Hero | deep | Unchanged: `A job search that works as one system.` and the packet composition. |
| 2 | **The Application Packet** (new) | paper | The flagship, shown working. Kicker `One job link becomes a full packet`. H2 `Paste the posting. The packet does the rest.` The six real steps as numbered rows (the PR #90 row pattern): `Company Intel`, `Role Match`, `Ghost Check`, `Tailored resume`, `Cover letter`, `Path to a person`, each with its one-line app description, and a chip on the three Pro steps reading `Pro` and on the others `Free`. Closing line: `Your first packet runs every step free.` (ledger: Free includes one complete packet, plan 047). Visual: the `/how-it-works` flagship render `renders/toolkit-job-packets.webp` moves here; `/how-it-works` keeps its copy of the block until that page is retired. |
| 3 | **Four stages** (rebuilt) | mist | Same content, new shape: the four stage rows from PR #90, with each tool as a name plus its sentence (pills carry no sentence, so this page uses a two-line list inside the tools cell rather than pills). Lead rewritten for the reader: `Every tool reads from your Career Context and writes back to it, so the tenth application starts further ahead than the first.` The kitchen-table photo leaves this section (decision 2). |
| 4 | **Straight answers** (new) | paper | Four questions, the site's disclosure pattern. Draft answers below; every one is a claim and the executor verifies each against the app before shipping. |
| 5 | Also part of the system | sand | Unchanged. |
| 6 | Closing band | forest | Unchanged (shared component, PR #91). |

Band rhythm: deep, paper, mist, paper, sand, forest, footer. No band beside itself.

### Straight answers, draft (verify each; drop any the app cannot back)

- `Is Offboard a job board?` — `No. Bring a posting from anywhere: a board, a referral, a recruiter's email. Offboard reads it, checks it, and builds the application. It does not list jobs.` *(Verify: the app's Jobs page (`/jobs`, plan 292 calls it "Curated roles without the ghost postings") may contradict "does not list jobs". If the app lists roles, the answer changes to say so.)*
- `Does it apply for me?` — `No. It builds what you send and keeps it with the role. You send it, and you decide what goes out under your name.`
- `What does free include?` — `One complete Application Packet with every step, then the assessment on every packet after that: is it real, who is the company, how you fit. Tailored materials on later packets are Pro.` *(Straight from the plan-047 pricing deck; the executor re-reads `/pricing` copy and matches it word for word where it overlaps.)*
- `Where does the tracker get its information?` — `From the packets you build and the notes you add. Nothing is scraped from your inbox; the Gmail connection is not live.` *(Ledger row "Live integrations": Gmail pending Google verification. Say nothing that implies otherwise.)*

## Copy that changes (COPY.md § 14 first, same PR)

- Section 2 strings above, all new.
- Section 3 lead: `The same ten tools the homepage names, described. Every one reads from your Career Context and writes back to it.` → `Every tool reads from your Career Context and writes back to it, so the tenth application starts further ahead than the first.`
- Hero CTA entry corrected to `Get started free`.
- Meta description: unchanged (it already names the four stages).
- The ten tool sentences: unchanged. The six packet step descriptions come from the app verbatim (`Research the company`, `Score your fit for the role`, `Is this posting real and active?`, `Adapt your resume to this job`, `Draft a cover letter`, `Find someone to reach out to`), sentence case, no em dashes.

## Steps

1. **Pin the facts.** Re-read `packetSteps.ts` on `origin/main`; confirm six steps and which carry a credit cost (today: Ghost Check, Tailor Resume, Cover Letter, Path to a Person are Pro; Company Intel and Role Match are free). Re-read `/pricing` copy for the Free line. If either differs from this plan, the plan yields.
2. **COPY.md § 14.** New sections, rewritten lead, corrected CTA, changelog row.
3. **Build band 2.** New `PacketSteps` component in `MarketingJobSearch.tsx` using the `.mh-stage-strip` row pattern (or a sibling class if the chip semantics differ; no new colours, no new tokens). Move the flagship render.
4. **Rebuild band 3.** Replace `.mh-kit-grid` with rows. `.mh-kit-grid`, `.mh-kit-col`, `.mh-kit-tool`, `.mh-kit-decides` lose their only consumer: delete them or `DeadSelectors.test.ts` fails. Remove the photograph from this section (decision 2).
5. **Build band 4.** `FaqSection` already exists (`/how-it-works` uses it); reuse with the four verified questions.
6. **Tests.** `MarketingHome.test.tsx` route test for `/job-search`: the six packet step names in order, the `Free`/`Pro` chips count (2 free, 4 Pro), the four FAQ questions. `e2e/homepage.spec.ts`: extend the "nothing escapes #run" geometry check to this page's rows. `CopyDrift`: the packet step strings.
7. **Verify.** `npm test`, `npm run lint`, `npm run lint:css`, `npm run typecheck`, `npm run build`, `npm run e2e`. Re-capture `/job-search` at three widths after inspecting each. Read `.github/workflows/ci.yml` and confirm every command ran.
8. **Hand over.** Push, PR, `node scripts/preview-url.mjs`. What to look at: the packet band with two Free and four Pro chips; the four stage rows; the FAQ; the photo gone.

## Decisions for the owner

1. **Show Free/Pro on the packet steps here, or keep price talk on `/pricing` only?** Recommended: show it (a reader deciding whether to sign up wants to know the first packet is free; the chips are the honest version of "every step free"). Alternative: rows without chips and one line that says the first packet is free.
2. **The kitchen-table photograph.** Recommended: it leaves the page; the packet render and the hero composition are the page's two visuals (R6). Alternative: it moves beside the FAQ as the page's one photograph.
3. **The Straight answers band.** Recommended: ship it with whichever of the four answers survive verification (at least two will). Alternative: skip it this round.

## STOP conditions

- `packetSteps.ts` on `origin/main` lists different steps or costs than step 1 records.
- Any answer in band 4 cannot be traced to app code or a COPY.md ledger row.
- A Free/Pro chip disagrees with `/pricing` copy.
- `DeadSelectors.test.ts` red for a class this plan did not name.

## Done criteria

- `/job-search` has the packet band, the stage rows, and the FAQ; the old four-column grid and its CSS are gone.
- COPY.md § 14 matches the DOM; drift test green.
- Every CI command green; `/job-search` baselines re-captured after inspection.
- Preview URL handed over; merge on the owner's go.
