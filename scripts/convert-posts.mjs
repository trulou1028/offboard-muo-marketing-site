#!/usr/bin/env node
/**
 * One-shot converter: src/content/resources/posts/*.tsx -> src/content/resources/blocks/*.json.
 *
 * Kept for reference per plan 015 (the posts/*.tsx files it reads are deleted
 * once conversion is proven lossless). Do not re-run this against new posts
 * without re-verifying the fidelity test in ArticleFidelity.test.tsx: it is a
 * convenience for extraction, not a trusted source of truth by itself.
 *
 * How it works: each post file only imports from
 * "@/components/marketing/resources/GuideArticle" and JSX. Rather than
 * hand-transcribing 11 files (error-prone for a "must not alter one
 * character" requirement), this script compiles each post with the
 * TypeScript compiler API (already a devDependency, no new dependency
 * added) using the exact same jsx: "react-jsx" transform the project uses,
 * then executes the compiled module with a stub "react/jsx-runtime" and a
 * stub GuideArticle module. The stubs record calls as plain objects
 * ({ type, props }) instead of real React elements, which are then walked
 * into the portable Block[] JSON schema.
 *
 * Crucially, this script's own correctness does not have to be trusted: the
 * real acceptance gate is ArticleFidelity.test.tsx, which renders the
 * produced JSON through the real RenderBlocks + real React + real JSX
 * pipeline and diffs the resulting DOM against the frozen pre-conversion
 * snapshot. Any extraction mistake here (e.g. a mis-handled entity) shows up
 * as a fidelity test failure on that slug, not as a silent corruption.
 *
 * Usage: node scripts/convert-posts.mjs
 */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, "..", "src", "content", "resources", "posts");
const BLOCKS_DIR = path.join(__dirname, "..", "src", "content", "resources", "blocks");

const FRAGMENT = Symbol("Fragment");

const GUIDE_ARTICLE_MODULE_PATH = "@/components/marketing/resources/GuideArticle";

// Stub exports for the GuideArticle module: each Guide component is replaced
// by a string marker, so a compiled `_jsx(GuideP, {...})` call receives that
// marker as its `type` argument and we can switch on it directly.
const GUIDE_STUBS = {
  GuideP: "GuideP",
  GuideH2: "GuideH2",
  GuideH3: "GuideH3",
  GuideList: "GuideList",
  GuideCallout: "GuideCallout",
  GuideBlockquote: "GuideBlockquote",
  GuideDivider: "GuideDivider",
  GuideLink: "GuideLink",
};

function jsxStub(type, props) {
  return { type, props: props ?? {} };
}

const MODULE_STUBS = {
  "react/jsx-runtime": {
    jsx: jsxStub,
    jsxs: jsxStub,
    Fragment: FRAGMENT,
  },
  [GUIDE_ARTICLE_MODULE_PATH]: GUIDE_STUBS,
};

function compileAndRun(filePath) {
  const source = readFileSync(filePath, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: filePath,
  });

  const customRequire = (id) => {
    if (id in MODULE_STUBS) return MODULE_STUBS[id];
    throw new Error(`${path.basename(filePath)}: unexpected import "${id}" (no stub registered)`);
  };

  const wrapper = new Function("exports", "require", "module", "__filename", "__dirname", outputText);
  const mod = { exports: {} };
  wrapper(mod.exports, customRequire, mod, filePath, path.dirname(filePath));

  const Component = mod.exports.default;
  if (typeof Component !== "function") {
    throw new Error(`${path.basename(filePath)}: expected a default-exported component function`);
  }
  return Component();
}

// -------------------------------------------------------- pseudo-VDOM walk

function isNode(value) {
  return typeof value === "object" && value !== null && "type" in value;
}

// Converts a pseudo-VDOM children value (string | node | array | null) into
// InlineRun[] per src/content/resources/schema.ts.
function toInlineRuns(children) {
  if (children === null || children === undefined || typeof children === "boolean") {
    return [];
  }
  if (typeof children === "string") {
    return [children];
  }
  if (typeof children === "number") {
    return [String(children)];
  }
  if (Array.isArray(children)) {
    return children.flatMap((child) => toInlineRuns(child));
  }
  if (!isNode(children)) {
    throw new Error(`Unexpected inline child: ${JSON.stringify(children)}`);
  }
  if (children.type === FRAGMENT) {
    return toInlineRuns(children.props.children);
  }
  if (children.type === "strong") {
    return [{ b: toInlineRuns(children.props.children) }];
  }
  if (children.type === "em") {
    return [{ i: toInlineRuns(children.props.children) }];
  }
  if (children.type === "br") {
    return [{ br: true }];
  }
  if (children.type === "GuideLink") {
    return [{ a: { text: textOnly(children.props.children), href: children.props.href } }];
  }
  throw new Error(`Unhandled inline element type: ${String(children.type)}`);
}

// Flattens an inline child down to a plain string. Used only for GuideLink
// text, which the corpus never nests further.
function textOnly(children) {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textOnly).join("");
  if (isNode(children) && children.type === FRAGMENT) return textOnly(children.props.children);
  throw new Error(`Expected plain text, got: ${JSON.stringify(children)}`);
}

function toBlock(node) {
  if (!isNode(node)) {
    throw new Error(`Unexpected top-level child: ${JSON.stringify(node)}`);
  }
  const { type, props } = node;
  switch (type) {
    case "GuideP":
      return { type: "p", runs: toInlineRuns(props.children) };
    case "GuideH2": {
      const block = { type: "h2", text: textOnly(props.children) };
      if (props.id) block.id = props.id;
      return block;
    }
    case "GuideH3":
      return { type: "h3", text: textOnly(props.children) };
    case "GuideList":
      return {
        type: "list",
        ordered: Boolean(props.ordered),
        items: props.items.map((item) => toInlineRuns(item)),
      };
    case "GuideCallout": {
      const block = { type: "callout", runs: toInlineRuns(props.children) };
      if (props.title) block.title = props.title;
      return block;
    }
    case "GuideBlockquote":
      return { type: "blockquote", runs: toInlineRuns(props.children) };
    case "GuideDivider":
      return { type: "divider" };
    default:
      throw new Error(`Unhandled top-level element type: ${String(type)}`);
  }
}

function convertOne(filePath, slug) {
  const root = compileAndRun(filePath);
  if (!isNode(root) || root.type !== FRAGMENT) {
    throw new Error(`${slug}: expected the component to return a single top-level fragment`);
  }
  const children = Array.isArray(root.props.children) ? root.props.children : [root.props.children];
  return children.filter((child) => child !== null && child !== undefined).map((child) => toBlock(child));
}

function main() {
  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith(".tsx"));
  for (const file of files) {
    const slug = file.replace(/\.tsx$/, "");
    const filePath = path.join(POSTS_DIR, file);
    const blocks = convertOne(filePath, slug);
    const outPath = path.join(BLOCKS_DIR, `${slug}.json`);
    writeFileSync(outPath, `${JSON.stringify(blocks, null, 2)}\n`, "utf8");
    console.log(`wrote ${path.relative(process.cwd(), outPath)} (${blocks.length} blocks)`);
  }
}

main();
