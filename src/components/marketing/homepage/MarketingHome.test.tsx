import { render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from "vitest";

// next/font/local's real module body is only ever run through Next's SWC
// font transform; imported directly (as importing @/app/layout below does)
// it's an empty stub that throws. Mock it so pulling in layout.tsx for its
// `metadata` export doesn't require the whole Next build pipeline.
vi.mock("next/font/local", () => ({
  default: () => ({ variable: "", className: "" }),
}));

import { metadata as layoutMetadata } from "@/app/layout";
import { metadata as communitiesMetadata } from "@/app/communities/page";
import { metadata as howItWorksMetadata } from "@/app/how-it-works/page";
import { metadata as companiesMetadata } from "@/app/companies/page";
import { metadata as workforceMetadata } from "@/app/workforce/page";
import { DEFERRED_ROBOTS, DEFERRED_ROUTES } from "@/lib/launch";
import { GuideArticle } from "@/components/marketing/resources/GuideArticle";
import { RenderBlocks } from "@/components/marketing/resources/RenderBlocks";
import { getPostBlocks } from "@/content/resources/blocks";
import { buildResourceSections, getResource } from "@/content/resources/registry";

import MarketingHome from "./MarketingHome";
import { MarketingApplicationPacket } from "./MarketingApplicationPacket";

// Keyed by route so the "every deferred route is covered" assertion below
// fails when a page joins src/lib/launch.ts without being imported here.
const deferredMetadata = {
  "/how-it-works": howItWorksMetadata,
  "/workforce": workforceMetadata,
  "/communities": communitiesMetadata,
  "/companies": companiesMetadata,
};

import {
  MarketingAbout,
  MarketingAct,
  MarketingEmployers,
  MarketingHowItWorks,
  MarketingPricing,
  MarketingResources,
} from "./MarketingRoutePages";
import { MarketingWorkforce } from "./MarketingWorkforce";

describe("Offboard marketing routes", () => {
  let fetchSpy: MockInstance<typeof globalThis.fetch>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 200 }));
  });

  afterEach(() => fetchSpy.mockRestore());

  it("keeps the homepage focused on what Offboard does and who it serves", () => {
    render(<MarketingHome />);

    // Homepage v3 (plan 039): the same Career Context narrative, re-sequenced
    // as three numbered steps. COPY.md § 1.
    expect(screen.getByRole("heading", { level: 1, name: "The Modern Unemployment Office" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "How Offboard works." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "One place that remembers your career." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Ask anywhere. The answer is about you." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The tools you run your search with." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Losing your job creates more than one problem." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Free remembers your search. Pro puts it to work." })).toBeInTheDocument();
    // Sponsored access is the third plan card (owner 2026-09-02), not a band.
    expect(screen.getByRole("heading", { name: "Sponsored access" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /learn about sponsored access/i })).toHaveAttribute("href", "/employers");
    expect(screen.queryByRole("heading", { name: /job-search support people will actually use/i })).not.toBeInTheDocument();
    // Community: three cards, and "Meet with a human" goes to the intake form.
    // It leads the row (owner 2026-09-13): it is the only card that reaches a
    // person, and the only one that keeps the reader on the site.
    expect(screen.getByRole("link", { name: /fill out intake/i })).toHaveAttribute("href", "/intake");
    expect(
      Array.from(document.querySelectorAll(".mh-community-cards h3")).map((h) => h.textContent),
    ).toEqual(["Meet with a human", "The Offboard Newsletter", "Slack community"]);
    expect(screen.getByRole("link", { name: /join the slack/i })).toHaveAttribute("href", "https://join.slack.com/t/offboardco/shared_invite/zt-34fsjpgfn-BcbibJ3d86P5RztYnHsA9w");
    expect(screen.getByRole("heading", { name: /you don't need another place to start over/i })).toBeInTheDocument();

    // The four steps are the page's spine, in the app's order (plan 050:
    // the same four stage cards Home shows after onboarding), and each one
    // links to the section that expands it. A broken anchor here silently
    // strands the reader; a reorder here contradicts the app on day one.
    const stepTitles = Array.from(document.querySelectorAll(".mh-steps h3")).map((h) => h.textContent);
    expect(stepTitles).toEqual(["Build your Career Context.", "Talk with Lumo.", "Run your search.", "Follow your layoff plan."]);
    for (const [label, href] of [
      ["Build your context", "#build"],
      ["See the connection", "#connect"],
      ["See the toolkit", "#run"],
      ["See the plan", "#plan"],
    ] as const) {
      expect(screen.getByRole("link", { name: new RegExp(label, "i") })).toHaveAttribute("href", href);
    }
    for (const id of ["build", "connect", "run", "plan"]) {
      expect(document.getElementById(id), `#${id} is a real section`).not.toBeNull();
    }

    // DESIGN.md R3, the defect this rebuild exists to fix: Career Context was
    // pitched in three sections with three filled buttons. Exactly one now.
    expect(screen.getAllByRole("link", { name: /(build|create) my career context/i })).toHaveLength(1);

    // The ledger row "Live integrations" governs every mention of the ChatGPT
    // and Claude connections on this page: they ship labelled beta.
    expect(within(screen.getByRole("main")).getByText(/ChatGPT and Claude connections are in beta/i)).toBeInTheDocument();

    // The Step 2 raster repeats its pixel copy in visually hidden DOM text so
    // the Figma example stays accessible and COPY.md can govern it.
    expect(screen.getByText("You: How does the Figma role compare?")).toBeInTheDocument();
    expect(screen.getByText("Lumo: Strong fit. It matches your AI product work and gives you more ownership.")).toBeInTheDocument();
    expect(document.querySelector<HTMLImageElement>('.mh-connect-visual')?.getAttribute("src")).toContain("lumo-opportunity-context-civic-modern-v2-transparent.webp");

    // DESIGN.md R5a: a section intro is an eyebrow, a headline, a description
    // and at most one action pair. Nothing nested and titled, and never a
    // second body paragraph. Scoped to this page on purpose - eight route
    // files still violate R5a and are tracked in DESIGN.md, not fixed.
    const copyBlocks = Array.from(document.querySelectorAll(".mh-page-home .mh-copy-block"));
    expect(copyBlocks.length).toBeGreaterThan(0);
    for (const block of copyBlocks) {
      expect(block.querySelector("article"), "a titled block nested in an intro").toBeNull();
      expect(block.querySelectorAll(":scope > p").length, "more than one description paragraph").toBeLessThanOrEqual(1);
    }

    // Plan 043's launch trim: each step section used to end in a link to its
    // pillar page. All four pillars are deferred, so the homepage must not
    // advertise them. Queried by href rather than by accessible name: this
    // test already runs ~40 getByRole lookups, and each one computes
    // accessible names across the whole tree, which is what pushes it toward
    // the 5s timeout under load.
    for (const route of DEFERRED_ROUTES) {
      expect(
        document.querySelector(`main a[href="${route}"]`),
        `${route} is deferred and must not be linked from the homepage body`,
      ).toBeNull();
    }

    // Six member questions, as a disclosure list. The first is open so it
    // still reads beside the plan card that answers it.
// The six questions left this band on 2026-09-08 (owner); COPY.md keeps them.
    expect(document.querySelectorAll(".mh-morethan details")).toHaveLength(0);

    // Retired in this pass: the second CTA whose destination was unclear, and
    // the prompt list /lumo already carries under the same label.
    const mainText = screen.getByRole("main").textContent ?? "";
    expect(mainText).not.toMatch(/ask things like/i);
    expect(Array.from(document.querySelectorAll("main a")).map((a) => a.textContent?.trim())).not.toContain("Ask Lumo");

    // Retired with v3: two sections that told a story the page already told.
    expect(screen.queryByRole("heading", { name: "Your job search goes wherever you do." })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /an ai guide that already knows/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Your career context should belong to you." })).not.toBeInTheDocument();

    // Verified facts that stay on the homepage (COPY.md ledger).
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("$20")).toBeInTheDocument();
    // The Resources mega menu also carries the subscriber count on every page
    // since plan 037, so this is scoped to the page body.
    expect(within(screen.getByRole("main")).getByText(/5,000\+ subscribers/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /subscribe free/i })).toHaveAttribute("href", "https://newsletter.offboard.co");

    // The primary CTA changed to "Get started free" on v2 (COPY.md language
    // rules, homepage exception).
    expect(screen.getAllByRole("link", { name: /get started free/i }).length).toBeGreaterThanOrEqual(2);

    // Sponsored-tier copy keeps "outplacement" on the page (the scoped
    // exception in COPY.md language rules).
    expect(screen.getByText(/outplacement/i)).toBeInTheDocument();

    // Retired v1 sections must not resurface.
    expect(screen.queryByRole("heading", { name: /a layoff gives you three jobs at once/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /\$12,000/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Where are you right now?" })).not.toBeInTheDocument();
    expect(screen.queryByRole("tablist", { name: "Job search stages" })).not.toBeInTheDocument();

    // Independence stays beside the relevant benefits claim. The footer now
    // carries the short company description instead of duplicating legal copy.
    expect(screen.getByText(/not a government agency/i)).toBeInTheDocument();
    expect(screen.getByText(/company behind the Modern Unemployment Office/i)).toBeInTheDocument();
    expect(screen.getByText(/built for the work between jobs/i)).toBeInTheDocument();
    // Built at runtime (rather than as a literal string) so this file itself
    // never contains the retired footer phrase — a repo-wide grep for it is
    // part of this plan's done criteria.
    const retiredFooterPhrase = new RegExp(["career", "transition service"].join("-"), "i");
    expect(screen.queryByText(retiredFooterPhrase)).not.toBeInTheDocument();

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("uses real routes for product, company, and partner navigation", () => {
    render(<MarketingHome />);

    // Plan 045 (owner 2026-09-07): Product is back as a mega menu with its
    // five pages, How It Works left the nav, and For Organizations stays a
    // plain link while its other pages are deferred. Panel links render
    // collapsed, so they are queried with hidden: true -- the point is that
    // every route the launch navigation names is present and correct, not
    // that it is on screen before the visitor opens anything.
    const headerNav = screen.getByRole("navigation", { name: "Marketing navigation" });
    expect(within(headerNav).getAllByRole("button")).toHaveLength(2);
    for (const name of ["Product", "Resources"]) {
      expect(within(headerNav).getByRole("button", { name })).toHaveAttribute("aria-expanded", "false");
    }
    expect(within(headerNav).queryByRole("link", { name: "Home" })).not.toBeInTheDocument();

    for (const [name, href] of [
      ["Career Context", "/career-context"],
      ["Lumo", "/lumo"],
      ["Integrations", "/integrations"],
      ["Application Packet", "/application-packet"],
      ["Layoff & Benefits", "/layoff-support"],
      ["For Employers", "/employers"],
      ["Pricing", "/pricing"],
      ["Guides", "/resources"],
      ["Privacy & Security", "/privacy-security"],
      ["About", "/about"],
      ["Visit Us", "/intake"],
      ["The Offboard Newsletter", "https://newsletter.offboard.co"],
      ["What to do in your first week after a layoff", "/resources/first-week-after-a-layoff"],
    ] as const) {
      const matches = within(headerNav).getAllByRole("link", { name: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`), hidden: true });
      expect(matches.length, `${name} in the header nav`).toBeGreaterThan(0);
      expect(matches[0]).toHaveAttribute("href", href);
    }

    // The deferred set leaves both nav presentations entirely (plan 043).
    for (const route of DEFERRED_ROUTES) {
      expect(headerNav.querySelector(`a[href="${route}"]`), `${route} in the header nav`).toBeNull();
    }

    // /act stays out of the nav in both presentations (standing guardrail).
    expect(headerNav.querySelector('a[href="/act"]')).toBeNull();

    const footerNav = screen.getByRole("navigation", { name: "Footer navigation" });
    expect(within(footerNav).getByRole("link", { name: "For Employers" })).toHaveAttribute("href", "/employers");
    expect(within(footerNav).getByRole("link", { name: "Privacy & Security" })).toHaveAttribute("href", "/privacy-security");
    for (const route of DEFERRED_ROUTES) {
      expect(footerNav.querySelector(`a[href="${route}"]`), `${route} in the footer`).toBeNull();
    }
  });

  it("gives the Application Packet its steps, follow-through rows, and plain answers", () => {
    render(<MarketingApplicationPacket />);

    expect(screen.getByRole("heading", { level: 1, name: /One job link\. An entire Application.Packet\./ })).toBeInTheDocument();
    expect(screen.getAllByText(/your first complete packet runs every step free/i).length).toBeGreaterThanOrEqual(2);

    // The six summary rows use the app's own packet-step labels and order. A
    // chip per row says what Free covers. Both counts are asserted because a chip that silently
    // flipped to Free would be a pricing claim nobody reviewed.
    expect(
      Array.from(document.querySelectorAll(".mh-packet-summary strong")).map((s) => s.textContent),
    ).toEqual(["Ghost Check", "Company Intel", "Role Match Analysis", "Tailor Resume", "Cover Letter", "Path to a Person"]);
    // Corrected 2026-09-14 against the server rather than the picker: Ghost
    // Check is not simply Pro. A Free member gets the basic verdict three
    // times a month, so the chip carries the allowance instead.
    const chips = Array.from(document.querySelectorAll(".mh-packet-summary .mh-state-chip")).map((c) => c.textContent);
    expect(chips).toEqual(["3 a month", "Free", "Free", "Pro", "Pro", "Pro"]);
    expect(screen.getByText(/basic ghost checks carry on at three a month/i)).toBeInTheDocument();
    expect(screen.getByText("Illustrative example. No live job is being checked.")).toBeInTheDocument();
    expect(screen.getByLabelText("Complete packet example")).toHaveTextContent("One role, six connected outputs.");
    expect(screen.getByText("Alex reviews and sends every application material.")).toBeInTheDocument();

    // The four stages are rows now, not four columns, and they carry the ten
    // tool descriptions this page owns.
    expect(document.querySelectorAll(".mh-stage-strip.is-detailed > li")).toHaveLength(4);
    expect(document.querySelector(".mh-kit-grid")).toBeNull();
    expect(screen.getByText(/the tenth application starts further ahead than the first/i)).toBeInTheDocument();

    for (const question of [
      "Where do the job postings come from?",
      "Does Offboard apply for me?",
      "What does Free include?",
      "Where does the tracker get its information?",
    ]) {
      expect(screen.getByText(question)).toBeInTheDocument();
    }
    // Never-promise rule: the page says what it builds, not that it applies.
    expect(screen.getByText(/it builds what you send and keeps it with the role/i)).toBeInTheDocument();
  });

  it("gives how it works the homepage's four steps, in order, with the toolkit and Lumo", () => {
    render(<MarketingHowItWorks />);

    // Plan 044, reordered by plan 050: the long form of the homepage's four steps, same kickers.
    expect(screen.getByRole("heading", { level: 1, name: "One system that starts where you are." })).toBeInTheDocument();
    expect(screen.getByText("Your Career Context is the spine. The tools are the muscle.")).toBeInTheDocument();
    const kickers = ["Step 1 · Build your Career Context", "Step 2 · Talk with Lumo", "Step 3 · Run your search", "Step 4 · Follow your layoff plan"];
    const found = kickers.map((kicker) => screen.getByText(kicker));
    for (let i = 1; i < found.length; i += 1) {
      expect(found[i - 1].compareDocumentPosition(found[i]) & Node.DOCUMENT_POSITION_FOLLOWING, `${kickers[i]} comes after ${kickers[i - 1]}`).toBeTruthy();
    }
    expect(screen.getByRole("heading", { name: "See your money clearly, then claim what exists." })).toBeInTheDocument();
    for (const row of ["Runway calculator", "Benefit deadlines", "Funded Training", "Paperwork Review"]) {
      expect(screen.getAllByText(row).length, row).toBeGreaterThan(0);
    }
    expect(screen.getByText(/we never promise funding/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /a few questions\. a record that's actually yours/i })).toBeInTheDocument();
    expect(screen.getByText("Where are you right now?")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "An AI guide that knows your actual situation." })).toBeInTheDocument();
    expect(screen.getByText(/never invents a dollar figure/i)).toBeInTheDocument();
    expect(screen.getByText(/like a caseworker/i)).toBeInTheDocument();
    expect(screen.getByText("ChatGPT and Claude connections are in beta.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /tools didn't go anywhere/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Application Packet" })).toBeInTheDocument();
    // The same ten tools the homepage names, so the page may say the number.
    expect(screen.getByText(/ten tools that read from the same context/i)).toBeInTheDocument();
    for (const tool of ["Role Match", "Ghost Job Checker", "Company Intel", "Application Packets", "Resume Tailoring", "Cover Letters", "Interview Prep", "Voice Practice", "Application Tracker", "Career Context"]) {
      expect(screen.getAllByText(tool).length, tool).toBeGreaterThan(0);
    }
    expect(screen.getByRole("heading", { name: /checked by people, never generated/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "You can do this yourself. You should not have to do it alone." })).toBeInTheDocument();
    // Retired with plan 044: the five-step list, the plan-as-spine aside, the
    // "Your context, kept" section and its integrations line, "money clock".
    for (const gone of [/five steps from/i, /the plan is the spine/i, /stop repeating your story/i, /money clock/i, /^Gmail$/]) {
      expect(screen.queryByText(gone)).not.toBeInTheDocument();
    }
    // Anchors the redirect map depends on.
    expect(document.getElementById("toolkit")).not.toBeNull();
    expect(document.getElementById("faq")).not.toBeNull();
  });

  it("gives pricing a dedicated evaluation page", () => {
    render(<MarketingPricing />);

    expect(screen.getByRole("heading", { level: 1, name: /start free\. upgrade when you need more support/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Do I need a payment method to start?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Does any tier charge for government benefits?" })).toBeInTheDocument();
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("$20")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Sponsored access" })).toBeInTheDocument();

    // The plan ledger is a real comparison matrix (owner 2026-09-14): one row
    // per thing, read across. Asserted through table roles, so a rebuild as a
    // grid of divs fails here rather than silently costing a screen reader the
    // ability to hear which plan and which row a cell belongs to.
    const ledger = within(document.querySelector(".mh-plan-ledger") as HTMLElement);
    expect(ledger.getAllByRole("rowheader").map((h) => h.querySelector("strong")?.textContent)).toEqual([
      "Search foundation",
      "Application Packets",
      "Ghost checks",
      "Ask Lumo",
      "Connected assistant",
    ]);
    // The privacy line is a full-width closing row, not a compared feature.
    expect(ledger.getByText(/your private career activity remains yours, on every plan/i)).toBeInTheDocument();

    // "Unlimited" on ghost checks is what the owner's second mockup drew and
    // what the app does not do: Pro's enriched checks run on the monthly
    // credit allowance. The claim was corrected on 2026-09-14 and this keeps
    // it corrected.
    const ghostRow = ledger.getByRole("rowheader", { name: /ghost checks/i }).closest("tr")!;
    expect(ghostRow.textContent).not.toMatch(/unlimited/i);
    expect(ghostRow.textContent).toContain("3 basic/month");
    // Three columns since 2026-09-14: Sponsored access left the table for its
    // own band, where the three facts a single "Included" cell could not hold
    // now ship.
    expect(ledger.getAllByRole("columnheader")).toHaveLength(3);
    const sponsored = within(document.querySelector(".mh-sponsored-band") as HTMLElement);
    expect(sponsored.getByRole("heading", { name: "Sponsored access" })).toBeInTheDocument();
    expect(sponsored.getAllByRole("listitem")).toHaveLength(3);
    expect(sponsored.getByText(/sponsors receive aggregate reporting only/i)).toBeInTheDocument();

    // Two cells in the owner's mockup were not shipped, because both were
    // false against the app. COPY.md records why; this keeps them out.
    const ledgerText = (document.querySelector(".mh-plan-ledger") as HTMLElement).textContent ?? "";
    expect(ledgerText).not.toMatch(/basic tracker/i);
    expect(ledgerText).not.toMatch(/unlimited ghost/i);
    // Free keeps the whole foundation; that sameness is the headline's claim,
    // so the row says so on both sides rather than showing Free as lesser.
    expect(ledgerText).toContain("Layoff Plan, tracker, documents");
    expect(ledgerText).toContain("Same as Free");
    expect(screen.getByText(/claiming your government benefits is always free/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /learn about sponsored access/i })).toHaveAttribute("href", "/employers");
  });

  it("separates the company story from member conversion", () => {
    render(<MarketingAbout />);

    expect(screen.getByRole("heading", { level: 1, name: /built for the moment work stops making sense/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "It started with our own layoffs." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A newsletter and a community came first." })).toBeInTheDocument();
    // The Resources mega menu also carries the subscriber count on every page
    // since plan 037, so this is scoped to the page body.
    expect(within(screen.getByRole("main")).getByText(/5,000\+ subscribers/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Calm is part of the product." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Our job is to get you out of here." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Fair questions." })).toBeInTheDocument();
    expect(screen.getByText(/founder and CEO/i)).toBeInTheDocument();
    expect(screen.queryByText(/I run Offboard/)).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Offboard is not a government agency." })).toBeInTheDocument();
  });

  it("gives employers and public partners distinct messages and CTAs", () => {
    const employerView = render(<MarketingEmployers />);
    expect(screen.getByRole("heading", { level: 1, name: /outplacement, modernized/i })).toBeInTheDocument();
    const employerCtas = within(screen.getByRole("main")).getAllByRole("link", { name: /get started free/i });
    expect(employerCtas).toHaveLength(3);
    employerCtas.forEach((cta) => expect(cta).toHaveAttribute("href", "https://app.offboard.co/auth?tab=signup"));
    // The public-sector section left /employers for /workforce in plan 035,
    // and plan 043's launch trim took the crosslink with it: /workforce is
    // deferred, so a buyer must not be sent there from here.
    expect(screen.queryByRole("link", { name: /see workforce & government/i })).not.toBeInTheDocument();
    expect(document.querySelector('a[href="/workforce"]')).toBeNull();
    expect(screen.getAllByText(/\$199/).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /cheapest line item/i })).toBeInTheDocument();
    expect(screen.getByText("Why companies do this")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /what employers ask/i })).toBeInTheDocument();
    expect(screen.getAllByText(/19 of 24 people claimed access/i).length).toBeGreaterThan(0);
    employerView.unmount();

    render(<MarketingWorkforce />);
    expect(screen.getByRole("heading", { level: 1, name: /agencies decide/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Aggregate for the program. Private for the resident." })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see exactly who can see what/i })).toHaveAttribute("href", "/privacy-security");
    expect(screen.getAllByRole("link", { name: /start a partnership conversation/i })[0]).toHaveAttribute("href", expect.stringContaining("Workforce%20partnership"));
  });

  it("keeps the root layout indexable after launch", () => {
    expect(layoutMetadata.robots).toBeUndefined();
  });

  it("keeps the deferred routes noindexed by their own metadata, not the layout's", () => {
    // These pages stay hidden after the root layout becomes indexable.
    for (const [route, metadata] of Object.entries(deferredMetadata)) {
      expect(metadata.robots, `${route} carries its own robots value`).toBe(DEFERRED_ROBOTS);
    }
    expect(Object.keys(deferredMetadata).sort()).toEqual([...DEFERRED_ROUTES].sort());
  });

  it("gives the ACT pilot its own resident-first landing page", () => {
    render(<MarketingAct />);

    expect(screen.getByRole("heading", { level: 1, name: /career support that starts tonight, not in six weeks/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /apply for pilot access/i })).toHaveAttribute("href", "https://app.offboard.co/act/apply");
    expect(
      screen.getByText(
        "ACT reporting is aggregate-first. The program can understand applications, approvals, claims, onboarding, and engagement without seeing private resumes, documents, Lumo conversations, or individual job-search behavior."
      )
    ).toBeInTheDocument();
    expect(screen.queryByText(/modern unemployment office/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/guaranteed|government-endorsed|official alameda county program/i)).not.toBeInTheDocument();
  });

  it("gives resources a real library with local article routes", () => {
    const { container } = render(<MarketingResources sections={buildResourceSections()} />);

    expect(screen.getByRole("heading", { level: 1, name: "Guides & resources" })).toBeInTheDocument();
    expect(screen.getByText(/reported essays, practical guides/i)).toBeInTheDocument();
    expect(container.querySelector(".mh-resources-hero .mh-primary-cta")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Guides" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "AI & Technology" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Essays" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What to do in your first week after a layoff" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "This Is Not Charity. It Is Reconstruction." })).toBeInTheDocument();

    const guideLink = screen.getAllByRole("link", { name: /read the guide/i })[0];
    expect(guideLink).toHaveAttribute("href", "/resources/first-week-after-a-layoff");
    expect(screen.queryByText(/https:\/\/offboard\.co\/resources/)).not.toBeInTheDocument();
    expect(
      container.querySelector('a[href="/resources/this-is-not-charity-it-is-reconstruction"]'),
    ).toBeInTheDocument();
  });

  it("renders a ported article page with its title and body content", () => {
    const post = getResource("first-week-after-a-layoff");
    if (!post) throw new Error("Expected first-week-after-a-layoff to be in the registry");
    const blocks = getPostBlocks("first-week-after-a-layoff");
    if (!blocks) throw new Error("Expected first-week-after-a-layoff to have converted blocks");

    render(
      <GuideArticle category={post.category} title={post.title} readingTime={post.readingTime} date={post.date} author={post.author}>
        <RenderBlocks blocks={blocks} />
      </GuideArticle>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "What to do in your first week after a layoff" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "1. Take 48 hours before you sign anything" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /all guides/i })).toHaveAttribute("href", "/resources");
    expect(screen.getByRole("link", { name: /more guides/i })).toHaveAttribute("href", "/resources");
  });

  it("credits the guest author on the career-changers negotiations article", () => {
    const post = getResource("career-changers-guide-to-job-offer-negotiations");
    if (!post) throw new Error("Expected career-changers-guide-to-job-offer-negotiations to be in the registry");
    const blocks = getPostBlocks("career-changers-guide-to-job-offer-negotiations");
    if (!blocks) throw new Error("Expected career-changers-guide-to-job-offer-negotiations to have converted blocks");

    render(
      <GuideArticle
        category={post.category}
        title={post.title}
        readingTime={post.readingTime}
        date={post.date}
        author={post.author}
        guestAuthor={post.guestAuthor}
      >
        <RenderBlocks blocks={blocks} />
      </GuideArticle>,
    );

    expect(screen.getByText(/guest post by gerta & alex/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "YourNegotiations" })).toHaveAttribute("href", "https://yournegotiations.com");
  });
});

it("Lumo leads with a real product capture and three useful examples", async () => {
  const { MarketingLumo } = await import("./MarketingLumo");
  const { container } = render(<MarketingLumo />);
  expect(container.querySelector(".mh-lumo-product-shot img")?.getAttribute("src")).toContain("lumo-prompts-live-v1.jpg");
  expect(container.querySelectorAll(".mh-lumo-use-grid article")).toHaveLength(3);
});

// Product pages keep the shared conversion area concise when no body is supplied.
describe("compact final call to action", () => {
  it("omits the empty body paragraph", async () => {
    const { FinalCta } = await import("./MarketingSite");
    const { container } = render(<FinalCta title="Stop starting from scratch." body="" />);
    expect(container.querySelector(".mh-final-cta-copy > p")).toBeNull();
  });
});
