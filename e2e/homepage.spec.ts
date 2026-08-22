import { expect, test, type Page } from "@playwright/test";

async function waitForSearchHydration(page: Page) {
  await page.waitForFunction(() => {
    const tab = document.querySelector('[role="tab"]');
    return !!tab && Object.keys(tab).some((key) => key.startsWith("__reactFiber$"));
  });
}

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
    await expect(page.getByRole("heading", { level: 1, name: /start with your situation/i })).toBeVisible();
    expect(backendRequests).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });

  test("keeps the complete connected product journey interactive", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    await page.goto("/how-it-works");
    await waitForSearchHydration(page);
    await expect(page.getByRole("heading", { name: /every part of unemployment lives somewhere else/i })).toBeVisible();
    await expect(page.getByLabel("An abstracted preview of Offboard onboarding")).toBeVisible();
    await expect(page.getByLabel("Illustrative California benefits preview")).toBeVisible();

    const stages = page.getByRole("tablist", { name: "Job search stages" });
    const interview = stages.getByRole("tab", { name: /interview/i });
    await interview.click();
    await expect(interview).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("heading", { name: /walk in knowing what to practice/i })).toBeVisible();
    await expect(page.getByRole("img", { name: /role-specific interview preparation/i })).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });

  test("publishes distinct pricing, company, and partner routes", async ({ page }) => {
    const routes = [
      ["/pricing", /begin with a plan/i],
      ["/about", /alone with a search box/i],
      ["/employers", /clear place to start after separation/i],
      ["/public-partners", /scattered information to a workable plan/i],
    ] as const;

    for (const [route, heading] of routes) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow, noarchive");
    }
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
