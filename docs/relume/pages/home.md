# Homepage Relume manifest

## Page contract

- Route: `/`
- Primary audience: Jobseekers
- Page purpose: Explain what Offboard is, show how it works, and earn a free signup
- Primary CTA: Get started free
- Architecture source: `docs/site-architecture.md`, Homepage section order
- Copy source: `COPY.md`, section 1
- Fixed surfaces: navigation, hero, footer
- Audit date: Not yet audited as a whole page
- Implementation branch: None
- Preview URL: None

## Section map

| Order | Section job | Current local implementation | Relume candidates | Selected source | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Establish the category and promise | `HomeHero` | None | Current | Kept current | The homepage hero is explicitly preserved by default |
| 2 | Explain the four-part system | `FourSteps` | None | None | Not audited | Preserve the product's actual stage order |
| 3 | Explain Career Context | `StepContext` | None | None | Not audited | Keep the link to `/career-context` |
| 4 | Explain Lumo and connected assistants | `StepConnect` | None | None | Not audited | Preserve the beta disclosure |
| 5 | Show the job-search toolkit | `StepSearch` | None | None | Not audited | Real tools and states must remain product-true |
| 6 | Explain the layoff plan | `StepPlan` | None | None | Not audited | Preserve the independence disclaimer |
| 7 | Compare Free, Pro, and Sponsored access | `PlansSection` | None | None | Not audited | Pricing and sponsor claims require exact copy |
| 8 | Provide community proof | `CommunityStrip` | None | None | Not audited | Shared surface |
| 9 | Close on the primary action | `FinalCta` | None | Current | Kept current | Shared site closing band |

## Page-level review

- Repeated Relume slugs or near-identical patterns: Not audited
- Desktop rhythm: Not audited
- Mobile rhythm: Not audited
- Accessibility risks: Not audited
- Copy or claim changes requested: None
- New assets requested: None
- Shared component impact: Navigation and footer stay fixed
- Verification required: Full visual and interaction QA if any section changes
