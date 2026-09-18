import { expect, test } from "@playwright/test";

test.describe("Career Context example", () => {
  test("switches among grounded tasks without leaving the example", async ({ page }) => {
    await page.goto("/career-context");

    const output = page.locator("#career-context-example-output");
    await expect(output).toContainText("reducing average onboarding time from 14 to 10 days");

    const interview = page.getByRole("button", { name: "Interview preparation" });
    await interview.click();
    await expect(interview).toBeFocused();
    await expect(interview).toHaveAttribute("aria-pressed", "true");
    await expect(output).toContainText("Tell me about a time you got a stalled customer rollout moving again.");

    await page.getByRole("button", { name: "Compare an opportunity" }).click();
    await expect(output).toContainText("The ownership of adoption matches Alex's goal for the next role.");
    await expect(page.locator(".mh-context-source-facts.is-desktop > .is-relevant")).toHaveCount(2);
  });

  test("keeps the phone layout readable with the complete record in a disclosure", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/career-context");

    const disclosure = page.getByText("View the full fictional record");
    await expect(disclosure).toBeVisible();
    await disclosure.click();
    await expect(page.locator(".mh-context-source-mobile details")).toHaveAttribute("open", "");

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});

test.describe("Career Context example without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("keeps the initial source and output readable", async ({ page }) => {
    await page.goto("/career-context");

    await expect(page.getByText("Fictional example. Explore how the same context can inform different tasks.")).toBeVisible();
    await expect(page.getByText("Led customer onboarding and coordinated support handoffs, reducing average onboarding time from 14 to 10 days.")).toBeVisible();
    await expect(page.getByRole("button", { name: "Tailored resume" })).toHaveCount(0);
  });
});

test.describe("Career Context example motion", () => {
  test.use({ contextOptions: { reducedMotion: "no-preference" } });

  test("animates a change and honors a reduced-motion preference change", async ({ page }) => {
    await page.addInitScript(() => {
      const state = window as Window & { __careerContextAnimationCount?: number };
      state.__careerContextAnimationCount = 0;
      const originalAnimate = Element.prototype.animate;
      Element.prototype.animate = function (...args) {
        if ((this as Element).id === "career-context-example-output") {
          state.__careerContextAnimationCount = (state.__careerContextAnimationCount ?? 0) + 1;
        }
        return originalAnimate.apply(this, args);
      };
    });
    await page.goto("/career-context");

    await page.getByRole("button", { name: "Interview preparation" }).click();
    await expect.poll(() => page.evaluate(() => (window as Window & { __careerContextAnimationCount?: number }).__careerContextAnimationCount ?? 0)).toBeGreaterThan(0);
    const animationCount = await page.evaluate(() => (window as Window & { __careerContextAnimationCount?: number }).__careerContextAnimationCount ?? 0);

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.getByRole("button", { name: "Compare an opportunity" }).click();
    await page.waitForTimeout(250);
    await expect(page.evaluate(() => (window as Window & { __careerContextAnimationCount?: number }).__careerContextAnimationCount ?? 0)).resolves.toBe(animationCount);
  });
});
