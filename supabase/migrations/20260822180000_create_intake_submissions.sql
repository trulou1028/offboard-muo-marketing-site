-- Plan 010: port the /intake form.
--
-- Column shape mirrors the `row` object built in the retiring TanStack
-- site's src/lib/intake/submit.functions.ts (snake_case, nullable exactly
-- where that source uses `|| null`), plus id/created_at.
--
-- RLS is enabled with NO policies: anon and authenticated both get default
-- deny for every operation. Only the service-role key (used server-side in
-- src/lib/intake/supabase-admin.ts, bypasses RLS) can read or write this
-- table. Applied directly against omsvpaaexfujzheybhat via the direct
-- Postgres connection (SUPABASE_DB_PASSWORD) on 2026-08-22; this file
-- documents that change for the repo history and for `supabase db push`
-- against a fresh environment.

create extension if not exists pgcrypto;

create table if not exists public.intake_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  recent_title text not null,
  industry text not null,
  stay_in_industry text not null,
  layoff_recency text not null,
  how_news_broke text not null,
  job_search_vibe integer not null,
  brings_you_here text[] not null,
  superpower text not null,
  wish_help text not null,
  spirit_animal text not null,
  relief text,
  before_we_chat text,
  timezone text,
  general_availability text
);

alter table public.intake_submissions enable row level security;

-- No policies created intentionally: RLS defaults to deny-all for anon and
-- authenticated roles. Do not add anon/authenticated policies to this table.
