import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

/* The two intake emails were the only user-facing strings on the site that
 * COPY.md did not carry. That gap is why a confirmation subject addressing
 * every applicant as "Offboard" survived from the plan-010 port (2026-08-22)
 * until the launch smoke test on 2026-09-15, when someone read one as a
 * recipient rather than as code.
 *
 * CopyDrift.test.tsx cannot cover these: it renders components and reads the
 * DOM, and an email is never in a DOM. So this reads the source instead, and
 * pins both subjects against the copy law. Changing either means changing
 * COPY.md § 9 in the same PR, which is the rule for every other string.
 */
const SOURCE = readFileSync(path.join(process.cwd(), "src/lib/email/resend.ts"), "utf8");
const COPY_DOC = readFileSync(path.join(process.cwd(), "COPY.md"), "utf8");

/* Comments stripped, so that the code comment recording what the old subject
   used to say does not read as the old subject still being sent. */
const CODE = SOURCE.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

describe("the intake emails match the copy law", () => {
  it("greets the person in the confirmation subject, and never the company", () => {
    expect(SOURCE).toContain("subject: `We got your intake, ${input.firstName}`");

    // The literal that shipped for three weeks. A reader saw "We got your
    // intake, Offboard" and reasonably concluded we thought that was their
    // name.
    expect(CODE).not.toContain('"We got your intake, Offboard"');
    expect(COPY_DOC).toContain("We got your intake, <first name>");
  });

  it("names the submitter and their title in the team subject", () => {
    expect(SOURCE).toContain("subject: `New intake: ${input.submitterName} (${input.recentTitle})`");
    expect(COPY_DOC).toContain("New intake: <name> (<most recent job title>)");
  });

  it("records both emails in COPY.md section 9", () => {
    const heading = "### The two intake emails";
    expect(
      COPY_DOC.includes(heading),
      "COPY.md lost the intake email section. Both emails are user-facing copy and belong in the document.",
    ).toBe(true);

    // The body strings a reader actually sees, so a silent edit to the
    // template fails here rather than reaching an inbox unreviewed.
    for (const line of [
      "Thanks for filling that out",
      "We got your intake and one of us (probably Steph or Louie) will review it",
      "Back to offboard.co",
      "Reply directly to",
    ]) {
      expect(SOURCE, `the template dropped "${line}"`).toContain(line);
      expect(COPY_DOC, `COPY.md does not record "${line}"`).toContain(line);
    }
  });

  it("renders both emails inside the app's branded shell", () => {
    // Ported from lumo-plan-builder's branded-shell.tsx, whose own standard is
    // that every Offboard email uses it. Before this, these two were plain
    // HTML on a paper background and looked nothing like the auth emails the
    // app sends from the same Resend account.
    expect(CODE).toContain("brandedShell({");
    expect((CODE.match(/brandedShell\(\{/g) ?? []).length).toBe(2);

    // The tokens that have to match the app's emailStyles for the two to look
    // the same. A drift here is invisible until someone opens an inbox.
    for (const token of ["#f4f4f5", "#e4e4e7", "#1a1a1a", "#55575d", "border-radius:12px", "padding:40px"]) {
      expect(CODE, `the shell lost ${token}`).toContain(token);
    }

    // The card is white, so the logo must be the dark artwork. The light file
    // measures 244 luminance on white: present, and invisible.
    expect(CODE).toContain("offboard-logo-dark.png");
    expect(CODE).not.toContain("offboard-logo-light.png");

    // Built from Vercel's production domain, so it is the .vercel.app address
    // today and offboard.co after the cutover. Hardcoding offboard.co would
    // ship a broken logo to anyone who submits before the domain moves.
    expect(CODE).toContain("VERCEL_PROJECT_PRODUCTION_URL");

    // The app's rule: neither email is marketing, so neither unsubscribes.
    expect(CODE.toLowerCase()).not.toContain("unsubscribe");

    expect(COPY_DOC).toContain("Both render inside the app's branded shell");
  });

  it("builds the card as a table cell, so the content cannot escape it", () => {
    /* The defect this replaces, 2026-09-15: the shell was ported as nested
       <div>s carrying the app's style values. Chromium rendered it correctly
       and Gmail did not — it closed the white card straight after the logo and
       dropped the heading and body onto the client's own background, black in
       dark mode. The app avoids this because React Email's Container and
       Section are tables, which is the reason email templates use them.

       Nothing escapes a <td>. These assertions are on the markup strategy, not
       the styling, because the styling was already right. */
    expect(CODE).toContain("<table role=\"presentation\"");
    expect(CODE).toContain('class="email-card" style="background-color:#ffffff');
    // The card is a cell, never a div.
    expect(CODE).not.toMatch(/<div[^>]*class="email-card"/);

    // The body, both dividers and the footer all sit between the card cell's
    // open and close tags. A future edit that moves any of them out is the
    // original bug returning.
    const card = CODE.indexOf('class="email-card"');
    const close = CODE.indexOf("</td>", card);
    expect(card, "the card cell is gone").toBeGreaterThan(-1);
    const inside = CODE.slice(card, close);
    for (const part of ["${input.body}", "${divider}", "input.footerText", "Offboard</div>"]) {
      expect(inside, `"${part}" is outside the card cell`).toContain(part);
    }
  });

  it("still names two reviewers, because the email promises them by name", () => {
    // If either stops reviewing intakes, this sentence is a false promise to
    // a person who just asked for help. COPY.md § 9 says the same.
    expect(SOURCE).toContain("probably Steph or Louie");
  });
});
