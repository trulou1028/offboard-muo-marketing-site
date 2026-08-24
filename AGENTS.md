# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

# Offboard marketing site — working agreement

This repo is the public marketing site for **Offboard** (offboard.co), "the modern
unemployment office." Stack: Next.js App Router + TypeScript on Vercel. **No
Tailwind** — the site ships one scoped stylesheet. Sibling repos: the app is
`lumo-plan-builder` (app.offboard.co); the currently-live legacy site is a third
(TanStack) repo that this one replaces at cutover. All routes stay `noindex`
until the public launch decision.

## Sources of truth — read the relevant one before you write

| Question | Document |
| --- | --- |
| Any user-facing string, language rules, facts ledger | `COPY.md` |
| Colors, type, spacing, design tokens | `DESIGN.md` |
| Page roles, sitemap, section order, redirect map | `docs/site-architecture.md` |
| Future `/resources` article strategy | `docs/content-roadmap.md` |
| Domain cutover gates | `docs/cutover-checklist.md` |
| Backlog plans + executor protocol | `plans/README.md` |

When porting new substance from the app repo, source it from
`lumo-plan-builder` **`origin/main`**, never a local checkout — a stale checkout
once shipped an outdated design. For copy that already ships here, `COPY.md`
supersedes the app repo's strategy docs.

## Copy law

- **Copy changes land in `COPY.md` first, or in the same PR.** A PR that changes
  user-facing copy without touching `COPY.md` is incomplete.
  `src/components/marketing/homepage/CopyDrift.test.tsx` enforces this: a red
  drift test means doc and code disagree — fix whichever is wrong, same PR.
- **Never-say vocabulary** (`COPY.md` § Language rules): no "platform",
  "solutions", "career transition services", "modules", "workspace", "agents".
  "Outplacement" is allowed only on `/employers` and in Sponsored-tier copy.
- **`/act` has a B2G language firewall**: "the modern unemployment office" and
  the other banned claims never appear there; Alameda County is geography only,
  never endorser or sponsor. `/act`'s own vocabulary ("career transition",
  "workspace") never leaks to other pages.
- No em dashes in site copy. Never promise funding, eligibility, interviews, or
  placement. One primary CTA per view ("Build my free transition plan").
- Update the copy regression tests (`MarketingHome.test.tsx`,
  `e2e/homepage.spec.ts`) in the same PR as any copy change.

## Design hard rules

- **No Tailwind, no CSS-in-JS.** Styles live in
  `src/components/marketing/homepage/MarketingHomepage.css` under the
  `.marketing-homepage` scope with `--mh-*` tokens. New surfaces extend the
  token set; never hardcode colors that a token already names.
- Palette and type come from `DESIGN.md`. **Violet is reserved for LUMO/AI**,
  never decorative.
- Fonts are self-hosted variable fonts (Aspekta, Fraunces) in `public/fonts` —
  no font CDNs.

## Definition of done — you run the checks, unprompted

1. **Always:** `npm test` and `npm run build` green. Never report work as done
   on a red suite; if something fails, say so with the output.
2. **Touched routes, nav, redirects, or the intake form?** → `npm run e2e` too.
3. **Visual change?** → verify in the browser preview (launch config
   `marketing-site`, port 3000): renders, no console errors, mobile width.
4. **Copy change?** → COPY.md + drift/regression tests updated, same PR (above).

## Source control and deployment

- GitHub `main` is the source of truth for production.
- Work on a feature branch, commit every production file, and push the branch so
  Vercel creates a Git-backed preview.
- Production releases happen by merging a verified pull request to `main`.
  Vercel deploys `main` automatically — **merging is shipping.**
- **Shipping gate:** for any user-facing change, give Louie the Vercel preview
  URL plus what to look at, and merge only after he says go. Docs, plans,
  tests, CI, and refactors with no visual change may merge without asking.
- Do not run `vercel --prod`, deploy through the Vercel API, or promote a dirty
  local worktree.
- Never call a deployment synchronized unless its Vercel metadata identifies the
  exact GitHub commit on `main` and does not report `gitDirty: 1`.

## Guardrails (hard)

- **`/act` never receives a redirect** and stays out of header/footer nav. It is
  a live, out-of-nav B2G landing URL (`docs/site-architecture.md`).
- **`npm run imagery` costs real money** (~$3–5/run, OpenAI image gen) and needs
  the owner's API key. Run it only with Louie's go-ahead; `npm run imagery:dry`
  is free.
- Secrets never go through chat. Have Louie paste them into the session
  scratchpad, or run the step himself.

## Executing a plan from `plans/`

Read the plan fully before starting, honor its STOP conditions (owner gates can
block a plan at the finish line), and update your row in `plans/README.md` when
done, with branch name and review status.
