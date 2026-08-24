# Plan 012: Establish a styling verification baseline (stylelint, typecheck, screenshot tests, dead-selector guard, lint in CI)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 1cd395b..HEAD -- package.json .github/workflows/ci.yml playwright.config.ts e2e/ src/components/marketing/homepage/MarketingHomepage.css`
> Plan 011 is EXPECTED to have modified the stylesheet — that is fine. For
> the other files, compare the "Current state" excerpts before proceeding;
> on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: plans/011-fix-shipped-css-defects.md (screenshot baselines must not freeze known bugs)
- **Category**: tests / dx
- **Planned at**: commit `1cd395b`, 2026-08-24

## Why this matters

The 2026-08-24 audit found four shipped visual defects (fixed in plan 011),
~130 lines of dead CSS, a duplicate selector, and unreachable mobile
overrides — every one of them a class of defect that automated style checks
catch for free, and none were caught because **no tooling looks at the
stylesheet at all**. The stylesheet is the entire visual surface of the
product. Plans 013 (container unification + 1200px cap) and 014 (token
consolidation) make broad visual changes; without this baseline, reviewing
them means eyeballing every page. With it, the diff is green or it isn't.
This plan also closes a documented gap: `docs/site-architecture.md` lists
`npm run lint` as release check #2, but CI doesn't run it.

## Current state

- `package.json` scripts (lines 5–14): `dev, build, start, lint ("eslint"),
  test ("vitest run"), test:watch, e2e ("playwright test"), imagery,
  imagery:dry`. There is **no** `typecheck` script and **no** stylelint
  anywhere (no config file, no dependency).
- `.github/workflows/ci.yml` has two jobs: `test-and-build` (runs `npm test`
  then `npm run build` on node 24) and `browser` (installs chromium, runs
  `npm run e2e`). Lint is absent.
- `playwright.config.ts` — `webServer` runs `npm run build && npm run start`
  with `SUPABASE_SERVICE_ROLE_KEY: ""` and `RESEND_API_KEY: ""` deliberately
  blanked (a long comment at lines 25–46 explains this prevents live
  production writes during e2e — do not change that mechanism).
- `e2e/` contains `homepage.spec.ts` and `intake.spec.ts` — copy and
  structure assertions only; zero screenshot tests.
- `src/components/marketing/homepage/MarketingHomepage.css` — the single
  scoped stylesheet, `--mh-*` tokens defined on `.marketing-homepage` at the
  top of the file.
- Routes to cover (all in `src/app/`): `/`, `/how-it-works`, `/pricing`,
  `/about`, `/employers`, `/public-partners`, `/act`, `/resources`,
  `/resources/first-week-after-a-layoff` (representative article), `/intake`,
  `/intake/confirmed`.
- Repo conventions (AGENTS.md): no Tailwind; styles live in the scoped
  stylesheet; definition of done includes `npm test` + `npm run build`, with
  `npm run e2e` when routes change.

## Commands you will need

| Purpose   | Command              | Expected on success |
|-----------|----------------------|---------------------|
| Install   | `npm ci`             | exit 0              |
| Tests     | `npm test`           | all pass            |
| Lint      | `npm run lint`       | exit 0              |
| Build     | `npm run build`      | all routes prerender |
| E2E       | `npm run e2e`        | all pass            |

## Scope

**In scope**:
- `package.json` (new scripts + devDependencies: `stylelint`, `stylelint-config-standard`)
- `.stylelintrc.json` (create)
- `.github/workflows/ci.yml`
- `e2e/visual.spec.ts` (create)
- `e2e/__screenshots__/` (generated baselines, committed)
- `src/components/marketing/homepage/DeadSelectors.test.ts` (create)
- `playwright.config.ts` (only if screenshot settings require a tweak — keep the env-blanking block untouched)

**Out of scope**:
- Fixing any stylelint violation that requires a visual change — record it,
  scope the rule, and leave the fix to plans 013/014.
- The stylesheet itself, except where a zero-visual-impact mechanical fix
  silences a violation (e.g. duplicate property).
- `vercel.json` / deployment config.

## Git workflow

- Branch: `claude/012-style-baseline`
- Commit per step.
- **Handover** (AGENTS.md "Handing over work for review"): this plan adds
  tooling and tests only — it changes NOTHING visible on the site. So push the
  branch, open a PR, and hand over **the PR link only**, saying in one line
  that there is no visual change. Do NOT produce a preview link. Do NOT merge —
  that is the owner's call. The review artifact here is the committed
  screenshot baselines, not the running site.

## Steps

### Step 1: Add `typecheck` script and lint to CI

In `package.json` scripts add `"typecheck": "tsc --noEmit"`. In
`.github/workflows/ci.yml`, in the `test-and-build` job after `npm ci`, add
`- run: npm run lint` and `- run: npm run typecheck` before the test step.

**Verify**: `npm run typecheck` → exit 0. `npm run lint` → exit 0 (if it
fails on existing code, fix trivial violations or scope the eslint config —
report anything non-trivial).

### Step 2: Add stylelint

`npm install -D stylelint stylelint-config-standard`. Create
`.stylelintrc.json`:

```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "no-duplicate-selectors": true,
    "declaration-block-no-duplicate-properties": true,
    "no-descending-specificity": null,
    "selector-class-pattern": "^mh-|^marketing-homepage$|^is-",
    "custom-property-pattern": "^mh-",
    "color-function-notation": null,
    "alpha-value-notation": null,
    "shorthand-property-no-redundant-values": null,
    "declaration-block-single-line-max-declarations": null,
    "rule-empty-line-before": null,
    "comment-empty-line-before": null,
    "media-feature-range-notation": null,
    "number-max-precision": 4
  }
}
```

Add script `"lint:css": "stylelint \"src/**/*.css\""` and add
`- run: npm run lint:css` to the CI `test-and-build` job. Run it; expect an
initial violation backlog. Fix only mechanical, zero-visual-impact
violations (duplicate properties, empty rules). For anything visual, disable
the specific rule with a `/* stylelint-disable-next-line <rule> -- plan 013/014 */`
comment rather than changing pixels. `no-duplicate-selectors` must end the
step green with no disables — plan 011 already removed the known duplicate;
any NEW duplicate it finds is a real finding to fix (report it).

**Verify**: `npm run lint:css` → exit 0.

### Step 3: Add the dead-selector guard

Create `src/components/marketing/homepage/DeadSelectors.test.ts` — a vitest
test that:

1. Reads `MarketingHomepage.css`, extracts every class token matching
   `/\.mh-[a-z0-9-]+/g` (strip pseudo-classes/elements), and dedupes.
2. Reads every `.tsx` file under `src/` (use `fs` + a small recursive walk —
   follow the pattern of `CopyDrift.test.tsx`, which already reads files from
   disk in a vitest context).
3. Collects the union of string literals and template-literal *static* parts
   from those files (a simple regex over the raw source for `mh-[a-z0-9-]+`
   tokens is sufficient and robust).
4. Asserts every CSS class token appears in some TSX file. Maintain an
   explicit `ALLOWED_ORPHANS` array (initially empty; dynamic classes like
   the shell's `mh-page-${current}` produce per-route tokens — derive the
   route list from a hardcoded array with a comment pointing at
   `MarketingRoute` in `MarketingSite.tsx`).
5. Also assert the reverse direction is NOT enforced (TSX classes without CSS
   are fine — structural hooks are legitimate).

**Verify**: `npm test` → all pass including the new file. Then prove it
works: temporarily add `.mh-zzz-dead { color: red }` to the stylesheet,
run `npm test` → the new test FAILS naming `mh-zzz-dead`; revert.

### Step 4: Add screenshot tests

Create `e2e/visual.spec.ts`: for each of the 11 routes listed in "Current
state", at three viewports (1440×900, 768×1024, 390×844), navigate, wait for
fonts (`await page.evaluate(() => document.fonts.ready)`), and
`await expect(page).toHaveScreenshot(\`\${name}-\${width}.png\`, { fullPage: true, maxDiffPixelRatio: 0.01 })`.
Mask nothing initially; if a page proves flaky (image loading), add
`animations: "disabled"` and a `waitForLoadState("networkidle")` first.
Generate baselines with `npx playwright test e2e/visual.spec.ts --update-snapshots`
and COMMIT them. Keep this spec in the existing `browser` CI job (it runs
`npm run e2e`, which picks up the new spec automatically).

Note: baselines are rendered on your platform; CI runs ubuntu. If CI diffs
purely from font rasterization, set `expect.toHaveScreenshot.maxDiffPixelRatio`
to 0.02 in `playwright.config.ts`; if still red, gate the visual spec to run
only when `process.env.CI` is unset and note that limitation in your report
(STOP condition below covers the decision).

**Verify**: `npm run e2e` → all pass locally, including 33 screenshot
assertions. Second consecutive run → still green (deterministic).

### Step 5: Full gate

**Verify**: `npm test && npm run lint && npm run lint:css && npm run typecheck && npm run build && npm run e2e` → all exit 0. `git status` → only in-scope files.

## Test plan

- New: `DeadSelectors.test.ts` (guards dead CSS + the plan-011 class-prefix
  rule), `e2e/visual.spec.ts` (33 screenshot baselines).
- Pattern reference: `CopyDrift.test.tsx` for filesystem-reading vitest
  tests; `e2e/homepage.spec.ts` for Playwright structure.
- Prove-it checks are embedded in Steps 3–4 (intentional failure, then revert).

## Done criteria

- [ ] `npm run typecheck`, `npm run lint:css` exist and exit 0
- [ ] CI workflow runs lint, typecheck, and lint:css in `test-and-build`
- [ ] `DeadSelectors.test.ts` passes and fails correctly on a planted dead class
- [ ] Screenshot baselines committed; `npm run e2e` green twice in a row
- [ ] Full gate passes; only in-scope files modified
- [ ] `plans/README.md` status row updated

## STOP conditions

- Plan 011 has not landed (check `plans/README.md` — its status must be DONE
  or the baselines will freeze known-bad rendering).
- The initial stylelint backlog contains violations that cannot be silenced
  without visual changes AND cannot be rule-scoped cleanly — report the list
  instead of restyling.
- CI screenshot rendering diverges from local by more than the 0.02 ratio —
  report with the diff images; do not chase pixel-perfect cross-platform
  rendering.
- `npm run lint` (eslint) surfaces more than ~10 pre-existing errors —
  report rather than mass-fixing.

## Maintenance notes

- Every visual PR from now on regenerates affected baselines via
  `--update-snapshots` and the reviewer looks at the before/after images —
  that IS the review artifact for plans 013/014.
- The `selector-class-pattern` rule enforces the `mh-`/`is-` naming contract;
  extend the pattern if a deliberate new prefix is introduced (e.g.
  `mh-page-` wrappers are already covered by `^mh-`).
- Deferred: axe-core accessibility assertions in e2e (worthwhile, not part of
  this baseline).
