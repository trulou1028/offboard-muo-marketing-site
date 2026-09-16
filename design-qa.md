# Design QA

Date: 2026-09-16

## Scope

- `/application-packet` route promotion and hero composition
- `/layoff-support` hero composition
- Product and Resources mega-menu hierarchy
- Product navigation and footer route updates
- Desktop, tablet, and mobile layout containment

## Reference and result

The committed Playwright screenshots in `e2e/visual.spec.ts-snapshots/` were the pre-change reference. The updated screenshots use the same Chromium environment and the same desktop, tablet, and mobile viewports. The old `job-search` baselines were retired when the canonical route became `/application-packet`.

Reviewed result screenshots:

- `application-packet-{desktop,tablet,mobile}-chromium-darwin.png`
- `layoff-support-{desktop,tablet,mobile}-chromium-darwin.png`
- The full visual baseline set for the updated Application Packet label and destination in shared navigation and footer surfaces

## Checks

- Both refreshed heroes present the product UI as one layered white-card system. The final revision removes the documentary photo layer and gives that UI the full visual column.
- Both desktop mega menus lead with navigation columns and reserve the third column for the featured guide or newsletter.
- Career Context is visible in The system alongside Lumo and Integrations; the Product feature promotes the published first-week guide instead of duplicating a product destination.
- Floating status chips remain clear of card titles and labels at all three viewports.
- The Application Packet headline, artwork, and CTA stay within the mobile viewport without clipping or horizontal overflow.
- `/job-search` redirects to the canonical `/application-packet` route, and shared navigation points directly to the canonical route.
- The production visual harness completed with 65 passing screenshot and alignment checks.
- The full production-browser suite completed with 129 passing tests and no browser-console regressions.

## Final result

Passed.
