import { expect, test } from "@playwright/test";

// The /intake form submits through a same-origin Next.js server action
// (POST to the current page URL), never a browser-visible fetch to
// Supabase or Resend. This suite proves that: it intercepts any request to
// either provider's domain and fails the test if one ever fires, then
// drives the whole form through the graceful "keys not configured" path
// that this environment's env vars produce (see plans/010-intake-form-port.md
// "Key availability" — SUPABASE_SERVICE_ROLE_KEY and RESEND_API_KEY are not
// present here, on purpose).

test.describe("Intake form", () => {
  test("renders all four sections with field copy from the source form", async ({ page }) => {
    const externalRequests: string[] = [];
    page.on("request", (request) => {
      if (/supabase\.co|resend\.com/i.test(request.url())) externalRequests.push(request.url());
    });

    await page.goto("/intake");

    await expect(page.getByRole("heading", { level: 1, name: /tell us where you're landing/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "The basics" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "The offboarding story" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "What you're actually looking for" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "The fun part" })).toBeVisible();
    await expect(page.getByText("Pick your current spirit animal")).toBeVisible();
    await expect(page.getByText(/golden retriever/i)).toBeVisible();

    expect(externalRequests).toEqual([]);
  });

  test("blocks submission with client-side validation until every required field is filled", async ({ page }) => {
    await page.goto("/intake");
    await page.getByRole("button", { name: /send it, our team will reach out/i }).click();
    await expect(page.getByText("Required").first()).toBeVisible();
  });

  test("fills and submits the form without ever contacting Supabase or Resend from the browser", async ({
    page,
  }) => {
    const externalRequests: string[] = [];
    page.on("request", (request) => {
      if (/supabase\.co|resend\.com/i.test(request.url())) externalRequests.push(request.url());
    });

    await page.goto("/intake");

    await page.getByLabel(/what's your name\?/i).fill("Test Executor");
    await page.getByLabel(/what's your email\?/i).fill("test-executor-010@example.com");
    await page.getByLabel(/most recent job title/i).fill("QA Lead");
    await page.getByLabel(/what industry were you in\?/i).fill("Software");
    await page.getByText("Honestly not sure yet").click();

    await page.getByText("1 to 3 months. I've processed it and I'm ready to move").click();
    await page.getByText("Zoom call with my camera on and theirs off").click();
    await page.getByRole("button", { name: "3", exact: true }).click();

    await page.getByText("Help with my job search strategy").click();
    await page.getByLabel(/what do people always end up coming to you for/i).fill("Debugging flaky tests");
    await page.getByLabel(/wish someone would just help you figure out/i).fill("Which roles are worth applying to");

    await page.getByText(/cat\. selective/i).click();

    const submit = page.getByRole("button", { name: /send it, our team will reach out/i });
    await submit.click();

    // In this environment SUPABASE_SERVICE_ROLE_KEY and RESEND_API_KEY are
    // absent, so the server action degrades gracefully instead of reaching
    // either provider: the form surfaces the try-again error inline.
    await expect(page.locator(".mh-intake-submit-error")).toContainText(/something went wrong/i);

    expect(externalRequests).toEqual([]);
  });
});
