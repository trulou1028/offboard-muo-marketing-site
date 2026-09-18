import { expect, test } from "@playwright/test";

test.describe("desktop navigation motion", () => {
  test.use({ contextOptions: { reducedMotion: "no-preference" } });

  test("animates one active panel and makes a departing panel inert", async ({ page }) => {
    await page.addInitScript(() => {
      const originalAnimate = Element.prototype.animate;
      const calls: Array<{
        keyframes: Keyframe[] | PropertyIndexedKeyframes | null;
        options?: number | KeyframeAnimationOptions;
      }> = [];
      Object.defineProperty(window, "__navAnimationCalls", { value: calls });
      Element.prototype.animate = function animate(keyframes, options) {
        if ((this as HTMLElement).classList?.contains("mh-nav-panel")) {
          calls.push({ keyframes, options });
        }
        return originalAnimate.call(this, keyframes, options);
      };
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Marketing navigation" });
    const product = nav.getByRole("button", { name: "Product" });
    const resources = nav.getByRole("button", { name: "Resources" });

    await product.click();
    const productPanel = page.locator(
      ".mh-nav-panel:not([hidden]):not([aria-hidden='true'])",
    );
    await expect(productPanel).toBeVisible();

    await expect
      .poll(() =>
        page.evaluate(() =>
          (
            window as typeof window & {
              __navAnimationCalls: Array<{
                keyframes: Keyframe[] | PropertyIndexedKeyframes | null;
              }>;
            }
          ).__navAnimationCalls.length,
        ),
      )
      .toBeGreaterThan(0);
    const animationCalls = await page.evaluate(
      () =>
        (
          window as typeof window & {
            __navAnimationCalls: Array<{
              keyframes: Keyframe[] | PropertyIndexedKeyframes | null;
              options?: number | KeyframeAnimationOptions;
            }>;
          }
        ).__navAnimationCalls,
    );
    expect(JSON.stringify(animationCalls)).toContain("translateY(0px)");
    await expect(productPanel).toHaveCSS("opacity", "1");

    await resources.click();
    await expect(product).toHaveAttribute("aria-expanded", "false");
    await expect(resources).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.locator(".mh-nav-panel:not([hidden]):not([aria-hidden='true'])"),
    ).toHaveCount(1);

    const departingPanels = page.locator(".mh-nav-panel[aria-hidden='true']");
    if (await departingPanels.count()) {
      expect(await departingPanels.evaluateAll((panels) => panels.every((panel) => (panel as HTMLElement).inert))).toBe(true);
    }
    await expect(page.locator(".mh-nav-panel:not([hidden])")).toHaveCount(1);

    await page.keyboard.press("Escape");
    await expect(resources).toHaveAttribute("aria-expanded", "false");
    await expect(resources).toBeFocused();
    await expect(
      page.locator(".mh-nav-panel:not([hidden]):not([aria-hidden='true'])"),
    ).toHaveCount(0);
  });
});

test.describe("reduced-motion navigation", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("opens without spatial movement and remains fully operable", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Marketing navigation" });
    const product = nav.getByRole("button", { name: "Product" });
    await product.click();

    const panel = page.locator(
      ".mh-nav-panel:not([hidden]):not([aria-hidden='true'])",
    );
    await expect(panel).toBeVisible();
    await expect(panel).toHaveCSS("transform", "none");
    await expect(panel.getByRole("link", { name: /Career Context/ })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(product).toBeFocused();
    await expect(
      page.locator(".mh-nav-panel:not([hidden]):not([aria-hidden='true'])"),
    ).toHaveCount(0);
  });
});
