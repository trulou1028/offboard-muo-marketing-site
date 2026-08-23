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
- [ ] Remove `noindex`: flip the `robots` metadata off `noindex, nofollow,
      noarchive` on every route once the cutover is confirmed. This is a
      separate, deliberate operator decision, not part of any plan-006
      commit.
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
- Article and tool-directory content migration is a separate, later
  effort; `/resources` currently links out to the live
  `offboard.co/resources/...` articles as a temporary measure.
