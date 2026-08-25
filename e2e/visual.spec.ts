import { expect, test } from "@playwright/test";

// Screenshot baseline for the whole marketing surface. Plan 012's whole
// premise: 013/014 make broad visual changes to this stylesheet, and
// reviewing "did anything move" by eyeballing every page doesn't scale.
// This spec is the review artifact — a green diff (or a deliberately
// regenerated baseline) is what "reviewed" means for a CSS-only PR.
//
// Baselines are rendered on the machine that generated them (see the repo's
// plan doc / handoff notes for which platform that was); CI runs ubuntu.
// Cross-platform font rasterization can differ enough to blow past a tight
// pixel-diff threshold even with no real change, and that risk is NOT
// verified from this environment (no way to run the CI job here).

const ROUTES = [
  "/",
  "/how-it-works",
  "/pricing",
  "/about",
  "/employers",
  "/public-partners",
  "/act",
  "/resources",
  "/resources/first-week-after-a-layoff",
  "/intake",
  "/intake/confirmed",
] as const;

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
] as const;

test.describe("Marketing site visual baseline", () => {
  // Baselines are committed per-platform (…-chromium-darwin.png). CI runs
  // ubuntu, where Playwright would look for …-chromium-linux.png, find nothing
  // and fail. The review artifact these baselines exist for is the committed
  // before/after PNG diff in a PR — which is produced locally by whoever runs
  // the visual suite — so gating CI off costs nothing today.
  // To enable CI enforcement later: generate linux baselines in the Playwright
  // container (mcr.microsoft.com/playwright:v<version>-noble) and commit those
  // alongside the darwin ones; both platforms can coexist in the snapshot dir.
  test.skip(!!process.env.CI, "Visual baselines are darwin-specific; run locally with npm run test:visual");

  for (const route of ROUTES) {
    for (const viewport of VIEWPORTS) {
      const routeLabel = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");

      test(`${routeLabel} @ ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(route);
        await page.evaluate(() => document.fonts.ready);
        await page.waitForLoadState("networkidle");

        await expect(page).toHaveScreenshot(`${routeLabel}-${viewport.name}.png`, {
          fullPage: true,
          maxDiffPixelRatio: 0.01,
          animations: "disabled",
        });
      });
    }
  }
});

// Plan 013: the header, hero, and sections previously computed their
// horizontal gutters from two different container-width formulas
// (1384px vs 1368px), so the header sat 7-8px left of section content at
// every desktop width. This pins the fix as a functional assertion —
// unlike the screenshot suite above, it needs no platform-specific
// baseline, so it runs in CI too.
test.describe("Marketing site container alignment", () => {
  test("header brand and first section share the same left edge @ 1440px", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const headerBrandLink = page.locator(".mh-site-header > a");
    const firstSection = page.locator("main .mh-section").first();

    const headerBox = await headerBrandLink.boundingBox();
    expect(headerBox).not.toBeNull();

    // .mh-section is a full-bleed block (its horizontal inset comes from
    // padding, not margin), so its own getBoundingClientRect().left is
    // always 0 — not a proxy for where its content visually starts. The
    // content's left edge is rect.left + the computed padding-left.
    const sectionContentLeft = await firstSection.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const paddingLeft = parseFloat(getComputedStyle(el).paddingLeft);
      return rect.left + paddingLeft;
    });

    expect(headerBox!.x).toBe(sectionContentLeft);
  });
});
