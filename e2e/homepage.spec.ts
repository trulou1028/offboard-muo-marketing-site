import { expect, test, type Page } from "@playwright/test";

// Unlike the Vite original, Next server-renders this page: the tab buttons are
// in the HTML before React attaches its listeners, so a click landing in that
// window is silently dropped and the assertion after it can never pass. Wait
// for a fiber to appear on a tab before interacting.
async function waitForHydration(page: Page) {
  await page.waitForFunction(() => {
    const tab = document.querySelector('[role="tab"]');
    return !!tab && Object.keys(tab).some((key) => key.startsWith("__reactFiber$"));
  });
}

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
    await waitForHydration(page);

    await expect(page.getByRole("heading", { level: 1, name: /modern unemployment office/i })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow, noarchive");
    await expect(page.getByText("Our members come from teams at")).toBeVisible();
    await expect(page.getByText("Snowflake")).toBeVisible();

    await page.getByRole("link", { name: /see how it works/i }).click();
    await expect(page).toHaveURL(/#how-it-works$/);

    // The stage picker drives the abstract path card.
    const pathTabs = page.getByRole("tablist", { name: /choose a stage/i });
    await expect(pathTabs.getByRole("tab", { name: /protect the first week/i })).toBeVisible();
    await pathTabs.getByRole("tab", { name: /choose your path/i }).click();
    await expect(page.getByRole("heading", { name: "Which direction is mine?" })).toBeVisible();

    // The connected toolkit switches one product scene at a time.
    const toolkit = page.getByLabel("Connected job-search toolkit");
    await expect(toolkit.getByRole("img", { name: /your job packet/i })).toBeVisible();
    await expect(toolkit.getByText("LUMO keeps this role in context")).toBeVisible();
    await toolkit.getByRole("tab", { name: "Resumes" }).click();
    await expect(toolkit.getByRole("img", { name: /review the northstar version/i })).toBeVisible();
    await expect(toolkit.getByText(/strongest evidence is the system work/i)).toBeVisible();
    await expect(page.getByLabel("What stays private and who can see it").getByText("Only you.")).toBeVisible();

    // Conversion-architecture sections all present.
    await expect(page.getByText("5,000+")).toBeVisible();
    await expect(page.getByText("An illustrative member quote, not a testimonial")).toBeVisible();
    await expect(page.getByRole("table", { name: /on your own.*point solutions.*offboard/i })).toBeVisible();
    await expect(page.getByText("Can I cancel anytime?")).toBeVisible();
    await expect(page.getByLabel("Life after a layoff, in real moments").locator("img").first()).toHaveAttribute("loading", "lazy");

    // The dark editorial design holds a closed four-size type scale (16/24/48/64
    // — body, pull-quote/panel display, section, hero), 16px floor. Enforced by
    // the same `* { font-size: … !important }` mechanism that held the old
    // three-size scale, so this still catches drift.
    const desktopFontSizes = await page.locator(".marketing-homepage").evaluate((root) => {
      const elements = [root, ...root.querySelectorAll("*")];
      return [...new Set(elements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize)))].sort((a, b) => a - b);
    });
    expect(desktopFontSizes.length).toBeLessThanOrEqual(4);
    expect(desktopFontSizes[0]).toBeGreaterThanOrEqual(16);

    // The "possible match" disclosure still opens.
    await page.getByRole("button", { name: /what.*possible match.*means/i }).click();
    await expect(page.getByRole("status")).toContainText(/agency decides eligibility and funding/i);

    await expect.poll(() => consoleErrors).toEqual([]);
    expect(backendRequests).toEqual([]);
  });

  test("reflows without horizontal overflow on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await waitForHydration(page);

    await expect(page.getByRole("heading", { level: 1, name: /modern unemployment office/i })).toBeVisible();
    await expect(page.getByRole("img", { name: /at her desk by the window.*after a job loss/i })).toBeVisible();
    await expect(page.getByLabel("Illustrative California benefits summary")).toBeVisible();

    const toolkit = page.getByLabel("Connected job-search toolkit");
    await expect(toolkit).toBeVisible();
    await expect(toolkit.getByRole("tablist", { name: /choose a toolkit category/i }).getByRole("tab")).toHaveCount(4);
    await toolkit.getByRole("tab", { name: "Interviews" }).click();
    await expect(toolkit.getByRole("img", { name: /northstar interview/i })).toBeVisible();

    const mobileFontSizes = await page.locator(".marketing-homepage").evaluate((root) => {
      const elements = [root, ...root.querySelectorAll("*")];
      return [...new Set(elements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize)))].sort((a, b) => a - b);
    });
    expect(mobileFontSizes.length).toBeLessThanOrEqual(4);
    expect(mobileFontSizes[0]).toBeGreaterThanOrEqual(16);

    // The comparison table is the widest content on the page; it must scroll
    // inside its own wrapper, never the page.
    await expect(page.getByRole("table", { name: /on your own.*point solutions.*offboard/i })).toBeVisible();
    await expect.poll(async () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  });
});
