# Plan 030 — Layoff & Benefits (/layoff-support)

Phase 2, third item, of the site IA roadmap (plan 026). Built 2026-08-31.

The strategy doc calls this the strategically important pillar: without it
the product pages drift toward an AI job-search tool and away from the
modern unemployment office. It is also the most claim-sensitive page on
the site, so the discipline matters more than the design here.

## Sections

Hero → the six questions people actually ask, in arrival order (the doc's
list verbatim) → how it helps → the shared `VerifiedFactsStrip` → "Offboard
is not a government agency" → then the search → final CTA. Existing
patterns only, no new classes. Bands: deep, sand, paper, white, forest,
mist, forest, footer.

## Claim discipline

- **No number on this page is new.** The only figures render through the
  shared `VerifiedFactsStrip`: live states CA/NY/NJ/WA and 4,000+
  state-approved California programs, both existing ledger rows. The
  ledger's "Appears on" column was updated for both in the same edit.
- The approved formulation ships verbatim: "We never promise funding. We
  show you the exact path to find out."
- The independence disclaimer gets its own band, reusing the `/about`
  wording rather than a new paraphrase, plus "claiming your benefits is
  always free".
- "Outplacement" must not appear (jobseeker narrative copy); the page is
  in the CopyDrift absence list.

A temporary Playwright spec asserted the page says none of
outplacement/platform/guarantee/"you qualify"/"you are eligible"/"we will
get you", contains no em dash, and DOES contain all three required
safeguard lines. It passed, then was deleted; re-create from this
paragraph if the page's copy is ever reworked.

## Deliberately not shipped, owner's call

The `~$12,000` CalJOBS extension example and the `2,000+ job centers`
framing both have approved ledger rows and both left the homepage in v2.
This page is their natural home. The owner decided on 2026-08-31 to keep
the $12,000 hook off for now, so neither was resurrected without asking.
Adding either is a one-line change plus a ledger "Appears on" update.

## Owner gate

Page copy needs sign-off, and the two-numbers question above is a direct
yes/no for the owner.
