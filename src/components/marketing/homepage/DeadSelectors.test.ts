import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

// Guards against the class of bug the 2026-08-24 audit found: CSS rules with
// zero TSX references (dead code that silently accumulates because nothing
// looks at the stylesheet). Reads MarketingHomepage.css, extracts every
// .mh-* class token it declares, and asserts each one shows up somewhere in
// the app's .tsx source. The reverse direction — a TSX class with no CSS
// rule — is NOT enforced; structural hooks (test ids, JS-only state classes)
// are legitimate even without a matching style.

const CSS_PATH = path.join(__dirname, "MarketingHomepage.css");
// __dirname is src/components/marketing/homepage; walking up three levels
// lands on src/ itself.
const SRC_ROOT = path.join(__dirname, "..", "..", "..");

// Route wrapper classes are built dynamically as `mh-page-${current}` in
// MarketingSite.tsx (see the `MarketingRoute` union there), so a plain
// source-text scan never sees the concatenated literal. None of these are
// currently styled by a `.mh-page-*` rule in MarketingHomepage.css, but the
// list is kept here — and this guard is documented as looking at it — so a
// future `.mh-page-<route>` rule doesn't false-fail this test.
const MARKETING_ROUTES = [
  "home",
  "how-it-works",
  "pricing",
  "resources",
  "about",
  "employers",
  "workforce",
  "communities",
  "companies",
  "intake",
  "act",
  "career-context",
  "integrations",
  "lumo",
  "layoff-support",
  "job-search",
  "privacy-security",
] as const;

const DYNAMIC_ROUTE_CLASSES = MARKETING_ROUTES.map((route) => `mh-page-${route}`);

// Classes intentionally exempt from the "must appear in some .tsx" check.
// Empty today; add an entry here (with a comment explaining why) rather than
// weakening the assertion below.
const ALLOWED_ORPHANS: readonly string[] = [];

function walkTsxFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      walkTsxFiles(fullPath, out);
    } else if (entry.endsWith(".tsx")) {
      out.push(fullPath);
    }
  }
  return out;
}

function extractCssClassTokens(css: string): string[] {
  const matches = css.match(/\.mh-[a-z0-9-]+/g) ?? [];
  // Strip a trailing pseudo-class/element boundary that a stray match might
  // pick up (the regex itself already stops at non [a-z0-9-] characters, so
  // this is a defensive no-op today, kept for clarity).
  const classNames = matches.map((token) => token.slice(1));
  return Array.from(new Set(classNames));
}

describe("MarketingHomepage.css has no dead .mh- selectors", () => {
  const css = readFileSync(CSS_PATH, "utf8");
  const cssClasses = extractCssClassTokens(css);

  const tsxFiles = walkTsxFiles(SRC_ROOT);
  const tsxSource = tsxFiles.map((file) => readFileSync(file, "utf8")).join("\n");
  const tsxClassTokens = new Set(tsxSource.match(/mh-[a-z0-9-]+/g) ?? []);

  it("found at least one .mh- class in the stylesheet (sanity check)", () => {
    expect(cssClasses.length).toBeGreaterThan(50);
  });

  it("every CSS class token appears in some .tsx file under src/", () => {
    const orphans = cssClasses.filter(
      (className) =>
        !tsxClassTokens.has(className) &&
        !ALLOWED_ORPHANS.includes(className) &&
        !DYNAMIC_ROUTE_CLASSES.includes(className),
    );
    expect(orphans, `Dead CSS selectors with no TSX reference: ${orphans.join(", ")}`).toEqual([]);
  });

  // The reverse direction is deliberately not asserted: a .tsx file may use
  // a class (e.g. a state hook like "is-open" applied conditionally, or a
  // test-only marker) that has no corresponding CSS rule, and that is fine.
});
