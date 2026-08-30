# Offboard Design System — Civic Modern v1

Offboard is a career transition platform for people who just lost their job. It covers the job search plus unemployment benefits, health coverage, finances, applications, and interviews. People use it directly, or from the AI assistants they already work in.

The marketing site should feel like a well-designed public service: warm paper, plain language, real documentary photography, and honest product UI rendered as the illustration. Reference points are Gov.uk's plainness, a credit union or hospital site's trustworthiness, and a good newspaper's explainer typography.

**Two audiences, one system, two dials.**

- **Jobseeker pages (warm).** The default. More photography, larger serif headlines, Paper deep bands between sections, chat UI as the hero device.
- **Sponsor and B2B pages (institutional).** Employers, workforce boards, universities. Fewer photos, denser type, tables and numbers allowed, the Forest block or a Forest full-bleed hero doing the work. Same tokens, same components, no new colors.

## Sources

Everything here derives from files supplied by the user; no codebase or Figma file was provided.

| Source | Where it is now |
| --- | --- |
| `Offboard Civic Modern Style Guide.pdf` (v1 draft, Aug 2026, 7 pages) | `assets/Offboard Civic Modern Style Guide.pdf` |
| `offboard-logo-new-light-v1a.png` / `-dark-v1a.png` | `assets/logo-wordmark-light.png` / `-dark.png` |
| `offboard-symbol-v2-white.png` / `-dark.png` | `assets/symbol-white.png` / `-dark.png` |
| `hero-image-1a.png` (shot 01, the kitchen table) | `assets/photo-hero-kitchen-table.png` |

The style guide's pages are: direction, palette, typography, components, homepage mock, section rhythm, serif options, shot list, photo layout.

**Two deliberate departures from the PDF, both directed by the user:**

1. The serif is **Newsreader 500**, not Fraunces (the PDF's current) and not Source Serif 4 (the PDF's recommendation). Option C on the serif comparison page.
2. Dark anchor bands are in use. The PDF's page 1 says "one Forest block per page"; its section-rhythm page supersedes that with the two-anchor rule, which is what this system implements.

The shot list describes photography that has not been shot. Only shot 01 exists.

---

## CONTENT FUNDAMENTALS

**The voice is an intake guide, not a brand.** Plain, specific, and slightly administrative in the way a good public form is: it tells you what happens next and does not perform enthusiasm.

**Person.** The product speaks as *we* and addresses the reader as *you*. "Tell Offboard what's happening, and we'll help organize what needs your attention now." Questions are voiced in the member's *I* — "What do I do first?", "Is this job worth my time?" — because they are the questions someone is actually asking at 8am at a kitchen table. That split is the whole device: **questions in the member's voice, set in the serif; answers in the product's voice, set in Inter.**

**Casing.** Sentence case everywhere. The only uppercase is the eyebrow (Inter 600, 12px, 0.1em tracking). No Title Case Headlines, ever.

**Punctuation.** Headlines end with a period when they are a full sentence: "The modern unemployment office." "Losing your job creates more than one problem." It reads as a statement of fact, which is the tone. No em dashes in marketing copy — commas, periods, colons. Middots separate meta ("Tesserac · Remote, US").

**Length.** Body copy sits at 60 to 68 characters. Leads run one sentence, maybe two. Headlines are short enough to break on purpose.

**What the copy never does.** No exclamation points. No "unlock", "supercharge", "empower", "journey". No countdown urgency. No jokes about being fired. No emoji, anywhere, in any surface.

**Honesty rules that are also copy rules.** Every UI element shown in marketing must be something the product can actually do — chips name real product actions ("Benefits check", "Plan · Updated"), never decoration. And the site says plainly what it is not: "Offboard is not a government agency and does not decide your benefits."

**Examples of the register.**

- Display: "The modern unemployment office."
- Lead: "Your job search, benefits, applications, career context, and next steps in one system, connected to the AI you already use."
- Section: "One place that remembers your entire job search."
- Question: "What support might I qualify for?"
- Eyebrow: "CAREER CONTEXT"
- AI reply: "Done. I've added the role to your Offboard tracker and saved the company context."
- Final CTA: "You don't need another place to start over."

---

## VISUAL FOUNDATIONS

**The one-line thesis.** Green ink on warm paper. Photography carries the feeling, product UI does the explaining, and one green means "the AI did something."

### Color

Paper `#F6F4EE` is the ground under 90% of every surface. Ink `#0A1110` and Forest `#16351F` together take about 8%. Lumo and Sage combined stay under 2%. If a page reads as "a green page," the dial has gone too far.

Forest is **ink, not wallpaper**: buttons, eyebrows, hairlines, links, inset blocks. Forest deep `#0F2617` is the only full-bleed dark, and only as an anchor. Lumo `#B8F24A` has exactly one job — marking AI — and appears as the avatar disc, a highlight behind the first action word of an AI reply, the eyebrow on a dark AI band, and the single Lumo-filled button at the final CTA. Never set type in Lumo. Never use it as a section background. Sage `#74BD47` is product status only, so the app and the site stay in sync.

No gradients. No neon fills. No color overlays on photography.

### Section rhythm

The page is a stack of bands, and the rhythm is a rule, not a preference:

1. No two adjacent sections share a background.
2. Tints alternate temperature: green Mist `#E9F0E5`, then warm Sand `#F1E9DC`. Tints stay at 3–5% saturation; if a screenshot of the band reads as "a green section," it is too strong.
3. At most two Forest deep anchors per page, never adjacent, always with a light band before and after. On the homepage those are the Lumo section and the final CTA — they bookend the scroll.
4. Sand carries no green: its eyebrow warms to `#8A6A3B`, and buttons on it stay Forest. One warm band per page is plenty.
5. On dark bands, headlines are Paper, muted text `#B9C4BB`, hairlines `rgba(246,244,238,0.16)`.

Sponsor pages may invert the ratio: Forest full-bleed hero, then Paper the rest of the way.

### Type

Newsreader 500 asks the questions, Inter runs the office. Display 64/1.02/-0.02em, section 40/1.1, question 26/1.2, lead 20/1.45, body 16/1.55, eyebrow 12/0.1em/600. Newsreader never below 22px and never in UI; Inter never in a headline. Weight is always 500 for the serif — no 600, no italic display.

### Photography

Documentary daylight, warm cast, slightly underexposed rather than bright and airy. Subject mid-task: reading, typing, on a call, writing. Hands and screens in frame. Real environments with some mess. Ages 28 to 60. One lens for the whole set, natural light only, blacks lifted a touch so nothing crushes against Paper. No vignettes, no grain filters, no green or yellow grading to "match the brand," and no faces smiling at a whiteboard.

Photos are always 20px radius and **never bleed to the page edge** — they sit in the grid. The section-scale pattern is a triptych: narrow, wide, narrow, 250px sides, fluid center, 16px gaps, one shared height. The wide slot gets the environmental shot; the narrow slots get quieter frames. Never three faces in a row.

### Surfaces, borders, shadow

Corner radii are fixed by role: **20px** photos and floating cards, **16px** tracker cards, **12px** inset tiles, **6px** buttons, pill for chips.

There are exactly two card treatments and no third.

- **Flat in a grid**: white fill, 1px `#D9D6CC` border, no shadow.
- **Floating overlay**: no border, one soft shadow, `0 16px 40px rgba(10,17,16,0.12)`.

That shadow is the only shadow in the system. There are no inner shadows and no second elevation step. Hairlines do the separating everywhere else, and the question block uses a full-strength Ink hairline rather than a Line one to signal that it is structural.

### Transparency and blur

Used in exactly one place: chips floating on photography, `rgba(10,17,16,0.62)` with Paper text and a very light backdrop blur to hold legibility over busy frames. No frosted panels, no scrim gradients, no protection overlays on full photos — if a photo needs a scrim, it is the wrong crop.

### Layout

1200px max container, 32px gutters, 120px section padding (80px compact). Two-column sections run roughly 1:1, with UI overlapping the photo rather than sitting beside it: the hero chat card hangs off the photo's lower-right corner. Nothing is fixed or sticky; the page is a document.

### Motion and states

Restrained to the point of near-absence. Transitions are 180ms on `cubic-bezier(0.2,0,0,1)`, and only on color. No entrance animation, no parallax, no scroll-triggered reveals, no bounce, no count-up numbers.

- **Hover**: primary buttons darken Forest → Forest deep; secondary buttons darken their border Line → Ink; ghost text goes Ink → Forest; links go Forest → Ink. Never opacity fades, never scale-up.
- **Press**: a 1px downward nudge. No color change, no shrink.
- **Links** are always underlined at 1px with a 3px offset. Forest text alone is never a link.

---

## ICONOGRAPHY

**Icons are 1.5px stroke, on a 20px grid, Ink or Forest, never filled, never inside a colored circle.** They are labels, not decoration: a small glyph above a card title or a toolkit column, never inside a button. The only exception in the whole system is Lumo's mark, which is the one icon allowed to sit on a Lumo-colored disc.

**Substitution, flagged.** Offboard supplied no icon font, sprite, or SVG set — the style guide shows a row of glyphs but the files were not provided. **Lucide** is substituted: it is monochrome, open-path, and its geometry is built for adjustable stroke width, so it renders correctly at the brand's 1.5px rather than its own 2px default. Thirty glyphs are vendored into `assets/icons/` and re-stroked at render time by the `Icon` component. If Offboard has a real icon set, drop the SVGs into `assets/icons/` and nothing else changes.

Emoji are never used. Unicode characters are not used as icons; the middot `·` in meta rows is punctuation, not an icon.

**Logo.** Both the wordmark and the standalone symbol were provided, in light and dark versions. Use `logo-wordmark-dark.png` on Paper and tint bands, `logo-wordmark-light.png` on Forest and Forest deep. The symbol is for avatars, favicons, and spaces too tight for the wordmark. Do not recolor, outline, or place either on a busy photograph.

---

## Index

**Root**

- `styles.css` — the entry point consumers link. `@import` lines only.
- `thumbnail.html` — homepage tile.
- `SKILL.md` — Agent Skills wrapper.

**`tokens/`** — `fonts.css` (Newsreader + Inter from Google Fonts), `colors.css`, `typography.css`, `spacing.css`, `radius-shadow.css`, `base.css`.

**`assets/`** — wordmarks, symbols, the one photograph, the source style guide PDF, and `icons/` (30 Lucide SVGs).

**`guidelines/`** — 23 specimen cards feeding the Design System tab, grouped Colors, Type, Spacing, Brand.

**`components/`** — 15 components in four groups.

| Group | Components |
| --- | --- |
| `core/` | `Button`, `Eyebrow`, `Chip`, `Icon`, `LumoMark` |
| `layout/` | `Section`, `Photo`, `Triptych` |
| `product/` | `ChatExchange` (with `YouBubble` and `AiReply`), `TrackerCard`, `QuestionBlock`, `InsetBlock`, `PlanCard` |
| `navigation/` | `SiteHeader`, `SiteFooter` |

Each has a sibling `.d.ts` props contract and a `.prompt.md` usage note.

**`ui_kits/marketing/`** — the homepage and the sponsor page, click-through. See its README.

**`templates/marketing-page/`** — a jobseeker landing-page template (header, Paper hero with the floating chat card, Mist band, Sand question band, dark final CTA, footer) that consuming projects can seed a new design from. Tweaks: toggle the hero chat card, and swap the final CTA between the Lumo button and the Paper one.

### Intentional additions

The style guide names its component inventory directly (chat exchange, tracker card, buttons and links, question block, icons, chips, photo triptych, band system, plan cards, header, footer). Three wrappers were added because the guide describes the behaviour but not a named part:

- **`Icon`** — wraps the substituted Lucide set so the 1.5px stroke rule is enforced in one place rather than per use.
- **`Section`** — encodes the band rhythm as a prop so the alternation rule is checkable.
- **`InsetBlock`** — the guide's "Forest block, inset on Paper, not full-bleed" as a component, since it is the sponsor dial's hero device.

Nothing else was invented. There is no Toast, Modal, Tabs, Avatar, or Tooltip here, because the source defines none.
