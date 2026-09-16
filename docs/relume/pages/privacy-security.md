# Privacy and security Relume manifest

## Page contract

- Route: `/privacy-security`
- Primary audience: Jobseekers, sponsors, and buyers
- Page purpose: Explain who can see a member's record, who cannot, and the honest limits
- Primary CTA: Build my free transition plan
- Architecture source: `docs/site-architecture.md`
- Copy source: `COPY.md`, privacy and security section
- Fixed surfaces: navigation, hero, and footer
- Audit date: 2026-09-16
- Implementation branch: `codex/relume-content22-pilot`
- Preview URL: Managed through pull request 112

## Section map

| Order | Section job | Current local implementation | Relume candidates | Selected source | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Establish the trust question | `PageHero` | None | Current | Kept current | Hero and navigation were outside the pilot |
| 2 | Provide page orientation | `PageIndex` | Content 28 | Content 28 | Built | Numbered anchor index |
| 3 | Explain access by data type | `WhoSeesWhat` | Audited, current structure retained | Current | Kept current | Dense access matrix needed its purpose-built semantics |
| 4 | Show verifiable controls | `Receipts` | Layout 294 | Layout 294 | Built | Four proof items |
| 5 | Contrast sponsor visibility | `Sponsors` | Comparison 13 | Comparison 13 | Built | Two-sided sees / never sees comparison |
| 6 | Explain connected-assistant boundaries | `ConnectedAssistants` | Content 17 | Content 17 | Built | Editorial disclosure split |
| 7 | State the technical limits honestly | `HonestPart` | Content 22 | Content 22 | Built | Long-form section plus supporting control ledger |
| 8 | Answer detailed trust questions | `FaqSection` | Current shared FAQ | Current | Kept current | Reuse is deliberate for accessible disclosure behavior |
| 9 | State member data rights | `YourCall` | Description List 1 | Description List 1 | Built | Numbered rights list |
| 10 | Close on informed trust | `FinalCta` | Current shared CTA | Current | Kept current | Shared site closing band |

## Page-level review

- Repeated Relume slugs or near-identical patterns: None
- Desktop rhythm: Verified during the pilot
- Mobile rhythm: Verified during the pilot
- Accessibility risks: Dense access matrix remains the highest-complexity section
- Copy or claim changes requested: None
- New assets requested: None
- Shared component impact: None; adaptations are route-local
- Verification required: Repeat full required checks after further changes

## Decision log

- 2026-09-16: Built six distinct Relume-derived structures while preserving the
  existing hero, access matrix, FAQ, final CTA, navigation, and footer.
