# Plan 034 — Privacy & Security (`/privacy-security`)

**Status: executed on branch `claude/privacy-security`.** Phase 3 of the site
IA roadmap (plan 026), the item the owner's strategy doc marks mandatory:
Career Context only works if a person will put their real history into it,
and nobody does that without knowing who can read it.

## What shipped

A new route, `/privacy-security`, reachable from the footer's Legal column
and from `/security`, whose 301 was retargeted here from `/about`.

Section order, all on existing patterns except the table:

1. Hero (deep) — plus a new optional `footnote` prop on the shared
   `PageHero`, used here to say what the page's claims rest on before it
   makes any.
2. **Who can see what** — the who-sees-what table. Five rows, four
   columns (You / Offboard staff / Lumo / AI providers).
3. The receipts — four cards on the shared `mh-capabilities` grid.
4. **Sponsored access** — a forest band. The strategy doc asks for the
   aggregate-only rule to be the most visible thing after the table, so it
   is a band of its own rather than a fifth table column.
5. Connected assistants — links to `/integrations`.
6. The honest part — no end-to-end encryption, and why.
7. The specifics — the shared `FaqSection` with five groups.
8. Your data, your call — export / edit / delete.
9. Final CTA.

## Where every claim came from

**Not written from scratch.** Every sentence is ported from the app repo's
own claims register, `SECURITY_CLAIMS.md` on `lumo-plan-builder`
`origin/main` (last updated 2026-08-05), and from the `/security` page that
Sprint 119 rewrote from that register. The register's rule carries over: a
claim ships only if §1 names the control that proves it.

§3 of the register names the exact wordings that are NOT supportable, and
all of them are honored:

| Never say | What this page says instead |
| --- | --- |
| "cross-user leakage is impossible" | `prevented at the database layer` |
| "we cannot read it" | `no read path exists in the product` |
| "your data is never shared" | names the two providers, says `we do not sell your data` |
| any certification we do not hold | `We do not hold a SOC 2 or ISO certification` |

`CopyDrift.test.tsx` now asserts all four of those absences plus
`bank-level` / `military-grade`, so a future edit cannot quietly reintroduce
one. It also asserts the two new ledger rows render, and that the page never
characterises an outside provider's retention terms.

## Deliberate omissions

- **The app page's rate-limit numbers** (50 LUMO messages an hour, and so
  on) and its "roughly one hundred server functions" count. Both are true;
  both rot silently without a verified-facts ledger row. The page states the
  control without the number.
- **The journal row** from the app's table. "Journal" is not a concept this
  site ships anywhere, so a row about it would be its only mention.
- **A per-assistant capability matrix.** That is plan 028's still-open owner
  decision and belongs on `/integrations` when it is settled.

## Open verification flag (one)

The **connected-assistant** section. Nothing in the claims register covers
what happens to the record after an outside assistant reads it, because that
connection is newer than the register's last update. Every sentence there is
written to be true by construction: it says the conversation then lives with
that provider under that provider's terms, and makes no claim about what
those terms are. Confirm before public launch, and add the connection to the
register.

## Two defects found by verification, both fixed

1. **Real horizontal page scroll at 390px.** The table sat in an
   `overflow-x: auto` container, which looked correct and was not:
   `window.scrollX` reached 354 on a 390px viewport. Fixed by giving the
   table a second presentation — a stacked card list below 900px — with
   `display: none` keeping exactly one of them in the layout and in the
   accessibility tree.
2. **Band-rhythm clash.** The honest band and the FAQ band that follows it
   were both `--mh-paper-soft` and read as one section. The honest band is
   now `--mh-paper`.

A third, smaller one: an inline-block note wide enough to wrap pushed itself
onto the line below its status dot, which read as two separate answers. The
dot is now positioned out of flow.

## Follow-up worth deciding later

The app still serves its own `/security` at `app.offboard.co`. After the
domain cutover, two near-identical trust pages on two hosts is one too many.
Retiring or redirecting the app's copy is an owner call, not part of this
plan.
