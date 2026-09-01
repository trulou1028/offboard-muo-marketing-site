import { test, expect } from "@playwright/test";

// Guards the bug this repo hit twice: MarketingHomepage.css resets margin on
// `.marketing-homepage h1/h2/h3/p/ol/ul/figure/fieldset` and padding on
// `.marketing-homepage ol/ul`. Those selectors have specificity (0,1,1), so a
// bare `.mh-thing { margin-top: 54px }` at (0,1,0) never applies to one of
// those elements no matter the source order — the declaration is dead and the
// spacing silently never renders. The fix is an element prefix
// (`ol.mh-thing`), which this test then sees as live.
//
// Measured in a real browser rather than read out of the stylesheet: only the
// cascade knows which rule actually won.

const ROUTES = [
  "/",
  "/how-it-works",
  "/pricing",
  "/career-context",
  "/integrations",
  "/lumo",
  "/layoff-support",
  "/job-search",
  "/about",
  "/employers",
  "/resources",
  "/act",
  "/public-partners",
  "/intake",
  "/intake/confirmed",
  "/resources/first-week-after-a-layoff",
  "/resources/what-is-an-ai-agent",
];

const findShadowedDeclarations = () => {
  const MARGIN_TAGS = new Set(["H1", "H2", "H3", "P", "OL", "UL", "FIGURE", "FIELDSET"]);
  const PADDING_TAGS = new Set(["OL", "UL"]);
  const MARGINS = ["margin-top", "margin-right", "margin-bottom", "margin-left"];
  const PADDINGS = ["padding-top", "padding-right", "padding-bottom", "padding-left"];
  const found: string[] = [];

  const walk = (rules: CSSRuleList) => {
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSMediaRule || rule instanceof CSSSupportsRule) {
        walk(rule.cssRules);
        continue;
      }
      if (!(rule instanceof CSSStyleRule)) continue;
      for (const selector of rule.selectorText.split(",").map((part) => part.trim())) {
        // Only a lone class selector is at risk; anything compound or
        // descendant already matches or beats the reset's specificity.
        if (!/^\.[A-Za-z0-9_-]+$/.test(selector)) continue;
        for (const element of Array.from(document.querySelectorAll(selector))) {
          for (const property of [...MARGINS, ...PADDINGS]) {
            const declared = rule.style.getPropertyValue(property);
            if (!declared || declared === "0" || declared === "0px") continue;
            const reset = MARGINS.includes(property)
              ? MARGIN_TAGS.has(element.tagName)
              : PADDING_TAGS.has(element.tagName);
            if (reset) found.push(`${selector} on <${element.tagName.toLowerCase()}>: ${property}: ${declared}`);
          }
        }
      }
    }
  };

  for (const sheet of Array.from(document.styleSheets)) {
    try {
      walk(sheet.cssRules);
    } catch {
      // Cross-origin sheet; none of ours.
    }
  }
  return Array.from(new Set(found));
};

for (const route of ROUTES) {
  test(`no reset-shadowed spacing on ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(route);
    const mobile = await page.evaluate(findShadowedDeclarations);
    await page.setViewportSize({ width: 1280, height: 900 });
    const desktop = await page.evaluate(findShadowedDeclarations);
    const dead = Array.from(new Set([...mobile, ...desktop]));
    expect(
      dead,
      `Spacing that never renders (add an element prefix, e.g. ol.mh-thing):\n${dead.join("\n")}`,
    ).toEqual([]);
  });
}
