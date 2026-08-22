# Plan 009: Sweep the never-say vocabulary out of user-facing copy

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.

## Status

- **Priority**: P3
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans 002–005 and 008 (sweep last, so it covers their copy)
- **Category**: docs / copy consistency
- **Outcome**: DONE — executed and reviewed 2026-08-22, approved first pass.

## Execution record (2026-08-22, executor + advisor review)

Branch `claude/009-language-sweep`, 1 commit, based on `claude/010-intake-port`.
2 files, +7/-7. All seven rendered "workspace" occurrences rewritten with
meaning preserved (trust copy verified line by line; "Member view" keeps the
contrast with "Sponsor view"). Option A applied: "outplacement" untouched.
Reviewer re-ran gates: 14/14 unit · lint 0 · build 0 · rendered copy greps 0.

**Executor over-reported one thing, caught in review**: it flagged 5 more
hits in `fixtures.ts` as "rendered live via ComparisonTable/HomeSections."
False — nothing imports that chain; it is the dead code plan 001 deletes
(PR #2). Verified by grep for importers: zero. No owner decision needed;
the hits vanish when #2 merges. The plan's Step-1 inventory command DID
under-glob (`*.tsx` missed the `.ts` fixtures file) — noted for accuracy,
consequence nil.
- **UNBLOCKED 2026-08-22** — owner chose **Option A**: "outplacement" stays
  in the Sponsored-tier pricing copy; the language rule is narrowed to
  *"outplacement" may appear on `/employers` and in Sponsored-tier copy,
  nowhere else*. This plan is now just the "workspace" sweep (Step 2) plus
  recording the narrowed rule (Step 3, Option A branch).

## Why this matters

The marketing-site v2 spec sets a language discipline: say *laid off,
unemployment, what you're owed, your plan, tools*; never say *platform,
infrastructure, solutions, modules, workspace, career transition services*.
The intent is that jobseeker-facing copy uses the words people actually live
in, not product or procurement jargon.

Two words currently break that rule. Neither is a bug and neither breaks a
gate; this is brand-voice consistency, which is why it is P3 and sequenced
last.

## Findings (verified 2026-08-22)

### "workspace" — 7 occurrences, 6 pre-existing

| File | Context |
|---|---|
| `MarketingSite.tsx` (HUMAN_STEPS, "Ask Lumo") | "the context already in your Offboard workspace" |
| `MarketingSite.tsx` (PRODUCT_FAQS, Lumo question) | "Lumo works inside your Offboard workspace" |
| `MarketingSite.tsx` (ConnectedPlanSummary) | "One workspace connecting each role, application, and next step" |
| `MarketingSite.tsx` (PrivacySummary, "Your choice") | "what enters your workspace" |
| `MarketingRoutePages.tsx` (About principles) | "choose what enters their workspace" |
| `MarketingRoutePages.tsx` (sponsor card) | "Member workspace" label |
| `MarketingRoutePages.tsx` (partners grid) | "stay in one private workspace" |

Suggested replacements, keeping meaning and rhythm: "your Offboard", "your
plan", "one place", "your private plan". Do not mechanically find-and-replace
— each needs a phrasing that still reads naturally.

### "outplacement" — 3 occurrences, 1 correct

| File | Context | Verdict |
|---|---|---|
| `MarketingRoutePages.tsx` (`MarketingEmployers` H1) | "Outplacement, modernized." | **Correct** — `/employers` is the scoped exception |
| `MarketingSite.tsx` (`PricingSection`, Sponsored tier) | "Outplacement, modernized. Your former employer…" | Owner decision |
| `MarketingSite.tsx` (`PricingTeaser`, Sponsored card) | same phrase | Owner decision |

## Owner decision required

The two source documents disagree, which is how this got in:

- The **v2 marketing-site spec** says "outplacement" appears on `/employers`
  only, never on jobseeker-facing pages.
- The **approved v7 landing copy** uses "Outplacement, modernized" in the
  homepage pricing section's Sponsored tier, and that copy is what shipped on
  the previous production site.

**Option A — keep it in the Sponsored tier.** The Sponsored tier is
inherently about the employer relationship, and "outplacement" is the
clearest word for someone wondering whether their former employer might pay.
Matches the approved v7 copy. Requires narrowing the rule to: *"outplacement"
may appear on `/employers` and in Sponsored-tier copy, nowhere else.*

**Option B — remove it from pricing.** Keeps the rule absolute. Needs a
replacement lead for the Sponsored tier in both `PricingSection` and
`PricingTeaser`, e.g. "Your former employer, school, or workforce
organization may cover your access."

**Advisor recommendation: A.** The word is doing real work for the reader in
exactly the place the reader needs it, and it matches copy that was already
approved and shipped. Narrowing the rule is more honest than churning
approved copy to satisfy a rule written before that copy existed.

If A is chosen, this plan reduces to the "workspace" sweep plus a one-line
amendment to the language rule wherever it is recorded.

## Commands you will need

| Purpose | Command | Expected |
|---|---|---|
| Install | `npm ci` | exit 0 |
| Tests | `npm test` | all pass |
| Lint | `npm run lint` | exit 0 |
| Build | `npm run build` | exit 0 |
| E2E | `npm run e2e` | all pass |

## Scope

**In scope**: `MarketingSite.tsx` and `MarketingRoutePages.tsx` (copy strings
only), and `MarketingHome.test.tsx` / `e2e/homepage.spec.ts` if an assertion
quotes a changed string.

**Out of scope**: any layout, CSS, component structure, or route change. The
`/employers` H1 "Outplacement, modernized." stays regardless of the decision.

## Steps

### Step 1: Inventory before changing

```
grep -rn "workspace" src/components/marketing/homepage/*.tsx | grep -v test
grep -rn "utplacement" src/components/marketing/homepage/*.tsx | grep -v test
```

**Verify**: you find the occurrences listed above. If the counts differ
materially, the code has moved on — report before proceeding.

### Step 2: Replace each "workspace" in context

Rewrite each of the 7 occurrences individually so the sentence still reads
naturally. Do NOT find-and-replace. Keep sentence length and tone close to
the original; these are calm, plain sentences and should stay that way.

**Verify**: `grep -rn "workspace" src/components/marketing/homepage/*.tsx | grep -v test` → no matches.

### Step 3: Apply the owner's "outplacement" decision

Option A: no code change; note the narrowed rule in your PR description.
Option B: replace the lead sentence in `PricingSection` and `PricingTeaser`
Sponsored tiers with the replacement text the owner supplies or the one in
this plan.

**Verify**: `grep -rn "utplacement" src/ | grep -v test` returns only the
`/employers` H1 (option A: plus the two pricing leads).

### Step 4: Update any test that quotes changed copy

**Verify**: `npm test` → all pass.

### Step 5: Full gates

**Verify**: `npm test` · `npm run lint` · `npm run build` · `npm run e2e` all pass.

## Test plan

No new tests. Existing assertions that quote a changed string must be updated
to match. If a test asserts on a phrase this plan changes, prefer updating the
assertion over weakening it to a looser regex.

## Done criteria

- [ ] No "workspace" in user-facing copy
- [ ] "outplacement" appears only where the owner's decision permits
- [ ] `npm test`, `npm run lint`, `npm run build`, `npm run e2e` all exit 0
- [ ] No file outside the in-scope list modified
- [ ] `plans/README.md` status row updated

## STOP conditions

- A replacement phrasing would change the meaning of a claim (particularly
  anything about privacy or sponsor visibility) rather than just its wording.
  Report the sentence rather than guessing.

## Maintenance notes

- Root cause of this drift: the language rules live in a spec in a different
  repo, and the plans that generated this copy each restated them by hand.
  Two of the violations came from advisor plan specs, not executor error. If
  this recurs, consider a lint rule or a CI grep so the check is mechanical
  rather than remembered.
