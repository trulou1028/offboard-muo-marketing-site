import { expect, test } from "@playwright/test";

test.describe("Offboard marketing site", () => {
  test("keeps the homepage focused and routes visitors to deeper pages", async ({ page }) => {
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
    await expect(page.getByRole("heading", { name: /three jobs at once/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /\$12,000/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /one place for the decisions/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /checked by people, never generated/i })).toBeVisible();
    await expect(page.getByRole("tablist", { name: "Job search stages" })).toHaveCount(0);

    await page.getByRole("link", { name: "How it works" }).first().click();
    await expect(page).toHaveURL(/\/how-it-works$/);
    await expect(page.getByRole("heading", { level: 1, name: /one plan that starts where you are/i })).toBeVisible();
    expect(backendRequests).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });

  test("gives how it works its five-step spine, toolkit, and LUMO", async ({ page }) => {
    const consoleErrors: string[] = [];
    const backendRequests: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("request", (request) => {
      if (/supabase\.co|api\.offboard\.co/i.test(request.url())) backendRequests.push(request.url());
    });

    await page.goto("/how-it-works");
    await expect(page.getByRole("heading", { name: /five steps from/i })).toBeVisible();
    await expect(page.getByText("Tell us where you are")).toBeVisible();
    await expect(page.getByRole("heading", { name: /tools didn't go anywhere/i })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "Job Packet" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "An AI guide that knows your actual situation." })).toBeVisible();
    await expect(page.getByText(/never invents a dollar figure/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Stop repeating your story to every new tool." })).toBeVisible();
    expect(backendRequests).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });

  test("publishes distinct pricing, company, and partner routes", async ({ page }) => {
    const routes = [
      ["/pricing", /start free\. upgrade when you need more support/i],
      ["/about", /built for the moment work stops making sense/i],
      ["/employers", /outplacement, modernized/i],
      ["/public-partners", /scattered information to a workable plan/i],
    ] as const;

    for (const [route, heading] of routes) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow, noarchive");
    }
  });

  test("keeps the header nav to four marketing links and demotes public partners", async ({ page }) => {
    await page.goto("/");
    const headerNav = page.getByRole("navigation", { name: "Marketing navigation" });
    await expect(headerNav.getByRole("link")).toHaveCount(4);
    await expect(headerNav.getByRole("link", { name: "For public partners" })).toHaveCount(0);

    const footerNav = page.getByRole("navigation", { name: "Footer navigation" });
    await expect(footerNav.getByRole("link", { name: "For public partners" })).toBeVisible();
    await expect(footerNav.getByRole("link", { name: "For employers" })).toBeVisible();
  });

  test("keeps the public-partners route live with a crosslink to employers", async ({ page }) => {
    await page.goto("/public-partners");
    await expect(page.getByRole("heading", { level: 1, name: /scattered information to a workable plan/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /see partner details on the employers page/i })).toHaveAttribute("href", "/employers");
  });

  test("reflows every route without horizontal overflow on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const route of ["/", "/how-it-works", "/pricing", "/about", "/employers", "/public-partners"]) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect.poll(async () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    }
  });
});
