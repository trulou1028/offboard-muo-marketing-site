import { readFileSync } from "node:fs";
import path from "node:path";
import type { ReactElement } from "react";

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import MarketingHome from "./MarketingHome";
import {
  MarketingAbout,
  MarketingAct,
  MarketingEmployers,
  MarketingHowItWorks,
  MarketingPricing,
  MarketingPublicPartners,
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

  it("CalJOBS training extension example: $12,000 and week 16 appear in the ledger and on the homepage", () => {
    const row = ledgerRow("CalJOBS training extension example");
    expect(row).toContain("$12,000");
    expect(row).toContain("week 16");
    const text = renderedText(<MarketingHome />);
    expect(text).toContain("$12,000");
    expect(text).toContain("week 16");
  });

  it("Job centers: '2,000+ job centers' appears in the ledger and on the homepage", () => {
    const row = ledgerRow("Job centers");
    expect(row).toContain("2,000+ job centers");
    expect(renderedText(<MarketingHome />)).toContain("2,000+ job centers");
  });

  it("State-approved training programs (CA): 4,000+ appears in the ledger and on the homepage", () => {
    const row = ledgerRow("State-approved training programs (CA)");
    expect(row).toContain("4,000+");
    expect(renderedText(<MarketingHome />)).toContain("4,000+");
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

const SWEPT_PAGES: ReadonlyArray<[string, () => ReactElement]> = [
  ["MarketingHome", () => <MarketingHome />],
  ["MarketingHowItWorks", () => <MarketingHowItWorks />],
  ["MarketingPricing", () => <MarketingPricing />],
  ["MarketingAbout", () => <MarketingAbout />],
  ["MarketingResources", () => <MarketingResources />],
  ["MarketingPublicPartners", () => <MarketingPublicPartners />],
];

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
    ["MarketingAbout", () => <MarketingAbout />],
    ["MarketingAct", () => <MarketingAct />],
    ["MarketingResources", () => <MarketingResources />],
    ["MarketingPublicPartners", () => <MarketingPublicPartners />],
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
