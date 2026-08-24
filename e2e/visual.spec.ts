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
