# Plan 019: Make the CMS real in production, and loud when it is not

> **Execute with:** Fable 5.1 · high effort — the CMS production gap: a green check that could be a silent fallback had to be made to fail. *(Executed. Model line added retroactively 2026-09-01 under plans/README.md § "The model line".)*

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
- **Current state**: COMPLETE. All four parts verified against the live database, and the last open gap (draft visibility) closed 2026-08-26.

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

### Part 1 implementation record

`supabaseSelect`'s `reason` now reaches `posts.ts` instead of being discarded
at each fetcher. `reportFallback()` acts on it:

- `not-configured` returns immediately. CI and fresh clones stay silent.
- `fetch-failed` logs one error naming the two likely causes (missing tables,
  or a missing anon grant/RLS), once per process rather than once per
  prerendered route.
- During `next build` it additionally throws. At request time it does not -
  serving slightly stale committed content beats returning a 500 to a reader.

The build-phase signal is `process.env.NEXT_PHASE === "phase-production-build"`.
That was checked against the installed Next 16, not assumed:
`node_modules/next/dist/build/index.js` assigns `PHASE_PRODUCTION_BUILD` to
`NEXT_PHASE`, and Next compares against the same literal internally.

**Proven against the real defect.** A build pointed at the production Supabase
project (publishable key only) now fails:

```
posts: database is CONFIGURED BUT UNREACHABLE - serving committed fallback. ...
Error: Refusing to prerender /resources from the committed fallback while
Supabase credentials are configured. ...
Failed to collect page data for /resources/[slug]
```

A build with no credentials still succeeds quietly (`posts: fallback`, 25
static pages), which is the CI condition.

`src/lib/content/posts.test.ts` covers all three states in 6 cases. Proven
non-vacuous twice: collapsing `fetch-failed` back into silence fails 3 cases,
and making the loud path fire on `not-configured` fails the other 2.

`server-only` is stubbed in that test file because Vitest runs in jsdom. This
does not weaken the key-separation guard - `service-role-guard.test.ts`
enforces it by scanning source text, independently of imports.

### Sequencing warning - read before merging

Part 1 turns today's silent production state into a **failed build**. If the
production environment has `NEXT_PUBLIC_SUPABASE_URL` set (it appears to,
since `intake_submissions` works), then merging Part 1 before Part 2 will
fail the next production deploy. That is the intended behaviour, not a bug -
but it means **Part 1 must not merge until the migration is pushed.**

## Part 2: push the migration (OWNER-RUN - STOP)

Hand the owner the exact command and stop:

```bash
supabase db push
```

That creates `public.categories` and `public.posts` with their RLS policies
and `anon` grants. It does **not** load content: `supabase/config.toml` wires
`seed.sql` to local `db reset` only.

So a second step loads the content. `supabase/seed.sql` is already in the repo
from plan 016, already in sync with the registry (re-running
`node scripts/generate-seed.mjs` produces no diff), and contains 4 categories
and 18 posts - 11 published, 7 retired, 0 draft. Apply it once against
production, through Supabase Studio's SQL editor or `psql`.

**It is not idempotent.** The inserts carry no `on conflict` clause, so a
second run errors on the primary key rather than duplicating rows. Run it once
against the fresh tables. Erroring is the safe failure here, but it is worth
knowing before pasting it twice.

**Seed verification is blocked and explicitly unverified.** Docker is not
available on this machine, so `npx supabase start` / `db reset` could not run
and the seed was never executed against any database. What was verified: it
is generated from the registry rather than hand-written, and it is in sync
with that registry today. Whether it applies cleanly is unproven.

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

### Part 3 record

**The owner ran `supabase db push` and applied the seed on 2026-08-26.** The
anonymous read that originally found the gap now returns:

| Table | Result |
| --- | --- |
| `categories` | 4 rows: Guides, AI & Technology, Essays, Policy & Accountability |
| `posts` | 18 rows: 11 `published`, 7 `retired`, 0 `draft` |
| `posts?status=eq.draft` | 0 rows visible to `anon` |

A production build against the live database logs `posts: db` and generates 25
static pages. The identical command failed an hour earlier. The read path is
proven end to end.

**The draft check is currently vacuous** and the record should say so: there
are no `draft` rows in the corpus, so "anon cannot see drafts" is untested in
production. The migration's policy is the only evidence today. Creating one
temporary draft row in Studio would close it.

#### The regression this part existed to catch

The plan insisted on watching a page change rather than trusting a green
check, and that is what surfaced this. Rendering `/resources` from the
database and from the committed files produces **the same 11 articles in a
different order**:

```
database build      best-job-application-trackers-2026, health-insurance-…, …
committed build     first-week-after-a-layoff, negotiating-your-severance, …
```

The read path ordered `title.asc`; `registry.ts` carries a curated order. The
Guides section's lead article - "What to do in your first week after a
layoff", the one written for someone laid off yesterday - fell from **first to
seventh**. Both pages look completely valid, which is exactly why no test
caught it and why "it returned 200" was never going to be enough.

#### Fix

`posts` gains the explicit `sort_order` column `categories` already had
(`supabase/migrations/20260826220000_add_posts_sort_order.sql`), the read path
orders `sort_order.asc,title.asc`, and `scripts/generate-seed.mjs` writes the
registry index into every row. Curation now survives the move into the
database, and a post authored in Studio has a place to say where it belongs.

The migration **backfills the 18 existing rows itself**, so it needs a push
but no re-seed. Its `case` mapping was checked against the regenerated seed
programmatically: same 18 slugs, identical values, contiguous 0..17.

#### Still to prove - needs one more push

```bash
supabase db push
```

Until that runs, production has no `sort_order` column, so the read 400s.
Usefully, that is the guard working: the build fails with "CONFIGURED BUT
UNREACHABLE" rather than quietly serving fallback content. Third independent
demonstration that Part 1 does its job.

#### Acceptance test - PASSED

The owner pushed the second migration on 2026-08-26. `sort_order` is live and
`first-week-after-a-layoff` sits at index 0 again.

Built the site twice - once against the live database (`posts: db`), once with
no credentials (`posts: fallback`) - and compared the output:

| Page | Result |
| --- | --- |
| `/resources` article order | **identical**, 11 links in the same sequence |
| `/resources` visible text | **identical** |
| `/resources/first-week-after-a-layoff` | **identical** |
| `/resources/health-insurance-after-a-layoff` | **identical** |

Comparison note: a raw file diff is useless here. Two builds of the same source
produce different asset hashes and chunk filenames, so a whole-file diff is
100% noise. The comparison strips scripts and tags and compares visible text
plus link order, which is what a reader actually gets.

Identical output from both sources is the goal, not a weak result: it means the
database is a faithful replacement, not a plausible-looking substitute.

### The last gap - CLOSED 2026-08-26

"Anon cannot see drafts" was asserted by code review only, because the corpus
had no `draft` rows and the query returned zero either way. The owner inserted
one throwaway draft (`zz-draft-visibility-test`) in Studio, and it is now
tested:

| Check, with the publishable key only | Result |
| --- | --- |
| List every post | 18 visible: 11 published, 7 retired. Draft absent |
| Request the draft by its exact slug | 0 rows |
| Request `status=eq.draft` | 0 rows |
| Build the site against the live database | 11 article routes, 11 hub links, **no route for the draft slug** |

**Why this was not a false pass.** Every one of those results is also what an
insert that silently never landed would produce, and the publishable key
cannot tell the two apart - the same shape of trap that let the CMS sit unused
for a day. So the row's existence was confirmed independently: the owner ran
`select slug, status from public.posts where slug = 'zz-draft-visibility-test'`
and it returned one row, `draft`. The row existed, and the public key still
could not reach it. That is the whole test.

The row was then deleted. A follow-up anonymous read confirms the corpus is
back to 18 rows with no `zz-` slug remaining.

Two things this deliberately does **not** cover: Studio's own UI, and the
owner's authenticated access. Both are supposed to show drafts.

## Part 4: close the two stale docs items

1. `docs/cutover-checklist.md` still says to flip `robots` metadata "on every
   route". Plan 017 moved `noindex` to a single export in `src/app/layout.tsx`.
   Correct the step to name the one place. (Plan 017 flagged this itself and
   did not do it.)
2. That checklist is the launch gate. While reading it, confirm every other
   step still describes the current mechanism rather than the one it replaced.

### Part 4 implementation record

The `noindex` step now names the single `src/app/layout.tsx` export, and adds
two things the operator would otherwise hit blind: `e2e/homepage.spec.ts`
asserts the robots string verbatim in two places and will fail until it is
updated in the same change, and `src/app/sitemap.ts` is inert while `noindex`
is set, so submitting a sitemap only becomes meaningful after this step.

Every other factual claim in the checklist was re-checked and holds:
`next.config.ts` does define `redirects()`; the registry really does carry 11
`ported: true` and 7 `ported: false` slugs.

## Verification

1. `npm test`
2. `npm run lint`, `npm run lint:css`, `npm run typecheck`
3. `npm run build`
4. `npm run e2e`
5. The `cms-contract` CI job, green, on the PR.
6. For Part 3 only: the anonymous production read above, with row counts
   pasted into the report.

### Verification run for Parts 1 and 4

`npm test` 117 passed (111 before, plus 6 new), `npm run lint`,
`npm run lint:css`, `npm run typecheck`, `npm run e2e` 65 passed. Builds
checked in both configurations, as recorded in the Part 1 record above.

Not run: `npx supabase start` / `db reset` (no Docker). The `cms-contract` CI
job is the authoritative check for the database path and runs on the PR.

## Definition of done

- A production build that is configured for Supabase but cannot reach it
  **fails** instead of quietly serving committed content.
- An unconfigured build (CI, fresh clone) still falls back silently.
- Production Supabase holds the CMS tables, and a deployed page demonstrably
  reflects a database edit.
- The cutover checklist describes the `noindex` mechanism that actually ships.
- No service-role key, database password, or API key was read at any point.
