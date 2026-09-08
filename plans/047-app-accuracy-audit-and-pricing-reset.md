# Plan 047 — App accuracy audit and the pricing reset on the site

> **Execute with:** Fable 5.1 · high — every line here is a claim about the product, read from `lumo-plan-builder` `origin/main`; the pricing figures are ledger rows, and a wrong one ships a false price.

**Owner ask (2026-09-07):** check the site's offerings against the app, carry
the app's new pricing structure onto the pricing page, the homepage pricing
section and anywhere else it touches, and produce screenshots or mocks of
the app interfaces the marketing pages rely on.

**Source read:** `lumo-plan-builder` `origin/main` at `d5d8e1f7`
(2026-09-07), read-only per the owner rule. Files named below. Nothing in
the app repo was opened for writing, run, or changed.

---

## 1. Pricing: what changed in the app, and what the site said

The app shipped a pricing reset on 2026-09-07 (Sprints 412, 413, 414;
decision record `documentation/strategy/pricing-reset-2026-09.md` v2,
owner-approved 2026-09-06). The wall moved from **how many credits** to
**which work**. Read from `src/pages/Pricing.tsx`, `src/config/creditCosts.ts`,
`src/components/job-packet/packetSteps.ts`, `src/components/lumo/LumoDailyLimitDialog.tsx`,
`documentation/product/product-spec.md` § 6.

| Claim | Site before today | App now | Site now |
| --- | --- | --- | --- |
| Free Lumo allowance | 3 messages a day | **10 a day**, fast model, enforced server-side | 10 a day (`/pricing`, `/`, `/lumo`) |
| Pro Lumo | "Unlimited conversations" | Unlimited, **advanced model** | Unlimited on the advanced model |
| Credits | Free 30 / Pro 300 a month, on the deck and the credits section | Grants unchanged (`MONTHLY_CREDITS`), but the app **hides balances** in its shell and credits only buy the extras | No credit counts on the site; "credits cover the extras" |
| First packet | "First Application Packet free" | **One complete packet, every step free**, then the assessment (parse, company intel, role match) on every later packet | Both stated |
| What Pro buys | "More room for packets and tailoring", "deeper support" | Tailored resumes, cover letters, interview briefs, path to a person on every packet; enriched ghost checks; connected assistant can run packets | Stated in the app's own words |
| Ghost checks on Free | not stated | **3 basic a month**, shared with the connector | Stated |
| Pro allowance | not stated | **About 30 full packets a month, email at 25, never stops a build without warning** (disclosed by design) | Stated |
| Quarterly | "shown at checkout" | **$45 every 3 months ($15/month)** | Stated under the Pro price |
| Paperwork review | listed as a Pro feature | A **credit extra on every tier** (`DOCUMENT_ANALYSIS`, 2 credits) | Moved to "what credits buy" |
| Sponsorship | $199 / $169 at 50+, 90 days of Pro | `sponsorshipPricing.ts`: same; `SPONSORSHIP_ACCESS_DAYS = 90` | Unchanged, confirmed |
| Gift Pro | $20 / $54 / $99, not on site | `src/components/gift/tiers.ts`: same | Unchanged, still unshipped |

Where it landed: `COPY.md` ledger row "Consumer tiers" (source and date
rewritten), § 3 deck, "How credits work" → "What the plan covers", FAQ
(one rewritten, one added), § 1 plans band, § 12 Lumo line; code in
`MarketingSite.tsx`, `MarketingRoutePages.tsx`, `MarketingHome.tsx`,
`MarketingLumo.tsx`.

**Not carried over, on purpose:** the app's Product Hunt coupon banner
(50% off three months) is a campaign, not a price; the app's B2B doc
`documentation/b2b-documentation/05-pricing-and-plans.md` still says
"30 days of Pro" and "300 AI credits", which contradicts the app's own code
(90 days) and the reset. That is an app-repo doc bug; noted here, not fixed
here (owner rule).

## 2. Offerings: accurate, and the gaps

**Accurate today** (name on site → in the app): Career Context (`/context`,
`CAREER_CONTEXT`), Application Packet (`APPLICATION_PACKET`), Resume
Tailoring, Cover Letters, Ghost Job Checker, Interview Prep, Application
Tracker, Paperwork Review, Runway calculator, Funded Training, Your Path,
Lumo (`Ask LUMO`). Integrations: Google Calendar, Google Drive, Calendly live;
ChatGPT and Claude in beta; Gmail built but `GMAIL_INTEGRATION_ENABLED: false`
pending Google verification; Notion `coming-soon`. The site's showcase matches
`src/components/settings/IntegrationsGrid.tsx` exactly. Security claims:
`SECURITY_CLAIMS.md` last updated 2026-08-05; the site's July-audit line and
no-certification line still hold.

**Names that drifted** (site → app's member-facing label):
- `Role Fit` → the app now says **`Role Match`** (`RoleMatchCard.tsx`,
  packet step `Role Match Analysis`). The glossary marked Role Fit
  marketing-owned on 2026-09-03; the app has since put a name on it.
  Recommend the site adopt `Role Match`.
- `Company Intelligence` → the app says **`Company Intel`** (packet step
  label, `CompanyBriefingCard`). Recommend `Company Intel`.
- `Voice Practice` → the app calls the feature a **mock interview** in its
  member copy and "voice practice" in Settings and Pricing. Either holds;
  keep.
- `Interview briefs` are a Pro packet step the site never names; the site's
  `Interview Prep` covers it. Fine.

**App offerings the site does not mention** (all live per product-spec § 7):
Brand Kit & Headshots, Reflections and Reflection Coach, Network (CRM with
LinkedIn import), Jobs (a multi-provider job directory; `/employers` says
"a real job feed"), Calendar, Documents, Analytics, Community, Voice LUMO.
None of these are claims the site makes wrongly; they are things it is quiet
about. The "ten tools" count stays true as the search toolkit. Owner call
whether Brand Kit & Headshots or the Jobs directory earn a mention on
`/job-search`.

**Claims to watch:** the homepage's hero chat image says "Used profile,
applications, interviews, integrations" and lists two tasks; the app's Lumo
does read those sources (`context-hub`, `What Lumo knows`), so it holds.

## 3. Interfaces: what exists, and what was made

The app repo holds real screenshots, but they are dated: five promo captures
from **2026-05-11** (`remotion/public/screenshots/offboard-promo/`) and four
from **2026-04-21** (`public/employee-experience/`). They predate the panel
shell, the Lumo dock, the pricing reset and the Career Context rename, so
they are reference only. The capture script needs a QA login
(`bun run capture:screenshot-promo` with `QA_BASE_URL`, `QA_EMAIL`,
`QA_PASSWORD`), which only the owner can run.

Delivered instead: a mock sheet of the four surfaces the pricing story
depends on, built from the app's shipped copy and its design tokens
(`src/index.css` dark theme, Inter), not invented: the packet step picker
with Pro locks (`PacketInput.tsx`, `packetSteps.ts`), the locked-steps card
(`LockedStepCard.tsx`), the Lumo daily-limit dialog
(`LumoDailyLimitDialog.tsx`), and the in-app pricing page (`Pricing.tsx`).
File: `app-interface-mocks-2026-09-07.png`, sent to the owner.

**Recommendation:** run the capture script once with a QA account and commit
the five fresh PNGs to the app repo; then the marketing site can carry real
screenshots where the compositions now stand in.

## Verification

`npm test`, `lint`, `lint:css`, `typecheck`, `build`, `npm run e2e`; the
`/pricing`, `/` and `/lumo` baselines re-captured deliberately.
