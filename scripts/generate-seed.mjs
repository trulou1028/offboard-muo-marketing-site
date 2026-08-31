#!/usr/bin/env node
/**
 * Generates supabase/seed.sql from src/content/resources/registry.ts and its
 * blocks/*.json bodies (plan 016, step 2).
 *
 * registry.ts is TypeScript, so it can't be `import`ed directly by a plain
 * .mjs script. This transpiles it with the TypeScript compiler API (already
 * a devDependency; the same technique scripts/convert-posts.mjs uses to read
 * source under src/content/resources) to a temp file, then dynamic-imports
 * that to get the real runtime values of `resources`, `categoryMeta`, and
 * `categoryOrder` — not a hand-copied duplicate of them, so this script
 * cannot drift from the registry it reads.
 *
 * Status mapping (see docs/cms-architecture.md "Decisions" #3 and the
 * migration file's policy comment): a `ported: true` entry becomes
 * `published` with its body from blocks/<slug>.json. A `ported: false`
 * entry becomes `retired`, not `draft` — these 7 slugs are the site's
 * existing unported essays/policy pieces, which next.config.ts currently
 * 301-redirects to /resources today (plan 013). Seeding them as `retired`
 * (body: []) preserves that redirect behavior once plan 016 step 4 deletes
 * the per-slug next.config.ts entries in favor of route-level status
 * handling; seeding them as `draft` would silently turn a 301 into a 404 the
 * moment that config is deleted, which is not this plan's intent. `draft` is
 * left for future posts authored directly in the Supabase dashboard that
 * have no existing public URL to preserve — none exist in the current
 * corpus, so the seed produces zero draft rows.
 *
 * Usage: node scripts/generate-seed.mjs
 * Output: supabase/seed.sql (overwritten every run — do not hand-edit it).
 */

import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const REGISTRY_PATH = path.join(ROOT, "src", "content", "resources", "registry.ts");
const BLOCKS_DIR = path.join(ROOT, "src", "content", "resources", "blocks");
const SEED_PATH = path.join(ROOT, "supabase", "seed.sql");

// ---------------------------------------------------------- Load registry.ts

async function loadRegistry() {
  const source = readFileSync(REGISTRY_PATH, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });

  const tmpDir = mkdtempSync(path.join(os.tmpdir(), "generate-seed-"));
  const tmpFile = path.join(tmpDir, "registry.mjs");
  writeFileSync(tmpFile, outputText);
  try {
    return await import(pathToFileURL(tmpFile).href);
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

// --------------------------------------------------------------- SQL helpers

function sqlString(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

function sqlStringOrNull(value) {
  return value === undefined || value === null ? "null" : sqlString(value);
}

function sqlJsonbOrNull(value) {
  return value === undefined || value === null ? "null" : `${sqlString(JSON.stringify(value))}::jsonb`;
}

function sqlTextArrayOrNull(values) {
  if (!values || values.length === 0) return "null";
  return `ARRAY[${values.map(sqlString).join(", ")}]::text[]`;
}

// slug used as the categories primary key. Matches the 4 category names
// exactly (kebab-cased); stable and deterministic given the fixed,
// migration-reviewed category set (docs/cms-architecture.md "Decisions" #4).
function categorySlug(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ------------------------------------------------------------------- Build

async function main() {
  const { resources, categoryMeta, categoryOrder } = await loadRegistry();

  const categoryRows = categoryOrder.map((name, index) => ({
    slug: categorySlug(name),
    name,
    description: categoryMeta[name].description,
    sort_order: index,
  }));
  const categorySlugByName = new Map(categoryRows.map((row) => [row.name, row.slug]));

  const postRows = resources.map((post, index) => {
    const status = post.ported ? "published" : "retired";
    const body = post.ported
      ? JSON.parse(readFileSync(path.join(BLOCKS_DIR, `${post.slug}.json`), "utf8"))
      : [];
    return {
      slug: post.slug,
      title: post.title,
      category_slug: categorySlugByName.get(post.category),
      excerpt: post.excerpt,
      reading_time: post.readingTime,
      date: post.date ?? null,
      author_name: post.author?.name ?? null,
      author_role: post.author?.role ?? null,
      guest_author: post.guestAuthor ?? null,
      related: post.related ?? null,
      status,
      body,
      // Plan 019: registry order is the curated order. Carrying the array
      // index into the row is what stops the database re-sorting the
      // library alphabetically.
      sort_order: index,
    };
  });

  const lines = [];
  lines.push("-- Generated by scripts/generate-seed.mjs from src/content/resources/registry.ts");
  lines.push("-- and its blocks/*.json bodies. Do not hand-edit; re-run the script instead.");
  lines.push("--");
  lines.push(
    `-- ${categoryRows.length} categories, ${postRows.length} posts ` +
      `(${postRows.filter((r) => r.status === "published").length} published, ` +
      `${postRows.filter((r) => r.status === "retired").length} retired, ` +
      `${postRows.filter((r) => r.status === "draft").length} draft).`,
  );
  lines.push("");
  lines.push("insert into public.categories (slug, name, description, sort_order) values");
  lines.push(
    categoryRows
      .map(
        (row, index) =>
          `  (${sqlString(row.slug)}, ${sqlString(row.name)}, ${sqlString(row.description)}, ${row.sort_order})${
            index === categoryRows.length - 1 ? ";" : ","
          }`,
      )
      .join("\n"),
  );
  lines.push("");
  lines.push(
    "insert into public.posts (slug, title, category_slug, excerpt, reading_time, date, author_name, author_role, guest_author, related, status, body, sort_order) values",
  );
  lines.push(
    postRows
      .map((row, index) => {
        const values = [
          sqlString(row.slug),
          sqlString(row.title),
          sqlString(row.category_slug),
          sqlString(row.excerpt),
          sqlString(row.reading_time),
          sqlStringOrNull(row.date),
          sqlStringOrNull(row.author_name),
          sqlStringOrNull(row.author_role),
          sqlJsonbOrNull(row.guest_author),
          sqlTextArrayOrNull(row.related),
          sqlString(row.status),
          `${sqlString(JSON.stringify(row.body))}::jsonb`,
          `${row.sort_order}`,
        ];
        return `  (${values.join(", ")})${index === postRows.length - 1 ? ";" : ","}`;
      })
      .join("\n"),
  );
  lines.push("");

  writeFileSync(SEED_PATH, lines.join("\n"));

  console.log(
    `Wrote ${SEED_PATH}: ${categoryRows.length} categories, ${postRows.length} posts ` +
      `(${postRows.filter((r) => r.status === "published").length} published, ` +
      `${postRows.filter((r) => r.status === "retired").length} retired).`,
  );
}

await main();
