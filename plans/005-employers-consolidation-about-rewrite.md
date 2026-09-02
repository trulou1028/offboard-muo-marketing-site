# Plan 005: Consolidate /employers (absorb public-partners) and ground /about in the founder story

> **Execute with:** Opus 5 · medium effort — two page rewrites from approved copy, one nav trim. *(Executed. Model line added retroactively 2026-09-01 under plans/README.md § "The model line".)*

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 9689184..HEAD -- src/app/employers/ src/app/about/ src/app/public-partners/ src/components/marketing/homepage/`
> Expected drift: plans 001–004. Any other change to `MarketingEmployers`,
> `MarketingAbout`, `MarketingPublicPartners`, or `NAV_LINKS` is a STOP.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/002-homepage-substance-port.md (voice and section patterns)
- **Category**: direction
- **Planned at**: commit `9689184`, 2026-08-21
- **Outcome**: DONE — executed and reviewed 2026-08-22, approved first pass.

## Execution record (2026-08-22, executor + advisor review)

Branch `claude/005-employers-about`, 5 commits, based on
`claude/008-cta-contrast` (top of the 002→003→004→008 stack). 8 files, all in
scope.

Reviewer verification (independent): header nav renders exactly
`How it works · Pricing · About · For employers`; `/public-partners` still
builds and renders its H1; the footer still carries BOTH partner links;
`grep -c public-partners` in `MarketingSite.tsx` = 2 (type union + footer).
`npm test` 7/7 · lint 0 · build 0 · **e2e 6/6** (the executor added two
tests). No em-dashes. `git merge-tree` shows 0 conflicts against
`claude/007-imagery-dedupe`, which also edits the About origin section.

**Founder story correctly left neutral.** The origin section keeps the
existing non-biographical paragraphs verbatim; only the kicker and H2 changed.
No names, dates, or family details were invented. Confirmed by reading the
rendered paragraphs.

**Executor flagged a genuine cross-plan contradiction** (credit where due):
"Outplacement" appears in `PricingSection` and `PricingTeaser`, outside
`/employers`. It correctly declined to fix it as out of scope. Root cause is
**this advisor's own inconsistency**, not the executor's: plans 002 and 004
specified that phrase for the Sponsored tier, while plan 005 carries the rule
that "outplacement" is `/employers`-only. See plan 009.

**Reviewer found a second instance of the same class**: the word "workspace"
is on the never-say list and appears 7 times in user-facing copy. Only ONE is
new here (`Follow through ... one private workspace`, which came from this
plan's own copy spec); the other six pre-date the rebuild. Not a defect of
this plan, and deliberately NOT revised here — fixing one instance while six
remain would be theatre. Swept in plan 009 instead.

**Not changed, correctly**: the About origin photo is still
`hero-real-life.webp` on this branch, because plan 007 (which changes it to
`strip-kitchen-table.webp`) is on an independent branch outside this stack.
The two merge without conflict.

## Why this matters

The site spends two of five nav slots on B2B audiences, and neither partner
page speaks the buyer's language: `/employers` never says "outplacement" —
the word buyers actually search and budget against. Meanwhile `/about`
explains the product's philosophy but not why the company exists, and trust
at a vulnerable moment is exactly what an about page must earn. This plan
merges the public-partners audience into `/employers` as a section, rewrites
`/employers` around sponsorship in buyer language, trims the nav to five
jobseeker-first items, and rebuilds `/about` around the founder story.

## Current state

- `src/components/marketing/homepage/MarketingSite.tsx`:
  - `NAV_LINKS` (lines 72–78) — five entries; the last two are:
    ```tsx
    { route: "employers", href: "/employers", label: "For employers" },
    { route: "public-partners", href: "/public-partners", label: "For public partners" },
    ```
  - Footer (`MarketingFooter`, ~line 120–160) has a `Partners` column with
    both links (line ~135: `<Link href="/public-partners">For public partners</Link>`). The footer KEEPS both links.
  - `MarketingRoute` union type (lines 10–16) includes `"public-partners"`. Keep it.
- `src/components/marketing/homepage/MarketingRoutePages.tsx`:
  - `MarketingEmployers()` (~line 137) — PageHero + two `EditorialGrid`s +
    an inline sponsor-visibility section + `ContactBand`. Contact CTAs are
    `mailto:hello@offboard.co?subject=Employer%20support`.
  - `MarketingPublicPartners()` (~line 176) — PageHero + `EditorialGrid` +
    inline boundary section + `EditorialGrid` + `ContactBand`, CTAs
    `mailto:hello@offboard.co?subject=Public%20partner%20support`.
  - `MarketingAbout()` (~line 90) — PageHero, an origin-story split section
    with a photo (`raw/maya-walking.webp` after plan 001), an
    `EditorialGrid` of product principles, an independence section, and a
    `ContactBand` for Concord/online.
- `src/app/public-partners/page.tsx` — thin wrapper + metadata. The route
  SURVIVES this plan (kept for links in the wild), just demoted from nav.
- Tests: `MarketingHome.test.tsx` renders all five route components and
  checks their metadata; e2e visits employer/public-partner pages.
- Language rules: buyer-facing `/employers` MAY use "outplacement" — this is
  the one page where it belongs. Jobseeker pages never use it. Voice
  otherwise unchanged: plain, no em-dashes, no "platform/solutions".
- Sponsorship facts (from the product brief; do not embellish): self-serve
  sponsorship seats, outplacement-framed, one-time per-employee pricing,
  employers also post jobs free; sponsors receive aggregate reporting only,
  never individual member activity.

## Copy specification (inline, authoritative)

### /employers

**PageHero** — kicker `For employers`; title
`Outplacement, modernized.`; body
`Give the people you're letting go a real starting point: the modern unemployment office in their pocket. Sponsored access is self-serve, priced one-time per employee, and private by design for the people who use it.`;
cta `Talk about sponsored access` (keep the existing mailto);
aside: label `How sponsorship works`, strong `Self-serve. One-time per employee.`,
paragraph `Buy seats for a departing group, send invitations, and see aggregate program reporting. No enterprise contract.`

**Section: what members get** (`EditorialGrid`) — kicker `The member experience`;
title `Support for the whole transition, not only the resume.`; body
`A layoff creates benefits, money, and job-search work all at once. Sponsored members get the full product: a personal plan, verified benefit deadlines, Job Packets, and human support options.`
Items: `A plan from day one` / `Members start from their situation and state, and see what deserves attention first.` ·
`Verified benefit facts` / `Deadlines and dollar figures checked by people, with official links. Claiming benefits is always free.` ·
`The full toolkit` / `Job Packets, resume tailoring, interview prep, application tracking, and LUMO.`

**Section: privacy boundary** (keep the existing inline
`mh-route-sponsor` split section, retitle) — kicker `Clear sponsor terms`;
H2 `People should know what a sponsor can see.`; body: keep the current
paragraph. Card copy: keep current structure (`Member workspace` /
`Chosen by the member`, `Sponsor view` / `Explained before enrollment`) and
add one line to the sponsor-view paragraph: `Sponsors receive aggregate participation and outcome reporting, never individual applications, conversations, finances, or reflections.`

**Section: hiring (new, short)** — kicker `Also for employers`; H2
`Hiring? Post roles free.`; body
`Offboard employers can post open roles at no cost. Postings reach members actively searching, with materials prepared and context attached.`
CTA link `Post a role` → `mailto:hello@offboard.co?subject=Hiring%20on%20Offboard`.

**Section: public and workforce partners (absorbs the old page)** — kicker
`Public & workforce partners`; H2
`Agencies decide. Offboard helps people prepare and continue.`; body
`For workforce boards, education partners, and public programs: Offboard organizes the practical work around the official system and routes residents to the responsible agency or provider for decisions and applications. Offboard does not determine eligibility, calculate benefits, or replace case workers.`
Items (`EditorialGrid`): `Orient` / `Start from the resident's situation and surface what may deserve attention now.` ·
`Route` / `Possible programs appear beside their responsible official source or local provider.` ·
`Follow through` / `Deadlines, questions, materials, and next steps stay in one private workspace.`
CTA (`ContactBand`): kicker `Public partnership`; title
`Build a clearer route through the transition.`; body
`Tell us which residents you serve and where the current handoff breaks down.`;
cta `Discuss a public partnership` → existing public-partner mailto.

### /public-partners (kept route, thinned)

Keep the page rendering but reduce it to: existing `PageHero` (unchanged) +
one short paragraph section + a `ContactBand`, with a prominent link
`See partner details on the employers page` → `/employers`. Purpose: the URL
keeps working for links in the wild; the substance lives on `/employers`.

### /about

**PageHero** — kicker `Why Offboard exists`; title
`Built for the moment work stops making sense.`; body
`Losing a job changes more than a resume. It can change your routine, confidence, finances, relationships, and sense of what comes next. Offboard was built to meet that whole moment with a clear plan, verified facts, and human support.`;
cta `Talk to the team` (keep existing mailto); aside unchanged.

**Origin section (rewrite the existing `mh-route-story` split)** — kicker
`The origin`; H2 `It started with the same questions, over and over.`; two
paragraphs:
`[FOUNDER_STORY — 2 short paragraphs from Stephanie: the family history of helping people through work transitions, and the newsletter and community this grew from. PLACEHOLDER — see STOP conditions.]`
Until approved copy arrives, keep the current two paragraphs (conversations,
newsletter, community) — do NOT invent biographical details.

**Community proof section (new, after origin)** — kicker `Where it grew`;
H2 `A newsletter and a community came first.`; body
`Before the product, Offboard was a weekly newsletter on the job market read by 5,000+ subscribers, and a community of people navigating the same uncertainty. The product organizes what those people were piecing together by hand.`

**Keep**: the `EditorialGrid` of principles ("Calm is part of the product."),
the independence section (`Offboard is not a government agency.`), and the
Concord `ContactBand` — all unchanged.

### Navigation

In `NAV_LINKS` (MarketingSite.tsx lines 72–78): remove the
`public-partners` entry. Final nav:
`How it works · Pricing · About · For employers` (+ Sign in + CTA).
(Plan 006 adds `Guides`.) Footer keeps BOTH partner links unchanged.

## Commands you will need

| Purpose   | Command          | Expected on success |
|-----------|------------------|---------------------|
| Tests     | `npm test`       | all pass            |
| Lint      | `npm run lint`   | exit 0              |
| Build     | `npm run build`  | exit 0              |
| E2E       | `npm run e2e`    | all pass            |

## Scope

**In scope**:
- `src/components/marketing/homepage/MarketingRoutePages.tsx`
  (`MarketingEmployers`, `MarketingPublicPartners`, `MarketingAbout`)
- `src/components/marketing/homepage/MarketingSite.tsx` (`NAV_LINKS` entry
  removal only)
- `src/components/marketing/homepage/MarketingHomepage.css` (additive only)
- `src/app/employers/page.tsx`, `src/app/about/page.tsx`,
  `src/app/public-partners/page.tsx` (metadata descriptions only)
- `src/components/marketing/homepage/MarketingHome.test.tsx`
- `e2e/homepage.spec.ts` (partner/about assertions)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch):
- Deleting the `/public-partners` route or the `MarketingRoute` type member
- Homepage, `/how-it-works`, `/pricing`, footer links
- Any real biographical claims about the founder not present in approved copy

## Git workflow

- Branch from `main` (after 002 merges): `claude/005-employers-about`
- Commit per logical unit (employers / public-partners / about / nav).
- Do NOT push or open a PR unless the operator instructed it.

## Steps

1. **Rewrite `MarketingEmployers`** per spec (hero, member grid, privacy
   split w/ added sentence, new hiring section, new partners section +
   ContactBand). Verify: `grep -n "Outplacement, modernized." src/components/marketing/homepage/MarketingRoutePages.tsx` → 1.
2. **Thin `MarketingPublicPartners`** per spec. Verify:
   `grep -n "employers page" src/components/marketing/homepage/MarketingRoutePages.tsx` → ≥1.
3. **Rewrite `MarketingAbout`** hero + origin + new community-proof section;
   keep principles/independence/ContactBand. Verify:
   `grep -n "5,000+" src/components/marketing/homepage/MarketingRoutePages.tsx` → 1.
4. **Remove `public-partners` from `NAV_LINKS`**. Verify:
   `grep -c "public-partners" src/components/marketing/homepage/MarketingSite.tsx` → exactly 2
   (the type union + the footer link).
5. **Update tests/e2e** for new headings and the 4-link nav. Verify:
   `npm test` → all pass.
6. **Full gates**: `npm run lint` → 0 · `npm run build` → 0 · `npm run e2e` → all pass.

## Test plan

- Unit: employers page asserts `Outplacement, modernized.` H1 and the
  aggregate-reporting sentence; public-partners asserts the crosslink to
  `/employers`; about asserts the new H1 and `5,000+`; nav test asserts
  exactly 4 marketing links and that `For public partners` is absent from
  the header (but present in the footer).
- E2E: `/public-partners` still returns a rendered page (route not deleted).

## Done criteria

- [ ] `npm test`, `npm run lint`, `npm run build`, `npm run e2e` all exit 0
- [ ] Header nav has 4 marketing links; footer still links both partner pages
- [ ] `/employers` contains the word `Outplacement` ; no other route does:
      `grep -rn "utplacement" src/ | grep -v Employers`-equivalent check → only MarketingEmployers matches
- [ ] `/public-partners` route still builds and renders
- [ ] No file outside the in-scope list modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

- **Founder story**: if the operator has not supplied approved origin-story
  copy, ship the section with the CURRENT (non-biographical) paragraphs and
  mark the plan's status `DONE (origin copy pending owner)` in the index.
  Never invent names, dates, or family details.
- **Subscriber count**: `5,000+` must be confirmed (same rule as plan 002);
  if plan 002 shipped a different verified number, use that number.
- Sponsorship pricing language ("one-time per employee") is contradicted by
  the operator — remove the pricing claim rather than guessing a new one.

## Maintenance notes

- If B2G becomes a real sales motion, `/public-partners` can be re-expanded
  or pointed at a dedicated `/act`-style landing page; the route and type
  member were deliberately preserved for that.
- Reviewer: check that "outplacement" appears ONLY on the employers page,
  and that no jobseeker-facing copy gained procurement vocabulary.
- The employer mailtos are placeholders for a future lead form; when a CMS
  (Supabase) phase lands, replace mailtos with a tracked form in one place —
  they are all defined inline in `MarketingRoutePages.tsx`.
