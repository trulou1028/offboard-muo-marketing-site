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

  it("still names two reviewers, because the email promises them by name", () => {
    // If either stops reviewing intakes, this sentence is a false promise to
    // a person who just asked for help. COPY.md § 9 says the same.
    expect(SOURCE).toContain("probably Steph or Louie");
  });
});
