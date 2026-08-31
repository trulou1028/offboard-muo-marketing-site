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
