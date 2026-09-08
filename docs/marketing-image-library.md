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
| `bedroom.webp` | Latina woman in her late 20s, bedroom at dusk | A woman sits cross-legged on her bed with a laptop at dusk, a lamp lit on the nightstand beside her. |
| `coffee-shop.webp` | East Asian woman in her late 50s, industrial coffee shop | A woman works on her laptop at a wooden table in a brick-and-concrete coffee shop. |
| `coworking.webp` | South Asian woman in her 40s, coworking space | A woman works on her laptop at a communal table in a daylight-filled coworking space. |
| `public-library.webp` | White man in his late 50s, public library | A man works on his laptop with notes and reading glasses at a public library table. |

## Usage

- For full-width hero use, start with `object-fit: cover` and
  `object-position: right center`.
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
