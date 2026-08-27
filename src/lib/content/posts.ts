import "server-only";

import { getPostBlocks } from "@/content/resources/blocks";
import {
  buildResourceSections,
  categoryMeta,
  categoryOrder,
  getResource,
  portedResources,
  type ResourceCategory,
  type ResourcePost,
  type ResourceSection,
} from "@/content/resources/registry";
import { parsePostBody, type Block } from "@/content/resources/schema";

import { supabaseSelect } from "./supabase-read";

// The CMS data layer (plan 016 step 3): getPublishedPosts(), getPostBySlug(),
// getCategories(). Each tries the database first (through the read-only anon
// client in supabase-read.ts) and falls back to the committed
// registry.ts + blocks/*.json content — unchanged since plan 013/015 — when
// the env vars are absent or the fetch fails. This is the ONLY place that
// decision is made; src/app/resources/page.tsx and
// src/app/resources/[slug]/page.tsx just call these functions and never
// know which source answered. See docs/cms-architecture.md contract 1
// ("Rendering contract") for why the fallback is not optional: CI builds
// with no Supabase credentials configured, and a build-time fetch failure
// must never fail the build.

// ------------------------------------------------------------- Row shapes

// As returned by PostgREST for supabase/migrations/20260825120000_create_cms_posts.sql's
// `categories` / `posts` tables.
type CategoryRow = {
  slug: string;
  name: string;
  description: string;
  sort_order: number;
};

type PostListRow = {
  slug: string;
  title: string;
  category_slug: string;
  excerpt: string;
  reading_time: string;
  date: string | null;
  author_name: string | null;
  author_role: string | null;
  guest_author: { name: string; bio: string; company: string; url: string } | null;
  related: string[] | null;
  status: "draft" | "published" | "retired";
  sort_order: number;
};

type PostRowWithBody = PostListRow & { body: unknown };

const POST_LIST_COLUMNS =
  "slug,title,category_slug,excerpt,reading_time,date,author_name,author_role,guest_author,related,status,sort_order";

// -------------------------------------------------------- Source logging

// One line per process, naming which content source answered — checked in
// build output by plan 016 step 3's verification ("posts: db" vs
// "posts: fallback"). Not per-call: a build touches this dozens of times
// (once per prerendered route) and the interesting fact is which path the
// process is on, not each individual call.
let loggedSource = false;
function logSource(source: "db" | "fallback"): void {
  if (loggedSource) return;
  loggedSource = true;
  console.log(`posts: ${source}`);
}

// Plan 019. Falling back is two different events wearing one coat, and until
// now both were silent:
//
//   not-configured  no credentials at all. CI builds this way on purpose and
//                   so does a fresh clone, so it must stay quiet.
//   fetch-failed    credentials ARE set and the database refused us or could
//                   not be reached. That is a defect, not a mode.
//
// The second one shipped undetected: plan 016's migration was never pushed,
// so production had no `posts` table, every read 404'd, and the site served
// committed content looking perfectly healthy. `supabaseSelect` already draws
// this distinction; this module used to throw it away.
//
// `supabaseSelect` only ever returns "fetch-failed" when credentials exist,
// so that reason alone is the whole signal -- no separate env check needed.
let reportedUnreachable = false;

/**
 * Exported for tests only. Vitest gives each test file a fresh module
 * registry, but a single file exercising several states needs the latches
 * cleared between cases.
 */
export function __resetContentSourceLatches(): void {
  loggedSource = false;
  reportedUnreachable = false;
}

function reportFallback(reason: "not-configured" | "fetch-failed"): void {
  if (reason === "not-configured") return;

  if (!reportedUnreachable) {
    reportedUnreachable = true;
    console.error(
      "posts: database is CONFIGURED BUT UNREACHABLE - serving committed fallback. " +
        "This is not a supported production state. Check that public.posts and " +
        "public.categories exist (the migration may never have been pushed) and that " +
        "the anon role holds both a select grant and an RLS policy.",
    );
  }

  // Fail the build rather than bake fallback content into a deployment whose
  // configuration claims a database. At request time we do NOT throw: serving
  // slightly stale committed content beats returning a 500 to a reader.
  // `next build` sets NEXT_PHASE itself -- verified in the installed copy at
  // node_modules/next/dist/build/index.js, which assigns PHASE_PRODUCTION_BUILD
  // and compares against this same literal internally.
  if (process.env.NEXT_PHASE === "phase-production-build") {
    throw new Error(
      "Refusing to prerender /resources from the committed fallback while Supabase " +
        "credentials are configured. Either the CMS migration was never pushed, or " +
        "the anon grant/RLS is wrong. See plans/019-cms-production-gap.md.",
    );
  }
}

// ------------------------------------------------------------ DB fetchers

async function fetchCategoryRows(): Promise<CategoryRow[] | undefined> {
  const result = await supabaseSelect<CategoryRow>(
    "categories",
    "select=slug,name,description,sort_order&order=sort_order.asc",
  );
  if (result.ok) return result.data;
  reportFallback(result.reason);
  return undefined;
}

async function fetchPostListRows(): Promise<PostListRow[] | undefined> {
  // Plan 019: `sort_order` carries registry.ts's curated sequence into the
  // database. Ordering by title instead put the Guides section's lead
  // article seventh -- see the migration comment.
  const result = await supabaseSelect<PostListRow>(
    "posts",
    `select=${POST_LIST_COLUMNS}&order=sort_order.asc,title.asc`,
  );
  if (result.ok) return result.data;
  reportFallback(result.reason);
  return undefined;
}

// Distinguishes "the fetch succeeded but no row matched" (a real answer —
// the slug is unknown, or the RLS policy hid a draft row) from "the fetch
// itself failed" (fall back to committed content instead). Collapsing both
// to `undefined` would make a transient network error on this one request
// look identical to a genuinely nonexistent slug, and 404 a real published
// post instead of falling back — see getPostBySlug below.
async function fetchPostRowBySlug(slug: string): Promise<{ ok: true; row: PostRowWithBody | undefined } | { ok: false }> {
  const result = await supabaseSelect<PostRowWithBody>(
    "posts",
    `select=${POST_LIST_COLUMNS},body&slug=eq.${encodeURIComponent(slug)}&limit=1`,
  );
  if (result.ok) return { ok: true, row: result.data[0] };
  reportFallback(result.reason);
  return { ok: false };
}

// --------------------------------------------------------------- Mapping

function categoryNameFromSlug(categoryRows: CategoryRow[], categorySlug: string): ResourceCategory {
  const match = categoryRows.find((row) => row.slug === categorySlug);
  // Falls back to the raw slug if a post ever references a category slug
  // this fetch didn't return (shouldn't happen: category_slug is a foreign
  // key). Better to render an odd label than to drop the post entirely.
  return (match?.name ?? categorySlug) as ResourceCategory;
}

function rowToResourcePost(row: PostListRow, category: ResourceCategory): ResourcePost {
  return {
    slug: row.slug,
    title: row.title,
    category,
    excerpt: row.excerpt,
    readingTime: row.reading_time,
    date: row.date ?? undefined,
    author: row.author_name && row.author_role ? { name: row.author_name, role: row.author_role } : undefined,
    guestAuthor: row.guest_author ?? undefined,
    related: row.related ?? undefined,
    ported: row.status === "published",
  };
}

// ------------------------------------------------------------- Public API

/** Published posts only — the set that gets a real, prerendered route. */
export async function getPublishedPosts(): Promise<ResourcePost[]> {
  const categoryRows = await fetchCategoryRows();
  const postRows = categoryRows ? await fetchPostListRows() : undefined;

  if (categoryRows && postRows) {
    logSource("db");
    return postRows
      .filter((row) => row.status === "published")
      .map((row) => rowToResourcePost(row, categoryNameFromSlug(categoryRows, row.category_slug)));
  }

  logSource("fallback");
  return portedResources;
}

/** All 4 categories, in display order. */
export async function getCategories(): Promise<
  Array<{ slug: string; name: ResourceCategory; description: string; sortOrder: number }>
> {
  const categoryRows = await fetchCategoryRows();

  if (categoryRows) {
    logSource("db");
    return categoryRows.map((row) => ({
      slug: row.slug,
      name: row.name as ResourceCategory,
      description: row.description,
      sortOrder: row.sort_order,
    }));
  }

  logSource("fallback");
  return categoryOrder.map((name, index) => ({
    slug: name,
    name,
    description: categoryMeta[name].description,
    sortOrder: index,
  }));
}

/** The /resources hub's category sections, in display order. */
export async function getResourceSections(): Promise<ResourceSection[]> {
  const categoryRows = await fetchCategoryRows();
  const postRows = categoryRows ? await fetchPostListRows() : undefined;

  if (categoryRows && postRows) {
    logSource("db");
    const published = postRows.filter((row) => row.status === "published");
    return [...categoryRows]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((categoryRow) => ({
        category: categoryRow.name as ResourceCategory,
        posts: published
          .filter((row) => row.category_slug === categoryRow.slug)
          .map((row) => rowToResourcePost(row, categoryRow.name as ResourceCategory)),
      }))
      .filter((section) => section.posts.length > 0);
  }

  logSource("fallback");
  return buildResourceSections();
}

export type PostLookup =
  | { kind: "published"; post: ResourcePost; body: Block[] }
  | { kind: "retired" }
  | { kind: "not-found" };

/**
 * Looks up a single post by slug for the article route, distinguishing
 * "published" (render it), "retired" (permanentRedirect to /resources —
 * owner decision 3, docs/cms-architecture.md "Decisions" #3) and
 * "not-found" (unknown slug OR a draft — notFound() either way, since a
 * draft must never be distinguishable from a slug that doesn't exist at
 * all).
 */
export async function getPostBySlug(slug: string): Promise<PostLookup> {
  const categoryRows = await fetchCategoryRows();
  const postResult = categoryRows ? await fetchPostRowBySlug(slug) : undefined;

  if (categoryRows && postResult?.ok) {
    logSource("db");
    const row = postResult.row;
    // No row: genuinely unknown slug, or a draft — the anon RLS policy
    // already excludes 'draft' rows entirely (see the migration's policy
    // comment), so a draft slug reaches this exact branch too. Either way,
    // notFound() is correct and the two cases are indistinguishable to the
    // reader on purpose.
    if (!row) return { kind: "not-found" };
    if (row.status === "draft") return { kind: "not-found" };
    if (row.status === "retired") return { kind: "retired" };
    const category = categoryNameFromSlug(categoryRows, row.category_slug);
    return { kind: "published", post: rowToResourcePost(row, category), body: parsePostBody(row.body, slug) };
  }

  // Either categories failed to load, or the single-post fetch itself
  // failed (network/5xx) — not "the DB said no such post". Fall back to
  // committed content rather than risk 404-ing a real published post.
  logSource("fallback");
  const post = getResource(slug);
  if (!post) return { kind: "not-found" };
  if (!post.ported) return { kind: "retired" };
  const blocks = getPostBlocks(slug);
  if (!blocks) return { kind: "not-found" };
  return { kind: "published", post, body: blocks };
}
