# Plan 010: Port the /intake form so human support survives the cutover

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.

## Status

- **Priority**: P1 (cutover prerequisite — the domain must not swap before this is live)
- **Effort**: M
- **Risk**: MED (form backend + email; a silent failure loses real support requests)
- **Depends on**: plans/002-homepage-substance-port.md (shell/styling conventions). Independent of 006's redirects.
- **Category**: migration
- **Planned at**: 2026-08-22, against the stack head `claude/005-employers-about`
- **Outcome**: DONE — executed and reviewed 2026-08-22, approved first pass.
  Step 7 (live email proof) is "ready, awaiting operator keys" as designed.

## Execution record (2026-08-22, executor + advisor review)

Branch `claude/010-intake-port`, 6 commits on `claude/005-employers-about`
(base `3b84ac1`). 16 files, +1218/-10.

What shipped: `/intake` (five-section form) and `/intake/confirmed`; a
`"use server"` action doing zod validate → REST insert → two Resend emails;
`server-only`-guarded helpers (`src/lib/intake/supabase-admin.ts`,
`src/lib/email/resend.ts`); the `intake_submissions` table created live in
`omsvpaaexfujzheybhat` with RLS on and zero policies, plus a checked-in
migration; `HUMAN_SUPPORT_URL` flipped to `/intake`; 7 schema unit tests and
3 intake e2e tests that never touch real Supabase/Resend.

Reviewer verification (independent): gates re-run — 14/14 unit, lint 0,
build 0 with both routes, 9/9 e2e · full-range secret audit with token/JWT/
connection-string patterns: zero hits · both helpers import `server-only`
and no client file references either key name · insert failure fails the
submission with a fallback contact email while email failure never does
(matches the source's semantics) · anon REST probe re-run: INSERT refused,
SELECT returns `[]` · rendered the form at 1280 and 390: all five sections,
clean lanes, no clipping.

**Executor beat the plan's prose**: the source form has FIVE sections, not
the four this plan's summary claimed ("Logistics" — timezone/availability —
did not surface in the advisor's h2 scrape of the live page). The executor
ported what the code actually contains rather than trimming to match the
summary. Correct call, exactly per the faithful-port instruction.

**Approved deviations**: Resend called directly with `RESEND_API_KEY`
instead of through the source's Lovable gateway (this repo has no such
gateway; same two emails); no `@supabase/supabase-js` dependency — a single
REST insert did not justify it.

**Operator handoff (the remaining 5 percent)**: add
`SUPABASE_SERVICE_ROLE_KEY` (Supabase dashboard → project
`omsvpaaexfujzheybhat` → API keys) and `RESEND_API_KEY` (Resend dashboard;
the old site kept it only in its deployment platform env) to `.env.local`
AND the Vercel project env. Then run the smoke test in the PR description:
one real submission → row lands in `intake_submissions`, confirmation email
to the submitter, notification to louie@/steph@ → delete the test row.
Note: the third intake e2e currently asserts the graceful key-absent error;
once keys exist in CI it should assert the redirect instead (documented in
the test file).

## Why this matters

Every "Talk to someone" CTA on this site points at
`https://offboard.co/intake`. Today that URL is served by the OLD marketing
site (TanStack repo, retired at cutover): a working 4-section intake form
whose submissions land in Supabase and email the team. The app has no
equivalent route. If the domain cuts over to this repo without a port,
every human-support CTA on the new site 404s and the support pipeline goes
dark. This plan recreates the form, its backend, and its emails in this
repo, and is a hard prerequisite in plan 006's cutover checklist.

## Current state (source of truth: the TanStack repo, read 2026-08-22)

Local clone: `~/Documents/Codex/offboard-marketing-site` (read-only reference
for this plan; NEVER edit it).

- `src/routes/intake.index.tsx` (554 lines) — the form UI. Four sections:
  "The basics", "The offboarding story", "What you're actually looking for",
  "The fun part". Reproduce the fields and copy faithfully in this repo's
  design system (mh-* classes, Fraunces/Aspekta) rather than pixel-porting
  Tailwind.
- `src/routes/intake.confirmed.tsx` — the post-submit confirmation page.
- `src/lib/intake/schema.ts` (70 lines) — zod schema. Port verbatim (this
  repo does not currently depend on zod: `npm ls zod` says so — add it, or
  translate the validations faithfully; adding zod is simpler and safer).
- `src/lib/intake/submit.functions.ts` (117 lines) — the server flow:
  1. validate; 2. insert a snake_case row into Supabase table
  `intake_submissions` via an ADMIN (service-role) client, server-side only;
  3. send two emails via Resend, wrapped so email failure never fails the
  submission: a confirmation to the submitter and a notification to
  `louie@offboard.co` + `steph@offboard.co` with the field list;
  4. return `{ ok, id }`.

The old site's Supabase project is `xcpcdrwnakhesmvsdviq` (a third project,
used only by the retiring TanStack site). This repo has its own attached
Supabase project `omsvpaaexfujzheybhat`, already designated as the future
CMS; credentials are in this repo's `.env.local`.

**Decision on record (owner-approved recommendation, 2026-08-22): the port
writes to THIS repo's Supabase project** (`omsvpaaexfujzheybhat`), with a
fresh `intake_submissions` table matching the row shape in
`submit.functions.ts`. Rationale: the third project exists only to serve the
retiring site; pointing new infrastructure at it would keep it alive
indefinitely. Historical rows get exported once at cutover (a checklist
line in plan 006, not code in this plan).

## Target in this repo

- `src/app/intake/page.tsx` — the form page (client component for the form,
  or a server page wrapping a client form; match the repo's existing
  server-component-first style, marking only the form itself
  `"use client"`).
- `src/app/intake/confirmed/page.tsx` — confirmation page.
- A server action (e.g. `src/app/intake/actions.ts`, `"use server"`) doing
  validate → insert → emails, mirroring the flow above. The service-role key
  and Resend key must be read from env ONLY in server code — never in a
  client component, and never with `NEXT_PUBLIC_` prefixes.
- `MarketingSite.tsx`: change `HUMAN_SUPPORT_URL` from
  `https://offboard.co/intake` to `/intake` (relative), so the CTAs work in
  every environment including previews.
- Supabase: create the `intake_submissions` table in `omsvpaaexfujzheybhat`
  with columns matching the row object in `submit.functions.ts` (snake_case,
  nullable where the source marks `|| null`), RLS ON with no anon policies
  (the service-role client bypasses RLS; the table must not be readable or
  writable by anon).

## Key availability (verified 2026-08-22 — read before Step 1)

What exists on this machine (names only):
- Repo `.env.local` (in the MAIN checkout `/Users/louissakoda/code/offboard-muo-marketing-site/.env.local` — worktrees do NOT inherit untracked files, copy it in):
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`,
  `SUPABASE_PROJECT_REF`, `SUPABASE_DB_PASSWORD`.
- `psql` 16 and `supabase` CLI 2.109 are installed.

What does NOT exist locally: `SUPABASE_SERVICE_ROLE_KEY` for this project,
and `RESEND_API_KEY` (the old site holds it only in its deployment platform's
env). Therefore:

- **Table DDL**: use the direct Postgres connection with
  `SUPABASE_DB_PASSWORD` (host `db.<SUPABASE_PROJECT_REF>.supabase.co`,
  db `postgres`, user `postgres`). Do not wait for a service key to create
  the table.
- **Server action code**: write it to read `SUPABASE_SERVICE_ROLE_KEY` and
  `RESEND_API_KEY` from env as designed, add both NAMES to `.env.example`
  with comments, and treat missing-at-runtime as a logged, graceful failure
  path (the form shows the try-again error; email absence never crashes).
- **Step 7 (real end-to-end proof) is expected to be BLOCKED** until the
  operator pastes both keys into `.env.local` and the Vercel project env.
  That is not a failure of this plan: complete Steps 1–6, prove the insert
  path at the DB level via psql (insert a row as the executor, then delete
  it), and report Step 7 as "ready — awaiting operator keys" with the exact
  smoke-test commands the operator should run after adding them.

## Commands you will need

| Purpose | Command | Expected |
|---|---|---|
| Install | `npm ci` | exit 0 |
| Tests | `npm test` | all pass |
| Lint | `npm run lint` | exit 0 |
| Build | `npm run build` | exit 0, now 8+ routes incl. `/intake` |
| E2E | `npm run e2e` | all pass |

## Scope

**In scope**: the new `src/app/intake/**` files, the server action, the
`HUMAN_SUPPORT_URL` constant, additive CSS, the Supabase table creation (via
the Supabase MCP/dashboard — document exactly what you created), tests, e2e.

**Out of scope**: the TanStack repo (read-only reference). The old Supabase
project — do not touch it. Any other route or copy in this repo. Do NOT
migrate historical rows (cutover-day task, plan 006's checklist).

## Steps

1. **Port the schema** (zod) and write the server action with the insert +
   two Resend emails. Env vars documented in `.env.example`. Verify: build.
2. **Create the Supabase table** in `omsvpaaexfujzheybhat`; RLS on, no anon
   policies. Verify: an anon-key insert attempt FAILS; a service-role insert
   succeeds (then delete the test row).
3. **Build the form page** with the four sections and field copy from the
   source, in mh-* styling. Client-side validation mirrors the zod schema.
4. **Build the confirmation page** and wire the redirect on success.
5. **Flip `HUMAN_SUPPORT_URL`** to `/intake`. Verify:
   `grep -rn "offboard.co/intake" src/` → 0 matches.
6. **Tests + e2e**: unit-test the schema (valid + 2 invalid cases); e2e
   renders `/intake`, fills the form, and intercepts the submit at the
   network layer (do NOT hit the real Supabase/Resend in e2e — mock or
   intercept). All gates green.
7. **One real end-to-end proof** (manual, reported with evidence): a real
   submission through a local run reaches the Supabase table and both
   emails arrive. Then delete the test row and say so.

## Done criteria

- [ ] `/intake` and `/intake/confirmed` build and render
- [ ] Submission inserts into `omsvpaaexfujzheybhat.intake_submissions` and fires both emails (evidence from step 7)
- [ ] Anon-key access to the table is refused
- [ ] `grep -rn "offboard.co/intake" src/` → 0
- [ ] No secret value appears in any committed file (`git diff` audited)
- [ ] All gates green; `plans/README.md` updated

## STOP conditions

- ~~Missing service-role/Resend keys~~ — downgraded 2026-08-22 from a STOP
  to the documented Step-7-blocked path above. STOP only if
  `SUPABASE_DB_PASSWORD` itself is missing or the DB connection is refused.
- The source form's field list differs materially from `schema.ts` (drift in
  the TanStack repo since 2026-08-22).
- Anything would require committing a secret.

## Maintenance notes

- This creates the first real backend surface in this repo — the same
  Supabase project the CMS phase will use. Whoever builds the CMS should
  reuse the server-side client pattern established here.
- At cutover (plan 006): export historical `intake_submissions` rows from
  `xcpcdrwnakhesmvsdviq` and archive or import them; then the third Supabase
  project can be decommissioned.
- Reviewer: scrutinize env handling (service keys server-only) and that the
  e2e suite can never send real emails.
