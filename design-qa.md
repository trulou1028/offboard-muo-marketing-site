# Design QA: Relume Header 47 and 49 route pass

## Comparison target

- Source visual truth: `/var/folders/vg/n35ktt4537z14w11vggjj7cr0000gn/T/TemporaryItems/NSIRD_screencaptureui_JBRU9h/Screenshot 2026-09-17 at 10.35.22 AM.jpg`
- Source dimensions: 2340 x 822 px, supplied Relume library comparison showing Header 47 and Header 49.
- Implementation screenshots: `/tmp/offboard-compact-headers/`
- Implementation dimensions: desktop 1440 CSS px wide and mobile 390 CSS px wide, device scale factor 1, full-page PNG captures.
- Routes: `/pricing`, `/companies`, `/privacy-security`, `/about`, `/how-it-works`, `/communities`, and `/workforce`.
- State: initial page load, reduced motion, production build.

## Full-view comparison evidence

The source establishes the component structure rather than Offboard's finished styling: a compact, top-aligned two-column header; Header 47 includes a CTA and Header 49 does not. The implementation preserves that structure while intentionally translating typography, color, spacing, and buttons into the existing Civic Modern system. Desktop captures show the title and content columns sharing the same top edge. Mobile captures show the columns stacking without horizontal overflow.

## Focused region comparison evidence

A separate crop was not needed. The header text, CTA, supporting note, divider, and column alignment are readable in the 1440 px captures, and the mobile captures directly expose wrapping and spacing at 390 px. There are no source image assets or icons to compare inside these headers beyond the existing CTA arrow.

## Required fidelity surfaces

- Fonts and typography: passed. Existing Fraunces display headings and the Civic Modern UI/body faces are retained. Heading hierarchy and semantic H1 structure remain intact.
- Spacing and layout rhythm: passed. Header 47 and 49 use the source's compact two-column composition, top alignment, and responsive single-column stack. The approved pages reveal their next sections sooner.
- Colors and visual tokens: passed. All surfaces use existing `--mh-*` tokens and the dark-green, paper, muted-text, and lime-action roles. No new hardcoded palette was introduced.
- Image quality and asset fidelity: passed. These components contain no new raster assets. Existing page imagery below the headers is unchanged.
- Copy and content: passed. Existing page copy, disclosures, and Header 47 CTAs are preserved. The approved Header 49 pages intentionally remove the hero CTA; `COPY.md` and `docs/site-architecture.md` record the revised page actions.

## Findings

No actionable P0, P1, or P2 differences remain. The Civic Modern styling differences from the monochrome Relume previews are intentional product constraints, not fidelity defects.

## Comparison history

1. Initial repository visual comparison reported 21 changed baselines, exactly seven approved routes across desktop, tablet, and mobile. All untouched routes remained stable.
2. The implementation captures were inspected for type wrapping, top alignment, CTA hierarchy, section transition, mobile stacking, and overflow. No P0, P1, or P2 issue was found.
3. The 21 intentional baselines were deliberately recaptured. The full 128-test browser suite then passed with no console errors or horizontal-overflow failures.

## Implementation checklist

- Shared Header 47/49 layout variant: complete.
- Seven approved route assignments: complete.
- Desktop, tablet, and mobile baselines: complete.
- Copy and architecture contracts: complete.
- Production build and complete browser suite: complete.

final result: passed

---

# Design QA: Application Packet prelaunch refinement

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
