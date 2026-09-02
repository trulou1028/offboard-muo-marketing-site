# Plan 038 — Company Transition Centers (`/companies`): scope, not build

> **Execute with:** Fable 5.1 · high effort — every page names a real company and states public facts about its layoff with sources; a wrong headcount, an implied relationship, or a stale date is a false public claim about a third party, and the per-page facts register plus CopyDrift assertions have to be built right the first time.

**Status: BUILT on branch `claude/company-pages` (owner said go on
2026-09-01 and added Airtable to the list). Decisions 3 to 5 were taken
under stated assumptions, recorded at the end.** The last item in plan
026's roadmap.

## What this is, in one paragraph

A page per company that has just had a layoff, at
`offboard.co/companies/<company>`, answering the search "`<company>`
layoffs" the week it happens: what happened (public record, sourced),
what to do this week, what your state owes you, and a way into Offboard.
The same page is the attachment for the sponsorship email to that
company's HR ("your people are already here"). An index at `/companies`
lists them and joins the Resources menu as "Company Transition Centers".

## Where this scope comes from

Not invented here. The owner already analysed this idea on 2026-08-14 in
the app repo (`lumo-plan-builder:documentation/strategy/company-pages-analysis.md`).
Its verdict, quoted in substance: *good bet, right shape, wrong week to
build big; hundreds of pages is a post-revenue project; five to ten
hand-picked pages is a this-month project that makes the outreach emails
stronger.* This plan is that verdict turned into a buildable shape. Three
other inputs:

- **The 50-company target list** the outreach kit was built from
  (`documentation/sales/engine-a-prep-kit/target-list.md`, WARN filings +
  press, 2026-08-10). The pilot companies come from it.
- **The WARN decision record** (`coach/decisions/2026-08-13-warn-compliance-wedge-canceled.md`).
  It cancelled a WARN *product*. The analysis is explicit that WARN filings
  as page *content* is a different, much smaller bet. This plan uses them
  as sourced facts only, never as a calculator or a compliance claim.
- **The CMS design** (`docs/cms-architecture.md` § 1) already anticipates
  "article and company pages" on the same ISR-with-committed-fallback
  contract, so the rendering approach is decided.

## Recommendation

**Pilot: five hand-written pages, one template, one index. No data
plumbing.** Measure for four weeks. Only then decide on programmatic
generation and the aggregates endpoint the analysis describes.

Why five and why hand-written:

- Member-per-company data in the app is weeks old and the analysis says
  counts will be too small to show for a while. A page that says "12
  Offboard members are from Patreon" cannot exist yet. Building the
  endpoint now builds for numbers that do not exist.
- Every route on this site is still `noindex`. Until the launch decision,
  no page earns anything from search. The pilot's near-term value is
  therefore the **active** mode the analysis names: the page attached to a
  sponsorship email. That works with five pages and zero SEO.
- Five pages is the right size to learn whether the template is honest and
  useful before anything is automated.

## The page, section by section

Every section either links to an existing page or states a sourced public
fact. The page promises nothing.

1. **Hero.** `Laid off from <Company>? Start here.` One line of what
   happened, with the date, and the primary CTA (`Build my free transition
   plan`). No logo (see below).
2. **What happened.** Two to four sentences from the public record: the
   WARN filing (site, headcount, notice date, expected separation date) or
   the press report, each fact followed by its source link and the date it
   was checked. Written as record, not commentary: no adjectives about the
   company, no speculation about why.
3. **This week.** The first-week checklist, drawn from the existing
   `first-week-after-a-layoff` guide and `/layoff-support`. Links, not a
   rewrite.
4. **What your state owes you.** For the state of the affected site: the
   unemployment filing link, the health-coverage window, and the deadline
   that expires quietly. Every figure comes from the verified-facts ledger
   or from an official source linked inline; the `~$12,000 / week 16`
   CalJOBS hook appears only on California pages and only with its
   conditions. Independence disclaimer directly beneath.
5. **Severance and what to check.** Links the severance guide. If the
   press reported severance terms (Patreon's 16 weeks, for example), the
   page may state them as reported, with the source, and nothing more.
6. **Others from `<Company>`.** *Deferred.* This is the section the
   aggregates endpoint would feed ("N members are from X", "people from X
   most often land at..."). It is not in the pilot. When it comes, it
   renders nothing below a floor of 5, the same k-anonymity posture the
   sponsor dashboard already uses.
7. **If you work in People at `<Company>`.** One quiet band, not a hero:
   `Sponsoring your team's transition is self-serve and priced per person.`
   → `/employers`. The word "outplacement" stays on `/employers`; this is a
   jobseeker page.
8. **Final CTA.** The shared component.

## What the pages will never do

- **Imply a relationship.** No "Patreon partners with Offboard", no
  "official". The company is named as a matter of public record, the way a
  newspaper names it. *(Logos were originally excluded here too; the owner
  reversed that on 2026-09-01. See "Logos" below.)*
- **Show who is here.** No names, no counts under the floor, nothing that
  lets a reader infer that a specific person is on Offboard. Talent-pool
  opt-in governs discoverability of people, and a public page is the most
  public surface there is.
- **Editorialise.** No "brutal", no "another round", no ranking of
  employers. The page is useful because it is calm.
- **Promise anything.** The standing rule: no funding, eligibility,
  interviews, or placement.
- **Go stale silently.** Every page carries a `Last checked` date. A page
  whose facts are older than 90 days gets re-verified or unpublished.

## Which five

From the target list, chosen for (a) press coverage, not WARN-only, so the
page reads as public record rather than surveillance of a small firm; (b)
a tech or office workforce, which is the audience; (c) sponsorship-prospect
overlap, per the analysis. Recommended, for the owner to confirm:

| Company | Why | Source in the target list |
| --- | --- | --- |
| Patreon | 93 people, 20%, 16-week severance reported; generous-severance culture | TechCrunch, 2026-07-23 |
| Sprout Social | 260 people, budgeted restructuring; the strongest sponsor prospect | Crain's Chicago, 2026-07-15 |
| Chime | 135–150 people, CA WARN plus press; separations ~Sep 30, so the page is timely | CA EDD WARN, 2026-07-31 |
| Zillow | 91 people, WA WARN; large tech brand, high search volume for "Zillow layoffs" | WA WARN, 2026-08-04 |
| Coursera | 31 people, CA WARN; career-adjacent brand, small enough to be a clean test | CA EDD WARN, 2026-07-14 |

Deliberately not recommended: the WARN-only SMBs on the list (a page about
a 25-person pharma site closure names a company few people search for and
reads as targeting), the big-parent entries (TikTok, Obsidian) where the
company on the page is not the employer of record, and the wind-downs
(BitMart) where there is no HR to sponsor and the facts move daily.

## Build shape

- **Content:** `src/content/companies/<slug>.json`, one file per company,
  committed. Fields: name, slug, state, what-happened facts (each with
  `source_url`, `source_name`, `checked_on`), reported severance (optional,
  sourced), affected-site city, `last_checked`. Hand-written for the pilot;
  the same shape becomes a CMS table if the pilot earns it, on the ISR
  contract the CMS doc already specifies.
- **Routes:** `/companies` (index) and `/companies/[slug]`, both static.
- **Template:** one component, `MarketingCompanyPage`, reusing `PageHero`,
  the shared `VerifiedFactsStrip` pattern for the sourced-facts block,
  `NumberedRows`, the independence band, `FinalCta`. New CSS only for the
  sourced-fact rows.
- **Plumbing, same as every page since plan 025:** `MarketingRoute`,
  sitemap (index only; per-company pages join the sitemap when they leave
  `noindex`), the CopyDrift sweep and outplacement-absence lists, the
  visual/reset/overflow route lists, DeadSelectors, COPY.md § 17 with the
  template copy, and the Resources menu entry "Company Transition Centers".
- **A per-page facts register** in COPY.md, mirroring the verified-facts
  ledger: every number on a company page has a row with its source and
  check date, and CopyDrift asserts the page renders exactly the register's
  figures and no others. This is what keeps five hand-written pages from
  quietly inventing a headcount.
- **Effort:** template, index, plumbing, tests: about a day. Each page:
  half a day, most of it verifying facts against the primary source, not
  writing.

## What "measure for four weeks" means

- Search Console impressions and clicks per page, once the site is
  indexable. Until then, this line is zero by construction and says nothing.
- Sponsorship email replies when the page is attached versus not. This is
  the metric that can move before launch.
- Signups that pick the company at onboarding (the app already records
  `profiles.last_company_directory_id`). Read from the app, not from this
  site.

Revisit at a weekly review after four weeks of data. Automation and the
aggregates endpoint are a separate plan, written then, not now.

## STOP conditions (owner decisions, all open)

1. **Go, or not yet.** The 2026-08-10 decision record in the app repo says
   sponsorship outreach comes before website work, and its review notes
   that the committed emails did not go out. The page is collateral for
   those emails; it has no value on its own until the site is indexable. If
   the emails are not going out, this plan should wait, and that is a
   legitimate answer.
2. **The five companies.** Confirm the table above, or swap. Only companies
   with press coverage.
3. **The HR band.** Keep the one-line sponsor band on a jobseeker page, or
   leave sponsorship to the email entirely.
4. **The public name.** "Company Transition Centers" is the strategy doc's
   label. Confirm it is meant to be public (menu item, index H1), or give
   the index a plainer name and keep the label internal.
5. **Stale-page policy.** 90 days to re-verify or unpublish, as proposed,
   or a different window.

Decision 6 is explicitly *not* asked now: member counts and "others from
X" wait for the aggregates endpoint and real numbers.

## As built (2026-09-01)

Six pages, not five: the owner added **Airtable** for the founders' own
history with it. No Airtable layoff newer than September 2023 is on public
record, so that page states the 2022 and 2023 rounds and says plainly that
nothing newer is on record, rather than implying a current event.

Decisions 3 to 5 were not answered and were taken under these assumptions,
each reversible in a line: the HR band stays (one quiet line, after the
independence band, linking to `/employers`); "Company Transition Centers"
is the public name (index H1, menu item, footer link); a page unchecked for
90 days is re-verified or unpublished.

Every figure was sourced by reading the source on 2026-09-01. Two sources
that press summaries cited could not be read (GeekWire and HousingWire
returned 403), so Zillow's reported 5 October separation date and up-to-21-
weeks severance are **not** on the page. The SEC filings for Sprout Social
and Coursera were located through the SEC's data API and cited by accession
number. The facts register in COPY.md § 17 is generated from the JSON, and
`CopyDrift` fails the build on any figure that is not in it.

## Baselines: all 54 moved, and here is why that is right

`--update-snapshots` rewrote every existing visual baseline. Pillow was
used (in a scratch venv, not a project dependency) to diff each old and new
image. Three causes, all verified:

1. **The footer grew by one line** ("Company Transition Centers" in the
   Product column): every image is exactly 54px taller at desktop and mobile
   and 33px taller at tablet, and pixel-identical above the footer allowance
   on 33 of the 54.
2. **The stored baselines were stale by several merged plans.** Their header
   still showed the sentence-case, seven-link nav from before plans 032 and
   037, because a 76px header sits under the suite's 1% tolerance and was
   never rewritten. The forced rewrite finally captured the shipped nav. This
   is the "no baseline moved is weak evidence" trap from AGENTS.md, closed.
3. **Two photo regions** (the homepage product-scene strip, the /how-it-works
   onboarding render on mobile and tablet) differ by rendering noise only;
   the old and new crops are visually identical.

Nothing in the diff is a layout change on an existing page.

## Logos (owner call, 2026-09-01, reversing this plan's original line)

The owner asked for the companies' own marks. They are in, under four rules,
all enforced or verified:

1. **Self-hosted** in `public/marketing/companies/`, 40KB for all six. Never
   hotlinked. A logo CDN would put a third-party request on every page load
   of a site that ships `/privacy-security`; a browser test asserts the
   company pages make **no** third-party requests at all.
2. **Contained, never cropped or recoloured.** Cropping a trademark alters
   it. The tile holds a square app icon and a horizontal wordmark equally
   (`object-fit: contain`, percentage inset so it scales with the tile).
3. **Same size for every company**, so no mark reads as featured.
4. **The disclaimer shares the block.** The mark sits in the hero directly
   above `Offboard has no relationship with <Company>`, never beside the
   sponsorship line. A browser test asserts that ordering geometrically.

**Provenance.** Five are the company's own app icon, fetched from the
company's own server (`apple-touch-icon`), which is the most authoritative
source there is: the asset the company publishes for exactly this purpose.
Chime blocks automated fetching, so its mark is the **public-domain**
wordmark on Wikimedia Commons (`File:Chime Bank logo.png`, copyright status
public domain, trademark noted). It is horizontal rather than square, which
is why the tile supports both shapes. Every logo carries its source URL and
check date in the JSON, `CopyDrift` asserts the file exists on disk and the
source is registered in COPY.md § 17, and a `null` logo falls back to a
monogram so no page ever waits on an asset.