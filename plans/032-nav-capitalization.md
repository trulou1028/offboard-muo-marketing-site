# Plan 032 — Title Case navigation labels

> **Execute with:** Sonnet 5 · low effort — a label casing change with the nav tests as the check. *(Executed. Model line added retroactively 2026-09-01 under plans/README.md § "The model line".)*

Owner report (2026-08-31): "many links in the footer and nav have
lowercase words like 'For employers' when it should be all uppercase like
'For Employers'."

Correct, and the site was genuinely inconsistent rather than uniformly
sentence case: the newer product links added in plans 025-031
("Career Context", "Job Search", "Offboard Everywhere", "Layoff &
Benefits") were already Title Case, sitting beside "How it works" and
"For employers" which were not.

## Rule

**Navigation labels are Title Case. Prose, headlines, eyebrows, and CTA
button labels stay sentence case**, so the design system's "sentence case
everywhere" still governs copy. Recorded in DESIGN.md hard rules and
COPY.md site chrome.

Changed: `How it works` → `How It Works`, `For employers` → `For
Employers`, `For public partners` → `For Public Partners`, `Visit us` →
`Visit Us`, `Sign in` → `Sign In`. Already correct: Home, Pricing,
Guides, About, Contact, Privacy, Terms, and the six product links.

**Deliberately unchanged:** the CTA buttons ("Build my plan", "Build my
free transition plan", "Get started free", "Ask Lumo"). Those are actions
rather than labels, and the sitewide CTA wording is pinned in COPY.md's
language rules. If the owner wants those title-cased too it is a copy
decision, not a styling one.

## Verification

The ArticleFidelity snapshot was proven to be **byte-identical apart from
letter case** before recapture (all 11 changed lines compare equal when
lowercased; the five flipped labels were enumerated). 137 unit + 85 e2e
green; nav-label assertions in MarketingHome.test.tsx and
e2e/homepage.spec.ts updated in the same commit. Visual baselines
re-captured because the header is on every page.
