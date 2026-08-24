# Plan 016: Supabase CMS foundation — schema from the registry, one publish status, ISR rendering contract, safe read client, CI database story

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> This is part build, part **decision-record**: several steps produce a
> committed doc (`docs/cms-architecture.md`) rather than code. Where a
> decision needs the owner (marked OWNER GATE), stop and ask before
> implementing past it.
>
> **Drift check (run first)**: `git diff --stat 1cd395b..HEAD -- src/content/resources src/app/resources src/lib supabase/ next.config.ts .github/workflows/ci.yml .env.example`
> Plan 015 is EXPECTED to have restructured `src/content/resources` — its
> DONE status in `plans/README.md` is a precondition. For other files,
> compare excerpts; on a mismatch, treat as STOP.

## Status

- **Priority**: P1 (first Supabase-backed page ships through this)
- **Effort**: L
- **Risk**: MED — static→dynamic rendering transition; mitigated by ISR-first
  contract and CI gates added here.
- **Depends on**: plans/015-portable-content-format.md
- **Category**: migration / security
- **Planned at**: commit `1cd395b`, 2026-08-24

## Why this matters

The CMS phase (blog + company pages + funnel pages from Supabase) currently
has no foundation: publication state lives in three hand-synced places, the
only Supabase client in the repo is the RLS-bypassing service-role one, CI
has no database access (the first build-time fetch turns CI red), migrations
were applied out-of-band with nothing verifying schema state, and no
rendering/caching strategy is decided. Each of these is cheap to set up
before the first CMS table and expensive to retrofit after. The audit's
verdict: none of the first moves are "install the Supabase client" — they
are contracts and rails.

## Current state

- **Publication state, three places** (post-plan-015 it is two):
  1. `src/content/resources/registry.ts` — `ported: boolean` per entry.
  2. `next.config.ts` `redirects()` — 7 unported `/resources/<slug>` slugs
     hardcoded as individual 301s to `/resources`, with a comment explaining
     a catch-all would shadow the real routes because "redirects() runs
     before the filesystem". `unportedResources` is exported from the
     registry and imported nowhere.
- **Supabase usage today**: `src/lib/intake/supabase-admin.ts` — a direct
  REST insert to `intake_submissions` using `SUPABASE_SERVICE_ROLE_KEY` as
  both `apikey` and `Bearer` (bypasses RLS; correct for its write-path
  purpose, documented in its header comment). `.env.example` declares
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  (declared, used nowhere), `SUPABASE_PROJECT_REF`, `SUPABASE_DB_PASSWORD`,
  `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`.
- **Migrations**: `supabase/migrations/20260822180000_create_intake_submissions.sql`
  — its header records it was applied directly against the project rather
  than via `supabase db push`; RLS enabled with zero policies (deliberate for
  a service-role-only table). `supabase/config.toml` `[db.seed]` points at
  `./seed.sql`, which does not exist.
- **Rendering**: zero occurrences of `export const dynamic`, `revalidate`,
  or `unstable_cache` in `src/`. Every route fully prerenders at build.
  `generateStaticParams` in `src/app/resources/[slug]/page.tsx` enumerates
  from the registry (module constant, no network).
- **CI**: `.github/workflows/ci.yml` — `test-and-build` and `browser` jobs,
  no Supabase env vars, no database. `playwright.config.ts` deliberately
  blanks `SUPABASE_SERVICE_ROLE_KEY`/`RESEND_API_KEY` so e2e can never write
  to production (preserve this).
- **The registry IS the schema** (audit direction finding): `ResourceCategory`
  is a closed 4-value union with per-category descriptions and an explicit
  display order; `guestAuthor {name,bio,company,url}` is populated for a real
  contributor; `date` is optional on 4 of 17 entries (a `NOT NULL
  published_at` would force fake dates — keep it nullable).
- Post-plan-015 artifacts this plan builds on: `src/content/resources/blocks/*.json`
  (11 validated block bodies — the exact shape of the future `body` jsonb
  column), `buildResourceSections()`, `registry.test.ts`,
  `ArticleFidelity.test.tsx`.
- Repo conventions (AGENTS.md): secrets never in chat/committed; GitHub
  `main` → Vercel is the only deploy path; site stays `noindex` until launch.

## Commands you will need

| Purpose   | Command              | Expected on success |
|-----------|----------------------|---------------------|
| Tests     | `npm test`           | all pass            |
| Build     | `npm run build`      | all routes prerender |
| E2E       | `npm run e2e`        | all pass            |
| Local DB  | `npx supabase start` | local stack up      |
| Reset+seed| `npx supabase db reset` | migrations + seed applied |
| Drift     | `npx supabase db diff --check` (against local) | no diff |

## Scope

**In scope**:
- `docs/cms-architecture.md` (create — the decision record)
- `supabase/migrations/<timestamp>_create_cms_posts.sql` (create)
- `supabase/seed.sql` (create — the 11 posts + categories from the block files)
- `src/lib/content/supabase-read.ts` (create — anon-key read client)
- `src/lib/content/posts.ts` (create — `getPublishedPosts()`, `getPostBySlug()` with build-time fallback)
- `src/app/resources/page.tsx`, `src/app/resources/[slug]/page.tsx` (fetch + ISR)
- `next.config.ts` (remove the 7 per-slug redirects once route-level handling exists)
- `.github/workflows/ci.yml` (local-Supabase job + env wiring)
- `.env.example` (document any new var)
- `src/lib/content/service-role-guard.test.ts` (create)
- `src/content/resources/registry.ts` (only to re-point helpers; the file may shrink but its exports' shapes stay)

**Out of scope**:
- Deleting the registry or the block JSON files — they remain the seed
  source and test fixtures until an owner decision retires them.
- Any editor/admin UI, auth, or write path for posts.
- Company pages / funnel pages tables (design them in the doc; build only `posts` + `categories` now).
- State-specific pages — `docs/content-roadmap.md` explicitly holds them; do
  not model them in the schema.
- The intake write path (`supabase-admin.ts`) beyond adding the guard test.

## Git workflow

- Branch: `claude/016-cms-foundation`
- Commit per step. Do NOT push, merge, or run anything against the
  PRODUCTION Supabase project — everything here runs against the LOCAL
  stack. Applying the migration to production is an owner-supervised step
  recorded in the doc, not something this plan executes.

## Steps

### Step 1: Write `docs/cms-architecture.md` (the contract)

Record, with rationale (draw on this plan's Current state):

1. **Rendering contract — ISR**: article/company pages use
   `generateStaticParams` from the DB at build + `export const revalidate = 300`;
   publishing becomes visible within 5 minutes without redeploy. On-demand
   `revalidatePath` via a Supabase webhook is a later enhancement — note it,
   don't build it. Build-time fetch failures fall back to the committed
   block files (Step 5) so a DB outage cannot break a deploy.
2. **One publish state**: `status: 'draft' | 'published' | 'retired'` column
   replaces `ported` + redirect-list bookkeeping. Route-level behavior:
   unknown or draft slug → `notFound()`; retired slug → `redirect('/resources')`.
3. **Key policy**: reads use the publishable/anon key through RLS
   (`status = 'published'` policy); the service-role key stays confined to
   the intake write path. Name the guard test (Step 6).
4. **Schema** (transcribed from the registry types — nullability follows the
   `?` marks exactly): `categories(slug pk, name, description, sort_order)`;
   `posts(slug pk, title, category_slug fk, excerpt, reading_time, date nullable,
   author_name nullable, author_role nullable, guest_author jsonb nullable,
   related text[] nullable, status post_status not null default 'draft',
   body jsonb not null, created_at, updated_at)`. Note the future
   image/cta blocks are already in the body schema (plan 015).
5. **Migration mechanism**: `supabase db push` only, never direct SQL —
   including the production application of this plan's migration (owner-run,
   with the command written out).

**OWNER GATE**: present the doc summary (rendering mode, status column,
retired-slug behavior) before building Steps 2+.

**Verify**: doc exists, lints as markdown (readable), decision items 1–5 all present.

### Step 2: Migration + seed, applied LOCALLY

Write the migration per the doc's schema, with RLS enabled and one policy:
anon `SELECT` where `status = 'published'` (on both tables; categories are
all-readable). Generate `supabase/seed.sql` from the registry + block files
via a small script (`scripts/generate-seed.mjs`, kept): 4 categories, 17
posts (11 `published` with bodies from `blocks/*.json`, 6 `draft` with the
metadata the registry has — note the 7th redirect slug
`alameda-d2-safety-net-transparency` if absent from the registry: add it as
`draft` metadata-only, flagged in your report).

**Verify**: `npx supabase start && npx supabase db reset` → applies
migration + seed cleanly. `psql`-level check via
`npx supabase db diff --check` → no drift. A REST query with the local anon
key returns exactly 11 posts; a draft slug returns zero rows.

### Step 3: The read client and data layer

`src/lib/content/supabase-read.ts`: direct REST (match the dependency-free
style of `supabase-admin.ts`) using `NEXT_PUBLIC_SUPABASE_URL` +
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Server-side use only for now (`import "server-only"`).
`src/lib/content/posts.ts`: `getPublishedPosts()`, `getPostBySlug(slug)`,
`getCategories()` — each validating rows through plan 015's zod schema
(`parsePostBody`) and returning the registry's existing TS shapes, so the
view components don't change. **Fallback**: when the env vars are absent OR
the fetch fails, log one structured warning and serve from the committed
registry + block files. This keeps `npm run build`, vitest, and e2e working
with zero database, preserving playwright's env-blanking approach.

**Verify**: `npm test && npm run build` with NO Supabase env vars → green
(fallback path). With local-stack vars in `.env.local` → `npm run build`
logs DB-sourced generation (add a one-line "posts: db|fallback" log to prove
which path ran; check it in the build output).

### Step 4: Wire the routes with ISR

`src/app/resources/page.tsx`: async, fetches sections via the data layer,
passes to `MarketingResources` (props split from plan 015 — the view doesn't
change). `src/app/resources/[slug]/page.tsx`: `generateStaticParams` from
`getPublishedPosts()`, `export const revalidate = 300` on both routes,
retired-status handling per the doc. Then delete the 7 per-slug
`/resources/*` redirects from `next.config.ts` (route-level logic replaces
them — the 301-vs-redirect semantics change is recorded in the doc; the
`/tools` and other non-resource redirects stay).

**Verify**: `npm run build` → the 11 routes prerender, build output marks
them ISR (revalidate 300). `npm run e2e` → pass; extend
`e2e/homepage.spec.ts`'s redirect test (it covers legacy redirects) so a
retired slug still lands on `/resources` — via the route now, not next.config.

### Step 5: CI database job

In `.github/workflows/ci.yml` add a `cms-contract` job: checkout, setup
node, `npm ci`, `npx supabase start` (the GitHub runner supports the
supabase CLI via `supabase/setup-cli@v1` action — use it), `npx supabase db
reset`, then run `npm test` and `npm run build` with the local stack's URL +
anon key exported. Keep the existing two jobs UNCHANGED (they prove the
fallback path stays green without a database). Also add
`npx supabase db diff --check` to fail on schema drift between migrations
and the local applied state.

**Verify**: workflow YAML is valid (`npx yaml-lint` or a careful read);
the job runs green when pushed to the PR (this is observable only after
push — mark the checkbox provisionally and note it for the reviewer).

### Step 6: The service-role guard

`src/lib/content/service-role-guard.test.ts`: read all files under `src/`
and assert the string `SUPABASE_SERVICE_ROLE_KEY` appears ONLY in
`src/lib/intake/supabase-admin.ts` (pattern: the filesystem-walking style of
`CopyDrift.test.tsx`). Assert `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` appears
only under `src/lib/content/`.

**Verify**: `npm test` → passes; plant the service-role var name in a
content file → fails naming the file; revert.

### Step 7: Full gate

**Verify**: `npm test && npm run lint && npm run typecheck && npm run build && npm run e2e` all green without env vars; the same green with local-stack vars; `git status` → in-scope only.

## Test plan

- Plan 015's `ArticleFidelity` + `registry.test.ts` become the migration's
  acceptance suite — they must pass against BOTH data paths (fallback and
  local DB). Parameterize registry.test.ts's bijection check to run against
  `getPublishedPosts()` when env vars are present.
- New: `service-role-guard.test.ts`.
- e2e: retired-slug redirect behavior.

## Done criteria

- [ ] `docs/cms-architecture.md` committed with the five contracts + owner sign-off noted
- [ ] Local stack: migration + seed reproduce the 11-post corpus; anon key sees only `published`
- [ ] Build and tests green BOTH with and without database env vars
- [ ] The 7 per-slug redirects are gone from `next.config.ts`; retired slugs still land on `/resources` (e2e-proven)
- [ ] CI has a database job; existing jobs untouched
- [ ] Guard test confines the service-role key to the intake path
- [ ] `plans/README.md` updated

## STOP conditions

- Plan 015 not DONE.
- The owner gate (Step 1) is unanswered — do not build past the doc.
- Anything would require running against the PRODUCTION Supabase project —
  everything here is local-stack only.
- The supabase CLI cannot start locally (Docker unavailable) — report;
  do not fake the verification.
- Preserving playwright's env-blanking conflicts with a step — the blanking
  wins; report the conflict.

## Maintenance notes

- Publishing flow after this plan: insert/update a row → `published` →
  visible within `revalidate` (5 min). The webhook-driven instant
  revalidation is the recorded next enhancement.
- Company/funnel page tables: design deliberately deferred to a follow-up of
  this doc once the first posts ship; the block schema already carries their
  required image/cta types.
- The committed block JSONs + registry stay as fallback fixtures — retiring
  them is an owner decision that would also retire the zero-database build
  path; record any such decision in `docs/cms-architecture.md`.
