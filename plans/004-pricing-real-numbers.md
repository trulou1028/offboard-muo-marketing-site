# Plan 004: Put real prices on /pricing (Free $0 · Pro $20 · Sponsored)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 9689184..HEAD -- src/app/pricing/ src/components/marketing/homepage/MarketingRoutePages.tsx src/components/marketing/homepage/MarketingSite.tsx`
> Expected drift: plans 001–003. Any other change to `MarketingPricing` or
> `PricingSection` is a STOP.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/002-homepage-substance-port.md (copy source of truth for the card contents)
- **Category**: direction
- **Planned at**: commit `9689184`, 2026-08-21

## Why this matters

The pricing page currently shows **no prices** — two cards that say "you will
see the price before you pay." The company's approved pricing (proven on the
previous production site) is concrete: Free $0 forever, Offboard Pro
$20/month, and Sponsored access. A pricing page without numbers reads as
evasive at the exact moment a stressed visitor is deciding whether to trust
the product. This plan replaces the placeholder deck with the real tiers and
a billing FAQ.

## Current state

- `src/app/pricing/page.tsx` — thin route wrapper; exports `metadata` and
  renders `MarketingPricing`. Keep; adjust metadata description only if needed.
- `src/components/marketing/homepage/MarketingRoutePages.tsx` —
  `MarketingPricing()` (starts ~line 59): `PageHero` → `PricingSection` →
  `EditorialGrid("Choose with context", ...)` → `FaqSection(PRICING_FAQS)` →
  `FinalCta`.
- `src/components/marketing/homepage/MarketingSite.tsx`:
  - `PricingSection()` at ~line 470 — the two vague cards
    (`01 · Start free` / `02 · Add support`), classes `mh-pricing`,
    `mh-price-deck`, `is-primary`.
  - `PRICING_FAQS` const near the top (3 entries: payment method, when you
    see a price, human support availability).
  - After plan 002, the homepage `PricingTeaser` renders the same three
    tiers in teaser form — the full page must agree with it exactly on
    numbers and tier names.
- Voice/language rules: same as plan 002. One scoped exception applies here
  and on /employers only: the word **"outplacement"** is allowed in the
  Sponsored tier copy.

## Copy specification (inline, authoritative)

**PageHero** — kicker `Pricing`; title
`Start free. Upgrade when you need more support.`; body
`Begin with the next role in front of you. Move to Pro when your search needs more room, or see whether an organization can sponsor your access.`;
cta `Start free`; aside: label `Clear before you pay`, strong
`No hidden starting fee.`, paragraph
`Free is a real tier, not a trial. You see every price and what is included before you pay.`

**PricingSection (replace body, keep section/class conventions)** — three cards:

1. **Free** — price `$0` unit `forever` — lead
   `See your plan, your runway, and your benefit deadlines. Then build your first Job Packet.`
   Features: `Transition plan & benefit sheets` · `Runway calculator` ·
   `First Job Packet free` · `Application tracking` ·
   `3 LUMO messages per day` · `30 monthly credits`
   CTA: `Build my free transition plan` (→ `SIGN_UP_URL`)
2. **Offboard Pro** — badge `For active transitions` — price `$20` unit
   `/month` — lead
   `For an active transition that needs more room: research, tailoring, preparation, paperwork review, and unlimited LUMO.`
   Features: `Unlimited conversations with LUMO` ·
   `More room for Job Packets and tailoring` ·
   `Deeper application and interview support` · `300 monthly credits`
   CTA: `Upgrade to Pro` (→ `SIGN_UP_URL`)
3. **Sponsored access** — badge `May be covered` — lead
   `Outplacement, modernized. Your former employer, school, or workforce organization may cover your access.`
   Features: `The full sponsored benefit is delivered to you` ·
   `Your private career activity remains yours` ·
   `Sponsors receive aggregate reporting only`
   CTA: `Learn about sponsored access` (→ `/employers`)

Closing note under the deck:
`Quarterly billing details and the full feature comparison are shown at checkout. Claiming your government benefits is always free, on any tier.`

**EditorialGrid** — keep the section but retitle: kicker `How credits work`;
title `Pay only for the work that needs more horsepower.`; body
`Credits cover the heavier product work: deeper research, tailored materials, and interview preparation. Every credit-spending action shows its cost before you run it.`
Items: `Included monthly` / `Free includes 30 credits a month, Pro includes 300. They refresh monthly.` ·
`Clear costs` / `The price in credits is shown on the button before you spend anything.` ·
`Human support` / `Eligible one-on-one support options are booked separately, with price and scope shown before you schedule.`

**PRICING_FAQS (replace the const's entries)**:
1. `Do I need a payment method to start?` /
   `No. The Free tier is not a trial. You can build your plan, see your runway and deadlines, track applications, and build your first Job Packet without adding a payment method.`
2. `What happens when I run out of credits?` /
   `The core plan, benefit sheets, and tracking keep working. Credits gate the heavier product work, and they refresh monthly on both tiers.`
3. `Can I cancel Pro any time?` /
   `Yes. Your plan, materials, and history remain yours on the Free tier after you cancel.`
4. `Is human support included?` /
   `Availability, format, eligibility, and pricing vary by support option. The booking page shows the current details before you schedule.`
5. `Does any tier charge for government benefits?` /
   `Never. Claiming your benefits is always free. Offboard charges for its own tools and support, not for access to public programs.`

## Commands you will need

| Purpose   | Command          | Expected on success |
|-----------|------------------|---------------------|
| Tests     | `npm test`       | all pass            |
| Lint      | `npm run lint`   | exit 0              |
| Build     | `npm run build`  | exit 0              |
| E2E       | `npm run e2e`    | all pass            |

## Scope

**In scope**:
- `src/components/marketing/homepage/MarketingRoutePages.tsx` (`MarketingPricing` only)
- `src/components/marketing/homepage/MarketingSite.tsx` (`PricingSection`,
  `PRICING_FAQS` only)
- `src/components/marketing/homepage/MarketingHomepage.css` (additive: third
  card style for `mh-price-deck` if needed)
- `src/app/pricing/page.tsx` (metadata description only)
- `src/components/marketing/homepage/MarketingHome.test.tsx` (pricing assertions)
- `e2e/homepage.spec.ts` (only if it asserts pricing copy — check first)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch):
- Homepage `PricingTeaser` (owned by plan 002 — if its numbers disagree with
  this spec, that is a STOP, not something to fix here)
- All other routes, nav, footer
- Any payment/checkout integration — this is marketing copy only

## Git workflow

- Branch from `main` (after 002 merges): `claude/004-pricing-real-numbers`
- Commit per step; short imperative summaries.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

1. **Replace `PricingSection`** with the three-card deck per spec (server
   component, static markup; follow the existing card class conventions
   `mh-price-deck` / `is-primary`). Verify:
   `grep -c "\$20" src/components/marketing/homepage/MarketingSite.tsx` → ≥1
   and `grep -n "forever" ...MarketingSite.tsx` → 1.
2. **Replace `PRICING_FAQS`** entries per spec. Verify:
   `grep -n "always free" src/components/marketing/homepage/MarketingSite.tsx` → ≥2
   (closing note + FAQ 5).
3. **Update `MarketingPricing`** hero + EditorialGrid copy per spec. Verify:
   `grep -n "No hidden starting fee." src/components/marketing/homepage/MarketingRoutePages.tsx` → 1.
4. **Update tests**: pricing `it(...)` block asserts `$0`, `$20`,
   `Sponsored access`, and FAQ 5's heading. Verify: `npm test` → all pass.
5. **Full gates**: `npm run lint` → 0 · `npm run build` → 0 · `npm run e2e` → all pass.

## Test plan

- Unit: assert the three tier names, both price strings, the
  `Claiming your benefits is always free` line, and that the Sponsored CTA
  links to `/employers`.
- Model the assertions on the existing pricing `it(...)` block in
  `MarketingHome.test.tsx`.

## Done criteria

- [ ] `npm test`, `npm run lint`, `npm run build`, `npm run e2e` all exit 0
- [ ] `/pricing` shows `$0`, `$20/month`, and `Sponsored access`
- [ ] `grep -n "see the price and what is included before you choose anything paid" src/` → 0 matches (old vague copy gone)
- [ ] Numbers agree exactly with the homepage teaser from plan 002
- [ ] No file outside the in-scope list modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

- **Owner confirmation**: the numbers (`$0`, `$20/month`, `30`/`300` monthly
  credits, `3 LUMO messages per day`, `First Job Packet free`, quarterly
  billing) must be confirmed by the operator against the live app before
  merge. Unconfirmed → finish the work, mark BLOCKED with reason
  "pricing numbers unconfirmed".
- The homepage teaser (plan 002) shows different numbers than this spec.
- Legal-adjacent copy (`Claiming your benefits is always free`) is asked to
  be removed or weakened — that line is a positioning guardrail; escalate.

## Maintenance notes

- Any future price change must update BOTH `PricingSection` (here) and the
  homepage `PricingTeaser` — they are separate components by design (teaser
  vs. full page). A reviewer seeing one changed without the other should flag it.
- Quarterly billing specifics are deliberately deferred to checkout; do not
  let marketing copy accumulate billing edge cases.
- When the company-page database / CMS phase lands (Supabase), pricing copy
  may move to CMS-managed content; keep the copy in one component to make
  that migration mechanical.
