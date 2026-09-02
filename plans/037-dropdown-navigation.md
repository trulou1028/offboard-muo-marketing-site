# Plan 037 — Dropdown navigation

> **Execute with:** Opus 5 · high effort — accessible dropdown navigation with hover, keyboard, and focus semantics, verified by measurement because the visual suite cannot see a header. *(Executed. Model line added retroactively 2026-09-01 under plans/README.md § "The model line".)*

**Status: executed on branch `claude/dropdown-nav`.** Phase 4 of the site IA
roadmap (plan 026). The flat six-link header becomes four top-level links and
three dropdowns, which is what finally puts the last three weeks of pages in
the header instead of only the footer.

## Shape (owner revision 2026-09-01: four tabs, light panels)

**Product ▾** · **For Organizations ▾** · Pricing · **Resources ▾** · Sign In
· Build my plan.

The first cut had seven items (Home, Product, How It Works, For
Organizations, Pricing, Resources, About). The owner's review: too
jam-packed, consolidate, and use mega menus. So:

- **Home left the bar.** The wordmark is the home link, and the strategy
  doc's target navigation never had Home. This reverses plan 024's Home
  link; the owner said yes to that explicitly.
- **How It Works moved inside Product** as its featured card ("Start
  here"). It is the start of the product story, and it reads better as the
  first thing Product shows than as a tab of its own.
- **About moved inside Resources**, under a Company column with Visit Us,
  Slack Community, and Contact, all of which previously lived only in the
  footer.

Each panel spans the page container and is columns of links (icon, label,
one-line blurb) plus one featured card on the right with a render:

| Panel | Columns | Featured |
| --- | --- | --- |
| Product | The system (Career Context, Lumo, Offboard Everywhere) · The work (Job Search, Layoff & Benefits) | How It Works, `path-stage.webp` |
| For Organizations | Who you serve (Employers, Workforce & Government, Universities & Communities) | The sponsor promise, `privacy-three-panel.webp` → `/privacy-security` |
| Resources | Resources (Guides, Privacy & Security) · Company (About, Visit Us, Slack Community, Contact) | The newsletter, 5,000+ subscribers, `hero-real-life.webp` |

The three renders were the only images in `public/marketing/` nothing
referenced, so plan 007's every-image-once goal holds and no imagery was
generated. Panels are light (white; featured card on paper-soft) per the
owner, so the render is the only dark thing inside one.

**Two deliberate departures from the target navigation in plan 026:**

1. **Company Transition Centers is not in Resources.** The target lists it
   there; `/companies` does not exist. Plan 026's own rule is that the
   dropdown ships only when its pages exist, so it joins when the page does.
2. **The header CTA stays "Build my plan", not "Get started".** That was plan
   026's open decision 2, answered on 2026-09-01.

## Second owner review (2026-09-01): size to content, more room

The full-container panel read as forced space when a group had one column.
Panels now size to their content (fixed column tracks: 300px per link
column, 340px for a lone column, 400px for the featured card) and centre
under the bar, clamped to the page gutters. Measured at 1440/1280/1181:
Product and Resources 1002px, For Organizations 742px, all centred to the
pixel and inside the gutters at every width.

The featured render grew from 120px to 190px and the padding from 22 to
28px, so the card reads as a card rather than a list item with a thumbnail.
Two small additions: the featured card tints to sand on hover, and a panel
settles in with a 180ms fade-and-rise, gated behind
`prefers-reduced-motion: no-preference` like every other motion on the site.

Centring the panel moved it out from under some triggers, so the pointer
path from every trigger into its panel was re-walked in 3px steps; all
three stay open.

## Why it is a disclosure pattern, not a menubar

Each trigger is a `<button>` with `aria-expanded` and `aria-controls`, and
each panel is a plain container of links. The ARIA authoring practices
recommend this over `menu`/`menuitem` roles for navigation, because these are
links to pages rather than commands, and a screen reader user expects link
semantics and link shortcuts to work.

Behavior: opens on hover and on click, closes on Escape (returning focus to
the trigger), on an outside pointer press, on focus leaving the group, and on
following a link. Only one panel is ever open.

## Two more defects from the mega-menu revision

5. **The featured render opened blank.** `next/image` lazy-loads by
   default, and inside a `display: none` panel the image is never in the
   viewport, so it only started loading on the click and the card opened
   with an empty block where the render should be. The three feature images
   load eagerly now, and the verification screenshot waits for a painted
   image taller than 100px rather than merely a loaded one.
6. **Moving the pointer from a trigger down to the panel closed it.** The
   panel now hangs off the header rather than its trigger, so the 38px
   between the trigger's bottom and the header's bottom was outside the
   group's box and fired `mouseleave`. The group now stretches to the
   header's full height and the 12px bridge covers the rest. Verified by
   walking the pointer down in 4px steps.

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
