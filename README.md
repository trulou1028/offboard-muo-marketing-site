# Offboard Marketing Site

The public marketing site for [Offboard](https://offboard.co) — extracted from the
main app repo (`lumo-plan-builder`, where it lived at `/marketing/homepage`) into a
standalone Next.js project.

## Stack

- Next.js (App Router, TypeScript) — the homepage serves at `/`
- No Tailwind: the page ships its own fully scoped stylesheet
  ([MarketingHomepage.css](src/components/marketing/homepage/MarketingHomepage.css),
  `.marketing-homepage` scope, `--mh-*` tokens)
- Self-hosted variable fonts (Aspekta, Fraunces) in `public/fonts`
- [DESIGN.md](DESIGN.md) — the Clause design system this page follows

## Commands

```bash
npm run dev     # dev server on :3000
npm test        # vitest — the copy/compliance regression harness
npm run e2e     # Playwright against a production build
npm run build   # production build (/ prerenders static)
```

## Notes

- The page is deliberately backend-free — a test asserts zero network calls.
- `robots` is `noindex, nofollow, noarchive` while the site is pre-launch; flip it
  in [src/app/page.tsx](src/app/page.tsx) (and the test + e2e assertions) at launch.
- `lucide-react` is pinned to the app repo's version so icon artwork matches.
- To re-sync content from the app repo, diff against
  `src/pages/marketing/MarketingHome.tsx` and
  `src/components/marketing/homepage/` there; the only local deltas are the
  removed Helmet block, the `"use client"` directive in ProductScenes, and the
  inlined `JourneySituation` type in [stages.ts](src/journey/stages.ts).
