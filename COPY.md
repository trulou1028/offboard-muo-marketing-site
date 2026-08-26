# The Modern Unemployment Office — Marketing Site Master Copy

**This document is the single source of truth for all copy and content on the
Offboard marketing site (offboard.co).** Every headline, body paragraph, FAQ,
CTA label, disclaimer, and metadata string on the site appears here, verbatim,
in page order.

- **Version:** 1.0 · 2026-08-24 · matches `main` @ `2d56c7b` (Series-2 merge, PR #17)
- **Owner:** Louie / Steph
- **Siblings:** [DESIGN.md](DESIGN.md) is the design source of truth; this file
  is the copy source of truth. [docs/site-architecture.md](docs/site-architecture.md)
  owns page roles and section ordering; [docs/content-roadmap.md](docs/content-roadmap.md)
  owns future `/resources` article strategy.

## The rule

**Copy changes land in this document first, or at minimum in the same PR as
the code change.** A PR that changes user-facing copy without touching COPY.md
is incomplete. When this doc and the code disagree, that is a bug: fix
whichever one is wrong and say so in the PR.

**Branching for copy tests:** create a branch named `copy/<experiment>` (e.g.
`copy/hero-headline-b`), edit COPY.md and the implementation together, and
record the experiment and its outcome in the Decision Log below when it
resolves. The A/B variants that already exist on record are listed in
§ Approved alternates.

**Where copy lives in code** (so drift is checkable):

| Content | File |
| --- | --- |
| All shared sections, FAQs, nav, footer | `src/components/marketing/homepage/MarketingSite.tsx` |
| Per-route page compositions and route-only sections | `src/components/marketing/homepage/MarketingRoutePages.tsx` |
| Homepage composition | `src/components/marketing/homepage/MarketingHome.tsx` |
| Article registry (titles, excerpts, categories, guest authors) | `src/content/resources/registry.ts` |
| Article bodies (11 ported, verbatim from legacy site) | `src/content/resources/posts/*.tsx` |
| Page metadata (titles, descriptions) | `src/app/*/page.tsx` |
| Intake form copy | `src/components/marketing/intake/IntakeForm.tsx` |
| Redirect map | `next.config.ts` |
| Copy regression tests (update in the same PR as any copy change) | `src/components/marketing/homepage/MarketingHome.test.tsx`, `e2e/homepage.spec.ts` |

`src/components/marketing/homepage/CopyDrift.test.tsx` enforces this document
against shipped copy in code. It checks that the ledger's load-bearing
figures actually appear on the pages listed in the Appears on column, and it
sweeps the never-say list and its scoped exceptions over the rendered text of
every page named in the sweep. A failing drift test means this doc and the
site disagree: fix whichever one is wrong, in the same PR.

**This doc supersedes** the three prior sources of truth, which remain
upstream references but are no longer canonical for shipped copy:
the app repo's `documentation/strategy/landing-page/landing-page-v7-modern-unemployment-office.md`
(landing page v7), `documentation/product/specs/marketing-site-v2-modern-unemployment-office.md`
(the v2 site spec), and the sales kit
(`documentation/sales/engine-a-prep-kit/`, `act-pilot-sales-playbook/`,
`gift-pro-sponsorship-playbook/`). New substance is still sourced from those
docs and the owner — this doc records what actually ships.

---

## Language rules

From the v2 spec §3, enforced by plan 009's sweep and the test harness.

| Say | Never say |
| --- | --- |
| laid off · unemployment · what you're owed | career transition services / support |
| your plan · the modern unemployment office | platform · infrastructure · solutions |
| tools · your guide (LUMO) | modules · workspace · agents · career memory |
| benefits, deadlines, runway | transition intelligence |

**Scoped exceptions:**

1. **"Outplacement"** is allowed in exactly two contexts, and nowhere else:
   - **`/employers`**, throughout. It is the term buyers search and budget
     against.
   - **Sponsored-tier copy, wherever the Sponsored tier is described.** Today
     that is the homepage pricing teaser and the `/pricing` deck, which both
     render "Outplacement, modernized. Your former employer, school, or
     workforce organization may cover your access." (Owner decision
     2026-08-21, see the decision log.)

   It must not appear in jobseeker narrative copy: `/how-it-works`, `/about`,
   `/act`, `/resources`, `/public-partners`.
2. `/act` may say **"career transition"** and **"workspace"** — ACT's approved
   agency-facing vocabulary. It never leaks to any other page.

**Banned on `/act` specifically** (B2G language firewall): the category claim
"the modern unemployment office" never appears on government/public-sector
surfaces; also banned: "guaranteed jobs", "government-endorsed",
"case management replacement", "benefit eligibility system",
"Official Alameda County program". Alameda County may be named as
**geography only** (owner approval 2026-08-23), never as endorser, sponsor,
or operator.

**Style rules:**

- **No em dashes in site copy** (DESIGN.md rule). Use commas, colons, periods.
  Exception: ported article bodies and registry excerpts are editorial
  content ported byte-faithful from the legacy site and keep their original
  punctuation.
- No promises of funding, eligibility, interviews, offers, or placement,
  ever. The approved formulation: "We never promise funding. We show you the
  exact path to find out."
- The independence disclaimer appears near any benefits-adjacent content.
  Canonical short form: *"Offboard is independent, not a government agency,
  and claiming your benefits is always free."*
- One primary CTA per view. Sitewide primary CTA: **Build my free transition
  plan** → `https://app.offboard.co/auth?tab=signup`.

## Verified-facts ledger

Every load-bearing number on the site, with its status. Change a number here
and everywhere it appears in the same PR.

| Fact | Value | Status | Appears on |
| --- | --- | --- | --- |
| Newsletter subscribers | **5,000+** | Owner-corrected 2026-08-01 (verified 5,200; "8,000+" is stale and banned) | Home, About |
| CalJOBS training extension example | **~$12,000**, contact EDD before **week 16** of benefit payments, California | Always shipped with conditions + "amounts vary" small print | Home |
| Job centers | **"2,000+ job centers"** and **"billions of dollars a year"** | The only approved public phrasings; precise figures (~$3.2B WIOA, ~2,300 AJCs) require re-verification before any cited use | Home |
| State-approved training programs (CA) | **4,000+** | From v7, owner-shipped | Home, How it works |
| Live verified states | **CA** (deepest), NY, NJ, WA | | Home, How it works |
| Employer seat price | **$199 per employee, one-time**; **$169 per seat at 50 or more**; card or NET-30 | Owner-approved for public display 2026-08-23. Must stay in sync with the app-repo sales one-pager | Employers (+ metadata) |
| Legacy outplacement comparison | **$3,000 to $7,000 per head**; most firms will not take a layoff under 50 people | From the prospect-facing one-pager | Employers |
| Sponsored access duration | **90 days of full Offboard Pro** | | Employers, ACT |
| Consumer tiers | **Free $0 forever · Pro $20/month** · 30 / 300 monthly credits · 3 LUMO messages/day on Free · first Job Packet free | Owner-confirmed 2026-08-21 | Home, Pricing |
| Gift Pro prices | 1 mo $20 · 3 mo $54 · 6 mo $99 | **Not yet on site** (plan 015 unexecuted); see § Approved but unshipped | — |
| SB 617 (California WARN-notice statement) | Shipped verbatim from the founder's public LinkedIn post | **Owner to re-verify the statute stays current**; drop the aside if stale | Employers |
| ACT suggested pilot shape | One jurisdiction or cohort · 25 to 100 residents · 3-month sponsored access · first review after 30 days | "Suggested", never a claim about actual participation | ACT |
| Office location | Concord, California | | About, How it works |

## Canonical positioning

- **One-liner** (v2 spec, use when a single sentence must carry the whole
  pitch): *"Offboard is the modern unemployment office — one calm place to
  claim what you're owed, make your money last, and land what's next."*
  (Site copy renders the em dash as a colon.)
- **The three jobs** every section ladders into: Claim what you're owed ·
  Make your money last · Land what's next.
- **Trust pillars** (supporting, never the headline): facts verified by
  people, never generated · private, sponsors see aggregates only · free to
  start · LUMO works from your real situation.

---

# Site chrome (all pages)

**Header nav** (5 links + actions): How it works `/how-it-works` · Pricing
`/pricing` · Guides `/resources` · About `/about` · For employers `/employers`
· Sign in → `https://app.offboard.co/auth?tab=signin` · **Build my plan**
(primary) → signup. `/act` and `/public-partners` are deliberately out of nav.

**Footer**

> **Offboard**
> Offboard is an independent company, not a government agency. We help you navigate the official programs. Your benefits are yours, and claiming them is always free. Information provided by Offboard is general and does not replace guidance from government agencies or qualified legal, tax, financial, or healthcare professionals.

Columns — **Product:** How it works, Pricing, Guides · **Partners:** For
employers, For public partners · **Company:** About, Visit us (`/intake`),
Contact (`mailto:hello@offboard.co`) · **Legal:** Privacy, Terms
(app.offboard.co).

> © 2026 Offboard · Independent support for life after a layoff

---

# 1 · Homepage `/`

**Meta title:** `Offboard | The modern unemployment office`
**Meta description:** `Offboard is the modern unemployment office: one calm place for your benefits, deadlines, runway, funded training, and next job. Verified facts, AI guidance, and a plan that starts where you are. Independent, not a government agency.`

Section order: Hero → Problem → Identity contrast → Three jobs → Hook ($12k) →
Connected plan → Verified facts → Pricing teaser → Employer strip → Community
→ Privacy summary → Final CTA.

### Hero

- Kicker: `For the moment work stops`
- H1: `The Modern Unemployment Office`
- Body: `Your layoff comes with help nobody tells you about. Offboard turns the weeks after it into one calm plan: the benefits you can claim, the deadlines that matter, how long your money lasts, and what to do next, with tools that help you execute every step.`
- CTAs: `Build my free transition plan` (primary) · `See how Offboard works` → `/how-it-works`
- Small print: `No credit card required. Benefit facts are verified by people, never generated by AI. Offboard is independent, not a government agency, and claiming your benefits is always free.`
- Photo note cards: `Protect my runway / Priorities first` · `Plan my next move / One connected plan` · pill `Official sources only`

### The real problem

- Kicker: `The real problem`
- H2: `Most people find out what they were entitled to when it's too late.`
- Body: `A layoff comes with a system attached: unemployment benefits, health-coverage windows, severance review periods, and billions of dollars in federal training money. Nobody markets it, the paperwork is hostile, and the deadlines expire silently while you're busy rewriting your resume.`
- List label: `The questions behind every layoff`
  1. `What am I actually entitled to?`
  2. `How long will my money last?`
  3. `Is my severance agreement normal?`
  4. `What happens to my health insurance?`
  5. `Could I get paid to retrain?`
  6. `When do I really need to be back at work?`

### Identity contrast *(added by plan 011 — where the headline earns itself)*

- Kicker: `Why "unemployment office"`
- H2: `There's an office for this moment. It just hasn't been modern until now.`
- Body: `The system that catches you after a layoff is real: unemployment insurance, health-coverage windows, and billions of dollars a year in federal retraining money, delivered through 2,000+ job centers. It's also fifty different portals, hostile paperwork, and deadlines that expire silently. Offboard is the modern layer on top: one calm place that knows how the whole system works, watches your clocks, and walks with you to the next job. One situation. One plan. One clear next move.`
- Ledger (columns `The old office` / `The modern one`):
  1. `You find out what you were owed after the deadline passes.` → `Your entitlements, dollar amounts, and deadlines surface on day one.`
  2. `Paperwork written for the agency. Hold music for you.` → `Plain-language steps with verified official links.`
  3. `A weekly check, then you're on your own.` → `Money, paperwork, and the job search connected in one plan.`
  4. `Closes at 4 p.m.` → `Open whenever you are, with a guide that knows your situation.`
- Small print: `Offboard is independent and not affiliated with any government agency. We help you navigate the official programs. Your benefits are yours, and claiming them is always free.`

### The three jobs

- Kicker: `The three jobs` · H2: `A layoff gives you three jobs at once.`
- Intro: `Claim the support that exists. Make your money last. Land what comes next. Offboard connects all three in one plan.`
- Cards:
  1. `Claim what you're owed` — `Unemployment benefits, health-coverage windows, severance review, and state-approved funded training, with the deadlines watched.`
  2. `Make your money last` — `Your runway beside your money clock: which benefit deadlines are coming and what each one is worth.`
  3. `Land what's next` — `Job Packets, resume tailoring, interview prep, and application tracking, kept connected in one search.`
- Image pills: `01 Claim` · `02 Money` · `03 Next role`
- Link: `Explore the full plan` → `/how-it-works`

### The hook band ($12k example)

- Kicker: `One example`
- H2: `There is a deadline worth roughly $12,000 that most people have never heard of.`
- Body: `If you were laid off in California, you may be able to keep your unemployment benefits while you train full-time, including an extension worth roughly $12,000. But only if you contact EDD before week 16 of your benefit payments. Most people have never heard of it. Offboard watches that clock for you.`
- Small print: `Amounts and timing vary by situation. We never promise funding, we show you the exact path to find out.`
- Money-clock card (labeled sample, never dynamic): `Benefit payments · Sample · CA · Week 12 of 16 · Now · week 12 / Deadline · week 16 · ~$12,000 at stake · 4 weeks left to contact EDD`

### One connected plan

- Kicker: `One connected plan`
- H2: `One place for the decisions, deadlines, and opportunities ahead.`
- Body: `Offboard brings the practical work of a transition into one place, so you can spend less time rebuilding context and more time taking the next useful step.`
- List: `01 A starting plan organized around your situation` · `02 One place connecting each role, application, and next step` · `03 Possible support with official sources and clear follow-through`
- CTA: `See how Offboard works` → `/how-it-works`
- Plan-preview card *(rebuilt in plan 018 phase 3 from real product state; every string below is verbatim from `lumo-plan-builder` `origin/main`)*: heading `Your Path` · lede `The steps that fit your situation. Do them in any order.` · stage row `Protect the first week` / `3 left` · steps `Write down your key dates` — `Most post-layoff mistakes are missed deadlines.` · `Understand your COBRA / health insurance options` — `A gap in health coverage can be financially devastating.` · `Secure your accounts and access` — `Paystubs, tax docs, benefits, and equity portals often live behind work logins that disappear without warning.` · `Show 2 done`
  - **Retired with this rebuild** (do not reinstate; none of it exists in the product): heading `Your starting plan / Week one`, tabs `Now · This week · Coming up`, the `Priority / Possible / Next` status rows with their `Money / Support / Job search` categories, and the LUMO row `Ask Lumo what to do first / Context already attached`.
  - **Deliberately excluded** (owner decision 2026-08-26, claim-free subset): the real steps whose copy carries a benefit or severance number — `File for unemployment benefits` with `Takes 2-3 weeks to start`, and `Review your severance agreement` with `21 or 45 days to decide`. Both are real product copy but neither is in the verified-facts ledger above. Adding either to this card means adding a ledger row first.
- Card note: `Example information shown. Your plan will reflect the details you choose to provide.`

### Verified facts

- Kicker: `Verified facts` · H2: `Deadlines and dollar figures are checked by people, never generated.`
- Live states: `CA` (filled) · NY · NJ · WA
- Columns:
  1. `A verification date on every rule` — `Every state rule in Offboard shows when a person last checked it: "California rules verified June 2026."`
  2. `Deepest coverage in California` — `Including 4,000+ state-approved training programs, with verified official links for every state.`
  3. `Paid partners are disclosed` — `If a partner pays us, the recommendation says so, right where it appears.`

### Pricing teaser

- Kicker: `Pricing` · H2: `Start free. Upgrade when you need more support.`
- Link: `Compare all pricing details` → `/pricing`
- Composition *(plan 018 phase 3)*: Free leads as a tall card in the forest treatment; Pro and Sponsored sit beside it as compact support. Same three tiers, same strings.
- Cards: **Free / $0 forever** — `See your plan, your runway, and your benefit deadlines. Then build your first Job Packet.` (features line: `Transition plan & benefit sheets · Runway calculator · First Job Packet free · Application tracking · 3 LUMO messages a day`) · **Offboard Pro / $20/month** — `For an active transition that needs more room: research, tailoring, preparation, and paperwork review.` (`Unlimited LUMO · More Job Packets and tailoring · Deeper application and interview support`) · **Sponsored / badge "May be covered"** — `Outplacement, modernized. Your former employer, school, or workforce organization may cover your access.` (`Full benefit delivered to you · Your activity stays private · Sponsors see aggregate reporting only`)

### Employer strip *(added by plan 011 — the only B2B content on the page, deliberately price-free)*

- Kicker: `For employers`
- H2: `Letting people go? Hand them the modern unemployment office on the way out.`
- Body: `Real, private help for each departing person. Self-serve and one-time per seat, live in under 15 minutes. No enterprise contract, no sales call.`
- Link: `Offboard for employers` → `/employers`

### Community

- Kicker: `Community` · H2: `Job searching is hard enough without doing it alone.`
- Body: `Practical job-market intelligence, people navigating the same uncertainty, and a real person when you feel stuck.`
- Rows:
  1. `The Offboard Newsletter` — `Weekly job-market analysis and honest takes on tech hiring. 5,000+ subscribers.` — `Subscribe free` → `https://newsletter.offboard.co` *(fixed by plan 018; the old `offboard.co/newsletter` 404s)*
  2. `Slack community` — `Job seekers sharing leads, asking questions, and keeping each other accountable.` — `Join the Slack` → `https://offboard.co/community`
  3. `Meet with a human` — `Stuck on your search? Share where you are and our team reaches out directly. Free.` — `Say hello` → `/intake`

### Privacy summary *(rendered since plan 011)*

- Kicker: `Private by default` · H2: `Your transition is yours.`
- Rendered as a ruled numbered ledger *(plan 018 phase 3; three equal cards before)*: `01 Independent` — `Offboard is not affiliated with any state or federal agency.` · `02 Your choice` — `You choose what enters your plan and which support you request.` · `03 Clear sponsor terms` — `Sponsored programs explain what a sponsor can and cannot see before enrollment.`
- Link: `Read the privacy policy` → app privacy page

### Final CTA (shared component; default copy)

- Kicker: `You do not need the whole plan today`
- H2: `Find out first.`
- Body: `Bring your situation. In a few minutes you will see how long your money lasts, which deadlines are coming, and what may be waiting for you. Then a clear plan for what to do about it.`
- CTAs: `Build my free transition plan` · `Talk to a person` → `/intake`
- Small print: `Independent support. Start free.`

---

# 2 · How it works `/how-it-works`

**Meta title:** `How Offboard works | One plan after a layoff`
**Meta description:** `See how Offboard connects financial runway, possible benefits, and the job search in one private transition plan.`

Section order: Hero → Five steps → Starting plan → Toolkit → LUMO → Benefits
visual (decorative render) → Verified facts (shared with home) → Human support
→ Context → Product FAQ → Final CTA.

### Hero

- Kicker: `How it works` · H1: `One plan that starts where you are.`
- Body: `Whether you were laid off yesterday, have been searching for months, or are still employed and reading the room, your plan starts from your situation and your state, not a template.`
- CTA: `Build my free transition plan`
- Aside: `The spine and the muscle / The plan is the spine. The tools are the muscle. / Every step links straight into the tool that does the heavy lifting. No blank pages, no starting over.`

### Five steps

- Kicker: `The plan, start to finish` · H2: `Five steps from "what just happened" to "what's next."`
1. `Tell us where you are` — `A few questions: your situation, your state, your dates. That's enough to build a plan that's actually yours, not a template.` — tag `Your situation & state`
2. `See your money clearly` — `Your runway, how long you can go, beside your money clock: which benefit deadlines are coming and what each one is worth.` — tag `Runway calculator · Money clock`
3. `Claim what exists` — `Step-by-step paths to unemployment benefits, health coverage, and state-approved funded training, with verified official links. We never promise funding. We show you the exact path to find out.` — tag `Benefit sheets · Funded training explorer`
4. `Get ready, then run the search` — `Resume, story, materials, then Job Packets: paste a posting and get a ghost-job check, a fit read, tailored materials, and a warm path to a real person.` — tag `Job Packet · Resume Studio`
5. `Close it, and make it count` — `Interview prep and practice, a paperwork review before you sign, and when you land: mark it, keep your career ledger, and pass what you learned back.` — tag `Interview prep · Paperwork review`

### Starting plan *(added by plan 016)*

- Kicker: `The first ten minutes` · H2: `A few questions. A plan that's actually yours.`
- Body: `Your situation, your state, your dates. That's enough to build a starting plan around what changed, with the option to skip straight to the tools if you already know what you need. Private by default, and you can change your answers any time.`
- Onboarding visual copy: `Where are you right now?` · `This sets your path. You can change it any time, or skip straight to the tools if you already know what you need.` · highlighted choice `I'm still employed, but at risk` · floating chips `I was just laid off` / `I know what I need` · button `Skip, I'll decide later` · small print `Private by default. This never appears to employers or recruiters. It only personalizes your path, deadlines, and what you may be entitled to.`

### Toolkit *(product renders added by plan 016)*

- Kicker: `The toolkit` · H2: `The tools didn't go anywhere. Now they show up at the right moment.`
- Flagship: `Job Packet` — `Paste a posting and get a ghost-job check, a fit read, tailored materials, and a warm path to a real person, all kept with the role.` — chips `Ghost check · Fit read · Tailored materials · Warm intro` — link `Explore the Job Packet`
- Cards (renders on the first three):
  - `Resume Studio` — `Build and tailor resumes from your real history, ready for the role in front of you.`
  - `Interview prep & practice` — `Drills grounded in the role, the company, and your strongest stories.`
  - `Application tracker` — `Every application, stage, and follow-up stays current without extra busywork.`
  - `Ghost-job checker` — `Flags fake or stale listings before you waste an application on them.`
  - `Paperwork review` — `A read on your severance or offer paperwork before you sign anything.`
  - `Runway calculator` — `See how long your money lasts and which deadlines change the math.`
  - `Funded training explorer` — `Search state-approved programs that may be paid for while you train.`
  - `Ask LUMO` — `An AI guide that works from your plan, your benefit facts, and your search.`

### Meet LUMO *(caseworker line added by plan 016)*

- Kicker: `Meet LUMO` · H2: `An AI guide that knows your actual situation.`
- Body: `LUMO works from your plan, your benefit facts, your runway, and your search, not a blank chat window. It paces with you: triage in week one, interview drills in month three. Like a caseworker who answers in seconds, remembers everything, and never has a line.`
- Trust line: `When LUMO talks about your benefits, it reads from human-verified state facts. It never invents a dollar figure or a deadline.`
- `Ask questions like`: `What deadlines am I coming up on?` · `Am I eligible for funded training?` · `Walk me through this severance agreement.` · `Help me prepare for tomorrow's interview.`

### Verified facts — identical to the homepage section (shared component).

### Human support

- Kicker: `Use the support that fits the moment`
- H2: `You can do this yourself. You should not have to do it alone.`
- Body: `Use Offboard on your own, ask Lumo for guidance when you get stuck, or talk with a real person when the situation needs more context.`
- Steps: `Work independently` — `Follow your plan, manage applications, and use the tools at your own pace.` · `Ask Lumo` — `Get guidance that uses the context already in your Offboard plan.` · `Talk with a person` — `Book available one-on-one support online or visit the Offboard office in Concord, California.`
- CTA: `Talk to someone` → `/intake` · Small print: `Availability, format, and pricing vary by support option.`

### Your context, kept

- Kicker: `Your context, kept` · H2: `Stop repeating your story to every new tool.`
- Body: `Your situation, state, runway, roles, resumes, applications, interviews, and outcomes stay connected. Every step of the plan, and every tool, starts from your real context instead of a blank page.`
- Chips — `Adds context`: Your situation & state · Money clock · Roles & resumes · Network. `Improves next`: Applications · Interviews · Runway · Offers.
- Integrations line: `Connects to your stack. Your tools provide context. Offboard provides the plan.` — Calendar · Gmail · Drive · Slack (soon) · Notion (soon)

### Product FAQ — title `What to know about the product.` (kicker `Good questions`)

1. `Can Offboard tell me whether I qualify for benefits?` — `Offboard can help you find programs that may be relevant and get to the official source. The agency or provider responsible for the program decides eligibility, benefit amounts, and approval.`
2. `Is Offboard only for people in tech?` — `No. Offboard is designed for people navigating a layoff or job transition. Some job-search tools may be most developed for professional and knowledge-work roles today, and we will be clear when a feature is better suited to a particular kind of work.`
3. `What if I only need help with one part of my transition?` — `Start with what feels most urgent. You can organize a single application, research possible support, or build a broader transition plan. You do not need to complete every part at once.`
4. `Does Offboard guarantee benefits, interviews, offers, or placement?` — `No. Offboard helps you organize and improve the work of a transition, but it cannot guarantee eligibility decisions, interviews, offers, or job placement.`
5. `How is Lumo different from a general AI assistant?` — `Lumo works inside your Offboard plan, so it can use the transition, role, and application context you choose to save. It is designed to help with the work in Offboard, while still requiring your review and judgment.`

### Final CTA — shared default copy (see homepage).

---

# 3 · Pricing `/pricing`

**Meta title:** `Pricing and support | Offboard`
**Meta description:** `Start an Offboard transition plan for free, then add credits or eligible human support only when you choose.`

### Hero

- Kicker: `Pricing` · H1: `Start free. Upgrade when you need more support.`
- Body: `Begin with the next role in front of you. Move to Pro when your search needs more room, or see whether an organization can sponsor your access.`
- CTA: `Start free`
- Aside: `Clear before you pay / No hidden starting fee. / Free is a real tier, not a trial. You see every price and what is included before you pay.`

### Pricing deck

- Kicker: `A simple place to start` · H2: `Start free. Add more support when you need it.`
- Intro: `Begin with a transition plan and the core tools. Add credits or human support only when you choose to go further. You will see the price and what is included before you pay.`
- **Free** (dark highlight card, per owner decision 2026-08-23): `$0 forever` — `See your plan, your runway, and your benefit deadlines. Then build your first Job Packet.` — features: Transition plan & benefit sheets · Runway calculator · First Job Packet free · Application tracking · 3 LUMO messages per day · 30 monthly credits — CTA `Build my free transition plan`
- **Offboard Pro** (badge `For active transitions`): `$20/month` — `For an active transition that needs more room: research, tailoring, preparation, paperwork review, and unlimited LUMO.` — features: Unlimited conversations with LUMO · More room for Job Packets and tailoring · Deeper application and interview support · 300 monthly credits — CTA `Upgrade to Pro`
- **Sponsored access** (badge `May be covered`): `Outplacement, modernized. Your former employer, school, or workforce organization may cover your access.` — features: The full sponsored benefit is delivered to you · Your private career activity remains yours · Sponsors receive aggregate reporting only — CTA `Learn about sponsored access` → `/employers`
- Deck note: `Quarterly billing details and the full feature comparison are shown at checkout. Claiming your government benefits is always free, on any tier.`

### How credits work

- Kicker: `How credits work` · H2: `Pay only for the work that needs more horsepower.`
- Body: `Credits cover the heavier product work: deeper research, tailored materials, and interview preparation. Every credit-spending action shows its cost before you run it.`
- Items: `Included monthly` — `Free includes 30 credits a month, Pro includes 300. They refresh monthly.` · `Clear costs` — `The price in credits is shown on the button before you spend anything.` · `Human support` — `Eligible one-on-one support options are booked separately, with price and scope shown before you schedule.`

### Pricing FAQ — title `Pricing and support, without surprises.`

1. `Do I need a payment method to start?` — `No. The Free tier is not a trial. You can build your plan, see your runway and deadlines, track applications, and build your first Job Packet without adding a payment method.`
2. `What happens when I run out of credits?` — `The core plan, benefit sheets, and tracking keep working. Credits gate the heavier product work, and they refresh monthly on both tiers.`
3. `Can I cancel Pro any time?` — `Yes. Your plan, materials, and history remain yours on the Free tier after you cancel.`
4. `Is human support included?` — `Availability, format, eligibility, and pricing vary by support option. The booking page shows the current details before you schedule.`
5. `Does any tier charge for government benefits?` — `Never. Claiming your benefits is always free. Offboard charges for its own tools and support, not for access to public programs.`

### Final CTA (page-specific override)

- H2: `Start free. Decide what else you need later.` · Body: `Build the first version of your plan before deciding whether more support would help.`

---

# 4 · About `/about`

**Meta title:** `Why Offboard exists | About Offboard`
**Meta description:** `Offboard was built by founders who went through their own layoffs. Independent, private, and built to get you out of here.`

### Hero

- Kicker: `Why Offboard exists` · H1: `Built for the moment work stops making sense.`
- Body: `Losing a job changes more than a resume. It can change your routine, confidence, finances, relationships, and sense of what comes next. Offboard was built to meet that whole moment with a clear plan, verified facts, and human support.`
- CTA: `Talk to the team` → `mailto:hello@offboard.co`
- Aside: `Our role / A quiet companion for the work ahead. / Independent support that helps you decide what deserves attention next.`

### The origin — founder story *(plan 014; owner sign-off 2026-08-23; every sentence traces to approved public sources)*

- Kicker: `The origin` · H2: `It started with our own layoffs.`
- Para 1: `Offboard started with our own layoffs. Going through it, what surprised us was how much you're left to figure out alone. Unemployment rules that change depending on your state. Retraining money that exists but that nobody tells you about. A resume you haven't opened in four years. A job market that works differently than it did the last time you were looking.`
- Para 2: `There's an office for this in the physical world. It has fluorescent lights and a line, and most people never go. So we've spent the last four years working with job seekers and building what we think that office should be.`
- Para 3: `Stephanie, founder and CEO, built Offboard from a family history of helping people navigate that entire transition. Louie, co-founder, leads product and technology.`
- **Attribution rules (hard):** Steph = founder and CEO; Louie = co-founder, product and technology. First-person plural. Never "I run Offboard". Team size is never disclosed.

### Where it grew

- Kicker: `Where it grew` · H2: `A newsletter and a community came first.`
- Body: `Before the product, Offboard was a weekly newsletter on the job market read by 5,000+ subscribers, and a community of people navigating the same uncertainty. The product organizes what those people were piecing together by hand.`

### What guides the work

- Kicker: `What guides the work` · H2: `Calm is part of the product.`
- Body: `People use Offboard during a stressful transition. The experience should reduce noise, preserve choice, and make the next useful action easier to see.`
- Items: `Clarity before volume` — `Show what deserves attention now instead of presenting every possible task at once.` · `Official sources` — `Use responsible agencies and providers for eligibility, applications, and final decisions.` · `Private by default` — `Let people choose what enters their plan and explain sponsor visibility before enrollment.` · `Human when needed` — `Software should not pretend every transition can be solved without context or conversation.`

### The promise *(plan 014)*

- Kicker: `The promise` · H2: `Our job is to get you out of here.`
- Body: `We measure ourselves by how fast you leave, which is the opposite of the legacy incentive to bill more months. Landing well, and passing back what you learned, is the proof the office works.`
- Small print: `Some of what we do is software, and some of it is a 1-on-1 call or a chair across a desk in Concord, CA. Both matter.`

### Fair questions (about FAQ) *(plan 014)*

1. `Isn't calling it 'unemployment' depressing?` — `Because pretending is worse. You were just laid off, and a euphemism like 'career transition' reads as marketing at the exact moment you need candor. The word does the targeting. The warmth does the differentiating.`
2. `How is this different from an AI resume tool?` — `Those tools help with one document. Offboard is accountable for the whole passage: the money, the programs, the paperwork, the search, and the landing. AI is how it scales. It isn't the product.`
3. `Are you a government website?` — `No. Offboard is independent, not a government agency. It helps you organize your transition and reach official sources, and government agencies and providers make the eligibility and benefit decisions.`
4. `What about people who aren't unemployed right now?` — `Offboard starts from the laid-off moment on purpose, since that is when the deadlines are most urgent. But transitions are not limited to unemployment, and most people move between jobs while still employed at some point. The office is built for the whole transition, not only the week after a layoff.`
   *(Open note: the last sentence broadens slightly past the beachhead positioning in strategy doc 06; owner may tighten.)*

### Trust and privacy *(plan 014)*

- Kicker: `Trust and privacy` · H2: `Your job search is personal. It should remain private.`
1. `You choose what is edited, shared, or submitted.`
2. `Resumes, applications, saved jobs, and career history remain private.`
3. `Lumo conversations and reflections are not sponsor dashboard content.`
4. `Financial planning, severance details, and runway remain private.`
5. `Benefits status and plan are yours alone.`
6. `Sponsored programs see aggregate participation and outcomes, never your individual search.`

### Independent by design *(compliance-reviewed; do not reword casually)*

- Kicker: `Independent by design` · H2: `Offboard is not a government agency.`
- Body: `Offboard helps people organize their transition and reach official sources. Government agencies and program providers make eligibility, benefit, and approval decisions. Offboard does not replace qualified legal, tax, financial, healthcare, or benefits guidance.`

### Contact band

- Kicker: `Concord and online` · H2: `Meet Offboard where the work is happening.`
- Body: `Connect with the team online or review current in-person support availability in Concord, California.`
- CTA: `Talk to someone` → `/intake`

---

# 5 · For employers `/employers`

**Meta title:** `Transition support for employers | Offboard`
**Meta description:** `Sponsor outplacement, modernized: $199 per employee, one-time, with self-serve setup, a private member experience, free job postings, and a public and workforce partner program.`

*Scoped exception: this is the one page allowed to say "outplacement".*

### Hero

- Kicker: `For employers` · H1: `Outplacement, modernized.`
- Body: `Give the people you're letting go a real starting point: the modern unemployment office in their pocket. Sponsored access is self-serve, priced one-time per employee, and private by design for the people who use it.`
- CTA: `Talk about sponsored access` → `mailto:hello@offboard.co?subject=Employer support`
- Aside: `How sponsorship works / Self-serve. One-time per employee. / Buy seats for a departing group, send invitations, and see aggregate program reporting. No enterprise contract.`

### The member experience

- Kicker: `The member experience` · H2: `Support for the whole transition, not only the resume.`
- Body: `A layoff creates benefits, money, and job-search work all at once. Sponsored members get the full product: a personal plan, verified benefit deadlines, Job Packets, and human support options.`
- Items: `A plan from day one` — `Members start from their situation and state, and see what deserves attention first.` · `Verified benefit facts` — `Deadlines and dollar figures checked by people, with official links. Claiming benefits is always free.` · `The full toolkit` — `Job Packets, resume tailoring, interview prep, application tracking, and LUMO.`

### Pricing *(plan 012; owner-approved 2026-08-23)*

- Kicker: `Pricing` · H2: `Real outplacement at $199 a head, not $5,000.`
- Price card: `$199 / per employee, one-time` — `$169 per seat at 50 or more` · `Card or NET-30 invoice` · `No minimum, no renewal, no SOW, no procurement cycle.`
- Comparison: `For comparison: legacy outplacement runs $3,000 to $7,000 per head, and most firms will not take a layoff under 50 people. The size of your layoff should not determine whether your people get help.`

### How sponsorship works *(plan 012)*

- Kicker: `How sponsorship works` · H2: `Setup takes minutes, not weeks.`
1. `Upload a roster` — `Two people or two hundred. No minimum, no contract.`
2. `Invites go out the same day` — `Private invitations to each person. Setup takes minutes, not weeks.`
3. `90 days of full Offboard Pro` — `Benefits navigation, resume and application help, interview prep, and a real job feed for each person.`
4. `You see aggregate engagement only` — `Individual job-search activity is always private. That privacy line is contractual, not a preference.`

### Clear sponsor terms *(19-of-24 example added by plan 012)*

- Kicker: `Clear sponsor terms` · H2: `People should know what a sponsor can see.`
- Body: `Before a sponsored member enrolls, Offboard explains what the program sponsor can and cannot see. Visibility depends on the program notice. Personal benefit decisions remain with responsible agencies and providers.`
- Pull-quote: `A sponsor can see that 19 of 24 people claimed access and 14 are active. They can't see anyone's resume, anyone's applications, or anyone's conversations. Not the CEO, not HR, nobody.`
- Card: `Member view / Chosen by the member / Transition details, saved roles, documents, and requested support stay in the member experience according to the applicable notice.` · `Sponsor view / Explained before enrollment / Program reporting and visibility are defined before participation begins. Sponsors receive aggregate participation and outcome reporting, never individual applications, conversations, finances, or reflections.`

### Why companies do this *(plan 012)*

- Kicker: `Why companies do this` · H2: `The cheapest line item in the layoff, and the one people remember.`
- Body: `Glassdoor reviews, boomerang hires, and references are written in the last week of employment. Sponsorship is the part of a layoff people actually tell other people about.`
- Items: `The line item people remember` — `Glassdoor reviews, boomerang hires, and references are written in the last week of employment.` · `A product people actually use` — `It is a product laid-off workers actually use, not a PDF library.` · `Proof, not promises` — `No placement guarantees, no inflated promises. You see real aggregate usage and claims activity, so you know the support landed.`

### SB 617 aside *(plan 012 — OWNER: re-verify statute currency before relying on this in campaigns)*

- Kicker: `New in California`
- `Under SB 617, companies filing a WARN notice now have to state in writing whether they'll coordinate transition services for the people affected. The "severance and silence" default now gets documented as a choice, and you have to write down that the answer is no.`
- `Making that answer an easy yes is exactly what sponsorship is for.`

### Hiring? Post roles free.

- Kicker: `Also for employers` · H2: `Hiring? Post roles free.`
- Body: `Offboard employers can post open roles at no cost. Postings reach members actively searching, with materials prepared and context attached.`
- CTA: `Post a role` → `https://app.offboard.co/workspace/new?intent=recruit` *(hard URL contract with the app; never relative, never renamed unilaterally)* · secondary `or email us` → mailto

### Public & workforce partners

- Kicker: `Public & workforce partners` · H2: `Agencies decide. Offboard helps people prepare and continue.`
- Body: `For workforce boards, education partners, and public programs: Offboard organizes the practical work around the official system and routes residents to the responsible agency or provider for decisions and applications. Offboard does not determine eligibility, calculate benefits, or replace case workers.`
- Items: `Orient` — `Start from the resident's situation and surface what may deserve attention now.` · `Route` — `Possible programs appear beside their responsible official source or local provider.` · `Follow through` — `Deadlines, questions, materials, and next steps stay in one private place.`

### Employer FAQ — title `What employers ask.` *(plan 012)*

1. `Is there a minimum number of seats?` — `No minimum. Buy for two people or two hundred, with no contract. Pricing is $199 per employee, one-time, and drops to $169 per seat at 50 or more.`
2. `How fast can this be live?` — `Invitations go out the same day you upload a roster. Setup takes minutes, not weeks.`
3. `What exactly can we see?` — `Aggregate engagement only. For example, a sponsor can see that 19 of 24 people claimed access and 14 are active, but never anyone's resume, applications, or conversations. Not the CEO, not HR, nobody. That privacy line is contractual, not a preference.`
4. `How do people pay?` — `$199 per employee, one-time. Card or NET-30 invoice. No renewal, no SOW, no procurement cycle.`
5. `What does each person get?` — `90 days of full Offboard Pro: a personal plan, verified benefit deadlines, resume and application help, interview prep, and a real job feed.`

### Contact band

- Kicker: `Public partnership` · H2: `Build a clearer route through the transition.`
- Body: `Tell us which residents you serve and where the current handoff breaks down.`
- CTA: `Discuss a public partnership` → `mailto:hello@offboard.co?subject=Public partner support`

---

# 6 · Guides & resources `/resources`

**Meta title:** `Guides & resources | Offboard`
**Meta description:** `Reported essays, practical guides, and the slow work of making layoffs less brutal.`

### Hero

- Kicker: `The library` · H1: `Guides & resources`
- Body: `Reported essays, practical guides, and the slow work of making layoffs less brutal.`
- Aside: `Written from experience / Practical, not theoretical. / Guides drawn from the newsletter, the community, and the questions people actually ask.`

### Library structure *(plan 013)*

The index renders each category with ported articles from
`src/content/resources/registry.ts` (the registry is canonical for titles,
excerpts, reading times, and guest-author credits — this doc lists titles
only; edit article metadata in the registry and article prose in
`src/content/resources/posts/`, both in the same PR as any change here).

Category descriptions:

- **Guides** — `Practical, calm how-tos for the moments right after a layoff.`
- **AI & Technology** — `Clear explainers on AI, agents, and how hiring is actually changing.`
- **Essays** — `Founder notes on layoffs, work, and why Offboard exists.` *(none ported yet)*
- **Policy & Accountability** — `Reported opinion on how public money meets (or misses) laid-off workers, and what measurable accountability looks like.` *(none ported yet)*

**Ported (11 local articles, prose byte-faithful from the legacy site):**
Guides — What to do in your first week after a layoff · How to read and
negotiate your severance · Rebuild your resume after a layoff · The Career
Changer's Guide to Job Offer Negotiations *(guest post: Gerta & Alex,
YourNegotiations — credit must stay above the fold)* · Health insurance after
a layoff: COBRA, ACA, and the cheaper options people miss · How to announce a
layoff on LinkedIn (with three templates) · Best job application trackers in
2026. AI & Technology — How AI Is Changing the Job Search in 2026 · What Is
an AI Agent? · The 7 Levels of AI Agent Capability · Will employers know your
cover letter is AI?

**Not ported (7 slugs 301 to `/resources` until Steph's editorial pass):**
the six founder essays + the Alameda D2 policy piece. Their registry entries
(and original punctuation) are preserved for when they return.

### Article page chrome *(plan 017)*

Every article page (`/resources/[slug]`) renders each entry's 2 curated
`related` slugs (from `src/content/resources/registry.ts`) above the "More
guides" footer link, as a pair of cards linking to those articles.

- Section label: `Keep reading`
- Each card shows the related article's category and title, linking to
  `/resources/[slug]`.

### Final CTA (page-specific override)

- H2: `Bring your situation. We will help you sort the rest.`
- Body: `A layoff is rarely just one problem. Build a plan that covers the money, the benefits, and the search, in one place.`

---

# 7 · ACT pilot `/act` *(out of nav; no redirect; plan 017)*

**Meta title:** `ACT pilot | Offboard`
**Meta description:** `ACT is a resident-first pilot: eligible residents in Alameda County get sponsored access to Offboard and can start a job search the same day, while the program sees aggregate engagement only.`

*Scoped exception page: may say "career transition" and "workspace"; the
category claim and all endorsement language are banned here (see Language
rules).*

### Hero

- Kicker: `ACT pilot` · H1: `Career support that starts tonight, not in six weeks.`
- Body: `Eligible residents in Alameda County get sponsored access to Offboard and can start a job-search workspace the same day, right after a layoff, instead of waiting on forms, phone trees, and appointment windows while rent is due. Residents work the search on their own schedule: tonight, at 6am, or between school pickups.`
- CTA: `Apply for pilot access` → `https://app.offboard.co/act/apply` *(the apply flow lives in the app)*
- Aside: `In agency terms / Resident-first, aggregate-only for the program. / Residents apply, claim sponsored access, and use Offboard privately. The agency or partner reviews aggregate program engagement.`

### How the pilot works

- Kicker: `How the pilot works` · H2: `From application to activation, in six steps.`
- Intro: `A resident-first pilot path: apply, get approved, claim sponsored access, and start working the search the same day.`
1. `Learn about ACT` — `Residents land here, on /act, and see who is eligible and what sponsored access includes.`
2. `Apply through Offboard` — `Residents complete a short application on Offboard's app, not a phone tree or a paper form.`
3. `Program review` — `The program or admin team reviews the application on their own schedule.`
4. `Approval and a private link` — `Approved residents receive a private claim link, sent directly to them.`
5. `Claim sponsored access` — `Residents claim sponsored Offboard access, and their workspace is ready the same day.`
6. `Aggregate program review` — `The program reviews aggregate activation and engagement, not individual accounts.`

### Built around real schedules

- Kicker: `Built around real schedules` · H2: `The search does not wait for office hours.`
- Body: `Between drop-off, a shift, and bedtime, most residents do not have room for another appointment window. ACT gives them a plan they can work at 9pm or 6am, on a phone or a laptop, without waiting on a callback.`

### What residents get

- Kicker: `What residents get` · H2: `The same Offboard workspace, sponsored.`
- Body: `One connected place for the search: jobs, applications, documents, interviews, and guidance that already knows the resident's plan.`
- Items: `A private job-search workspace` — `The full Offboard workspace in one place, instead of scattered tools and paperwork.` · `Jobs and Job Packets` — `Find roles and build a Job Packet for each one, with fit and next steps included.` · `Applications, follow-ups, and documents` — `Track every application and follow-up, and keep resumes and other documents in one place.` · `Interview prep and Ask LUMO` — `Practice for interviews and ask LUMO for guidance grounded in the resident's own plan.`

### Worker-controlled privacy *(the reporting-boundary sentence is verbatim from the ACT playbook; do not soften or embellish)*

- Kicker: `Worker-controlled privacy` · H2: `Aggregate for the program. Private for the resident.`
- Body: `ACT reporting is aggregate-first. The program can understand applications, approvals, claims, onboarding, and engagement without seeing private resumes, documents, LUMO conversations, or individual job-search behavior.`
- `What the program sees`: Application funnel · Approval and claim visibility · Aggregate engagement · Weekly signup trends · Cohort or jurisdiction view
- `What stays private`: Resumes · Documents · LUMO conversations · Individual job-search behavior

### For public-sector partners

- Kicker: `For public-sector partners` · H2: `A pilot path that sits beside what you already run.`
- Body: `ACT gives the program an application funnel, approval and claim visibility, and aggregate engagement, including weekly signup trends and a cohort or jurisdiction view.`
- `Suggested pilot shape`: One jurisdiction or cohort · 25 to 100 residents · 3-month sponsored access · First review after 30 days
- Objection: `Is this replacing our workforce system?` — `No. ACT is a resident-facing digital support layer and pilot path. It can sit beside existing workforce systems and focus on faster activation.`

### Contact band

- Kicker: `Pilot inquiries` · H2: `Bring ACT to your jurisdiction.`
- Body: `Tell us which residents you serve and where sponsored access could help most. We will follow up to scope a pilot.`
- CTA: `Start a pilot conversation` → `mailto:hello@offboard.co?subject=ACT pilot`

---

# 8 · For public partners `/public-partners` *(out of nav; thinned crosslink page)*

**Meta title:** `Transition support for public partners | Offboard`
**Meta description:** `Public and workforce partner details now live on the employers page. See how Offboard organizes practical transition work for the residents you serve.`

- Hero — Kicker: `For public partners` · H1: `Help people move from scattered information to a workable plan.` · Body: `Offboard helps residents organize transition work, identify possible support, and continue to the responsible agency or local provider for official decisions and applications.` · CTA: `Discuss a partnership` → mailto · Aside: `A clear boundary / Planning support, not an eligibility authority. / Offboard organizes information and routes people to official providers.`
- Note: `The full public and workforce partner program, including sponsorship terms and the resident journey, now lives on the employers page alongside our employer sponsorship program.` — link `See partner details on the employers page` → `/employers`
- Contact band — `Public partnership / Build a clearer route through the transition. / Tell us which residents you serve, which systems they navigate, and where the current handoff breaks down.` — CTA `Discuss a public partnership`

---

# 9 · Intake `/intake` *(live member-intake form; never redirect)*

**Meta title:** `Intake | Offboard` · **Description:** `Tell us a bit about your offboarding story. Our team reviews every intake and reaches out directly.`
**Confirmed page:** `Intake received | Offboard` · `Thanks for filling that out. We'll review your intake and reach out directly.`

Form copy (sections: The basics · The offboarding story · What you're looking
for · The fun part · Logistics) lives in
`src/components/marketing/intake/IntakeForm.tsx` and was ported verbatim from
the legacy production form (plan 010). It keeps its intentionally warmer,
voicier register (e.g. the mood scale from `I am thriving and manifesting my
dream role` to `I've rewritten my resume 11 times and still don't know what I
do`). Treat it as its own voice zone; the sitewide language rules apply but
the register is deliberately looser.

---

# Redirect map (SEO-load-bearing; any route rename must update it in the same PR)

`/product`, `/why-offboard` → `/how-it-works` · `/job-packet` →
`/how-it-works#toolkit` · `/faq` → `/how-it-works#faq` · `/community` →
`/#community` · `/founder-story`, `/security` → `/about` ·
`/for-organizations`, `/for-recruiters` → `/employers` · `/gift` → `/pricing`
· `/tools`, `/tools/:slug*` → `/resources` · 7 unported essay/policy slugs →
`/resources`. Kept live, no redirect: `/intake`, `/act`.

---

# Approved but unshipped

Copy that has an owner decision or approved source but is not on the site yet.
When one ships, move it into its page section above.

1. **Gift lane on `/pricing#gift`** (plan 015, written and approved, never
   executed). Facts: 1 month $20 · 3 months $54 · 6 months $99 · one-time
   Stripe checkout · private claim link · 90-day claim window · full refund if
   unclaimed. Approved offer copy (adapted for the never-say list): *"Send
   Offboard Pro to someone who was laid off. Choose 1, 3, or 6 months, check
   out once, and they receive a private claim link to get started."* CTA
   target: `https://app.offboard.co/gift/checkout?duration={1|3|6}`. Shipping
   this should also retarget the `/gift` redirect to `/pricing#gift` and add
   the Free-vs-Pro comparison table.
2. **Homepage founder-story teaser** (v7): `Built for the moment work stops
   making sense.` + link to `/about`. Natural fast-follow now that the About
   story is owner-approved.
3. **Logos band** (v7): `Our members come from teams at` Snowflake · Airtable
   · Autodesk · GoPro · General Motors · YouTube. **Blocked on owner
   verifying the membership claims are current and safe to publish.**
4. **The 6 founder essays + Alameda policy piece** on `/resources` — blocked
   on Steph's editorial pass; registry entries preserved.
5. **State-by-state program pages** (`What [state] owes you after a layoff`)
   — held per strategy docs, gated on an SEO reality check and revenue; see
   `docs/content-roadmap.md`.

# Approved alternates (A/B record)

- Hero H1 — shipped: **A. `The Modern Unemployment Office`** (category
  claim, owner call 2026-08-01). Variant B on record: `Your layoff comes with
  help nobody tells you about.` (the human promise; now the subhead). Softener
  alternate if A wins and needs warmth: `The unemployment office you wish
  existed.` Kill signal per v7: the category headline loses two honest tests.
- Final CTA H2 — shipped: `Find out first.` Variants on record: `Find out
  what you're owed.` (v2 spec) · `The office is open.` (only if the category
  headline is winning).

# Decision log

| Date | Decision | Where recorded |
| --- | --- | --- |
| 2026-08-01 | Category claim is the H1; human promise is the subhead | v7 doc (owner call) |
| 2026-08-01 | Newsletter count corrected to 5,200 verified; publish "5,000+"; "8,000+" banned | operating plan / one-pager note |
| 2026-08-21 | Consumer pricing $0/$20 + credits confirmed; "outplacement" allowed in Sponsored-tier copy; `/intake` stays a native form | plans/README (Series 1) |
| 2026-08-23 | Pricing highlight stays on Free (PR #16) | muo repo history |
| 2026-08-23 | Employer pricing public: $199 under 50 seats, $169 at 50+ | plans 012 |
| 2026-08-23 | Founder-story copy signed off | plan 014 |
| 2026-08-23 | `/act` rebuilt from scratch; Alameda County naming approved as geography only | plan 017 |
| 2026-08-23 | Newsletter CTA → `newsletter.offboard.co` (old path 404s) | plan 018 |
| 2026-08-24 | COPY.md created as the copy source of truth; copy changes land here first | this file |
| 2026-08-24 | Clarified the "outplacement" scope: allowed on /employers AND in Sponsored-tier copy wherever it renders (home teaser, /pricing deck), per the 2026-08-21 owner call. The earlier "one page only" wording in Language rules was inaccurate and is corrected. | COPY.md, plan 019 |

**Open owner items:** re-verify SB 617 currency (`/employers`) · optionally
tighten About FAQ #4 toward the beachhead · verify logos-band claims ·
Steph's essay editorial pass · execute the gift lane (plan 015).
