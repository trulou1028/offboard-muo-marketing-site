# Agent-only Relume workflow

This site uses Relume as a source of proven section architecture, not as a
second design system. The normal workflow happens entirely through an AI agent
with the Relume Library MCP. The owner does not need to open Relume, copy code,
or maintain a parallel sitemap there.

## What the MCP can and cannot do

The installed Relume Library MCP can:

- search the component library in natural language;
- list categories and components;
- retrieve the exact React source for one or more component slugs;
- retrieve the primitives a component depends on; and
- provide the standard Relume setup instructions.

The installed MCP cannot create, edit, or synchronize a project in Relume Site
Builder. Relume-native sitemaps and wireframes still require the Relume UI.

For Offboard, the useful replacement is a code-based wireframe. The agent makes
the proposed structural change on a feature branch, adapts it to the existing
site system, and publishes the branch as a protected Vercel preview. The preview
is the review surface. Nothing reaches production until the pull request is
approved and merged.

## Source hierarchy

Relume never overrides the site's sources of truth:

1. `COPY.md` owns user-facing language and claims.
2. `docs/site-architecture.md` owns each page's role and section order.
3. `DESIGN.md` and the `--mh-*` tokens own the Civic Modern visual system.
4. The current implementation owns working accessibility, analytics, links,
   and product-specific behavior.
5. Relume supplies candidate layout, semantic, responsive, and interaction
   patterns.

Do not install Tailwind, shadcn/ui, a Relume preset, or Relume primitives in
this repository. Fetch component source with primitives omitted or returned as
names only, then translate the useful structure into the existing TSX and the
scoped `MarketingHomepage.css` stylesheet.

## Three prompt modes

### 1. Audit and shortlist

Use when the owner asks to find candidates, audit a section, or recommend a
layout. This is read-only.

The agent:

1. Reads the page manifest, `COPY.md`, `DESIGN.md`, and site architecture.
2. Inspects the current implementation and rendered desktop and mobile page.
3. Defines the section's job, audience, content shape, and conversion purpose.
4. Searches Relume by category and natural-language brief.
5. Shortlists up to three exact component slugs.
6. Fetches their real source and evaluates structure, responsive behavior,
   accessibility, page rhythm, and adaptation cost.
7. Recommends one candidate, one fallback, and whether keeping the current
   section is stronger.

An audit result should include the exact component identifiers, not just a
description or screenshot.

### 2. Build a section preview

Use when the owner says build, rework, adapt, or implement a candidate.

The agent performs the audit above, selects the strongest candidate if one was
not named, and then:

1. Preserves approved copy unless copy changes are explicitly in scope.
2. Ports the component's information architecture and behavior into local TSX.
3. Reuses local primitives where they already express the pattern well.
4. Implements styling with Civic Modern tokens under `.marketing-homepage`.
5. Verifies semantics, keyboard behavior, reduced motion, desktop, and mobile.
6. Runs the repository's required checks.
7. Pushes the branch, opens or updates a pull request, and supplies the real
   Vercel preview URL with specific review instructions.

This branch preview is the Offboard wireframe. It is editable code, uses real
copy, and is closer to production than a separate Relume artifact.

### 3. Recompose a whole page

Use when the owner asks for a full-page Relume pass. The agent first creates or
updates a page manifest in `docs/relume/pages/`, then audits every section in
page order.

For each section, the agent records:

- the section's job and audience;
- the current local implementation;
- up to three Relume candidates;
- the selected slug and why it wins;
- preserved copy, assets, and behavior;
- the proposed adaptation; and
- audit, approved, built, or rejected status.

The agent should avoid using the same Relume slug more than once on a page.
Variety is a quality signal, not an absolute rule. Repetition is appropriate
for a repeated data pattern, a shared global surface, or when a different
component would weaken comprehension or responsive behavior.

## Candidate scorecard

Score each serious candidate against the same criteria:

| Criterion | Question |
| --- | --- |
| Purpose fit | Does the pattern perform the section's actual job? |
| Content fit | Does approved copy fit without padding, truncation, or invention? |
| Page rhythm | Does it create useful contrast with adjacent sections? |
| Responsive behavior | Does the source provide a credible mobile transformation? |
| Accessibility | Are the semantics and interactions suitable or easily corrected? |
| Civic adaptation | Can it be translated without importing a second styling system? |
| Product truth | Can it show the real Offboard product and claims accurately? |
| Uniqueness | Is this slug or near-identical pattern already used on the page? |

The current section remains a valid candidate. Relume should improve the page,
not create churn for its own sake.

## Default boundaries

- Keep the existing navigation unless the owner explicitly requests a change.
- Preserve the homepage hero. Audit non-homepage heroes only when there is a
  clear structural opportunity.
- Treat the footer as eligible only when explicitly included in a page or
  site-wide audit.
- Preserve the primary CTA strategy and route intent.
- Never alter `/act` language or navigation behavior through a general site
  pass.
- Do not add a temporary public route merely to show a concept. A feature
  branch and protected preview provide the review boundary.
- A component recommendation does not authorize a production merge.

## Useful prompts

```text
Audit the receipts section on /privacy-security. Find up to three Relume
components, fetch their real structure, and recommend one. Do not edit yet.
```

```text
Rework the receipts section on /privacy-security using the best Relume
candidate. Preserve the approved copy and Civic Modern styling. Give me a
desktop and mobile Vercel preview.
```

```text
Run a whole-page Relume pass on /career-context. Keep the nav and footer, audit
the non-homepage hero, avoid repeating component slugs, then build the strongest
coherent page on a review branch.
```

The owner does not need to provide component numbers. Naming a page or section
and its desired outcome is enough. A specific component slug can still be used
when the owner already has one in mind.

## Related files

- `component-map.md` records how Relume patterns map into local primitives.
- `page-manifest-template.md` defines the page-level audit record.
- `pages/` contains current page manifests and proven component mappings.
