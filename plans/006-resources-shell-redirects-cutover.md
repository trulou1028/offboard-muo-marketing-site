# Plan 006: Add the /resources shell, the 301 map, and cutover readiness

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 9689184..HEAD -- src/app/ next.config.ts src/components/marketing/homepage/MarketingSite.tsx`
> Expected drift: plans 001–005. Any other change to `next.config.ts` or the
> nav/footer is a STOP.

## Status

- **Priority**: P2
- **Effort**: L
- **Risk**: HIGH (SEO: this plan is the difference between preserving and
  destroying ~80 indexed URLs at domain cutover)
- **Depends on**: plans/005-employers-consolidation-about-rewrite.md
- **Category**: migration
- **Planned at**: commit `9689184`, 2026-08-21

## Why this matters

This repo will take over the `offboard.co` domain from the current
production site, which serves roughly **80 indexed URLs**: ~16 legacy
marketing pages, ~19 resource articles, and ~45 external-tool directory
pages. If the cutover ships only this repo's six routes with no redirects,
that entire SEO surface 404s. This plan adds a `/resources` index shell,
wires the agreed 301 map into `next.config.ts`, adds `Guides` to the nav,
and establishes the launch checklist. **Article content migration is a
separate effort** — this plan ships the shell and the redirects, and keeps
`noindex` on until the operator flips the launch switch.

## Current state

- `next.config.ts` — minimal config, no `redirects()` today.
- `src/app/` — routes: `/`, `/how-it-works`, `/pricing`, `/about`,
  `/employers`, `/public-partners`, plus `layout.tsx` and `not-found.tsx`.
  No `/resources`.
- `src/app/layout.tsx` — site-wide metadata. The site currently ships
  `noindex` (decision on record: stays until launch).
- Nav after plan 005 (`MarketingSite.tsx`, `NAV_LINKS`): How it works ·
  Pricing · About · For employers. Footer columns: Product / Partners /
  Company / Legal.
- Route wrapper convention — every route follows this shape (copy it for
  `/resources`), e.g. `src/app/about/page.tsx`:
  ```tsx
  import type { Metadata } from "next";
  import { MarketingAbout } from "@/components/marketing/homepage/MarketingRoutePages";
  export const metadata: Metadata = { title: "...", description: "..." };
  export default function AboutPage() { return <MarketingAbout />; }
  ```
- The legacy URLs live on the CURRENT production site (offboard.co). The
  redirect map below is the agreed spec. Slugs marked `[VERIFY]` must be
  checked against the live site's sitemap.xml before shipping (Step 1).

## The 301 map (agreed spec)

| Old path | New destination | Notes |
|---|---|---|
| `/product` | `/how-it-works` | |
| `/why-offboard` | `/how-it-works` | |
| `/job-packet` | `/how-it-works#toolkit` | anchor exists after plan 003 (add `id="toolkit"` if missing) |
| `/faq` | `/how-it-works#faq` | add `id="faq"` to FaqSection wrapper if missing |
| `/community` | `/#community` | homepage community strip (plan 002; add `id="community"`) |
| `/founder-story` | `/about` | |
| `/for-organizations` | `/employers` | |
| `/for-recruiters` | `/employers` | |
| `/gift` | `/pricing` | `[VERIFY]` gift program still exists; if yes → `/pricing#gift` once a gift section ships |
| `/intake` | `https://app.offboard.co/auth?tab=signup` | external redirect — CHECK with operator first; `/intake` may still be the live human-support scheduler (`HUMAN_SUPPORT_URL` in `MarketingSite.tsx` points at it) |
| `/resources/:slug*` | `/resources/:slug*` | same-path: routes must exist or fall through to `/resources` index |
| `/tools/:slug*` | `/resources` | until the tool directory is ported `[VERIFY count ~45]` |
| `/act` | kept live, NO redirect | B2G landing URL — out of scope here, but it must not 404: add a stub route or keep the redirect list free of it and note it in the launch checklist |
| `/security` | `/about` | `[VERIFY]` |

## Commands you will need

| Purpose   | Command          | Expected on success |
|-----------|------------------|---------------------|
| Tests     | `npm test`       | all pass            |
| Lint      | `npm run lint`   | exit 0              |
| Build     | `npm run build`  | exit 0, `/resources` in route list |
| E2E       | `npm run e2e`    | all pass            |
| Redirect smoke (after `npm run build && npm start` locally) | `curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3000/product` | `308` or `301` → `/how-it-works` |

## Scope

**In scope**:
- `next.config.ts` (add `redirects()`)
- `src/app/resources/page.tsx` (new route wrapper)
- `src/components/marketing/homepage/MarketingRoutePages.tsx` (new
  `MarketingResources` component)
- `src/components/marketing/homepage/MarketingSite.tsx` (`NAV_LINKS`: add
  Guides; footer: add Guides link under Product; anchor ids from the 301 map)
- `src/components/marketing/homepage/MarketingHomepage.css` (additive)
- `src/components/marketing/homepage/MarketingHome.test.tsx`, `e2e/homepage.spec.ts`
- `plans/README.md` (status row + launch checklist appendix)

**Out of scope** (do NOT touch):
- Porting article or tool-directory CONTENT (separate effort; the shell
  links out to the live site's articles until then)
- Removing `noindex` — operator-only launch switch
- Any DNS/Vercel domain configuration — the cutover itself is operator-run
- Supabase/CMS integration (future phase; the shell must not add a Supabase
  dependency)

## Git workflow

- Branch from `main` (after 005 merges): `claude/006-resources-and-redirects`
- Commit per step; short imperative summaries.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

1. **Verify the legacy URL inventory**: fetch `https://offboard.co/sitemap.xml`
   (read-only) and diff its paths against the 301 map. Add any missed
   marketing page to the map (articles/tools are covered by the `:slug*`
   rules). Record the final list in the PR description.
   **Verify**: every non-resource, non-tool sitemap path appears in the map
   or is deliberately kept (`/act`, legal pages).
2. **Create `/resources`**: `MarketingResources` component — PageHero
   (kicker `The library`; title `Guides & resources`; body
   `Reported essays, practical guides, and the slow work of making layoffs less brutal.`)
   plus a simple list section of the current top guides, each linking to its
   live `offboard.co/resources/...` URL (temporary until content migrates),
   and a `FinalCta`. Route wrapper per the convention excerpt above.
   **Verify**: `npm run build` lists `/resources`.
3. **Add nav + footer links**: `NAV_LINKS` gains
   `{ route: "resources", href: "/resources", label: "Guides" }` after
   Pricing; extend the `MarketingRoute` union with `"resources"`; footer
   Product column gains `Guides`.
   **Verify**: `npm test` (after Step 5 test updates) shows 5 nav links.
4. **Wire `redirects()`** in `next.config.ts` per the map (use `permanent: true`).
   Add the anchor ids the map needs (`#toolkit`, `#faq` on /how-it-works;
   `#community` on the homepage section from plan 002).
   **Verify**: build; then the curl smoke test for `/product`,
   `/why-offboard`, `/for-recruiters`, `/community` — each returns a
   permanent-redirect status with the mapped destination.
5. **Update tests/e2e**: nav has 5 links incl. Guides; `/resources` renders
   its H1; e2e adds one redirect assertion (`page.goto('/product')` lands on
   `/how-it-works`).
   **Verify**: `npm test` → all pass · `npm run e2e` → all pass.
6. **Write the launch checklist** as an appendix in `plans/README.md`:
   operator-run items — confirm `/intake` handling · verify `/act` decision ·
   remove `noindex` · point domain at the Vercel project · archive the old
   production deployment · post-cutover: crawl the 301 map live, submit the
   new sitemap in Search Console, watch organic traffic for the -20%
   kill-threshold for 30 days.
   **Verify**: checklist present in `plans/README.md`.

## Test plan

- Unit: `/resources` renders H1 `Guides & resources`; nav includes `Guides`;
  metadata for the new route follows the existing per-route pattern (model on
  the about-page metadata test).
- E2E: one redirect smoke assertion; `/resources` loads without console
  errors or backend requests.

## Done criteria

- [ ] `npm test`, `npm run lint`, `npm run build`, `npm run e2e` all exit 0
- [ ] `/resources` route exists and renders
- [ ] `next.config.ts` `redirects()` covers every mapped path; curl smoke
      test passes for at least 4 sampled redirects
- [ ] Nav shows: How it works · Pricing · Guides · About · For employers
- [ ] Launch checklist appended to `plans/README.md`
- [ ] `noindex` still present (NOT removed)
- [ ] No file outside the in-scope list modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

- `https://offboard.co/sitemap.xml` is unreachable or its inventory differs
  wildly (>20 unmapped marketing paths) from the map — the map needs
  re-scoping, report back.
- `/intake` ambiguity: `HUMAN_SUPPORT_URL` in this repo points at
  `https://offboard.co/intake`. If `/intake` redirects to signup per the map,
  the human-support CTA breaks. Resolve with the operator BEFORE wiring that
  redirect; if unresolved, omit the `/intake` rule and note it.
- The operator asks to remove `noindex` in this plan — decline; it is a
  separate launch decision.
- Anchor targets (`#toolkit`, `#faq`, `#community`) don't exist because
  plans 002/003 shipped differently — align with what shipped, and update
  the map accordingly rather than creating orphan anchors.

## Maintenance notes

- When article content migrates into this repo (likely the Supabase/CMS
  phase), replace the outbound article links on `/resources` with local
  routes and delete the `/resources/:slug*` passthrough note; the `/tools`
  redirect can then be revisited (45 pages of long-tail SEO — decide port vs.
  retire deliberately, not by default).
- The 301 map is load-bearing for SEO: any future route rename must add a
  redirect here in the same PR.
- Reviewer: confirm `permanent: true` on every rule and that no redirect
  chain exceeds one hop.
