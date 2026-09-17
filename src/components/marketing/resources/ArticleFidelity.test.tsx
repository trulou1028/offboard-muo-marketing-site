import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getPostBlocks } from "@/content/resources/blocks";
import { getResource, portedResources } from "@/content/resources/registry";

import { GuideArticle } from "./GuideArticle";
import { RenderBlocks } from "./RenderBlocks";

const PRE_CONVERSION_BASELINE_SLUGS = [
  "7-levels-ai-agent-capability",
  "best-job-application-trackers-2026",
  "career-changers-guide-to-job-offer-negotiations",
  "first-week-after-a-layoff",
  "health-insurance-after-a-layoff",
  "how-ai-is-changing-the-job-search-in-2026",
  "how-to-announce-a-layoff-on-linkedin",
  "negotiating-your-severance",
  "rebuild-your-resume-after-a-layoff",
  "what-is-an-ai-agent",
  "will-employers-know-cover-letter-is-ai",
] as const;

// Characterization baseline for plan 015 (make article content portable).
//
// This snapshot file is the permanent acceptance oracle for the plan: it was
// captured from the CURRENT, hand-written src/content/resources/posts/*.tsx
// components (step 1), before any block-schema conversion existed. Step 4
// proved the JSON blocks + RenderBlocks reproduced that exact same DOM by
// rendering both sides in one test and diffing them directly. Now that the
// *.tsx files are deleted (step 5), this test renders only the RenderBlocks
// side and keeps asserting it against the same frozen snapshot via
// toMatchSnapshot() — the describe/it titles below must never change, or
// vitest would treat it as a new snapshot instead of comparing against the
// frozen baseline, silently defeating the whole point of this file.
//
// Whitespace-only differences BETWEEN tags would be tolerated (JSX
// formatting is allowed to differ) via normalizeBetweenTags below, but in
// practice React's rendered DOM never has whitespace-only text nodes
// between adjacent tags, so this is a no-op safety net, not a loosened
// comparison — whitespace inside text nodes is never touched either way.
function normalizeBetweenTags(html: string): string {
  return html.replace(/>\s+</g, "><").trim();
}

// The shell's dropdown navigation (plan 037) generates React useId() values
// like `_r_7_`. They are stable for a given render tree and meaningless to
// this baseline, but they renumber whenever anything upstream in the tree
// changes, which would churn all 11 snapshots for a reason that has nothing
// to do with article fidelity. Collapsed to a constant so the baseline keeps
// asserting what it exists to assert.
function normalizeReactIds(html: string): string {
  return html.replace(/_[rR]_[a-z0-9]+_/g, "_reactId_");
}

describe.each(PRE_CONVERSION_BASELINE_SLUGS)("article fidelity: %s", (slug) => {
  it("matches the pre-conversion baseline and has substantial body text", () => {
    const post = getResource(slug);
    if (!post) throw new Error(`registry has no entry for ${slug}`);
    const blocks = getPostBlocks(slug);
    if (!blocks) throw new Error(`getPostBlocks has no entry for ${slug}`);

    const { container } = render(
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

    expect(container.textContent?.length ?? 0).toBeGreaterThan(1000);
    expect(normalizeReactIds(normalizeBetweenTags(container.innerHTML))).toMatchSnapshot();
  });
});

describe("founder essay imports", () => {
  const essays = portedResources.filter((post) => post.category === "Essays");

  it("publishes all six essays with substantial portable bodies", () => {
    expect(essays).toHaveLength(6);
    for (const essay of essays) {
      const blocks = getPostBlocks(essay.slug);
      expect(blocks, `${essay.slug} has no portable body`).toBeDefined();
      expect(JSON.stringify(blocks).length, `${essay.slug} body appears truncated`).toBeGreaterThan(1000);
      const { container, unmount } = render(<RenderBlocks blocks={blocks ?? []} />);
      expect(container.textContent?.length ?? 0, `${essay.slug} rendered body appears truncated`).toBeGreaterThan(
        1000,
      );
      unmount();
    }
  });
});
