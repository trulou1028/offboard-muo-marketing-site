# CMS architecture decision record (plan 016, step 1)

**Status: awaiting owner sign-off.** This document proposes five decisions
for the resources CMS (Supabase-backed `categories`/`posts` tables replacing
the current `registry.ts` + `posts/*.tsx` + `next.config.ts` redirect list).
Nothing here is built yet. Once the owner approves this document, plan 016's
later steps write the migration, the seed file, and the fetch code. No
migration, SQL, or application code is part of this step.

Each section starts with a plain-language summary of the decision and why it
matters, then the technical detail underneath.

---

## 1. Rendering contract: ISR with a committed-file fallback

**In plain terms:** article and company pages will be pre-built like they
are today, but every 5 minutes the site will quietly check the database for
anything new and rebuild those pages in the background — so publishing a
post becomes visible within 5 minutes, with no developer needed to redeploy
the site. If the database is ever unreachable at the moment a page is being
built (during a deploy), the page falls back to a copy of the content that
is committed to the code repository, so a database outage can never cause a
broken deployment.

**Why the fallback matters:** today every route in this site prerenders at
build time with zero network calls (the resource pages read straight from
`src/content/resources/registry.ts` and `src/content/resources/blocks/*.json`,
both committed files). `.github/workflows/ci.yml:29` runs `npm run build` in
CI with no Supabase environment variables configured anywhere in the
workflow. If the new build-time fetch has no fallback, the very first commit
that switches posts to a database read turns CI red — not because of a bug
in that commit, but because CI has no credentials to reach Supabase at all.

**Technical detail:**

- Article pages (`/resources/[slug]`) and company pages use
  `generateStaticParams` to fetch published slugs from the database at
  build time.
- `export const revalidate = 300;` on those routes enables Next.js
  time-based ISR: after the first 300 seconds, the next request triggers a
  background regeneration, so a publish becomes visible within 5 minutes
  without a redeploy.
- **Build-time fetch failure handling is not optional.** If the
  build-time Supabase call throws, times out, or returns no credentials
  (exactly the CI case above), `generateStaticParams` and the page's data
  loader must fall back to the JSON block files already committed under
  `src/content/resources/blocks/*.json` (and an equivalent committed
  snapshot for `categories`), not fail the build.
- **Future work, not designed here:** on-demand revalidation via
  `revalidatePath`, triggered by a Supabase database webhook when a row's
  `status` changes. This would drop the up-to-5-minute publish delay to
  near-instant. Out of scope for plan 016; noted for a later plan.

---

## 2. One publish state, not three

**In plain terms:** today, "publishing" one essay means editing three
separate places by hand — a boolean flag in a TypeScript file, adding a JSON
file, and removing a hard-coded redirect line in the site's config — and
nothing stops someone from forgetting one of the three. The new design
replaces all three with a single `status` field on each post: `draft`,
`published`, or `retired`. There is exactly one place that says whether a
post is live.

**Why this matters today:** publishing a ported essay currently requires
editing `registry.ts`'s `ported: boolean` field (e.g. `src/content/resources/registry.ts:197`),
adding its block JSON file, **and** removing its corresponding entry from
the hardcoded per-slug redirect list in `next.config.ts:32-38` (which today
has exactly 7 entries, one per unported essay/policy slug — verified by
reading the file and cross-checking against the 7 `ported: false` entries in
`registry.ts`). No test today catches a missed step in that three-place
update.

**Technical detail:**

- `status` column: `'draft' | 'published' | 'retired'` (Postgres enum,
  `post_status`).
- Route-level behavior to implement in plan 016's later steps:
  - Unknown slug or `status = 'draft'` → `notFound()` (matches today's
    behavior in `src/app/resources/[slug]/page.tsx:35-37`, which calls
    `notFound()` for any post that is missing or not `ported`).
  - `status = 'retired'` → `redirect('/resources')`.
- **Semantic change to flag:** today, the 7 unpublished slugs are handled by
  permanent (301) redirects declared in `next.config.ts`, which Next.js
  applies *before* the filesystem/route resolution runs (see the comment at
  `next.config.ts:27-31` explaining why they're listed individually rather
  than as a catch-all). After this change, a `retired` post's redirect is a
  route-level response produced by application code, not a config-level
  redirect. Two consequences to note explicitly:
  - Next.js's `redirect()` helper (from `next/navigation`) issues a
    temporary redirect by default, not a permanent 301 like the current
    `next.config.ts` entries — this is a real difference in the HTTP
    response an SEO crawler sees, and is called out as an open question
    below.
  - `e2e/homepage.spec.ts:116-122` currently asserts that
    `/resources/this-is-not-charity-it-is-reconstruction` and
    `/resources/alameda-d2-safety-net-transparency` redirect to
    `/resources` via the config-level mechanism. That test must be extended
    (not just left passing) once retirement moves to route-level, so it
    keeps testing the real mechanism rather than a stale one.

---

## 3. Key policy: public reads through RLS, service-role key stays on the write path

**In plain terms:** the site will read published posts using a
"public-safe" API key that can only ever see rows marked `published`,
enforced by the database itself. A separate, much more powerful key that can
read and write anything stays confined to the one form that needs it (the
`/intake` layoff-story submission form) and never touches the new post-reading
code.

**Why this matters — the risk, stated plainly:** the only Supabase client
that exists in this codebase today is `src/lib/intake/supabase-admin.ts`,
and it uses `SUPABASE_SERVICE_ROLE_KEY` (`supabase-admin.ts:40`,
`:51-52`) specifically because it needs to bypass Row Level Security to
insert into `intake_submissions`, a table whose migration
(`supabase/migrations/20260822180000_create_intake_submissions.sql:38-41`)
deliberately has RLS enabled with **no** policies — deny-all for both `anon`
and `authenticated` roles, by design. When someone later builds "fetch the
published posts," the fastest path is to copy `supabase-admin.ts` as a
template, because it's the only example in the repo. Doing that would mean
public content reads run under a key that can also read
`intake_submissions` — real people's names, emails, and free-text answers
about their layoffs. That must not happen.

**Technical detail:**

- Reads (posts, categories) go through the publishable/anon key
  (`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, already declared in
  `.env.example:5`), constrained by a Row Level Security policy on `posts`
  scoped to `status = 'published'` (and an equivalent open-read policy on
  `categories`, which has no draft concept).
  candidate policy shape:
  `USING (status = 'published')` for `SELECT` under the `anon` role.
- Writes to `intake_submissions` keep using `SUPABASE_SERVICE_ROLE_KEY`
  exactly as today, confined to `src/lib/intake/supabase-admin.ts`.
- **Guard to add** (in a later plan-016 step, not this one): a test that
  asserts the literal string `SUPABASE_SERVICE_ROLE_KEY` appears in exactly
  one file under `src/`. As of this writing that is already true —
  `src/lib/intake/supabase-admin.ts` is the only file under `src/` that
  references it (verified by search; the only other repo-wide references
  are `.env.example` and `playwright.config.ts:44`, both outside `src/` and
  both legitimate: the former documents the variable, the latter
  deliberately blanks it for e2e — see contract 3's CI note below). The
  guard test should scope its search to `src/` so it doesn't false-positive
  on those two.
- This also protects the mechanism `playwright.config.ts:32-46` relies on:
  e2e tests blank `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` before
  Next.js starts, specifically so `e2e/intake.spec.ts`'s degraded-path test
  can never write a live row to production Supabase. That blanking only
  protects paths that read the service-role key from `process.env` the way
  `supabase-admin.ts` does — a second file reading the same key would still
  be covered by the blank, but would defeat the single-purpose intent this
  document is trying to preserve. The guard test protects intent, not just
  behavior.

---

## 4. Schema

Transcribed from `src/content/resources/registry.ts`'s existing TypeScript
types (`ResourcePost`, `registry.ts:18-30`) and `src/content/resources/schema.ts`'s
`Block`/`InlineRun` types, preserving optionality exactly.

```sql
create type post_status as enum ('draft', 'published', 'retired');

create table categories (
  slug        text primary key,
  name        text not null,
  description text not null,
  sort_order  integer not null
);

create table posts (
  slug           text primary key,
  title          text not null,
  category_slug  text not null references categories(slug),
  excerpt        text not null,
  reading_time   text not null,
  date           text,                 -- nullable, see below
  author_name    text,
  author_role    text,
  guest_author   jsonb,                -- { name, bio, company, url } | null
  related        text[],
  status         post_status not null default 'draft',
  body           jsonb not null,       -- Block[], see below
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
```

- `categories` is transcribed from `ResourceCategory` /
  `categoryMeta` / `categoryOrder` in `registry.ts:16,32-45`. `sort_order`
  replaces the array-position ordering `categoryOrder` currently encodes.
- `posts.date` **must stay nullable.** Verified against the live registry:
  of the 18 entries in `registry.ts`, 3 have no `date` field —
  `first-week-after-a-layoff` (`registry.ts:50-58`),
  `negotiating-your-severance` (`:59-68`), and
  `rebuild-your-resume-after-a-layoff` (`:69-78`). A `not null` date (or a
  `published_at`-style column standing in for it) would force inventing
  dates for posts that were never dated, which is a content decision, not a
  schema one.
- `author_name` / `author_role` are split from `registry.ts`'s
  `author?: { name: string; role: string }` — both nullable together in
  practice, since the type is a single optional object. `guest_author` is
  transcribed from the same file's `guestAuthor?: { name, bio, company,
  url }` and kept as jsonb to avoid a very sparse extra table for a
  field that appears on exactly one of the 18 posts today.
- `body jsonb not null` is exactly the shape of `Block[]` as defined in
  `src/content/resources/schema.ts:50-63` (and validated by
  `parsePostBody` in that same file, `:94-107`) — the same shape already
  living in every file under `src/content/resources/blocks/*.json` since
  plan 015 converted the 11 ported posts from TSX components to this JSON
  block format. No transformation is needed between a block file's contents
  and this column's value.
- The `image` (`schema.ts:60`) and `cta` (`schema.ts:63`) block types are
  already defined in that schema but are **unused by all 11 current posts**
  (per the comment at `schema.ts:58-63`, added for the content roadmap's
  planned funnel articles). Because `body` is schemaless jsonb, no migration
  will be needed when a future article actually uses an `image` or `cta`
  block — the column already accepts it.
- `docs/content-roadmap.md:55-71` explicitly **holds** state-by-state
  benefits pages pending an SEO search-volume check and a revenue case for
  the ongoing maintenance cost. This schema deliberately does not model
  per-state pages, per-state fields, or anything state-specific — that is a
  future decision, not a gap in this one.

---

## 5. Migration mechanism: `supabase db push`, owner-run only

**In plain terms:** database changes will be written as files in the code
repository and applied using Supabase's official migration tool, run by a
human (the owner), never by an AI agent and never as a manual SQL script
typed into a dashboard.

**Why this is a change from current practice:** the one migration that
exists today, `supabase/migrations/20260822180000_create_intake_submissions.sql`,
says in its own header (lines 10-13) that it was "Applied directly against
[the project] via the direct Postgres connection... this file documents
that change for the repo history." In other words, the repo today
*documents* a schema change after the fact; it is not the mechanism that
produced the live schema. That means nothing today verifies that the
deployed database actually matches what's in the migrations folder — a
migration file could silently drift from reality.

**Technical detail:**

- Plan 016's migration (creating `post_status`, `categories`, `posts`) will
  be written to `supabase/migrations/`, following the existing file's naming
  convention (`<timestamp>_<description>.sql`).
- The command an owner runs to apply it to production:
  ```
  supabase link --project-ref $SUPABASE_PROJECT_REF
  supabase db push
  ```
  (`SUPABASE_PROJECT_REF` is already declared in `.env.example:6`, alongside
  `SUPABASE_DB_PASSWORD` at `.env.example:7`, which the CLI will prompt for
  if not already configured.) No direct SQL execution against the
  dashboard or an ad hoc Postgres connection.
- **This command is owner-run, never executor-run.** No agent working on
  plan 016 (including this one) should run `supabase db push` against the
  linked production project. Local iteration during later plan-016 steps
  happens via `npx supabase start` / `npx supabase db reset` against a
  local Postgres instance — unavailable on this machine today, which is
  exactly why this step (a document, not code) is the only one dispatched
  right now.
- `supabase/config.toml:66-71` already declares
  `[db.seed] sql_paths = ["./seed.sql"]`, i.e. `supabase/seed.sql` — that
  file does not exist yet in the repo. Plan 016 Step 2 creates it (to seed
  local dev / `db reset` with sample categories and posts). This document
  does not create it.

---

## Open questions for the owner

1. **301 vs. temporary redirect for retired posts.** Today's redirects for
   unpublished essays are permanent (301s) declared in `next.config.ts`.
   Contract 2 moves that behavior to a route-level `redirect()` call, whose
   Next.js default is a temporary redirect, not a 301. Search engines treat
   these differently (a 301 consolidates SEO signal to the destination; a
   temporary redirect does not). Does retiring a post need to preserve the
   permanent-redirect SEO behavior, or is a temporary redirect acceptable
   since retired posts are expected to be rare and short-lived compared to
   the original "not ported yet" essays?
2. **Exact RLS policy text and who can write `posts`/`categories`.** This
   document specifies the read policy (`status = 'published'` for `anon`)
   but not the authoring/write side: who (which key, which role, which
   tool) is allowed to insert/update `posts` and `categories`, and whether
   that's a Supabase Studio dashboard user, a future admin UI, or something
   else. Plan 016's later steps need this answered before writing the write
   path.
3. **Categories are fixed today; does the schema need to support adding
   one without a migration?** The current 4 categories
   (`registry.ts:16,32-45`) are a closed TypeScript union. Moving them into
   a `categories` table technically allows adding a category via an
   `INSERT` alone, but nothing in this document says whether that's an
   intended workflow the owner wants to use, or whether new categories
   should still go through a reviewed migration.
4. **On-demand revalidation timeline.** Contract 1 names the
   `revalidatePath`-via-webhook enhancement as future work but doesn't
   estimate when. Is the 5-minute ISR delay acceptable for the CMS's
   initial launch, or does the owner want the webhook in the same plan
   rather than a follow-up?
5. **What "committed fallback" content looks like for `categories`.**
   Contract 1 requires a build-fallback for posts (the existing
   `blocks/*.json` files already serve this purpose) but categories don't
   currently have an equivalent committed snapshot outside `registry.ts`'s
   `categoryMeta`/`categoryOrder`. Later steps need to decide whether that
   TypeScript data doubles as the fallback or whether a separate committed
   file is needed.

---

*This document is Step 1 of plan 016 ("CMS foundation"). Per the plan, an
owner gate follows this step — no migration, seed file, or fetch code is
written until this document is signed off.*
