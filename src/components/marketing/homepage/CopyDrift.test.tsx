import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { ReactElement } from "react";

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { COMPANY_PAGES } from "@/content/companies";
import { buildResourceSections } from "@/content/resources/registry";

import { MarketingCareerContext } from "./MarketingCareerContext";
import { MarketingIntegrations } from "./MarketingIntegrations";
import { MarketingJobSearch } from "./MarketingJobSearch";
import { MarketingLayoffSupport } from "./MarketingLayoffSupport";
import { MarketingLumo } from "./MarketingLumo";
import { MarketingPrivacySecurity } from "./MarketingPrivacySecurity";
import { MarketingCommunities } from "./MarketingCommunities";
import { MarketingCompanyPage } from "./MarketingCompanyPage";
import { MarketingWorkforce } from "./MarketingWorkforce";
import MarketingHome from "./MarketingHome";
import {
  MarketingAbout,
  MarketingAct,
  MarketingEmployers,
  MarketingHowItWorks,
  MarketingPricing,
  MarketingResources,
} from "./MarketingRoutePages";

// COPY.md is read once from the repo root (tests run with process.cwd() there,
// per vitest.config.ts) so drift between the doc and shipped copy fails the
// build instead of silently rotting.
const COPY_DOC = readFileSync(path.join(process.cwd(), "COPY.md"), "utf8");

const LEDGER_HEADING = "## Verified-facts ledger";

function ledgerSection(): string {
  const start = COPY_DOC.indexOf(LEDGER_HEADING);
  const afterHeading = COPY_DOC.slice(start + LEDGER_HEADING.length);
  const end = afterHeading.indexOf("\n## ");
  return end === -1 ? afterHeading : afterHeading.slice(0, end);
}

// Pulls exactly one named row out of the ledger table. Deliberately not a
// generic "extract all bold text" parser: the ledger's bolding is irregular
// (some rows bold multiple fragments, some bold nothing in column 2, some
// bold column 3), so a row-by-label lookup is the only reliable seam.
function ledgerRow(factLabel: string): string {
  const row = COPY_DOC.split("\n").find((line) => line.startsWith(`| ${factLabel} |`));
  if (!row) {
    throw new Error(
      `COPY.md verified-facts ledger has no row labelled "${factLabel}". If the row was renamed, update this test in the same PR.`,
    );
  }
  return row;
}

function renderedText(ui: ReactElement): string {
  const { container } = render(ui);
  return container.textContent ?? "";
}

describe("COPY.md is readable and structured as expected", () => {
  it("is non-empty and contains the verified-facts ledger section", () => {
    expect(COPY_DOC.length).toBeGreaterThan(5000);
    expect(COPY_DOC).toContain(LEDGER_HEADING);
  });

  it("has at least 10 fact rows in the ledger, excluding header and separator", () => {
    const rows = ledgerSection()
      .split("\n")
      .filter((line) => line.startsWith("| "))
      .filter((line) => !line.startsWith("| Fact |") && !line.startsWith("| --- |"));
    expect(rows.length).toBeGreaterThanOrEqual(10);
  });
});

describe("verified-facts ledger matches shipped copy", () => {
  it("Employer seat price: $199 and $169 appear in the ledger and on /employers", () => {
    const row = ledgerRow("Employer seat price");
    expect(row).toContain("$199");
    expect(row).toContain("$169");
    const text = renderedText(<MarketingEmployers />);
    expect(text).toContain("$199");
    expect(text).toContain("$169");
  });

  it("Legacy outplacement comparison: $3,000 to $7,000 appears in the ledger and on /employers", () => {
    const row = ledgerRow("Legacy outplacement comparison");
    expect(row).toContain("$3,000 to $7,000");
    expect(renderedText(<MarketingEmployers />)).toContain("$3,000 to $7,000");
  });

  it("Newsletter subscribers: 5,000+ appears in the ledger and on the homepage", () => {
    const row = ledgerRow("Newsletter subscribers");
    expect(row).toContain("5,000+");
    expect(renderedText(<MarketingHome />)).toContain("5,000+");
  });

  it("Newsletter subscribers: 5,000+ appears in the ledger and on /about", () => {
    const row = ledgerRow("Newsletter subscribers");
    expect(row).toContain("5,000+");
    expect(renderedText(<MarketingAbout />)).toContain("5,000+");
  });

  // Restored to /layoff-support on the owner's 2026-09-01 call (plan 033). The
  // number never ships bare: the conditions and the "amounts vary" small print
  // are asserted with it, and it stays off the homepage.
  it("CalJOBS training extension example: $12,000 and week 16 appear in the ledger and on /layoff-support", () => {
    const row = ledgerRow("CalJOBS training extension example");
    expect(row).toContain("$12,000");
    expect(row).toContain("week 16");
    const text = renderedText(<MarketingLayoffSupport />);
    expect(text).toContain("$12,000");
    expect(text).toContain("week 16");
    expect(text).toContain("Amounts and timing vary by situation.");
    expect(text).toContain("We never promise funding");
  });

  it("CalJOBS training extension example: stays off the homepage", () => {
    expect(renderedText(<MarketingHome />)).not.toContain("$12,000");
  });

  // Plan 041 makes permanent the throwaway spec plan 030 described in prose.
  // /layoff-support is the most claim-sensitive page on the site, and it is
  // now also the longest, so the guard lives in the suite rather than in a
  // paragraph telling a future executor to re-create it.
  describe("/layoff-support claim discipline (plan 030 spec, made permanent by 041)", () => {
    it("ships all three required safeguard lines", () => {
      const text = renderedText(<MarketingLayoffSupport />);
      expect(text).toContain("We never promise funding");
      expect(text).toContain("Offboard is not a government agency");
      expect(text).toContain("AI guidance, not legal advice");
    });

    it("promises nothing about funding, eligibility, or outcome", () => {
      const text = renderedText(<MarketingLayoffSupport />);
      for (const banned of [/you qualify/i, /you are eligible/i, /we will get you/i, /guarantee/i]) {
        expect(text).not.toMatch(banned);
      }
    });

    // Owner decision 2026-09-04: the marketing site does not get granular
    // about benefit or legal deadlines. The app knows every one of these
    // figures; none of them belong on a marketing page without a ledger row,
    // and the owner's call was to cut them rather than add the rows. Same
    // call as the homepage plan card, 2026-08-26. COPY.md § 13 records it.
    it("carries no benefit or legal day count", () => {
      const text = renderedText(<MarketingLayoffSupport />);
      for (const banned of [/\b60 days\b/i, /\b21 days\b/i, /\b45 days\b/i, /\b7 days\b/i, /\b2-3 weeks\b/i, /\b2 to 3 weeks\b/i, /\b14 days\b/i]) {
        expect(text).not.toMatch(banned);
      }
    });

    // The page's own numbers are exactly two ledger-backed things: the
    // CalJOBS hook and whatever VerifiedFactsStrip renders. This asserts the
    // rewrite did not quietly reintroduce the search as a headline topic.
    it("keeps the job search to its own band, not the benefits sections", () => {
      const text = renderedText(<MarketingLayoffSupport />);
      expect(text).toContain("When the paperwork is handled, the search is still there.");
      expect(text).not.toContain("How do I find another job?");
    });
  });

  // Which assistants and tools are connectable is a claim, not decoration: the
  // grid and the ledger row have to agree, including the beta labelling the
  // owner asked for (2026-09-01).
  it("Live integrations: the ledger row and the /integrations grid agree", () => {
    const row = ledgerRow("Live integrations");
    const text = renderedText(<MarketingIntegrations />);
    for (const name of ["Google Calendar", "Google Drive", "Calendly", "ChatGPT", "Claude", "Gmail", "Notion"]) {
      expect(row).toContain(name);
      expect(text).toContain(name);
    }
    expect(row).toContain("beta");
    expect(text).toContain("Beta");
    expect(text).toContain("In progress");
  });

  it("Job centers: ledger row keeps the approved phrasing governed", () => {
    const row = ledgerRow("Job centers");
    expect(row).toContain("2,000+ job centers");
    expect(row).toContain("Not currently shipped");
  });

  it("State-approved training programs (CA): 4,000+ appears in the ledger and on /how-it-works", () => {
    const row = ledgerRow("State-approved training programs (CA)");
    expect(row).toContain("4,000+");
    expect(renderedText(<MarketingHowItWorks />)).toContain("4,000+");
  });

  it("Sponsored access duration: '90 days of full Offboard Pro' appears in the ledger and on /employers", () => {
    const row = ledgerRow("Sponsored access duration");
    expect(row).toContain("90 days of full Offboard Pro");
    expect(renderedText(<MarketingEmployers />)).toContain("90 days of full Offboard Pro");
  });

  it("Consumer tiers: $0 and $20 appear in the ledger and on /pricing", () => {
    const row = ledgerRow("Consumer tiers");
    expect(row).toContain("$0");
    expect(row).toContain("$20");
    const text = renderedText(<MarketingPricing />);
    expect(text).toContain("$0");
    expect(text).toContain("$20");
  });

  it("ACT suggested pilot shape: '25 to 100 residents' appears in the ledger and on /act", () => {
    const row = ledgerRow("ACT suggested pilot shape");
    expect(row).toContain("25 to 100 residents");
    expect(renderedText(<MarketingAct />)).toContain("25 to 100 residents");
  });
});

// Plan 038. A company page states public facts about a named third party.
// Three things are asserted for every company, not a sample: every figure in
// the JSON appears in COPY.md § 17's facts register (a number with no register
// row cannot ship); every figure actually renders on the page; and every fact
// carries an https source and a check date. Plus the two sentences that keep
// the page honest about what Offboard is to the company.
describe("company pages hold the facts-register discipline", () => {
  const registerSection = (): string => {
    const start = COPY_DOC.indexOf("# 17 · Company Transition Centers");
    expect(start).toBeGreaterThan(-1);
    return COPY_DOC.slice(start);
  };

  it.each(COMPANY_PAGES.map((c) => [c.name, c] as const))("%s: every figure is registered, rendered, and sourced", (_name, company) => {
    const text = renderedText(<MarketingCompanyPage company={company} />);
    const register = registerSection();
    const figures = [...company.facts.map((f) => f.figure), ...(company.severance ? [company.severance.figure] : [])];
    expect(figures.length).toBeGreaterThan(0);
    for (const figure of figures) {
      expect(register, `${company.name}: "${figure}" has no row in COPY.md § 17`).toContain(figure);
      expect(text, `${company.name}: "${figure}" does not render`).toContain(figure);
    }
    for (const fact of [...company.facts, ...(company.severance ? [company.severance] : [])]) {
      expect(fact.source_url).toMatch(/^https:\/\//);
      expect(fact.checked_on).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    expect(company.last_checked).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(text).toContain(`Offboard has no relationship with ${company.name}`);
    expect(text).toContain(`independent of ${company.name}`);
    expect(text).not.toContain("—");
  });

  // Every logo is self-hosted, carries the source it came from, and is
  // registered in COPY.md. A hotlinked mark would be both a CDN dependency
  // and a third-party request on a site that ships a privacy page.
  it.each(COMPANY_PAGES.map((c) => [c.name, c] as const))("%s: logo is self-hosted, sourced, and registered", (_name, company) => {
    const logo = company.logo;
    if (!logo) return; // a monogram company is allowed; nothing to check
    expect(logo.src.startsWith("/marketing/companies/"), `${company.name}: logo must be self-hosted`).toBe(true);
    expect(existsSync(path.join(process.cwd(), "public", logo.src)), `${company.name}: ${logo.src} is missing from public/`).toBe(true);
    expect(logo.source_url).toMatch(/^https:\/\//);
    expect(logo.checked_on).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const register = registerSection();
    expect(register, `${company.name}: logo source is not in COPY.md § 17`).toContain(logo.source_url);
    // the mark and the "no relationship" line share the hero
    const text = renderedText(<MarketingCompanyPage company={company} />);
    expect(text).toContain(`Offboard has no relationship with ${company.name}`);
  });

  it("never claims a relationship, an endorsement, or a member count", () => {
    for (const company of COMPANY_PAGES) {
      // Scoped to <main>: the shared footer legitimately says "the official
      // programs" about government benefits, and that is not this page's claim.
      const { container } = render(<MarketingCompanyPage company={company} />);
      const text = container.querySelector("main")?.textContent ?? "";
      expect(text.length).toBeGreaterThan(500);
      // "Official source" and "the official page" point at the state agency and
      // are the point of the page. What must never appear is Offboard being
      // official, endorsed, or a partner in relation to the company.
      expect(text).not.toMatch(/partner(s|ed|ship)? with/i);
      expect(text).not.toMatch(/official(ly)? (partner|program|offboard)/i);
      expect(text).not.toMatch(/(endorsed|approved|sponsored) by [A-Z]/);
      expect(text).not.toMatch(/\d+ (Offboard )?members? (are|is) from/i);
    }
  });
});

// Plan 034. /privacy-security is the only page whose sentences are security
// claims, and the app repo's SECURITY_CLAIMS.md §3 names the exact wordings
// that are NOT supportable. Both directions are asserted: the banned absolutes
// must never appear, and the two ledger-governed facts must.
describe("/privacy-security holds the claims-register discipline", () => {
  const text = () => renderedText(<MarketingPrivacySecurity />);

  it.each([
    [/impossible/i, 'the approved phrasing is "prevented by ... Row-Level Security"'],
    [/we cannot read/i, 'the provable form is "no read path exists in the product"'],
    [/never shared/i, 'the provable form names the providers and says "we do not sell your data"'],
    [/SOC ?2 (certified|compliant)/i, "we hold no certification"],
    [/ISO ?270\d\d/i, "we hold no certification"],
    [/bank[- ]level|military[- ]grade/i, "unfalsifiable security theatre"],
  ])("never makes the unsupportable claim %s (%s)", (pattern) => {
    expect(text()).not.toMatch(pattern);
  });

  it("AI providers: OpenAI and Anthropic appear in the ledger and on the page", () => {
    const row = ledgerRow("AI providers");
    expect(row).toContain("OpenAI");
    expect(row).toContain("Anthropic");
    expect(text()).toContain("OpenAI");
    expect(text()).toContain("Anthropic");
  });

  it("Security claims audit: the July 2026 audit and the no-certification line both ship", () => {
    const row = ledgerRow("Security claims audit");
    expect(row).toContain("audited July 2026");
    expect(row).toContain("no SOC 2 or ISO certification");
    expect(text()).toContain("July 2026");
    expect(text()).toContain("We do not hold a SOC 2 or ISO certification");
  });

  it("makes the sponsor rule explicit, not implied", () => {
    expect(text()).toContain("A sponsor sees a number. A sponsor never sees you.");
    expect(text()).toContain("contractual, not a preference");
  });

  // The register has no control for what happens after an outside assistant
  // reads the record, so the page must not describe that provider's terms.
  it("does not characterise an outside provider's retention terms", () => {
    expect(text()).toContain("under that provider's terms");
    expect(text()).not.toMatch(/(ChatGPT|Claude|OpenAI|Anthropic) (does not|never) (store|retain|keep)/i);
  });
});

// Plan 018 phase 3 rebuilt the homepage plan-preview card from real product
// state in lumo-plan-builder origin/main. Two things can rot silently here and
// neither is covered anywhere else: the card drifting back toward invented
// product UI, and a benefit or severance NUMBER arriving on the card without a
// verified-facts ledger row to back it. Both directions are asserted.
describe("homepage plan-preview card stays real product state", () => {
  const PLAN_PREVIEW_STRINGS = [
    "Layoff Plan",
    "The steps that fit your situation. Do them in any order.",
    "Protect the first week",
    "Write down your key dates",
    "Most post-layoff mistakes are missed deadlines.",
    "Understand your COBRA / health insurance options",
    "Secure your accounts and access",
  ] as const;

  it.each(PLAN_PREVIEW_STRINGS)("ships %s and documents it in COPY.md", (value) => {
    expect(renderedText(<MarketingHome />)).toContain(value);
    expect(COPY_DOC).toContain(value);
  });

  // The retired invented UI. None of it exists in the product; if any of it
  // comes back, this card has stopped being a picture of the real thing.
  it.each([
    "Your starting plan",
    "Week one",
    "Coming up",
    "Review severance and save questions",
    "Finish application packet for Northstar",
    "Ask Lumo what to do first",
  ])("does not resurrect the invented plan UI: %s", (value) => {
    expect(renderedText(<MarketingHome />)).not.toContain(value);
  });

  // The claim-free rule (owner decision 2026-08-26). These two strings are
  // genuine product copy, deliberately left off the marketing card because
  // neither figure is in the ledger. Shipping one means adding a ledger row
  // in the same PR -- at which point this assertion is the thing to update.
  it.each(["Takes 2-3 weeks to start", "21 or 45 days to decide"])(
    "keeps the unbacked claim %s off the homepage",
    (value) => {
      expect(renderedText(<MarketingHome />)).not.toContain(value);
      expect(ledgerSection()).not.toContain(value);
    },
  );
});

const SWEPT_PAGES: ReadonlyArray<[string, () => ReactElement]> = [
  ["MarketingHome", () => <MarketingHome />],
  ["MarketingCareerContext", () => <MarketingCareerContext />],
  ["MarketingIntegrations", () => <MarketingIntegrations />],
  ["MarketingLumo", () => <MarketingLumo />],
  ["MarketingLayoffSupport", () => <MarketingLayoffSupport />],
  ["MarketingJobSearch", () => <MarketingJobSearch />],
  ["MarketingPrivacySecurity", () => <MarketingPrivacySecurity />],
  ["MarketingHowItWorks", () => <MarketingHowItWorks />],
  ["MarketingPricing", () => <MarketingPricing />],
  ["MarketingAbout", () => <MarketingAbout />],
  ["MarketingResources", () => <MarketingResources sections={buildResourceSections()} />],
  ["MarketingWorkforce", () => <MarketingWorkforce />],
  ["MarketingCommunities", () => <MarketingCommunities />],
];

describe("MarketingResources sweep still covers real article content", () => {
  // Plan 015 step 6 moved /resources' data fetch (buildResourceSections) out
  // of MarketingResources and into the route. This guards against the sweep
  // silently starting to cover an empty shell (e.g. sections={[]} passed by
  // mistake), which would make the never-say/em-dash assertions below vacuous.
  it("renders a known ported article title", () => {
    const text = renderedText(<MarketingResources sections={buildResourceSections()} />);
    expect(text).toContain("What to do in your first week after a layoff");
  });
});

describe("plan 042: the retired numbered grid stays retired", () => {
  const CSS = readFileSync(path.join(__dirname, "MarketingHomepage.css"), "utf8");

  // The grid itself. DeadSelectors guards CSS with no TSX reference; this
  // guards the other direction, a re-introduction of the shape.
  it("the .mh-route-card-grid rule is gone from the stylesheet", () => {
    expect(CSS).not.toMatch(/^\.mh-route-card-grid/m);
  });

  // R11. Numerals promise an order. Every contrast section lost them, and
  // the one caller that is a real sequence (/workforce) kept them.
  it.each([
    ["MarketingCareerContext", () => <MarketingCareerContext />, "Every time you explain yourself to a new tool"],
    ["MarketingLumo", () => <MarketingLumo />, "You spend the conversation on the decision instead of on context"],
    ["MarketingJobSearch", () => <MarketingJobSearch />, "The tenth application takes less effort than the first"],
  ] as const)("%s keeps its contrast payoff line", (_name, factory, payoff) => {
    expect(renderedText(factory())).toContain(payoff);
  });

  it("/workforce keeps numerals, because Orient/Route/Follow through is a real sequence", () => {
    const text = renderedText(<MarketingWorkforce />);
    expect(text).toContain("Orient");
    expect(text).toContain("Route");
    expect(text).toContain("Follow through");
  });

  // The two eight-card grids that sat back to back on /career-context, and
  // overlapped each other, are one grid plus a chip row now.
  it("/career-context no longer ships the duplicate import grid", () => {
    const text = renderedText(<MarketingCareerContext />);
    expect(text).toContain("Eight kinds of record, one place.");
    expect(text).toContain("Built from what you already have");
    expect(text).not.toContain("Bring what you already have.");
    expect(text).not.toContain("Goals & preferences");
    expect(text).not.toContain("Applications & contacts");
  });

  it("/career-context uses the cleaner v3 hero composition", () => {
    const { container } = render(<MarketingCareerContext />);
    const heroImage = container.querySelector<HTMLImageElement>('.mh-route-hero-visual img');
    expect(heroImage?.getAttribute("src")).toContain("career-context-card-civic-modern-v3-transparent.webp");
    expect(heroImage).toHaveAttribute(
      "alt",
      "A layered Career Context card with rows for experience, applications, interviews and goals, built from a resume and interview notes",
    );
  });

  // Numbering is a CSS counter now, so it must not be back in the strings.
  it("/career-context ownership copy carries no baked-in numbering", () => {
    const text = renderedText(<MarketingCareerContext />);
    expect(text).toContain("You choose what goes in, and you can edit or remove anything.");
    expect(text).not.toMatch(/0[1-4] You choose what goes in/);
  });
});

describe("language rules hold on shipped pages", () => {
  // Built at runtime (rather than as a literal string) so this file itself
  // never contains the retired phrase — the existing MarketingHome.test.tsx
  // harness uses the same technique for the same reason. The alternation
  // covers both banned forms, "services" and "support".
  const retiredCareerTransitionPhrase = new RegExp(["career", "transition (service|support)"].join("."), "i");

  it.each(SWEPT_PAGES)("never-say list stays retired on %s", (_name, factory) => {
    const text = renderedText(factory());
    expect(text).not.toMatch(retiredCareerTransitionPhrase);
    expect(text).not.toMatch(/transition intelligence/i);
    expect(text).not.toMatch(/career memory/i);
  });

  it.each(SWEPT_PAGES)("does not resurrect the stale 8,000 subscriber count on %s", (_name, factory) => {
    expect(renderedText(factory())).not.toContain("8,000");
  });

  // "Outplacement" is scoped to exactly two contexts per COPY.md's Language
  // rules (corrected 2026-08-24 to match the 2026-08-21 owner decision):
  // the buyer page (/employers) and Sponsored-tier copy wherever it renders
  // (the homepage pricing teaser and the /pricing deck both ship "Outplacement,
  // modernized."). It must not appear in jobseeker narrative copy. Both
  // directions are asserted: presence matters too, since silently deleting
  // the Sponsored card would be drift just as much as adding the word
  // somewhere it doesn't belong.
  it.each([
    ["MarketingEmployers", () => <MarketingEmployers />],
    ["MarketingPricing", () => <MarketingPricing />],
    ["MarketingHome", () => <MarketingHome />],
  ] as const)("%s says outplacement (buyer page or Sponsored-tier copy)", (_name, factory) => {
    expect(renderedText(factory())).toMatch(/outplacement/i);
  });

  it.each([
    ["MarketingHowItWorks", () => <MarketingHowItWorks />],
    ["MarketingCareerContext", () => <MarketingCareerContext />],
    ["MarketingIntegrations", () => <MarketingIntegrations />],
    ["MarketingLumo", () => <MarketingLumo />],
    ["MarketingLayoffSupport", () => <MarketingLayoffSupport />],
    ["MarketingJobSearch", () => <MarketingJobSearch />],
    ["MarketingPrivacySecurity", () => <MarketingPrivacySecurity />],
    ["MarketingAbout", () => <MarketingAbout />],
    ["MarketingAct", () => <MarketingAct />],
    ["MarketingResources", () => <MarketingResources sections={buildResourceSections()} />],
    ["MarketingWorkforce", () => <MarketingWorkforce />],
    ["MarketingCommunities", () => <MarketingCommunities />],
  ] as const)("%s does not say outplacement (jobseeker narrative copy)", (_name, factory) => {
    expect(renderedText(factory())).not.toMatch(/outplacement/i);
  });

  it("B2G language firewall holds on /act", () => {
    const text = renderedText(<MarketingAct />);
    expect(text).not.toMatch(/modern unemployment office/i);
    expect(text).not.toMatch(/guaranteed/i);
    expect(text).not.toMatch(/government-endorsed/i);
    expect(text).not.toContain("Official Alameda County program");
  });

  it.each([
    ...SWEPT_PAGES,
    ["MarketingEmployers", () => <MarketingEmployers />],
    ["MarketingAct", () => <MarketingAct />],
  ] as ReadonlyArray<[string, () => ReactElement]>)("%s contains no em dashes", (_name, factory) => {
    expect(renderedText(factory())).not.toContain("—");
  });
});
