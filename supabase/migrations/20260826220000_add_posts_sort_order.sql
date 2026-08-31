-- Plan 019 part 3. The CMS read path ordered posts `title.asc`, while the
-- committed fallback preserved registry.ts's curated order. Same 11 published
-- articles either way, but a different sequence -- and the Guides section's
-- lead article ("What to do in your first week after a layoff", the one
-- written for a reader who was laid off yesterday) fell from first to
-- seventh. That would have shipped silently the moment the database started
-- answering, because both sources render a perfectly valid-looking page.
--
-- `posts` gains the same explicit ordering column `categories` already has,
-- so curation survives the move into the database and a post authored in
-- Studio has a place to say where it belongs.

alter table public.posts
  add column if not exists sort_order integer not null default 0;

comment on column public.posts.sort_order is
  'Display order within a category, ascending. Seeded from registry.ts order. Ties break on title.';

-- Backfill the existing rows from the seed's registry order. Generated the
-- same way seed.sql is (scripts/generate-seed.mjs), so it cannot drift from
-- the registry by hand-editing.

update public.posts set sort_order = case slug
    when 'first-week-after-a-layoff' then 0
    when 'negotiating-your-severance' then 1
    when 'rebuild-your-resume-after-a-layoff' then 2
    when 'career-changers-guide-to-job-offer-negotiations' then 3
    when 'health-insurance-after-a-layoff' then 4
    when 'how-to-announce-a-layoff-on-linkedin' then 5
    when 'best-job-application-trackers-2026' then 6
    when 'how-ai-is-changing-the-job-search-in-2026' then 7
    when 'what-is-an-ai-agent' then 8
    when '7-levels-ai-agent-capability' then 9
    when 'will-employers-know-cover-letter-is-ai' then 10
    when 'this-is-not-charity-it-is-reconstruction' then 11
    when 'a-series-of-fortunate-events' then 12
    when 'they-think-an-idea-is-bulletproof-they-are-wrong' then 13
    when 'we-forgot-to-reinforce-the-foundations' then 14
    when 'the-mentor-trap-a-silicon-valley-horror-story' then 15
    when 'the-valleys-hypocrisy-hustle-exposed-by-the-overemployed' then 16
    when 'alameda-d2-safety-net-transparency' then 17
    else 0
  end;
