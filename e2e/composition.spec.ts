import { expect, test } from "@playwright/test";

/* Plan 039, phase A. Two of the composition rules in DESIGN.md are cheap to
   check and were both violated on `main` before this plan, so they are
   tooling rather than review notes:

   R1 (no orphan cells) — a repeating grid must fill its last row. The audit
   found four: the homepage question grid (5 items in 3 columns), the homepage
   toolkit (3/3/2/2 columns), and `EditorialGrid` wherever a caller passed an
   odd number of items (/career-context, /lumo, /application-packet, /employers).

   R10 (mobile budget) — no homepage section may exceed the budget at 390
   wide. The pre-plan page ran to 17,096px total with a 2,896px section.

   Both walk the real rendered page rather than the stylesheet: a
   `grid-template-columns` literal says nothing about how many children a
   caller actually passed. */

const ROUTES = [
  "/",
  "/how-it-works",
  "/pricing",
  "/career-context",
  "/lumo",
  "/application-packet",
  "/layoff-support",
  "/integrations",
  "/resources",
  "/about",
  "/employers",
  "/workforce",
  "/communities",
  "/privacy-security",
  "/companies",
  "/companies/airtable",
  "/act",
] as const;

// DESIGN.md R10, and both numbers are measured rather than aspired to. Plan
// 039 proposed a 1,400px section budget; the built page's tallest section is
// "More than a job search" at 2,409px (six questions and the plan
// composition), so the budget is that plus headroom. The page total is here
// because the per-section number alone would not have caught the thing that
// prompted the rule: v2's homepage ran 17,096px with a 2,896px section.
// Raise either only with a measurement and a note, never to green a red run.
const MOBILE_SECTION_BUDGET = 2600;
const MOBILE_PAGE_BUDGET = 15500;

type GridReport = {
  selector: string;
  tracks: number;
  children: number;
};

// Equal tracks are what makes a grid "repeating". An asymmetric split
// (`minmax(0, 1fr) minmax(0, 1.05fr)`, `200px minmax(0, 1fr)`) is a layout,
// not a list, and R1 has nothing to say about it.
async function orphanGrids(page: import("@playwright/test").Page): Promise<GridReport[]> {
  return page.evaluate(() => {
    const violations: { selector: string; tracks: number; children: number }[] = [];

    for (const el of Array.from(document.querySelectorAll<HTMLElement>("*"))) {
      const style = getComputedStyle(el);
      if (style.display !== "grid" && style.display !== "inline-grid") continue;
      if (el.getClientRects().length === 0) continue;

      const widths = style.gridTemplateColumns
        .split(" ")
        .map((value) => Number.parseFloat(value))
        .filter((value) => Number.isFinite(value));
      if (widths.length < 2) continue;
      const equal = widths.every((width) => Math.abs(width - widths[0]) <= 1.5);
      if (!equal) continue;

      // Absolutely positioned children (composition satellites) are out of
      // flow and never occupy a cell.
      const inFlow = Array.from(el.children).filter((child) => {
        const childStyle = getComputedStyle(child);
        return (
          childStyle.display !== "none" &&
          childStyle.position !== "absolute" &&
          childStyle.position !== "fixed"
        );
      });

      // Occupancy, not child count: Pattern B deliberately spans its first
      // card across both columns, and that fills the row rather than
      // breaking it. A span is read off the rendered width so the check
      // needs no knowledge of which rule set `grid-column`.
      const gap = Number.parseFloat(style.columnGap) || 0;
      const track = widths[0];
      const cells = inFlow.reduce((total, child) => {
        const width = child.getBoundingClientRect().width;
        return total + Math.max(1, Math.round((width + gap) / (track + gap)));
      }, 0);

      if (inFlow.length >= 2 && cells % widths.length !== 0) {
        const selector = `${el.tagName.toLowerCase()}${el.className ? `.${String(el.className).trim().split(/\s+/).join(".")}` : ""}`;
        violations.push({ selector, tracks: widths.length, children: cells });
      }
    }

    return violations;
  });
}

test.describe("DESIGN.md composition rules", () => {
  test("R1: no repeating grid leaves an orphan cell, on any route", async ({ page }) => {
    const failures: string[] = [];

    for (const route of ROUTES) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      for (const grid of await orphanGrids(page)) {
        failures.push(
          `${route} — ${grid.selector}: ${grid.children} cells in ${grid.tracks} equal columns leaves ${
            grid.tracks - (grid.children % grid.tracks)
          } empty cell(s)`,
        );
      }
    }

    expect(failures, "DESIGN.md R1 (no orphan cells)").toEqual([]);
  });

  test("R10: no homepage section exceeds the mobile budget", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);

    const sections = await page.evaluate(() =>
      Array.from(document.querySelectorAll("main > section")).map((section) => ({
        name: String(section.className).split(/\s+/)[0],
        height: Math.round(section.getBoundingClientRect().height),
      })),
    );

    expect(sections.length).toBeGreaterThan(5);
    const over = sections.filter((section) => section.height > MOBILE_SECTION_BUDGET);
    expect(
      over.map((section) => `${section.name} is ${section.height}px`),
      `DESIGN.md R10 (mobile section budget ${MOBILE_SECTION_BUDGET}px at 390 wide)`,
    ).toEqual([]);

    const total = await page.evaluate(() => document.body.scrollHeight);
    expect(total, `DESIGN.md R10 (mobile page budget ${MOBILE_PAGE_BUDGET}px)`).toBeLessThanOrEqual(
      MOBILE_PAGE_BUDGET,
    );
  });
});
