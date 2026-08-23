# Resources content roadmap

Reference for future article work on `/resources`. Source: app repo
`documentation/sales/jobseeker-growth-playbook/03-acquisition-channels-and-campaigns.md`
(Channel 3) and `04-messaging-library-and-content-pillars.md`, as cited in
plan 013. This executor did not have direct read access to the app repo in
this worktree; the content below is transcribed from the plan's own
specification of those sections, which the plan author sourced from that
playbook. Treat the cluster volumes/difficulty figures as placeholders to
verify against the source doc (or current SEO tooling) before acting on them.

## Priority keyword clusters

Seven clusters map onto search intent that fires the week someone is laid
off, not generic "career services" language. Each should map to a specific
product landing path, not a generic demo CTA.

| Cluster | Search-intent examples | Product landing path |
| --- | --- | --- |
| Ghost jobs | "is this job posting fake", "ghost job listings 2026" | The job tracker's status/verification workflow |
| Resume tailoring | "tailor resume to job description", "ATS resume keywords" | Resume Tailor |
| Jobs directory | "layoff list [industry/company]", "who is hiring after layoffs" | The jobs directory / matching surface |
| Job tracker | "best job application tracker", "spreadsheet vs app for job search" | The application tracker |
| Layoff checklist | "what to do after being laid off", "first week after layoff" | The runway/benefits checklist flow (ported: `first-week-after-a-layoff`) |
| Interview prep | "interview prep after layoff", "how to explain layoff in interview" | Interview Practice |
| Career repositioning | "changing careers after layoff", "career pivot resume" | Job Packet / career-change guidance (ported: `career-changers-guide-to-job-offer-negotiations`) |

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
