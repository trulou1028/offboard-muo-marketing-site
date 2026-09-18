# Plan 053: An Application Packet demonstration
> **Execute with:** Fable 5.1 · high - Product claims and Free/Pro boundaries must remain accurate while the demonstration is added.

Status: READY FOR REVIEW on `codex/plan-053-application-packet-demo`. Merge is
blocked until GitHub Actions can start after the account billing or spending
limit issue is resolved.
Authored: 2026-09-18. Source baseline: marketing `origin/main` at `5dfebdc`.
Planning branch: `codex/motion-polish-plans`. Depends on plan 052's shared motion
contract/runtime. Execute after 052; this does not depend on plan 054.

## Outcome and placement

On `/application-packet`, let a visitor inspect how one example role connects to
the six existing packet steps and their outputs. The experience should explain
what the packet contains and preserve the fact that the member reviews and sends
materials. It is a local, clearly labeled example, with no AI calls or user input.

Replace the static visual within `PacketBand` with an interactive demonstration,
using the existing six-step list as its semantic navigation. Keep the section's
heading, lead, entitlement note, subsequent stages, FAQ, and page CTA structure.
Do not append a second six-step explainer below the first. Preserve the current
hero, including the `LayeredProductHero` composition, in this first release.

No homepage changes, real generation, paste-a-job form, authentication, auto-apply,
new analytics service, pricing changes, or unrelated product-page redesign.

## Recommended implementation models

Verified 2026-09-18:

- **Codex: GPT-6 Astra (`gpt-6-astra`), high**, present in the local host catalog
  with high effort supported. Claim verification, deterministic sample design,
  accessibility, and animation interruption make this more than a visual edit.
- **Claude Code: Claude Fable 5.1, high**, following the repository's claims-risk
  rule and confirmed in [Anthropic's model catalog](https://platform.claude.com/docs/en/models/overview).
  Check account-specific Claude Code availability when executing.
- Reuse 052's runtime and existing components to contain cost. Escalate Codex to
  xhigh only for unresolved product-evidence or state-race problems. These choices
  neither start implementation nor change this task's model.

## Verified baseline and mandatory evidence refresh

`MarketingApplicationPacket.tsx` renders `PacketBand`, `PACKET_STEPS`, the tier
chips, and four FAQs. Its current six rows are:

| Step | Current marketing chip |
| --- | --- |
| Ghost Check | 3 a month |
| Company Intel | Free |
| Role Match Analysis | Free |
| Tailor Resume | Pro |
| Cover Letter | Pro |
| Path to a Person | Pro |

The page says the first complete packet runs every step free. These are current
marketing statements, not a fresh verification of app entitlements. At execution,
fetch the sibling `lumo-plan-builder` remote and inspect its **`origin/main`**,
never its working checkout. Record the commit and relevant paths in the PR:
`src/components/job-packet/packetSteps.ts`, the actual output renderers, and
server entitlement paths (including the Ghost Check basic/enriched distinction).
`COPY.md` remains authority for already-shipped marketing copy. Reconcile any new
demo substance with source evidence; do not silently rewrite commercial terms.

Read `COPY.md` section 14, language rules and facts ledger, `DESIGN.md`,
`docs/site-architecture.md`, plan 052's shared motion contract and verification
requirements, and installed Next client/server component guidance.

## Demonstration content

Use one fictional candidate and one fictional company/role, with a small readable
role summary available at every step. Proposed candidate: Alex Morgan, a customer
operations specialist exploring a Customer Success Manager role at Example Co.
Names and details are invented fixtures, not customer data or real hiring claims.
Record every visible sample string in `COPY.md` when implementing.

Proposed permanent disclosure: `Illustrative example. No live job is being checked.`
Proposed control labels: `Play example`, `Pause`, `Replay example`, `Show complete packet`.
These are draft copy for this plan, not approved additions to the site's copy ledger.

| Selected step | Example output and claim boundary |
| --- | --- |
| Ghost Check | A short illustrated signal summary with source/status labels. No guaranteed real/active verdict; do not animate a fake live verification. |
| Company Intel | A brief fictional company summary. No fabricated real-company facts, citations, or logos. |
| Role Match Analysis | A role requirement linked to an explicit sample accomplishment and one gap. Prefer qualitative evidence over an invented numerical fit score. |
| Tailor Resume | One before/after bullet grounded in the same sample experience; never add achievements the source record lacks. |
| Cover Letter | A short excerpt using that same role and experience, not a complete fabricated personal history. |
| Path to a Person | Explain the type of relevant connection or outreach path the shipped product actually returns. No invented verified contact or contact details. |

Each output needs an evidence mapping: sample source -> displayed interpretation
-> verified app capability. If a proposed output shape is unsupported, use the
real supported shape. Keep the step's name, order, and tier visible when selected.
Do not visually imply that every later packet includes Pro outputs for free.

## States and motion

- **Static/initial:** server-rendered complete packet summary and all six step
  descriptions remain useful without JS. Enhance into a selected-step view after
  hydration without hiding essential copy or shifting the page. No autoplay.
- **Inspecting:** six native buttons in an ordered list select output with
  `aria-pressed` and `aria-controls`; normal Tab order, no partial tab widget.
  Focus remains on the activated control. Current step is conveyed beyond color.
- **Playing:** explicit Play walks through six illustrative outputs, roughly
  600ms assembly plus 1.8s reading time per step. Pause is always available.
  Manual step selection cancels playback immediately; there is no competing timer.
- **Complete:** retain a readable final packet summary. Replay is optional and
  explicit. Show complete packet skips the sequence at any time.
- **Interrupted:** leaving the viewport, hiding the tab, changing to reduced
  motion, or unmounting cancels playback. Do not resume without another Play.
- **Reduced motion:** select states immediately; present all output through direct
  selection or the complete summary. No timed sequence is necessary.

Use restrained crossfades, a moving selection indicator, and small card/row
settling. Motion may illustrate assembly but never suggest actual generation
speed. Do not animate long passages character by character, add spinning job
checks, play sound, loop continuously, or move the page while the user reads.

On desktop, use the existing split composition for the example role and output;
place the six controls in the existing step area. At <=900px, stack a compact
selector before its output and ensure the result is adjacent to the selected
control region. At 390px, no clipped text, sideways page scrolling, or dependence
on hover. Reserve sensible output space without giant empty mobile panels.

## Implementation sequence after authorization

1. Refresh the product evidence and capture the current page in the repo harness.
2. Add fixture copy and permanent example labeling to `COPY.md`, including all
   button/accessibility labels. Review new text against never-say/claim rules.
3. Implement a narrow `ApplicationPacketDemo` client component and deterministic
   fixture data; keep the page and unrelated sections server-rendered. Reuse 052's
   motion foundation. No networking, storage, uploads, or external data services.
4. Integrate into `PacketBand` without duplicating its steps. Keep the complete
   static fallback and existing image asset available for rollback; do not prune
   shared imagery. Adjust only scoped CSS, using current tokens.
5. Add tests for step/output mapping, tier integrity, playback cancellation,
   replay/skip, reduced motion, no-JS access, and copy drift. Update
   `MarketingHome.test.tsx`, `CopyDrift.test.tsx`, and `e2e/homepage.spec.ts` as
   applicable, plus a focused motion-enabled demo spec.
6. Run the full 052 verification checklist and inspect intentional snapshot
   changes. Update this plan's status and branch in `plans/README.md`.

Expected files: `MarketingApplicationPacket.tsx`, a new demo component and fixture
file under the marketing tree, `MarketingHomepage.css`, `COPY.md`, `DESIGN.md` if
new tokens are needed, and relevant unit/browser tests. No route or backend edits.

## Acceptance and review

- A visitor can identify the role, six outputs, illustrative status, Free/Pro
  boundaries, and the need to review/send materials without playing the animation.
- Every control works by keyboard and touch; focus stays stable. Only concise
  user-triggered status is announced politely, not every automatic animation frame.
- Test quick repeated selection during playback, pause/skip/replay, tab hiding,
  viewport exit, route navigation, and preference changes. No stale output/timer.
- Check 1440, 900, and 390px and 200% zoom, both motion modes, no-JS, and console
  errors using the worktree's own Playwright server. Assert actual intermediate
  animation states separately from reduced-motion screenshot coverage.
- Meet 052's performance budget; selecting an output initiates no network call.
  No hydration-related layout shift, unreadable scaled text, or sustained idle work.
- Run all commands and CI gates in 052. New screenshots need intentional reviewed
  diffs, not automatic blanket baseline replacement.

Push an implementation PR, resolve its actual preview with
`node scripts/preview-url.mjs`, and hand Louie `/application-packet` with three
review points: inspect each output, interrupt/replay the demonstration, and check
the phone layout plus tier explanation. Merge only after his explicit go.

STOP shipping if the product evidence contradicts a new claim, a fixture appears
live, new copy is missing from `COPY.md`, controls fail accessibility checks,
required checks are red/pending, or preview review has not happened. Do not treat
approval of this planning PR as approval to implement or ship.

Rollback: revert the route-specific implementation PR to restore the static band;
retain 052's shared dependency while another surface uses it.

## Implementation record

Implemented 2026-09-18. Product evidence was refreshed from
`lumo-plan-builder` `origin/main` at
`d1b3306e5a98f59fb8b3d2856a5a4a8f6f488f6f`, including
`src/components/job-packet/packetSteps.ts`, the application output renderers,
and `supabase/functions/_shared/entitlements.ts`.

The production `/application-packet` script set is 11,811 uncompressed bytes
larger than the same route on marketing `origin/main`, below the 20 KB route
budget. Browser verification asserts layout shift below 0.01 through hydration
and direct selection. The complete example remains in server-rendered HTML;
interactive controls appear only after hydration.

All local CI-equivalent commands pass. Vercel built the preview successfully.
The three GitHub-hosted jobs reported failure without starting a step; their
check annotations say recent account payments failed or the Actions spending
limit must be increased. Re-run the required jobs after that account setting is
fixed before merging.
