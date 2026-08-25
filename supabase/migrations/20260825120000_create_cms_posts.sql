-- Plan 016: CMS foundation. Creates the `categories` and `posts` tables
-- that back the Guides & resources library, replacing the three hand-synced
-- publish signals (registry.ts's `ported` flag, a blocks/*.json file, and a
-- next.config.ts redirect entry) with one `status` column. Full rationale in
-- docs/cms-architecture.md ("Schema", "One publish state, not three", "Key
-- policy").
--
-- Authoring path: the owner writes/edits rows directly in the Supabase
-- dashboard's table editor (docs/cms-architecture.md "Decisions" #1). This
-- migration deliberately creates NO write-side policy for `anon` or
-- `authenticated` on either table — inserts/updates happen as the
-- dashboard's authenticated Postgres role (or, later, a service-role-backed
-- admin path), never through the public API surface this migration exposes.
--
-- Apply with `supabase db push`, owner-run only (docs/cms-architecture.md
-- "Migration mechanism: supabase db push, owner-run only"). Never apply this
-- file by pasting it into the dashboard's SQL editor or via a direct
-- Postgres connection — `supabase db push` is what keeps the migrations
-- folder as the source of truth for the deployed schema, which the previous
-- migration (20260822180000_create_intake_submissions.sql) explicitly did
-- not achieve.

create type post_status as enum ('draft', 'published', 'retired');

create table public.categories (
  slug        text primary key,
  name        text not null,
  description text not null,
  sort_order  integer not null
);

create table public.posts (
  slug           text primary key,
  title          text not null,
  category_slug  text not null references public.categories(slug),
  excerpt        text not null,
  reading_time   text not null,
  -- Nullable: 3 of the 18 posts in the current corpus have no date
  -- (first-week-after-a-layoff, negotiating-your-severance,
  -- rebuild-your-resume-after-a-layoff). See docs/cms-architecture.md
  -- "Schema" for why this must stay nullable rather than forcing a
  -- published_at default.
  date           text,
  -- Split from registry.ts's single optional `author?: { name, role }`
  -- object; both columns are nullable together in practice.
  author_name    text,
  author_role    text,
  -- { name, bio, company, url } | null, transcribed from registry.ts's
  -- `guestAuthor?`. jsonb rather than a side table: exactly one of the 18
  -- posts uses it today.
  guest_author   jsonb,
  related        text[],
  status         post_status not null default 'draft',
  -- Block[] (src/content/resources/schema.ts). Schemaless jsonb so the
  -- already-defined-but-unused `image`/`cta` block types (content roadmap)
  -- need no migration when a future post first uses them.
  body           jsonb not null,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

alter table public.categories enable row level security;
alter table public.posts enable row level security;

-- categories has no draft concept (see docs/cms-architecture.md "Schema"):
-- fully readable by anon.
create policy "categories are publicly readable"
  on public.categories
  for select
  to anon
  using (true);

-- posts: anon may see 'published' AND 'retired' rows, but never 'draft'.
--
-- This is a deliberate refinement of the "candidate policy shape" sketched
-- in docs/cms-architecture.md's original Contract 3 (`status = 'published'`
-- only), made necessary by the owner's decision 3 (permanent-redirect
-- behavior for retired URLs, docs/cms-architecture.md "Decisions"): the
-- route-level handler for /resources/[slug] must be able to tell a retired
-- slug (redirect to /resources, preserving the 301/308 an SEO crawler sees
-- today) apart from a truly unknown or still-drafting slug (notFound()).
-- If the anon key could only ever see 'published' rows, a retired slug and
-- a nonexistent one would look identical (zero rows) and the redirect
-- behavior next.config.ts provides today would silently become a 404 the
-- moment the per-slug redirects are deleted from next.config.ts (plan 016
-- step 4). Retired rows carry no confidentiality risk — they were public
-- before — so exposing them read-only is safe; drafts remain fully denied
-- to anon, matching "draft/unknown slugs still notFound()".
create policy "published and retired posts are publicly readable"
  on public.posts
  for select
  to anon
  using (status in ('published', 'retired'));
