# Plan 048: Real app screenshots in the product-page heroes

> **Execute with:** Opus 5 · medium — image work with browser verification, on approved copy; the judgment that matters is what a crop may show, and that is a rule rather than a call.

> **Reconstructed 2026-09-14.** Executed 2026-09-07 and shipped alongside plan
> 046 as [PR #79](https://github.com/trulou1028/offboard-muo-marketing-site/pull/79)
> (`70162aa`); the plan file never reached `main`. Written from the shipped
> commit and `COPY.md` §§ 10 to 14.

## Status

- **Status:** BUILT 2026-09-07, merged via PR #79. Superseded on 2026-09-08 by
  plan 049, which replaced all four hero screenshots with the owner's Civic
  Modern compositions: the screenshots were 1x and soft on a Retina screen.
  This file restored 2026-09-14.
- **Priority:** P1 · **Effort:** M · **Risk:** MED (personal data in a crop).

## Why this plan existed

The product pages opened on drawn compositions. Showing the actual product is
stronger evidence than a drawing of it, and the owner offered a logged-in
session to capture from.

## What shipped

Four heroes opened on the real app, captured from the owner's own browser
session on 2026-09-07:

- `/career-context` — the Career Context page
- `/lumo` — the Ask LUMO panel
- `/job-search` — the Application Packet builder, step picker open
- `/layoff-support` — the Runway page

The plan-042 and plan-046 compositions they replaced were retired with their
CSS. A new `Shot` figure frames a screenshot; the hero's two-column visual rule
yields to the phone stack.

## The two rules the capture ran under

1. **No credential passes through chat.** The owner signed in themselves; the
   session was driven through their own browser. This is a standing constraint,
   not a plan-specific one.
2. **Every crop is checked for personal data and for any figure the
   verified-facts ledger does not cover.** A number visible in a screenshot is
   a published claim, and no test can read pixels.

## Verification as run

Fifteen baselines re-captured deliberately (five routes at three widths). Full
suite green.

## Why it was superseded

Plan 049 placed the owner's Codex-generated Civic Modern compositions in these
four heroes instead. The screenshots were captured at 1x and read soft on a
Retina display; the compositions are drawn in the site's own system and stay
sharp at any size. The captured files are unreferenced.
