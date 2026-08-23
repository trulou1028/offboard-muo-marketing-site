# Resources content roadmap

Reference for future article work on `/resources`. The cluster table below
is transcribed from `documentation/sales/jobseeker-growth-playbook/03-acquisition-channels-and-campaigns.md`
(Channel 3) in the app repo, verified 2026-08-23.

## Priority keyword clusters

Do not start with broad keywords like "career advice." Start with problems
that map directly to product workflows.

| Cluster | Search intent | Product landing path |
| --- | --- | --- |
| Ghost jobs | "is this job posting real", "ghost job checker", "fake job posting signs" | Jobs, Ghost Checker, or Job Packet |
| Resume tailoring | "tailor resume to job description", "resume keyword match", "resume for ATS" | Resume tailor |
| Jobs directory | "curated jobs", "recommended jobs", "find jobs that match my resume" | Jobs |
| Job tracker | "job application tracker", "track job applications", "job search spreadsheet alternative" | Applications |
| Layoff checklist | "what to do after being laid off", "layoff checklist", "severance checklist" | Emergency Room and checklist |
| Interview prep | "interview prep for [role]", "company interview briefing", "interview follow-up email" | Interviews |
| Career repositioning | "career change resume", "positioning statement", "explain layoff in interview" | Resumes and target role |

Two of the ported guides already sit inside the layoff-checklist and
career-repositioning clusters; the other 9 ported articles support these
clusters indirectly (resume, AI/job-search literacy) rather than owning a
cluster outright.

## Article format rule

Every new article in a priority cluster should follow one shape:

1. Short, tactical article — answers the exact search intent, no padding.
2. An embedded product workflow screenshot or walkthrough — show the actual
   Offboard surface that does the job, not a marketing render.
3. A CTA to complete that exact workflow — not a generic "sign up" or "book
   a demo" link.
4. No broad "book a demo" language anywhere in body copy. Offboard is
   self-serve first; demos are not part of the jobseeker funnel.

## Words to avoid in titles

Do not use, in any article title:

- "Beat the ATS"
- "AI resume hack"
- "spray and pray"
- "guaranteed interviews"
- "secret job market unlock"

More generally: no fear-based "beat the bots" framing, and never
"guarantee" an outcome (interviews, offers, placement, or benefit amounts).
This matches the compliance language already enforced elsewhere on the site
(see `PRODUCT_FAQS` in `MarketingSite.tsx`: "Does Offboard guarantee
benefits, interviews, offers, or placement? No.").

## Held: state-by-state pages

A "What [state] owes you after a layoff" page generated per state from a
verified benefits registry (unemployment eligibility, COBRA/ACA timelines,
state-specific deadlines) is a plausible large content surface, but it is
explicitly **held**, not started, pending:

- An SEO reality check on actual search volume and ranking difficulty for
  state-level layoff/benefits queries (the clusters above are the ones
  currently believed to be viable; state pages have not been validated the
  same way).
- A revenue case for the engineering and content investment (50 states ×
  ongoing accuracy maintenance is a real cost, not a one-time build).

Do not start building state pages without both of the above being resolved
first — see the strategy folder referenced in the growth playbook for the
gating criteria.
