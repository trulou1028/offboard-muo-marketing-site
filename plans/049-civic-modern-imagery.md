# Plan 049: The owner's Civic Modern imagery goes into the product pages

> **Execute with:** Opus 5 · medium — placement and CSS with browser verification; the copy is pixels inside images, so the judgment is which image explains which band, not what to claim.

> **Reconstructed 2026-09-14.** Executed 2026-09-08 and shipped as
> [PR #86](https://github.com/trulou1028/offboard-muo-marketing-site/pull/86)
> (`244f087`); the plan file never reached `main`. Written from the shipped
> commit, `docs/marketing-image-library.md` and `COPY.md`.

## Status

- **Status:** BUILT 2026-09-08, merged via PR #86. This file restored 2026-09-14.
- **Priority:** P1 · **Effort:** S · **Risk:** LOW.
- **Depends on:** plans 046 and 048.

## Why this plan exists

The owner generated a set of Civic Modern compositions and documentary
photographs in Codex, referenced against the live site, and asked for them to
be placed: "the graphics civic modern and the site-imagery files are mine, keep
them, and use them in places throughout the site that are appropriate."

## What shipped, nine of ten

**Heroes**, each replacing the 1x app screenshot plan 048 put there — those
were soft on a Retina screen, and these are drawn in the site's own system:

| Page | Image |
| --- | --- |
| `/career-context` | the Career Context card, with its sources and score |
| `/job-search` | the Application Packet |
| `/lumo` | the Lumo interview exchange |
| `/layoff-support` | the first-week plan |

**Bands that had no picture now have one:** `/integrations`' Permissions band
takes the connected-tools card, which is the grant the section describes; and
`/layoff-support`'s money side takes the benefits summary.
`/layoff-support`'s first-week band, left copy-only by plan 046, takes the
paperwork photograph.

**Two photographs replace older stock-looking ones:** the reflection scene on
`/career-context` and the interview-prep scene on `/job-search`.

**Unplaced:** `career-context-civic-modern-v1`. The v2 supersedes it; v2 carries
the score.

## The rules this plan established

- **Every composition uses its `-transparent` variant.** A baked ground leaves a
  visible rectangle wherever the band colour differs. Most obvious on `/lumo`, a
  dark green card on slightly different dark green.
- **The three photographs have no transparent variant** and keep the plain file.
  A blanket rename briefly pointed them at files that do not exist; Next does
  not validate a string `src` at build time, so the build stayed green. Every
  `src="/marketing/…"` in `src/` is now verified to resolve to a file on disk.
- **`COPY.md` records the words inside each composition**, because they are
  pixels and no test can read them. It also confirms the benefits summary
  carries no dollar figure and no day count, which is `/layoff-support`'s
  standing rule.

## Two failures worth keeping

1. **The blanket rename above.** A regex that matched more than intended, and a
   build that could not catch it.
2. **Nine broken pictures, nearly shipped.** The first commit staged only source
   and docs, so every image the pages referenced was untracked and the preview
   would have served nine broken pictures. Caught by a `git ls-files
   --error-unmatch` loop over every referenced path before hand-off. That loop
   is the check worth keeping.

## Verification as run

Fifteen baselines re-captured deliberately. 182 unit tests, 107 e2e, lint,
lint:css, typecheck and build green.
