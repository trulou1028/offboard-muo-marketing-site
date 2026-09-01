# Plan 035 — Workforce & Government (`/workforce`), and the `/public-partners` consolidation

**Status: executed on branch `claude/workforce`.** Phase 3 of the site IA
roadmap (plan 026), second item. Also closes plan 026's open decision 1.

## What shipped

`/workforce` replaces `/public-partners`. The thin crosslink page is gone,
its URL 301s here, and the public-sector section that plan 005 had parked on
`/employers` moves here too. `/employers` keeps a one-line crosslink and its
contact band is retargeted to employers, which is what it should have said
all along.

Section order: hero (deep, with the boundary aside) → what Offboard does
beside your program (EditorialGrid, moved verbatim from `/employers`) → what
a sponsored resident gets (sand) → the reporting boundary (forest) → how a
pilot starts (mist) → Offboard is not a government agency (forest) → contact
band (deep).

## The discipline that governed the copy

This page sits inside the **B2G language firewall**, the same rules `/act`
runs under. Three things follow from that, and a temporary Playwright spec
asserted all of them in a real browser before this landed:

1. **No category claim, no endorsement language.** "The modern unemployment
   office", "guaranteed", "government-endorsed", "case management
   replacement", "benefit eligibility system" all absent.
2. **`/act`'s scoped vocabulary does not travel.** "Career transition" and
   "workspace" are allowed on `/act` only, so the resident-benefit section
   is rewritten off `/act`'s rather than reused from it.
3. **No county is named.** `/act` names Alameda County because that page is
   scoped to that pilot and the owner approved it as geography. On a general
   agency-facing page, a county name reads as a reference or a signed
   relationship, and no such claim is approved.

## What is deliberately NOT claimed

The app repo's `documentation/b2g-documentation/` set describes WIOA and
WARN compliance reporting, equity and demographic dashboards, cross-agency
routing, case-management integration, procurement vehicles, and ROI figures.
**None of it is on this page.** The app repo's own plan 047 records the B2G
pilot as frozen at one seeded jurisdiction, which makes that document set a
roadmap rather than a claim register. Every sentence here traces instead to
copy already approved for public display on `/act` or `/employers`.

There are also **no prices**. Employer pricing is public; B2G pricing is
volume-based and procurement-dependent with no owner approval for public
display, so the page ends in a conversation.

The one number is the suggested pilot shape (one jurisdiction or cohort · 25
to 100 residents · 3-month sponsored access · first review after 30 days),
which has an existing verified-facts ledger row and ships, as the ledger
requires, as "suggested" rather than as a claim about actual participation.

## The consolidation, in full

- `src/app/public-partners/` and `MarketingPublicPartners` deleted; the
  `MarketingRoute` union swaps `public-partners` for `workforce`.
- `/public-partners` → `/workforce` 301 in `next.config.ts`, and in COPY.md's
  redirect map. An e2e test asserts the redirect, not just the new page: the
  old URL is in the wild.
- Footer Partners column: "For Public Partners" → "Workforce & Government".
- COPY.md § 8 rewritten; § 5's public-sector block becomes a crosslink and
  its contact band is retargeted; chrome, redirect map, and decision log
  updated.
- Route lists: sitemap, visual, reset-shadowing, mobile-overflow, CopyDrift
  sweep, DeadSelectors.

## Three defects verification caught

1. **A dead CSS selector.** `DeadSelectors.test.ts` failed on
   `.mh-route-partners-note`, which only the deleted page used. Removed.
2. **A band-rhythm clash.** The resident section followed the EditorialGrid
   and both were paper, so they read as one section. The resident band is
   now sand.
3. **A near-invisible link on dark.** The "See exactly who can see what"
   link inherited `.mh-section-link`'s `--mh-ink` underline, which measures
   about 1.3:1 on the forest band — the same defect class plan 022 fixed for
   focus rings. Measured in the browser, not eyeballed; any link in that band
   now takes the paper pair.

Also worth recording: `DeadSelectors.test.ts` was missing `privacy-security`
from its route list, so plan 034's page was never covered by dead-selector
detection. Added here.

## Still open in phase 3

`/communities` (universities, alumni orgs, associations, nonprofits) and
`/companies` (Company Transition Centers). Then phase 4's dropdown nav,
which is what finally puts `/workforce` in the header.
