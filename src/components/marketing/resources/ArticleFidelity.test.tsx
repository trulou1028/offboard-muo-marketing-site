import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getPostBlocks } from "@/content/resources/blocks";
import { getResource, portedResources } from "@/content/resources/registry";
import { postComponents } from "@/content/resources/posts";

import { GuideArticle } from "./GuideArticle";
import { RenderBlocks } from "./RenderBlocks";

// Characterization baseline for plan 015 (make article content portable).
//
// This snapshot file is the acceptance oracle for the whole plan: it was
// captured from the CURRENT, hand-written src/content/resources/posts/*.tsx
// components before any block-schema conversion happened (step 1). Step 4
// added the second render below, proving the JSON blocks + RenderBlocks
// reproduce that exact same DOM. Once the *.tsx files are deleted (step 5),
// this test drops the old-component render and keeps asserting the
// RenderBlocks side against the same frozen snapshot — so the describe/it
// titles below must never change, or vitest would treat it as a new
// snapshot instead of comparing against the frozen baseline.
//
// Whitespace-only differences BETWEEN tags are tolerated (JSX formatting is
// allowed to differ); whitespace inside text nodes is never touched.
function normalizeBetweenTags(html: string): string {
  return html.replace(/>\s+</g, "><").trim();
}

describe.each(portedResources.map((post) => post.slug))("article fidelity: %s", (slug) => {
  it("matches the pre-conversion baseline and has substantial body text", () => {
    const post = getResource(slug);
    if (!post) throw new Error(`registry has no entry for ${slug}`);
    const Body = postComponents[slug];
    if (!Body) throw new Error(`postComponents has no entry for ${slug}`);

    const { container: oldContainer } = render(
      <GuideArticle
        category={post.category}
        title={post.title}
        readingTime={post.readingTime}
        date={post.date}
        author={post.author}
        guestAuthor={post.guestAuthor}
      >
        <Body />
      </GuideArticle>,
    );

    expect(oldContainer.textContent?.length ?? 0).toBeGreaterThan(1000);
    expect(oldContainer.innerHTML).toMatchSnapshot();

    const blocks = getPostBlocks(slug);
    if (!blocks) throw new Error(`getPostBlocks has no entry for ${slug}`);

    const { container: newContainer } = render(
      <GuideArticle
        category={post.category}
        title={post.title}
        readingTime={post.readingTime}
        date={post.date}
        author={post.author}
        guestAuthor={post.guestAuthor}
      >
        <RenderBlocks blocks={blocks} />
      </GuideArticle>,
    );

    expect(normalizeBetweenTags(newContainer.innerHTML)).toBe(normalizeBetweenTags(oldContainer.innerHTML));
  });
});
