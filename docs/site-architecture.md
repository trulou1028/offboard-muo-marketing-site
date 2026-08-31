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
| `/public-partners` | Public sector | Thin crosslink page (out of nav) | Discuss a partnership |
| `/act` | ACT pilot residents | Pilot landing (out of nav, B2G firewall) | Apply for pilot access |
| `/intake` (+ `/confirmed`) | Members | Native intake form (never redirect) | Submit |

All routes remain `noindex` until the public launch decision.

## Homepage section order (v2, plan 022)

Hero (forest-deep) → Offboard-wherever-you-work → Career Context → More
than a job search (incl. the Your Path card) → Meet Lumo → Toolkit → Pro →
Sponsored access → Built around you → Community → Final CTA. Copy source:
COPY.md § 1.

## Navigation

Header (fixed, plan 024): Home · How it works · Pricing · Guides · About ·
For employers · Sign in · Build my plan (neon). Footer adds Career Context,
For public partners, and company/legal links.

**Guardrails:** `/act` is intentionally excluded from header and footer nav
and must never receive a redirect (live out-of-nav B2G landing URL; the
resident application flow lives at `https://app.offboard.co/act/apply`).
`/public-partners` is out of nav by owner decision. `/intake` is a native
route, never redirected.

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
