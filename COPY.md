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
- One primary CTA per view. Sitewide primary CTA: **Build my free transition
  plan** → `https://app.offboard.co/auth?tab=signup`. Exception (homepage v2,
  plan 022): the homepage's primary CTA is **Get started free**, same URL,
  per the owner-supplied v2 copy. Route pages keep the sitewide CTA until the
  owner rolls the new one out.

## Verified-facts ledger

Every load-bearing number on the site, with its status. Change a number here
and everywhere it appears in the same PR.

| Fact | Value | Status | Appears on |
| --- | --- | --- | --- |
| Homepage trust line | **“Join thousands of people”** | Owner-confirmed accurate 2026-08-31 | Home |
| Newsletter subscribers | **5,000+** | Owner-corrected 2026-08-01 (verified 5,200; "8,000+" is stale and banned) | Home, About |
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
| Consumer tiers | **Free $0 forever · Pro $20/month** · 30 / 300 monthly credits · 3 LUMO messages/day on Free · first Job Packet free | Owner-confirmed 2026-08-21 | Home, Pricing, Lumo (message limit only) |
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

**Header nav** (6 links + actions): **Dropdown navigation since plan 037.** Home `/` · **Product ▾** (Career
Context · Lumo · Job Search · Layoff & Benefits · Offboard Everywhere) ·
How It Works `/how-it-works` · **For Organizations ▾** (For Employers ·
Workforce & Government · Universities & Communities) · Pricing `/pricing` ·
**Resources ▾** (Guides · Privacy & Security) · About `/about` · Sign In →
`https://app.offboard.co/auth?tab=signin` · **Build my plan** (primary, neon
on the dark header) → signup. The header is fixed (sticky) on every route.
`/act` is deliberately out of nav, in both the desktop dropdowns and the
mobile menu.

Each dropdown item carries a one-line blurb: Career Context `The record
everything else reads from.` · Lumo `The guide that knows your situation.` ·
Job Search `The whole search as one system.` · Layoff & Benefits `Deadlines,
coverage, and runway.` · Offboard Everywhere `Use Offboard from the AI you
already use.` · For Employers `Sponsor a group through a layoff.` · Workforce
& Government `Agencies, boards, and public programs.` · Universities &
Communities `Alumni, members, and career offices.` · Guides `Practical
answers, checked by people.` · Privacy & Security `Who can see your record,
and who cannot.`

**Company Transition Centers is NOT in Resources yet.** The target navigation
lists it there; `/companies` does not exist, and plan 026's rule is that the
dropdown ships only when its pages exist. It joins when the page does.

**Navigation labels are Title Case** (owner decision 2026-08-31); prose,
headlines, and CTA button labels stay sentence case. The mixed casing this
replaced was visible: product links like "Career Context" were already Title
Case while "How it works" and "For employers" were not.

**Footer**

> **Offboard**
> Offboard is an independent company, not a government agency. We help you navigate the official programs. Your benefits are yours, and claiming them is always free. Information provided by Offboard is general and does not replace guidance from government agencies or qualified legal, tax, financial, or healthcare professionals.

Columns — **Product:** How it works, Career Context, Lumo, Job Search,
Offboard Everywhere, Layoff & Benefits, Pricing, Guides ·
**Partners:** For
Employers, Workforce & Government, Universities & Communities ·
**Company:** About, Visit Us
(`/intake`), Contact (`mailto:hello@offboard.co`) · **Legal:** Privacy &
Security (`/privacy-security`), Privacy Policy, Terms (app.offboard.co).

> © 2026 Offboard · Independent support for life after a layoff

---

# 1 · Homepage `/`

**Rewritten 2026-08-30 (homepage v2, plan 022).** Copy source:
`offboard-career-context-hp-copy-v1a.md` (owner-supplied), with two
never-say substitutions recorded in the decision log. Layout follows
`docs/design-system-civic-modern/`.

**Meta title:** `Offboard | The modern unemployment office`
**Meta description:** `Offboard is the modern unemployment office: one calm place for your benefits, deadlines, runway, funded training, and next job. Verified facts, AI guidance, and a plan that starts where you are. Independent, not a government agency.`

Section order: Hero → Wherever you work → Career Context → More than a job
search (first question + plan-preview card, then triptych and the remaining
questions) → Meet Lumo → Toolkit → Pro → Sponsored access → Built around you
→ Community → Final CTA.

### Hero

- H1: `The modern unemployment office.`
- Body: `Your job search, benefits, applications, career context, and next steps in one system, connected to the AI you already use.`
- CTAs: `Get started free` (primary) · `See how it works` → `/how-it-works`
- Trust line: `Join thousands of people building their next chapter with Offboard.` *(owner-confirmed accurate 2026-08-31)*
- Hero visual: kitchen-table photo with chip `Benefits check · Done`, plus an example AI conversation: You: `I think I'm going to apply to this. Add it to Offboard.` / AI: `Done. I've added the role to your Offboard tracker and saved the company context.` with tracker card `Product Designer / Tesserac / Saved`.

### Offboard, wherever you work

- Kicker: `Offboard, wherever you work`
- H2: `Your job search goes wherever you do.`
- Body: `Use Offboard from the AI tools you already use. Research a job, save it to your tracker, compare opportunities, update applications, and keep your search moving without constantly switching tabs.`
- Callout: `Powered by Offboard Career Context`
- Section link: `See how Offboard Everywhere works` → `/integrations`
- Demo conversation: You: `How does this role compare with the other opportunities I'm pursuing?` / AI: `Based on your Offboard context, Tesserac looks like one of your stronger opportunities. It aligns closely with your AI product experience and gives you more technical ownership than several of the other roles you're considering.` / You: `Move Tesserac to the interview stage and save that Ruben is my recruiter.` / AI: `Done. Tesserac is now in Interviewing, and I've added Ruben to the opportunity.`
- Capabilities:
  1. `Save opportunities instantly` — `Turn something you're already discussing into a tracked opportunity without filling out another form.`
  2. `Update your search by conversation` — `Move stages, add notes, save contacts, record interviews, and update what happened just by asking.`
  3. `Compare opportunities using your context` — `Understand which roles actually fit your experience, goals, preferences, and current search.`
  4. `Work across Offboard and AI` — `Use Offboard directly or connect it to supported AI assistants. Your job search stays in sync.`

### Career Context

- Kicker: `Career Context`
- H2: `One place that remembers your career.` *(widened from "your entire job search", owner strategy doc, plan 025)*
- Body: `Your resume is only a fraction of your career. Offboard builds a living record of your experience, accomplishments, applications, companies, conversations, documents, interviews, goals, and progress so you don't have to explain yourself from scratch every time you need help.`
- Categories: `Experience` — `Roles, skills, accomplishments, projects, and outcomes.` · `Applications` — `The opportunities you're pursuing and what has happened with each one.` · `Companies` — `Research, notes, people, hiring signals, and what you've learned.` · `Contacts` — `Recruiters, hiring managers, referrals, and people in your network.` · `Documents` — `Resumes, application materials, job descriptions, and other files.` · `Interviews` — `Upcoming conversations, preparation, notes, feedback, and next steps.` · `Preferences` — `The work you want, compensation expectations, location, industries, and constraints.` · `Goals` — `What you're trying to accomplish and what needs your attention next.`
- Section link: `Learn more about Career Context` → `/career-context`
- Central card: `Your Career Context` — `Always evolving. Available wherever you use Offboard.` — `Build it once. Keep making it better. Let the tools you use work from the same understanding of you.`
- CTA: `Build my Career Context`

### More than a job search

- Kicker: `More than a job search`
- H2: `Losing your job creates more than one problem.`
- Body: `Finding another role matters. But so do unemployment benefits, health coverage, finances, career decisions, applications, networking, interviews, and figuring out what to do first. Offboard brings those pieces together.`
- Question blocks:
  1. `What do I do first?` — **Your personalized plan** — `Tell Offboard what's happening, and we'll help organize what needs your attention now, what can wait, and what comes next.`
  2. `What support might I qualify for?` — **Benefits and workforce programs** — `Navigate unemployment insurance, training programs, workforce resources, and other forms of support that may be available where you live.`
  3. `Is this job worth my time?` — **Opportunity intelligence** — `Check role fit, investigate possible ghost jobs, research companies, and understand whether an opportunity deserves your energy.`
  4. `How do I submit a stronger application?` — **Application support** — `Turn your Career Context and the opportunity into stronger resumes, application packets, cover letters, and positioning.`
  5. `How do I prepare when I hear back?` — **Interview preparation** — `Research the company, anticipate questions, prepare stories from your experience, and practice interviews with AI.`
  6. `How do I keep everything straight?` — **Tracker + Career Context** — `Keep every opportunity, contact, document, conversation, and next step connected.`
- The first question is rendered beside the plan-preview card that answers it.
- Plan-preview card *(rebuilt in plan 018 phase 3 from real product state; every string below is verbatim from `lumo-plan-builder` `origin/main`)*: heading `Your Path` · lede `The steps that fit your situation. Do them in any order.` · stage row `Protect the first week` / `3 left` · steps `Write down your key dates` — `Most post-layoff mistakes are missed deadlines.` · `Understand your COBRA / health insurance options` — `A gap in health coverage can be financially devastating.` · `Secure your accounts and access` — `Paystubs, tax docs, benefits, and equity portals often live behind work logins that disappear without warning.` · `Show 2 done`
  - **Retired with this rebuild** (do not reinstate; none of it exists in the product): heading `Your starting plan / Week one`, tabs `Now · This week · Coming up`, the `Priority / Possible / Next` status rows with their `Money / Support / Job search` categories, and the LUMO row `Ask Lumo what to do first / Context already attached`.
  - **Deliberately excluded** (owner decision 2026-08-26, claim-free subset): the real steps whose copy carries a benefit or severance number — `File for unemployment benefits` with `Takes 2-3 weeks to start`, and `Review your severance agreement` with `21 or 45 days to decide`. Both are real product copy but neither is in the verified-facts ledger above. Adding either to this card means adding a ledger row first.
- Photo chips: `Plan · Updated` · `Benefits check` · `Resume · 3 versions`
- Small print: `Offboard is independent, not a government agency, and claiming your benefits is always free.`

### Meet Lumo

- Kicker: `Meet Lumo`
- H2: `An AI guide that already knows what you're working on.`
- Body: `Lumo is Offboard's native AI assistant. Because Lumo works from your Career Context, you can ask about your search without repeatedly uploading resumes, explaining your goals, or reconstructing what happened with every application.`
- Prompts label: `Ask things like`
  1. `What should I focus on today?`
  2. `Which of my open applications need follow-up?`
  3. `Help me prepare for tomorrow's interview.`
  4. `Why do you think this role is a strong fit for me?`
  5. `What should I do differently based on how my search has been going?`
- CTA: `Ask Lumo`
- Supporting: `Prefer another AI assistant? Connect Offboard and take your context with you.`

### Your job search toolkit

- Kicker: `Your job search toolkit`
- H2: `Everything you need when the next opportunity appears.`
- Groups: **Decide** (`Role Fit` — `Understand how an opportunity matches your experience, strengths, and goals.` · `Ghost Job Check` — `Look for signals that a posting may not represent an actively hiring role.` · `Company Intelligence` — `Know who you're applying to before you invest your time.`) · **Apply** (`Application Packets` — `Bring together the role, company, resume strategy, positioning, and application materials in one place.` · `Resume Tailoring` — `Adapt your resume using the opportunity and your Career Context.` · `Cover Letters` — `Create relevant application messaging without starting from a blank page.`) · **Interview** (`Interview Prep` — `Turn company and role context into a focused preparation plan.` · `Voice Practice` — `Practice answering questions in a realistic voice conversation.`) · **Organize** (`Application Tracker` — `Keep your entire pipeline current.` · `Career Context` — `Connect the history behind every application, interaction, and outcome.`)

### Offboard Pro

- Kicker: `Offboard Pro`
- H2: `Free remembers your search. Pro puts it to work.`
- Body: `Start free and build the foundation of your Career Context. When you want deeper intelligence, preparation, and personalized help, Offboard Pro uses that context to help you make better decisions and move faster.`
- Free ($0 forever): `Build your Career Context.` · `Track opportunities.` · `Save companies, contacts, notes, and activity.` · `Connect supported AI assistants.` · `Use core job-search tools.` — CTA `Start free`
- Pro ($20/month): `Compare opportunities using your complete context.` · `Get deeper role and company intelligence.` · `Create advanced application materials.` · `Prepare for interviews using everything Offboard knows about you and the opportunity.` · `Analyze patterns across your job search.` · `Get more personalized recommendations about what to do next.` — CTA `See Pro pricing` → `/pricing`
- Supporting: `Don't pay just to keep your job search organized. Upgrade when you want Offboard to do more with everything it knows.`

### Sponsored access

- Kicker: `Sponsored access`
- H2: `Job-search support people will actually use.`
- Body: `Offboard can be sponsored by employers, workforce organizations, universities, and community partners so people navigating job loss can use the same system in Offboard or from the AI tools already part of their workflow.`
- Audiences: `Employers` — `Support people through layoffs of any size without requiring them to learn another outplacement portal.` · `Workforce and government` — `Give residents personalized guidance and modern career tools alongside existing public programs.` · `Universities and communities` — `Help members navigate career transitions with tools that stay useful beyond a single workshop or program.` *(source doc said "with infrastructure that"; "infrastructure" is never-say, substituted)*
- CTA: `Sponsor Offboard` → `/employers`

### Built around you

- Kicker: `Built around you`
- H2: `Your career context should belong to you.`
- Body: `Your professional history shouldn't be trapped inside a single resume, recruiting site, or AI conversation. Offboard is building a portable Career Context that can grow with you across jobs, searches, career changes, and the AI tools you choose to use.` *(source doc said "recruiting platform"; "platform" is never-say, substituted)*
- Affirmation: `Your experience. Your progress. Your context. Available when you need it.`
- CTA: `Create my Career Context`

### Community *(carried over from v1; not in the v2 source doc)*

Kept because the `/community` legacy redirect targets `/#community` and the
newsletter fact ledger row lists Home. Copy unchanged from v1:

- Kicker: `Community` · H2: `Job searching is hard enough without doing it alone.`
- Body: `Practical job-market intelligence, people navigating the same uncertainty, and a real person when you feel stuck.`
- Rows:
  1. `The Offboard Newsletter` — `Weekly job-market analysis and honest takes on tech hiring. 5,000+ subscribers.` — `Subscribe free` → `https://newsletter.offboard.co`
  2. `Slack community` — `Job seekers sharing leads, asking questions, and keeping each other accountable.` — `Join the Slack` → `https://offboard.co/community`
  3. `Meet with a human` — `Stuck on your search? Share where you are and our team reaches out directly. Free.` — `Say hello` → `/intake`

### Final CTA

- H2: `You don't need another place to start over.`
- Body: `Build one Career Context. Keep your job search organized. Get help with what comes next. Use Offboard directly or bring it into the AI tools you already use.`
- CTA: `Get started free` (the Lumo-filled button, per the design system's final-CTA rule)
- Small print: `No credit card required.`

The v1 homepage sections this version retired: The real problem, Identity
contrast, The three jobs, The hook band ($12k), One connected plan (its
plan-preview card survives, folded into More than a job search), Verified
facts (still on `/how-it-works`), Pricing teaser, Employer strip, Privacy
summary, and the shared Final CTA default copy (still used on route pages).
Their copy remains in git history; re-adding any of them is a copy decision
for the owner.

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

### Public & workforce partners *(moved to `/workforce` in plan 035; a crosslink stays)*

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
  3. `The full toolkit` — `Job Packets, resume tailoring, interview prep, application tracking, and Lumo.`
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
**Meta description:** `Build your career context once and use it everywhere: a living record of your experience, applications, companies, interviews, and goals that improves every tool you use, in Offboard and in the AI assistants you already work with.`

### Hero

- Kicker: `Career Context`
- H1: `Build your career context once. Use it everywhere.`
- Body: `Your resume is one page about your past. Your Career Context is a living record of your experience, applications, companies, conversations, interviews, preferences, and goals. Offboard builds it with you and puts it to work in every tool you use.`
- CTA: `Create my Career Context` (primary)

### Why a resume isn't enough

- Kicker: `The problem`
- H2: `A resume is a fraction of your career.`
- Body: `A resume compresses years of work into one page for one audience. It leaves out the projects that went well, the numbers behind them, the people you worked with, what you learned in interviews, and what you actually want next. So every new tool, and every new conversation, starts from scratch.`
- Contrast blocks:
  1. `What a resume holds` — `Titles, dates, and a dozen bullet points, tuned for the last role you applied to.`
  2. `What your career holds` — `Projects, outcomes, relationships, decisions, feedback, and direction. The material that makes your next application stronger.`
  3. `What keeps getting lost` — `Every time you explain yourself to a new tool or a new chat window, the context evaporates when the tab closes.`

### What goes in

- Kicker: `Start fast`
- H2: `Bring what you already have.`
- Body: `Offboard builds the first version of your Career Context from the things you already have, in minutes. Then it keeps getting better as you use it.`
- Cards:
  1. `Resume import` — `Start from the document you have. Offboard turns it into structured experience you can build on.`
  2. `LinkedIn` — `Bring your profile history in instead of retyping it.`
  3. `AI conversations` — `Import the career context you have already built up in your ChatGPT history.`
  4. `Portfolio & documents` — `Work samples, case studies, and files that show what you did.`
  5. `Projects & outcomes` — `The work behind the bullet points, with the results that made it matter.`
  6. `Interview stories` — `The examples you reach for in interviews, saved once and ready to reuse.`
  7. `Goals & preferences` — `The work you want, where, and on what terms.`
  8. `Applications & contacts` — `The opportunities you are pursuing and the people connected to them.`

### It gets better as you go

- Kicker: `Always evolving`
- H2: `Every step of your search makes it smarter.`
- Question blocks:
  1. `You apply to a role` — **Applications** — `The role, the company research, and the materials you used stay connected to the outcome.`
  2. `You finish an interview` — **Interviews** — `Questions asked, answers given, and what to prepare next become part of the record.`
  3. `You talk it through` — **Conversations** — `Decisions and updates you make in conversation, with Lumo or a connected assistant, land in your Career Context instead of vanishing.`

### What it powers

- Kicker: `Put it to work`
- H2: `One record. Every output.`
- Capabilities:
  1. `Tailored resumes` — `Resume versions built from your real history, tuned to the role in front of you.`
  2. `Application packets` — `The role, the company, your positioning, and your materials in one place.`
  3. `Interview preparation` — `Prep plans and practice grounded in your actual experience and the actual role.`
  4. `Better decisions` — `Compare opportunities against your experience, preferences, and how your search is going.`

### How Lumo uses it

- Kicker: `Meet Lumo` (Lumo eyebrow treatment)
- H2: `Lumo starts every conversation already caught up.`
- Body: `Because Lumo works from your Career Context, you never re-upload a resume, re-explain your goals, or reconstruct what happened with an application. You ask, and the answer starts from everything you have already built.`
- CTA: `Ask Lumo` (AI button)

### Works with the AI you already use

- Kicker: `Offboard, wherever you work`
- H2: `Offboard holds the record. You choose the interface.`
- Body: `Connect Offboard to supported AI assistants and your Career Context goes with you. Save an opportunity from a conversation, update an application, or add what you just learned, from whichever tool you are already in.`
- Demo conversation: You: `Save the interview questions I just worked through, and what I answered.` / AI: `Done. I have added them to your interview stories.` *(varied 2026-08-31 so it does not duplicate the /integrations demo, which owns the project-outcomes line)*

### Yours, and private

- Kicker: `Private by default`
- H2: `Your Career Context belongs to you.`
- List:
  1. `You choose what goes in, and you can edit or remove anything.`
  2. `Connected assistants see what you authorize, not everything.`
  3. `Sponsors only ever see aggregate participation, never your record.`
  4. `You can export what you have built. It is yours.`

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
**Meta description:** `Connect Offboard to the AI assistants you already work in. Save opportunities, update applications, and add to your Career Context from wherever the conversation happens. Offboard holds the record, you choose the interface.`

### Hero

- Kicker: `Offboard everywhere`
- H1: `Use Offboard from the AI you already use.`
- Body: `Your job search does not live in one tab. Connect Offboard to the assistants you already work in, and save opportunities, update applications, and add to your Career Context from wherever the conversation happens.`
- CTA: `Get started free` (primary)

### What connects (the showcase grid)

- Kicker: `What connects`
- H2: `Offboard holds the record. You choose the interface.`
- Body: `Connect the tools you already work in. Offboard keeps one record of your search, and a connection reads and updates it with your permission.`
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
partner marks are hand-authored SVG in the partner's own colors
(`IntegrationLogos.tsx`), the one place on the site allowed outside the
Civic Modern palette. Statuses are governed by the verified-facts ledger
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

### What you can do from a conversation

- Capabilities:
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

### Prefer to stay in Offboard

- Kicker: `Or use Lumo`
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
**Meta description:** `Lumo is Offboard's AI assistant. It works from your Career Context, your applications, your interviews, and your plan, so you can ask about your search without explaining yourself first.`

### Hero

- Kicker: `Meet Lumo`
- H1: `The AI that already understands your career.`
- Body: `Lumo is Offboard's assistant. It works from the record you have already built, so a question about your search starts from your actual situation instead of a blank chat window.`
- CTA: `Ask Lumo` (primary)

### What Lumo knows

- Kicker: `What it knows`
- H2: `It starts from your record, not a blank page.`
- Cards:
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
- Prompts:
  1. `What should I focus on today?`
  2. `Is this opportunity worth my time?`
  3. `Help me prepare for tomorrow's interview.`
  4. `What support might I qualify for?`
  5. `How do I make this application stronger?`
  6. `What patterns do you see across my search?`
  7. `Add what we just worked out to my Career Context.`
  8. `Move Tesserac to the interview stage.`

### Why this is different

- Kicker: `The difference`
- H2: `Not a smarter chatbot. A better starting point.`
- Body: `Lumo is not claiming to out-think a general assistant. The difference is what it is working from: the structured, continuously updated state of your career, rather than whatever you can paste into a message box.`
- Contrast blocks:
  1. `Pasting a resume into a chat` — `One document, no history, and none of it is there tomorrow. Every conversation restarts from zero.`
  2. `Asking Lumo` — `Your experience, applications, interviews, and goals are already there, and what you decide together is saved back.`
  3. `What that changes` — `You spend the conversation on the decision instead of on context, and the answer is about your search rather than job searching in general.`

### What Lumo will not do

- Kicker: `Straight answers`
- H2: `It works from verified facts, and it does not decide anything for you.`
- List:
  1. `When Lumo talks about benefits, it reads from state facts a person verified. It does not invent a dollar figure or a deadline.`
  2. `Offboard is independent, not a government agency. Agencies and providers decide eligibility and benefit amounts.`
  3. `Lumo helps you do the work. It does not replace your review and judgment on anything you send out.`
  4. `Free includes 3 Lumo messages a day. Pro removes the limit.` → `/pricing`

### Prefer a different assistant

- Kicker: `Or bring your own`
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

**The `~$12,000` CalJOBS hook ships here (owner approval 2026-09-01, plan
033).** It left the homepage in v2 and this page is its documented home. It
ships with its conditions and the "amounts vary" small print attached, per
the ledger row, and it stays off the homepage. The `2,000+ job centers`
framing is still held back: it has an approved ledger row but no owner
decision, so it was not resurrected.

**Meta title:** `Layoff & Benefits | Offboard`
**Meta description:** `A layoff is not only a job search. Offboard helps you work out what to do first, what support you may qualify for, how to keep health coverage, whether training is funded, and how long your money lasts.`

### Hero

- Kicker: `Layoff and benefits`
- H1: `Losing your job creates a lot of problems at once.`
- Body: `The job search is the visible one. Underneath it are benefit deadlines, health coverage decisions, a shrinking runway, and paperwork written for an agency rather than for you. Offboard helps you take them in order.`
- CTA: `Build my free transition plan` (primary)

### The questions underneath

- Kicker: `What people actually ask`
- H2: `Six questions, in the order they usually arrive.`
- Question blocks:
  1. `What do I do first?` — **Your transition plan** — `Tell Offboard what happened and it organizes what needs attention now, what can wait, and what comes next.`
  2. `What am I eligible for?` — **Unemployment benefits** — `Plain-language steps toward the official process in your state, with the deadlines that matter surfaced early.`
  3. `How do I keep health insurance?` — **Health coverage** — `Understand the windows you are inside, and what your options are before one of them closes.`
  4. `Is there funding for training?` — **Workforce and retraining programs** — `Find state-approved programs that may be paid for while you train, with the official source for each one.`
  5. `How long can I afford to search?` — **Runway** — `See how long your money lasts, and which decisions change that number.`
  6. `How do I find another job?` — **The search itself** — `The tracker, the packets, the interview prep, and the record behind them.`

### What Offboard does about it

- Kicker: `How it helps`
- H2: `One plan, in the order that matters.`
- Capabilities:
  1. `Your situation, not a template` — `The plan starts from your state, your dates, and what actually happened.`
  2. `Deadlines surfaced early` — `The clocks that expire quietly are the expensive ones. Offboard puts them in front of you.`
  3. `Official sources, every time` — `Every program links to the official source that decides it. You are never asked to take our word for it.`
  4. `The search stays connected` — `The money side and the job side live in one place instead of two.`

### The CalJOBS hook

Placed between "The questions underneath" and "What Offboard does about
it". Approved v7 copy, shipped verbatim with the small print.

- Kicker: `One example`
- H2: `There is a deadline worth roughly $12,000 that most people have never heard of.`
- Body: `If you were laid off in California, you may be able to keep your unemployment benefits while you train full-time, including an extension worth roughly $12,000. But only if you contact EDD before week 16 of your benefit payments. Most people have never heard of it. Offboard watches that clock for you.`
- Small print (required, never shipped without it): `Amounts and timing vary by situation. We never promise funding, we show you the exact path to find out.`
- Sample card (labelled a sample, never live data): `Benefit payments` / `Sample · CA` / `Week 12 of 16` / `Now · week 12` / `Deadline · week 16` / `~$12,000 at stake` / `4 weeks left to contact EDD`

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

### Then the search

- Kicker: `And then the job`
- H2: `When the paperwork is handled, the search is still there.`
- Body: `Offboard keeps the money side and the search side in the same place, so the work you do on one does not get lost when you turn to the other.`
- Section link: `See how Offboard works` → `/how-it-works`

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
**Meta description:** `A job search that works as one system. Decide whether a role is worth pursuing, build the application, track it, prepare for the interview, and record what happened, with every pass making the next one better.`

### Hero

- Kicker: `Job search`
- H1: `A job search that works as one system.`
- Body: `Most job-search tools solve one step and forget the rest. Offboard connects the whole loop, from the role you just found to the interview you just finished, so nothing has to be re-explained at the next step.`
- CTA: `Build my free transition plan` (primary)

### Why one system

- Kicker: `The difference`
- H2: `A bag of tools makes you the integration.`
- Body: `Separately, a resume tool, a tracker, and a chat window each solve one step. Together they leave you carrying context between them: pasting the same history, re-explaining the same goals, and rebuilding the same picture of a company you already researched last week.`
- Contrast blocks:
  1. `Ten tools, ten starting points` — `Each one asks who you are before it can help, and none of them remembers what the last one learned.`
  2. `One system, one record` — `Every step reads from and writes to the same Career Context, so the work compounds instead of resetting.`
  3. `What that changes` — `The tenth application takes less effort than the first, because everything the first nine taught the system is still there.`

### The loop

- Kicker: `How it runs`
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
- Groups:
  1. `Decide` — `Whether this one deserves your week.` — `Role Fit · Ghost Job Check · Company Intelligence`
  2. `Apply` — `What you actually send.` — `Application Packets · Resume Tailoring · Cover Letters`
  3. `Interview` — `Walking in prepared, not rehearsed.` — `Interview Prep · Voice Practice`
  4. `Organize` — `Where all of it is kept.` — `Application Tracker · Career Context`

### The memory underneath

- Kicker: `What makes it compound`
- H2: `The loop only works because something remembers.`
- Body: `Every stage reads from your Career Context and writes back to it. That is the difference between a set of tools that happen to sit in one account and a search that gets better the longer you run it.`
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
  3. `The full toolkit` — `Job Packets, resume tailoring, interview prep, application tracking, and Lumo.`
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
| 2026-09-01 | ChatGPT and Claude connections confirmed live, shipped labelled "Beta" (owner's framing: they work and are still being refined). Closes plan 028's first verification flag | plan 033, this file § 11 |
| 2026-09-01 | `/integrations` leads with a card grid of real integrations; "The idea" editorial block cut for length | plan 033, this file § 11 |
| 2026-09-01 | The `~$12,000` CalJOBS hook ships on `/layoff-support`, with conditions and small print, and stays off the homepage | plan 033, this file § 13 |
| 2026-09-01 | Dropdown navigation ships (Product / For Organizations / Resources); header CTA stays `Build my plan`; Company Transition Centers held out of Resources until `/companies` exists | plan 037, this file § Site chrome |
| 2026-09-01 | `/communities` ships, completing the For Organizations split; no prices and no category claim on it, both by choice and both reversible | plan 036, this file § 16 |
| 2026-09-01 | `/workforce` ships and `/public-partners` is retired and 301'd to it; the public-sector section leaves `/employers` for a crosslink; no county named and no B2G capability claimed beyond `/act` and `/employers` copy | plan 035, this file § 8 |
| 2026-09-01 | Privacy & Security ships at `/privacy-security`, ported claim-for-claim from the app repo's `SECURITY_CLAIMS.md`; `/security` now redirects here instead of `/about` | plan 034, this file § 15 |
| 2026-09-01 | `/public-partners` folds into `/workforce` and redirects when `/workforce` ships (no thin page kept) | plan 026 decision 1, docs/site-architecture.md |
| 2026-08-24 | Clarified the "outplacement" scope: allowed on /employers AND in Sponsored-tier copy wherever it renders (home teaser, /pricing deck), per the 2026-08-21 owner call. The earlier "one page only" wording in Language rules was inaccurate and is corrected. | COPY.md, plan 019 |

**Open owner items:** re-verify SB 617 currency (`/employers`) · optionally
tighten About FAQ #4 toward the beachhead · verify logos-band claims ·
Steph's essay editorial pass · execute the gift lane (plan 015) · the real
permissions model for `/integrations` (plan 028 flag 2, still open) · yes/no
on the `2,000+ job centers` framing for `/layoff-support` · confirm the
connected-assistant section on `/privacy-security` and add that connection
to the app repo's claims register.
