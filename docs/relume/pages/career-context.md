# Career Context Relume manifest

## Page contract

- Route: `/career-context`
- Primary audience: Jobseekers
- Page purpose: Explain the living record behind every Offboard experience
- Primary CTA: Create my Career Context
- Architecture source: `docs/site-architecture.md`
- Copy source: `COPY.md`, section 10
- Fixed surfaces: navigation and footer; hero is eligible for audit
- Audit date: Not yet audited as a whole page
- Implementation branch: None
- Preview URL: None

## Section map

| Order | Section job | Current local implementation | Relume candidates | Selected source | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Define Career Context | `PageHero` | None | None | Not audited | Non-homepage hero may change if a candidate is stronger |
| 2 | Establish why a resume is insufficient | `ProblemSection` | None | None | Not audited | Documentary image is an intentional human-first opening |
| 3 | Show the eight record types | `HoldsSection` | None | None | Not audited | Content count is fixed at eight |
| 4 | Explain inputs and outputs | `InOutSection` | None | None | Not audited | Preserve the directional relationship |
| 5 | Explain ownership and privacy | `OwnershipSection` | None | None | Not audited | Hands off to `/privacy-security` |
| 6 | Connect to Lumo and integrations | `AlsoStrip` | None | None | Not audited | Shared sibling-page promo |
| 7 | Close on creation | `FinalCta` | None | Current | Kept current | Shared site closing band |

## Page-level review

- Repeated Relume slugs or near-identical patterns: Not audited
- Desktop rhythm: Not audited
- Mobile rhythm: Not audited
- Accessibility risks: Not audited
- Copy or claim changes requested: None
- New assets requested: None
- Shared component impact: Hero changes could affect `PageHero`; prefer route-local adaptation
- Verification required: Full route e2e plus desktop and mobile visual inspection
