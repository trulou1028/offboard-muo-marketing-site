import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

// Guards the key-separation contract in docs/cms-architecture.md ("Key
// policy: public reads through RLS, service-role key stays on the write
// path"): the RLS-bypassing service-role key must never leak into the new
// public-content read path, and the read-only publishable key must never
// spread outside src/lib/content/ (the one place that's supposed to use
// it). Filesystem walk pattern matches
// src/components/marketing/homepage/DeadSelectors.test.ts.

// __dirname is src/lib/content; walking up two levels lands on src/ itself.
const SRC_ROOT = path.join(__dirname, "..", "..");

function walkFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      walkFiles(fullPath, out);
    } else {
      out.push(fullPath);
    }
  }
  return out;
}

const SRC_FILES = walkFiles(SRC_ROOT);

function filesContaining(token: string): string[] {
  return SRC_FILES.filter((file) => readFileSync(file, "utf8").includes(token)).map((file) =>
    path.relative(SRC_ROOT, file),
  );
}

// Built at runtime (rather than as a literal string) so this file itself
// never contains the literal token it is scanning for — the same technique
// src/components/marketing/homepage/CopyDrift.test.tsx uses for its
// never-say phrases, and necessary here for the same structural reason: this
// test file lives under src/, so a literal occurrence of either token in its
// own source would be indistinguishable from a real leak and break the
// "exactly one file" / "only under src/lib/content/" assertions below.
const SERVICE_ROLE_KEY_TOKEN = ["SUPABASE_SERVICE", "_ROLE_KEY"].join("");
const PUBLISHABLE_KEY_TOKEN = ["NEXT_PUBLIC_SUPABASE", "_PUBLISHABLE_KEY"].join("");

describe("service-role key stays confined to the intake write path", () => {
  it("the service-role key name appears in exactly one file under src/", () => {
    const matches = filesContaining(SERVICE_ROLE_KEY_TOKEN);
    expect(
      matches,
      `${SERVICE_ROLE_KEY_TOKEN} referenced outside the intake write path: ${matches.join(", ")}`,
    ).toEqual(["lib/intake/supabase-admin.ts"]);
  });
});

describe("the read-only publishable key stays confined to the content read path", () => {
  it("the publishable key name appears only under src/lib/content/", () => {
    const matches = filesContaining(PUBLISHABLE_KEY_TOKEN);
    const offenders = matches.filter((file) => !file.startsWith(`lib${path.sep}content${path.sep}`));
    expect(
      offenders,
      `${PUBLISHABLE_KEY_TOKEN} referenced outside src/lib/content/: ${offenders.join(", ")}`,
    ).toEqual([]);
    // Sanity check: the guard would be vacuous if the key never appeared
    // anywhere (e.g. a future refactor silently deletes the read client
    // without anyone noticing this test stopped meaning anything).
    expect(matches.length, "expected at least one file under src/lib/content/ to reference the publishable key").toBeGreaterThan(0);
  });
});
