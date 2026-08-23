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
| `/about` | Members, press, community, and prospective partners | Understand why Offboard exists, its principles, and its independence | Talk to the team |
| `/employers` | People and HR leaders supporting separated employees | Understand sponsored access, the member experience, and visibility boundaries | Talk about sponsored access |
| `/public-partners` | Workforce, benefits, and public-service organizations | Understand how Offboard complements official systems without making eligibility decisions | Discuss a partnership |

All routes remain `noindex` until the public launch decision is made.

## Section ownership

### Homepage

1. Hero: The Modern Unemployment Office, audience, and primary action.
2. Three jobs: runway, available support, and the next role.
3. Connected-plan proof: a compact example of the unified workspace.
4. Privacy and independence: the minimum trust needed to continue.
5. Human support: a concise explanation of self-serve, Lumo, and people.
6. Pricing teaser: start free and review optional support separately.
7. Final action: build a plan or talk to a person.

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
2. Origin in repeated transition questions and community work.
3. Product principles: clarity, official sources, privacy, and human support.
4. Independence and professional-guidance boundary.
5. Online and Concord contact route.

### Employers

1. Independent transition support after separation.
2. Whole-transition value, beyond resume help.
3. Sponsored access and member privacy boundaries.
4. Program setup and handoff.
5. Employer partnership inquiry.

### Public partners

1. Resident orientation across fragmented systems.
2. Orient, route, and follow through.
3. Clear boundary between planning support and official decisions.
4. Member choice and sponsor visibility.
5. Public partnership inquiry.

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
