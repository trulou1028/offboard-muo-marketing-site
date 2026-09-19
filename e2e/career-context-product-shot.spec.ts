import { expect, test } from "@playwright/test";

test.describe("Career Context product illustration", () => {
  test("shows one static illustration with a responsive composition", async ({ page }) => {
    await page.goto("/career-context");

    const section = page.locator('section[aria-labelledby="inout-title"]');
    const figure = page.locator(".mh-context-product-shot");
    await expect(figure).toBeVisible();
    await expect(figure.locator("figcaption")).toHaveText("Illustrative view of the information that forms a Career Context.");
    await expect(section.getByRole("button")).toHaveCount(0);
    await expect(figure.locator("img.is-desktop")).toBeVisible();
    await expect(figure.locator("img.is-mobile")).toBeHidden();

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(figure.locator("img.is-desktop")).toBeHidden();
    await expect(figure.locator("img.is-mobile")).toBeVisible();
    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(pageWidth).toBeLessThanOrEqual(390);
  });
});
