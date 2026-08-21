import { expect, test, type Page } from "@playwright/test";

async function waitForHydration(page: Page) {
  await page.waitForFunction(() => {
    const tab = document.querySelector('[role="tab"]');
    return !!tab && Object.keys(tab).some((key) => key.startsWith("__reactFiber$"));
  });
}

test.describe("Marketing homepage", () => {
  test("renders the complete Paper journey and keeps the product scene interactive", async ({ page }) => {
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
    await expect(page.getByRole("heading", { name: /three jobs at once/i })).toBeVisible();
    await expect(page.getByRole("img", { name: /desk scene representing financial planning/i })).toBeVisible();
    await expect(page.getByRole("img", { name: /layered collage of the disconnected tools/i })).toBeVisible();
    await expect(page.getByLabel("An abstracted preview of Offboard onboarding")).toBeVisible();
    await expect(page.getByRole("heading", { name: /deserves attention before it becomes urgent/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /support you may qualify for/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /one connected system/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /your transition is yours/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /start free.*more support/i })).toBeVisible();

    await page.getByRole("link", { name: /see how offboard works/i }).first().click();
    await expect(page).toHaveURL(/#how-it-works$/);

    const stages = page.getByRole("tablist", { name: "Job search stages" });
    const interview = stages.getByRole("tab", { name: /interview/i });
    await interview.click();
    await expect(interview).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("heading", { name: /walk in knowing what to practice/i })).toBeVisible();
    await expect(page.getByRole("img", { name: /role-specific interview preparation/i })).toBeVisible();

    await expect(page.getByLabel("Illustrative California benefits preview")).toBeVisible();
    await expect(page.getByLabel("How information moves through Offboard")).toBeVisible();
    await expect(page.getByText("Is Offboard part of the government?")).toBeVisible();
    await expect.poll(() => consoleErrors).toEqual([]);
    expect(backendRequests).toEqual([]);
  });

  test("reflows without horizontal overflow on mobile", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await waitForHydration(page);

    await expect(page.getByRole("heading", { level: 1, name: /modern unemployment office/i })).toBeVisible();
    await expect(page.getByRole("img", { name: /woman at a desk by a window/i })).toBeVisible();
    await expect(page.getByRole("tablist", { name: "Job search stages" }).getByRole("tab")).toHaveCount(5);
    await expect.poll(async () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await expect.poll(() => consoleErrors).toEqual([]);
  });
});
