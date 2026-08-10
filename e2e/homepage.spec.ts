import { expect, test } from "@playwright/test";

// Ported from the app repo's e2e/public-pages.spec.ts — the two homepage tests.
// Runs against the production server (see playwright.config.ts webServer): the
// zero-console-error assertion is meaningless against dev-mode HMR noise.
test.describe("Marketing homepage", () => {
  test("is public, interactive, and backend-free", async ({ page }) => {
    const consoleErrors: string[] = [];
    const backendRequests: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("request", (request) => {
      if (/supabase\.co|api\.offboard\.co/i.test(request.url())) backendRequests.push(request.url());
    });

    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1, name: /modern unemployment office/i })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow, noarchive");
    await expect(page.getByText("Our members come from teams at")).toBeVisible();
    await expect(page.getByRole("img", { name: "Snowflake" })).toBeVisible();

    await page.getByRole("link", { name: /see how it works/i }).click();
    await expect(page).toHaveURL(/#how-it-works$/);

    // The stage picker drives the abstract path card.
    const pathTabs = page.getByRole("tablist", { name: /choose a stage/i });
    await expect(pathTabs.getByRole("tab", { name: /protect the first week/i })).toBeVisible();
    await pathTabs.getByRole("tab", { name: /choose your path/i }).click();
    await expect(page.getByRole("heading", { name: "Which direction is mine?" })).toBeVisible();

    // The toolkit bento and the privacy answers both render.
    const bento = page.getByLabel("What Offboard gives you for the job search");
    await expect(bento.getByRole("heading", { name: "One link becomes an application" })).toBeVisible();
    await expect(bento.getByRole("heading", { name: "Ask LUMO" })).toBeVisible();
    await expect(page.getByLabel("What stays private and who can see it").getByText("Only you.")).toBeVisible();

    // The "possible match" disclosure still opens.
    await page.getByRole("button", { name: /what.*possible match.*means/i }).click();
    await expect(page.getByRole("status")).toContainText(/agency decides eligibility and funding/i);

    await expect.poll(() => consoleErrors).toEqual([]);
    expect(backendRequests).toEqual([]);
  });

  test("reflows without horizontal overflow on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1, name: /modern unemployment office/i })).toBeVisible();
    await expect(page.getByRole("img", { name: /beginning the next chapter after a job loss/i })).toBeVisible();
    await expect(page.getByLabel("Illustrative California benefits summary")).toBeVisible();
    await expect(page.getByLabel("What Offboard gives you for the job search")).toBeVisible();
    await expect.poll(async () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  });
});
