# Launch / cutover checklist

Operator-run items for switching `offboard.co` from the current production
site to this repo. None of these are automated by plan 006; they are listed
here for the operator to execute deliberately, in order.

- [x] Confirm `/intake` handling: this repo's `/intake` is the live,
      working member-intake form (ported by plan 010). Do not add a
      redirect for it. Verify one more time on the deployed preview before
      cutover that `/intake` returns 200, not a 3xx.
- [x] `/act` decision resolved (plan 017): `/act` is now a real route in
      this repo, rebuilt as a resident-first ACT pilot landing page. It has
      no redirect and stays out of the nav by design. Verify one more time
      on the deployed preview before cutover that `/act` returns 200, not
      a 3xx.
- [x] Remove `noindex`: completed after the production-domain cutover was
      verified on 2026-09-17. Public routes no longer inherit a robots block;
      deferred routes keep their own `noindex, nofollow` metadata, and the
      sitemap is now active.
- [x] Point the domain at the Vercel project for this repo.
- [ ] Archive the old production deployment (do not delete outright until
      the post-cutover monitoring window below has passed).
- [ ] Export historical `intake_submissions` rows from the old Supabase
      project (`xcpcdrwnakhesmvsdviq`) before decommissioning it. This
      project held the legacy `/intake` form's data; the ported form in
      this repo writes to a different Supabase project, so nothing carries
      over automatically. Confirm the export is complete and archived
      somewhere durable, then decommission `xcpcdrwnakhesmvsdviq`.

## What the move costs in search, measured against Search Console 2026-09-14

Owner exported Search Console Performance → Pages, Queries, last 6 months.
Every one of the 154 real indexed URLs on `offboard.co` and `www.offboard.co`
was then requested against this repo's deployment. This section replaces the
sitemap-only estimate that preceded it.

### Scope

The Search Console property covers five hosts. Only two are being migrated.

| Host | Clicks | Impressions | In this migration? |
| --- | --- | --- | --- |
| `offboard.co` | 264 | 77,956 | Yes |
| `www.offboard.co` | 30 | 13,443 | Yes, an older site still indexed |
| `newsletter.offboard.co` | 112 | 20,133 | No |
| `jobs.offboard.co` | 58 | 2,611 | No |
| `app.offboard.co` | 5 | 717 | No |

**In scope: 294 clicks and 91,399 impressions over six months.** Roughly 1.6
clicks a day. The other 175 clicks are on hosts this cutover does not touch.

### What happens to all 154 indexed URLs

| Outcome | URLs | Clicks | Impressions |
| --- | --- | --- | --- |
| Still renders at the same URL | 18 | **216 (73%)** | 37,153 |
| Redirects | 94 | 64 (22%) | 51,262 |
| 404 | 42 | 14 (5%) | 2,984 |

**73% of clicks land on a page that still works.** The migration is far safer
than the URL count suggested.

### The tools directory: 53% of impressions, 10% of clicks

`/tools/*` earns **60 clicks from 48,382 impressions, a 0.12% clickthrough**.
For comparison the homepage runs 0.71% and the articles 0.49%. The directory is
roughly six times less efficient than the rest of the site.

The queries explain why. Splitting every query by whether it names a
third-party product:

| Query type | Clicks | Impressions | CTR |
| --- | --- | --- | --- |
| Third-party brand names (`hiring cafe`, `wellfound`, `flowcv`, `tealhq`, …) | 31 | 34,883 | 0.09% |
| Everything else | 139 | 22,498 | 0.62% |

`hiring cafe` alone is 14,801 impressions and 9 clicks. `wellfound` is 8,222
and 6. `flowcv` is 3,912 and **zero**. These are people looking for another
company's product, finding a directory page about it, and not clicking.

**Expect the impressions graph to look like a cliff after cutover. It is not
one.** Losing the directory costs about ten clicks a month and removes half the
impressions. Say so before the 30-day watch below, or the watch will read as a
disaster.

### What is actually worth saving, ranked

- [x] **Done 2026-09-14.** **`/tools/offboard-ghost-job-checker` — 10 clicks from 32 impressions, a
      31% clickthrough.** The best-converting page on the whole site, and it is
      Offboard's own product. It currently redirects to `/resources`. Send it,
      `/tools/offboard-job-packets` to `/application-packet`, and
      `/tools/offboard-lumo` to `/lumo`. Three rules.
- [x] **Done 2026-09-14**, and verified by requesting every one of the 42.
      Four garbled slugs are left 404ing on purpose: they are Google's own
      URL guesses at the cover-letter article, one impression each, no clicks.
      **Catch the old `www` patterns that 404.** 42 URLs, 14 clicks and 2,984
      impressions, none of them covered by `next.config.ts`: `/tool-directory`,
      `/blog` and `/blog/:slug*`, `/categories/:slug*`,
      `/article-categories/:slug*`, `/articles/:slug*`, `/gpt`,
      `/job-packet-agent`, `/mission`, `/product/:slug*`, `/for-teams`,
      `/privacy`, `/terms`, `/index.html`, `/user-account`,
      `/layoff-checklist`, `/ai-job-matchmaker`, `/update-password`,
      `/wireframe/*`. About thirty minutes for all of it.
- [ ] **The four redirects into the noindexed `/how-it-works`** now have
      numbers: `/faq` 620 impressions, `/product` 590, `/why-offboard` 354,
      `/job-packet` 72. Zero clicks between them, so this is about where the
      inbound links point rather than traffic lost on the day.
- [ ] **Decide on the third-party tool pages with the numbers in hand.** Four
      earn real clicks: `/tools/welcome-to-the-jungle` (12),
      `/tools/hiring-cafe` (10), `/tools/wellfound` (8), `/tools/peerlist` (6).
      Everything else in the directory is 62 pages sharing 0 to 3 clicks each.
      Porting four pages is a day; porting 77 is not worth it.

### Two things the export settled that the estimate got wrong

1. **The seven then-unported essay and policy URLs were worth 3 clicks in six
   months.** The six founder essays have since been restored because keeping
   the founder's writing live and linkable matters independently of traffic.
   The Alameda policy article still awaits its editorial pass.
2. **The 404s matter more than the redirects.** 42 URLs nobody had mapped,
   because they are on the older `www` site and never appeared in
   `offboard.co/sitemap.xml`. The sitemap-only analysis could not see them.

### A content finding, not a migration one

59 queries about ATS optimisation (`optimize resume for ats`, `ats optimized
resume`, `how to optimize resume for applicant tracking systems`) draw **1,022
impressions and zero clicks**, because the only page that ranks for them is an
old `www.offboard.co/articles/how-do-i-optimize-my-resume-for-ats…` sitting
around position 36. There is demand here and no page worth ranking. That is an
article to write, not a redirect to add.

## What the move costs in search, superseded estimate (2026-09-14, sitemap only)

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

- [x] **Done 2026-09-15. Owner ruled out un-deferring `/how-it-works`**, so the
      four were repointed at the live page that answers the same question:
      `/product` → `/#how-it-works` (the homepage's four-step strip is that
      story now), `/why-offboard` → `/about`, `/job-packet` →
      `/application-packet`, and
      `/faq` → `/about#faq`, whose "Fair questions" is the live general FAQ and
      shares a question word for word with the hidden page's. `/product/:slug*`
      follows its parent. **`e2e/homepage.spec.ts` now walks every redirect
      source and fails if any lands on a page carrying `DEFERRED_ROBOTS`**, so
      this cannot come back by deferring a route later.
      ~~Four legacy URLs redirect onto a noindexed page.~~
- [ ] **Three of the collapsed tool pages are Offboard's own products.**
      `/tools/offboard-lumo`, `/tools/offboard-job-packets` and
      `/tools/offboard-ghost-job-checker` currently land on `/resources`.
      `/lumo` and `/application-packet` are their subjects. Three redirect rules.
- [x] **Done 2026-09-14.** Every route declares its own canonical on
      `https://offboard.co`, and `e2e/homepage.spec.ts` checks the rendered tag
      on all 20. `metadataBase` is in the root layout; the canonical is per
      route because in this version of Next a relative canonical resolves
      against `metadataBase` rather than the current path, so one `./` in the
      layout would have pointed every page at the homepage while still
      rendering a tag on each. **If the domain ever changes, `SITE_ORIGIN` in
      `src/lib/site.ts` and `BASE_URL` in `src/app/sitemap.ts` move together.**
      ~~No page declares a canonical URL.~~ Add both before the domain moves, so that a
      crawl of `offboard-muo-marketing-site.vercel.app` (which is public and
      serves the whole site) points at `offboard.co` rather than competing
      with it.

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
2. Does the remaining unported Alameda policy article earn clicks? Its URL and
   metadata are held for an editorial pass, not deleted.
3. Which top-level pages carry the most impressions? Those are the ones to
   watch daily during the 30-day window below.

### Order of operations

The site-wide `noindex` comes off **after** `offboard.co` points here, never
before. Until DNS moves, the only public address is the `.vercel.app` one, so
flipping early invites Google to index that instead, and then the same content
sits on two domains with the wrong one already known. Owner decision recorded
2026-09-17: indexing confirmed after DNS, HTTPS, canonical, `/intake`, and `/act`
were verified on the production domain.

## Post-cutover

- [ ] Crawl the 301 map live against the production domain (every source
      path in `next.config.ts` `redirects()`) and confirm each returns the
      expected 301/308 and destination.
- [ ] Confirm the 17 ported `/resources/:slug` article URLs return 200 (see
      `src/content/resources/registry.ts`), and the one unported Policy &
      Accountability slug returns 301/308 to `/resources`.
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
