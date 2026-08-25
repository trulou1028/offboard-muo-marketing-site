import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { blockSlugs, getPostBlocks } from "./blocks";
import { parsePostBody } from "./schema";
import { categoryMeta, categoryOrder, getResource, portedResources, resources } from "./registry";

// COPY.md is read once from the repo root, same technique as
// CopyDrift.test.tsx (tests run with process.cwd() at the repo root per
// vitest.config.ts).
const COPY_DOC = readFileSync(path.join(process.cwd(), "COPY.md"), "utf8");

describe("registry <-> blocks bijection", () => {
  it("every ported slug has a converted block file, and vice versa", () => {
    const portedSlugs = new Set(portedResources.map((post) => post.slug));
    const blockSlugSet = new Set(blockSlugs);

    const missingBlocks = [...portedSlugs].filter((slug) => !blockSlugSet.has(slug));
    const orphanBlocks = [...blockSlugSet].filter((slug) => !portedSlugs.has(slug));

    expect(missingBlocks, `ported slugs with no blocks/*.json file: ${missingBlocks.join(", ")}`).toEqual([]);
    expect(orphanBlocks, `blocks/*.json files with no ported registry entry: ${orphanBlocks.join(", ")}`).toEqual(
      [],
    );
  });
});

describe("registry related-slug integrity", () => {
  it("every related slug resolves to a real registry entry", () => {
    const dangling: string[] = [];
    for (const post of resources) {
      for (const relatedSlug of post.related ?? []) {
        if (!getResource(relatedSlug)) {
          dangling.push(`${post.slug} -> ${relatedSlug}`);
        }
      }
    }
    expect(dangling, `dangling related-slug references: ${dangling.join(", ")}`).toEqual([]);
  });
});

describe("category metadata matches COPY.md", () => {
  it.each(categoryOrder)("%s has categoryMeta whose description appears verbatim in COPY.md", (category) => {
    const meta = categoryMeta[category];
    expect(meta, `categoryOrder entry "${category}" has no categoryMeta`).toBeDefined();
    expect(
      COPY_DOC,
      `categoryMeta["${category}"].description not found verbatim in COPY.md: ${meta.description}`,
    ).toContain(meta.description);
  });
});

describe("every converted block file parses", () => {
  it.each(portedResources.map((post) => post.slug))("%s's blocks parse through parsePostBody", (slug) => {
    const blocks = getPostBlocks(slug);
    expect(blocks, `getPostBlocks(${slug}) returned undefined`).toBeDefined();
    // Re-parsing already-parsed blocks is deliberate: it asserts the loader
    // did not silently swallow a validation failure, and gives a slug-named
    // failure if it did (see parsePostBody's error message).
    expect(() => parsePostBody(blocks, slug)).not.toThrow();
  });
});
