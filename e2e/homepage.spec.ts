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
    // Homepage v2 (plan 022): Career Context narrative, COPY.md § 1.
    await expect(page.getByRole("heading", { level: 1, name: /modern unemployment office/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /your job search goes wherever you do/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /one place that remembers your entire job search/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /losing your job creates more than one problem/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /an ai guide that already knows/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /you don't need another place to start over/i })).toBeVisible();
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

  test("keeps the header nav to six marketing links and demotes public partners", async ({ page }) => {
    await page.goto("/");
    const headerNav = page.getByRole("navigation", { name: "Marketing navigation" });
    await expect(headerNav.getByRole("link")).toHaveCount(6);
    await expect(headerNav.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    await expect(headerNav.getByRole("link", { name: "Guides" })).toHaveAttribute("href", "/resources");
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

    for (const route of ["/", "/how-it-works", "/pricing", "/resources", "/resources/first-week-after-a-layoff", "/about", "/employers", "/public-partners", "/act"]) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect.poll(async () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    }
  });

  test("publishes a real resources library with local article routes", async ({ page }) => {
    const consoleErrors: string[] = [];
    const backendRequests: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("request", (request) => {
      if (/supabase\.co|api\.offboard\.co/i.test(request.url())) backendRequests.push(request.url());
    });

    await page.goto("/resources");
    await expect(page.getByRole("heading", { level: 1, name: "Guides & resources" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "What to do in your first week after a layoff" })).toBeVisible();

    await page.getByRole("link", { name: /read the guide/i }).first().click();
    await expect(page).toHaveURL(/\/resources\/first-week-after-a-layoff$/);
    await expect(page.getByRole("heading", { level: 1, name: "What to do in your first week after a layoff" })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow, noarchive");
    expect(backendRequests).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });

  test("redirects retired essay and policy slugs to the resources index with a permanent redirect", async ({
    page,
  }) => {
    // Plan 016 moved this from a next.config.ts-level 301 (the config no
    // longer lists these slugs at all) to a route-level permanentRedirect()
    // call in src/app/resources/[slug]/page.tsx, driven by the post's
    // `status = 'retired'` (docs/cms-architecture.md "Decisions" #3). This
    // asserts the real mechanism — a 308 issued by the route after a status
    // lookup — rather than the config file, which no longer does this.
    for (const slug of ["this-is-not-charity-it-is-reconstruction", "alameda-d2-safety-net-transparency"]) {
      const response = await page.goto(`/resources/${slug}`);
      await expect(page).toHaveURL(/\/resources$/);

      const redirectedFrom = response?.request().redirectedFrom();
      expect(redirectedFrom, `expected a redirect chain for /resources/${slug}`).toBeTruthy();
      const redirectResponse = await redirectedFrom?.response();
      expect(redirectResponse?.status(), `expected a permanent (308) redirect for /resources/${slug}`).toBe(308);
    }
  });

  test("redirects legacy production URLs to their new destinations", async ({ page }) => {
    await page.goto("/product");
    await expect(page).toHaveURL(/\/how-it-works$/);

    await page.goto("/faq");
    await expect(page).toHaveURL(/\/how-it-works#faq$/);

    await page.goto("/community");
    await expect(page).toHaveURL(/\/#community$/);

    await page.goto("/tools/anything");
    await expect(page).toHaveURL(/\/resources$/);
  });

  test("keeps /intake a live route, never a redirect", async ({ page }) => {
    const response = await page.goto("/intake");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/intake$/);
  });

  test("keeps /act a live route, never a redirect", async ({ page }) => {
    const response = await page.goto("/act");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/act$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

// Plan 018 phase 4. The focus ring used to be a flat white on every surface:
// against paper (#f7f4ec) that measures about 1.06:1, so a keyboard user got
// no visible indicator across the light two-thirds of the site. WCAG 2.1
// SC 1.4.11 wants 3:1 for a focus indicator.
//
// The fix is the inherited --mh-focus-ring token, so that is what this asserts.
// Reading `outlineColor` back off a focused element is NOT reliable here -- it
// reports white even when the ring paints ink, which is exactly how the
// original defect stayed invisible. The token plus the single rule that
// consumes it is the honest seam, and the contrast maths below is real.
test.describe("focus indicator contrast", () => {

  function luminance(hex: string): number {
    const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    const linear = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  }

  function contrast(a: string, b: string): number {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
  }

  test("every focusable resolves a ring that clears 3:1 on its own surface", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.waitForLoadState("networkidle");

    const samples = await page.evaluate(() => {
      function surfaceOf(node: Element | null): string {
        while (node) {
          const bg = getComputedStyle(node).backgroundColor;
          if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
          node = node.parentElement;
        }
        return "none";
      }
      return Array.from(document.querySelectorAll("main a, main button, header a, header summary")).map(
        (el) => ({
          ring: getComputedStyle(el).getPropertyValue("--mh-focus-ring").trim().toLowerCase(),
          surface: surfaceOf(el.parentElement),
        }),
      );
    });

    expect(samples.length).toBeGreaterThan(15);

    // The two documented ring values are read from the page rather than
    // hardcoded: the homepage runs the Civic Modern palette while the route
    // pages are still on the legacy one (DESIGN.md "Transition state"), so a
    // literal hex here would only ever be right for one of them.
    const palette = await page.evaluate(() => {
      const style = getComputedStyle(document.querySelector(".marketing-homepage")!);
      return {
        ink: style.getPropertyValue("--mh-ink").trim().toLowerCase(),
        paper: style.getPropertyValue("--mh-paper").trim().toLowerCase(),
      };
    });
    expect(palette.ink).toMatch(/^#[0-9a-f]{6}$/);
    expect(palette.paper).toMatch(/^#[0-9a-f]{6}$/);

    // Every control resolves the token to one of the two documented values,
    // and never inherits an empty string (which would paint currentColor).
    for (const { ring } of samples) {
      expect([palette.ink, palette.paper]).toContain(ring);
    }

    // Both values are worth having: a page that resolved ink everywhere would
    // pass a naive "is it set" check while leaving the dark bands unreadable.
    const distinct = new Set(samples.map((s) => s.ring));
    expect(distinct.size).toBe(2);

    // The ring must clear 3:1 against the surface it is actually drawn on.
    for (const { ring, surface } of samples) {
      const match = surface.match(/\d+/g);
      if (!match) continue;
      const [r, g, b] = match.map(Number);
      const surfaceHex = `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
      expect(contrast(ring, surfaceHex)).toBeGreaterThanOrEqual(3);
    }
  });
});
