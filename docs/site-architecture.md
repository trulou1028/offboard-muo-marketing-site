# Offboard marketing site architecture

## Principle

Each page has one primary job:

- The homepage says what Offboard does and who it is for.
- How it works explains the product journey and why it is useful.
- Pricing helps a visitor evaluate free and paid support.
- About explains why Offboard exists and how it operates.
- Partner pages speak directly to the organization sponsoring or referring people.

This keeps the homepage useful as an orientation page, not a compressed version of the entire site.

## Sitemap

| Route | Primary audience | Page promise | Primary action |
| --- | --- | --- | --- |
| `/` | A person navigating a layoff or job transition | Understand what Offboard is, who it serves, and the three jobs it connects | Build my plan |
| `/how-it-works` | A person evaluating the product | See the complete connected journey across runway, support, and the next role | See my starting plan |
| `/pricing` | A person deciding whether to start or pay | Understand what is free and when optional paid support appears | Start free |
| `/resources` | A person searching for a specific, urgent answer (SEO entry point) | Find the guide or essay that matches what they are looking for right now | Read the guide |
| `/resources/:slug` | Same, landed from search or a `/resources` card | Answer the one question in the title, then route back into the product | More guides / Build my plan |
| `/about` | Members, press, community, and prospective partners | Understand why Offboard exists, its principles, and its independence | Talk to the team |
| `/employers` | People and HR leaders supporting separated employees | Understand sponsored access, the member experience, and visibility boundaries | Talk about sponsored access |
| `/public-partners` | Workforce, benefits, and public-service organizations | Understand how Offboard complements official systems without making eligibility decisions | Discuss a partnership |
| `/act` | Residents eligible for the ACT pilot, and public-sector pilot partners | Understand resident-first sponsored access to Offboard and the program's aggregate-only reporting boundary | Apply for pilot access |

All routes remain `noindex` until the public launch decision is made.

`/act` is intentionally excluded from the header and footer nav. It is a
live, out-of-nav B2G landing URL for the ACT pilot and must never receive a
redirect. The resident application flow lives in the app
(`https://app.offboard.co/act/apply`); this repo owns the landing page only.

## Section ownership

### Homepage

1. Hero: The Modern Unemployment Office, audience, and primary action.
2. The real problem: the questions behind every layoff.
3. `IdentityContrast` (identity contrast): why "unemployment office" is honest, old office vs. modern one.
4. Three jobs: claim what's owed, make your money last, land what's next.
5. Hook: one example deadline worth watching.
6. Connected-plan proof: a compact example of the unified workspace.
7. Verified facts: deadlines and dollar figures checked by people.
8. Pricing teaser: start free and review optional support separately.
9. Employer strip: one sentence and a link to `/employers`, the only B2B content on the page.
10. Community: newsletter, Slack, and a real person.
11. Privacy and independence: the minimum trust needed to continue.
12. Final action: build a plan or talk to a person.

The homepage does not contain the full onboarding demo, benefits demo, job-search tabs, full pricing comparison, company origin story, or partner program details.

### How it works

1. Product promise: one plan that starts from your situation, not a template.
2. The five-step spine, from "what just happened" to "what's next."
3. Starting-plan onboarding, shown with the actual onboarding screen.
4. The toolkit: the flagship Job Packet and the supporting tools, several shown as product renders.
5. Meet LUMO, an AI guide grounded in your plan and verified benefit facts.
6. Possible benefits and official-source handoff, backed by the verified-facts strip.
7. Self-serve, Lumo, and human support.
8. Your context, kept across every tool.
9. Product proof and product FAQ.

### Pricing

1. Free starting point.
2. Core plan and optional added support.
3. When credits or human support may be useful.
4. Price and availability expectations.
5. Pricing FAQ and start-free action.

### About

1. Why Offboard exists.
2. Founder origin story and community work.
3. Product principles: clarity, official sources, privacy, and human support.
4. The ethos: get you out of here, plus common objections answered.
5. Privacy commitments and the independence and professional-guidance boundary.
6. Online and Concord contact route.

### Employers

1. Independent transition support after separation.
2. Whole-transition value, beyond resume help.
3. Pricing and the legacy-outplacement comparison.
4. How sponsorship works: roster, invites, member access, sponsor visibility.
5. Sponsored access and member privacy boundaries, with a concrete visibility example.
6. Why companies do this, and the SB 617 filing-disclosure context.
7. Hiring: free job postings.
8. Public and workforce partner program.
9. Employer FAQ.
10. Employer partnership inquiry.

### Public partners

1. Resident orientation across fragmented systems.
2. Orient, route, and follow through.
3. Clear boundary between planning support and official decisions.
4. Member choice and sponsor visibility.
5. Public partnership inquiry.

### ACT pilot (`/act`)

1. Resident-first hero: sponsored access, geography, and the pilot apply CTA.
2. How the pilot works: the six-step application-to-activation path.
3. A documentary photo section grounding the pitch in real schedules.
4. What residents get from sponsored Offboard access.
5. Worker-controlled privacy: the aggregate-only reporting boundary.
6. For public-sector partners: pilot shape and the workforce-system objection.
7. Pilot inquiries contact band.

This page uses ACT's own approved vocabulary ("sponsored access", "career
transition workspace") scoped to `/act` only, and never uses the sitewide
category claim ("the modern unemployment office"), per the B2G language
firewall for government-facing surfaces.

## Migration status

### Phase 0: source-of-truth repair

- Reconcile the exact live source into Git history.
- Preserve the live production state as its own commit.
- Stop direct production deployments from dirty local worktrees.

Status: complete in commit `6648677`.

### Phase 1: information architecture

- Replace homepage hash links with real routes.
- Move detailed product explanation to `/how-it-works`.
- Move full pricing evaluation to `/pricing`.
- Move the company story to `/about`.
- Add separate employer and public-partner journeys.
- Keep the pre-launch `noindex` policy on every route.

Status: implemented on `codex/marketing-sitemap-migration`.

### Phase 2: Git-backed preview and review

- Push the feature branch.
- Confirm Vercel created the preview from the exact Git commit.
- Verify the preview routes, responsive layout, interactions, console, and network behavior.
- Open and review a pull request.

Status: required before merge.

### Phase 3: production synchronization

- Merge the verified pull request to GitHub `main`.
- Let Vercel deploy from the Git integration.
- Confirm the production deployment Git SHA equals GitHub `main` and is not marked dirty.
- Treat any direct or dirty production deployment as an incident to reconcile, not a new source of truth.

Status: required after approval and merge.

## Release checks

Before a release candidate is pushed:

1. `npm test`
2. `npm run lint`
3. `npm run build`
4. `npm run e2e`
5. Confirm there are no unexpected network requests or console errors.
6. Confirm all six routes fit a 390 px viewport without horizontal overflow.
