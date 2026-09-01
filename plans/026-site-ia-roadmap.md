# Plan 026 — Site IA roadmap (written plan; phases 2-4 are NOT yet built)

Source: the owner's site-architecture strategy doc (2026-08-31, analyzed in
plan 025's session). The homepage now tells the whole Offboard story; a
small set of pillar pages lets visitors zoom into the concepts they care
about. **The dropdown represents systems, not features** — no per-tool
pages (role-fit, cover-letters, …); Ghost Check is the one possible
standalone exception if acquisition data justifies it.

## Target navigation (end state)

Product ▾ (Career Context · Lumo · Job Search · Layoff & Benefits ·
Offboard Everywhere) · How it works · For Organizations ▾ (Employers ·
Workforce & Government · Universities & Communities) · Pricing ·
Resources ▾ (Guides · Company Transition Centers · Privacy & Security) ·
About · Sign in · Get started.

The dropdown nav ships only when its pages exist — no dead links. Until
then the flat 6-link nav stands.

## Phases

**Phase 1 — DONE in plan 025:** `/career-context` (the pillar visitors
least understand without explanation), homepage h2 widened to "One place
that remembers your career.", footer link. Owner-copy sign-off gates
merge.

**Phase 2 — remaining pillars, in the owner's recommended order, each
gated on owner copy approval:**
1. ~~`/integrations` ("Offboard Everywhere")~~ **DONE, plan 028; rebuilt
   as an integrations showcase in plan 033.** — the consumer-facing MCP
   story: demos per assistant, the mental model "Offboard holds the
   record. You choose the interface.", and the permissions/authorization
   story (what a connected assistant can and cannot see). Potentially the
   most differentiated page on the site.
2. ~~`/lumo`~~ **DONE, plan 029.** What Lumo knows, what it can do, and the differentiator:
   not smarter than a general chatbot, but operating against the
   structured, continuously updated state of your career. Ends by saying
   other assistants are fine too, linking to /integrations.
3. ~~`/layoff-support`~~ **DONE, plan 030.** Strategically important: it
   is what keeps the site the Modern Unemployment Office rather than an
   AI job-search SaaS. Personalized plan, benefits, health coverage,
   funded training, financial planning, then the search.
4. ~~`/job-search`~~ **DONE, plan 031.** The lifecycle as one system.

**Phase 2 is complete.** All five pillars ship. The footer Product column
now carries six product links, which is the signal that phase 4's dropdown
nav is close to worth doing.

**Phase 3 — trust + organizations + distribution:**
- ~~`/privacy-security`~~ **DONE, plan 034.** A plain-English trust page
  (mandatory per the strategy doc: trust is intrinsic to Career Context
  working at all). Shipped with a who-sees-what table, the
  sponsored-account aggregate-only rule as its own band, an honest-limits
  section, and data ownership. Every claim is ported from the app repo's
  `SECURITY_CLAIMS.md` §1; the no-certification line is stated outright
  rather than omitted.
- For Organizations split: `/employers` stays and improves;
  ~~`/workforce`~~ **DONE, plan 035** (Workforce & Government, under the
  ACT B2G language firewall; it names no county, and the app repo's
  aspirational B2G capability set is deliberately not claimed).
  `/public-partners` was retired into it and 301s there, closing decision
  1 below. ~~`/communities`~~ **DONE, plan 036** (universities, alumni
  orgs, associations, nonprofits; shipped light, with no prices and no
  category claim, both deliberate). **The organization split is
  complete.**
- `/companies` Company Transition Centers + per-company pages — the
  utility/SEO/distribution layer.

**Phase 4 — dropdown navigation** (Product / For Organizations /
Resources), replacing the flat nav once phases 2-3 give it real pages.
Nav tests, COPY.md chrome, and baselines move with it.

## Open owner decisions (recorded, not presumed)

1. ~~**Fate of `/public-partners`** once `/workforce` exists.~~
   **DECIDED 2026-09-01 (owner): consolidate.** `/public-partners` folds
   into `/workforce` and the old URL redirects to it. No thin crosslink
   page is kept. **Shipped in plan 035**, redirect and all.
2. ~~Whether "Get started" replaces "Build my plan" as the header CTA
   label when the dropdown nav ships.~~ **DECIDED 2026-09-01: the header
   keeps `Build my plan`.** The owner deferred the call; the reasoning is
   in plan 033. Reversible in one line if the dropdown build disagrees.
3. Ghost Check as a standalone acquisition page.
4. Homepage "One place that remembers your career." shipped in phase 1 —
   confirm it stays after seeing it live.

## Standing guardrails (every phase)

- `/act` never enters nav and never receives a redirect; the B2G language
  firewall holds on any government-facing page including `/workforce`.
- `/resources` URLs are SEO-load-bearing; nav label stays "Guides" but no
  route rename.
- Copy lands in COPY.md first or same PR; new pages join the CopyDrift
  sweep lists, the visual/reset-shadowing/overflow route lists, and the
  sitemap in the same PR (plan 025 is the template).
- One primary CTA per view; lime = primary-on-dark + AI accents.
