# Plan 017: Hygiene batch — PII-safe logging, intake action tests, inherited noindex + sitemap, related posts, font/scroll polish

> **Execute with:** Sonnet 5 · low effort — a hygiene batch of small, independently testable fixes. *(Executed. Model line added retroactively 2026-09-01 under plans/README.md § "The model line".)*

> **Executor instructions**: Follow this plan step by step. The six parts are
> independent — if one hits a STOP condition, report it and continue with the
> others. Run every verification command before moving on. When done, update
> the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 1cd395b..HEAD -- src/lib src/app src/components/marketing/resources src/content/resources .github/workflows/ci.yml`
> Plans 011–016 may have touched these areas; locate code by symbol, not
> line. If a quoted excerpt no longer exists anywhere, treat that PART as
> stopped, not the whole plan.

## Status

- **Priority**: P2
- **Effort**: M (six small independent parts)
- **Risk**: LOW
- **Depends on**: none strictly; Part D is simpler after plans/015/016 (see its note)
- **Category**: security / tests / dx
- **Planned at**: commit `1cd395b`, 2026-08-24

## Why this matters

Six small, audit-confirmed gaps, each cheap alone and each multiplied by the
coming CMS phase: intake error logs can persist submitters' PII; the only
write path in the repo has zero direct test coverage; the `noindex` rule is
hand-copied into 11 files (a forgotten copy ships an indexable page) and the
cutover checklist expects a sitemap nothing generates; every article carries
hand-curated related-post links that render nowhere; and two rendering
artifacts (heading font-swap reflow, scrollbar layout jump) plus a stale
comment mislead the next reader.

## Current state

**A — PII in error logs.** `src/lib/intake/supabase-admin.ts`:

```ts
if (!res.ok) {
  const detail = await res.text().catch(() => undefined);
  console.error("intake insert failed", res.status, detail);
  return { ok: false, reason: "insert-failed", detail };
}
```

PostgREST 4xx bodies commonly echo the offending column values — here that
is a laid-off person's name, email, and free-text answers — into Vercel
function logs. `src/lib/email/resend.ts` has the same pattern
(`console.error("resend send failed", res.status, detail)` where detail can
contain the recipient address). The `detail` field also flows back through
`InsertIntakeResult`, though the caller (`src/app/intake/actions.ts`)
discards it for a generic user message.

**B — untested server action.** `src/app/intake/actions.ts` `submitIntake`:
zod parse → `insertIntakeRow` → two email sends wrapped so "an email failure
never fails the submission". Only the zod schema has tests
(`src/lib/intake/schema.test.ts`); e2e deliberately exercises only the
degraded path (playwright blanks the keys).

**C — noindex + sitemap.** `robots: "noindex, nofollow, noarchive"` is
repeated in 11 `page.tsx` files; `src/app/layout.tsx` exports no `metadata`
at all. `docs/cutover-checklist.md` lists "Submit the new sitemap in Search
Console" but no `sitemap.ts`/`robots.ts` exists. `MarketingHome.test.tsx`
asserts the noindex line across a hardcoded list of 8 imported metadata
objects.

**D — related posts.** Every entry in `src/content/resources/registry.ts`
populates `related?: string[]` with 2 curated slugs; `src/app/resources/[slug]/page.tsx`
passes every other field to `GuideArticle` but drops `related`;
`GuideArticle.tsx` ends with a single "More guides" link.

**E — font + scrollbar artifacts.** `src/app/layout.tsx` loads Aspekta and
Fraunces via `next/font/local` with `display: "swap"` and no
`adjustFontFallback`/`fallback` config; Fraunces (high-contrast serif) sits
on every h1–h3 at up to 82px over a Georgia fallback → visible reflow on
first paint. No `scrollbar-gutter` anywhere: short pages (404,
`/intake/confirmed`) drop the scrollbar and shift all content horizontally.

**F — stale comment + dead offsets.** `src/app/globals.css` opens with
"The source app's Tailwind preflight zeroed body margin…" — this repo never
had Tailwind. `MarketingHomepage.css` has `.mh-intake-rail { top: 96px }`
and `.mh-intake-card { scroll-margin-top: 110px }` compensating for a header
that is `position: absolute` (it scrolls away; the offsets reference nothing).

Repo conventions (AGENTS.md): copy law (no string changes without COPY.md),
`npm test`+`build` always, e2e on route changes, secrets never committed.

## Commands you will need

| Purpose   | Command              | Expected on success |
|-----------|----------------------|---------------------|
| Tests     | `npm test`           | all pass            |
| Build     | `npm run build`      | all routes prerender |
| E2E       | `npm run e2e`        | all pass            |
| Typecheck | `npx tsc --noEmit`   | exit 0              |

## Scope

**In scope**:
- `src/lib/intake/supabase-admin.ts`, `src/lib/email/resend.ts`
- `src/app/intake/actions.test.ts` (create)
- `src/app/layout.tsx`, all 11 `src/app/**/page.tsx` metadata blocks, `src/app/sitemap.ts` (create), `src/components/marketing/homepage/MarketingHome.test.tsx`
- `src/app/resources/[slug]/page.tsx`, `src/components/marketing/resources/GuideArticle.tsx`, article CSS additions in `MarketingHomepage.css`
- `src/app/globals.css`
- `COPY.md` (ONLY if Part D's new UI strings require it — they do; see Part D)

**Out of scope**:
- The intake form UI, schema, or flow.
- Turning OFF noindex (launch decision — this plan centralizes the mechanism only).
- Everything plans 011–016 own.

## Git workflow

- Branch: `claude/017-hygiene`
- One commit per part (A–F).
- **Hand over with a preview link** (AGENTS.md "Handing over work for review"):
  when the work is complete, push the branch, open a PR, run
  `node scripts/preview-url.mjs`, and put the URL in your final report — Part D
  (related posts) is the one visible change, so point at an article page. Do
  NOT merge — that is the owner's call.

## Steps

### Part A: Truncate PII from error logs

In `supabase-admin.ts`: parse the error body as JSON when possible and log
only `{ status, code, message, hint }` — never `details` and never raw text;
on parse failure log status only. Stop returning the raw `detail` in
`InsertIntakeResult` (drop the field; the caller already ignores it — update
the type). Same treatment in `resend.ts` (log status + a parsed `name`/
`message` if present, never the body).

**Verify**: `npx tsc --noEmit` → exit 0 (proves no caller consumed `detail`).
`npm test && npm run e2e` → pass (e2e's degraded-path intake test still sees
its generic error message).

### Part B: Test the intake server action

Create `src/app/intake/actions.test.ts` (vitest, `vi.mock` the
`supabase-admin` and `resend` modules). Cases:
1. Invalid input → returns the first zod issue message; `insertIntakeRow`
   never called.
2. Insert failure → generic error returned; no email dispatched.
3. Insert success + both emails reject → still `{ ok: true }` with the id
   (the "email failure never fails the submission" contract).
4. Insert success → both email senders called once each.

Model module-mocking on any existing pattern in the repo; if none exists,
standard `vi.mock("@/lib/intake/supabase-admin", ...)` at file top.

**Verify**: `npm test` → 4 new tests pass; temporarily invert case 3's
expectation → fails; revert.

### Part C: Inherit noindex, add the sitemap

1. In `src/app/layout.tsx`, export
   `export const metadata: Metadata = { robots: "noindex, nofollow, noarchive" };`.
2. Remove the per-page `robots:` line from the 11 `page.tsx` metadata
   objects (inheritance covers them; page-level `title`/`description` stay).
3. Create `src/app/sitemap.ts` returning the static routes plus the
   published article slugs (source: `portedResources` today; if plan 016 has
   landed, `getPublishedPosts()` — check `plans/README.md` and use whichever
   exists). Sitemaps are inert while noindex stands; this pre-builds the
   cutover-checklist item.
4. Update `MarketingHome.test.tsx`'s metadata loop: it currently asserts the
   robots string on each of 8 imported metadata objects — repoint it to
   assert the LAYOUT's metadata export carries the string, plus one e2e-level
   check that a rendered page emits the meta tag (extend the existing
   assertion in `e2e/homepage.spec.ts` if it already checks meta robots —
   it does at the homepage; keep it).

**Verify**: `npm run build` → `/sitemap.xml` in the route list. `npm run e2e`
→ the meta-robots assertions pass. `grep -rn "noindex" src/app --include="page.tsx"` → 0.

### Part D: Render related posts

Pass `related` through `[slug]/page.tsx` into `GuideArticle`; resolve each
slug via `getResource`, filter to `ported` (or `published` post-016), render
above the existing footer link as a "Keep reading" pair (title + category,
linking to the article). Add CSS `mh-article-related` following the pattern
of `.mh-article-callout`. New user-facing strings ("Keep reading") must be
added to COPY.md per the copy law — add the string to COPY.md's guide-article
section in the same commit, and extend `registry.test.ts`'s dangling-slug
check if plan 015 landed (it already covers `related` resolution — then
nothing more to add).

**Verify**: `npm test` → pass (copy tests see COPY.md updated). Browser:
an article shows two working "Keep reading" links. `npm run build && npm run e2e` → pass.

### Part E: Font fallback + scrollbar gutter

In `layout.tsx`, add to BOTH `localFont` calls:
`fallback: ["Georgia", "serif"]` for Fraunces and `["Inter", "system-ui", "sans-serif"]`
for Aspekta, plus `adjustFontFallback: "Times New Roman"` for Fraunces and
`"Arial"` for Aspekta (next/font's metric-adjusted fallback for local fonts
takes a string; verify against the installed Next 16 docs at
`node_modules/next/dist/docs/` per AGENTS.md — if the API differs, follow
the docs and note it). In `globals.css` add `html { scrollbar-gutter: stable; }`.

**Verify**: `npm run build` → pass. Browser with cache disabled: hero
headline no longer visibly reflows on first paint; navigating `/` →
`/intake/confirmed` no longer shifts content horizontally.

### Part F: Comment + dead offsets

Rewrite `globals.css`'s opening comment to the truth ("Base reset: the
scoped homepage stylesheet assumes zero body margin for edge-to-edge
sections."). Delete `top: 96px` from `.mh-intake-rail`… — CAUTION: that rule
is `position: sticky; top: 96px` — sticky NEEDS a top. The audit's point is
the VALUE references a header that scrolls away; since the header is
absolute (not sticky), the correct offset is a small viewport inset, not a
header height. Change to `top: 24px` and `scroll-margin-top: 24px` on
`.mh-intake-card`, then check the intake page's rail behavior while
scrolling at desktop width.

**Verify**: browser check of `/intake` — the left rail sticks with a 24px
inset and section-nav clicks land without hiding content. `npm run e2e` → pass.

## Test plan

- New: `actions.test.ts` (4 cases, Part B).
- Modified: `MarketingHome.test.tsx` metadata assertions (Part C).
- Everything else is covered by the existing gates + browser checks named
  per part.

## Done criteria

- [ ] No raw response bodies logged in `supabase-admin.ts` / `resend.ts`; `detail` removed from the result type
- [ ] `actions.test.ts` passes with the 4 contract cases
- [ ] `noindex` inherited from layout; per-page copies gone; `/sitemap.xml` builds
- [ ] Articles render "Keep reading" links; COPY.md updated in the same commit
- [ ] Font fallbacks configured; `scrollbar-gutter: stable` set
- [ ] Full gate (`npm test && npm run lint && npx tsc --noEmit && npm run build && npm run e2e`) green; `plans/README.md` updated

## STOP conditions

- Part C: if any page legitimately needs DIFFERENT robots behavior (none
  does today), stop that part.
- Part D: if COPY.md's structure gives no clear home for the new string,
  propose the section in your report before committing.
- Part E: if Next 16's local-font API doesn't support `adjustFontFallback`
  as described, follow `node_modules/next/dist/docs/` and report what you
  did; do not fight the framework.
- Any part that would touch a file plans 011–016 own beyond the listed
  scope.

## Maintenance notes

- Part C makes launch a one-line flip in `layout.tsx` — record THAT in
  `docs/cutover-checklist.md` if it currently says otherwise (read it; if
  its noindex-flip step references per-page metadata, update the step).
- Part A's logging shape (`status, code, message, hint`) is the pattern all
  future Supabase call sites should copy — plan 016's read client already
  follows it if 016 ran after this; otherwise align them when both exist.
- Deferred: axe-core accessibility sweep; instant-revalidation webhook
  (recorded in plan 016's doc).
