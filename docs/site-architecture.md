# Site architecture

**Rewritten 2026-08-31 (plan 025).** The previous version predated homepage
v2 and described sections that no longer ship; this version records current
reality and points at the target IA.

## Principle

One primary job per page. The homepage tells the whole Offboard story once;
pillar pages let visitors zoom into the concept they care about. The nav
represents systems, not features.

## Sitemap (current)

| Route | Audience | Page promise | Primary action |
| --- | --- | --- | --- |
| `/` | Jobseekers | The whole story: the modern unemployment office, Career Context, Lumo, and the toolkit | Get started free |
| `/career-context` | Jobseekers | The living record behind everything: build it once, use it everywhere | Create my Career Context |
| `/how-it-works` | Jobseekers | What happens after I sign up | See my starting plan |
| `/pricing` | Jobseekers | Start free; what Pro adds | Start free |
| `/resources` + `/resources/:slug` | Jobseekers, SEO | Practical guides | Read the guide |
| `/about` | Everyone | Why Offboard exists; independence | Talk to the team |
| `/employers` | B2B buyers | Outplacement, modernized ($199/seat) | Talk about sponsored access |
| `/communities` | Universities, alumni orgs, associations, nonprofits | Sponsor a record that outlasts a single workshop, appointment, or program year | Start a sponsorship conversation |
| `/workforce` | Workforce boards, counties, public programs | Agencies decide, Offboard helps residents prepare and continue; reporting boundary and pilot shape | Start a partnership conversation |
| `/privacy-security` | Jobseekers, sponsors, buyers | Who can see your record, who cannot, and where the honest limits are; claims ported from the app repo's `SECURITY_CLAIMS.md` | Build my free transition plan |
| `/act` | ACT pilot residents | Pilot landing (out of nav, B2G firewall) | Apply for pilot access |
| `/intake` (+ `/confirmed`) | Members | Native intake form (never redirect) | Submit |

All routes remain `noindex` until the public launch decision.

## Homepage section order (v2, plan 022)

Hero (forest-deep) → Offboard-wherever-you-work → Career Context → More
than a job search (incl. the Your Path card) → Meet Lumo → Toolkit → Pro →
Sponsored access → Built around you → Community → Final CTA. Copy source:
COPY.md § 1.

## Navigation

Header (fixed since plan 024, dropdowns since plan 037): Home ·
**Product ▾** (Career Context · Lumo · Job Search · Layoff & Benefits ·
Offboard Everywhere) · How It Works · **For Organizations ▾** (For Employers ·
Workforce & Government · Universities & Communities) · Pricing ·
**Resources ▾** (Guides · Privacy & Security) · About · Sign in · Build my
plan (neon). Company Transition Centers joins Resources when `/companies`
ships. Below 1180px the header swaps to the mobile menu, which carries the
same groups flattened under headings. Footer adds Career Context,
Workforce & Government, Universities & Communities, Privacy & Security,
and company/legal links.
`/privacy-security` is out of header nav until the Resources dropdown
ships (plan 026 phase 4); the footer's Legal column is its entry point,
and `/security` 301s to it (retargeted from `/about` in plan 034).

**Guardrails:** `/act` is intentionally excluded from header and footer nav
and must never receive a redirect (live out-of-nav B2G landing URL; the
resident application flow lives at `https://app.offboard.co/act/apply`).
`/public-partners` was **retired into `/workforce` in plan 035** (owner
decision 2026-09-01, plan 026 decision 1): the thin page is gone, the URL
301s to `/workforce`, and the public-sector section left `/employers` for a
crosslink. `/workforce` is in the footer's Partners column and enters header
nav with the For Organizations dropdown (plan 026 phase 4). It runs under
the same B2G language firewall as `/act`, and names no county.
`/intake` is a native route, never redirected.

## Target IA

The owner's site-architecture strategy (2026-08-31) grows the site to five
product pillars under a Product dropdown, a For Organizations dropdown, and
a Resources dropdown with Company Transition Centers and a Privacy &
Security trust page. Phases, ordering, and the open owner decisions live in
[plans/026-site-ia-roadmap.md](../plans/026-site-ia-roadmap.md). The
dropdown nav ships only when its pages exist.

## Redirects

The redirect map lives in `next.config.ts` (route-level essay redirects in
`src/app/resources/[slug]/page.tsx`) and is SEO-load-bearing: any route
rename updates it in the same PR. `/community` → `/#community` depends on
the homepage community section keeping `id="community"`.

## Release checks

`npm test` · `npm run lint` · `npm run lint:css` · `npm run build` ·
`npm run e2e` · `npm run test:visual` (33+ darwin baselines; deliberate
recapture only) · no unexpected network or console output · every route
fits a 390px viewport (e2e-enforced) · preview link + owner sign-off for
any visible change (AGENTS.md).
