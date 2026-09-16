# Design QA: Relume whole-page privacy pilot

## Source visual truth

- Pre-pilot desktop capture: `/tmp/relume-whole-page-audit/01-privacy-desktop.png`
- Pre-pilot mobile capture: `/tmp/relume-whole-page-audit/02-privacy-mobile.png`
- Relume structural references retrieved through the Relume MCP:
  - `Content 28` for page-level wayfinding
  - `Layout 294` for the four proof columns
  - `Comparison 13` for the sponsored-access contrast
  - `Content 17` for the connected-assistants split
  - `Content 22` for the honest-limits disclosure
  - `Description List 1` for the rights ledger

The target is deliberately hybrid. Offboard's approved security copy and Civic Modern visual language remain the source of truth. Relume contributes section architecture only, with no Tailwind, shadcn, runtime package, icon package, or new dependency.

## Preserved surfaces

- Shared navigation: unchanged.
- Privacy & Security hero: unchanged.
- Custom access matrix: unchanged.
- FAQ behavior and content: unchanged.
- Closing CTA and shared footer: unchanged.

The footer remained in place because the audited Relume footer candidate added more structure without improving this route's information hierarchy.

## Implementation evidence

- Reviewed desktop actual: `test-results/visual-Marketing-site-visu-756a8-ne-privacy-security-desktop-chromium/privacy-security-desktop-actual.png`
- Reviewed mobile actual: `test-results/visual-Marketing-site-visu-126c7-ine-privacy-security-mobile-chromium/privacy-security-mobile-actual.png`
- Updated visual baselines:
  - `e2e/visual.spec.ts-snapshots/privacy-security-desktop-chromium-darwin.png`
  - `e2e/visual.spec.ts-snapshots/privacy-security-tablet-chromium-darwin.png`
  - `e2e/visual.spec.ts-snapshots/privacy-security-mobile-chromium-darwin.png`

## Viewports and normalization

- Desktop implementation: 1440 x 7026 pixels at a 1440 x 900 CSS viewport, device scale factor 1.
- Tablet implementation: 768 x 9022 pixels at a 768 x 1024 CSS viewport, device scale factor 1.
- Mobile implementation: 390 x 11101 pixels at a 390 x 844 CSS viewport, device scale factor 1.
- Playwright disabled animations, waited for fonts, and captured stable full-page screenshots.
- The browser audit separately checked the route at 390 x 844, confirmed a 390px document width, one H1, and no duplicate IDs.

## Full-view comparison evidence

The visual suite changed only the three Privacy & Security baselines. Desktop height moved from 6770px to 7026px, tablet from 8419px to 9022px, and mobile from 10297px to 11101px. The additional height is expected from the seven-link page index, explicit comparison containers, and expanded rights ledger. The generated actuals were reviewed before the three snapshots were deliberately recaptured.

## Section findings

- Page index: the compact Content 28 translation gives the long page clear navigation without introducing a sticky rail or changing the shared nav.
- Page index composition: the primary destination spans two cells so the seven-link index fills complete rows at desktop and tablet, satisfying DESIGN.md R1 without changing the one-column mobile order.
- Receipts: Layout 294's four-part proof rhythm is expressed with numbered editorial columns rather than generic feature cards.
- Sponsored access: Comparison 13's visible contrast makes the boundary between aggregate sponsor data and private user data easier to scan.
- Connected assistants: Content 17 creates a clear heading-to-explanation relationship and remains distinct from the more detailed honest-limits ledger below it.
- Honest limits: the existing Content 22 pilot remains the strongest structure for the consequential disclosure copy.
- Rights: Description List 1 becomes a numbered two-column ledger on desktop and preserves source order in one column on mobile.

## Required fidelity surfaces

- Typography: existing Fraunces display headings and Civic Modern body typography are preserved.
- Spacing and rhythm: each section keeps the route's existing full-width band structure and section padding.
- Colors and tokens: the implementation uses existing `--mh-*` tokens only.
- Assets: no image, generated asset, SVG, or CSS-drawn illustration was introduced.
- Copy: approved claims and security explanations are unchanged. The only new user-facing copy is the concise `On this page` index, added to `COPY.md` in the same change.
- Responsive behavior: the proof columns, comparison, connected split, and rights ledger all collapse without horizontal overflow at 390px.

## Interaction and browser checks

- Loaded `/privacy-security` locally at desktop and mobile widths.
- Checked the page index anchor behavior and inspected the receipts and sponsor comparison at mobile width.
- Confirmed `scrollWidth` equals `innerWidth` at 390px.
- Confirmed one H1 and no duplicate IDs.
- Confirmed no browser console errors. The only browser warning was the pre-existing development-only LCP suggestion for the shared logo.
- No new scripted interaction or client dependency was introduced.

## Findings

No actionable P0, P1, or P2 mismatch remains.

## Follow-up polish

- P3: Mobile page height increases by 804px. The tradeoff is acceptable because the index improves wayfinding and the new proof, comparison, and rights layouts materially improve scanability.

## Implementation checklist

- [x] Preserve the shared navigation, current hero, and shared footer.
- [x] Preserve exact security claims and long-form copy.
- [x] Use scoped Civic Modern CSS only.
- [x] Avoid Tailwind, shadcn, Relume runtime dependencies, and new assets.
- [x] Verify desktop and mobile rendering.
- [x] Review and deliberately update only the affected visual baselines.
- [x] Pass the full repository browser suite after snapshot recapture.

final result: passed
