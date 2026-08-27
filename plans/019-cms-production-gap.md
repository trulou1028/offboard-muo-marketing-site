# Plan 019: Make the CMS real in production, and loud when it is not

> **Executor instructions**: Read this fully before starting. Part 2 is
> owner-run and blocks Part 3's proof, but Parts 1 and 4 do not depend on it -
> do them first so the plan delivers value even if the owner gate is slow.
> Update the Plan 019 row in `plans/README.md` when the review state changes.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW in code, MED operationally (Part 2 touches production data)
- **Depends on**: plans/016-supabase-cms-foundation.md (merged, not deployed)
- **Category**: correctness / observability / release
- **Planned at**: commit `8f4ecbc`, 2026-08-26
- **Branch**: `claude/019-cms-production-gap`

## The finding

Plan 016 shipped a Supabase CMS: schema, RLS policies, `anon` grants, an
ISR read path, a committed fallback, and a `cms-contract` CI job. It was
reviewed, approved, merged, and marked DONE on 2026-08-25.

**It has never served a request.** An anonymous read of the production
Supabase project on 2026-08-26 returns:

```
posts:      404  PGRST205  Could not find the table 'public.posts' in the schema cache
categories: 404  PGRST205  Could not find the table 'public.categories' in the schema cache
```

`supabase/migrations/20260825120000_create_cms_posts.sql` was never pushed.
The earlier `20260822180000_create_intake_submissions.sql` *was* - that table
exists - so this is one un-pushed migration, not an unconfigured project.

The site is fine. Every guide article renders, from the committed fallback in
`src/lib/content/posts.ts`. That is exactly the failure AGENTS.md warns about:
"with a fallback in place the site looks perfectly healthy while never
touching the database."

**Why nothing caught it.** The `cms-contract` CI job is good - it fails when
the build uses the fallback. But it runs against an *ephemeral* Supabase the
job starts itself. It proves the code can read a database. Nothing proves the
deployed site does. And `posts.ts` treats "no credentials configured" and
"the database rejected us" identically: both log `posts: fallback` and carry
on. A correctly configured but broken database is indistinguishable from an
intentionally unconfigured one.

## Objective

Get the CMS actually serving production content, and make any future silent
fallback impossible to miss.

## Guardrails

- **Never run `supabase db push` as an executor.** Production migrations are
  owner-run (`docs/cms-architecture.md` section 5). Part 2 is a handoff.
- Do not read `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_DB_PASSWORD`, or
  `RESEND_API_KEY`. The two `NEXT_PUBLIC_*` values are public by design and
  are the only credentials this plan needs.
- Do not weaken RLS or add an `anon` policy to `intake_submissions`. That
  table is deliberately policy-free (deny-all) and holds real people's data.
- The committed fallback stays. It is what keeps CI hermetic and the build
  green without secrets. This plan changes when it is *silent*, not whether
  it exists.

## Part 1: make a production fallback loud

`supabaseSelect` already distinguishes `not-configured` from `fetch-failed`.
`posts.ts` throws that distinction away. Carry it through:

1. When credentials are **absent** (CI, a fresh clone), fall back silently as
   today. This path must stay quiet or every local build turns noisy.
2. When credentials are **present but the read fails**, that is a defect, not
   a mode. Log it at error level with the PostgREST `code`, and fail the
   production build rather than shipping fallback content under a
   configuration that claims a database.
3. Keep the existing `posts: db` / `posts: fallback` marker - `cms-contract`
   greps it.

Add unit coverage for all three states, and prove it non-vacuous by inverting
one case.

## Part 2: push the migration (OWNER-RUN - STOP)

Hand the owner the exact command and stop:

```bash
supabase db push
```

Then seed the 11 articles and their categories from the plan 015 block files.
The executor prepares and verifies the seed **against a local database**, then
hands it over. It does not run against production.

### STOP condition

The executor stops here until the owner confirms the push ran. Do not proceed
to Part 3's proof without it - a green Part 3 against an un-pushed database is
exactly the false confidence this plan exists to remove.

## Part 3: prove production reads the database

Once Part 2 lands, the same anonymous check that found this must pass:

1. `posts` and `categories` return 200 with the expected row counts to a
   caller holding only the publishable key.
2. `status = 'draft'` rows are not returned to `anon`.
3. A deployed page's content matches a row edited in the database, not the
   committed file. **Edit a row and watch the page change** - anything less
   does not distinguish the two sources.

Record the row counts. "It returned 200" is not the same as "it returned the
content".

## Part 4: close the two stale docs items

1. `docs/cutover-checklist.md` still says to flip `robots` metadata "on every
   route". Plan 017 moved `noindex` to a single export in `src/app/layout.tsx`.
   Correct the step to name the one place. (Plan 017 flagged this itself and
   did not do it.)
2. That checklist is the launch gate. While reading it, confirm every other
   step still describes the current mechanism rather than the one it replaced.

## Verification

1. `npm test`
2. `npm run lint`, `npm run lint:css`, `npm run typecheck`
3. `npm run build`
4. `npm run e2e`
5. The `cms-contract` CI job, green, on the PR.
6. For Part 3 only: the anonymous production read above, with row counts
   pasted into the report.

## Definition of done

- A production build that is configured for Supabase but cannot reach it
  **fails** instead of quietly serving committed content.
- An unconfigured build (CI, fresh clone) still falls back silently.
- Production Supabase holds the CMS tables, and a deployed page demonstrably
  reflects a database edit.
- The cutover checklist describes the `noindex` mechanism that actually ships.
- No service-role key, database password, or API key was read at any point.
