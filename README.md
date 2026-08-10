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

## Deploys

Pushing to `main` deploys to production automatically:

**https://offboard-muo-marketing-site.vercel.app** — the shareable team preview.
Public (no login) but `noindex`, so it stays out of search while we build.

Branch pushes get their own preview URLs, but those are gated behind Vercel SSO —
only team members signed into Vercel can open them.

At launch: point `offboard.co` at this project (the apex is on Framer today) and
flip the robots tag noted below.

## Notes

- The page is deliberately backend-free — a test asserts zero network calls.
- `robots` is `noindex, nofollow, noarchive` while the site is pre-launch; flip it
  in [src/app/page.tsx](src/app/page.tsx) (and the test + e2e assertions) at launch.
- `lucide-react` is pinned to the app repo's version so icon artwork matches.
- **Last synced from `lumo-plan-builder` commit `88751f7a`** ("Match marketing
  homepage to approved Paper design"). To re-sync, diff that repo's
  `src/pages/marketing/MarketingHome.tsx`, `src/components/marketing/homepage/`,
  and `public/marketing/homepage/` against here. The only local deltas are the
  removed Helmet block (replaced by the Metadata API), the `"use client"`
  directive in ProductScenes, and the inlined `JourneySituation` type in
  [stages.ts](src/journey/stages.ts). Check out `origin/main` there first — a
  stale local checkout is how this repo shipped an old design once already.
- The e2e suite waits for React hydration before clicking. Next server-renders
  the tab buttons, so a click can otherwise land before the listeners attach and
  be silently dropped — the Vite original had no such window.
