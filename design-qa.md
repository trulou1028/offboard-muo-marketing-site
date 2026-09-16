# Design QA

Date: 2026-09-16

## Scope

- Mobile pricing plan cards
- `/integrations` permissions section
- `/layoff-support` hero composition
- `/job-search` hero composition
- `/privacy-security` connected-assistant copy reflow

## Reference and result

The committed Playwright screenshots in `e2e/visual.spec.ts-snapshots/` were the pre-change reference. The updated screenshots use the same Chromium environment and the same desktop, tablet, and mobile viewports.

Reviewed result screenshots:

- `pricing-tablet-chromium-darwin.png`
- `pricing-mobile-chromium-darwin.png`
- `integrations-{desktop,tablet,mobile}-chromium-darwin.png`
- `layoff-support-{desktop,tablet,mobile}-chromium-darwin.png`
- `job-search-{desktop,tablet,mobile}-chromium-darwin.png`
- `privacy-security-mobile-chromium-darwin.png`

## Checks

- Pricing cards stack at small widths without clipped headings, compressed prices, or overlapping CTAs.
- Both refreshed heroes preserve the subject, keep the product card readable, and stay within the hero column at all three viewports.
- The integrations access-level panel aligns with the adjacent copy and stacks cleanly on mobile.
- No changed route has horizontal overflow.
- The CSS reset-shadowing suite reports no spacing rules that fail to render.
- The full Playwright suite completed with 129 passing tests and no browser-console regressions.

## Final result

Passed.
