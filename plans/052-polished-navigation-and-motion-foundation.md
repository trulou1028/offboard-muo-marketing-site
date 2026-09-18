# Plan 052: Polished navigation and a shared motion foundation
> **Execute with:** Fable 5.1 · high - Navigation focus, dismissal, and animated exits are accessibility-critical.

Status: BUILT 2026-09-18 on `codex/plan-052-navigation-motion`; [PR #121](https://github.com/trulou1028/offboard-muo-marketing-site/pull/121) awaiting owner review.
Authored: 2026-09-18. Source baseline: marketing `origin/main` at `5dfebdc` (freshly fetched, matching this checkout).
Planning branch: `codex/motion-polish-plans`.

Execution note: Louie authorized implementation on 2026-09-18 and the active
Codex GPT-5 session executed it. The full React Motion runtime measured 37.4 KB
over baseline, so the implementation uses `motion/mini` and a shared reduced
motion helper instead; the final production comparison adds 4.0 KB, produces
zero layout shift, and keeps logical panel response under 10ms in the local run.

## Outcome and scope

Make the existing Product and Resources disclosures feel calm and precise when
opened, switched, and dismissed. Preserve the current link order, featured
cards, desktop disclosure semantics, mobile navigation, and primary CTA.
Establish the small shared motion contract used by plans 053 and 054.

This is refinement of the existing navigation, not an information-architecture
redesign. No route changes, new menu destinations, header rebranding, full-screen
mobile takeover, custom scrolling, or sitewide page transitions. `/act` remains
out of navigation. Do not add GSAP, Rive, React Aria, or a new CSS framework for
these three plans; revisit a dependency only if a concrete unmet need appears.

## Recommended implementation models

Verified 2026-09-18:

- **Codex: GPT-6 Astra (`gpt-6-astra`), high.** Available in this task's local
  host catalog, which explicitly supports high effort. The navigation state and
  focus risks justify the stronger model; keep work bounded to this plan.
- **Claude Code: Claude Fable 5.1, high.** Follows this repository's model rule
  for accessibility-critical UI. Anthropic's current model catalog confirms the
  model; account-specific Claude Code entitlement must be checked at execution.
- If repeated focus/timing failures remain, escalate Codex to xhigh for diagnosis
  rather than broadening the implementation. Recommendations do not change the
  active model or authorize implementation.

Source: [Anthropic models](https://platform.claude.com/docs/en/models/overview).
Codex availability evidence is the local host catalog exposed by the task tools.

## Verified starting point

- `MarketingNav.tsx` is already a client component. `NAV_ENTRIES` supplies both
  desktop and mobile navigation. Desktop state distinguishes hover from click;
  clicking a hover-opened trigger pins it open. Blur outside the group,
  outside-pointer dismissal, Escape restoration, and link-follow closing exist.
- Each desktop panel currently uses `hidden={!open}`. CSS animates opening, but
  closing immediately hides the panel. Adding an exit animation cannot simply
  leave all outgoing links focusable while fading.
- Mobile uses native `details`/`summary` and a flattened link list. Preserve its
  accessible baseline; it need not share desktop geometry or focus behavior.
- `MarketingHomepage.css` defines 120ms, 180ms, and 400ms durations and a standard
  easing curve. `MotionController.tsx` handles header scroll state and one-time
  reveals. Its comment claiming it is the only client component is stale.
- `playwright.config.ts` defaults to reduced motion. Existing passing screenshots
  cannot establish that new animations work.
- `package.json` has Next 16.3.0 / React 19.2.8 and no animation dependency.

Read `AGENTS.md`, `DESIGN.md`, `COPY.md` navigation and language rules,
`docs/site-architecture.md`, and the installed Next guides for client components
and server/client boundaries before implementation. Trust actual components when
older comments or historical plan prose disagree.

## Interaction design

| Event | Intended behavior |
| --- | --- |
| Hover with a fine pointer | Open the matching disclosure after a short intent delay (start at 100ms); moving into the panel keeps it open. |
| Leave a hover-opened group | Allow a short exit grace period (start at 120ms) for diagonal travel; close if pointer and focus have both left. Cancel stale timers on re-entry. |
| Click or keyboard activation | Open immediately. Retain current hover-to-click ownership. Second activation closes. No hover-only access. |
| Switch Product to Resources | Switch logical ownership immediately; outgoing content stops accepting focus/clicks. Brief coordinated fade/translation in a stable aligned frame, without two interactive panels. |
| Escape | Close immediately at the semantic level and restore focus to the originating trigger. Visual exit must not delay keyboard access. |
| Tab / Shift+Tab | Follow normal document order; close on leaving the active group. Do not trap focus or introduce menubar roles. |
| Outside click / follow a link | Dismiss without stealing focus back from the clicked destination or delaying navigation. |
| ArrowDown | Retain current opening behavior. Keep focus on the trigger unless intentionally implementing and testing a complete first-link focus behavior. |
| Desktop/mobile breakpoint crossing | Clear stale panel state and timers; no hidden focused control or page-scroll lock remains. |

Keep content readable throughout. Start with 180ms panel transitions, 120ms
control feedback, opacity and at most 4-8px movement, without bounce. Avoid
scaling text. An active underline may move between triggers, but it must not
replace the persistent indication of the current page.

Mobile retains native disclosure behavior and logical link order. Use CSS for
chevron and control feedback. A height animation is optional and must yield to
native operability, tall-menu scrolling, and reduced motion. No focus trap or
body locking is needed for a nonmodal disclosure.

## Shared motion contract for 052-054

1. Prefer CSS for simple control states. Use the `motion` package's mini engine
   for coordinated navigation transitions. A future React entrypoint must be a
   narrow, measured boundary. Lock a version compatible with installed React/Next.
2. Keep layout, typography, color, spacing, and responsive styles in the scoped
   `MarketingHomepage.css` using `--mh-*` tokens. Motion may write runtime
   transform/opacity values; that is animation plumbing, not permission for a
   second styling system. Add any new design tokens to `DESIGN.md`.
3. Keep server-rendered content and narrow client boundaries. No root conversion
   of every page to a client component. Scope any motion configuration to the
   interactive surfaces. Use lazy feature loading where measurement warrants it.
4. Both initial and dynamically changed reduced-motion preferences must yield
   immediate understandable state changes. Suppress spatial motion and demo
   autoplay. CSS's global reduced-motion rule alone does not control JS motion.
5. Content must be useful before hydration and when JavaScript fails. Demos keep
   their static explanation visible; controls requiring JS appear only when
   usable. Preserve mobile navigation and footer links without JS.
6. Do not put a second entrance system on an element already controlled by
   `data-reveal`. Keep the existing controller for unrelated sections. Verify
   route transitions do not leave new content hidden or stale listeners active.
7. Pause/cancel demo sequencing on unmount, hidden tab, or leaving the viewport.
   Do not move focus with animation. Avoid continuous loops and simulated live
   network/generation progress. New UI strings go into `COPY.md` with tests.
8. Record baseline and changed route JS transfer, layout shift, and input
   responsiveness under identical browser conditions. Provisional budgets:
   shared navigation adds no more than 25 KiB gzip-equivalent client JS;
   each demo adds no more than 20 KiB beyond the shared runtime. No new
   third-party requests or idle animation loop. If exceeded, simplify or lazy
   load before asking to revise the budget. These are targets, not measured facts.

References, checked 2026-09-18:
[Motion installation](https://motion.dev/docs/react-installation),
[accessibility](https://motion.dev/docs/react-accessibility),
[bundle control](https://motion.dev/docs/react-reduce-bundle-size),
[exit transitions](https://motion.dev/docs/react-animate-presence).

## Implementation sequence after authorization

1. Refresh `origin/main`, inventory current nav behavior and capture baseline
   desktop/mobile states using the repo harness. Record any pre-existing failure.
2. Add Motion and the smallest shared configuration needed. Document the motion
   contract in `DESIGN.md`; do not create a generic animation framework.
3. Refine desktop transitions and pointer intent. Model logical open state
   separately from visual exit lifetime. Move focus out before making a closing
   panel inert/hidden to assistive technology; unmount after the exit. Never leave
   an `aria-hidden` subtree containing focus. On interruption, latest input wins.
4. Refine mobile feedback without changing its navigation model. Preserve all
   copy, links, CTA treatment, route exclusions, and responsive header geometry.
5. Extend semantic and browser tests, inspect motion enabled, then run all checks
   below. Update the plan index with implementation branch and review status.

Expected files: `MarketingNav.tsx`, `MarketingHomepage.css`, `DESIGN.md`,
`package.json` and lockfile, a small shared motion helper if needed, relevant
unit tests, and `e2e/homepage.spec.ts` or a focused new navigation spec.
Touch `MotionController.tsx` only for required coordination and stale comments.
`COPY.md` changes only if visible/accessibility text changes.

## Acceptance and verification

- Test hover-to-click ownership, diagonal pointer travel, fast switching,
  repeated Escape, outside click, blur dismissal, link following, keyboard-only
  operation, touch activation, and resize while open. No delayed timer reopens a
  dismissed panel. Closed and outgoing links are never keyboard reachable.
- Inspect at 1440, 1181, 1180, 900, and 390px, plus a short mobile viewport and
  200% zoom. Current routes/featured links remain correct and header content fits.
- Explicitly run motion-enabled browser cases with `reducedMotion: no-preference`
  and separate reduced-motion cases, including changing the preference while a
  panel is open. Confirm a nonzero intermediate transition and eventual stable
  state; static endpoint screenshots or `animations: disabled` are insufficient.
- Run the server through this checkout's Playwright harness with no external
  `PLAYWRIGHT_BASE_URL`. Verify no console/page errors. Use deterministic state
  assertions rather than arbitrary sleeps. Inspect intended snapshot diffs before
  deliberate baseline updates; never recapture just to get green.
- Run `npm ci`, `npm run lint`, `npm run lint:css`, `npm run typecheck`, `npm test`,
  `npm run build`, `npx playwright install --with-deps chromium`, and `npm run e2e`.
  Read the current `.github/workflows/ci.yml`. Its separate `cms-contract` job
  starts/resets/diffs local Supabase, exports local credentials, reruns tests,
  and requires database-backed build markers. Use CI for that job if unavailable
  locally; explicitly report it as pending until it passes. No production DB work.

## Review, STOP conditions, and rollback

Push a separate implementation branch, open a PR, and obtain the real preview
with `node scripts/preview-url.mjs`. Ask Louie to inspect Product/Resources
switching, keyboard dismissal/focus, and mobile menu usability. Wait for his go
before merging this visible change. A plan PR is not implementation approval.

STOP shipping if focus is lost, outgoing links remain interactive, reduced
motion or static access breaks, budgets cannot be met, any required check is
red/unverified, or a preview is unavailable. Resolve routine choices within this
scope without introducing an extra concept-approval gate.

Rollback by reverting this implementation PR. After 053/054 depend on the shared
runtime, retain that runtime and revert only navigation behavior, or coordinate
reverts of dependent PRs. Never remove their dependency blindly.
