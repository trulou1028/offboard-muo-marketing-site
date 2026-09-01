# Plan 036 — Universities & Communities (`/communities`)

**Status: executed on branch `claude/communities`.** The third and last For
Organizations page. **Phase 3's organization split is complete**:
`/employers` for a company running a layoff, `/workforce` for agencies,
`/communities` for universities, alumni organizations, associations, and
nonprofits.

Plan 026 asked for this one "lighter at first", and it is: six sections, no
FAQ, no pricing deck.

## Where the positioning came from

One approved sentence about this audience exists, in the homepage's
Sponsored access section: *"Universities and communities — Help members
navigate career transitions with tools that stay useful beyond a single
workshop or program."* The page is that sentence expanded.

The thing this audience has that an employer does not is a **relationship
that outlasts the event**. A laid-off employee's sponsor relationship ends;
an alumnus comes back in three years. That is the argument for a record
built once and kept, and it is the whole page:

- H1: `The workshop ends. The career does not.`
- Who this is for: universities and colleges · alumni organizations ·
  associations and nonprofits.
- What changes: a record rather than a folder, the program's own work
  landing in it, the toolkit, and it working when the office is closed.
- The reporting boundary, in the approved `/employers` formulation.
- What Offboard will not promise.

## Two deliberate omissions, both the owner's to reverse

1. **No prices.** `$199 / $169` per seat is owner-approved for public
   display **for employers**. Nothing is approved for universities or
   associations, and quietly reusing the employer number would invent a
   commercial term for a different buyer. The page ends in a conversation,
   like `/workforce`. A browser test asserts neither figure appears.
2. **The category claim is not used.** "The modern unemployment office" is
   banned only on B2G surfaces, and a private university is not one. But
   community colleges and public universities are public institutions, and
   the phrase earns nothing with members who are mostly not unemployed yet.
   Left off by choice, not by rule. One line puts it back.

## Verification

Unit suite, build, full e2e, typecheck, and CSS lint all green. A temporary
Playwright spec additionally asserted, against the rendered page:

- The never-say list: no "outplacement", "workspace", "platform",
  "infrastructure", "solutions", "modules", "career transition
  service/support"; no em dashes.
- Neither omission leaked: no category claim, no `$199`, no `$169`.
- Band rhythm: no two adjacent sections share a background.
- The on-dark link: the "See exactly who can see what" underline resolves to
  paper, not `--mh-ink`. This is the third page to reuse
  `.mh-privacy-sponsor`, and plan 035 fixed that contrast defect there, so
  the assertion is now a regression guard rather than a discovery.
- The footer reaches all three organization pages.

No defects found on this page. The pattern reuse from plans 034 and 035 is
why: every band, the split list, and the boundary section were already
shipped and already fixed.

Snapshot note: the `ArticleFidelity` baselines moved on all 11 articles. A
character-level diff confirms the only change is the inserted footer link,
`<a href="/communities">Universities &amp; Communities</a>`.

## What is left in phase 3, and what unlocks phase 4

`/companies` (Company Transition Centers and per-company pages, the
utility/SEO/distribution layer) is the last phase 3 item.

The footer's Partners column now carries three links and the Product column
six. Every page the target navigation names, except Company Transition
Centers, now exists. **Phase 4's dropdown nav is the next structural piece**,
and it is what finally puts `/workforce`, `/communities`, and
`/privacy-security` in the header instead of only the footer.
