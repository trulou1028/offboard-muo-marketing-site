# Plan 043 — Minimal launch: cut over `offboard.co` to this repo this week

> **Execute with:** Fable 5.1 · high — redirects, `noindex`, nav and sitemap are SEO-load-bearing; a wrong call here loses the legacy site's traffic or ships an unreviewed page as live.

**Owner ask (2026-09-07):** go live this week with the homepage, `/pricing`,
and probably `/employers`, and keep working on the sub-product and supporting
pages after launch. This plan answers "is that enough, and what else is
non-negotiable", then lays out the smallest cutover that does not lose
what the legacy site already has.

## The answer

Three pages is not enough, but the gap is small and none of it is new
building. **Every route in this repo already exists and has passed owner
review**; the work is deciding what stays reachable, not writing pages.

Two sets:

**Launch set** (in nav, in the sitemap, indexable):

| Route | Why it is non-negotiable |
| --- | --- |
| `/` | The story. Built (hero refined 2026-09-07, PR #72). |
| `/pricing` | Owner's pick. Legacy `/gift` 301s here. |
| `/employers` | Owner's pick. Legacy `/for-organizations` and `/for-recruiters` 301 here. |
| `/how-it-works` | The homepage's secondary CTA ("See how it works") lands here, and four legacy URLs (`/product`, `/why-offboard`, `/job-packet`, `/faq`) 301 here. Removing it breaks the hero and four inbound links. |
| `/about` | Legacy `/founder-story` 301s here; the footer's Company column needs one page. |
| `/privacy-security` | Legacy `/security` 301s here; it is the only in-repo legal page, and every sponsor conversation asks for it. |
| `/resources` + the 11 ported articles | These are the legacy site's organic traffic. Cutover checklist already gates on them returning 200. Dropping them is the one way this launch loses traffic. |
| `/intake` (+ `/confirmed`) | The live member-intake form; the legacy URL people already have. Never redirected. |
| `/act` | Live out-of-nav B2G landing URL. Never redirected, never in nav. |

**Deferred set** (URLs stay live so nothing 404s, but out of nav, out of
the sitemap, and `noindex` per route until the owner says go):

`/career-context` · `/lumo` · `/integrations` · `/job-search` ·
`/layoff-support` · `/workforce` · `/communities` · `/companies` +
`/companies/:slug`

Why keep them routable rather than redirect them: the homepage links to
five of them (`/career-context`, `/integrations`, `/job-search`,
`/layoff-support`, and `/employers`), `/employers` links to `/workforce`, and
the footer lists all of them. Redirecting means editing every one of those
links now and again at un-deferral. `noindex` plus a nav trim costs one
metadata line per route and one nav edit, and is fully reversible. Legacy
`/public-partners` 301s to `/workforce`; that redirect stays, the page
just is not advertised.

**The cheaper alternative, for the record:** launch every route as-is.
Every page passed review; nothing here is broken. The only cost of the
trimmed launch is the nav work in step 2. If the owner's concern is
"these pages are not good enough yet" rather than "these pages are
wrong", launching everything and iterating live is one flag flip instead
of this plan's steps 2 and 3. The owner chose to hold them back; this
plan honors that.

## What blocks going live (in order)

1. **Merge the hero** ([PR #72](https://github.com/trulou1028/offboard-muo-marketing-site/pull/72)). Owner review pending.
2. **Trim the nav to the launch set.** `MarketingNav.tsx` (desktop mega
   menu and mobile menu) and the footer in `MarketingSite.tsx`. Product tab
   keeps How It Works only, so it becomes a plain link; For Organizations
   keeps For Employers only, so it becomes a plain link too; Resources keeps
   Guides, Privacy & Security, About, Contact, newsletter. Update
   `docs/site-architecture.md` § Navigation, `e2e/homepage.spec.ts` (the
   test that counts one link and three buttons in the header nav), and the
   homepage/mobile-menu visual baselines deliberately. Homepage links into
   the deferred set (five "Learn more" style links) become anchors or are
   removed; check `COPY.md` § 1 for each and update it in the same PR.
3. **Per-route `noindex` on the deferred set** and remove them from
   `STATIC_ROUTES` in `src/app/sitemap.ts`. Mechanism: each deferred
   `src/app/<route>/page.tsx` exports `robots: "noindex, nofollow"` in its
   `metadata`, which overrides the layout value once the layout flips.
   Add an e2e assertion that every deferred route carries it and every
   launch route does not, so the state is visible in CI rather than in
   someone's memory.
4. **Flip the site-wide `noindex`** in `src/app/layout.tsx` (one line) and
   update the two verbatim assertions in `e2e/homepage.spec.ts` lines 84 and
   218 in the same change. Per `docs/cutover-checklist.md` this is a
   deliberate operator step, not folded into another PR.
5. **Vercel project env** (owner, in the Vercel dashboard, never through
   chat): `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` for the intake
   form's emails (plan 010's handoff; the form saves without them but sends
   nothing), plus `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` so `/resources` reads the CMS
   rather than the committed fallback. Smoke test: submit `/intake` on the
   production preview and confirm the row and both emails.
6. **Domain cutover** (owner). `offboard.co` currently resolves to
   185.158.133.1 (the legacy host). Add `offboard.co` and `www.offboard.co`
   to Vercel project `offboard-muo-marketing-site`, change DNS as Vercel
   instructs, wait for the certificate. Keep the legacy deployment alive
   but unlinked for the 30-day watch window.
7. **Post-cutover crawl** (agent, same day): every source in
   `next.config.ts` `redirects()` returns 301/308 to its destination; the 11
   article slugs return 200; `/intake` and `/act` return 200; every deferred
   route returns 200 with `noindex`; submit `src/app/sitemap.ts`'s output in
   Search Console; export the legacy Supabase project's `intake_submissions`
   before decommissioning it.

Steps 1 to 4 are one working day of agent time. Steps 5 and 6 are owner
time and DNS propagation. This week is realistic if the hero merges by
Tuesday.

## STOP conditions

- Do not flip `noindex` (step 4) until steps 2 and 3 are merged and the
  owner has confirmed the launch set in writing. Flipping early indexes
  the deferred pages.
- Do not redirect `/intake`, `/act`, or any deferred route. Guardrail from
  AGENTS.md; a redirect here breaks a live URL.
- Do not touch `next.config.ts` redirects except to add; the map is the
  legacy site's SEO.
- Steps 5 and 6 are owner-only. An agent prepares the checklist and
  verifies afterwards; it never holds the keys or changes DNS.

## Un-deferral (after launch)

Each deferred page goes live with one PR: remove its `robots` override,
add it back to `STATIC_ROUTES`, restore its nav entry (the plan 037 mega
menu structure is in git history and `docs/site-architecture.md`), update
the e2e list from step 3. Suggested order, by how much the homepage
already promises them: `/how-it-works` is live; then `/career-context`,
`/layoff-support`, `/job-search`, `/lumo`, `/integrations`; then
`/workforce`, `/communities`, `/companies`.

## Verification

Steps 2 to 4: `npm test`, `npm run lint`, `npm run lint:css`,
`npm run typecheck`, `npm run build`, `npm run e2e` (nav and redirects
touched), deliberate re-capture of the homepage and mobile-menu baselines
with the diff described in the PR. Step 7 is the live crawl against
`https://offboard.co`, reported as a table of URL, status, destination.
