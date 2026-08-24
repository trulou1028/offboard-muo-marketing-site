# Plan 015: Make article content portable (block schema + lossless conversion of the 11 posts + data/view split that keeps the copy-law tests alive)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 1cd395b..HEAD -- src/content/resources src/app/resources src/components/marketing/resources src/components/marketing/homepage/MarketingRoutePages.tsx src/components/marketing/homepage/CopyDrift.test.tsx`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1 (gates the entire Supabase CMS phase)
- **Effort**: L
- **Risk**: MED — the 11 articles were ported byte-faithful from the legacy
  site; a lossy conversion silently changes published prose. The whole plan
  is structured around proving losslessness before deleting anything.
- **Depends on**: none (independent of the design track)
- **Category**: migration
- **Planned at**: commit `1cd395b`, 2026-08-24

## Why this matters

The owner is moving blog posts and company pages into Supabase as a CMS.
Today a post is a **compiled React component**: `src/content/resources/posts/*.tsx`,
wired through a static import map. A database row cannot render a page at
all — so "posts come from Supabase" is not a data swap, it's a new renderer.
The good news (audit, 2026-08-24): the entire 11-article corpus uses a
closed vocabulary of exactly 11 element kinds (counts across all posts:
`GuideP` ×282, `GuideH2` ×83, `GuideList` ×49, `strong` ×43, `GuideH3` ×29,
`br` ×16, `GuideCallout` ×9, `GuideDivider` ×8, `GuideLink` ×7,
`GuideBlockquote` ×6, `em` ×5) — no arbitrary JSX. That makes a JSON block
format genuinely lossless. Separately, the copy-law harness
(`CopyDrift.test.tsx`) renders page components synchronously with React
Testing Library; the moment `/resources` becomes an async server component
fetching from Supabase, those tests stop compiling and the never-say
enforcement silently dies. Both must be fixed while everything is still
static — afterwards, the failure mode is "delete the tests to get green."

This plan does NOT add Supabase. After it lands, posts are JSON blocks +
a renderer, pages take data as props, and a characterization suite proves
rendering fidelity — the CMS phase (plan 016) then swaps the data source.

## Current state

- `src/content/resources/registry.ts` — metadata for 17 articles
  (11 `ported: true`). Types:

```ts
export type ResourcePost = {
  slug: string; title: string; category: ResourceCategory; excerpt: string;
  readingTime: string; date?: string;
  author?: { name: string; role: string };
  guestAuthor?: { name: string; bio: string; company: string; url: string };
  related?: string[];
  ported: boolean;
};
```

  Helpers at the bottom: `getResource(slug)`, `getByCategory(category)`
  (filters `ported`), `portedResources`, `unportedResources`.

- `src/content/resources/posts/index.ts` — static import map:

```ts
export const postComponents: Record<string, ComponentType> = {
  "first-week-after-a-layoff": FirstWeekAfterALayoff,
  ... // 11 entries
};
```

  The header comment says "Every key here must have a matching `ported: true`
  entry in ../registry.ts" — an invariant no test enforces.

- `src/app/resources/[slug]/page.tsx` — `generateStaticParams()` from
  `portedResources`; body resolution:

```tsx
const post = getResource(slug);
const Body = postComponents[slug];
if (!post || !post.ported || !Body) { notFound(); }
return (
  <GuideArticle category={post.category} title={post.title} readingTime={post.readingTime}
    date={post.date} author={post.author} guestAuthor={post.guestAuthor}>
    <Body />
  </GuideArticle>
);
```

- `src/components/marketing/resources/GuideArticle.tsx` — the article shell;
  also exports (inspect the file) the `Guide*` primitives the posts import
  (`GuideP`, `GuideH2`, `GuideH3`, `GuideList`, `GuideCallout`,
  `GuideBlockquote`, `GuideDivider`, `GuideLink`) — confirm the exact export
  location before starting; the posts' import statements tell you.
- `src/components/marketing/homepage/MarketingRoutePages.tsx` —
  `MarketingResources()` (synchronous) builds sections via
  `categoryOrder.map(...getByCategory(...))` internally, then renders. It is
  rendered directly by `CopyDrift.test.tsx` (in its `SWEPT_PAGES` list) and
  by `MarketingHome.test.tsx`.
- `src/app/resources/page.tsx` — thin route wrapper exporting metadata and
  rendering `<MarketingResources />`.
- Tests: `CopyDrift.test.tsx` sweeps rendered text of six page components
  for never-say vocabulary, em dashes, and outplacement scoping;
  `MarketingHome.test.tsx` asserts `/resources` library content. Only 2 of
  11 article bodies are rendered by any test today.
- Repo copy law (AGENTS.md / COPY.md): article bodies are "editorial content
  ported byte-faithful from the legacy site and keep their original
  punctuation" — em dashes INSIDE article bodies are exempt from the no-em-dash
  rule. Your conversion must not alter a single character of prose.
- Future requirement to design in NOW (from `docs/content-roadmap.md`): the
  planned funnel articles need an embedded product **screenshot/image block**
  and a **workflow-specific CTA block**. The schema must include both even
  though no current post uses them.

## Commands you will need

| Purpose   | Command              | Expected on success |
|-----------|----------------------|---------------------|
| Tests     | `npm test`           | all pass            |
| Typecheck | `npm run typecheck` (or `npx tsc --noEmit`) | exit 0 |
| Build     | `npm run build`      | 11 article routes prerender |
| E2E       | `npm run e2e`        | all pass            |

## Scope

**In scope**:
- `src/content/resources/schema.ts` (create — block types + zod validators)
- `src/content/resources/blocks/*.json` or `src/content/resources/posts-data.ts` (create — converted bodies; choose JSON files, one per slug)
- `src/components/marketing/resources/RenderBlocks.tsx` (create)
- `src/content/resources/posts/*.tsx` + `posts/index.ts` (DELETE at the end, only after fidelity is proven)
- `src/app/resources/[slug]/page.tsx`
- `src/app/resources/page.tsx`
- `src/components/marketing/homepage/MarketingRoutePages.tsx` (`MarketingResources` gets a `sections` prop)
- `src/components/marketing/homepage/CopyDrift.test.tsx`, `MarketingHome.test.tsx` (update render calls to pass fixture data = the real registry data)
- `src/content/resources/registry.test.ts` (create)
- `src/components/marketing/resources/ArticleFidelity.test.tsx` (create, then becomes the permanent characterization suite)
- `scripts/convert-posts.mjs` (create — one-shot converter, kept for reference)

**Out of scope**:
- Any Supabase code, env var, or dependency (plan 016).
- `GuideArticle`'s visual markup and the article CSS.
- COPY.md and every user-facing string.
- The 6 unported registry entries and their redirects in `next.config.ts`.

## Git workflow

- Branch: `claude/015-portable-content`
- Commit per step. Do NOT push or merge without owner review. The final
  rendered pages must be byte-identical, so this is reviewable as "tests
  prove no change".

## Steps

### Step 1: Characterization baseline BEFORE anything changes

Create `src/components/marketing/resources/ArticleFidelity.test.tsx`: for
each of the 11 slugs, render the CURRENT
`<GuideArticle ...meta><Body /></GuideArticle>` with React Testing Library
and snapshot `container.innerHTML` (vitest `toMatchSnapshot()`, one snapshot
per slug). Also assert non-empty text > 1000 chars per article. Commit the
snapshots.

**Verify**: `npm test` → 11 new snapshots written and passing. Run twice →
deterministic.

### Step 2: Define the block schema

Create `src/content/resources/schema.ts` with zod (already a dependency —
`package.json` has `zod ^3.25.76`):

```ts
export type InlineRun = string | { b: string } | { i: string } | { a: { text: string; href: string } } | { br: true };
export type Block =
  | { type: "p"; runs: InlineRun[] }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; ordered: boolean; items: InlineRun[][] }
  | { type: "callout"; title?: string; runs: InlineRun[] }
  | { type: "blockquote"; runs: InlineRun[] }
  | { type: "divider" }
  | { type: "image"; src: string; alt: string; caption?: string }   // roadmap: funnel articles
  | { type: "cta"; label: string; href: string; workflow?: string }; // roadmap: funnel articles
```

plus `blockSchema`/`postBodySchema` zod validators mirroring the types, and
a `parsePostBody(json: unknown)` that throws with the slug + block index on
failure. Nested inline runs cover the corpus's `strong`/`em`/`GuideLink`/`br`
usage; if during Step 4 you find a construct this cannot express (e.g. a
link inside a bold inside a list item), extend `InlineRun` minimally and
note it — do NOT flatten to HTML strings.

**Verify**: `npm run typecheck` → exit 0.

### Step 3: Write the renderer

Create `src/components/marketing/resources/RenderBlocks.tsx`:
`export function RenderBlocks({ blocks }: { blocks: Block[] })` mapping 1:1
onto the existing primitives — `p`→`GuideP`, `h2`→`GuideH2`, `h3`→`GuideH3`,
`list`→`GuideList` (respect `ordered`), `callout`→`GuideCallout`,
`blockquote`→`GuideBlockquote`, `divider`→`GuideDivider`, inline `a`→
`GuideLink`, `b`→`<strong>`, `i`→`<em>`, `br`→`<br />`. `image`/`cta` render
with the existing article CSS classes if suitable ones exist, else minimal
new classes `mh-article-image` / `mh-article-cta` (add CSS only if you must,
matching the article block patterns around `.mh-article-callout`). Import
the primitives from wherever the current posts import them.

**Verify**: `npm run typecheck` → exit 0.

### Step 4: Convert the 11 posts and prove losslessness

Write `scripts/convert-posts.mjs` OR convert by hand — either way the
acceptance is mechanical, not trust: for each slug produce
`src/content/resources/blocks/<slug>.json`. Then extend
`ArticleFidelity.test.tsx`: render `<GuideArticle ...><RenderBlocks blocks={parsed} /></GuideArticle>`
and assert its `container.innerHTML` **equals the Step-1 snapshot** for that
slug (compare against the same snapshot, not a new one). Whitespace-only
HTML differences from JSX formatting are acceptable ONLY via a
normalize-then-compare helper that collapses runs of whitespace between tags
— never inside text nodes.

Add a loader `src/content/resources/blocks/index.ts` exporting
`getPostBlocks(slug): Block[] | undefined` (static JSON imports, validated
through `parsePostBody` at module load).

**Verify**: `npm test` → all 11 fidelity comparisons pass. This is the
plan's core gate; do not proceed on a single mismatch you can't explain as
tag-boundary whitespace.

### Step 5: Switch the route, delete the TSX posts

In `src/app/resources/[slug]/page.tsx` replace the `postComponents` lookup
with `getPostBlocks(slug)` and render `<RenderBlocks blocks={blocks} />`.
Delete `src/content/resources/posts/*.tsx` and `posts/index.ts`. Update
`ArticleFidelity.test.tsx` to drop the old-component side (the snapshots
remain as the fixed baseline; the RenderBlocks side keeps asserting against
them — that's the permanent characterization suite).

**Verify**: `npm run build` → all 11 `/resources/*` routes still prerender
(the build output lists them). `npm test && npm run e2e` → pass.

### Step 6: Split data from view on `/resources`

In `MarketingRoutePages.tsx`, change `MarketingResources()` to
`MarketingResources({ sections }: { sections: Array<{ category: ResourceCategory; posts: ResourcePost[] }> })`
— move the `categoryOrder.map(...getByCategory...)` construction into
`src/app/resources/page.tsx` (which stays synchronous today, becomes async
in plan 016 without touching the view). Provide
`export function buildResourceSections()` in the registry so the route and
the tests share the same builder. Update `CopyDrift.test.tsx`'s
`SWEPT_PAGES` entry and `MarketingHome.test.tsx` to render
`<MarketingResources sections={buildResourceSections()} />`.

**Verify**: `npm test` → the never-say/em-dash sweeps still cover
`/resources` (confirm the swept text still contains a known article excerpt,
e.g. grep the test output or add an explicit `expect(text).toContain("Guides")`).
`npm run build` → pass.

### Step 7: Registry contract tests

Create `src/content/resources/registry.test.ts` asserting:
1. Bijection: the set of `blocks/*.json` slugs === the set of
   `portedResources` slugs.
2. Every `related` slug resolves via `getResource` (dangling refs fail).
3. Every category in `categoryOrder` has `categoryMeta`, and each
   `categoryMeta.description` appears verbatim in `COPY.md` (read the file
   like `CopyDrift.test.tsx` does).
4. Every block file parses through `parsePostBody` (already implicit via the
   loader, but assert explicitly so a bad JSON fails with a named slug).

**Verify**: `npm test` → all pass. Plant a dangling `related` slug → test
fails naming it; revert.

### Step 8: Full gate

**Verify**: `npm test && npm run lint && npm run typecheck && npm run build && npm run e2e` → all green. `git status` → in-scope files only. The site renders identically: spot-check two articles in the browser against production/preview.

## Test plan

- `ArticleFidelity.test.tsx` — the load-bearing suite: 11 old-vs-new HTML
  equality assertions, then the permanent blocks-vs-baseline suite.
- `registry.test.ts` — the contract the Supabase migration will be diffed
  against (bijection, related-links, category meta ↔ COPY.md).
- Updated `CopyDrift.test.tsx` / `MarketingHome.test.tsx` — prove the
  copy-law harness survives the props refactor.

## Done criteria

- [ ] `src/content/resources/posts/` no longer exists; `blocks/*.json` (11 files) + `RenderBlocks` render every article
- [ ] All 11 fidelity assertions pass against the pre-conversion snapshots
- [ ] `MarketingResources` takes `sections` as props; CopyDrift sweep still covers it
- [ ] `registry.test.ts` passes and catches planted violations
- [ ] Full gate green; only in-scope files modified; `plans/README.md` updated

## STOP conditions

- A post uses a JSX construct the schema can't express after one minimal
  `InlineRun` extension — report the construct and the slug.
- Any fidelity comparison fails on non-whitespace content.
- The CopyDrift sweep's coverage of `/resources` can't be preserved without
  weakening an assertion — report; never delete or loosen a copy-law test.
- You are tempted to install `@supabase/supabase-js`, MDX, or any new
  runtime dependency — out of scope (zod is already present; nothing else
  is needed).

## Maintenance notes

- The JSON block files are now the exact shape of the future `posts.body`
  column (jsonb). Plan 016 seeds Supabase from them and the fidelity suite
  becomes the migration's acceptance test.
- The `image`/`cta` block types are deliberately unused today — the
  content-roadmap's funnel articles will exercise them; renderer support
  ships now so the CMS never needs a redeploy for a new article that uses them.
- Reviewer focus: the deleted TSX vs generated JSON — the fidelity suite is
  the proof, so review IT (does the normalization helper only touch
  inter-tag whitespace?), not the 11 diffs.
