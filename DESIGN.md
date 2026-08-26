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

## Palette

All colors live as custom properties on `.marketing-homepage` (the single
scope root for this stylesheet — every rule is nested under it, so these
tokens are only available within it).

### Brand / surface
| Token | Value | Use |
|---|---|---|
| `--mh-paper` | `#f7f4ec` | Default page background (warm off-white) |
| `--mh-paper-soft` | `#f2efe6` | Alternating section background, one shade down from paper |
| `--mh-white` | `#fff` | Card surfaces on paper |
| `--mh-line` | `#d7d3c8` | Hairline borders/dividers on light surfaces |
| `--mh-muted` | `#40534c` | Secondary text on light surfaces |
| `--mh-ink` | `#15211d` | Primary text on light surfaces |
| `--mh-forest` | `#004838` | Mid-tone brand green — filled dark sections, solid buttons |
| `--mh-deep` | `#00352a` | Darkest brand green — hero, some route heroes |
| `--mh-footer` | `#002e26` | Footer background (darkest of the three greens) |
| `--mh-lime` | `#dfff5a` | The single accent. Primary CTA fill, on-dark accents, badges |
| `--mh-violet` | `#c5b7ff` | **Reserved for LUMO/AI.** Defined but not yet consumed by any rule in this file — do not use it for anything else, including "just to add a second accent color." |

### Color roles (on-dark and status)
| Token | Value | Use |
|---|---|---|
| `--mh-on-dark-muted` | `#cfe0d9` | Secondary/muted text on `--mh-forest`/`--mh-deep` sections |
| `--mh-hairline-on-dark` | `rgb(255 255 255 / 18%)` | `border-top`/`border-bottom` dividers on dark sections |
| `--mh-surface-on-dark` | `rgb(255 255 255 / 6%)` | Subtle fill for panels/cards sitting on dark sections |
| `--mh-border-on-dark` | `rgb(255 255 255 / 16%)` | Borders (and the money-clock progress-bar track) on dark sections |
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

Two self-hosted variable fonts, loaded via `next/font` and exposed as
`var(--font-fraunces)` and `var(--font-aspekta)`.

- **Fraunces, weight 500, `-0.03em` letter-spacing, is the default for `h1`,
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
| `--mh-h1` | `clamp(56px, 5.3vw, 82px)` | Route/page hero `h1` (e.g. `.mh-route-hero h1`) |
| `--mh-h2` | `clamp(46px, 4vw, 62px)` | Default section heading `h2` |
| `--mh-h2-sm` | `clamp(38px, 3.2vw, 48px)` | A section `h2` that reads one step down from a narrative anchor (see Homepage heading tiers below) |

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
| `--mh-section-y` | `88px` | Default section `padding-top`/`padding-bottom` |
| `--mh-section-y-loose` | `104px` | Heavier bands (route content grids, the independence/pricing-teaser sections) |
| `--mh-section-y-tight` | `64px` | Shorter strips (pricing, the final CTA, the employer strip) |

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
`prefers-reduced-motion: reduce` query that kills transitions site-wide.

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
| `.mh-primary-cta` | **Signup only.** The filled lime button is reserved for "start free" / "build my plan". | Filled lime, deep-green label |
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
| `--mh-radius-sm` | `8px` |
| `--mh-radius-md` | `12px` |
| `--mh-radius-lg` | `18px` |
| `--mh-radius-card` | `24px` |
| `--mh-radius-pill` | `999px` |

Circular elements (`border-radius: 50%`) are their own thing and stay `50%`
— they're not on this scale and shouldn't be. One literal survives outside
the scale on purpose: `.mh-employer-privacy-quote` keeps `border-radius:
4px`, a deliberately square-ish corner for a bordered quote card, smaller
than anything the scale offers.

## Shadows

| Token | Value | Use |
|---|---|---|
| `--mh-shadow-surface` | `0 18px 40px rgb(24 42 36 / 15%)` | Resting elements that need separation without floating (e.g. `.mh-job-pill`) |
| `--mh-shadow-overlay` | `0 28px 60px rgb(29 59 51 / 22%)` | Floating/absolute-positioned elements — the onboarding illustration pieces, the mobile nav dropdown |

Only two shadows exist in this stylesheet. If a new component needs
elevation, it's one of these two — there's no third tier.

## Hard rules (carried over, unchanged)

- **Violet is LUMO/AI-only.** `--mh-violet` is reserved for AI/LUMO
  surfaces if and when this site grows one. Never use it as a second
  general-purpose accent — lime is the only accent color this site has.
- **No side-accent color bars on rounded containers.** A colored
  `border-left`/`border-right` wider than 1px reads as a "stripe," which
  this system doesn't use decoratively. (Two existing components —
  `.mh-employer-privacy-quote` and `.mh-article-callout` — do combine a
  colored `border-left` with `border-radius`; they predate this rule being
  written down explicitly. Don't use them as precedent for a new one.)
- **One primary CTA per view.** `.mh-primary-cta` (lime fill, deep-green
  text) is the loud, filled button — at most one per screen. Everything
  else is a text link (`.mh-section-link`) or an outline button (the header
  CTA: transparent fill, `var(--mh-lime)` border, white text).
- **No em dashes in site copy.** Copy content and its rules live in
  `COPY.md` at the repo root — this doc doesn't duplicate them.

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
6. **Never introduce a literal hex color, px font-size, border-radius, or
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
