# Plan 037 — Dropdown navigation

**Status: executed on branch `claude/dropdown-nav`.** Phase 4 of the site IA
roadmap (plan 026). The flat six-link header becomes four top-level links and
three dropdowns, which is what finally puts the last three weeks of pages in
the header instead of only the footer.

## Shape

Home · **Product ▾** (Career Context · Lumo · Job Search · Layoff & Benefits
· Offboard Everywhere) · How It Works · **For Organizations ▾** (For
Employers · Workforce & Government · Universities & Communities) · Pricing ·
**Resources ▾** (Guides · Privacy & Security) · About · Sign In · Build my
plan.

Each dropdown item carries a one-line blurb, so the panel says what a page is
rather than only naming it. Copy is in COPY.md § Site chrome.

**Two deliberate departures from the target navigation in plan 026:**

1. **Company Transition Centers is not in Resources.** The target lists it
   there; `/companies` does not exist. Plan 026's own rule is that the
   dropdown ships only when its pages exist, so it joins when the page does.
2. **The header CTA stays "Build my plan", not "Get started".** That was plan
   026's open decision 2, answered on 2026-09-01.

`Home` stays, per the owner's plan 024 ask, even though the strategy doc's
target navigation omits it. It costs about 75px, and the header fits with it
(see below). Dropping it is the obvious release valve if the bar ever needs
more room.

## Why it is a disclosure pattern, not a menubar

Each trigger is a `<button>` with `aria-expanded` and `aria-controls`, and
each panel is a plain container of links. The ARIA authoring practices
recommend this over `menu`/`menuitem` roles for navigation, because these are
links to pages rather than commands, and a screen reader user expects link
semantics and link shortcuts to work.

Behavior: opens on hover and on click, closes on Escape (returning focus to
the trigger), on an outside pointer press, on focus leaving the group, and on
following a link. Only one panel is ever open.

## Four defects found in verification, all fixed

1. **The `hidden` attribute did not hide the panels.** `.mh-nav-panel` sets
   `display: grid`, an author rule, which beats the user agent's
   `[hidden] { display: none }`. All three panels rendered at once and
   overlapped — and the assertion sitting next to it,
   `.mh-nav-panel:not([hidden])`, passed the whole time, because it checks
   the attribute rather than what the browser computed. **Caught in a
   screenshot, not by the test.** Fixed with an explicit
   `.mh-nav-panel[hidden] { display: none }`, and every panel assertion now
   reads `getComputedStyle().display`.
2. **Hover and click fought each other.** Moving the pointer onto a trigger
   opened the panel by hover; the click that followed in the same gesture
   toggled it shut, so the button looked dead. The open now records whether
   hover or a click opened it: a click on a hover-opened panel takes
   ownership rather than closing it.
3. **The nav did not fit.** With `1fr auto 1fr` the nav was forced to true
   centre, and because the header actions are wider than the brand its right
   edge met them with 7px to spare at 1440 and **0 at 1280**. The header grid
   is now `auto minmax(0, 1fr) auto` so the nav centres in the space between
   them, plus two gap steps at 1360 and 1280. Measured at every width from
   1440 down.
4. **The mobile menu ran off the bottom.** It is about 18 rows now, and
   `.marketing-homepage { overflow: clip }` swallows overflow rather than
   scrolling it, so the last items were unreachable on a short viewport. The
   panel is capped and scrolls. A separate fix gave the link after a group
   its own rule, or "How It Works" read as the sixth Product item.

## Verification, and one honest gap

`npm test` 157 · `npm run build` clean · `npm run e2e` 100 · `tsc` clean ·
CSS lint clean.

Two measurements were promoted from a temporary spec into
`e2e/homepage.spec.ts`, because both regress silently: the nav's clearance
from the brand and the header actions at nine widths, and the mobile menu's
last row being reachable.

**The visual baselines did not move, and that is not evidence of anything
here.** The header changed on every page, but it is 76px of a full-page
screenshot, well under the suite's 1% tolerance. `--update-snapshots`
rewrote zero files. The nav was verified by direct measurement and by
screenshots instead. This is the trap AGENTS.md names, hit in the real.

`ArticleFidelity` moved on all 11 articles. The only deletion across the
whole diff is the old flat `For Employers` link; everything else is the new
nav markup. The test also gained a normalizer for React `useId()` values,
which otherwise renumber whenever anything upstream in the tree changes and
would churn all 11 baselines for reasons unrelated to article fidelity.
