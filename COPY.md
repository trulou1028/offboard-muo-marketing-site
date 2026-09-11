# The Modern Unemployment Office — Marketing Site Master Copy

**This document is the single source of truth for all copy and content on the
Offboard marketing site (offboard.co).** Every headline, body paragraph, FAQ,
CTA label, disclaimer, and metadata string on the site appears here, verbatim,
in page order.

- **Version:** 2.1 · 2026-08-31 · homepage v2 (plan 022, Career Context copy) + owner copy confirmations; other pages unchanged since 1.0 (`2d56c7b`)
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
| tools · your guide (Lumo) | modules · workspace · agents · career memory |
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
   `/act`, `/resources`, `/workforce`.
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
- One primary CTA per view. **Sitewide primary CTA: `Get started free`**
  → `https://app.offboard.co/auth?tab=signup` (owner decision 2026-09-03,
  plan 040 finding 3). It is the label on the header button, on every page
  hero, and on every final CTA. Five labels used to point at this one URL
  (`Build my plan`, `Get started free`, `Build my free transition plan`,
  `Create my Career Context`, `Ask Lumo`); the homepage's exception had
  spread into three more pages, so the homepage's label became the rule.
  - **A section CTA inside a page may still name its own action** when that
    action is specific and not the page's primary ask: `Build my Career
    Context` (homepage step 2), `Upgrade to Pro`, `Post a role`,
    `Learn about sponsored access`, and the B2B/B2G `Talk about…` /
    `Start a … conversation` mailto buttons, which do not go to signup at all.
  - **`Ask Lumo` is never a signup button.** It reads as "open a chat" and
    goes to a signup form, which is the defect the owner removed from the
    homepage on 2026-09-02. Where a page wants to point at Lumo, it links to
    `/lumo`.

- **Lumo, not LUMO** (plan 040 finding 4). One casing everywhere, per
  DESIGN.md's sentence-case rule. *Recorded divergence: the app repo's
  `src/config/navLabels.ts` — which calls itself "the ONE place a
  jobseeker-facing feature name is written" — ships `ASK_LUMO: "Ask LUMO"`,
  and the app uses LUMO about 420 times against Lumo about 250. The site and
  the product disagree. The site is internally consistent as of this change;
  reconciling the two is an owner conversation with the product side, not a
  copy edit.*

## Tool glossary

One name per tool, one casing, everywhere (plan 040 finding 2). Before this
existed, `/how-it-works` and the homepage named the same tools differently
(`Job Packet` / `Application Packets`, `Resume Studio` / `Resume Tailoring`,
`Ghost-job checker` / `Ghost Job Check`), and both pages claimed "ten tools"
while listing different nines.

**Where the canonical name comes from.** The app repo owns feature names in
`src/config/navLabels.ts`, which exists for exactly this reason ("the ONE
place a jobseeker-facing feature name is written… renaming a feature = editing
one line in this file"). Verified against `lumo-plan-builder` `origin/main`,
2026-09-03. Where the app has a public name, the site uses it. Where the app
has no public name for something the site sells, the marketing name is listed
as marketing-owned, with the app-side concept named so the mapping is
traceable.

**How this table gets checked, after 2026-09-03.** Owner rule: work on the
marketing site does not open, change, or run anything in `lumo-plan-builder`.
Reading it to port a name or a fact is still correct and still required. So
every app-side column here is either read from `origin/main` on the date given,
or reported by the owner and labelled as such. A row with no date behind it is
a row to re-check before trusting. When a name needs to change in the product,
write it down here and hand it over; do not go and change it.

| Site name | Source | App-side name / concept |
| --- | --- | --- |
| Application Packet | app | `APPLICATION_PACKET`. Sidebar shows the short form `Packets`. **`Job Packet` is retired — owner decision 2026-09-03, see below** |
| Resume Tailoring | app-adjacent | `RESUMES` is the app's nav label; `Resume Tailoring` names the action the site sells. **`Resume Studio` is retired** |
| Cover Letters | app | used throughout the app |
| Ghost Job Checker | app | `GHOST_CHECKER`. **`Ghost Job Check` and `Ghost-job checker` are retired** |
| Interview Prep | app | `INTERVIEWS` is the nav label; `Interview Prep` names the action |
| Voice Practice | marketing-owned | the app ships mock/practice interviews with no settled public name |
| Role Match | app | `Role Match` (`RoleMatchCard.tsx`, packet step `Role Match Analysis`), read from `origin/main` 2026-09-07. **`Role Match` is retired** (owner 2026-09-07, plan 047); it was marketing-owned while the app had no name |
| Company Intel | app | the packet step and card label `Company Intel`, read from `origin/main` 2026-09-07. **`Company Intel` is retired** (owner 2026-09-07, plan 047) |
| Application Tracker | app | `APPLICATIONS` |
| Career Context | **site, adopted by the product** | **Owner decision 2026-09-03: `Career Context` is the name, in both the site and the product.** Shipped on both sides; the app's `LEDGER` nav label was `Your Record` until then, see below |
| Paperwork Review | app | `PAPERWORK_REVIEW`, owned by `legalReviewCopy.ts` |
| Runway calculator | app | `RUNWAY` |
| Funded Training | app | `FUNDED_TRAINING`. **`Funded training explorer` is retired** |
| Layoff Plan | app | was `Your Path` (`YOUR_PATH`) until the owner's 2026-09-10 rename; the plan card the homepage renders, the Free plan's first feature, and Lumo's `Your plan` block |
| Lumo | site | the app writes `LUMO`; see the style rules above |

**Casing swept 2026-09-04.** The toolkit card list and the five-steps tags
were checked against this table name by name. `Paperwork review` and
`Application tracker` were shipping in lower case and are fixed.
`Interview prep & practice` is deliberately left as it is: it is a composite
title covering two glossary tools (`Interview Prep` and `Voice Practice`),
not a bare tool name, so Title Case would misname it. If that card is ever
split, both halves take their glossary names.

**Retired names, never to ship again:** `Role Match`, `Company Intel` (plan 047), `Job Packet`, `Resume Studio`,
`Ghost Job Check`, `Ghost-job checker`, `Funded training explorer`,
`career ledger`, and `career record` as a product noun (the plain phrase "a
record of your career" is fine). Swept out of the code 2026-09-03.

### The two names the owner settled, 2026-09-03

Both had shipped two ways at once. Plan 040 recorded them rather than
guessing, because each one touches something a copy edit does not normally
get to move. The owner decided both: **`Application Packet` and
`Career Context`, in the site and in the product.**

**`Job Packet` → `Application Packet`.** `Application Packet` is the app's
own full name in `navLabels.ts`, so the site now matches the product.
Swept out of every user-facing string the same day. Two consequences that
were the reason this waited for a decision:

- It rewrites an **owner-confirmed pricing fact**. The ledger line reads
  "first Application Packet free" from 2026-09-03; the number it carries
  (one free packet) is unchanged from the 2026-08-21 confirmation, only the
  noun moved.
- The product render asset keeps its old filename
  (`renders/toolkit-job-packets.webp`, manifest id
  `renders/toolkit-job-packets`). Filenames are not copy, and renaming it
  would change the imagery cache key and make the next `npm run imagery`
  pay to regenerate an image that has not changed. The alt text on that
  image says `Application Packet`.
- `/job-packet` stays in `next.config.ts` as a 301. It is an inbound legacy
  URL, not a name the site says.
- The app's own `Job Packet` sweep, about 43 uses, was outstanding when the
  site shipped this and was **completed separately on 2026-09-04** (owner
  report). Both sides now say `Application Packet`.

**`Career Context` stays, and the product adopts it.** Before this decision
the app's nav called the record `Your Record` (`LEDGER`), and `Career Context`
appeared once in the whole app repo, inside a prompt template. The owner's
decision goes the other way from the usual rule in this table: the site does
not follow the app here, the app follows the site. Nothing on the site
changed. The app shipped its side the same day, and the leftover plain-English
"your record" phrasing was cleaned up separately on 2026-09-04 (owner report).
Site and product now use one name.

*Sourced from the owner, not verified here. This repo does not open the app
repo to check (see the note under the tool glossary heading); if the two ever
read differently to a member, that is the thing to re-check first.*

**The count.** The homepage and `/job-search` say "ten tools" and name the
same ten: Role Match, Ghost Job Checker, Company Intel, Application
Packets, Resume Tailoring, Cover Letters, Interview Prep, Voice Practice,
Application Tracker, Career Context. `/how-it-works` listed a different set and could not claim a number until plan 044 (2026-09-07) rebuilt its toolkit on the same four stages and the same ten; it now says "ten tools" too.

## Verified-facts ledger

Every load-bearing number on the site, with its status. Change a number here
and everywhere it appears in the same PR.

| Fact | Value | Status | Appears on |
| --- | --- | --- | --- |
| Homepage trust line | **“Join thousands of people”** | Owner-confirmed accurate 2026-08-31 | Home |
| Newsletter subscribers | **5,000+** | Owner-corrected 2026-08-01 (verified 5,200; "8,000+" is stale and banned) | Home, About, Resources menu (every page) |
| CalJOBS training extension example | **~$12,000**, contact EDD before **week 16** of benefit payments, California | Always shipped with conditions + "amounts vary" small print | Layoff & Benefits (owner approved 2026-09-01; stays off the homepage) |
| Live integrations | **Google Calendar, Google Drive, Calendly** live; **ChatGPT, Claude** in **beta**; **Gmail, Notion** in progress with no date | Owner-confirmed 2026-09-01: the ChatGPT and Claude connections exist and work, and are labelled beta because they are still being refined | Offboard Everywhere |
| AI providers | **OpenAI and Anthropic only**; OpenAI called with retention disabled on every request, Anthropic's API does not train on customer data | From the app repo's `SECURITY_CLAIMS.md` §1 #11; verified live 2026-07-02. Adding a third provider changes this page in the same PR | Privacy & Security |
| Security claims audit | Claims register **audited July 2026**; **no SOC 2 or ISO certification** | Sprint 119 rewrote the app's `/security` page from the register and deleted the certification roadmap rather than softening it | Privacy & Security |
| Job centers | **"2,000+ job centers"** and **"billions of dollars a year"** | The only approved public phrasings; precise figures (~$3.2B WIOA, ~2,300 AJCs) require re-verification before any cited use | Not currently shipped (left the homepage in v2, plan 022) |
| State-approved training programs (CA) | **4,000+** | From v7, owner-shipped | How it works (left the homepage in v2, plan 022) |
| Live verified states | **CA** (deepest), NY, NJ, WA | | How it works (left the homepage in v2, plan 022) |
| Employer seat price | **$199 per employee, one-time**; **$169 per seat at 50 or more**; card or NET-30 | Owner-approved for public display 2026-08-23. Must stay in sync with the app-repo sales one-pager | Employers (+ metadata) |
| Legacy outplacement comparison | **$3,000 to $7,000 per head**; most firms will not take a layoff under 50 people | From the prospect-facing one-pager | Employers |
| Sponsored access duration | **90 days of full Offboard Pro** | | Employers, ACT |
| Consumer tiers | **Free $0 forever · Pro $20/month, or $45 every 3 months ($15/month)**. Free: one complete Application Packet with every step free, then the assessment (parse, company intel, role match) on every packet; 3 basic ghost checks a month; Ask Lumo 10 messages a day; ChatGPT/Claude connection reads and updates the tracker. Pro: tailored resumes, cover letters, interview briefs, path to a person on every packet; enriched ghost checks; Ask Lumo unlimited on the advanced model; the connected assistant can run packets and checks; about 30 full packets a month with an email at 25. Credits pay only for extras (headshots, brand kit, voice practice, paperwork review) on every tier; the site no longer prints credit counts | Read from the app at `origin/main` 2026-09-07 (`src/pages/Pricing.tsx`, `product-spec.md` § 6, Sprints 412 to 414, owner-approved pricing reset of 2026-09-06). Replaces the 2026-08-21 row (30/300 credits, 3 Lumo messages) | Home, Pricing, Lumo (message limit only) |
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
  start · Lumo works from your real situation.

---

# Site chrome (all pages)

**Header nav** (6 links + actions): **Mega-menu navigation since plan 037 (owner revision 2026-09-01: four
tabs, light panels).** **Product ▾** · **For Organizations ▾** · Pricing
`/pricing` · **Resources ▾** · Sign In →
`https://app.offboard.co/auth?tab=signin` · **Build my plan** (primary, neon
on the dark header) → signup. The header is fixed (sticky) on every route.
Home left the bar (the wordmark is the home link; owner call 2026-09-01,
reversing plan 024's Home link). `/act` is deliberately out of nav, in both
the desktop panels and the mobile menu.

Each panel leads with its featured card and its render, then the columns of
links, each with a small icon and a one-line blurb (owner 2026-09-08; the
featured card sat on the right until then, and it now leads in the DOM as
well as visually, so reading order matches the screen). Panels are light
(white, featured card on paper-soft).

**The bar itself** (owner 2026-09-08): at the top of the homepage the header
is fully transparent, with no blur and no bottom rule, so the hero photograph
runs behind it unbroken. The forest fill and its shadow return as soon as the
page scrolls, because the bands below the hero are light. Other routes keep
the fill from the start. **`Get started free` in the bar is outlined**, not
filled: transparent, a one-pixel paper border, paper label. It competed with
the hero's own filled primary action directly beneath it.

**Every CTA on the site is a pill** (owner 2026-09-08): primary, secondary,
the Lumo button, the header button, and the intake form's submit all take the
full radius.

**Trimmed to the launch set by plan 043, then revised by plan 045 (both owner,
2026-09-07).** The nav is **Product ▾ · For Employers · Pricing · Resources ▾**.
Plan 043 deferred eight pages and emptied both mega menus to plain links; the
owner then decided How It Works was "not valuable enough to be a more in-depth
version of the homepage", so plan 045 brought the five product pages and the
Product panel back and deferred `/how-it-works` instead (it stays live: four
legacy URLs 301 to it). For Organizations stays a plain link while
`/workforce` and `/communities` are deferred; its panel is preserved below,
struck through, so un-deferring restores the exact blurb.

- **Product ▾** — *The system:* Lumo `The guide that knows your situation.` ·
  Offboard Everywhere `Use Offboard from the AI you already use.` · *The
  work:* Job Search `The whole search as one system.` · Layoff & Benefits
  `Deadlines, coverage, and runway.` · *Featured, "Start here":* **Career
  Context** `One living record of your experience, applications, companies,
  interviews, and goals, put to work in every tool you use.` → `See what it
  holds` → `/career-context` *(plan 045: Career Context moved from the first
  column to the featured slot, which plan 037 gave to How It Works; the
  render is the same `path-stage` image)*
- ~~**For Organizations ▾** — *Who you serve:* For Employers `Sponsor a group
  through a layoff.` · Workforce & Government `Agencies, boards, and public
  programs.` · Universities & Communities `Alumni, members, and career
  offices.` · *Featured, "What a sponsor sees":* **Aggregate only. Never
  the person.** `Sponsors receive aggregate participation and outcome
  reporting, never individual applications, conversations, finances, or
  reflections.` → `See exactly who can see what` → `/privacy-security`~~ —
  **now the plain link `For Employers` → `/employers`**
- **Resources ▾** — *Resources:* Guides `Practical answers, checked by
  people.` · Privacy & Security `Who can see your record, and who cannot.`
  ~~· Company Transition Centers `Laid off from a company in the news? Start
  there.` (joined in plan 038, deferred by 043)~~
  · *Company:* About `Why Offboard exists, and who is behind it.` · Visit Us
  `Talk to a person, online or in Concord.` → `/intake` · Slack Community
  `People searching alongside you.` → `https://offboard.co/community` ·
  Contact `hello@offboard.co. A human reads it.` → mailto · *Featured, "The
  newsletter":* **The Offboard Newsletter** `Weekly job-market analysis and
  honest takes on tech hiring. 5,000+ subscribers.` → `Subscribe free` →
  `https://newsletter.offboard.co` *(the featured card is a plain link in the
  mobile menu since plan 043; before that the newsletter had no phone entry)*

**Company Transition Centers joined Resources in plan 038**, the moment
`/companies` existed; it was held out of the first cut under plan 026's
no-dead-links rule.

**Navigation labels are Title Case** (owner decision 2026-08-31); prose,
headlines, and CTA button labels stay sentence case. One exception: the
homepage H1 `The Modern Unemployment Office` is Title Case with no period
(owner 2026-09-07), as the category name rather than a sentence. The mixed casing this
replaced was visible: product links like "Career Context" were already Title
Case while "How it works" and "For employers" were not.

**Footer**

> **Offboard**
> Offboard is an independent company, not a government agency. We help you navigate the official programs. Your benefits are yours, and claiming them is always free. Information provided by Offboard is general and does not replace guidance from government agencies or qualified legal, tax, financial, or healthcare professionals.

Columns (plan 043 trim, plan 045 revision) — **Product:** Career Context,
Lumo, Job Search, Offboard Everywhere, Layoff & Benefits, Pricing, Guides
~~, How It Works, Company Transition Centers~~ ·
**Partners:** For Employers ~~, Workforce & Government, Universities &
Communities~~ ·
**Company:** About, Visit Us
(`/intake`), Contact (`mailto:hello@offboard.co`) · **Legal:** Privacy &
Security (`/privacy-security`), Privacy Policy, Terms (app.offboard.co).

The struck-through entries are the deferred pages (`src/lib/launch.ts`). Each
returns to the column it left. The four columns stay so un-deferring is purely
additive.

> © 2026 Offboard · Independent support for life after a layoff

---

# 1 · Homepage `/`

**Re-sequenced 2026-09-02 (homepage v3, plan 039).** Version 2.0's copy is
substantially intact; what changed is the order, and three concepts that were
each told twice are now told once. The page is a numbered sequence: build your
Career Context, talk with Lumo, run your search, follow your layoff plan
(order per plan 050, below). Layout rules
are `DESIGN.md` § "Composition rules" (R1 to R10).

**Meta title:** `Offboard | The modern unemployment office`
**Meta description:** `Offboard is the modern unemployment office: one calm place for your benefits, deadlines, runway, funded training, and next job. Verified facts, AI guidance, and a plan that starts where you are. Independent, not a government agency.`

Section order: Hero → The four steps → Step 1 Career Context → Step 2 Talk
with Lumo → Step 3 Toolkit → Step 4 Follow your layoff plan → Plans (Free,
Pro, Sponsored) → Community → Final CTA.

**Reversed 2026-09-10 (owner, plan 050): context first.** Round 5's step
one put money, benefits, paperwork and funded training at the front. In the
app that asked for trust it had not earned yet: 0 of 38 August members filled
a money field, 13% opened runway and none entered a number, while 11% ever
reached Lumo (`lumo-plan-builder` plan 277). The app now sequences the
Career Context first, and Home shows four stage cards after onboarding:
Build Your Career Context, Talk With LUMO, Run Your Search, Follow Your
Layoff Plan. The site tells the same four in the same order, in the site's
sentence case and with the site's `Lumo`. "Steady the first week" is no
longer a step: it is step four's content and what Lumo raises first in step
two. The H1 is still earned; step four is the unemployment-office step. The
sand band moved from second to last; rhythm is now deep, paper, mist,
forest, paper, sand, paper-deep, no band beside itself.

**Round 5, 2026-09-03: four steps, not three (plan 040 finding 1).** Owner
decision. The H1 claims the modern unemployment office, but the three-step
version described an AI job-search tool: benefits survived only as a trailing
clause on step three, "with your benefits beside it." A first step —
**Steady the first week** — puts the deadlines and the money back at the front
and earns the H1. The sand band that used to close the page as "More than a
job search" moved up to become that step; step four's trailing clause was
deleted because step one now says it properly.

Band rhythm after the move: deep, paper, sand, mist, forest, paper,
paper-soft, mist, deep. No two adjacent bands match, two forest-deep anchors
bookend the page, and the mid-forest band keeps a light band on both sides.

**Round 4, 2026-09-02: the homepage names things, the pillar pages describe
them.** Owner direction: several sections were "cramming in extra information
when their main goal is to create enough interest to learn more." Nothing was
deleted without a new home or a recorded retirement.

- **Moved to `/job-search` (§ 14):** the ten per-tool description sentences.
  The homepage now carries the four stage names, each stage's one-line "what
  it decides" (already approved on that page), its product-state chip, and the
  ten tool names. This inverts the previous split, which that page's header
  comment recorded.
- **Moved to `/career-context` (§ 10):** the eight category rows (Experience,
  Applications, Companies, Contacts, Documents, Interviews, Preferences,
  Goals) with their one-line descriptions. They restated this section's own
  body paragraph, which already names all eight, and `/career-context` had no
  structured account of what the record holds.
- **Retired:** the Step 1 affirmation `Your experience. Your progress. Your
  context. Available when you need it.`; the Step 2 `Ask Lumo` CTA and the
  five example prompts under `Ask things like` (`/lumo` § 12 already ships
  eight under the identical label, two of them word for word); and the
  portrait photograph behind the Step 1 record card.
- **Restructured:** the six member questions in More than a job search are a
  disclosure list, first item open. `What do I do first?` is item one rather
  than a titled block inside the section intro, so it still reads beside the
  plan card that answers it.
- **The five route FAQ sections became real accordions** in the same change
  (`/how-it-works`, `/pricing`, `/about`, `/employers`, `/privacy-security`).
  Their copy is unchanged; only the disclosure behaviour is new.

**What v3 retired or folded** (copy kept where it moved, in git history where
it did not):

- **"Offboard, wherever you work"** and **"Meet Lumo"** were one story told in
  two bands 2,900px apart. They are now Step 2. The four capability blocks
  (`Save opportunities instantly`, `Update your search by conversation`,
  `Compare opportunities using your context`, `Work across Offboard and AI`)
  are retired from the homepage; the same substance lives on `/integrations`.
  The demo conversation and the five Lumo prompts survive verbatim.
- **"Built around you"** folded into Step 1: its affirmation line and its
  portrait moved there, its CTA was deleted under R3 (Career Context had three
  filled buttons on one page), and its body copy is retired from the homepage.
  The portable-context promise still ships on `/career-context`.
- **The photo triptych** in More than a job search is retired (R6). Its three
  chips (`Plan · Updated`, `Benefits check`, `Resume · 3 versions`) go with it,
  and so does the hero's `Benefits check · Done` chip (owner 2026-09-02).
- **The Sponsored access band** is retired (owner 2026-09-02): sponsored
  access is the third plan card instead, as on `/pricing`. Its kicker, H2
  `Job-search support people will actually use.`, body, three audiences and
  the `Sponsor Offboard` CTA leave the homepage; the audiences still ship on
  `/employers`, `/workforce` and `/communities`.
- **The AI avatar** in every chat composition is Lumo's face, the asset the
  app uses (`public/marketing/lumo-head.png`, ported from `lumo-plan-builder`
  `origin/main` `src/assets/lumo-head.png`), not the lime disc.

### Hero

- H1: `The Modern Unemployment Office` *(owner 2026-09-07, from the Figma hero: Title Case and no period, the one headline exempt from the sentence-case rule in § Language rules; it is the category name, treated as a proper noun)*
- Body: `Your benefits, your job search, and your career context in one system, connected to the AI you already use.` *(round 5: was five nouns, and "applications" sits inside "job search")*
- CTAs: `Get started free` (primary) · `See how it works` → `#how-it-works`, the four-step strip on this page *(plan 045: `/how-it-works` is deferred, so the button scrolls instead of leaving)*
- Trust line: `Join thousands of people building their next chapter with Offboard.` *(owner-confirmed accurate 2026-08-31)*
- Hero visual (owner composition 2026-09-07, refined in Figma): **a full-bleed photograph with one flat chat image over it.** The photograph fills the band, with a very low-contrast paper grid between the photo and the page content. **Five ship** in `public/marketing/homepage/hero/`, catalogued in `docs/marketing-image-library.md` (owner 2026-09-08): `living-room.webp` (a man on a sofa at night), `bedroom.webp` (a woman on her bed at dusk), `coffee-shop.webp`, `coworking.webp`, `public-library.webp`. All five share one crop. **Above 1180px the hero has no color wash**: the photograph's own wall carries the copy. From 901px to 1180px a restrained left wash protects body copy as the crop brings the bed inward. On tablet and phone the copy stacks over the picture, so the top-down wash stays, clearing by the time the subject is in frame. The shipping photograph and grid were re-audited at 1440, 1024, 901, 834, and 390px on 2026-09-11: the H1 stays at or above 7.3:1, body copy at or above 4.57:1, and trust copy at or above 4.5:1. `HERO_PHOTO` in `MarketingHome.tsx` picks the one that ships; **the bedroom is live** (owner 2026-09-08; the living room shipped from 2026-09-07). Photo `alt` for each is the library's own suggested text; the code carries all five verbatim.

  The photo `alt` shipping today: `A woman sits cross-legged on her bed with a laptop at dusk, with modern artwork above the bed.`

  The exchange over the photo's lower right is `public/marketing/homepage/hero/lumo-chat.png`, one transparent image at 2x. It is not markup and it is not built from these strings; a change to it is a new export, not a code edit. Member bubble: `@offboard What should I focus on today?` (the handle in lime). Lumo's card, with Lumo's face beside it: a context chip `Used profile, applications, interviews, integrations`, then `Got it! Two things deserve your attention today.`, then two rows: `Prepare for your Figma interview` / `Senior Product Design at Figma` and `Update application status` / `Product Engineer at Stripe`. The 2026-09-03 Paper export (`hero-composition.avif`, the kitchen-table photo with the save-an-application exchange) is retired.

  **Two known copy-law breaches inside this image, and they are pixels, so no test can see them.** `CopyDrift.test.tsx` reads the DOM, and this text is not in the DOM — this entry is the only record of it. Recorded rather than fixed because the image reproduces the owner's Figma composition as drawn (2026-09-07); fixing either means a new export:
  1. It names **Figma** (twice) and **Stripe**. Everywhere else the site invents its example company (`Tesserac`). A real company's name inside a fabricated product screenshot is a different claim from an invented one.
  2. `Senior Product Design at Figma` and `Product Engineer at Stripe` render at roughly **3.5:1** on the near-black list, under the 4.5:1 that 12.5px text needs.

  **The `alt` deliberately does not name the companies**, so the breach stays inside the picture rather than entering the site's own text: `A conversation floats beside him. He asks Offboard what he should focus on today; Lumo notes it used his profile, applications, interviews, and integrations, and answers that two things deserve his attention: preparing for a senior product design interview, and updating the status of a product engineer application.`

### The four steps *(new in v3; four since round 5)*

- Kicker: `The short version`
- H2: `How Offboard works.`
- Lead: `Build a record of your career once, talk it through with Lumo, run your search from it, and follow the steps that fit your situation.` *(plan 050; was `Handle what has a deadline, build a record of your career once, connect it to the AI you already use, and run your search from it.`)*
- Steps (plan 050 order; the app's four Home stages, `NEXT_STAGES` in `lumo-plan-builder`), each linking to its own section:
  1. `Build your Career Context.` — `Your resume and where you are. Everything else reads from this.` → `Build your context` → `#build`
  2. `Talk with Lumo.` — `It reads your Career Context from the first question. Or connect the ChatGPT or Claude you already use, in beta.` → `See the connection` → `#connect`
  3. `Run your search.` — `Packets, tailoring, and a tracker that all read from your context.` → `See the toolkit` → `#run`
  4. `Follow your layoff plan.` — `The steps that fit your situation, in order.` → `See the plan` → `#plan`
- Retired 2026-09-10: `01 Steady the first week.` / `Deadlines, health coverage, and how long your money lasts, in the order they matter.` / `See what comes first` → `#steady`; step-2 body `Tell Offboard about your career once. It becomes a record you keep adding to.`; step-3 body `Lumo already knows it. ChatGPT and Claude connect in beta.`; step-4 title `Run your search with real tools.` and body `Decide, apply, interview, and keep every application straight.`

The beta wording in step 2 is not optional: the verified-facts ledger row
"Live integrations" governs every homepage mention of the ChatGPT and Claude
connections.

### Step 1 · Career Context

- Kicker: `Step 1 · Build your Career Context` *(plan 050; was `Step 2 · Build your context`)*
- H2: `One place that remembers your career.` *(widened from "your entire job search", owner strategy doc, plan 025)*
- Body: `Your resume is only a fraction of your career. Offboard builds a living record of your experience, accomplishments, applications, companies, conversations, documents, interviews, goals, and progress so you don't have to explain yourself from scratch every time you need help.`
- CTA: `Build my Career Context` — the section's only filled button (R3)
- Section link: `See what your Career Context holds` → `/career-context` *(off the page under plan 043 while the pillar was deferred; back with it under plan 045)*
- The eight categories moved to `/career-context` § 10 in round 4. This section names them in its body paragraph and links out.
- Record card (composition C), the section's only visual since the portrait behind it was retired in round 4: `Your Career Context` · `Always evolving. Available wherever you use Offboard.` · three rows — `Experience` / `Roles, projects, and outcomes`, `Applications` / `Tesserac · Interviewing`, `Interviews` / `Thursday · Prep ready`. Three source chips break its top edge: `Resume`, `LinkedIn`, `Interview story` (the same three sources `/career-context` § What goes in already names). The portrait photograph behind it is the one that used to open Built around you.
  - `Interviewing` is a real application stage (it is what the demo conversation moves Tesserac into). `Prep ready` is a real interview state in the product. Neither is a claim about outcomes.
- Retired with this section: v2's forest inset line `Build it once. Keep making it better. Let the tools you use work from the same understanding of you.`

### Step 2 · Talk with Lumo

- Kicker: `Step 2 · Talk with Lumo` *(plan 050; was `Step 3 · Connect it to the AI you use`)*
- H2: `Ask anywhere. The answer is about you.`
- Body: `Lumo reads your Career Context from the first question and tells you what matters first, including the deadlines and the money you may be owed. Prefer ChatGPT or Claude? Connect Offboard and take your context with you.` *(plan 050: the first-week substance now lives here as what Lumo raises first; "may be owed" hedges and promises nothing. Was `Lumo is Offboard's own guide and works from your Career Context from the first question. Prefer ChatGPT or Claude? …`)*
- Beta note *(ledger-governed)*: `ChatGPT and Claude connections are in beta.`
- CTA: `See how Offboard Everywhere works` → `/integrations` (the section's only action since `Ask Lumo` was retired in round 4; off the page under plan 043, back under plan 045)
- Demo conversation (composition B), unchanged from v2 and complete in the DOM. The earlier exchange sits behind the later one and is cropped by it, so the section shows one exchange at full size while both remain readable in order: You: `How does this role compare with the other opportunities I'm pursuing?` / AI: `Based on your Offboard context, Tesserac looks like one of your stronger opportunities. It aligns closely with your AI product experience and gives you more technical ownership than several of the other roles you're considering.` / You: `Move Tesserac to the interview stage and save that Ruben is my recruiter.` / AI: `Done. Tesserac is now in Interviewing, and I've added Ruben to the opportunity.`
- Chip on the composition: `Contact saved · Ruben`
- Retired here: v2's `Powered by Offboard Career Context` callout and the supporting line `Prefer another AI assistant? Connect Offboard and take your context with you.` (its substance is in the body above).

### Step 3 · Your job search toolkit

- Kicker: `Step 3 · Run your search` *(plan 050; was step 4)*
- H2: `The tools you run your search with.` *(round 4; the previous `Everything you need when the next opportunity appears.` read as a promise rather than a label, and the eyebrow already carries the plain one)*
- Lead *(the right half of the two-column intro)*: `Ten tools that read from the same context, so nothing is retyped and nothing is forgotten.`
- Section link: `See what each tool does` → `/job-search` *(off the page under plan 043, back under plan 045)*
- Four stages, each with the one-line decision already approved on `/job-search`: **Decide** `Whether this one deserves your week.` · **Apply** `What you actually send.` · **Interview** `Walking in prepared, not rehearsed.` · **Organize** `Where all of it is kept.`
- Tool names unchanged: **Decide** (`Role Match` · `Ghost Job Checker` · `Company Intel`) · **Apply** (`Application Packets` · `Resume Tailoring` · `Cover Letters`) · **Interview** (`Interview Prep` · `Voice Practice`) · **Organize** (`Application Tracker` · `Career Context`). Their ten descriptions moved to § 14 in round 4.
- Each group carries one product-state chip (`DESIGN.md` R8). Every one is a string the product actually produces, checked against `lumo-plan-builder` `origin/main` at `b8cb77ec`: Decide `Strong fit` (the Role Match label at a score of 80 or above) · Apply `Ready for review` (a job packet's `review_ready` status) · Interview `Prep ready` (the interview prep state) · Organize `Saved to tracker` (the save-a-job confirmation).
  - **Plan 039 proposed two chips that do not exist in the product** — `Thursday · Prep done` and `12 tracked`. Both were dropped rather than invented. Adding a chip here means finding it in the app first.

### Step 4 · Follow your layoff plan *(the band that was step 1, `Steady the first week`, until plan 050)*

- Kicker: `Step 4 · Follow your layoff plan` *(plan 050; was `Step 1 · Steady the first week` in round 5, and `More than a job search` before that)*
- H2: `Losing your job creates more than one problem.` *(kept: the eyebrow carries the plain label, so the headline may stay evocative, per R5a)*
- Section link: `See the steps after a layoff` → `/layoff-support` *(plan 050; was `See what to do first`, new in round 5)* *(off the page under plan 043, back under plan 045)*
- Body: `Unemployment benefits, health coverage, paperwork, funded training, the search, the offer. Offboard lays out the steps that fit your situation, in order, and Lumo tells you which one matters first.` *(plan 050; was `Finding another role matters. But so do unemployment benefits, health coverage, finances, career decisions, applications, networking, interviews, and figuring out what to do first. Offboard brings those pieces together.`)*
- ~~Six questions as a disclosure list (round 4), the first open so it still reads beside the plan card that answers it~~ — **retired from this band 2026-09-08 (owner)**: the two-column split above already carries the step, and six closed rows beneath it made the section long without adding an idea. The questions and answers are kept below for the record, and the disclosure pattern still ships on the five route FAQs.
  1. `What do I do first?` — **Your personalized plan** — `Tell Offboard what's happening, and we'll help organize what needs your attention now, what can wait, and what comes next.`
  2. `What support might I qualify for?` — **Benefits and workforce programs** — `Navigate unemployment insurance, training programs, workforce resources, and other forms of support that may be available where you live.`
  3. `Is this job worth my time?` — **Opportunity intelligence** — `Check role fit, investigate possible ghost jobs, research companies, and understand whether an opportunity deserves your energy.`
  4. `How do I submit a stronger application?` — **Application support** — `Turn your Career Context and the opportunity into stronger resumes, application packets, cover letters, and positioning.`
  5. `How do I prepare when I hear back?` — **Interview preparation** — `Research the company, anticipate questions, prepare stories from your experience, and practice interviews with AI.`
  6. `How do I keep everything straight?` — **Tracker + Career Context** — `Keep every opportunity, contact, document, conversation, and next step connected.`
- Plan-preview card *(rebuilt in plan 018 phase 3 from real product state; every string below is verbatim from `lumo-plan-builder` `origin/main`)*: heading `Layoff Plan` *(owner 2026-09-10: the app renamed Your Path to Layoff Plan; clarity outweighs the case of a member who was not technically laid off)* · lede `The steps that fit your situation. Do them in any order.` · stage row `Protect the first week` / `3 left` · steps `Write down your key dates` — `Most post-layoff mistakes are missed deadlines.` · `Understand your COBRA / health insurance options` — `A gap in health coverage can be financially devastating.` · `Secure your accounts and access` — `Paystubs, tax docs, benefits, and equity portals often live behind work logins that disappear without warning.` · `Show 2 done`
  - **Composition D (plan 039)** lifts one completed step out of the card as a satellite: `Update your LinkedIn profile` · `Done`. It is a real step in the product (`layoffPlanItems.ts`, id `linkedin`) and it is what the card's own `Show 2 done` row says exists. It carries no dollar figure and no deadline, so it needs no ledger row.
  - **Retired with the plan-018 rebuild** (do not reinstate; none of it exists in the product): heading `Your starting plan / Week one`, tabs `Now · This week · Coming up`, the `Priority / Possible / Next` status rows with their `Money / Support / Job search` categories, and the LUMO row `Ask Lumo what to do first / Context already attached`.
  - **Deliberately excluded** (owner decision 2026-08-26, claim-free subset): the real steps whose copy carries a benefit or severance number — `File for unemployment benefits` with `Takes 2-3 weeks to start`, and `Review your severance agreement` with `21 or 45 days to decide`. Both are real product copy but neither is in the verified-facts ledger above. Adding either to this card means adding a ledger row first.
- Small print: `Offboard is independent, not a government agency, and claiming your benefits is always free.`

### Plans (Free, Pro, Sponsored access)

- Kicker: `Offboard Pro`
- H2: `Free remembers your search. Pro puts it to work.`
- Body: `Free is the record: your layoff plan, your tracker, your benefit facts, and one complete Application Packet. Pro is Offboard doing the repeated application work for you, on every packet after it.` *(plan 047; was `Start free and build the foundation of your Career Context. When you want deeper intelligence, preparation, and personalized help, Offboard Pro uses that context to help you make better decisions and move faster.`)*
- Free ($0 forever): `Build your Career Context.` · `Track opportunities, companies, contacts, and activity.` · `One complete Application Packet, every step free.` · `Ask Lumo, 10 messages a day.` · `Connect ChatGPT or Claude to read your Offboard.` — footnote `Don't pay just to keep your job search organized. Upgrade when you want Offboard to do more with everything it knows.` *(plan 047 list; the v3 list was `Build your Career Context.` · `Track opportunities.` · `Save companies, contacts, notes, and activity.` · `Connect supported AI assistants.` · `Use core job-search tools.`)*
  - The footnote sat under the left-hand copy in v2. It moved into the Free card in v3 so the two cards end level; the sentence is unchanged and it is a statement about the free tier, which is where it reads best.
- Pro ($20/month): `Tailored resumes, cover letters, and interview briefs on every packet.` · `Enriched ghost checks and a path to a real person.` · `Ask Lumo without a daily limit, on the advanced model.` · `Compare opportunities using your complete Career Context.` · `Your connected assistant can run packets and checks for you.` — CTA `See Pro pricing` → `/pricing` *(plan 047 list; the v3 list was `Compare opportunities using your complete context.` · `Get deeper role and company intelligence.` · `Create advanced application materials.` · `Prepare for interviews using everything Offboard knows about you and the opportunity.` · `Analyze patterns across your job search.` · `Get more personalized recommendations about what to do next.`)*
- **Sponsored access** (third card, sand tint; copy is `/pricing`'s deck copy verbatim): price line `May be covered` — `Outplacement, modernized. Your former employer, school, or workforce organization may cover your access.` — `The full sponsored benefit is delivered to you.` · `Your private career activity remains yours.` · `Sponsors receive aggregate reporting only.` — CTA `Learn about sponsored access` → `/employers`. "Outplacement" is inside the Sponsored-tier exception.

### Sponsored access *(retired from the homepage 2026-09-02; kept for the record)*

- Kicker: `Sponsored access`
- H2: `Job-search support people will actually use.`
- Body: `Offboard can be sponsored by employers, workforce organizations, universities, and community partners so people navigating job loss can use the same system in Offboard or from the AI tools already part of their workflow.`
- Audiences: `Employers` — `Support people through layoffs of any size without requiring them to learn another outplacement portal.` · `Workforce and government` — `Give residents personalized guidance and modern career tools alongside existing public programs.` · `Universities and communities` — `Help members navigate career transitions with tools that stay useful beyond a single workshop or program.` *(source doc said "with infrastructure that"; "infrastructure" is never-say, substituted)*
- CTA: `Sponsor Offboard` → `/employers`

### Community *(three cards since 2026-09-02, owner direction)*

Kept because the `/community` legacy redirect targets `/#community` and the
newsletter fact ledger row lists Home. Row copy unchanged from v1; each row is
now a card with the partner's real mark, an outline button, and a one-line
note under it (notes are new, carried over from the live offboard.co site):

- Kicker: `Community` · H2: `Job searching is hard enough without doing it alone.`
- Body: `Practical job-market intelligence, people navigating the same uncertainty, and a real person when you feel stuck.`
- Rows:
  1. beehiiv mark · `The Offboard Newsletter` — `Weekly job-market analysis and honest takes on tech hiring. 5,000+ subscribers.` — `Subscribe free` → `https://newsletter.offboard.co` — note `Free, weekly, unsubscribe anytime`
  2. Slack mark · `Slack community` — `Job seekers sharing leads, asking questions, and keeping each other accountable.` — `Join the Slack` → `https://offboard.co/community` — note `Free to join`
  3. Offboard symbol · `Meet with a human` — `Stuck on your search? Share where you are and our team reaches out directly. Free.` — `Say hello` → `/intake` — note `Free, reviewed by our team`

**Brand marks on this page** (`public/marketing/logos/`, owner rule 2026-09-02:
real files, never drawn): Slack `slack.svg` from Wikimedia Commons
`Slack_icon_2019.svg` (the official mark) · ChatGPT `chatgpt.svg` from
Commons `ChatGPT_logo.svg` (the app icon) · Claude `claude.svg` from Commons
`Claude_AI_symbol.svg` · beehiiv `beehiiv.png` from beehiiv.com's own site
icon · Offboard `offboard-symbol.png` from the Civic Modern export. All fetched
2026-09-02.

### Final CTA *(the shared band since 2026-09-11)*

- Kicker: `You do not need the whole plan today` *(the shared band's kicker; the homepage had none)*
- H2: `You don't need another place to start over.`
- Body: `Build one Career Context. Keep your job search organized. Get help with what comes next. Use Offboard directly or bring it into the AI tools you already use.`
- CTAs: `Get started free` (primary) · `Talk to a person` *(the shared band's second link; new on the homepage)*
- Small print: `No credit card required.` *(this page's own; the shared default is `Independent support. Start free.`)*

**One closing band, every page (owner 2026-09-11).** The homepage shipped its
own `FinalCtaV2` with a different shape from the `FinalCta` every route page
uses, and `FinalCta` carried a three-dot progress mark under its small print
that nothing on the site used or explained. Both are retired. The words
change per page through props (kicker, H2, body, small print); the shape does
not.

The v1 homepage sections this version retired: The real problem, Identity
contrast, The three jobs, The hook band ($12k), One connected plan (its
plan-preview card survives, folded into More than a job search), Verified
facts (still on `/how-it-works`), Pricing teaser, Employer strip, Privacy
summary, and the shared Final CTA default copy (still used on route pages).
Their copy remains in git history; re-adding any of them is a copy decision
for the owner.

# 2 · How it works `/how-it-works`

**Deferred by plan 045 (owner 2026-09-07):** out of the nav, out of the sitemap, `noindex` on its own metadata. Still live because `/product`, `/why-offboard`, `/job-packet` and `/faq` 301 here. The copy below is what ships at that URL.

**Rebuilt 2026-09-07 (plan 044, owner decisions the same day).** The page is
the long form of the homepage's four steps: same names, same order, the
same `Step N · name` kickers, so a visitor arriving from the homepage strip
("The short version") finds their place. Plan 040 finding 1 had named the
gap (four steps on the homepage, five different ones here, and this page
never said `Career Context`); the homepage half shipped in round 5, this is
the other half. While `/layoff-support` is deferred (plan 043) this is the
launch set's only first-week page, so step 1 carries that depth (owner
decision 2). The benefits noun is the plain phrase `benefit deadlines`, not
a product noun (owner decision 3); the app's public label is `Benefits`.

**Meta title:** `How Offboard works | Four steps after a layoff`
**Meta description:** `Build your Career Context, talk it through with Lumo, run your search with real tools, and follow your layoff plan. Verified facts, one record, no starting over.` *(plan 050)*

Section order (plan 050): Hero → Step 1 Build your Career Context → Step 2
Talk with Lumo → Step 3 Run your search (`id="toolkit"`) → Step 4 Follow your
layoff plan → Benefits visual (decorative render) → Verified facts (shared
with `/layoff-support`) → Human support → Product FAQ (`id="faq"`) →
Final CTA. The two ids are SEO-load-bearing: `next.config.ts` sends
`/job-packet` and `/faq` to them.

### Hero

- Kicker: `How it works` · H1: `One system that starts where you are.` *(owner pick B, 2026-09-07; was `One plan that starts where you are.`, and `system` is the homepage hero's own noun)*
- Body: `Whether you were laid off yesterday, have been searching for months, or are still employed and reading the room: build your Career Context, talk it through with Lumo, run your search from it, and follow your layoff plan.` *(names the four steps in order so the reader has the map before the detail; plan 050 order)*
- CTA: `Get started free` *(the doc had `Build my free transition plan` while the code shipped the sitewide label since plan 040 finding 3; the code was right)*
- Aside: `The spine and the muscle` / `Your Career Context is the spine. The tools are the muscle.` / `Every step adds to one record, and every tool reads from it. No blank pages, no starting over.` *(same shape as before, opposite subject: the old aside said the plan was the spine, which is what the homepage says the record is)*

### Step 4 · Follow your layoff plan

- Kicker: `Step 4 · Follow your layoff plan` *(plan 050; was `Step 1 · Steady the first week`)* · H2: `See your money clearly, then claim what exists.` *(the two retired five-step titles, joined)*
- Lead: `Your runway, how long you can go, beside the benefit deadlines that are coming and what each one is worth. Then step-by-step paths to unemployment benefits, health coverage, and state-approved funded training, with verified official links. We never promise funding. We show you the exact path to find out.`
- Rows: `Runway calculator` — `How long your money lasts, and which deadlines change the math.` · `Benefit deadlines` — `Which unemployment, health coverage, and severance dates are coming, and what each one is worth.` · `Funded Training` — `State-approved programs that may be paid for while you train, with verified official links.` · `Paperwork Review` — `A read on your severance or offer paperwork before you sign anything.`
- Small print: `Offboard is independent, not a government agency, and claiming your benefits is always free.` *(the homepage's step-1 line)*
- Then the benefits render and the verified-facts strip (identical to `/layoff-support`; shared component; carries the ledger's 4,000+ and the four live states).

### Step 1 · Build your Career Context

- Kicker: `Step 1 · Build your Career Context` *(plan 050; was step 2)* · H2: `A few questions. A record that's actually yours.` *(was `A few questions. A plan that's actually yours.` under the kicker `The first ten minutes`)*
- Body: `Your situation, your state, your dates start it. Your resume, your LinkedIn, and the stories you tell in interviews fill it in. Offboard keeps one living record of your experience, applications, companies, conversations, documents, interviews, goals, and progress, so you never explain yourself from scratch again. Private by default, and you can change any of it.` *(the homepage step-2 nouns verbatim; the three sources are the homepage record card's chips)*
- Chips — `Adds context`: Your situation & state · Roles & resumes · Network. `Improves next`: Applications · Interviews · Runway · Offers. *(from the retired "Your context, kept"; `Money clock` left the list, it is an internal app concept, not a public name)*
- Onboarding visual, unchanged, every string real product state (verified in `lumo-plan-builder` `origin/main` 2026-09-07): `Where are you right now?` · `This sets your path. You can change it any time, or skip straight to the tools if you already know what you need.` · highlighted choice `I'm still employed, but at risk` · floating chips `I was just laid off` / `I know what I need` · button `Skip, I'll decide later` · small print `Private by default. This never appears to employers or recruiters. It only personalizes your path, deadlines, and what you may be entitled to.` Its role is now "where the record starts", which is what it shows.

### Step 2 · Talk with Lumo

- Kicker: `Step 2 · Talk with Lumo` *(plan 050; was `Step 3 · Connect it to the AI you use`, and `Meet Lumo` before that)* · H2: `An AI guide that knows your actual situation.`
- Body: `Lumo works from your Career Context, your benefit facts, your runway, and your search, not a blank chat window. It paces with you: triage in week one, interview drills in month three. Like a caseworker who answers in seconds, remembers everything, and never has a line.` *(`your plan` → `your Career Context`; otherwise the plan-016 line, protected by plan 040)*
- Trust line: `When Lumo talks about your benefits, it reads from human-verified state facts. It never invents a dollar figure or a deadline.`
- Connections, the homepage's own sentence: `Prefer ChatGPT or Claude? Connect Offboard and take your context with you.` · Beta note *(ledger-governed, not optional)*: `ChatGPT and Claude connections are in beta.`
- `Ask questions like`: `What deadlines am I coming up on?` · `Am I eligible for funded training?` · `Walk me through this severance agreement.` · `Help me prepare for tomorrow's interview.`

### Step 3 · Run your search *(`id="toolkit"`)*

- Kicker: `Step 3 · Run your search` *(plan 050; was step 4, and `The toolkit` before that)* · H2: `The tools didn't go anywhere. Now they show up at the right moment.`
- Lead: `Ten tools that read from the same context, so nothing is retyped and nothing is forgotten.` *(this page may now say the number: it lists the homepage's ten)*
- Four stages, the homepage's, with the same approved one-liners, product-state chips and glossary names: **Decide** `Whether this one deserves your week.` (`Role Match` · `Ghost Job Checker` · `Company Intel`, chip `Strong fit`) · **Apply** `What you actually send.` (`Application Packets` · `Resume Tailoring` · `Cover Letters`, chip `Ready for review`) · **Interview** `Walking in prepared, not rehearsed.` (`Interview Prep` · `Voice Practice`, chip `Prep ready`) · **Organize** `Where all of it is kept.` (`Application Tracker` · `Career Context`, chip `Saved to tracker`).
- Flagship: `Application Packet` — `Paste a posting and get a ghost-job check, a fit read, tailored materials, and a warm path to a real person, all kept with the role.` — chips `Ghost check · Fit read · Tailored materials · Warm intro` — link `Explore the Application Packet`
- Cards (renders on all three): `Resume Tailoring` — `Build and tailor resumes from your real history, ready for the role in front of you.` · `Interview Prep` — `Drills grounded in the role, the company, and your strongest stories, with practice runs before the real one.` *(the composite `Interview prep & practice` card split as the glossary anticipated; `Voice Practice` sits beside it in the strip)* · `Application Tracker` — `Every application, stage, and follow-up stays current without extra busywork.`
- Left this section with plan 044: the `Ghost Job Checker` card (it is in the strip), `Paperwork Review`, `Runway calculator` and `Funded Training` (step 1), and `Ask Lumo` (step 3 is Lumo).

### Human support

- Kicker: `Use the support that fits the moment`
- H2: `You can do this yourself. You should not have to do it alone.`
- Body: `Use Offboard on your own, ask Lumo for guidance when you get stuck, or talk with a real person when the situation needs more context.`
- Steps: `Work independently` — `Follow your plan, manage applications, and use the tools at your own pace.` · `Ask Lumo` — `Get guidance that uses the context already in your Offboard plan.` · `Talk with a person` — `Book available one-on-one support online or visit the Offboard office in Concord, California.`
- CTA: `Talk to someone` → `/intake` · Small print: `Availability, format, and pricing vary by support option.`

### Product FAQ — title `What to know about the product.` (kicker `Good questions`, `id="faq"`)

1. `Can Offboard tell me whether I qualify for benefits?` — `Offboard can help you find programs that may be relevant and get to the official source. The agency or provider responsible for the program decides eligibility, benefit amounts, and approval.`
2. `Is Offboard only for people in tech?` — `No. Offboard is designed for people navigating a layoff or job transition. Some job-search tools may be most developed for professional and knowledge-work roles today, and we will be clear when a feature is better suited to a particular kind of work.`
3. `What if I only need help with one part of my transition?` — `Start with what feels most urgent. You can organize a single application, research possible support, or build a broader transition plan. You do not need to complete every part at once.`
4. `Does Offboard guarantee benefits, interviews, offers, or placement?` — `No. Offboard helps you organize and improve the work of a transition, but it cannot guarantee eligibility decisions, interviews, offers, or job placement.`
5. `How is Lumo different from a general AI assistant?` — `Lumo works inside your Offboard plan, so it can use the transition, role, and application context you choose to save. It is designed to help with the work in Offboard, while still requiring your review and judgment.`

### Final CTA — shared default copy (see homepage).

### Retired from this page by plan 044 *(kept for the record)*

- The five-step list under `The plan, start to finish` / `Five steps from "what just happened" to "what's next."`: `Tell us where you are` · `See your money clearly` · `Claim what exists` · `Get ready, then run the search` · `Close it, and make it count`, with the tags `Your situation & state` · `Runway calculator · Money clock` · `Benefit sheets · Funded Training` · `Application Packet · Resume Tailoring` · `Interview Prep · Paperwork Review`.
- `Your context, kept` / `Stop repeating your story to every new tool.` and its integrations line `Connects to your stack. Your tools provide context. Offboard provides the plan.` — Calendar · Gmail · Drive · Slack (soon) · Notion (soon). **That line shipped Gmail as live against the ledger row "Live integrations" (Gmail is in progress, pending Google verification, owner 2026-09-07) and listed Slack, which the ledger does not.** Retiring the line is the fix; the integrations story has a page (`/integrations`, deferred) and a ledger row.
- The nouns `money clock`, `benefit sheets` and `starting plan`. `Money clock` and `benefit sheet` are internal app concepts, not public labels.

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
- **Free** (dark highlight card, per owner decision 2026-08-23): `$0 forever` — `Everything you need to run the search, and one complete Application Packet with every step free.` — features: `Layoff Plan, tracker, benefit facts, and documents` *(was `Your Path, …`, rename 2026-09-10)* · `One complete Application Packet, every step free` · `The assessment on every packet after that: is it real, who is the company, how you fit` · `3 basic ghost checks a month` · `Ask Lumo, 10 messages a day` · `Connect ChatGPT or Claude to read your Offboard and update your tracker`
- **Offboard Pro** (badge `For active searches`): `$20/month` · billing line `Or $45 every 3 months, which is $15 a month. Cancel anytime.` — `Offboard does the repeated application work for you, on every packet.` — features: `Tailored resumes, cover letters, interview briefs, and a path to a person on every packet` · `Enriched ghost checks: duplicate postings, employer reviews, salary benchmark` · `Ask Lumo without a daily limit, on the advanced model` · `Your connected assistant can run packets and checks for you` · `About 30 full packets a month. We email you at 25 and never stop a build without warning.`
- **Sponsored access** (badge `May be covered`): `Outplacement, modernized. Your former employer, school, or workforce organization may cover your access.` — features: `The full sponsored benefit is delivered to you` · `Your private career activity remains yours` · `Sponsors receive aggregate reporting only` — CTA `Learn about sponsored access` → `/employers`
- Deck note: `Credits pay for the extras outside your search: headshots, the brand kit, voice practice, and paperwork review. Everything in the Application Packet is covered by your plan. Claiming your government benefits is always free, on any tier.`

*Rewritten by plan 047 (2026-09-07) to the app's pricing reset (Sprints 412 to 414): the wall moved from "how many credits" to "which work". The retired deck for the record: Free `See your plan, your runway, and your benefit deadlines. Then build your first Application Packet.` with `Transition plan & benefit sheets · Runway calculator · First Application Packet free · Application tracking · 3 Lumo messages per day · 30 monthly credits`; Pro (`For active transitions`) `For an active transition that needs more room: research, tailoring, preparation, paperwork review, and unlimited Lumo.` with `Unlimited conversations with Lumo · More room for Application Packets and tailoring · Deeper application and interview support · 300 monthly credits`; note `Quarterly billing details and the full feature comparison are shown at checkout. Claiming your government benefits is always free, on any tier.`*

### What the plan covers *(was "How credits work"; plan 047)*

- Kicker: `What the plan covers` · H2: `The plan covers the search. Credits cover the extras.`
- Body: `Everything inside an Application Packet is covered by your plan, Free or Pro. Credits only pay for the extras outside the search, and the cost shows on the button before you run anything.`
- Items: `Covered by your plan` — `The path, the tracker, benefit facts, documents, ghost checks, Ask Lumo, and every step of an Application Packet your plan includes.` · `What credits buy` — `AI headshots, the brand kit, voice practice sessions, and paperwork review. Every tier includes a monthly allowance, and the price shows before you spend.` · `Human support` — `Eligible one-on-one support options are booked separately, with price and scope shown before you schedule.`
- ~~Retired: kicker `How credits work` · H2 `Pay only for the work that needs more horsepower.` · `Included monthly` — `Free includes 30 credits a month, Pro includes 300. They refresh monthly.` · `Clear costs` — `The price in credits is shown on the button before you spend anything.`~~ *(the app hides credit balances in its shell since Sprint 414; the site stops printing counts too)*

### Pricing FAQ — title `Pricing and support, without surprises.`

1. `Do I need a payment method to start?` — `No. The Free tier is not a trial. You can build your plan, see your runway and deadlines, track applications, and build your first Application Packet without adding a payment method.`
2. `What happens after my first Application Packet?` — `Every packet after it still runs the assessment: whether the job is real, who the company is, and how you fit. Tailored resumes, cover letters, interview briefs, and the path to a person are part of Pro.` *(plan 047; was `What happens when I run out of credits?` — `The core plan, benefit sheets, and tracking keep working. Credits gate the heavier product work, and they refresh monthly on both tiers.`)*
3. `Is there a limit on Pro?` — `Pro covers about 30 full packets a month. We email you at 25 and never stop a build without warning. Ask Lumo has no daily limit on Pro.` *(new, plan 047)*
4. `Can I cancel Pro any time?` — `Yes. Your plan, materials, and history remain yours on the Free tier after you cancel.`
5. `Is human support included?` — `Availability, format, eligibility, and pricing vary by support option. The booking page shows the current details before you schedule.`
6. `Does any tier charge for government benefits?` — `Never. Claiming your benefits is always free. Offboard charges for its own tools and support, not for access to public programs.`

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
- Body: `A layoff creates benefits, money, and job-search work all at once. Sponsored members get the full product: a personal plan, verified benefit deadlines, Application Packets, and human support options.`
- Items: `A plan from day one` — `Members start from their situation and state, and see what deserves attention first.` · `Verified benefit facts` — `Deadlines and dollar figures checked by people, with official links. Claiming benefits is always free.` · `The full toolkit` — `Application Packets, resume tailoring, interview prep, application tracking, and Lumo.`

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

### Public & workforce partners *(moved to `/workforce` in plan 035; the crosslink that stayed behind was removed by plan 043, because `/workforce` is deferred and a buyer must not be sent to a page being held back. The whole section returns when `/workforce` does.)*

- Kicker: `Public and workforce partners` · H2: `Agencies and workforce programs have their own page.`
- Body: `Workforce boards, counties, education partners, and public programs work differently from a company running a layoff. The reporting boundary, the pilot shape, and the agency handoff live on their own page.`
- Section link: `See Workforce & Government` → `/workforce`

### Employer FAQ — title `What employers ask.` *(plan 012)*

1. `Is there a minimum number of seats?` — `No minimum. Buy for two people or two hundred, with no contract. Pricing is $199 per employee, one-time, and drops to $169 per seat at 50 or more.`
2. `How fast can this be live?` — `Invitations go out the same day you upload a roster. Setup takes minutes, not weeks.`
3. `What exactly can we see?` — `Aggregate engagement only. For example, a sponsor can see that 19 of 24 people claimed access and 14 are active, but never anyone's resume, applications, or conversations. Not the CEO, not HR, nobody. That privacy line is contractual, not a preference.`
4. `How do people pay?` — `$199 per employee, one-time. Card or NET-30 invoice. No renewal, no SOW, no procurement cycle.`
5. `What does each person get?` — `90 days of full Offboard Pro: a personal plan, verified benefit deadlines, resume and application help, interview prep, and a real job feed.`

### Contact band *(retargeted to employers in plan 035; the public-partner version moved to `/workforce`)*

- Kicker: `Sponsored access` · H2: `Talk about sponsoring a group.`
- Body: `Tell us how many people are affected and when. Setup is self-serve, and we can walk you through it.`
- CTA: `Talk about sponsored access` → `mailto:hello@offboard.co?subject=Employer support`

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
- Items: `A private job-search workspace` — `The full Offboard workspace in one place, instead of scattered tools and paperwork.` · `Jobs and Application Packets` — `Find roles and build an Application Packet for each one, with fit and next steps included.` · `Applications, follow-ups, and documents` — `Track every application and follow-up, and keep resumes and other documents in one place.` · `Interview prep and Ask Lumo` — `Practice for interviews and ask Lumo for guidance grounded in the resident's own plan.`

### Worker-controlled privacy *(the reporting-boundary sentence is verbatim from the ACT playbook; do not soften or embellish)*

- Kicker: `Worker-controlled privacy` · H2: `Aggregate for the program. Private for the resident.`
- Body: `ACT reporting is aggregate-first. The program can understand applications, approvals, claims, onboarding, and engagement without seeing private resumes, documents, Lumo conversations, or individual job-search behavior.`
- `What the program sees`: Application funnel · Approval and claim visibility · Aggregate engagement · Weekly signup trends · Cohort or jurisdiction view
- `What stays private`: Resumes · Documents · Lumo conversations · Individual job-search behavior

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

# 8 · Workforce & Government `/workforce`

**Replaced `/public-partners` on 2026-09-01 (plan 035, phase 3 of the site
IA roadmap).** The owner's 2026-09-01 decision was to consolidate: the thin
`/public-partners` crosslink page is retired, `/public-partners` 301s here,
and the public-sector material that plan 005 had parked on `/employers`
moves here. `/employers` keeps a one-line crosslink.

**This page is inside the B2G language firewall** (COPY.md § Language
rules), the same rules `/act` runs under:

- The category claim "the modern unemployment office" never appears here.
- Banned: "guaranteed jobs", "government-endorsed", "case management
  replacement", "benefit eligibility system", any claim of official
  endorsement.
- **`/act`'s scoped vocabulary does not travel.** "Career transition" and
  "workspace" are allowed on `/act` only, so the resident-benefit copy
  below is rewritten off `/act`'s rather than reused from it.
- "Outplacement" is a buyer word for `/employers` and Sponsored-tier copy.
  It does not appear here, and this page is in the CopyDrift absence list.

**No county is named.** `/act` names Alameda County because that pilot page
is scoped to it and the owner approved it as geography. On a general
agency-facing page a county name would read as a reference or a signed
relationship, and no such claim is approved.

**Deliberately not claimed.** The app repo's B2G document set describes
WIOA/WARN compliance reporting, equity and demographic dashboards,
cross-agency routing, case-management integration, procurement vehicles,
and ROI figures. None of it appears here: the app repo's own plan 047
records the B2G pilot as frozen at one seeded jurisdiction, so those are
roadmap descriptions rather than shippable claims. Everything below traces
to copy already approved for public display on `/act` or `/employers`.

**No prices.** Employer pricing is public ($199 / $169 per seat). B2G
pricing is volume-based and procurement-dependent, and has no owner
approval for public display, so this page ends in a conversation.

**Meta title:** `Workforce & Government | Offboard`
**Meta description:** `For workforce boards, counties, and public programs: Offboard organizes the practical transition work around the official system and routes residents to the responsible agency for decisions. Agencies decide. Offboard helps people prepare and continue.`

### Hero

- Kicker: `Workforce and government`
- H1: `Agencies decide. Offboard helps residents prepare and continue.`
- Body: `Residents lose weeks to forms, phone trees, and appointment windows before anyone helps them plan. Offboard gives them a private place to organize the practical work and routes them back to the responsible agency for every official decision.`
- CTA: `Start a partnership conversation` → `mailto:hello@offboard.co?subject=Workforce partnership`
- Aside: `A clear boundary` / `Planning support, not an eligibility authority.` / `Offboard organizes the practical work and routes residents to the responsible agency or provider for official decisions and applications.`

### What Offboard does beside your program *(moved verbatim from `/employers`, plan 005 copy)*

- Kicker: `Beside what you already run`
- H2: `Agencies decide. Offboard helps people prepare and continue.`
- Body: `For workforce boards, education partners, and public programs: Offboard organizes the practical work around the official system and routes residents to the responsible agency or provider for decisions and applications. Offboard does not determine eligibility, calculate benefits, or replace case workers.`
- Items:
  1. `Orient` — `Start from the resident's situation and surface what may deserve attention now.`
  2. `Route` — `Possible programs appear beside their responsible official source or local provider.`
  3. `Follow through` — `Deadlines, questions, materials, and next steps stay in one private place.`

### What a sponsored resident gets *(rewritten off `/act` § What residents get, whose "workspace" vocabulary is scoped to that page)*

- Kicker: `What residents get`
- H2: `A plan they can work at 9pm, not an appointment in six weeks.`
- Body: `One private place for the whole transition: the benefits side, the money side, and the search, with guidance that already knows their situation.`
- Capabilities:
  1. `A plan from day one` — `Residents start from their own state, dates, and situation, and see what deserves attention first.`
  2. `Verified benefit facts` — `Deadlines and dollar figures checked by people, with the official link for each one. Claiming benefits is always free.`
  3. `The full toolkit` — `Application Packets, resume tailoring, interview prep, application tracking, and Lumo.`
  4. `It starts the same day` — `A resident who claims access can begin that evening, on a phone, without waiting on a callback.`

### Aggregate for the program. Private for the resident. *(the sees/stays-private lists are verbatim from the ACT playbook; the body sentence is the approved `/employers` formulation)*

- Kicker: `Reporting boundary`
- H2: `Aggregate for the program. Private for the resident.`
- Body: `Sponsors receive aggregate participation and outcome reporting, never individual applications, conversations, finances, or reflections. Reporting and visibility are defined before participation begins.`
- `What the program sees`: `Application funnel` · `Approval and claim visibility` · `Aggregate engagement` · `Weekly signup trends` · `Cohort or jurisdiction view`
- `What stays private`: `Resumes` · `Documents` · `Lumo conversations` · `Individual job-search behavior`
- Line: `That privacy line is contractual, not a preference.`
- Section link: `See exactly who can see what` → `/privacy-security`

### A pilot that sits beside what you already run

- Kicker: `How a pilot starts`
- H2: `Small, scoped, and reviewed after 30 days.`
- Body: `Nothing here asks you to replace a system or run a procurement cycle first. A pilot is deliberately small enough to evaluate honestly.`
- `Suggested pilot shape`: `One jurisdiction or cohort` · `25 to 100 residents` · `3-month sponsored access` · `First review after 30 days`
- Objection: `Is this replacing our workforce system?` — `No. Offboard is a resident-facing support layer and a pilot path. It sits beside existing workforce systems and focuses on faster activation.`

### What Offboard will not do *(compliance-reviewed; do not reword casually)*

- Kicker: `Straight answers`
- H2: `Offboard is not a government agency.`
- Body: `Offboard helps people organize their transition and reach official sources. Government agencies and program providers make eligibility, benefit, and approval decisions. Offboard does not replace qualified legal, tax, financial, healthcare, or benefits guidance.`
- Line: `Offboard does not determine eligibility, calculate benefits, or replace case workers. We never promise funding. We show residents the exact path to find out.`

### Contact band

- Kicker: `Partnership inquiries`
- H2: `Build a clearer route through the transition.`
- Body: `Tell us which residents you serve, which systems they navigate, and where the current handoff breaks down.`
- CTA: `Start a partnership conversation` → `mailto:hello@offboard.co?subject=Workforce partnership`

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

# 10 · Career Context `/career-context`

**Added 2026-08-31 (plan 025, first pillar of the owner's site-architecture
strategy). Copy drafted from the owner's outline; owner sign-off gates
merge.** Not in header nav yet (the Product dropdown waits for more pillar
pages); linked from the homepage Career Context section and the footer
Product column.

**Meta title:** `Career Context | Offboard`
**Meta description:** `Build your Career Context once: one living record of your experience, applications, interviews, and goals that every Offboard tool and connected AI reads from.` *(plan 046 trimmed all five product descriptions under 160 characters)*

### Hero

- Kicker: `Career Context`
- H1: `Build your Career Context once. Use it everywhere.` *(round 5: the product noun is capitalised when it means the product)*
- Body: `One living record of your experience, applications, companies, interviews, and goals. Offboard builds it with you and puts it to work in every tool you use.` *(round 5: the hero, the next H2, and that section's body all made the same resume argument before the page said anything new; the hero now states the promise and section two carries the argument)*
- CTA: `Create my Career Context` (primary)

*Plan 049 (owner 2026-09-08): the hero's right column is the Civic Modern composition `career-context-sources-civic-modern-v2-transparent.webp`. It reads: `Your Career Context` · `Always evolving. Available whenever you use Offboard.` · a completeness bar at `71/100` · rows `Experience` / `Applications` / `Interviews` / `Goals` · sources `Resume`, `LinkedIn`, `Chat history` · state `Context updated`. Pixels; this is the record. It replaces plan 048's app screenshot, and the plan-042 paper aside stays retired.*

*Hero aside added by plan 042. The page is about an object and the hero
never showed it: it shipped `aside={false}`. The aside is the standard
hero card with a three-row record inside it — `Your Career Context` /
`One living record.` / `Experience` — `Roles, projects, and outcomes` ·
`Applications` — `Tesserac · Interviewing` · `Interviews` —
`Thursday · Prep ready`. Sample rows, the same contract as every other
product sample on the site.*

### Why a resume isn't enough *(rebuilt by plan 042; a photo split since plan 046)*

*Plan 046 (owner 2026-09-07): the resume-sheet composition is retired and the section is a split with a photograph, `raw/system-desk.webp` (a man at a desk by a window, writing beside a laptop), on the left. The copy is unchanged; the payoff line keeps its rule above it.*

- Kicker: `The problem`
- H2: `A resume is a fraction of your career.`
- Body: `A resume compresses years of work into one page for one audience. It leaves out the projects that went well, the numbers behind them, the people you worked with, what you learned in interviews, and what you actually want next. So every new tool, and every new conversation, starts from scratch.`
- Payoff line: `Every time you explain yourself to a new tool or a new chat window, the context evaporates when the tab closes.`
- Composition (R2/R13): a `RESUME.PDF` sheet as the base, drawn as bars rather than fake prose, with three chips breaking its left edge: `Project · Billing migration` · `Story · Why we cut scope` · `Goal · Staff role, remote`.

*This section used to be a three-cell numbered grid, and it was the worst
instance of that pattern on the site: the odd-count rule promoted cell 01,
`What a resume holds`, to full width, which made the resume the visual hero
of a section arguing the resume is the small thing. Cells 1 and 2
(`What a resume holds`, `What your career holds`) are retired: the body
paragraph above already says everything they said, and the composition now
shows it. Cell 3, `What keeps getting lost`, survives verbatim as the
payoff line.*

### What goes in *(merged into "What it holds" by plan 042)*

*This section was an eight-card grid sitting directly above another
eight-card grid, sixteen identical cards in a row, and the two lists
overlapped: `Goals & preferences` against `Preferences` plus `Goals`,
`Applications & contacts` against `Applications` plus `Contacts`, and
`Resume import` against `Experience` plus `Documents`. The sources are now
a chip row under the one grid that matters, which is what they always were:
where the record comes from, not a second taxonomy of it. The eight
`Bring what you already have` cards are retired.*

### What it holds *(moved here from § 1 in round 4, 2026-09-02; rendered as the record itself since plan 046)*

*Plan 046: the eight icon cards are one record card, `Your Career Context` / `One living record.` with eight rows (name left, description right), beside the copy. Same shape as the hero card and the Lumo page's card, so the page shows the record three times in one shape. The source chips sit under the copy.*

- Kicker: `What it holds` · H2: `Eight kinds of record, one place.`
- `Experience` — `Roles, skills, accomplishments, and outcomes.` · `Applications` — `Every opportunity and what happened with it.` · `Companies` — `Research, notes, people, and hiring signals.` · `Contacts` — `Recruiters, hiring managers, and referrals.` · `Documents` — `Resumes, job descriptions, and other files.` · `Interviews` — `Conversations, preparation, notes, and next steps.` · `Preferences` — `The work you want, where, and on what terms.` · `Goals` — `What you are working toward and what needs attention.`
- `Preferences` keeps the wording already used by `Goals & preferences` in § What goes in, rather than a second phrasing of the same idea.

- Body *(added by plan 042, carrying the retired "What goes in" lede)*: `Offboard builds the first version from the things you already have, in minutes, and it keeps getting better as you use it.`
- Source chips, under the grid: label `Built from what you already have` · `Resume` · `LinkedIn` · `ChatGPT history` · `Portfolio and documents` · `Interview stories`

### In and out *(plan 046 merged "It gets better as you go" and "What it powers": two thin ruled sections back to back, one inputs and one outputs)*

- Kicker: `In and out` · H2: `Every step makes it smarter. Every output starts from it.`
- Two columns, labelled `What goes in` (the three blocks below, question and body, the feature label dropped) and `What comes out` (the four capabilities from the next entry).

### It gets better as you go *(the "What goes in" column since plan 046)*

- ~~Kicker: `Always evolving`~~
- ~~H2: `Every step of your search makes it smarter.`~~
- Question blocks:
  1. `You apply to a role` — **Applications** — `The role, the company research, and the materials you used stay connected to the outcome.`
  2. `You finish an interview` — **Interviews** — `Questions asked, answers given, and what to prepare next become part of the record.`
  3. `You talk it through` — **Conversations** — `Decisions and updates you make in conversation, with Lumo or a connected assistant, land in your Career Context instead of vanishing.`

### What it powers *(the "What comes out" column since plan 046)*

- ~~Kicker: `Put it to work`~~
- ~~H2: `One record. Every output.`~~
- Capabilities:
  1. `Tailored resumes` — `Resume versions built from your real history, tuned to the role in front of you.`
  2. `Application Packets` — `The role, the company, your positioning, and your materials in one place.` *(glossary casing, plan 045)*
  3. `Interview preparation` — `Prep plans and practice grounded in your actual experience and the actual role.`
  4. `Better decisions` — `Compare opportunities against your experience, preferences, and how your search is going.`

### How Lumo uses it *(an item in the shared `Also part of the system` strip since plan 046; the band is retired)*

- Strip item: `Lumo starts every conversation already caught up.` — `Because it works from your Career Context, you never re-upload a resume or re-explain your goals.` → `See how Lumo works` → `/lumo`
- Second strip item: `Your context goes with you.` — `Connect ChatGPT or Claude and your Career Context is there too. Save a role or add what you learned from wherever you are working.` → `See how Offboard Everywhere works` → `/integrations`
- ~~Kicker: `Meet Lumo` (Lumo eyebrow treatment)~~
- H2: `Lumo starts every conversation already caught up.`
- Body: `Because Lumo works from your Career Context, you never re-upload a resume, re-explain your goals, or reconstruct what happened with an application. You ask, and the answer starts from everything you have already built.`
- CTA: `Ask Lumo` (AI button)

### Works with the AI you already use *(retired from this page by plan 045's messaging pass, 2026-09-07: it restated `/integrations`, and it sat directly under a Lumo band that already hands the reader on. Kept for the record.)*

- ~~Kicker: `Offboard, wherever you work`~~
- H2: `Your context goes with you.` *(round 5: this H2 shipped on two pages; it stays on `/integrations`, where it titles the grid)*
- Body: `Connect Offboard to supported AI assistants and your Career Context goes with you. Save an opportunity from a conversation, update an application, or add what you just learned, from whichever tool you are already in.`
- Demo conversation: You: `Save the interview questions I just worked through, and what I answered.` / AI: `Done. I have added them to your interview stories.` *(varied 2026-08-31 so it does not duplicate the /integrations demo, which owns the project-outcomes line)*

### Yours, and private *(numbering moved to CSS by plan 042)*

- Kicker: `Private by default`
- H2: `Your Career Context belongs to you.`
- List *(three rows since plan 046; rows 2 and 3 were also rows on `/integrations` and the whole answer lives on `/privacy-security`)*:
  1. `You choose what goes in, and you can edit or remove anything.`
  2. `Connected assistants and sponsors see only what you authorize, never the whole record.`
  3. `You can export what you have built. It is yours.`
- Section link: `See exactly who can see what` → `/privacy-security`

### Final CTA (shared component, overridden copy)

- H2: `Stop starting from scratch.`
- Body: `Build your Career Context once and every application, interview, and conversation after it starts further ahead.`
- CTAs: sitewide primary + `Talk to a person`

# 11 · Offboard Everywhere `/integrations`

**Added 2026-08-31 (plan 028, second pillar of the site-architecture
strategy).** The consumer-facing version of the connected-assistant story.
Deliberately never says "MCP" in user-facing copy. Not in header nav yet;
linked from the homepage "wherever you work" section and the footer.

**Rebuilt as a showcase 2026-09-01 (plan 033, owner direction).** The page
leads with a card grid of the real integrations instead of a long prose
section. "The idea" editorial block was cut and its H2 now titles the grid.

**Owner verification, item 1: RESOLVED 2026-09-01.** ChatGPT and Claude
connections both exist and work today. They ship labelled **Beta**, the
owner's own framing, because they are still being refined. The three tool
connections (Google Calendar, Google Drive, Calendly) ship as **Live**.
Gmail and Notion ship as **In progress** with no date attached anywhere.

**Owner verification, item 2 still OPEN.** The permissions section is
written at the level of principle only ("a connection is scoped, you
authorize it, you can disconnect"). It deliberately does NOT publish a
capability matrix of what a given assistant can and cannot reach, because
the real authorization model is not settled. When it is, that matrix
belongs here.

**Meta title:** `Offboard Everywhere | Use Offboard from the AI you already use`
**Meta description:** `Connect Offboard to ChatGPT, Claude, and the tools you already use. Save roles, update applications, and add to your Career Context from wherever you are working.`

### Hero

*Plan 046: the hero's right column shows the five connected marks (Google Calendar, Google Drive, Calendly, ChatGPT, Claude) as tiles with their status chips, nothing clickable.*

- Kicker: `Offboard everywhere`
- H1: `Use Offboard from the AI you already use.`
- Body: `Your job search does not live in one tab. Connect Offboard to the assistants you already work in, and save opportunities, update applications, and add to your Career Context from wherever the conversation happens.`
- CTA: `Get started free` (primary)

### What connects (the showcase grid)

- Kicker: `What connects`
- H2: `Offboard holds the record. You choose the interface.`
- ~~Body: `Connect the tools you already work in. Offboard keeps one record of your search, and a connection reads and updates it with your permission.`~~ *(cut by plan 045: the H2 says it, and Permissions below owns "with your permission")*
- Group heading: `Connected today`
  1. **Google Calendar** · `Live` — `Interviews and deadlines land on the calendar you already keep.`
  2. **Google Drive** · `Live` — `Save resumes and cover letters straight to your Drive.`
  3. **Calendly** · `Live` — `Book networking calls and coffee chats without leaving your search.`
  4. **ChatGPT** · `Beta` — `Save a role, move an application forward, or add to your Career Context from a ChatGPT conversation.`
  5. **Claude** · `Beta` — `Work through a project or an interview in Claude and have what you decide land back in your record.`
- Group heading: `In progress`
  6. **Gmail** · `In progress` — `Follow application email and replies without hunting through your inbox.`
  7. **Notion** · `In progress` — `Export your job search record to Notion.`
- Note under the grid: `ChatGPT and Claude are in beta. They work today and we are still refining them. The ones marked in progress are being built, and we do not put dates on them.`

The cards are a showcase, not links: nothing in the grid is clickable. The
ChatGPT and Claude marks are the partners' real files (sources in § 1); the
Google, Calendly and Notion marks are still hand-authored SVG
(`IntegrationLogos.tsx`) and are tracked for replacement under the owner's
2026-09-02 rule. Partner marks are the one place on the site allowed
outside the Civic Modern palette. Statuses are governed by the verified-facts ledger
row "Live integrations": changing what ships here changes that row in the
same PR.

**Retired 2026-09-01:** the "The idea" editorial block (kicker `The idea`,
the three contrast cards `Without a shared record` / `With Offboard
connected` / `What that changes`, and the long "Offboard keeps the
structured record" body). Cut for length on owner direction; the H2 it
carried moved to the grid above.

### Demos

- Kicker: `In practice`
- H2: `The same record, from wherever you are working.`
- **ChatGPT** — You: `I think I'm going to apply to this. Add it to Offboard.` / AI: `Done. I've added the role to your Offboard tracker and saved the company context.` with tracker card `Product Designer / Tesserac / Saved`
- **Claude** — You: `Add the project outcomes we just discussed to my Career Context.` / AI: `Done. I've added the migration project and its results to your experience.`
- **Lumo** — You: `Which applications need attention today?` / AI: `Three need follow-up. Tesserac has an interview on Thursday, and two applications have been open for more than two weeks without a reply.`

### What you can do from a conversation *(retired by plan 045's messaging pass: the four capabilities restated the three demos directly above. Kept for the record.)*

- ~~Capabilities:~~
  1. `Save an opportunity` — `Turn a role you are already discussing into a tracked opportunity, without filling out a form.`
  2. `Move it forward` — `Change a stage, add a recruiter, record what happened in an interview, or leave yourself a note.`
  3. `Add to your Career Context` — `Capture a project, an outcome, or a story while it is fresh, straight from the conversation.`
  4. `Ask across your whole search` — `Compare opportunities, or ask what needs attention, against everything Offboard already holds.`

### Permissions

- Kicker: `Permissions`
- H2: `You decide what a connected assistant can reach.`
- Body: `Connecting an assistant does not hand over your whole account. You authorize what it can read and what it can change, and the connection is yours to end.`
- List:
  1. `A connection is scoped. An assistant works with the parts of your Career Context you authorize, not everything in your account.`
  2. `You can review and change what a connected assistant can reach.`
  3. `You can disconnect an assistant at any time. Your record stays with Offboard.`
  4. `Sponsors never see your record. Sponsored access reports participation in aggregate only.`

### Prefer to stay in Offboard *(an item in the shared `Also part of the system` strip since plan 046)*

- Strip item: `Lumo is the assistant that lives inside your record.` — `If you would rather not connect anything, Lumo works from the same Career Context without leaving Offboard. Connecting an outside assistant is an option, not a requirement.` → `See how Lumo works` → `/lumo`
- Second strip item: `One record, whichever door you use.` — `Every connection reads from and writes to your Career Context. Build it once and it is there in Offboard, in ChatGPT, and in Claude.` → `See what it holds` → `/career-context`
- ~~Kicker: `Or use Lumo`~~
- H2: `Lumo is the assistant that lives inside your record.`
- Body: `If you would rather not connect anything, Lumo works from the same Career Context without leaving Offboard. Connecting an outside assistant is an option, not a requirement.`
- CTA: `Ask Lumo` (AI button)

### Final CTA (shared component, overridden copy)

- H2: `Keep your search in one place, wherever you work.`
- Body: `Build your Career Context once, then reach it from Offboard or from the assistants you already use.`
- CTAs: sitewide primary + `Talk to a person`

# 12 · Lumo `/lumo`

**Added 2026-08-31 (plan 029, third pillar).** Lumo already appears in four
places (homepage § 1, `/how-it-works` § 2, `/career-context` § 10,
`/integrations` § 11), so this page takes the angle none of them do: what
Lumo actually knows, what you can ask it, and why that differs from pasting
a resume into a general assistant. Not in header nav yet.

**Meta title:** `Lumo | The AI that already understands your career`
**Meta description:** `Lumo is Offboard's AI assistant. It starts every conversation from your Career Context, your applications, and your plan, so you never explain yourself first.`

### Hero

- Kicker: `Meet Lumo`
- H1: `The AI that already understands your career.`
- Body: `Lumo is Offboard's assistant. It works from the record you have already built, so a question about your search starts from your actual situation instead of a blank chat window. You spend the conversation on the decision instead of on context.` *(plan 046: the last sentence is the retired "difference" section's payoff line)*
- Hero visual *(plan 049; was plan 048's app screenshot of the Ask LUMO panel, now unused)*: the Civic Modern composition `lumo-interview-context-civic-modern-v1-transparent.webp`. It reads: chip `Used role, resume, interview notes` · question `How should I prepare for this interview?` · answer `Start with the role.` (highlighted) `I pulled the requirements, your strongest examples, and the company context.` · state `Interview brief · Ready`. Pixels, so no test can read them; this is the record.
- CTA: `Get started free` (primary)

### What Lumo knows *(rebuilt by plan 045, plan 040 finding 10: the eight cards re-listed `/career-context`'s eight kinds of record)*

- Kicker: `What it knows`
- H2: `It starts from your record, not a blank page.`
- Body: `Everything in your Career Context is already there: your experience, applications, companies, interviews, and goals. Lumo also carries three things no other assistant has.`
- Section link: `See what your Career Context holds` → `/career-context`
- Three blocks (Pattern H): `Your plan` — *Layoff Plan* *(was Your Path, owner rename 2026-09-10)* — `What needs attention now, what can wait, and what comes next.` · `Benefits context` — *The practical side* — `Where you are with deadlines, coverage, and runway, so the answer fits the week you are actually in.` · `Previous conversations` — *Memory* — `What you already worked out together, so you are not repeating it.`
- ~~Cards (the eight, retired):~~
  1. `Your Career Context` — `Experience, projects, outcomes, and the stories you reach for in interviews.`
  2. `Your applications` — `What you applied to, what stage it is at, and what happened.`
  3. `Companies` — `What you researched and learned about the teams you are talking to.`
  4. `Interviews` — `Questions asked, answers given, and what to prepare next.`
  5. `Your goals` — `The work you want, and what you said you were optimizing for.`
  6. `Your plan` — `What needs attention now, what can wait, and what comes next.`
  7. `Benefits context` — `Where you are in the practical side of a transition.`
  8. `Previous conversations` — `What you already worked out together, so you are not repeating it.`

### What you can ask

- Kicker: `What to ask`
- H2: `Questions that would take a stranger an hour to answer.`
- Rendered as chat bubbles in two columns since plan 046.
- Prompts:
  1. `What should I focus on today?`
  2. `Is this opportunity worth my time?`
  3. `Help me prepare for tomorrow's interview.`
  4. `What support might I qualify for?`
  5. `How do I make this application stronger?`
  6. `What patterns do you see across my search?`
  7. `Add what we just worked out to my Career Context.`
  8. `Move Tesserac to the interview stage.`

### Why this is different *(retired by plan 046: its composition is the hero visual and its payoff line is the hero body's last sentence. Kept for the record.)*

- ~~Kicker: `The difference`~~
- H2: `Not a smarter chatbot. A better starting point.`
- Body: `The difference is not a smarter model. It is what the conversation starts from: your Career Context, kept current, instead of whatever you can paste into a message box.` *(plan 045; was `Lumo is not claiming to out-think a general assistant. The difference is what it is working from: the structured, continuously updated state of your career, rather than whatever you can paste into a message box.`, the "cooler register" plan 040 flagged)*
- Payoff line *(plan 042)*: `You spend the conversation on the decision instead of on context, and the answer is about your search rather than job searching in general.`
- Composition *(plan 042, R2/R13)*: the Career Context record card as the base, because it is what Lumo starts from, with a blank composer breaking its left edge: `Any other assistant` / `Tell me about yourself...`

*Was a three-cell numbered grid. Cells 1 and 2 (`Pasting a resume into a
chat`, `Asking Lumo`) described the two starting points; the composition
shows them. Cell 3, `What that changes`, survives verbatim as the payoff
line.*
- Contrast blocks:
  1. `Pasting a resume into a chat` — `One document, no history, and none of it is there tomorrow. Every conversation restarts from zero.`
  2. `Asking Lumo` — `Your experience, applications, interviews, and goals are already there, and what you decide together is saved back.`
  3. `What that changes` — `You spend the conversation on the decision instead of on context, and the answer is about your search rather than job searching in general.`

### What Lumo will not do

*Plan 046: a photo split; `raw/hero-kitchen-table.webp` (a man at his kitchen table with a laptop, coffee, and a notebook) on the left of the forest band.*

- Kicker: `Straight answers`
- H2: `It works from verified facts, and it does not decide anything for you.`
- List:
  1. `When Lumo talks about benefits, it reads from state facts a person verified. It does not invent a dollar figure or a deadline.`
  2. `Offboard is independent, not a government agency. Agencies and providers decide eligibility and benefit amounts.`
  3. `Lumo helps you do the work. It does not replace your review and judgment on anything you send out.`
  4. `Free includes 10 Lumo messages a day. Pro removes the limit.` → `/pricing` *(plan 047: the app's daily allowance is 10 since Sprint 413)*

### Prefer a different assistant *(an item in the shared `Also part of the system` strip since plan 046)*

- Strip item: `Prefer ChatGPT or Claude? That works too.` — `Lumo lives inside Offboard, but it is not the only way in. Connect the assistant you already use and it works from the same record.` → `See how Offboard Everywhere works` → `/integrations`
- Second strip item: `Everything Lumo knows starts here.` — `Your Career Context is the record every answer is built from. Build it once and every conversation starts further ahead.` → `See what it holds` → `/career-context`
- ~~Kicker: `Or bring your own`~~
- H2: `Prefer ChatGPT or Claude? That works too.`
- Body: `Lumo is the assistant that lives inside Offboard, but it is not the only way in. Connect the assistant you already use and it works from the same record.`
- Section link: `See how Offboard Everywhere works` → `/integrations`

### Final CTA (shared component, overridden copy)

- H2: `Ask something only your own record could answer.`
- Body: `Build your Career Context, then ask Lumo what to do about it.`
- CTAs: sitewide primary + `Talk to a person`

# 13 · Layoff & Benefits `/layoff-support`

**Added 2026-08-31 (plan 030, fourth pillar).** The strategy doc calls this
the strategically important one: without it the product pages drift toward
an AI job-search tool and away from the modern unemployment office. It is
also the most claim-sensitive page on the site.

**Claim discipline on this page:**
- Never promises funding, eligibility, approval, or amounts. The approved
  formulation is used verbatim: `We never promise funding. We show you the
  exact path to find out.`
- The independence disclaimer appears in its own band, reusing the
  `/about` wording.
- The only numbers are existing verified-facts ledger rows, rendered by
  the shared `VerifiedFactsStrip` (live states CA/NY/NJ/WA; 4,000+
  state-approved California training programs; the checked-by-people
  rule). The ledger's "Appears on" column was updated for both rows.
- **"Outplacement" must not appear here** (jobseeker narrative copy), and
  the page is in the CopyDrift absence list.
- **No benefit or legal day counts, owner decision 2026-09-04 (plan 041).**
  The app knows the COBRA election window, the lag before a first payment,
  and the ADEA consideration and revocation windows. None of them render on
  this site. The marketing site does not get that granular: every sentence
  that would carry one is qualitative instead, and no ledger row was added
  for any of them. This is the same call the owner made for the homepage
  plan card on 2026-08-26. `CopyDrift.test.tsx` enforces it - the page must
  not say `60 days`, `21 days`, `45 days`, `7 days`, or `2-3 weeks`.

**The `~$12,000` CalJOBS hook ships here (owner approval 2026-09-01, plan
033).** It left the homepage in v2 and this page is its documented home. It
ships with its conditions and the "amounts vary" small print attached, per
the ledger row, and it stays off the homepage. The `2,000+ job centers`
framing is still held back: it has an approved ledger row but no owner
decision, so it was not resurrected.

**Meta title:** `Layoff & Benefits | Offboard`
**Meta description:** `A layoff is not only a job search. Offboard helps with what to do first, what support you may qualify for, health coverage, and how long your money lasts.`

### Hero

- Kicker: `Layoff and benefits`
- H1: `Losing your job creates a lot of problems at once.`
- Body: `The job search is the visible one. Underneath it are benefit deadlines, health coverage decisions, a shrinking runway, and paperwork written for an agency rather than for you. Offboard helps you take them in the order that matters to you.`
- CTA: `Get started free` (sitewide primary, owner decision 2026-09-03)

*Body last clause changed by plan 041: it said "take them in order", while
the product's own path card says "Do them in any order." The page and the
app now agree.*

### Hero visual *(plan 048)*

- The Civic Modern composition `first-week-plan-civic-modern-v1-transparent.webp` *(plan 049; was plan 048's Runway screenshot)*. It reads: `Your first-week plan` · `Review separation agreement` / `File unemployment claim` / `Check health coverage` / `Save key deadlines` · `2 deadlines saved` · `Paperwork reviewed` · `You decide what happens next.` **No dollar figure and no day count**, which is this page's standing rule. Pixels; this is the record.

### The first week *(plan 041; plan 046 moved its composition into the hero, so the band is copy only)*

- Kicker: `The first week`
- H2: `Before the search, protect yourself and your paperwork.`
- Body: `The first days after a layoff decide more than people expect. Work logins disappear, notices arrive with short windows, and the documents you will need later are easiest to get now. Offboard starts from your state, your dates, and what actually happened, not from a template.`
- Composition (R2): the `Your Path` card as the base, the runway view as a satellite.
  - Card heading `Your Path` *(now `Layoff Plan` in the product; this composition is retired, so the string is historical)* · lede `The steps that fit your situation. Do them in any order.` · stage row `Protect the first week` / `5 left`
  - Steps, titles verbatim from the app (`layoffPlanItems.ts`, `stages.ts`), no sub-lines: `Write down your key dates` · `Understand your COBRA / health insurance options` · `Secure your accounts and access` · `Save all layoff documents in one place` · `Request your personnel file`
  - Satellite, a labelled sample: `Runway · sample` / `7 months`

### Paperwork Review *(plan 041)*

- Kicker: `Paperwork Review` (the canonical tool name, see the glossary)
- H2: `Read the agreement before you sign it.`
- Body: `Severance agreements, offers, PIPs, and NDAs are written for the company that wrote them. Offboard gives you a plain-English breakdown of the deadlines, the money, and the parts worth a second look, so you know what you are agreeing to.`
- Small print (required, never shipped without it): `AI guidance, not legal advice. Offboard does not replace qualified legal, tax, financial, healthcare, or benefits guidance.`
- Composition: a review summary card, `Severance agreement` / `Reviewed`, with rows `Signing deadline` — `On your calendar` · `Release of claims` — `What you give up` · `Health coverage` — `COBRA notice enclosed` · `Equity treatment` — `Flagged to check`. Satellite chip `Plain English · every clause`.
- **Every value in that card is a state word, never a date or a day count.** See the claim discipline note above.

### The money side *(plan 041, replaces "The questions underneath" and "What Offboard does about it")*

- Kicker: `The money side`
- H2: `What you may be owed, and what it takes to keep it.`
- Lead: `Benefits, health coverage, funded training, and runway are four clocks running at once. Offboard tracks them together and tells you which one needs you next.`
- Ruled rows (Pattern C, no numerals):
  1. `File early, then keep certifying.` — `Payments do not start the day you are laid off, and a missed weekly certification pauses them. It takes far longer to fix than to prevent.`
  2. `Keep health coverage without a gap.` — `COBRA is not your only option, and the decision has a deadline. Offboard puts that date in front of you with the alternatives beside it.`
  3. `Training money runs on its own clock.` — `State-approved programs may be paid for while you train, and that clock is not your benefits clock. Every program links to the official source that decides it.`
  4. `Know how long you can search.` — `The runway view turns your savings, severance, and benefits into a number of months, and shows which decisions change it.`

*What the two retired sections said is all still here: "your situation, not a
template" is in the first-week body, "deadlines surfaced early" is rows 1 and
2, "official sources, every time" is row 3, and "the search stays connected"
is the "And then the job" band. The sixth question card, `How do I find
another job?`, is deleted outright: the job search has its own band on this
page and its own pillar page.*

### The CalJOBS hook

Placed after "The money side". Approved v7 copy, shipped verbatim with the
small print.

- Kicker: `One example`
- H2: `There is a deadline worth roughly $12,000 that most people have never heard of.`
- Body: `If you were laid off in California, you may be able to keep your unemployment benefits while you train full-time, including an extension worth roughly $12,000. But only if you contact EDD before week 16 of your benefit payments. Most people have never heard of it. Offboard watches that clock for you.`
- Small print (required, never shipped without it): `Amounts and timing vary by situation. We never promise funding, we show you the exact path to find out.`
- Sample card (labelled a sample, never live data): `Benefit payments` / `Sample · CA` / `Week 12 of 16` / `Now · week 12` / `Deadline · week 16` / `~$12,000 at stake` / `4 weeks left to contact EDD`

### Been out a while *(plan 041)*

Placed after the CalJOBS hook, not before it: the hook is a week-16 example,
and "you may be past that" immediately beforehand would undercut it. The
app's intake has a whole branch for this reader (`I've been out a while`) and
the page had nothing for them.

- Kicker: `Not week one?`
- H2: `Been out a while? Start with what you are still owed.`
- Body: `Benefits may be running low or gone. That does not close the door on funded training, or on the rest of the plan. Tell Offboard where you are now and it starts from there, not from the day you were laid off.`
- Section link: `Start where you are` → sign-up

### Verified facts (shared component)

Renders the shipped `VerifiedFactsStrip`: `Deadlines and dollar figures are
checked by people, never generated.` · live states `CA` (filled) NY NJ WA ·
the three columns including `4,000+` state-approved California programs.

### What Offboard will not do

- Kicker: `Straight answers`
- H2: `Offboard is not a government agency.`
- Body: `Offboard helps people organize their transition and reach official sources. Government agencies and program providers make eligibility, benefit, and approval decisions. Offboard does not replace qualified legal, tax, financial, healthcare, or benefits guidance.`
- Line: `We never promise funding. We show you the exact path to find out.`
- Line: `Claiming your benefits is always free, and Offboard never charges for access to a public program.`

### Then the search *(an item in the shared `Also part of the system` strip since plan 046)*

- Strip item: `When the paperwork is handled, the search is still there.` — `Offboard keeps the money side and the search side in the same place, so the work you do on one does not get lost when you turn to the other.` → `See how the search runs` → `/job-search`
- Second strip item: `It all lands in one record.` — `Your situation, your dates, your documents, and every decision you make here become part of your Career Context, so the search starts from what actually happened.` → `See what it holds` → `/career-context`
- ~~Kicker: `And then the job`~~
- H2: `When the paperwork is handled, the search is still there.`
- Body: `Offboard keeps the money side and the search side in the same place, so the work you do on one does not get lost when you turn to the other. The tracker, the Application Packets, the interview prep, and the record behind them are all here when you are ready.`
- Section link: `See how Offboard works` → `/#how-it-works` *(plan 045: the homepage's four-step strip; `/how-it-works` is deferred)*

*Second sentence added by plan 041: it carries what the deleted sixth question card said, on the band where the search actually belongs.*

### Final CTA (shared component, overridden copy)

- H2: `Start with what changed.`
- Body: `Tell Offboard what happened and get a plan that covers the money, the benefits, and the search, in the order they actually matter.`
- CTAs: sitewide primary + `Talk to a person`

# 14 · Job Search `/job-search`

**Added 2026-08-31 (plan 031, fifth and final phase-2 pillar).** The
strategy doc's job for this page is to show why Offboard beats a bag of AI
tools. The homepage toolkit already names the ten tools, so this page does
**not** repeat that list as feature copy. Its argument is the loop those
tools form, and the fact that the loop has a memory.

**Meta title:** `Job Search | Offboard`
**Meta description:** `A job search that works as one system: decide, apply, interview, and organize with ten tools that all read from the same Career Context.`

### Hero

- Kicker: `Job search`
- H1: `A job search that works as one system.`
- Body: `Most job-search tools solve one step and forget the rest. Offboard connects the whole loop, so nothing has to be re-explained at the next step. The tenth application takes less effort than the first.` *(plan 045 trimmed the middle clause; plan 046 added the retired "difference" section's payoff line)*
- Hero visual *(plan 049; was plan 048's app screenshot of the packet builder, now unused)*: the Civic Modern composition `application-packet-civic-modern-v1-transparent.webp`. It reads: `Your Application Packet` · `Company intel` / `Role match` / `Tailored resume`, each ticked · chip `Strong fit` · state `Ready for review`. Pixels; this is the record.
- CTA: `Build my free transition plan` (primary)

### Why one system *(retired by plan 046: its composition is the hero visual and its payoff line is the hero body's last sentence. Kept for the record.)*

- ~~Kicker: `The difference`~~
- H2: `A bag of tools makes you the integration.`
- Body: `Separately, a resume tool, a tracker, and a chat window each solve one step. Together they leave you carrying context between them: pasting the same history, re-explaining the same goals, and rebuilding the same picture of a company you already researched last week.`
- Payoff line *(plan 042)*: `The tenth application takes less effort than the first, because everything the first nine taught the system is still there.`
- Composition *(plan 042, R2/R13)*: an Application Packet card as the base — `Application Packet` / `Tesserac`, rows `Ghost check` — `Clear` · `Fit read` — `Strong on platform work` · `Tailored resume` — `Ready` · `Warm intro` — `Two paths` — with a greyed `Every other tool` card breaking its left edge: `Who are you?` / `Paste your resume.`

*Was a three-cell numbered grid. Cells 1 and 2 (`Ten tools, ten starting
points`, `One system, one record`) described the two sides; the composition
shows them. Cell 3, `What that changes`, survives verbatim as the payoff
line.*

### The loop *(retired by plan 045's messaging pass: the eight rows walked the same process the four stages structure, so the page described its loop twice. Its one idea now titles the closing band. Kept for the record.)*

- ~~Kicker: `How it runs`~~
- H2: `Eight steps, and the last one feeds the first.`
- Steps:
  1. `Find a role` — `Something lands in front of you, from a board, a referral, or a conversation you were already having.`
  2. `Decide if it is worth it` — `Check the fit against your experience and goals, and look for signals that the posting may not be an actively hiring role.`
  3. `Research the company` — `What you learn is saved to the company, not to a chat window you will close.`
  4. `Build the application` — `Resume, cover letter, and positioning built from your record and the specific role.`
  5. `Track it` — `Stage, dates, contacts, and next steps, without a separate spreadsheet.`
  6. `Prepare for the interview` — `A prep plan from the company and role context you already gathered, and practice out loud.`
  7. `Record what happened` — `Questions asked, what you answered, and what to do next.`
  8. `Your Career Context improves` — `Which is why the next role starts further ahead than this one did.`

### What each stage gives you

- Kicker: `The toolkit`
- H2: `Four stages, and what each one decides.`
- Lead *(plan 046)*: `The same ten tools the homepage names, described. Every one reads from your Career Context and writes back to it.` · Photo beside it: `raw/strip-interview-prep.webp` (a woman practicing interview answers in front of a mirror). The four stage names carry the homepage strip's icons.
- Groups, each stage's decision line followed by its tools. **The ten tool descriptions moved here from § 1 in round 4 (2026-09-02): the homepage names the tools, this page describes them.**
  1. `Decide` — `Whether this one deserves your week.` — `Role Match` `Understand how an opportunity matches your experience, strengths, and goals.` · `Ghost Job Checker` `Look for signals that a posting may not represent an actively hiring role.` · `Company Intel` `Know who you're applying to before you invest your time.`
  2. `Apply` — `What you actually send.` — `Application Packets` `Bring together the role, company, resume strategy, positioning, and application materials in one place.` · `Resume Tailoring` `Adapt your resume using the opportunity and your Career Context.` · `Cover Letters` `Create relevant application messaging without starting from a blank page.`
  3. `Interview` — `Walking in prepared, not rehearsed.` — `Interview Prep` `Turn company and role context into a focused preparation plan.` · `Voice Practice` `Practice answering questions in a realistic voice conversation.`
  4. `Organize` — `Where all of it is kept.` — `Application Tracker` `Keep your entire pipeline current.` · `Career Context` `Connect the history behind every application, interaction, and outcome.`

### The memory underneath *(an item in the shared `Also part of the system` strip since plan 046)*

- Strip item: `The last step feeds the first.` — `Every stage reads from your Career Context and writes back to it: what you learn in one interview is already there for the next application.` → `See what your Career Context holds` → `/career-context`
- Second strip item: `Ask about the whole search, not one application.` — `Lumo works from every stage at once, so it can tell you what needs attention today and what pattern it sees across your search.` → `See how Lumo works` → `/lumo`
- ~~Kicker: `What makes it compound`~~
- H2: `The last step feeds the first.` *(plan 045; was `The loop only works because something remembers.`)*
- Body: `Every stage reads from your Career Context and writes back to it: what you learn in one interview is already there for the next application. That is the difference between tools that happen to sit in one account and a search that gets better the longer you run it.`
- Section link: `Learn more about Career Context` → `/career-context`

### Final CTA (shared component, overridden copy)

- H2: `Run the whole search in one place.`
- Body: `Start with the role in front of you, and let everything you learn stay where the next application can use it.`
- CTAs: sitewide primary + `Talk to a person`

# 15 · Privacy & Security `/privacy-security`

**Added 2026-09-01 (plan 034, phase 3 of the site-architecture roadmap).**
The strategy doc calls this page mandatory: Career Context only works if a
person is willing to put their real history into it, and nobody does that
without knowing who can read it.

**Every claim on this page is ported from the app repo's own claims
register, `SECURITY_CLAIMS.md` (`lumo-plan-builder` `origin/main`, last
updated 2026-08-05), and from the published `/security` page that Sprint
119 rewrote from that register.** The register's rule holds here: a claim
appears on this page only if §1 of the register names the control that
proves it. §2 (true after a fix) and §3 (not true without an architecture
change) claims are not made, and §3's warnings are honored word for word:

- Never "impossible". The approved phrasing is `prevented by
  database-level Row-Level Security`.
- Never "we cannot read it". The provable form is `no one on the Offboard
  team can read it through the product`.
- Never "never shared". The provable form names the providers and says
  `we do not sell your data`.
- No certification we do not hold. The page says so outright rather than
  staying silent, which is the same register-driven choice Sprint 119 made
  when it deleted the SOC 2 roadmap section instead of softening it.

**Numbers deliberately left off this page:** the app page's per-endpoint
rate-limit figures (50 LUMO messages an hour, and so on) and the "roughly
one hundred server functions" count. Both are true and both go stale
without a ledger row to govern them. The page states the control without
the number.

**Vocabulary:** the app page says "journal" and "LUMO". Neither ships on
this site, so the journal row is not carried over and the assistant is
`Lumo` throughout. The rows below are the app table's rows remapped onto
nouns this site already uses.

**OWNER / ENGINEERING VERIFICATION NEEDED before public launch — one item:**
the **connected-assistant** section. Nothing in the claims register covers
what happens to data after an outside assistant reads it, because that
connection is newer than the register's last update. Every sentence in
that section is written to be true by construction (it says the
conversation lives with that provider under that provider's terms, and
makes no claim about what those terms are). Confirm it before launch, and
add the connection to the register.

**Meta title:** `Privacy & Security | Who can see your Offboard record`
**Meta description:** `Offboard holds your severance math, your runway, and your career history. This page says plainly who can see it, who cannot, where the honest limits are, and what you can delete.`

### Hero

- Kicker: `Privacy and security`
- H1: `You are trusting us with more than a resume.`
- Body: `Severance math. Runway numbers. The things you would only write down at 1am. This page answers the question that actually matters: who can see it, and who cannot.`
- Small: `Every claim below maps to a specific control in our code. We keep a claims register, audited it in July 2026, and fixed what did not hold up.`
- CTA: `Build my free transition plan` (primary)

### Who can see what

- Kicker: `The short answer`
- H2: `Who can see what.`
- Table columns: `What you put in` · `You` · `Offboard staff (through the product)` · `Lumo (our AI guide)` · `AI providers`
- Rows:
  1. `Your Career Context` (`work history, projects, and outcomes`) — You: `Always` · Staff: `No read path exists in the product` · Lumo: `Yes. This is what it works from` · Providers: `Processed to run a feature you asked for, with retention off. Never for training`
  2. `Resumes and documents` (`uploads, drafts, cover letters`) — You: `Always` · Staff: `No` · Lumo: `Only what you share in a conversation or run through a resume feature` · Providers: `Processed to power tailoring and parsing, with retention off`
  3. `Money numbers` (`severance, runway, budgets`) — You: `Always` · Staff: `Not shown in any admin screen. A database admin role exists for account support, and analytics store a risk band only` · Lumo: `A computed runway estimate, only if you saved numbers and keep it enabled. Never the raw amounts` · Providers: `Only inside a feature you run, with retention off`
  4. `Lumo conversations` (`what you ask and what it answers`) — You: `Always` · Staff: `No read path exists in the product` · Lumo: `Yes. It is the conversation` · Providers: `Sent to generate the reply, with retention off. Never for training`
  5. `Google Calendar` (`if you connect it`) — You: `Always` · Staff: `No` · Lumo: `Excluded from AI context entirely` · Providers: `Never sent to AI models`
- Note under the table: `Sponsors are not a column here because they see none of it. That rule has its own section below.`

### The receipts

- Kicker: `The receipts`
- H2: `Four things we can show you, not just say.`
- Cards:
  1. `Only your account reaches your rows` — `Row-Level Security is enforced on every sensitive table in our database. Your session can only ever query data that belongs to you. Cross-account leakage is prevented at the database layer.`
  2. `No admin read paths` — `There is no screen, role, or query in the product that shows our team your Career Context, your resume, or your finances. Those are blocked at the database layer, and money numbers are excluded from every admin query and screen.`
  3. `Exactly two AI providers` — `OpenAI, called with retention disabled on every request, and Anthropic, whose API does not train on customer data. Nothing you write goes to any other AI company.`
  4. `Delete means delete` — `Deleting your account removes your database rows and your uploaded files, across every storage bucket. Not just the visible parts.`

### If someone else is paying for your access

- Kicker: `Sponsored access`
- H2: `A sponsor sees a number. A sponsor never sees you.`
- Body: `Your former employer, school, or workforce program may cover your Offboard access. That pays for the account. It does not buy a view into it.`
- `What a sponsor sees`: `How many people claimed access` · `How many are active` · `Aggregate engagement and outcomes`
- `What a sponsor never sees`: `Your resume` · `Your applications` · `Your Lumo conversations` · `Your money numbers` · `Anything you write`
- Line: `That privacy line is contractual, not a preference. Not the CEO, not HR, nobody.`

### When you connect an outside assistant

- Kicker: `Connected assistants`
- H2: `A connection you authorize sends your record somewhere we do not run.`
- Body: `Offboard can connect to assistants you already use. When you authorize one, the parts of your record you allow are read into that conversation, and from that point the conversation lives in your account with that provider, under that provider's terms. Offboard's own retention terms cover the requests Offboard makes, not the ones you make inside someone else's product.`
- Line: `A connection is scoped to what you authorize, and you can end it at any time. Your record stays with Offboard.`
- Section link: `See how connections work` → `/integrations`

### The honest part

- Kicker: `The honest part`
- H2: `Where the line actually sits.`
- Body 1: `Offboard does not use end-to-end encryption. Our AI features need to read your text as text: a resume tailor cannot rewrite a bullet it cannot see. That means our servers process your data in readable form, and, like every cloud product, the company that hosts our database and the people who hold our service keys could technically reach it.`
- Body 2: `We weighed the alternatives. On-device AI is not good enough yet to do this work. A key only you hold would mean one forgotten password erases your record forever, and it would break everything that helps you while you are away, like reminders and weekly summaries. So we chose readable processing plus strict access control, and we tell you exactly where the line sits. If that ever changes, it will change on this page first.`
- Body 3: `What stands between that technical possibility and a person reading your record: no admin read paths exist in the product, identifiers are minimized in our server logs, admin actions are written to an audit log, and every sentence on this page is tied to a control in our claims register.`
- Line: `We do not hold a SOC 2 or ISO certification, and we will not imply otherwise. When that changes, it will say so here.`

### The specifics (shared FAQ component, overridden copy)

- H2: `For the reader who wants receipts.`
- Items:
  1. `Sign-in and sessions` — `Google sign-in and email magic links, handled by Supabase Auth with the PKCE flow. Sessions use short-lived tokens that refresh automatically. AI provider keys live only on our servers as encrypted secrets, and never reach your browser.`
  2. `Your files` — `Resumes, documents, and voice notes live in private storage buckets keyed to your account. There are no public links. Files are served through time-limited signed URLs that expire on their own, with random filenames, a size cap, and file-type validation on upload.`
  3. `AI, precisely` — `Two providers, no more: OpenAI and Anthropic. Every OpenAI request is sent with retention disabled, so your data is not stored or used for training, and Anthropic's API does not train on customer data. Google Calendar data is excluded from AI context entirely, under Google's Limited Use policy. We verified all of this live on 2 July 2026.`
  4. `Validation and abuse limits` — `Requests are checked against a schema before we act on them. AI and abuse-prone endpoints are rate-limited per account.`
  5. `Infrastructure and accountability` — `Our database and file storage are managed by Supabase, which encrypts data at rest and in transit at the hosting layer, not end to end. We minimize identifiers in our server logs: user IDs are truncated and emails are masked. Admin actions are written to an audit log. We maintain a claims register that maps every public security claim to the code that enforces it, and we ran a full audit and hardening pass against it in July 2026.`

### Your data, your call

- Kicker: `Your data, your call`
- H2: `These are product features, not legal concessions.`
- Body: `You do not need to cite a regulation to use any of them.`
- List:
  1. `See and edit everything you have put in, at any time.`
  2. `Delete a single document, a single entry, or your whole account. Account deletion removes your files too.`
  3. `Export your resumes and documents whenever you want.`
  4. `We do not sell your data. To power AI features it passes through OpenAI and Anthropic only, under the retention and no-training terms above.`
- Small: `These map to the rights GDPR and CCPA give you, wherever you live.`
- Line: `Found something, or have a question this page does not answer? Email hello@offboard.co. A human reads it.`

### Final CTA (shared component, overridden copy)

- H2: `Now you know exactly what you are trusting us with.`
- Body: `Build your Career Context knowing who can see it, who cannot, and what you can delete.`
- CTAs: sitewide primary + `Talk to a person`

# 16 · Universities & Communities `/communities`

**Added 2026-09-01 (plan 036).** The third and last For Organizations page,
completing the split plan 026 phase 3 asked for: `/employers` for companies
running a layoff, `/workforce` for agencies, `/communities` for universities,
alumni organizations, associations, and nonprofits. The roadmap called for
this one to be "lighter at first", and it is: six sections, no FAQ.

**Positioning comes from the one approved line about this audience**, the
homepage's Sponsored access section: `Universities and communities — Help
members navigate career transitions with tools that stay useful beyond a
single workshop or program.` The page is that sentence expanded. The thing
this audience has that employers do not is a relationship that outlasts the
event: a member comes back in three years, and a workshop deck does not.

**Two deliberate omissions, both easy for the owner to reverse:**

1. **No prices.** Employer pricing ($199 / $169 per seat) is owner-approved
   for public display for *employers*. Nothing is approved for universities
   or associations, and quietly reusing the employer number would invent a
   commercial term. The page ends in a conversation, like `/workforce`.
2. **The category claim is not used here.** "The modern unemployment office"
   is allowed everywhere except B2G surfaces, and a private university is
   not a B2G surface. But community colleges and public universities are
   public institutions, and the phrase adds nothing for a reader whose
   members are mostly not unemployed yet. Left off by choice, not by rule.
   Say the word and it goes in the hero.

**Never-say check:** "outplacement" does not appear (this is not `/employers`
and not Sponsored-tier copy) and the page is in the CopyDrift absence list.
"Workspace" and "career transition services/support" do not appear.

**Meta title:** `Universities & Communities | Offboard`
**Meta description:** `For universities, alumni organizations, associations, and nonprofits: sponsor Offboard so your members keep a career record that outlasts a single workshop, appointment, or program year.`

### Hero

- Kicker: `Universities and communities`
- H1: `The workshop ends. The career does not.`
- Body: `Career offices and member programs do good work in a narrow window: a session, an appointment, a program year. What the member leaves with is a folder and a memory. Offboard gives them a record that keeps working after your program is over, and keeps working when they come back.`
- CTA: `Start a sponsorship conversation` → `mailto:hello@offboard.co?subject=Community sponsorship`
- Aside: `What sponsorship covers` / `The account, not a view into it.` / `You sponsor access for your members. What they build inside it stays theirs, and your reporting is aggregate only.`

### Who this is for

- Kicker: `Who this is for`
- H2: `Programs whose people come back.`
- Body: `The relationship outlasts the event. That is what makes this different from a company running a layoff, and it is what a record built once and kept is actually for.`
- Items:
  1. `Universities and colleges` — `Career services teams supporting students through a first search, and alumni through every one after it.`
  2. `Alumni organizations` — `Members who graduated years ago, arrive with a real history, and need it organized rather than explained again.`
  3. `Associations and nonprofits` — `Groups whose members change roles inside one field, where what someone did last still matters to what they do next.`

### What changes for a member

- Kicker: `What changes`
- H2: `They stop starting over every time.`
- Body: `A member builds their Career Context once. Every search after that starts from it instead of from a blank page.`
- Capabilities:
  1. `A record, not a folder` — `Work history, projects, and outcomes stay in one place that they keep, whether or not they are searching this month.`
  2. `Your program stays in it` — `What a member works out in a session lands in the record instead of in notes nobody opens again.`
  3. `The full toolkit` — `Application Packets, resume tailoring, interview prep, application tracking, and Lumo.`
  4. `It works when your office is closed` — `Members do this work at 9pm and on weekends. Nothing waits for an appointment.`

### What you see, and what you do not *(the boundary is the approved `/employers` formulation)*

- Kicker: `Reporting boundary`
- H2: `You see participation. You do not see people.`
- Body: `Sponsors receive aggregate participation and outcome reporting, never individual applications, conversations, finances, or reflections. Reporting and visibility are defined before participation begins.`
- `What you see`: `How many members claimed access` · `How many are active` · `Aggregate engagement and outcomes`
- `What stays private`: `Resumes` · `Applications` · `Lumo conversations` · `Anything a member writes`
- Line: `That privacy line is contractual, not a preference.`
- Section link: `See exactly who can see what` → `/privacy-security`

### Straight answers

- Kicker: `Straight answers`
- H2: `What Offboard will not promise.`
- Body: `Offboard does not promise placements, interviews, or outcomes, and no sponsorship changes that. What it promises is that a member's own record is built once, stays theirs, and is there the next time they need it.`
- Line: `Offboard does not replace your career office. It gives the work your team already does somewhere to live.`

### Contact band

- Kicker: `Sponsorship inquiries`
- H2: `Talk about sponsoring your members.`
- Body: `Tell us who your members are, how many you would start with, and what your team already runs. We will scope it with you.`
- CTA: `Start a sponsorship conversation` → `mailto:hello@offboard.co?subject=Community sponsorship`

# 17 · Company Transition Centers `/companies` and `/companies/<slug>`

**Added 2026-09-01 (plan 038, the last roadmap item).** One page per company
that has had a layoff, built from the public record. Six in the pilot,
hand-written, no data plumbing. The owner's own 2026-08-14 analysis in the
app repo set the shape; Airtable is on the list at the owner's request.

**The facts register below is the law for these pages.** Every figure in
`src/content/companies/<slug>.json` must appear here verbatim, with its
source and check date, and `CopyDrift.test.tsx` fails the build if one does
not. A number with no register row cannot ship. The register is generated
from the JSON, so editing a figure means editing the JSON and regenerating
this section together.

**What the pages never do:** imply a relationship ("no relationship with",
"independent of", and "not affiliated with" are on every page), show who is
on Offboard, editorialise about the company, promise anything, or go stale
silently (every page carries `Last checked`; 90 days without a re-check
means re-verify or unpublish). "Outplacement" stays on `/employers`; the HR
band links there without the word.

**Logos: allowed, on the owner's call of 2026-09-01**, reversing this
section's original "no logos" line. Each is the company's own mark, used
nominatively to identify the subject of the page. Four rules hold it there:

1. **Self-hosted**, in `public/marketing/companies/`. Never a hotlink: a
   third-party request on every page load is both a CDN dependency this repo
   does not take and a tracker on a site that ships `/privacy-security`.
2. **Contained, never cropped**, and never recoloured. Cropping or restyling
   a trademark alters it.
3. **Same size for every company**, so no mark reads as featured.
4. **The disclaimer shares its block.** The mark sits in the hero directly
   above `Offboard has no relationship with <Company>`, and never beside the
   sponsorship line. `CopyDrift` asserts the file exists, the source is
   registered below, and the disclaimer renders.

### Logo provenance

Five are the company's own app icon, taken from the company's own server.
Chime's is the public-domain wordmark on Wikimedia Commons, because Chime's
own asset is behind bot protection; it is horizontal rather than square, and
the tile holds both shapes.

| Company | File | Source | Checked |
| --- | --- | --- | --- |
| Zillow | `/marketing/companies/zillow.png` | [Zillow's own site (apple-touch-icon)](https://zillow.com/apple-touch-icon.png) | 2026-09-01 |
| Chime *(wordmark)* | `/marketing/companies/chime.png` | [Wikimedia Commons, File:Chime Bank logo.png (public domain, trademarked)](https://commons.wikimedia.org/wiki/File:Chime_Bank_logo.png) | 2026-09-01 |
| Patreon | `/marketing/companies/patreon.png` | [Patreon's own site (apple-touch-icon)](https://patreon.com/apple-touch-icon.png) | 2026-09-01 |
| Sprout Social | `/marketing/companies/sprout-social.png` | [Sprout Social's own site (apple-touch-icon)](https://sproutsocial.com/apple-touch-icon.png) | 2026-09-01 |
| Coursera | `/marketing/companies/coursera.png` | [Coursera's own CDN (apple-touch-icon)](https://d3njjcbhbojbot.cloudfront.net/web/images/favicons/apple-touch-icon-v2-180x180.png) | 2026-09-01 |
| Airtable | `/marketing/companies/airtable.png` | [Airtable's own CDN (apple-touch-icon)](https://static.airtable.com/images/favicon/baymax/apple-touch-icon.png) | 2026-09-01 |

**Zillow note:** press reported a 5 October 2026 separation date and
severance of up to 21 weeks, but the one source that stated them could not
be read at check time, so neither is on the page.

**Airtable note:** no layoff newer than September 2023 is on public record,
and the page says so in its summary line rather than implying one.

**Meta title (index):** `Company Transition Centers | Offboard`
**Meta description (index):** `One page per company that has just had a layoff, built from the public record: what happened, with a source next to every figure, what to do this week, and what your state owes you.`
**Meta title (page):** `Laid off from <Company>? Start here | Offboard` · **description:** the page's summary line.

### Index hero

- Kicker: `Company Transition Centers`
- H1: `Laid off from a company in the news? Start with its page.`
- Body: `One page per company, built from the public record: what happened, with a source next to every figure, what to do this week, and what your state owes you. Nothing here is an estimate and nothing here is a promise.`
- Footnote: `Offboard has no relationship with any company listed. Each page says when it was last checked.`
- CTA: `Build my free transition plan`
- List section: kicker `Pages` · H2 `Six companies, newest first.` · each card: month and year, name, summary line, `Open the <Company> page`

### Company page template

- Kicker: `Company Transition Center` · H1: `Laid off from <Company>? Start here.` · Body: the summary line · Footnote: `Facts on this page come from the public record, with a source next to each one. Last checked <date>. Offboard has no relationship with <Company>.` · CTA: `Build my free transition plan`
- **What happened** — Kicker `What happened` · H2 `The public record.` · Body `Each figure below is stated as its source states it, with the source next to it. Nothing here is Offboard's estimate.` · then the register rows for that company, each as label, figure, optional detail, `Source: <name> · checked <date>`.
- **This week** — Kicker `This week` · H2 `Four things to do before anything else.` · Body `The job search can wait a few days. These cannot.`
  1. `Write down your key dates` — `Your last day, your final pay date, and the date your health coverage ends. Most expensive mistakes after a layoff are missed deadlines.`
  2. `File for unemployment now, not later` — `Benefits usually start from the week you file, not the week you were let go. Waiting costs money.`
  3. `Get the severance paperwork in writing` — `Read it before you sign it. What you are being offered, and what you are giving up.`
  4. `Sort out health coverage before the window closes` — `You have a limited time to choose. The options and the deadlines are on the guide below.`
  - Link: `The full first-week guide` → `/resources/first-week-after-a-layoff`
- **What <State> owes you** — Kicker `What <State> owes you` · H2 `Claiming your benefits is free. Start with the official source.` · Body `The <Company> site on record is in <City>, <State>. Unemployment benefits there are run by the <agency>. File with them directly; Offboard never sits between you and the agency.` · Cards: `File for unemployment in <State>` → the official agency page (CA: EDD `https://edd.ca.gov/en/unemployment/` · WA: ESD `https://esd.wa.gov/unemployment` · IL: IDES `https://ides.illinois.gov/unemployment.html`, each verified live 2026-09-01) · `Your options before the window closes` → `/resources/health-insurance-after-a-layoff` · `What Offboard watches for you` → `/layoff-support` (California pages add `Including the California training extension most people have never heard of.`)
- **Severance** — Kicker `Severance` · H2 `Read it before you sign it.` · With a source: `<Company> offered <figure>. Source: <name>, checked <date>. Your own agreement is the only one that applies to you.` · Without: `No public source states <Company>'s severance terms for this round, so this page does not guess at them. Your own agreement is the only one that applies to you.` · Link `What to check in a severance agreement` → `/resources/negotiating-your-severance`
- **Straight answers** — the compliance-reviewed independence band, plus `We never promise funding. We show you the exact path to find out. Offboard is independent of <Company> and is not affiliated with it.`
- **If you work in People at <Company>** — H2 `Sponsoring your team's transition is self-serve and priced per person.` · Link `See sponsored access for employers` → `/employers`
- Final CTA: `Start with what changed.` (shared, Layoff & Benefits copy)

### Facts register (generated from `src/content/companies/*.json`)

#### Zillow (`/companies/zillow`) · site: Seattle, WA · last checked 2026-09-01

- Summary line: `Zillow laid off just over 500 people, roughly 7% of the company, on 4 and 5 August 2026, including 91 in Washington state.`

| Fact | Figure (verbatim on the page) | Source | Checked |
| --- | --- | --- | --- |
| People affected | `just over 500 people, roughly 7% of the company` | [FOX 13 Seattle, 5 August 2026](https://www.fox13seattle.com/news/zillow-layoffs-affect-just-over-500-employees-91-wa) | 2026-09-01 |
| Washington WARN filing | `91 people at the Seattle site, notice dated 4 August 2026` | [Washington WARN filings via WARN Firehose](https://warnfirehose.com/data/layoffs/washington) | 2026-09-01 |
| Severance | *No public source states the terms; the page says so rather than guessing.* | | |

#### Chime (`/companies/chime`) · site: San Francisco, CA · last checked 2026-09-01

- Summary line: `Chime told staff on 31 July 2026 that it was cutting about 10% of the company, roughly 150 people, in a memo from CEO Chris Britt.`

| Fact | Figure (verbatim on the page) | Source | Checked |
| --- | --- | --- | --- |
| People affected | `about 150 people, 10% of a company of about 1,500` | [Banking Dive, 31 July 2026](https://www.bankingdive.com/news/chime-cut-workforce-10-percent-150-employees-ai-smaller-teams-chris-britt/826730/) | 2026-09-01 |
| California WARN filing | `135 people at the San Francisco site, notice dated 31 July 2026` | [California WARN filings via WARN Firehose](https://warnfirehose.com/data/layoffs/california) | 2026-09-01 |
| Severance | *No public source states the terms; the page says so rather than guessing.* | | |

#### Patreon (`/companies/patreon`) · site: San Francisco, CA · last checked 2026-09-01

- Summary line: `Patreon laid off 93 people, about 20% of the company, on 23 July 2026, in a memo from CEO Jack Conte.`

| Fact | Figure (verbatim on the page) | Source | Checked |
| --- | --- | --- | --- |
| People affected | `93 people, about 20% of the company` | [TechCrunch, 23 July 2026](https://techcrunch.com/2026/07/23/patreon-lays-off-off-20-of-its-workforce/) | 2026-09-01 |
| Date | `23 July 2026` | [TechCrunch, 23 July 2026](https://techcrunch.com/2026/07/23/patreon-lays-off-off-20-of-its-workforce/) | 2026-09-01 |
| Severance, as reported | `at least 16 weeks of severance, plus one week per year of service, with health coverage through the end of the year and a $1,500 laptop stipend, as reported` | [TechCrunch, 23 July 2026](https://techcrunch.com/2026/07/23/patreon-lays-off-off-20-of-its-workforce/) | 2026-09-01 |

#### Sprout Social (`/companies/sprout-social`) · site: Chicago, IL · last checked 2026-09-01

- Summary line: `Sprout Social began notifying about 260 people, 20% of its staff, on 15 July 2026, under a plan its board approved on 8 July.`

| Fact | Figure (verbatim on the page) | Source | Checked |
| --- | --- | --- | --- |
| People affected | `about 260 positions, 20% of staff` | [Sprout Social Form 8-K, filed 15 July 2026](https://www.sec.gov/Archives/edgar/data/1517375/000151737526000052/spt-20260715.htm) | 2026-09-01 |
| Board approval | `8 July 2026` | [Investing.com, 15 July 2026](https://www.investing.com/news/stock-market-news/sprout-social-cuts-20-of-workforce-in-restructuring-plan-93CH-4793486) | 2026-09-01 |
| Set aside for severance and benefits | `$18.0 million to $20.0 million` | [Investing.com, 15 July 2026](https://www.investing.com/news/stock-market-news/sprout-social-cuts-20-of-workforce-in-restructuring-plan-93CH-4793486) | 2026-09-01 |
| Expected to complete | `by the end of the third quarter of 2026` | [Investing.com, 15 July 2026](https://www.investing.com/news/stock-market-news/sprout-social-cuts-20-of-workforce-in-restructuring-plan-93CH-4793486) | 2026-09-01 |
| Severance | *No public source states the terms; the page says so rather than guessing.* | | |

#### Coursera (`/companies/coursera`) · site: San Jose, CA · last checked 2026-09-01

- Summary line: `Coursera committed to a workforce reduction on 6 July 2026, two months after completing its merger with Udemy, and filed a California WARN notice for 31 people in San Jose on 14 July.`

| Fact | Figure (verbatim on the page) | Source | Checked |
| --- | --- | --- | --- |
| What the company filed | `a workforce reduction plan, committed to on 6 July 2026` | [Coursera Form 8-K, filed 6 July 2026](https://www.sec.gov/Archives/edgar/data/1651562/000165156226000055/cour-20260706.htm) | 2026-09-01 |
| Set aside for severance and benefits | `$8 million to $11 million` | [Coursera Form 8-K, filed 6 July 2026](https://www.sec.gov/Archives/edgar/data/1651562/000165156226000055/cour-20260706.htm) | 2026-09-01 |
| California WARN filing | `31 people at the San Jose site, notice dated 14 July 2026` | [California WARN filings via WARN Firehose](https://warnfirehose.com/data/layoffs/company/coursera) | 2026-09-01 |
| Severance | *No public source states the terms; the page says so rather than guessing.* | | |

#### Airtable (`/companies/airtable`) · site: San Francisco, CA · last checked 2026-09-01

- Summary line: `Airtable has had two rounds of layoffs on public record: 254 people in December 2022 and 237 people in September 2023, both announced by CEO Howie Liu. No newer round is on record as of the date this page was checked.`

| Fact | Figure (verbatim on the page) | Source | Checked |
| --- | --- | --- | --- |
| September 2023 | `237 people, about 27% of the company` | [Computerworld, 15 September 2023](https://www.computerworld.com/article/1635865/low-code-platform-provider-airtable-enacts-new-round-of-layoffs.html) | 2026-09-01 |
| December 2022 | `254 people, about 20% of the company` | [Computerworld, 9 December 2022](https://www.computerworld.com/article/1615814/airtable-becomes-latest-company-to-announce-layoffs-cutting-20-of-its-workforce.html) | 2026-09-01 |
| Severance, as reported | `at least 16 weeks of severance pay, accelerated equity vesting, and immigration counsel for people on visas, as reported for the December 2022 round` | [Computerworld, 9 December 2022](https://www.computerworld.com/article/1615814/airtable-becomes-latest-company-to-announce-layoffs-cutting-20-of-its-workforce.html) | 2026-09-01 |

# Redirect map (SEO-load-bearing; any route rename must update it in the same PR)

`/product`, `/why-offboard` → `/how-it-works` · `/job-packet` →
`/how-it-works#toolkit` · `/faq` → `/how-it-works#faq` · `/community` →
`/#community` · `/founder-story` → `/about` · `/security` → `/privacy-security` ·
`/for-organizations`, `/for-recruiters` → `/employers` ·
`/public-partners` → `/workforce` (plan 035) · `/gift` → `/pricing`
· `/tools`, `/tools/:slug*` → `/resources` · 7 unported essay/policy slugs →
`/resources`. Kept live, no redirect: `/intake`, `/act`.

`/public-partners` → `/workforce` shipped in plan 035, in the same PR as
`/workforce` itself (owner decision 2026-09-01, plan 026 decision 1). The
thin page is gone; the URL keeps working through the 301.

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
| 2026-08-31 | Homepage hero becomes a forest-deep band (Lumo band drops to mid forest to hold the two-anchor rhythm rule); “Join thousands of people” confirmed accurate; $12k hook stays off the homepage for now | plan 022, owner call |
| 2026-08-30 | Homepage v2 shipped from owner's Career Context copy doc; primary CTA on home becomes "Get started free"; hook/$12k, identity, three-jobs, verified-facts, pricing-teaser, employer-strip, privacy-summary sections retired from home; community strip kept for the `/#community` redirect; "recruiting platform"→"recruiting site" and "infrastructure"→"tools" never-say substitutions | plan 022, this file § 1 |
| 2026-09-02 | Round 4 on the homepage: the page names things and the pillar pages describe them. Ten tool descriptions moved to `/job-search`, eight Career Context categories to `/career-context`, the member questions became a disclosure list, and the five route FAQ sections became real accordions. Retired: the Step 1 affirmation and portrait, the `Ask Lumo` CTA, and five prompts `/lumo` already carries | plan 039 round 4, this file §§ 1, 10, 14 |
| 2026-09-02 | Owner review round on plan 039: community becomes three cards with real partner marks; sponsored access becomes the third plan card and its band is retired; photo chips retired; the AI avatar is Lumo's face; real logo files replace the drawn ChatGPT and Claude marks | plan 039, this file § 1 and § 11 |
| 2026-09-02 | Homepage re-sequenced into three numbered steps (build your Career Context, connect it to the AI you use, run your search). Career Context and the AI story were each told twice; each is told once now. "Built around you" folds into step 1, "Offboard, wherever you work" and "Meet Lumo" merge into step 2, the photo triptych and the four capability blocks are retired | plan 039, this file § 1 |
| 2026-09-02 | Toolkit groups carry product-state chips. `Strong fit`, `Ready for review`, `Prep ready` and `Saved to tracker` are verbatim product states in `lumo-plan-builder` `origin/main`; plan 039's proposed `Thursday · Prep done` and `12 tracked` do not exist in the app and were dropped rather than invented | plan 039, this file § 1 |
| 2026-09-02 | Composition rules R1 to R10 adopted for every page. The homepage's three orphan-cell grids (8 in 4, 5 in 3, and a 3/3/2/2 toolkit) became ruled lists and a filled 2x2, and `EditorialGrid` now spans its first card when a caller passes an odd number, which fixed the same defect on `/career-context`, `/lumo`, `/job-search` and `/employers` | plan 039, DESIGN.md § Composition rules |
| 2026-09-01 | ChatGPT and Claude connections confirmed live, shipped labelled "Beta" (owner's framing: they work and are still being refined). Closes plan 028's first verification flag | plan 033, this file § 11 |
| 2026-09-01 | `/integrations` leads with a card grid of real integrations; "The idea" editorial block cut for length | plan 033, this file § 11 |
| 2026-09-01 | The `~$12,000` CalJOBS hook ships on `/layoff-support`, with conditions and small print, and stays off the homepage | plan 033, this file § 13 |
| 2026-09-01 | Company Transition Centers ship as a six-page hand-written pilot (Patreon, Sprout Social, Chime, Zillow, Coursera, Airtable at the owner's request); every figure lives in a generated facts register enforced by CopyDrift; no logos, no member counts, no relationship claims | plan 038, this file § 17 |
| 2026-09-01 | Mega-menu navigation ships with four tabs (Product / For Organizations / Pricing / Resources) and light panels; Home leaves the bar, How It Works moves inside Product, About inside Resources; header CTA stays `Build my plan`; Company Transition Centers held out of Resources until `/companies` exists | plan 037, this file § Site chrome |
| 2026-09-01 | `/communities` ships, completing the For Organizations split; no prices and no category claim on it, both by choice and both reversible | plan 036, this file § 16 |
| 2026-09-01 | `/workforce` ships and `/public-partners` is retired and 301'd to it; the public-sector section leaves `/employers` for a crosslink; no county named and no B2G capability claimed beyond `/act` and `/employers` copy | plan 035, this file § 8 |
| 2026-09-01 | Privacy & Security ships at `/privacy-security`, ported claim-for-claim from the app repo's `SECURITY_CLAIMS.md`; `/security` now redirects here instead of `/about` | plan 034, this file § 15 |
| 2026-09-01 | `/public-partners` folds into `/workforce` and redirects when `/workforce` ships (no thin page kept) | plan 026 decision 1, docs/site-architecture.md |
| 2026-08-24 | Clarified the "outplacement" scope: allowed on /employers AND in Sponsored-tier copy wherever it renders (home teaser, /pricing deck), per the 2026-08-21 owner call. The earlier "one page only" wording in Language rules was inaccurate and is corrected. | COPY.md, plan 019 |
| 2026-09-10 | Context first (plan 050). The homepage and `/how-it-works` tell the app's four Home stages in the app's order: Build your Career Context, Talk with Lumo, Run your search, Follow your layoff plan. "Steady the first week" leaves as a step and becomes step four's content and what Lumo raises first. `Your Path` becomes `Layoff Plan` everywhere the site names the product surface (owner rename 2026-09-10) | plan 050, this file § 1 and § How It Works |
| 2026-09-11 | One closing band on every page: the homepage's `FinalCtaV2` and the route pages' three-dot progress mark are retired; `FinalCta` takes kicker, H2, body and small print as props. Homepage gains the kicker and `Talk to a person` | this file § 1 |

**Open owner items:** re-verify SB 617 currency (`/employers`) · optionally
tighten About FAQ #4 toward the beachhead · verify logos-band claims ·
Steph's essay editorial pass · execute the gift lane (plan 015) · the real
permissions model for `/integrations` (plan 028 flag 2, still open) · yes/no
on the `2,000+ job centers` framing for `/layoff-support` · confirm the
connected-assistant section on `/privacy-security` and add that connection
to the app repo's claims register.
