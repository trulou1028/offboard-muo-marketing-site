# Design System: Offboard Marketing Site

## Provenance

This describes the marketing site's shipped system (`--mh-*` tokens in
`src/components/marketing/homepage/MarketingHomepage.css`). It deliberately
diverges from the app repo's Clause design system; do not copy values from
the app repo, and do not "fix" this doc to match it.

**Decision date: 2026-08-24.** Before that date this file described the app
repo's Clause tokens (lime `#E2FB6C`, canvas `#FBFBF8`, an `hsl(var(--token))`
mechanism, "h1–h6 default to Aspekta 500") even though the shipped CSS here
had never matched it — 10 of 13 colors disagreed and the heading-font rule
was inverted. Plan 014 resolved that by treating the **shipped CSS as the
source of truth** and rewriting the doc to match it, not the reverse. The one
change made *to* the CSS at the same time: the header CTA's stray
`#e2fb6c` border was normalized to `var(--mh-lime)` (`#dfff5a`), since that
was an internal inconsistency, not a real doc-vs-code disagreement.

If you're an agent building a new marketing page or section: everything
below is a description of what already ships. Match it. If a value you need
isn't in this doc, look at the nearest existing section in
`MarketingHomepage.css` before inventing a new one.

## Civic Modern (adopted site-wide, 2026-08-31, plan 023)

The site runs the owner's **Civic Modern** design system on every route.
Reference export: `docs/design-system-civic-modern/` (`readme.md` is the
spec, `tokens/*.css` carry the values). The `--mh-*` token block at the top
of `MarketingHomepage.css` now holds the Civic Modern values, so this
document's tables below describe what ships everywhere.

Rollout history: plan 021 themed the homepage behind a
`.marketing-homepage.mh-page-home` override block; plan 022 rebuilt the
homepage on it; plan 023 promoted those values to the base scope and
deleted the override block. There is no longer a per-route palette split.

**The footer is a deliberate third green** (`#07160c`, plan 027). Civic
Modern ships two greens, but every page ends on a dark band (a forest
`.mh-final-cta` or a forest-deep `.mh-route-contact` / `.mh-final2`), so a
footer at forest-deep merged into the section above it and stopped reading
as its own layer. The footer also carries a top hairline, which keeps the
edge crisp where the step alone is subtle.

**Lumo lime = the primary action on dark green, plus AI accents**
(owner revision 2026-08-31, plan 024; it was AI-only for a week). On a
dark-green surface (`--mh-forest` / `--mh-deep`, including the fixed
header) the primary CTA is neon: lime fill, `--mh-deep` text (~12:1),
hover `--mh-lime-hover`. On light surfaces lime remains forbidden and
primaries stay forest-on-paper. The AI accents keep lime too: the avatar
disc (`.mh-lumo-mark`), the AI reply highlight (`.mh-ai-highlight`), AI
chip dots, and the LUMO section eyebrow. Supporting CTAs on dark stay
paper (`.mh-ondark-cta`) and the AI button stays ink with a lumo dot
(`.mh-ai-cta`) — that contrast is what keeps the neon reading as THE
primary. `e2e/homepage.spec.ts` guards the focus-ring half of this; the
palette half is enforced by review, not tooling.

Two class names outlive their meaning and are deliberately not renamed
(the `ArticleFidelity` snapshot embeds them): `.is-lime` now means
"eyebrow on a dark band", and `.mh-lumo-row` is a plain product row.

**Deferred, not rejected:** the design system's flat 32px container gutter
(the site keeps `clamp(24px, 4.76vw, 72px)`, which the CI container
-alignment test is written against), and full adoption of its fixed type
scale for component-level text (the tokenized headings use its sizes as
desktop clamp endpoints; card and label sizes keep their own values).
Route pages also keep their own band order rather than the system's
homepage rhythm.

## Palette

All colors live as custom properties on `.marketing-homepage` (the single
scope root for this stylesheet — every rule is nested under it, so these
tokens are only available within it).

### Brand / surface
| Token | Value | Use |
|---|---|---|
| `--mh-paper` | `#f6f4ee` | Default page background (warm off-white) |
| `--mh-paper-soft` | `#ece9e0` | Alternating section background, one shade down from paper |
| `--mh-white` | `#fff` | Card surfaces on paper |
| `--mh-line` | `#d9d6cc` | Hairline borders/dividers on light surfaces |
| `--mh-muted` | `#3c4640` | Secondary text on light surfaces |
| `--mh-ink` | `#0a1110` | Primary text on light surfaces |
| `--mh-forest` | `#16351f` | Mid-tone brand green — filled dark sections, solid buttons |
| `--mh-deep` | `#0f2617` | Darkest brand green — hero, some route heroes |
| `--mh-footer` | `#07160c` | Footer background (darkest of the three greens) |
| `--mh-lime` | `#b8f24a` | **Lumo. AI moments only** — never decorative, never a primary CTA |
| `--mh-violet` | `#c5b7ff` | **Reserved for LUMO/AI.** Defined but not yet consumed by any rule in this file — do not use it for anything else, including "just to add a second accent color." |

### Color roles (on-dark and status)
| Token | Value | Use |
|---|---|---|
| `--mh-on-dark-muted` | `#b9c4bb` | Secondary/muted text on `--mh-forest`/`--mh-deep` sections |
| `--mh-hairline-on-dark` | `rgb(246 244 238 / 16%)` | `border-top`/`border-bottom` dividers on dark sections |
| `--mh-surface-on-dark` | `rgb(246 244 238 / 6%)` | Subtle fill for panels/cards sitting on dark sections |
| `--mh-border-on-dark` | `rgb(246 244 238 / 16%)` | Borders (and the money-clock progress-bar track) on dark sections |
| `--mh-success` | `#006b52` | Positive/matched status text |
| `--mh-warning` | `#9a5b0b` | Pending/attention status text |
| `--mh-danger` | `#b3261e` | Error text (form validation) |
| `--mh-danger-surface` | `#fbeceb` | Error banner background |
| `--mh-danger-border` | `#f0c6c2` | Error banner border |

Three greys (`#d1ded9`, `#d6e0dc`, `#c9d8d3`, `#cbd9d4`) that used to sit
within a couple of RGB units of `--mh-on-dark-muted` were consolidated into
that one token — if you're picking a muted-text color for a dark section,
this is the only one that exists now.

**A new hex color anywhere outside this token block fails `npm run lint:css`**
(enforced by stylelint — see the end of this doc). If the palette above
doesn't have what you need, that's a signal to talk to the owner before
adding a 31st color, not to add one inline.

## Typography

Two self-hosted variable fonts, **Newsreader** (display serif) and **Inter**
(everything else), loaded via `next/font/local` and reached through the
`--mh-font-display` / `--mh-font-body` tokens rather than the raw
`--font-*` variables. Aspekta and Fraunces are still loaded in
`layout.tsx` but no rule consumes them; removing them is a follow-up.

- **Newsreader, weight 500, is the default for `h1`,
  `h2`, and `h3`** everywhere inside `.marketing-homepage` (see the
  reset block at the top of the CSS file). This site has no `h4`–`h6`
  usage — if you need a smaller heading, drop to a `strong`/`span` styled
  with the body font, or check whether an existing pattern
  (`.mh-ui-card-heading h3`, `.mh-price-deck h3`, …) already fits.
- **Aspekta carries everything else**: body copy, labels, kickers, buttons,
  nav, form fields. It is also used for **article body headings**
  specifically — `.mh-article-body h2`/`h3` explicitly override back to
  Aspekta, because long-form reading content reads better in the UI face
  than in the display serif. This is the one deliberate exception to the
  h1–h3-is-Fraunces default; don't generalize it elsewhere.
- Base body copy is `font-size: 16px; line-height: 1.5;` at the
  `.marketing-homepage` root, un-bolded (this stylesheet never explicitly
  sets a body font-weight — it inherits the browser default of 400).
  Labels/kickers/buttons are typically `font-weight: 650` or `700`;
  Fraunces headings are `500`.

### Type scale tokens
| Token | Value | Use |
|---|---|---|
| `--mh-h1` | `clamp(44px, 4.45vw, 64px)` | Route/page hero `h1` (e.g. `.mh-route-hero h1`) |
| `--mh-h2` | `clamp(32px, 2.8vw, 40px)` | Default section heading `h2` |
| `--mh-h2-sm` | `clamp(28px, 2.2vw, 34px)` | A section `h2` that reads one step down from a narrative anchor (see Homepage heading tiers below) |

`--mh-h2` is overridden to a flat `40px` at the `≤560px` breakpoint, and
`--mh-h2-sm` to a flat `32px` (see Rhythm & breakpoints below); every `h2`
on either token still tracks it, so a mobile-size change only ever needs to
happen in one place. Both need a value there: `--mh-h2-sm`'s clamp floor is
`38px`, so without its own small-phone step it would land 2px under the
anchor size and the two tiers would read as one.

### Homepage heading tiers

The homepage has two `h2` sizes, and which one a section gets is a content
decision, not a layout one.

- **Narrative anchors** carry the story — the problem, the identity
  contrast, the three jobs, the $12,000 hook, the connected plan, and the
  final CTA. They keep the full `--mh-h2`.
- **Supporting sections** answer a question the story raises rather than
  advancing it — verified facts, the pricing teaser, community, and the
  privacy summary. They use `--mh-h2-sm`.

Verified facts is the shared member of the supporting tier (it also appears
on `/how-it-works`) and sizes itself at `.mh-verified-heading h2`. The other
three are homepage-only, so one grouped rule scoped to `.mh-page-home`
covers them — the same scoping convention the plan 018 phase 1 pacing
overrides use. The employer strip sits a step below the supporting tier on
its own `clamp(26px, 2.4vw, 34px)` and is not part of either.

Adding a homepage section? Decide which tier it is first, then add its
selector to the existing grouped rule rather than writing a new font-size.

Not every heading in the file is on these tokens. The homepage hero
(`.mh-hero-copy h1`, `clamp(58px, 5.03vw, 76px)`), the article title
(`.mh-article-header h1`, `clamp(38px, 4.4vw, 56px)`), the intake rail
title, and several smaller sub-headings (`.mh-employer-strip .mh-copy-block
h2` at `clamp(26px, 2.4vw, 34px)`, card-level `h3`s, etc.) keep their own
literal clamps because their values don't line up with `--mh-h1`/`--mh-h2`
closely enough to fold in without a visible size change. That's fine — the
rule is "reach for the token first," not "every heading must be on one of
three sizes."

## Rhythm & breakpoints

| Token | Value | Use |
|---|---|---|
| `--mh-section-y` | `120px` | Default section `padding-top`/`padding-bottom` |
| `--mh-section-y-loose` | `120px` | Heavier bands (route content grids, the independence/pricing-teaser sections) |
| `--mh-section-y-tight` | `80px` | Shorter strips (pricing, the final CTA, the employer strip) |

At `≤560px` the type scale steps down with them: `--mh-h2` to `40px` and
`--mh-h2-sm` to `32px`.

At `≤900px` these three collapse to `72px / 72px / 56px` with one override
on `.marketing-homepage`, so every section using the tokens tightens
uniformly at tablet width instead of each one having its own bespoke
mobile reset. `.mh-faq` is the one exception: its `80px` sits equidistant
between the tight and default buckets, so it keeps a literal value at every
breakpoint rather than being forced into either.

**Breakpoints**: `1180px` (nav collapses to the mobile menu), `900px`
(rhythm/gutter tighten, most grids go single-column), `560px` (small-phone
overrides — the smallest heading/gutter/padding step). There's also a
`prefers-reduced-motion: reduce` query that kills transitions and
animations site-wide (and the motion controller adds no reveal classes
under it, so reduced-motion users get a fully static page).

Hero top offsets (`148px`/`152px`/`172px`, used for `.mh-hero`,
`.mh-route-hero`, `.mh-article`, `.mh-intake-page`) are **not** section
rhythm — they exist to clear the fixed/absolute header — and are not on the
`--mh-section-y*` scale.

## Container & measure

Owned by plan 013, not this one — listed here because a new section needs
both this and the rhythm tokens above to compose correctly.

| Token | Value |
|---|---|
| `--mh-page-max` | `1200px` |
| `--mh-gutter` | `clamp(24px, 4.76vw, 72px)` |
| `--mh-page-x` | `max(var(--mh-gutter), calc((100vw - var(--mh-page-max)) / 2))` |

**The `.mh-article` rule**: a centered `max-width` box must never also take
the page-x gutter. `.mh-article` renders as `<article class="mh-article
mh-section">` — composing `.mh-section` gives it `padding-inline:
var(--mh-page-x)`, which *grows* with viewport width, while `.mh-article`
also centers itself with its own `max-width: 856px`. Stacking both once
starved the article to ~136px of usable text width at 1920px. The fix,
already shipped: `.mh-article` carries its own `padding-inline:
var(--mh-gutter)` (the flat, capped gutter, not the page-x formula) instead
of relying on `.mh-section`. If you're building another centered
reading-width block, do the same — give it `var(--mh-gutter)` padding
directly, or don't compose `.mh-section` on it at all.

**Reading measures stay `ch`-based, not tokenized.** `.mh-article` itself is
a `max-width: 856px` box (a pixel measure, matched to the visual column
width of the page), while `.mh-article-body` and `.mh-article-guest-author`
inside it cap prose at `max-width: 68ch` — a character-count measure, which
is the right unit for a reading column because it holds line length
constant across font-size and viewport changes in a way a pixel value
can't. These weren't folded into a `--mh-measure-*` token scale because no
such scale exists yet in this stylesheet (this plan only tokenized rhythm,
type, color, radius, and shadow) — introducing one for two consumers would
be premature. If a third `ch`-based reading column shows up, that's the
signal to add the token.

## Interaction & focus

### CTA roles (plan 018 phase 4)
| Class | Role | Looks like |
|---|---|---|
| `.mh-primary-cta` | **Signup only.** The filled button is reserved for "start free" / "build my plan". | Forest fill + paper label on light; neon lime fill + deep label on dark green |
| `.mh-secondary-cta` | An internal route link that still needs button weight (`/how-it-works` from the homepage, `/employers` from the Sponsored card). | Same geometry, 1px ink outline, no fill |
| `.mh-section-link` | A quiet inline "read more" link at the end of a section. | Underlined label + arrow, no box |

Before this split, three different destinations all rendered the same filled
lime button, so the homepage showed four equally loud CTAs. Mailto links and
`/intake` ("Talk to someone") were left on `.mh-primary-cta` deliberately —
they are neither signup nor internal route links, and re-roling them is a
separate decision.

Hover lifts a CTA by 1px and nudges its arrow 3px; `:active` returns both to
rest so a click reads as a press. All of it is `transition`-based, so the
existing `prefers-reduced-motion` block already switches it off.

### `--mh-focus-ring`
| Token | Value | Use |
|---|---|---|
| `--mh-focus-ring` | `var(--mh-ink)` | Default (light surfaces) |
| | `var(--mh-paper)` | Re-declared on dark bands |

The ring used to be a flat white everywhere, which against paper (`#f7f4ec`)
measures about **1.06:1** — a keyboard user had no visible focus indicator
across the light two-thirds of every page. WCAG 2.1 SC 1.4.11 wants 3:1.

One rule consumes the token
(`.marketing-homepage a/button/summary:focus-visible`). Custom properties
inherit, so **a control inside a dark band needs no rule of its own** — the
band re-declares the token and everything below it follows. When you add a
dark section, add it to that selector list. When you put a *light* surface
inside a dark one (the mobile-menu panel is the live example), set the token
back to ink on that surface, or it paints paper on paper.

`e2e/homepage.spec.ts` asserts every focusable resolves the token to one of
the two values, that both values are actually in use, and that the resolved
ring clears 3:1 against the surface behind it. Note that reading
`outlineColor` back off a focused element is NOT a reliable check here — it
reports white even when the ring paints ink, which is how the original defect
went unnoticed.

## Radii

| Token | Value |
|---|---|
| `--mh-radius-xs` | `4px` | Controls small enough that `-sm` reads as a circle (the plan preview's 16px checkbox) |
| `--mh-radius-sm` | `6px` |
| `--mh-radius-md` | `12px` |
| `--mh-radius-lg` | `16px` |
| `--mh-radius-card` | `20px` |
| `--mh-radius-pill` | `999px` |

Circular elements (`border-radius: 50%`) are their own thing and stay `50%`
— they're not on this scale and shouldn't be. One literal survives outside
the scale on purpose: `.mh-employer-privacy-quote` keeps `border-radius:
4px`, a deliberately square-ish corner for a bordered quote card, smaller
than anything the scale offers.

## Shadows

| Token | Value | Use |
|---|---|---|
| `--mh-shadow-surface` | `0 16px 40px rgb(10 17 16 / 12%)` | Resting elements that need separation without floating (e.g. `.mh-job-pill`) |
| `--mh-shadow-overlay` | `0 16px 40px rgb(10 17 16 / 12%)` | Floating/absolute-positioned elements — the onboarding illustration pieces, the mobile nav dropdown |

Only two shadows exist in this stylesheet. If a new component needs
elevation, it's one of these two — there's no third tier.

## Hard rules (carried over, unchanged)

- **Navigation labels are Title Case; everything else is sentence case.**
  Nav links, footer links, and Sign In use Title Case (owner decision
  2026-08-31). Headlines, body copy, eyebrows, and CTA button labels keep
  sentence case, so the design system's "sentence case everywhere" rule
  still governs prose. This resolved genuinely mixed casing: product links
  like "Career Context" were already Title Case while "How it works" and
  "For employers" were not.
- **Lumo lime = primary-on-dark + AI accents.** `--mh-lime` fills the
  primary CTA on dark-green surfaces and marks AI moments (see the Civic
  Modern section above). Never decorative, never on light surfaces.
  `--mh-violet` is the superseded legacy AI token, still defined but
  consumed by no rule; prefer lime.
- **No side-accent color bars on rounded containers.** A colored
  `border-left`/`border-right` wider than 1px reads as a "stripe," which
  this system doesn't use decoratively. (Two existing components —
  `.mh-employer-privacy-quote` and `.mh-article-callout` — do combine a
  colored `border-left` with `border-radius`; they predate this rule being
  written down explicitly. Don't use them as precedent for a new one.)
- **One primary CTA per view.** `.mh-primary-cta` (forest fill, paper text;
  paper-on-ink when it sits on a dark band) is the filled button — at most
  one per screen. Everything else is a text link (`.mh-section-link`) or the
  outline `.mh-secondary-cta`.
- **No em dashes in site copy.** Copy content and its rules live in
  `COPY.md` at the repo root — this doc doesn't duplicate them.

## Composition rules (plan 039, adopted 2026-09-02)

The tokens above say what a section is made of. These say what shape it
takes. They exist because the homepage audit found eleven sections and
eight of them were the same unit — a copy block, then a grid — which read
as unfinished even though every individual piece was correct.

**R1 · No orphan cells.** A repeating grid must fill its last row. If the
item count doesn't divide by the column count, change the layout, not the
count: a ruled list (Pattern C), a lead-plus-pair (Pattern B), or a
stepped strip (Pattern E). `repeat(3, 1fr)` with 5 items, or
`repeat(2, 1fr)` with 3, is a defect. Enforced by
`e2e/composition.spec.ts`, which walks every route, finds every grid whose
tracks are equal, and fails on a remainder.

**R2 · Product UI is a composition, never a screenshot.** Chat, tracker,
plan, and packet UI shown on the site is a base card plus one to three
satellites, each breaking an edge of the base. A single bordered
rectangle holding a transcript is not allowed. Use `.mh-comp`,
`.mh-comp-base`, and `.mh-comp-satellite`.

**R3 · One idea, one section, one CTA.** A concept (Career Context, Lumo,
Offboard Everywhere) gets one section on a page and one filled button.
Later mentions are a `.mh-section-link`, never a second filled button.

**R4 · Vary the section shape.** No more than two consecutive sections
share a composition. The five compositions are Split, Stacked, Inset,
Ruled, and Stepped. A page plan lists the composition of every section
before the build starts.

**R5 · Intros claim the width or share it.** A single-column
`.mh-copy-block` either caps at `max-width: 820px` **and** puts something
in the right half (a visual, a link cluster, a lead), or it becomes a
two-column intro (`.mh-intro-split`: headline left, lead right). An empty
right half beside an intro is a defect above 1180px.

**R6 · Photos explain or leave.** At most one photo per section on
jobseeker pages, and it sits beside product UI or the question it
answers. Photo triptychs and strips are retired.

**R7 · Insets share one padding.** `--mh-inset-pad` (`48px 56px`
desktop, `36px 28px` below 900). Both forest insets use it.

**R8 · Feature lists carry state.** A toolkit, capability, or category
item shows one real product state (a chip, a count, a status pill) or it
is a plain ruled row. No more icon-plus-label cards that link nowhere.
Every state shown must be one the product can actually produce, verified
against `lumo-plan-builder` `origin/main`.

**R9 · The fixed header's button counts as a primary.** The header CTA is
always lime and always on screen, so a section must not place its own
filled button in the top 96px of the viewport at rest. On light bands a
section primary is forest; on dark bands it is lime.

**R10 · Mobile budget.** At 390 wide, no homepage section exceeds
**2,600px** and the page total stays under **15,500px**. Enforced by
`e2e/composition.spec.ts`. *(Both numbers are measured, not aspired to.
Plan 039 proposed a 1,400px section budget; the rebuilt page's tallest
section is "More than a job search" at 2,409px, which is six questions
and a composition and does not shrink without cutting content. The page
total is part of the rule because the per-section number alone would not
have caught what prompted it: the v2 homepage ran 17,096px with a
2,896px section. The rebuild measures 14,404px with a 2,409px maximum.)*

### Pattern catalogue

Every "three things" or "five things" moment picks one of these instead of
minting a grid:

| Pattern | Shape | Reference in the code |
| --- | --- | --- |
| A · Split | Copy one side, visual the other | `.mh-split`, `.mh-hero2` |
| B · Lead + pair | First item spans the full width, the rest sit as a pair under it. Fixes any odd count in a 2-column grid | `.mh-route-card-grid.is-lead-pair` |
| C · Ruled list | Rows with hairlines, title left, body and optional link right. Any count | `.mh-ruled`, `.mh-community-rows` |
| D · Inset with ruled aside | Dark inset, copy left, ruled rows right | `.mh-sponsor-inset` |
| E · Stepped strip | Numbered items in one row with hairline rules, 3 or 4 | `.mh-steps` |
| F · Definition rows | `<dl>`, label column and value column | `.mh-company-facts` |
| G · Two-column intro | Headline left, lead right, no grid | `.mh-intro-split` |

### Composition primitives (R2)

`.mh-comp` is the positioning context. `.mh-comp-base` is the white card
that carries `--mh-shadow-overlay`. `.mh-comp-satellite` is absolutely
positioned and breaks at least one edge of the base by 12 to 32px.
Satellites are existing atoms only: a chat bubble, an `AiReply`, a
`TrackerCard`, a plan step row, a chip, an integration mark. Two depths,
no third tier. Below 900px every composition goes static and stacks in
flow, keeping its shadow — a composition that flattens into a bordered
box on a phone has lost the point.

## How to add a section

1. Compose `.mh-section` (from plan 013) for the horizontal gutter, or give
   your root element `padding-inline: var(--mh-gutter)` directly if it's
   also a centered `max-width` box (see the `.mh-article` rule above —
   never do both).
2. Set `padding-top`/`padding-bottom` to `var(--mh-section-y)`,
   `-loose`, or `-tight` — don't write a literal vertical padding.
3. Size your heading with `var(--mh-h1)`/`var(--mh-h2)`/`var(--mh-h2-sm)`
   where the value is close enough to fit (see Typography above for when
   it's fine to keep a bespoke clamp instead).
4. Pick colors from the Palette/Color-roles tables. On a dark section
   (`--mh-forest`/`--mh-deep`/`--mh-footer` background), reach for the
   `-on-dark` roles for muted text, hairlines, and subtle surfaces rather
   than writing a new `rgb(255 255 255 / N%)`.
5. Pick a radius/shadow from the scales above, not a new literal.
6. Pick a composition from the pattern catalogue above before you write
   a `grid-template-columns`, and check it against R1 and R4.
7. **Never introduce a literal hex color, px font-size, border-radius, or
   box-shadow without adding a token for it first.** `npm run lint:css`
   enforces this for colors outside the token block; the rest is
   discipline, not tooling — but it's the same rule.

## Enforcement

`.stylelintrc.json` disallows a new hex color anywhere in this stylesheet
outside the `.marketing-homepage` token block (`color-no-hex`, scoped with a
`stylelint-disable`/`-enable` pair around the token definitions). It does
not (and can't, practically) stop a new *token value* someone picks
carelessly — only a raw hex literal leaking into a rule. Preventing sloppy
token choices is still a code-review problem, not a lint problem.
