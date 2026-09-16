# Relume to Offboard component map

This is a translation guide, not an installation map. Relume source is read for
structure and behavior, then expressed through the site's existing components
and scoped CSS.

| Relume family | Likely local destination | Preserve | Adapt or reject |
| --- | --- | --- | --- |
| Header / hero | `PageHero` or route-specific hero | Heading hierarchy, media relationship, responsive order | Keep approved CTA and Civic Modern hero rules; do not replace the homepage hero by default |
| Content | Route-local semantic section | Reading order, editorial rhythm, media placement | Replace utility classes and generic copy with local markup and tokens |
| Layout / feature | Route-local section, `FeatureRows`, or `SequenceSection` | Grouping, sequence, repeated item behavior | Match real content count instead of padding to the demo |
| Comparison | Route-local comparison or pricing structure | Column contrast, labels, mobile stacking | Preserve claims and ensure columns do not imply unsupported equivalence |
| FAQ | `FaqSection` or native disclosure markup | Disclosure semantics, keyboard behavior | Keep approved answers and local focus styles |
| CTA | `FinalCta` or local section action | Action hierarchy and responsive composition | Keep the page's one-primary-CTA rule |
| Navbar | `MarketingHeader` through `MarketingShell` | Nothing by default | Navigation is fixed unless explicitly placed in scope |
| Footer | `MarketingFooter` through `MarketingShell` | Site-wide link and legal contract | Audit only when explicitly requested; treat as a site-wide change |
| Form | Existing local form controls | Labels, validation order, keyboard flow | Never copy form handling, data destinations, or consent language blindly |

## Proven privacy and security pilot

The `/privacy-security` pilot demonstrates the intended approach. It uses
Relume patterns without adding Relume, Tailwind, or shadcn dependencies.

| Page section | Relume source | Local result |
| --- | --- | --- |
| On this page | Content 28 | Numbered anchor index |
| The receipts | Layout 294 | Four proof items with strong scan order |
| Sponsored access | Comparison 13 | Sponsor sees / never sees comparison |
| Connected assistants | Content 17 | Split editorial disclosure |
| The honest part | Content 22 | Long-form limits section with a supporting ledger |
| Your data, your call | Description List 1 | Numbered rights list |

The component slug documents provenance. The local component and CSS are the
production implementation.
