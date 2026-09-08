import { expect, test } from "@playwright/test";

/* Every CTA, on every route, must stay readable at rest AND under the
   cursor. This exists because the secondary CTA's hover fill was a hard
   --mh-paper-soft while its on-dark variant's label is --mh-paper: hovering
   the homepage hero button painted paper text on a paper fill at 1.1:1 and
   the label disappeared. The fill is now a custom property that travels with
   the text colour (see .mh-secondary-cta in MarketingHomepage.css).

   Unlike the visual baselines this suite does not compare pixels, so it runs
   on CI as well as locally. It reads computed styles, composites each
   element's background over its ancestors, and measures WCAG contrast - the
   1% pixel tolerance of the screenshot suite would never have caught a
   colour change on an element this small. */

const ROUTES = [
  "/", "/how-it-works", "/pricing", "/career-context", "/integrations", "/lumo",
  "/layoff-support", "/job-search", "/privacy-security", "/about", "/employers",
  "/workforce", "/communities", "/companies", "/companies/airtable", "/act",
  "/resources", "/intake",
] as const;

const AA_NORMAL = 4.5;

type Rgba = { r: number; g: number; b: number; a: number };
type Probe = { color: string; bg: string; ratio: number };

function probe(el: Element): Probe {
  const parse = (s: string): Rgba | null => {
    const m = s.match(/[\d.]+/g);
    if (!m) return null;
    const n = m.map(Number);
    return { r: n[0], g: n[1], b: n[2], a: n[3] === undefined ? 1 : n[3] };
  };
  const over = (fg: Rgba, bg: Rgba): Rgba => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  });
  // Translucent fills (the on-dark wash is 6% paper) only mean something once
  // composited over what is actually behind them, so walk the whole ancestry.
  const effective = (node: Element): Rgba => {
    const chain: Element[] = [];
    for (let n: Element | null = node; n; n = n.parentElement) chain.push(n);
    let acc: Rgba = { r: 255, g: 255, b: 255, a: 1 };
    // The site header is fixed and, at the top of the homepage, fully
    // transparent (owner 2026-09-08). Its ancestors are not behind it - the
    // hero band is - so for a control inside the header the chain stops at
    // the header and starts from the hero instead. Without this the walk
    // reaches the page's paper background and measures paper text on paper,
    // failing a header that is in fact readable.
    const headerIndex = chain.findIndex(
      (n) => n instanceof HTMLElement && n.classList.contains("mh-site-header"),
    );
    let walk = chain;
    if (headerIndex >= 0) {
      walk = chain.slice(0, headerIndex + 1);
      const hero = document.querySelector(".mh-hero2, .mh-route-hero");
      const heroBg = hero ? parse(getComputedStyle(hero).backgroundColor) : null;
      if (heroBg && heroBg.a > 0) acc = over(heroBg, acc);
    }
    for (const n of walk.reverse()) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0) acc = over(c, acc);
    }
    return acc;
  };
  const lum = (c: Rgba) => {
    const f = (v: number) => {
      const x = v / 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const cs = getComputedStyle(el);
  const bg = effective(el);
  const solid = over(parse(cs.color) ?? { r: 0, g: 0, b: 0, a: 1 }, bg);
  const [L1, L2] = [lum(solid), lum(bg)];
  const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  const rgb = (c: Rgba) => `rgb(${Math.round(c.r)},${Math.round(c.g)},${Math.round(c.b)})`;
  return { color: cs.color, bg: rgb(bg), ratio: Math.round(ratio * 100) / 100 };
}

// Eighteen routes, every CTA on each, two measurements apiece with a
// transition settle between them - comfortably past the 30s default.
test.describe.configure({ timeout: 240_000 });

test("CTAs stay readable at rest and on hover, on every route", async ({ page }) => {
  const failures: string[] = [];

  for (const route of ROUTES) {
    await page.goto(route);
    const ctas = page.locator(".mh-secondary-cta, .mh-primary-cta");
    const count = await ctas.count();

    for (let i = 0; i < count; i++) {
      const cta = ctas.nth(i);
      if (!(await cta.isVisible())) continue;
      const label = (await cta.innerText()).replace(/\s+/g, " ").trim().slice(0, 38);

      // Nothing is hovered here: each iteration parks the cursor at the
      // origin before it ends, so the rest reading needs no settle of its own.
      await cta.scrollIntoViewIfNeeded();
      const rest = await cta.evaluate(probe);

      await cta.hover();
      await page.waitForTimeout(240); // the fill transition is 180ms
      const hover = await cta.evaluate(probe);

      for (const [state, m] of [["rest", rest], ["hover", hover]] as const) {
        if (m.ratio < AA_NORMAL) {
          failures.push(
            `${route} :: "${label}" ${state} ${m.ratio}:1 (${m.color} on ${m.bg}) - needs ${AA_NORMAL}:1`,
          );
        }
      }
      await page.mouse.move(0, 0);
    }
  }

  expect(failures, `CTA contrast failures:\n${failures.join("\n")}\n`).toEqual([]);
});
