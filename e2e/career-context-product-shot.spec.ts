import { expect, test } from "@playwright/test";

test.describe("Career Context card grid", () => {
  test("shows both card groups in one responsive composition", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.goto("/career-context");

    const section = page.locator('.mh-context-preview');
    const figure = page.locator(".mh-context-product-shot");
    await expect(figure).toBeVisible();
    await expect(figure.locator("figcaption")).toHaveText("Illustrative example");
    await expect(section.getByRole("button")).toHaveCount(0);
    await expect(figure.locator("img")).toBeVisible();
    await expect(figure.locator("img")).toHaveJSProperty("complete", true);

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(figure.locator("img")).toBeVisible();
    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(pageWidth).toBeLessThanOrEqual(390);
    expect(errors).toEqual([]);
  });
});
