import type { ReactNode } from "react";

import type { Block, InlineRun } from "@/content/resources/schema";

import {
  GuideBlockquote,
  GuideCallout,
  GuideDivider,
  GuideH2,
  GuideH3,
  GuideLink,
  GuideList,
  GuideP,
} from "./GuideArticle";

// Renders the portable block schema (src/content/resources/schema.ts) using
// the same Guide* primitives the original hand-written post components used,
// so the produced DOM matches theirs exactly (see ArticleFidelity.test.tsx).
//
// Inline runs render as a flat list of nodes (no wrapping element per run),
// matching how the hand-written posts passed JSX expressions/fragments as
// children directly to GuideP/GuideList item/GuideCallout/GuideBlockquote.

function renderInlineRun(run: InlineRun, key: number): ReactNode {
  if (typeof run === "string") {
    return run;
  }
  if ("br" in run) {
    return <br key={key} />;
  }
  if ("b" in run) {
    return (
      <strong key={key} className="font-semibold text-foreground">
        {renderRunsFlat(run.b)}
      </strong>
    );
  }
  if ("i" in run) {
    return (
      <em key={key} className="italic">
        {renderRunsFlat(run.i)}
      </em>
    );
  }
  if ("code" in run) {
    return <code key={key}>{run.code}</code>;
  }
  if ("list" in run) {
    return (
      <GuideList
        key={key}
        ordered={run.list.ordered}
        items={run.list.items.map((runs) => renderRunsFlat(runs))}
      />
    );
  }
  // "a" in run
  return (
    <GuideLink key={key} href={run.a.href}>
      {run.a.text}
    </GuideLink>
  );
}

// Renders an InlineRun[] as a flat array of ReactNode children.
function renderRunsFlat(runs: InlineRun[]): ReactNode {
  return runs.map((run, index) => renderInlineRun(run, index));
}

export function RenderBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <RenderBlock key={index} block={block} />
      ))}
    </>
  );
}

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <GuideP>{renderRunsFlat(block.runs)}</GuideP>;
    case "h2":
      return <GuideH2 id={block.id}>{block.text}</GuideH2>;
    case "h3":
      return <GuideH3>{block.text}</GuideH3>;
    case "list":
      return (
        <GuideList ordered={block.ordered} items={block.items.map((runs) => renderRunsFlat(runs))} />
      );
    case "callout":
      return <GuideCallout title={block.title ?? ""}>{renderRunsFlat(block.runs)}</GuideCallout>;
    case "blockquote":
      return <GuideBlockquote>{renderRunsFlat(block.runs)}</GuideBlockquote>;
    case "divider":
      return <GuideDivider />;
    case "image":
      return (
        <span className="mh-article-image">
          <img src={block.src} alt={block.alt} />
          {block.caption ? <span className="mh-article-image-caption">{block.caption}</span> : null}
        </span>
      );
    case "cta":
      return (
        <a href={block.href} className="mh-article-cta" data-workflow={block.workflow}>
          {block.label}
        </a>
      );
    default: {
      const exhaustive: never = block;
      throw new Error(`RenderBlocks: unknown block type: ${JSON.stringify(exhaustive)}`);
    }
  }
}
