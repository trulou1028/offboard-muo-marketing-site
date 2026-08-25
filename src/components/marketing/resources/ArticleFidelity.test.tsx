import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getResource, portedResources } from "@/content/resources/registry";
import { postComponents } from "@/content/resources/posts";

import { GuideArticle } from "./GuideArticle";

// Characterization baseline for plan 015 (make article content portable).
//
// This snapshot file is the acceptance oracle for the whole plan: it was
// captured from the CURRENT, hand-written src/content/resources/posts/*.tsx
// components before any block-schema conversion happened. Once the posts are
// converted to JSON blocks + RenderBlocks (and the *.tsx files deleted), this
// test switches to rendering the RenderBlocks side and keeps asserting
// against the exact same recorded snapshots — so the describe/it titles
// below must never change, or vitest will treat it as a new snapshot instead
// of comparing against the frozen baseline.
describe.each(portedResources.map((post) => post.slug))("article fidelity: %s", (slug) => {
  it("matches the pre-conversion baseline and has substantial body text", () => {
    const post = getResource(slug);
    if (!post) throw new Error(`registry has no entry for ${slug}`);
    const Body = postComponents[slug];
    if (!Body) throw new Error(`postComponents has no entry for ${slug}`);

    const { container } = render(
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

    expect(container.textContent?.length ?? 0).toBeGreaterThan(1000);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
