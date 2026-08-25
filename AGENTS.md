# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

# Offboard marketing site — working agreement

This repo is the public marketing site for **Offboard** (offboard.co), "the modern
unemployment office." Stack: Next.js App Router + TypeScript on Vercel. **No
Tailwind** — the site ships one scoped stylesheet. Sibling repos: the app is
`lumo-plan-builder` (app.offboard.co); the currently-live legacy site is a third
(TanStack) repo that this one replaces at cutover. All routes stay `noindex`
until the public launch decision.

**This file is the shared contract for every agent** — Claude Code, Codex, or
anything else. Everything in it applies regardless of harness. `CLAUDE.md` only
imports this file, and `.claude/` (settings, launch config) is Claude-specific
convenience that other tools can ignore without losing any rule.

## Sources of truth — read the relevant one before you write

| Question | Document |
| --- | --- |
| Any user-facing string, language rules, facts ledger | `COPY.md` |
| Colors, type, spacing, design tokens | `DESIGN.md` |
| Page roles, sitemap, section order, redirect map | `docs/site-architecture.md` |
| Future `/resources` article strategy | `docs/content-roadmap.md` |
| Domain cutover gates | `docs/cutover-checklist.md` |
| Backlog plans + executor protocol | `plans/README.md` |

When porting new substance from the app repo, source it from
`lumo-plan-builder` **`origin/main`**, never a local checkout — a stale checkout
once shipped an outdated design. For copy that already ships here, `COPY.md`
supersedes the app repo's strategy docs.

## Copy law

- **Copy changes land in `COPY.md` first, or in the same PR.** A PR that changes
  user-facing copy without touching `COPY.md` is incomplete.
  `src/components/marketing/homepage/CopyDrift.test.tsx` enforces this: a red
  drift test means doc and code disagree — fix whichever is wrong, same PR.
- **Never-say vocabulary** (`COPY.md` § Language rules): no "platform",
  "solutions", "career transition services", "modules", "workspace", "agents".
  "Outplacement" is allowed only on `/employers` and in Sponsored-tier copy.
- **`/act` has a B2G language firewall**: "the modern unemployment office" and
  the other banned claims never appear there; Alameda County is geography only,
  never endorser or sponsor. `/act`'s own vocabulary ("career transition",
  "workspace") never leaks to other pages.
- No em dashes in site copy. Never promise funding, eligibility, interviews, or
  placement. One primary CTA per view ("Build my free transition plan").
- Update the copy regression tests (`MarketingHome.test.tsx`,
  `e2e/homepage.spec.ts`) in the same PR as any copy change.

## Design hard rules

- **No Tailwind, no CSS-in-JS.** Styles live in
  `src/components/marketing/homepage/MarketingHomepage.css` under the
  `.marketing-homepage` scope with `--mh-*` tokens. New surfaces extend the
  token set; never hardcode colors that a token already names.
- Palette and type come from `DESIGN.md`. **Violet is reserved for LUMO/AI**,
  never decorative.
- Fonts are self-hosted variable fonts (Aspekta, Fraunces) in `public/fonts` —
  no font CDNs.

## Definition of done — you run the checks, unprompted

1. **Always:** `npm test` and `npm run build` green. Never report work as done
   on a red suite; if something fails, say so with the output.
2. **Touched routes, nav, redirects, or the intake form?** → `npm run e2e` too.
3. **Visual change?** → verify it actually renders, with no console errors, at
   desktop AND mobile width. Use whatever browser tooling your harness gives
   you; the tool-agnostic fallback that always works is a temporary Playwright
   spec (see "Verification rules" below). Claude Code additionally has a launch
   config `marketing-site` on port 3000.
4. **Copy change?** → COPY.md + drift/regression tests updated, same PR (above).

## Verification rules — every agent, every tool

Tool-agnostic. Each of these already cost this repo a real defect or a false
green, so they are rules, not preferences.

- **Verify through the repo's own harness, not a server you did not start.**
  Playwright (`npm run e2e`, `npm run test:visual`) builds and serves the
  worktree it runs in. An editor's built-in preview or a stray `next dev` may
  be serving a DIFFERENT checkout — that happened here for three consecutive
  plans, silently showing pre-edit output while reporting success. For an
  ad-hoc measurement, write a temporary Playwright spec, run it, delete it.
- **Never regenerate a snapshot or baseline to make a suite pass.** If a
  screenshot, an `ArticleFidelity` snapshot, or a drift snapshot moves, prove
  the diff is only what you intended, then re-capture deliberately and say so
  in your report. Silent re-capture is how published prose or a layout
  regression ships unnoticed.
- **Never report a verification you did not run.** If a check was impossible
  (no Docker, no credentials, CI-only), name the command you could not run and
  why. An honest gap is useful; an implied pass is not.
- **A green check that could be a silent fallback is not proof.** Assert the
  path you meant to exercise. The `cms-contract` CI job passed green while
  building from committed files instead of the database; it only became useful
  once it was made to FAIL when the database path was not taken.
- **Match the verification to the risk.** The visual suite runs at 1% pixel
  tolerance, so a color change on a small element does NOT move a baseline.
  "No snapshot moved" is weak evidence for small changes — inspect directly.
- **Correct the plan, not the evidence.** If a plan's stated facts disagree
  with the repo, trust the repo, say so, and carry on with the verified
  numbers.

### Supabase specifics

- A table the site reads needs **both** an RLS policy **and**
  `grant select … to anon`. Neither alone is sufficient. Missing the grant
  gives `42501 permission denied`, and with a fallback in place the site looks
  perfectly healthy while never touching the database.
- The local stack (`npx supabase start`) needs Docker. Without it, write the
  migration but mark it **explicitly unverified** — the `cms-contract` CI job
  is then the authoritative check.
- Migrations reach production only by an owner-run `supabase db push`, never
  by hand-run SQL and never by an agent. See `docs/cms-architecture.md`.

## Handing over work for review — always ship a preview link

**Never hand Louie work to review without telling him exactly where to look.**
He should never have to guess which environment, branch, or worktree holds the
change. Local dev servers and agent worktrees are invisible to him.

So whenever work reaches a reviewable state — a plan executed, a feature
finished, a fix ready — first answer one question:

**Does this change anything a person can SEE on the site?**

**No** (docs, plans, CI config, tests, tooling, refactors with no visual
change): push the branch, open a PR, and hand over **the PR link only**. Say in
one line that there is no visual change. **Do not produce a preview link** — a
link to a page that looks identical wastes his time and trains him to ignore
the links that matter.

**Yes** — then the preview link is mandatory:

1. **Push the branch.** No push, no preview: Vercel only builds what it can see.
   This applies to work done in an isolated worktree too.
2. **Open a PR** (or reuse the existing one) so the preview is tied to the change.
3. **Get the real URL:** `node scripts/preview-url.mjs` (defaults to the current
   branch; takes a branch name or `--json`). It waits for the build and fails
   with a diagnosis rather than printing a guess.
4. **Put the URL in your closing message**, with 2–5 specific things to look at
   ("`/about` — the privacy band should be white again"), and call out anything
   that deliberately changed appearance so a fix doesn't read as a regression.

```bash
node scripts/preview-url.mjs
```

"Visible" includes a change whose point is that nothing moved (a refactor that
must render identically). Say so explicitly — "these pages should look
unchanged; that is the pass condition" — so he knows what he is confirming.

Do not hand-construct preview URLs. Vercel's `…-git-<branch>-…` alias does NOT
resolve for branches containing a slash, which every `claude/*` branch has —
the script resolves the real URL through GitHub's deployments API instead.

Preview URLs are Vercel-SSO-gated: Louie can open them, the public cannot. If a
preview build FAILED, say so plainly and do not present the work as ready.

## Source control and deployment

- GitHub `main` is the source of truth for production.
- Work on a feature branch, commit every production file, and push the branch so
  Vercel creates a Git-backed preview.
- Production releases happen by merging a verified pull request to `main`.
  Vercel deploys `main` automatically — **merging is shipping.**
- **Shipping gate:** for any user-facing change, give Louie the Vercel preview
  URL plus what to look at (see "Handing over work for review" above — this is
  mandatory, not best-effort), and merge only after he says go. Docs, plans,
  tests, CI, and refactors with no visual change may merge without asking.
- Do not run `vercel --prod`, deploy through the Vercel API, or promote a dirty
  local worktree.
- Never call a deployment synchronized unless its Vercel metadata identifies the
  exact GitHub commit on `main` and does not report `gitDirty: 1`.

## Guardrails (hard)

- **`/act` never receives a redirect** and stays out of header/footer nav. It is
  a live, out-of-nav B2G landing URL (`docs/site-architecture.md`).
- **`npm run imagery` costs real money** (~$3–5/run at high quality, OpenAI
  image gen) and needs the owner's API key. Run it only with Louie's go-ahead.
  Every run prints a cost estimate first. Free and safe to run unasked:
  `npm run imagery:dry` (plan + estimate), `--crops`, and `--reconvert`
  (re-encodes webps from `.imagery-cache/`, no API calls). Iterate style with
  `--quality low` (~30x cheaper) and pay for `high` only on the keeper; use
  `--only=<id>` rather than regenerating the whole manifest.
- Secrets never go through chat. Have Louie paste them into the session
  scratchpad, or run the step himself.

## Executing a plan from `plans/`

Read the plan fully before starting, honor its STOP conditions (owner gates can
block a plan at the finish line), and update your row in `plans/README.md` when
done, with branch name and review status.
