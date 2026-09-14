import { expect, test } from "@playwright/test";

import { DEFERRED_ROBOTS, DEFERRED_ROUTES } from "../src/lib/launch";

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
    // Homepage v3 (plan 039): the Career Context narrative as three numbered
    // steps, COPY.md § 1.
    await expect(page.getByRole("heading", { level: 1, name: /modern unemployment office/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "How Offboard works." })).toBeVisible();
    await expect(page.getByRole("heading", { name: /one place that remembers your career/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /ask anywhere\. the answer is about you/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "The tools you run your search with." })).toBeVisible();

    // The six-question disclosure list left this band on 2026-09-08 (owner):
    // the split above it already carries the step. The route FAQs still use
    // the same component, so the pattern is covered by those specs.
    await expect(page.locator(".mh-morethan details")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /losing your job creates more than one problem/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /you don't need another place to start over/i })).toBeVisible();
    await expect(page.getByRole("tablist", { name: "Job search stages" })).toHaveCount(0);

    // Each step scrolls to the section that expands it.
    await page.getByRole("link", { name: /see the connection/i }).click();
    await expect(page).toHaveURL(/#connect$/);
    await expect(page.getByRole("heading", { name: /ask anywhere/i })).toBeInViewport();
    await page.goto("/");

    // Plan 045: /how-it-works is deferred, so the hero's secondary CTA
    // scrolls to the four-step strip instead of leaving the page.
    await page.getByRole("link", { name: "See how it works" }).click();
    await expect(page).toHaveURL(/#how-it-works$/);
    await expect(page.getByRole("heading", { name: "How Offboard works." })).toBeInViewport();
    expect(backendRequests).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });

  test("gives how it works the homepage's four steps, toolkit, and Lumo", async ({ page }) => {
    const consoleErrors: string[] = [];
    const backendRequests: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("request", (request) => {
      if (/supabase\.co|api\.offboard\.co/i.test(request.url())) backendRequests.push(request.url());
    });

    await page.goto("/how-it-works");
    await expect(page.getByRole("heading", { level: 1, name: "One system that starts where you are." })).toBeVisible();
    for (const kicker of ["Step 1 · Build your Career Context", "Step 2 · Talk with Lumo", "Step 3 · Run your search", "Step 4 · Follow your layoff plan"]) {
      await expect(page.getByText(kicker, { exact: true })).toBeVisible();
    }
    await expect(page.getByRole("heading", { name: /see your money clearly, then claim what exists/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /tools didn't go anywhere/i })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "Application Packet" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "An AI guide that knows your actual situation." })).toBeVisible();
    await expect(page.getByText(/never invents a dollar figure/i)).toBeVisible();
    await expect(page.getByText("ChatGPT and Claude connections are in beta.")).toBeVisible();
    expect(backendRequests).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });

  test("publishes distinct pricing, company, and partner routes", async ({ page }) => {
    const routes = [
      ["/pricing", /start free\. upgrade when you need more support/i],
      ["/about", /built for the moment work stops making sense/i],
      ["/employers", /outplacement, modernized/i],
      ["/workforce", /agencies decide/i],
      ["/communities", /the workshop ends/i],
      ["/companies", /start with its page/i],
      ["/companies/airtable", /laid off from airtable/i],
    ] as const;

    for (const [route, heading] of routes) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
      // Deferred routes (plan 043) override the layout value with their own,
      // so this asserts whichever one the route is supposed to render rather
      // than accepting either.
      const expectedRobots = DEFERRED_ROUTES.some((deferred) => route.startsWith(deferred))
        ? DEFERRED_ROBOTS
        : "noindex, nofollow, noarchive";
      await expect(page.locator('meta[name="robots"]'), `${route} robots`).toHaveAttribute("content", expectedRobots);
    }
  });

  // Plan 043 trimmed plan 037's four tabs to three top-level links and one
  // mega-menu trigger. What is asserted here is the shape and the guardrails:
  // the panel opens and closes, the deferred set is absent from both nav
  // presentations, and /act is absent from both.
  test("opens and closes its one dropdown and keeps deferred routes and /act out of the nav", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const headerNav = page.getByRole("navigation", { name: "Marketing navigation" });
    await expect(headerNav.getByRole("link")).toHaveCount(2);
    await expect(headerNav.getByRole("button")).toHaveCount(2);
    await expect(headerNav.getByRole("link", { name: "For Employers" })).toHaveAttribute("href", "/employers");
    await expect(headerNav.getByRole("link", { name: "Pricing" })).toHaveAttribute("href", "/pricing");
    expect(await page.locator('.mh-site-header a[href="/act"]').count()).toBe(0);

    const visiblePanels = () =>
      page.locator(".mh-nav-panel").evaluateAll(
        (els) => els.filter((el) => getComputedStyle(el).display !== "none").length,
      );

    expect(await visiblePanels()).toBe(0);
    const product = headerNav.getByRole("button", { name: "Product" });
    await product.click();
    await expect(product).toHaveAttribute("aria-expanded", "true");
    expect(await visiblePanels()).toBe(1);

    await headerNav.getByRole("button", { name: "Resources" }).click();
    await expect(product).toHaveAttribute("aria-expanded", "false");
    expect(await visiblePanels()).toBe(1);

    await page.keyboard.press("Escape");
    expect(await visiblePanels()).toBe(0);

    const footerNav = page.getByRole("navigation", { name: "Footer navigation" });
    await expect(footerNav.getByRole("link", { name: "For Employers" })).toBeVisible();
    await expect(footerNav.getByRole("link", { name: "Privacy & Security" })).toBeVisible();

    // The deferred set (src/lib/launch.ts) leaves the header, the mobile
    // menu, the footer, and the homepage body, while its URLs keep working.
    for (const route of DEFERRED_ROUTES) {
      expect(await page.locator(`.mh-site-header a[href="${route}"]`).count(), `${route} in the header`).toBe(0);
      expect(await page.locator(`.mh-site-footer a[href="${route}"]`).count(), `${route} in the footer`).toBe(0);
      expect(await page.locator(`main a[href="${route}"]`).count(), `${route} in the homepage body`).toBe(0);
    }
  });

  // The deferred pages stay reachable and keep their own noindex. Asserting
  // the exact DEFERRED_ROBOTS string, which differs from the layout's, is
  // what makes this fail if a page loses its override rather than passing on
  // the inherited value - and it keeps working after the operator flips the
  // layout value at cutover (docs/cutover-checklist.md).
  test("serves every deferred route with its own noindex", async ({ page }) => {
    for (const route of DEFERRED_ROUTES) {
      const response = await page.goto(route);
      expect(response?.status(), `${route} status`).toBe(200);
      await expect(page.locator('meta[name="robots"]'), `${route} robots`).toHaveAttribute("content", DEFERRED_ROBOTS);
    }
  });

  // Plan 035 retired the thin /public-partners page into /workforce. The old
  // URL has to keep working - it is in the wild - so the 301 is asserted, not
  // just the new page.
  // The nav sits between the brand and the header actions. The seven-item
  // draft of it met the actions with 0px to spare at 1280, which is why the
  // clearance is measured rather than eyeballed; every width where the
  // desktop nav is hidden must show the mobile menu instead.
  test("header navigation fits, or hands over to the mobile menu", async ({ page }) => {
    await page.goto("/");
    for (const width of [1440, 1360, 1280, 1200, 1181, 1180, 1024, 768, 390]) {
      await page.setViewportSize({ width, height: 900 });
      const m = await page.evaluate(() => {
        const header = document.querySelector(".mh-site-header") as HTMLElement;
        const nav = header.querySelector(".mh-site-nav") as HTMLElement;
        const menu = header.querySelector(".mh-mobile-menu") as HTMLElement;
        const right = (el: Element) => el.getBoundingClientRect().right;
        const left = (el: Element) => el.getBoundingClientRect().left;
        return {
          navVisible: getComputedStyle(nav).display !== "none",
          menuVisible: getComputedStyle(menu).display !== "none",
          brandClearance: Math.round(left(nav.firstElementChild!) - right(header.querySelector("a")!)),
          actionsClearance: Math.round(
            left(header.querySelector(".mh-header-actions")!) - right(nav.lastElementChild!),
          ),
          overflow: document.documentElement.scrollWidth - window.innerWidth,
        };
      });
      expect(m.overflow, `horizontal overflow at ${width}`).toBeLessThanOrEqual(1);
      expect(m.navVisible || m.menuVisible, `no navigation at all at ${width}`).toBe(true);
      if (m.navVisible) {
        expect(m.brandClearance, `nav clears the brand at ${width}`).toBeGreaterThanOrEqual(12);
        expect(m.actionsClearance, `nav clears the header actions at ${width}`).toBeGreaterThanOrEqual(12);
      }
    }
  });

  // The mobile menu carries the same groups, flattened. It is ~18 rows now,
  // and `.marketing-homepage { overflow: clip }` would swallow anything past
  // the viewport rather than scrolling it, so the last row must be reachable.
  test("mobile menu carries every group and stays reachable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByText("Menu", { exact: true }).click();
    const menu = page.locator(".mh-mobile-menu > div");
    await expect(menu.getByRole("link", { name: "For Employers" })).toBeVisible();
    await expect(menu.getByRole("link", { name: "Privacy & Security" })).toBeVisible();
    // The featured destinations are plain links on a phone, so nothing that
    // only the desktop panel carries is lost here - including the newsletter,
    // which had no phone entry until plan 043 generalized the feature link.
    await expect(menu.getByRole("link", { name: "Career Context" })).toBeVisible();
    await expect(menu.getByRole("link", { name: "Layoff & Benefits" })).toBeVisible();
    await expect(menu.getByRole("link", { name: "About" })).toBeVisible();
    await expect(menu.getByRole("link", { name: "The Offboard Newsletter" })).toBeVisible();
    for (const route of DEFERRED_ROUTES) {
      expect(await menu.locator(`a[href="${route}"]`).count(), `${route} in the mobile menu`).toBe(0);
    }
    expect(await menu.locator('a[href="/act"]').count()).toBe(0);
    expect(
      await menu.evaluate((el) => {
        el.scrollTop = el.scrollHeight;
        return (el.lastElementChild as HTMLElement).getBoundingClientRect().bottom <= window.innerHeight + 1;
      }),
      "the last mobile menu item is clipped away",
    ).toBe(true);
  });

  test("301s the retired public-partners URL to workforce", async ({ page }) => {
    await page.goto("/public-partners");
    await expect(page).toHaveURL(/\/workforce$/);
    await expect(page.getByRole("heading", { level: 1, name: /agencies decide/i })).toBeVisible();
  });

  test("reflows every route without horizontal overflow on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const route of ["/", "/how-it-works", "/pricing", "/career-context", "/resources", "/resources/first-week-after-a-layoff", "/about", "/employers", "/workforce", "/communities", "/act", "/privacy-security", "/companies", "/companies/airtable"]) {
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
          // The homepage header is transparent at the top of the page (owner
          // 2026-09-08), and it is fixed, so walking up the DOM lands on the
          // page's paper background rather than on what is actually behind
          // it. What is behind it is the hero band, which is forest-deep.
          // Without this the check would compare a paper ring against paper
          // and fail on a header that is in fact readable.
          if (node instanceof HTMLElement && node.classList.contains("mh-site-header")) {
            const hero = document.querySelector(".mh-hero2, .mh-route-hero");
            if (hero) return getComputedStyle(hero).backgroundColor;
          }
          node = node.parentElement;
        }
        return "none";
      }
      return Array.from(document.querySelectorAll("main a, main button, main summary, header a, header summary")).map(
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

// Anchor links glide instead of jumping (owner 2026-09-13). Two things can rot
// here and neither is visible in a screenshot: the property landing on a
// selector that never scrolls (`.marketing-homepage` is a div inside body, so
// `scroll-behavior` on it does nothing), and the reduced-motion opt-out being
// left to the scoped stylesheet's `.marketing-homepage *` rule, which cannot
// match `html`. Both are asserted on the element the browser actually scrolls.
test.describe("in-page anchors scroll smoothly", () => {
  test("the scrolling element opts in, and reduced motion opts back out", async ({ page }) => {
    await page.goto("/");
    const scroller = () =>
      page.evaluate(() => ({
        // The element the browser scrolls, whatever the markup does above it.
        isHtml: document.scrollingElement === document.documentElement,
        behavior: getComputedStyle(document.scrollingElement!).scrollBehavior,
      }));

    // Both states are emulated rather than assumed: playwright.config.ts runs
    // the whole suite under `reducedMotion: "reduce"` (plan 024), so a test
    // that just read the default would be asserting the opt-out twice and
    // would stay green if the smooth rule were deleted outright.
    await page.emulateMedia({ reducedMotion: "no-preference" });
    expect(await scroller()).toEqual({ isHtml: true, behavior: "smooth" });

    await page.emulateMedia({ reducedMotion: "reduce" });
    expect((await scroller()).behavior).toBe("auto");
  });

  test("an anchor link lands its section clear of the fixed header", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /see the toolkit/i }).click();
    await expect(page).toHaveURL(/#run$/);

    const clearance = await page.evaluate(async () => {
      // Wait for the smooth scroll to settle rather than guessing at a delay.
      await new Promise<void>((resolve) => {
        let last = -1;
        const tick = () => {
          const y = window.scrollY;
          if (y === last) return resolve();
          last = y;
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      const header = document.querySelector(".mh-site-header")!.getBoundingClientRect();
      const section = document.querySelector("#run")!.getBoundingClientRect();
      return { sectionTop: Math.round(section.top), headerBottom: Math.round(header.bottom) };
    });
    // The section's own top edge sits below the header, not under it.
    expect(clearance.sectionTop).toBeGreaterThanOrEqual(clearance.headerBottom);
  });
});

// Step 3's stage rows are a hand-placed CSS grid: each row is its own grid
// container, and at two breakpoints the number, the state chip and the tool
// pills are assigned their cells by hand. Leave the tool row and the chip
// to auto-placement and the chip lands in the 48px number column on a row of
// its own, because the placement cursor never goes back past the tool row.
// That is how the state chip first rendered, hanging off the left edge of
// the section between 901px and 1180px. The visual suite did not catch it:
// 1% of pixels is a low bar for one small pill. This asserts the geometry
// instead, and it was checked against the pre-fix rules, where three of the
// five widths below fail.
test.describe("the Run your search rows stay inside their section", () => {
  for (const width of [1440, 1100, 901, 768, 390]) {
    test(`nothing escapes #run at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);

      const escaped = await page.evaluate(() => {
        const section = document.querySelector("#run")!.getBoundingClientRect();
        const bad: string[] = [];
        document.querySelectorAll("#run .mh-stage-strip *").forEach((el) => {
          const box = el.getBoundingClientRect();
          if (!box.width) return;
          if (box.left < section.left - 0.5 || box.right > section.right + 0.5) {
            bad.push(`${el.tagName}.${el.className} ${Math.round(box.left)}-${Math.round(box.right)}`);
          }
        });
        return bad;
      });
      expect(escaped).toEqual([]);
    });
  }

  test("the four stages read as an ordered list of rows, not four columns", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const rows = await page.evaluate(() =>
      Array.from(document.querySelectorAll("#run .mh-stage-strip > li")).map((li) => {
        const box = li.getBoundingClientRect();
        return { top: Math.round(box.top), left: Math.round(box.left), width: Math.round(box.width) };
      }),
    );
    expect(rows).toHaveLength(4);
    // Stacked, not side by side: every row starts below the one before it and
    // they all share one left edge and one width.
    for (let i = 1; i < rows.length; i += 1) {
      expect(rows[i].top).toBeGreaterThan(rows[i - 1].top);
      expect(rows[i].left).toBe(rows[0].left);
      expect(rows[i].width).toBe(rows[0].width);
    }
  });
});

// /job-search carries two more hand-placed row grids (plan 051): the packet
// steps and the detailed stage rows. Same failure mode as the homepage's, and
// the same reason the visual suite is weak evidence for it - a chip escaping
// its column is a few hundred pixels on a 4,900px page, well inside the 1%
// screenshot tolerance.
test.describe("the /job-search rows stay inside their sections", () => {
  for (const width of [1440, 1100, 901, 768, 390]) {
    test(`nothing escapes at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/job-search");
      await page.evaluate(() => document.fonts.ready);

      const escaped = await page.evaluate(() => {
        const bad: string[] = [];
        for (const selector of [".mh-packet", ".mh-kit"]) {
          const band = document.querySelector(selector);
          if (!band) {
            bad.push(`${selector} is missing`);
            continue;
          }
          const box = band.getBoundingClientRect();
          band.querySelectorAll(".mh-packet-steps *, .mh-stage-strip *").forEach((el) => {
            const r = el.getBoundingClientRect();
            if (!r.width) return;
            if (r.left < box.left - 0.5 || r.right > box.right + 0.5) {
              bad.push(`${selector} ${el.tagName}.${el.className} ${Math.round(r.left)}-${Math.round(r.right)}`);
            }
          });
        }
        return bad;
      });
      expect(escaped).toEqual([]);
    });
  }

  test("the packet band names the app's six steps and marks what Free covers", async ({ page }) => {
    await page.goto("/job-search");
    // Pinned in the browser as well as in the unit test: these six strings and
    // their two Free chips are a pricing claim, ported from packetSteps.ts in
    // the app repo. A silent flip here is a promise the product does not keep.
    await expect(page.locator(".mh-packet-steps > li")).toHaveCount(6);
    await expect(page.locator(".mh-packet-steps .mh-state-chip", { hasText: /^Free$/ })).toHaveCount(2);
    await expect(page.locator(".mh-packet-steps .mh-state-chip.is-pro")).toHaveCount(3);
    // Ghost Check is neither: the basic verdict is free three times a month.
    await expect(page.locator(".mh-packet-steps .mh-state-chip", { hasText: /^3 a month$/ })).toHaveCount(1);
  });
});

// Where a hero headline breaks (owner 2026-09-14). `text-wrap: balance` gives
// even line lengths, which is a typographic fact and not a grammatical one:
// measured across the route heroes it was splitting the product name "Career
// Context" over two lines. The rule is small on purpose - a multi-word product
// name never splits - and it is enforced here against the real line boxes,
// because a non-breaking space is invisible in the DOM and in a screenshot.
//
// The bigger rule, gluing every short function word, was built and measured
// and thrown away: each glued pair is an unbreakable run, so the longest run
// sets the effective measure and headlines gained lines instead of losing bad
// breaks. See the comment on balanceHeadline in MarketingSite.tsx.
test.describe("hero headlines keep product names whole", () => {
  const NAMES = ["Career Context", "Application Packet", "Layoff Plan", "Offboard Pro"];

  for (const width of [1440, 900, 390]) {
    test(`no product name splits across lines at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const offenders: string[] = [];

      for (const route of ["/pricing", "/career-context", "/lumo", "/job-search", "/layoff-support", "/integrations"]) {
        await page.goto(route);
        await page.evaluate(() => document.fonts.ready);

        const lines: string[] = await page.evaluate(() => {
          const heading = document.querySelector("main h1");
          if (!heading) return [];
          const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
          const out: string[] = [];
          let current = "";
          let lastTop = -1;
          let node: Node | null;
          while ((node = walker.nextNode())) {
            for (const match of (node.textContent ?? "").matchAll(/\S+/g)) {
              const range = document.createRange();
              range.setStart(node, match.index!);
              range.setEnd(node, match.index! + match[0].length);
              const top = Math.round(range.getBoundingClientRect().top);
              if (lastTop !== -1 && top !== lastTop) {
                out.push(current.trim());
                current = "";
              }
              lastTop = top;
              current += `${match[0]} `;
            }
          }
          if (current.trim()) out.push(current.trim());
          return out;
        });

        // A name survives if some single line contains it whole. Compare with
        // the non-breaking spaces normalised, since that is what holds it.
        const whole = lines.map((line) => line.replace(/ /g, " "));
        const full = whole.join(" ");
        for (const name of NAMES) {
          if (full.includes(name) && !whole.some((line) => line.includes(name))) {
            offenders.push(`${route}: "${name}" split across ${JSON.stringify(whole)}`);
          }
        }
      }

      expect(offenders).toEqual([]);
    });
  }
});

// The two plan CTAs sit on one line at the bottom of their cards (owner
// 2026-09-14), whatever length the copy above them runs to. Round one held
// that with a percentage height resolving inside a table cell and needed two
// fragile things to line up; round two moved the cards out of the table, so a
// plain `margin-top: auto` in a flex column does it. Still asserted, because
// the failure is a small vertical drift well inside the visual suite's 1%
// tolerance.
test("the pricing plan CTAs stay on one line", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/pricing");
  await page.evaluate(() => document.fonts.ready);

  const ctas = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".mh-plan-cards .mh-primary-cta")).map((el) => {
      const box = el.getBoundingClientRect();
      return { label: el.textContent?.trim() ?? "", top: Math.round(box.top), bottom: Math.round(box.bottom) };
    }),
  );

  expect(ctas).toHaveLength(2);
  expect(ctas[0].top).toBe(ctas[1].top);
  expect(ctas[0].bottom).toBe(ctas[1].bottom);
});
