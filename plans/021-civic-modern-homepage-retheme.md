# Plan 021 — Civic Modern homepage retheme

> **Execute with:** Opus 5 · medium effort — a retheme onto the owner's design system, judged by the visual baseline. *(Executed. Model line added retroactively 2026-09-01 under plans/README.md § "The model line".)*

Owner-directed (2026-08-30). Louie built the "Offboard Modern Civic" design
system in Claude Design; the site adopts it. Reference lives in
`docs/design-system-civic-modern/` (`readme.md` is the spec; `tokens/*.css`
carry the values).

## Owner decisions

1. **Homepage only first.** Retheme `/` (colors, fonts, type, spacing, radii,
   shadows, buttons); layout and copy do not change. Other routes keep the
   legacy look until a later rollout plan.
2. **Forest primary buttons.** Lumo lime `#B8F24A` is reserved for AI moments
   only. The lime CTAs go forest.
3. **Plan 018 Phase 2 waits** and is re-scoped after this lands.
4. **New logo ships site-wide** (single shared `Brand()` image; a per-page
   logo split would flicker between routes).

## Mechanism

- All theming lands in `src/components/marketing/homepage/MarketingHomepage.css`.
- A font indirection (`--mh-font-body`, `--mh-font-display`) makes the
  family swappable per scope; non-home routes keep Aspekta/Fraunces.
- One override block `.marketing-homepage.mh-page-home { … }` re-values the
  `--mh-*` tokens for the homepage; tokenized rules retint automatically.
  Homepage-scoped rules migrate the untokenized literals and the lime
  role change (decorative lime → paper/mist/forest per element; sage only as
  the money-clock progress fill; sage fails text contrast at ~2.4:1).
- Newsreader + Inter are self-hosted variable fonts in `public/fonts`
  (`NewsreaderVF.woff2`, `InterVF.woff2`) via `next/font/local` — the design
  system's Google Fonts `@import` is never used (AGENTS.md: no font CDNs).
- New wordmark overwrites `public/marketing/homepage/offboard-logo-light.png`
  in place at 520×106 (ArticleFidelity snapshot embeds src/srcset + size, so
  an in-place overwrite is the zero-code-change path).

## Deliberate deviations from the design-system export

- Container formula (`--mh-page-max/gutter/page-x`) is untouched; the DS's
  flat 32px gutter is rejected this pass (CI container-alignment test
  enforces the current formula).
- The DS's fixed type sizes become desktop clamp endpoints
  (display 64, section 40); component micro-sizes keep current values.
  Full type-scale adoption is rollout work.
- The DS puts a lumo button on the final dark CTA; the owner's lime-AI-only
  rule wins — dark-band CTAs use the DS `onDark` variant (paper bg, ink text).
- The DS has no third green; `--mh-footer` maps to forest-deep, so homepage
  footer and hero share a color.
- Class names (`is-lime` etc.) are NOT renamed (ArticleFidelity snapshot,
  DeadSelectors, prior BEM-rename rejection). Naming debt noted for rollout.

## Verification

`npm run lint:css` · `npm test` (zero snapshot updates allowed) ·
`npm run build` · `npm run e2e` · `npm run test:visual` with a font-indirection
no-op checkpoint first, then a full run where home×3 shows the retheme and the
other 30 baselines differ only in the header-logo region, then a deliberate
`--update-snapshots` regeneration, stated in the PR.

## STOP conditions

- Preview URL + owner sign-off before merge (visual change; AGENTS.md gate).
- `uploads/` (9MB duplicates) and the 7MB style-guide PDF in
  `docs/design-system-civic-modern/` stay local/gitignored until the owner
  OKs deleting them.
