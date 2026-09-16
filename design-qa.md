# Design QA: Relume Content 22 privacy pilot

## Source visual truth

- Existing production page capture: `/tmp/privacy-relume-audit/01-desktop-revealed.png`
- Existing production mobile capture: `/tmp/privacy-relume-audit/03-mobile-revealed.png`
- Selected structural reference: Relume `Content 22`, retrieved through the Relume MCP as `section_content22`
- Relume preview: `https://cdn.prod.website-files.com/61789b489343c8242282a0ae/640532f9ec8bf79eb175a20a_section_content22.png`

The intended target is intentionally hybrid: preserve Offboard's Civic Modern visual system and exact approved security copy, while adopting Content 22's left-heading and right-reading-column composition with ruled disclosure rows.

## Implementation evidence

- Desktop section: `/tmp/relume-content22-pilot/implementation-desktop-section.png`
- Mobile section: `/tmp/relume-content22-pilot/implementation-mobile-section.png`
- Updated visual baselines:
  - `e2e/visual.spec.ts-snapshots/privacy-security-desktop-chromium-darwin.png`
  - `e2e/visual.spec.ts-snapshots/privacy-security-tablet-chromium-darwin.png`
  - `e2e/visual.spec.ts-snapshots/privacy-security-mobile-chromium-darwin.png`

## Viewports and normalization

- Desktop source: 1296 x 6570 pixels at a 1296 x 798 CSS viewport, device scale factor 1.
- Desktop focused implementation: 1296 x 867 pixels at the same 1296px CSS width, device scale factor 1.
- Mobile source: 390 x 10168 pixels at a 390 x 844 CSS viewport, device scale factor 1.
- Mobile focused implementation: 390 x 1250 pixels at the same 390px CSS width, device scale factor 1.
- The source captures show the complete page; the implementation captures isolate the changed section. Width and density match. No resampling was used.
- State: page loaded, fonts ready, reveal animation completed, section scrolled into view.

## Full-view comparison evidence

The Playwright baseline diff changed only the rebuilt honest-limits section and the expected vertical displacement of content below it. Desktop page height changed from 6705px to 6770px, tablet from 8321px to 8419px, and mobile from 10168px to 10297px. The new baselines were reviewed before deliberate recapture.

## Focused region comparison evidence

The desktop implementation establishes the intended 1:1.5 column relationship: the kicker and heading remain a stable left anchor while the explanatory prose occupies the wider reading column. The final control statement and certification disclosure are separated into ruled rows. At 390px, the composition becomes one column without horizontal overflow and retains the existing copy order.

## Required fidelity surfaces

- Fonts and typography: Existing Fraunces display headings and Civic Modern body typography are preserved. The body measure, 17px size, and 1.7 line height improve the long-form reading experience without changing copy.
- Spacing and layout rhythm: The desktop grid, 48px disclosure separation, and ruled rows match the selected Content 22 structure. Mobile stacks at the site's 900px breakpoint and keeps the existing section padding.
- Colors and visual tokens: Only existing `--mh-*` tokens are used. Paper, ink, muted copy, and line colors remain consistent with adjacent sections.
- Image quality and asset fidelity: The selected section contains no imagery or icons. No placeholder, generated, SVG, or CSS-drawn asset was introduced.
- Copy and content: Every approved sentence is unchanged. The implementation only groups the final two statements into ruled rows.

## Interaction and browser checks

- Loaded `/privacy-security` locally in the browser at desktop and mobile widths.
- Scrolled through the rebuilt section and confirmed reveal behavior.
- Confirmed no horizontal overflow through the repository E2E suite.
- Confirmed no browser console errors or warnings in either captured viewport.
- No new interactive controls were introduced.

## Findings

No actionable P0, P1, or P2 mismatch remains.

## Comparison history

- Initial implementation: the selected two-column desktop composition and single-column mobile reflow rendered as intended. No visual fix was required after the first browser comparison.
- Snapshot review: the three Privacy & Security baselines moved only for the intended section and downstream page-height shift. They were then deliberately recaptured and passed on rerun.

## Follow-up polish

- P3: The mobile section is 129px taller than the prior version because of the increased reading line height and disclosure separation. This is an acceptable tradeoff for legibility on the page's most consequential explanation.

## Implementation checklist

- [x] Preserve exact security copy.
- [x] Use scoped Civic Modern CSS only.
- [x] Avoid Tailwind, shadcn, Relume runtime dependencies, and new assets.
- [x] Verify desktop and mobile rendering.
- [x] Review and deliberately update affected visual baselines.
- [x] Pass the full repository browser suite.

final result: passed
