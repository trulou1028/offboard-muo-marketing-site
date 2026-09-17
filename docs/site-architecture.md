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
| `/companies` + `/companies/:slug` | Jobseekers arriving from a "<company> layoffs" search; HR at that company | One page per company from the public record: sourced facts, this week, what your state owes you; the same page is the sponsorship email's attachment | Build my free transition plan |
| `/act` | ACT pilot residents | Pilot landing (out of nav, B2G firewall) | Apply for pilot access |
| `/intake` (+ `/confirmed`) | Members | Native intake form (never redirect) | Submit |

## The launch split (plan 043, revised by plan 045; owner 2026-09-07)

The site goes live with the routes below; the deferred ones stay live at their
URLs but leave the nav, leave the sitemap, and carry their own `noindex`. The
list is `src/lib/launch.ts` and it is the single source of truth — the sitemap
filters against it, every deferred `page.tsx` imports its `robots` value from
it, and `MarketingHome.test.tsx` and `e2e/homepage.spec.ts` both assert the
nav, footer, homepage body and served pages agree with it.

| | Routes |
| --- | --- |
| **Launch set** | `/` · `/pricing` · `/employers` · `/about` · `/privacy-security` · `/resources` (+ the 11 articles) · `/intake` (+ `/confirmed`) · `/act` · `/career-context` · `/lumo` · `/integrations` · `/application-packet` · `/layoff-support` |
| **Deferred** | `/how-it-works` · `/workforce` · `/communities` · `/companies` (+ `/companies/:slug`) |

Plan 043 first deferred the five product pages and kept How It Works. The
owner reversed that the same day (plan 045): the product pages are the
substance, and How It Works was "not valuable enough to be a more in-depth
version of the homepage". It stays live because `/product`, `/why-offboard`,
`/job-packet` and `/faq` 301 to it.

Deferred, not redirected: `/employers` linked to `/workforce`, and
`next.config.ts` points `/public-partners` at `/workforce`. Redirecting would
mean editing every one of those now and again at un-deferral. `noindex` plus
a nav trim is one line per route and fully reversible.

Un-deferring a page: remove its entry from `src/lib/launch.ts`, delete the
`robots: DEFERRED_ROBOTS` line from its `page.tsx`, and restore its nav entry
(For Organizations' panel is struck through in `COPY.md` § Navigation). The
tests then tell you what else to put back.

All routes remain `noindex` until the public launch decision.

## Homepage section order (v2, plan 022)

Hero (forest-deep) → Offboard-wherever-you-work → Career Context → More
than a job search (incl. the Your Path card) → Meet Lumo → Toolkit → Pro →
Sponsored access → Built around you → Community → Final CTA. Copy source:
COPY.md § 1.

## Navigation

Header (fixed since plan 024; mega menus in plan 037; trimmed by plan 043 and
revised by plan 045): **Product ▾** (The system: Lumo · Integrations;
The work: Application Packet · Layoff & Benefits; featured: Career Context) · **For
Employers** · **Pricing** · **Resources ▾** (Resources: Guides · Privacy &
Security; Company: About · Visit Us · Slack Community · Contact; featured:
the newsletter) · Sign in · Get started free (neon). No Home link: the
wordmark is home (owner call 2026-09-01). Below 1180px the header swaps to
the mobile menu, which carries the same entries flattened, including each
panel's featured card. Footer: Product (Career Context, Lumo, Application Packet,
Integrations, Layoff & Benefits, Pricing, Guides) · Partners (For
Employers) · Company (About, Visit Us, Contact) · Legal (Privacy & Security,
Privacy Policy, Terms).

The homepage hero's "See how it works" scrolls to the four-step strip
(`#how-it-works`) rather than leaving the page.

**Guardrails:** `/act` is intentionally excluded from header and footer nav
and must never receive a redirect (live out-of-nav B2G landing URL; the
resident application flow lives at `https://app.offboard.co/act/apply`).
`/public-partners` was **retired into `/workforce` in plan 035** (owner
decision 2026-09-01, plan 026 decision 1): the thin page is gone and the URL
301s to `/workforce`, which is deferred but still serves that redirect with a
200. `/workforce` runs under the same B2G language firewall as `/act`, and
names no county. `/intake` is a native route, never redirected.

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

`npm test` · `npm run lint` · `npm run lint:css` · `npm run typecheck` ·
`npm run build` · `npm run e2e` · `npm run test:visual` (33+ darwin baselines; deliberate
recapture only) · no unexpected network or console output · every route
fits a 390px viewport (e2e-enforced) · preview link + owner sign-off for
any visible change (AGENTS.md).
