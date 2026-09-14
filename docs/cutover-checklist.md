# Launch / cutover checklist

Operator-run items for switching `offboard.co` from the current production
site to this repo. None of these are automated by plan 006; they are listed
here for the operator to execute deliberately, in order.

- [ ] Confirm `/intake` handling: this repo's `/intake` is the live,
      working member-intake form (ported by plan 010). Do not add a
      redirect for it. Verify one more time on the deployed preview before
      cutover that `/intake` returns 200, not a 3xx.
- [x] `/act` decision resolved (plan 017): `/act` is now a real route in
      this repo, rebuilt as a resident-first ACT pilot landing page. It has
      no redirect and stays out of the nav by design. Verify one more time
      on the deployed preview before cutover that `/act` returns 200, not
      a 3xx.
- [ ] Remove `noindex`: the site is hidden from search engines by ONE
      `robots: "noindex, nofollow, noarchive"` export in
      `src/app/layout.tsx`, which every route inherits. Change that single
      value once the cutover is confirmed; there is nothing per-route to
      edit. This is a separate, deliberate operator decision, not part of
      any plan commit. Two things to know before flipping it:
      `e2e/homepage.spec.ts` asserts the string verbatim and will fail until
      it is updated in the same change, and `src/app/sitemap.ts` is inert
      while `noindex` is set, so the sitemap only becomes meaningful after
      this step. *(Corrected 2026-08-26: this step used to say "on every
      route", describing the per-page mechanism plan 017 replaced.)*
- [ ] Point the domain at the Vercel project for this repo.
- [ ] Archive the old production deployment (do not delete outright until
      the post-cutover monitoring window below has passed).
- [ ] Export historical `intake_submissions` rows from the old Supabase
      project (`xcpcdrwnakhesmvsdviq`) before decommissioning it. This
      project held the legacy `/intake` form's data; the ported form in
      this repo writes to a different Supabase project, so nothing carries
      over automatically. Confirm the export is complete and archived
      somewhere durable, then decommission `xcpcdrwnakhesmvsdviq`.

## What the move costs in search, measured 2026-09-14

Taken from `offboard.co/sitemap.xml` (78 URLs) checked one by one against what
this repo serves. Re-run it before cutover if the live site changes.

| Live URLs | Count | What happens | Recoverable? |
| --- | --- | --- | --- |
| `/resources/:slug` articles, ported | 11 | Same URL, renders | Kept |
| `/resources/:slug` essays, not ported | 7 | 308 to `/resources` | Yes, by porting them |
| `/tools`, `/tools/category/*`, `/tools/*` | 44 | 301 to `/resources` | Only by building the pages |
| Top-level pages | 16 | Page, or 301 to a live equivalent | Kept |

**51 of 78 live URLs (65%) collapse onto `/resources`.** A redirect to a page
that is not about the same thing reads to a search engine as a soft 404: the
URL drops out of the index and little or no ranking value transfers. Assume
that value is lost unless the destination is genuinely equivalent.

### The three fixable problems

- [ ] **Four legacy URLs redirect onto a noindexed page.** `/product`,
      `/why-offboard`, `/job-packet` and `/faq` all 301 to `/how-it-works`,
      which is in `DEFERRED_ROUTES` and serves `noindex, nofollow`. A 301 into
      a noindexed page gives the inbound value nowhere to land and the
      destination cannot rank. Fix before cutover by either un-deferring
      `/how-it-works` or repointing the four at live pages. Plan 045 kept
      `/how-it-works` routable *because* of these redirects; routable is not
      enough once the site is indexed.
- [ ] **Three of the collapsed tool pages are Offboard's own products.**
      `/tools/offboard-lumo`, `/tools/offboard-job-packets` and
      `/tools/offboard-ghost-job-checker` currently land on `/resources`.
      `/lumo` and `/job-search` are their subjects. Three redirect rules.
- [ ] **No page declares a canonical URL.** There is no `metadataBase` and no
      `alternates.canonical` in `src/app/layout.tsx`, so no page states which
      address is its real home. Add both before the domain moves, so that a
      crawl of `offboard-muo-marketing-site.vercel.app` (which is public and
      serves the whole site, held back only by the site-wide `noindex`) points
      at `offboard.co` rather than competing with it.

### The measurement this analysis is missing

Everything above ranks risk by URL **count**, not by value. Forty-four tool
pages that earn nothing cost nothing to lose.

- [ ] **Before touching DNS**, export Search Console → Performance → Pages,
      last 6 months, clicks and impressions per URL, and put the CSV somewhere
      the agent can read it. Then the decision is evidence-led: port the tool
      pages and essays that actually earn, collapse the rest.

Ranked by what the export would settle:

1. Do any of the 44 `/tools/*` pages earn clicks? If a handful do, porting
   those few is cheap and keeps the traffic.
2. Do any of the 7 unported essays earn clicks? They are held for an editorial
   pass, not deleted; porting restores the URL exactly.
3. Which top-level pages carry the most impressions? Those are the ones to
   watch daily during the 30-day window below.

### Order of operations

The site-wide `noindex` comes off **after** `offboard.co` points here, never
before. Until DNS moves, the only public address is the `.vercel.app` one, so
flipping early invites Google to index that instead, and then the same content
sits on two domains with the wrong one already known. Owner decision recorded
2026-09-14: not flipping yet.

## Post-cutover

- [ ] Crawl the 301 map live against the production domain (every source
      path in `next.config.ts` `redirects()`) and confirm each returns the
      expected 301/308 and destination.
- [ ] Confirm the 11 ported `/resources/:slug` article URLs return 200 (see
      plan 013's ported-slug list in `docs/content-roadmap.md` context and
      `src/content/resources/registry.ts`), and the 7 unported Essays /
      Policy & Accountability slugs return 301/308 to `/resources`.
- [ ] Crawl `/intake` and `/act` live against the production domain and
      confirm each returns 200, not a 3xx.
- [ ] Submit the new sitemap in Search Console.
- [ ] Watch organic traffic daily for 30 days. Kill-threshold: a -20% drop
      in organic traffic relative to the pre-cutover baseline triggers an
      immediate investigation (redirect gaps, missing pages, or a rollback
      decision).

## Reference

- The agreed 301 map and its rationale live in
  `plans/006-resources-shell-redirects-cutover.md`.
- Article migration (plan 006's deferral note) is **superseded** by plan
  013: 11 of the 18 legacy articles (all Guides + AI & Technology) are now
  ported in-repo at `/resources/:slug`; the remaining 7 (Essays + Policy &
  Accountability) 301 to `/resources` pending an owner editorial pass. The
  tool-directory (`/tools/:slug*`) migration is still a separate, later
  effort per plan 006.

  **Verified against the running site 2026-09-14:** those 11 return 200 at the
  same URL and those 7 return 308 to `/resources`. The split is real, not just
  intended.
