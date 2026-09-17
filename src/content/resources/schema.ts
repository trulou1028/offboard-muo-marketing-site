// Portable block schema for article bodies.
//
// A post body used to be a compiled React component (src/content/resources/posts/*.tsx).
// This schema defines a small, closed JSON vocabulary that can express every
// construct that corpus actually uses, so a post body can instead be a plain
// data row (eventually a Supabase column, see plan 016) rendered by
// src/components/marketing/resources/RenderBlocks.tsx.
//
// Four constructs were discovered while converting the 17 ported posts that
// the plan's initial sketch did not cover, and were added as the minimal
// extension needed for byte-for-byte fidelity (see ArticleFidelity.test.tsx):
//
// 1. `b` and `i` runs carry a nested InlineRun[] rather than a plain string.
//    career-changers-guide-to-job-offer-negotiations.tsx has list items like
//    <strong><GuideLink href="...">Free 1:1 call</GuideLink></strong>, a link
//    nested inside bold. A plain-string bold run cannot express that.
// 2. The `h2` block carries an optional `id`. GuideH2 accepts an optional
//    `id` prop that becomes the heading's DOM id (used for anchor links in
//    that same post); omitting it would silently drop a real HTML attribute.
// 3. `code` preserves the founder essays' inline code styling.
// 4. An inline `list` preserves the one nested list in the founder essays.
//
// The corpus's vocabulary is now exactly p / h2 / h3 / list / callout /
// blockquote / divider / inline b / i / a / code / nested list / br.

import { z } from "zod";

// --------------------------------------------------------------- Inline runs

export type InlineRun =
  | string
  | { b: InlineRun[] }
  | { i: InlineRun[] }
  | { a: { text: string; href: string } }
  | { code: string }
  | { list: { ordered: boolean; items: InlineRun[][] } }
  | { br: true };

const inlineRunSchema: z.ZodType<InlineRun> = z.lazy(() =>
  z.union([
    z.string(),
    z.object({ b: z.array(inlineRunSchema) }),
    z.object({ i: z.array(inlineRunSchema) }),
    z.object({ a: z.object({ text: z.string(), href: z.string() }) }),
    z.object({ code: z.string() }),
    z.object({
      list: z.object({
        ordered: z.boolean(),
        items: z.array(z.array(inlineRunSchema)),
      }),
    }),
    z.object({ br: z.literal(true) }),
  ]),
);

export const inlineRunsSchema = z.array(inlineRunSchema);

// -------------------------------------------------------------------- Blocks

export type Block =
  | { type: "p"; runs: InlineRun[] }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string }
  | { type: "list"; ordered: boolean; items: InlineRun[][] }
  | { type: "callout"; title?: string; runs: InlineRun[] }
  | { type: "blockquote"; runs: InlineRun[] }
  | { type: "divider" }
  // Roadmap (docs/content-roadmap.md): planned funnel articles need an
  // embedded product screenshot/image block. No current post uses it.
  | { type: "image"; src: string; alt: string; caption?: string }
  // Roadmap: planned funnel articles need a workflow-specific CTA block.
  // No current post uses it.
  | { type: "cta"; label: string; href: string; workflow?: string };

export const blockSchema: z.ZodType<Block> = z.union([
  z.object({ type: z.literal("p"), runs: inlineRunsSchema }),
  z.object({ type: z.literal("h2"), text: z.string(), id: z.string().optional() }),
  z.object({ type: z.literal("h3"), text: z.string() }),
  z.object({ type: z.literal("list"), ordered: z.boolean(), items: z.array(inlineRunsSchema) }),
  z.object({ type: z.literal("callout"), title: z.string().optional(), runs: inlineRunsSchema }),
  z.object({ type: z.literal("blockquote"), runs: inlineRunsSchema }),
  z.object({ type: z.literal("divider") }),
  z.object({
    type: z.literal("image"),
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal("cta"),
    label: z.string(),
    href: z.string(),
    workflow: z.string().optional(),
  }),
]);

export const postBodySchema = z.array(blockSchema);

/**
 * Parses and validates a post body. Throws with the slug and the offending
 * block index on failure, so a bad JSON file fails loudly and specifically
 * rather than as a generic zod error.
 */
export function parsePostBody(json: unknown, slug: string): Block[] {
  if (!Array.isArray(json)) {
    throw new Error(`parsePostBody(${slug}): expected an array of blocks, got ${typeof json}`);
  }
  for (let index = 0; index < json.length; index += 1) {
    const result = blockSchema.safeParse(json[index]);
    if (!result.success) {
      throw new Error(
        `parsePostBody(${slug}): block index ${index} failed validation: ${result.error.message}`,
      );
    }
  }
  return postBodySchema.parse(json);
}
