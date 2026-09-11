# Marketing image library

The reusable hero backgrounds live in `public/marketing/homepage/hero/`. The
set shows different people doing the same underlying work in different places:
organizing a job search with a laptop, notes, and enough room to think.

All five photographs share the current homepage crop logic: a wide landscape
frame, the person concentrated on the right, and quiet space on the left for
the headline and actions. They can also be used as section photography when a
right-weighted composition fits the page.

| File | Setting and representation | Suggested alt text |
| --- | --- | --- |
| `living-room.webp` | Black man in his 40s, living room at night | A man works on his laptop on a sofa at night, lit by a floor lamp beside a window. |
| `bedroom.webp` | Latina woman in her late 20s, bedroom at dusk | A woman sits cross-legged on her bed with a laptop at dusk, with modern artwork above the bed. |
| `coffee-shop.webp` | East Asian woman in her late 50s, industrial coffee shop | A woman works on her laptop at a wooden table in a brick-and-concrete coffee shop. |
| `coworking.webp` | South Asian woman in her 40s, coworking space | A woman works on her laptop at a communal table in a daylight-filled coworking space. |
| `public-library.webp` | White man in his late 50s, public library | A man works on his laptop with notes and reading glasses at a public library table. |

## Usage

- For full-width hero use, start with `object-fit: cover` and
  `object-position: right center`.
- The homepage adds `civic-grid-overlay.png` as a separate decorative layer,
  so the photograph remains reusable without the pattern.
- Keep the left side available for copy. The current homepage supplies its own
  dark readability treatment in CSS.
- Do not bake copy, logos, interface cards, gradients, or color overlays into
  these files. Product UI remains a separate layer.
- Use one photograph per section, consistent with `DESIGN.md` composition rule
  R6.
- Write alt text for the image's purpose in context. The suggestions above
  describe the visible scene without assuming the person's identity.

The three newer files, `coffee-shop.webp`, `coworking.webp`, and
`public-library.webp`, were generated with the built-in image workflow on
2026-09-07. The existing `living-room.webp` and `bedroom.webp` complete the
five-image set.

---

# Civic Modern product compositions and documentary photography

Generated in Codex against the live site (owner, 2026-09-08) and placed by
plan 049. Every file ships as a pair: a baked version with its own tinted
ground, and a `-transparent` version. **Use the transparent one whenever the
composition sits directly on a band**, so the band's colour shows through; the
baked ground otherwise leaves a visible rectangle where the two greens or
greys do not match. The baked version is for a slot that wants the ground to
do framing work.

## Product compositions

| File | Shows | Placed on |
| --- | --- | --- |
| `homepage/graphics-civic-modern/application-packet-civic-modern-v1` | An Application Packet: company intel, role match and tailored resume ticked, a strong-fit reading, ready for review | `/job-search` hero |
| `homepage/graphics-civic-modern/benefits-summary-civic-modern-v1` | A benefits summary: California training benefits as a possible match, file the claim first, time-sensitive, sourced to California EDD | `/layoff-support` § The money side |
| `homepage/graphics-civic-modern/lumo-interview-context-civic-modern-v1` | A Lumo exchange about preparing for an interview, with the sources it used and the brief marked ready | `/lumo` hero |
| `homepage/graphics-civic-modern/career-context-civic-modern-v1` | A Career Context card with Resume, Applications and Interview notes sources | **unplaced** — superseded by the v2 below, which carries the score and richer sources |
| `site-imagery/product-compositions/career-context-sources-civic-modern-v2` | A Career Context card: 71 of 100, the four record rows, and the sources it is built from | `/career-context` hero |
| `site-imagery/product-compositions/connected-tools-permissions-civic-modern-v1` | Connected tools with their scopes, permission granted, revocable at any time | `/integrations` § Permissions |
| `site-imagery/product-compositions/first-week-plan-civic-modern-v1` | A first-week plan: separation agreement, unemployment claim, health coverage, key deadlines | `/layoff-support` hero |

## Documentary photography

No transparent variant; these are photographs.

| File | Scene | Placed on |
| --- | --- | --- |
| `site-imagery/documentary/career-context-reflection-civic-modern-v1` | A woman at her dining table with a laptop, notebook and printed pages, thinking | `/career-context` § The problem |
| `site-imagery/documentary/first-week-paperwork-civic-modern-v1` | A woman at her kitchen table reading a printed notice, pen in hand | `/layoff-support` § The first week |
| `site-imagery/documentary/interview-prep-at-home-civic-modern-v1` | A man at his kitchen table talking an answer through aloud | `/job-search` § The toolkit |

## Rules that apply to every file here

- **Nothing inside a composition may state a figure the verified-facts ledger
  does not cover.** The benefits summary is the one to watch: its values are
  state words and labels, never a dollar figure or a day count, which is
  `/layoff-support`'s standing rule.
- The words inside are pixels. `CopyDrift.test.tsx` cannot read them, so
  `COPY.md` is the only record of what they say, exactly as for the homepage
  hero exchange.
- Changing what a composition says means a new export, not a code edit.
