#!/usr/bin/env node
/**
 * Prints the Vercel preview URL for a branch, waiting for the deployment to
 * finish if it is still building.
 *
 * Usage:
 *   node scripts/preview-url.mjs                  # current branch
 *   node scripts/preview-url.mjs <branch>         # a specific branch
 *   node scripts/preview-url.mjs --sha <sha>      # a specific commit
 *   node scripts/preview-url.mjs --json           # machine-readable
 *   node scripts/preview-url.mjs --no-wait        # fail fast instead of polling
 *
 * Why this exists: agents finishing reviewable work must hand the owner a
 * preview URL rather than making him guess which environment to check (see
 * AGENTS.md "Handing over work for review"). Vercel's branch-alias URL
 * (…-git-<branch>-…) does NOT resolve for branches containing a slash, which
 * every `claude/*` branch does — so resolve the real URL through GitHub's
 * deployments API instead of constructing it by hand.
 *
 * Requires: `gh` authenticated against the repo. Exits non-zero with a
 * diagnosis if no preview exists (usually: the branch was never pushed).
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileP = promisify(execFile);

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const opt = (n) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const JSON_OUT = flag("json");
const WAIT = !flag("no-wait");
const POLL_SECONDS = 10;
const MAX_POLLS = 30; // ~5 minutes

const positional = args.filter((a) => !a.startsWith("--") && args[args.indexOf(a) - 1] !== "--sha");

function fail(message, hint) {
  if (JSON_OUT) {
    console.log(JSON.stringify({ ok: false, error: message, hint: hint ?? null }));
  } else {
    console.error(`\nERROR: ${message}`);
    if (hint) console.error(`  ${hint}`);
    console.error("");
  }
  process.exit(1);
}

async function sh(cmd, cmdArgs) {
  const { stdout } = await execFileP(cmd, cmdArgs, { maxBuffer: 10 * 1024 * 1024 });
  return stdout.trim();
}

async function repoSlug() {
  try {
    return await sh("gh", ["repo", "view", "--json", "nameWithOwner", "--jq", ".nameWithOwner"]);
  } catch {
    fail("Could not determine the GitHub repo.", "Is `gh` authenticated and is this a GitHub remote?");
  }
}

async function resolveSha(branch) {
  if (opt("sha")) return opt("sha");
  // Prefer the pushed remote head: a preview only exists for what was pushed.
  try {
    const out = await sh("git", ["ls-remote", "origin", `refs/heads/${branch}`]);
    if (out) return out.split(/\s+/)[0];
  } catch {
    /* fall through */
  }
  return null;
}

async function main() {
  const branch = positional[0] ?? (await sh("git", ["rev-parse", "--abbrev-ref", "HEAD"]));
  const slug = await repoSlug();
  const sha = await resolveSha(branch);

  if (!sha) {
    fail(
      `Branch "${branch}" is not on origin, so Vercel has never built a preview for it.`,
      `Push it first:  git push -u origin ${branch}`,
    );
  }

  for (let i = 0; i < (WAIT ? MAX_POLLS : 1); i++) {
    const raw = await sh("gh", [
      "api",
      `repos/${slug}/deployments?sha=${sha}&per_page=20`,
      "--jq",
      ".[] | select(.environment == \"Preview\") | .id",
    ]).catch(() => "");

    const ids = raw ? raw.split("\n").filter(Boolean) : [];

    for (const id of ids) {
      const statusRaw = await sh("gh", [
        "api",
        `repos/${slug}/deployments/${id}/statuses?per_page=20`,
        "--jq",
        ".[] | {state, url: .environment_url}",
      ]).catch(() => "");
      const states = statusRaw
        .split("\n")
        .filter(Boolean)
        .map((l) => JSON.parse(l));
      const success = states.find((s) => s.state === "success" && s.url);
      if (success) {
        if (JSON_OUT) {
          console.log(JSON.stringify({ ok: true, branch, sha, url: success.url }));
        } else {
          console.log(success.url);
        }
        return;
      }
      const failed = states.find((s) => s.state === "failure" || s.state === "error");
      if (failed) {
        fail(
          `The Vercel preview for ${branch} (${sha.slice(0, 7)}) FAILED to build.`,
          "Check the deployment logs in Vercel before handing this over for review.",
        );
      }
    }

    if (!WAIT) break;
    if (i === 0 && !JSON_OUT) {
      console.error(`Waiting for the Vercel preview of ${branch} (${sha.slice(0, 7)})…`);
    }
    await new Promise((r) => setTimeout(r, POLL_SECONDS * 1000));
  }

  fail(
    `No successful Preview deployment found for ${branch} (${sha.slice(0, 7)}).`,
    "If the push just happened, Vercel may still be queuing. Re-run in a minute.",
  );
}

main().catch((e) => fail(String(e?.message ?? e)));
