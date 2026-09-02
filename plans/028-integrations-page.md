# Plan 028 — Offboard Everywhere (/integrations)

> **Execute with:** Opus 5 · medium effort — a pillar page from the strategy doc with two owner-verification flags to carry, not resolve. *(Executed. Model line added retroactively 2026-09-01 under plans/README.md § "The model line".)*

Phase 2, first item, of the site IA roadmap (plan 026). The consumer-facing
version of the connected-assistant story. Built 2026-08-31.

## The page

Hero → the idea ("Offboard holds the record. You choose the interface.")
→ three demos (ChatGPT / Claude / Lumo) → what you can do from a
conversation → permissions → prefer-Lumo → final CTA. Every section reuses
an existing pattern; zero new CSS classes. **"MCP" never appears in
user-facing copy** — that was the point of the strategy doc's naming.

## Two owner-verification flags (recorded in COPY.md § 11)

1. **Which assistants are actually connectable today.** The demos name
   ChatGPT, Claude, and Lumo per the strategy doc. If ChatGPT and Claude
   are not both live, the labels must change before this page is public.
   The page promises no launch date and no roadmap.
2. **The permissions section is principle-level only** — "a connection is
   scoped, you authorize it, you can disconnect it, sponsors never see
   your record". It deliberately does NOT publish the ✓/✕ capability
   matrix the strategy doc sketches, because the real authorization model
   is not settled and a wrong matrix on a trust page is worse than none.
   When the model is settled, the matrix belongs in this section.

Only the last permission line is independently verified: the
sponsors-see-aggregate-only rule already ships on /employers and in
COPY.md.

## Band-rhythm sweep (site-wide, beyond this page)

The new page put a forest Lumo band directly above the forest final CTA,
which read as one block — the same complaint the owner raised about the
footer in plan 027. Rather than fix one page, every route's section
backgrounds were audited with a temporary Playwright spec. It found five
adjacent same-background pairs, four of them pre-existing:

| Route | Pair | Fix |
| --- | --- | --- |
| /integrations | lumo-band + final-cta (forest) | lumo-band → deep on this page |
| /how-it-works | lumo + verified-visual (forest) | verified-visual → deep |
| /how-it-works | verified + human (white) | human → paper-soft on this page |
| /pricing | pricing + route-content (paper) | route-content → white on this page |
| /resources | two route-resources (paper-soft) | adjacent-sibling rule alternates to paper |

Two first attempts pushed the clash one band downstream (human→paper hit
context; route-content→paper-soft hit faq); the values above were chosen
against the full band sequence per route, not the single pair. The audit
now reports **zero** adjacent same-background bands site-wide. The temp
spec was deleted; re-create it from this table if the question recurs.

## Also

- Homepage "wherever you work" section gains a link to the page; footer
  Product column gains "Offboard Everywhere".
- The /career-context chat demo was varied (it had used the
  project-outcomes line this page now owns) so the two pages do not ship
  identical copy.

## Owner gate

Page copy and the two verification flags need sign-off before merge.
