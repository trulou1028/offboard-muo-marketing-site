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
    expect(screen.getByRole("link", { name: /say hello/i })).toHaveAttribute("href", "/intake");
    expect(screen.getByRole("link", { name: /join the slack/i })).toHaveAttribute("href", "https://offboard.co/community");
    expect(screen.getByRole("heading", { name: /you don't need another place to start over/i })).toBeInTheDocument();

    // The three steps are the page's spine, and each one links to the section
    // that expands it. A broken anchor here silently strands the reader.
    for (const [label, href] of [
      ["Build your context", "#build"],
      ["See the connection", "#connect"],
      ["See the toolkit", "#run"],
    ] as const) {
      expect(screen.getByRole("link", { name: new RegExp(label, "i") })).toHaveAttribute("href", href);
    }
    for (const id of ["build", "connect", "run"]) {
      expect(document.getElementById(id), `#${id} is a real section`).not.toBeNull();
    }

    // DESIGN.md R3, the defect this rebuild exists to fix: Career Context was
    // pitched in three sections with three filled buttons. Exactly one now.
    expect(screen.getAllByRole("link", { name: /(build|create) my career context/i })).toHaveLength(1);

    // The ledger row "Live integrations" governs every mention of the ChatGPT
    // and Claude connections on this page: they ship labelled beta.
    expect(within(screen.getByRole("main")).getByText(/ChatGPT and Claude connections are in beta/i)).toBeInTheDocument();

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
    const questions = Array.from(document.querySelectorAll(".mh-morethan details"));
    expect(questions).toHaveLength(6);
    expect(questions.filter((item) => item.hasAttribute("open"))).toHaveLength(1);
    expect(questions[0].querySelector("summary")?.textContent).toBe("What do I do first?");

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

    // Independence disclaimer: benefits section small print + footer.
    expect(screen.getAllByText(/not a government agency/i).length).toBeGreaterThanOrEqual(2);
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
      ["Offboard Everywhere", "/integrations"],
      ["Job Search", "/job-search"],
      ["Layoff & Benefits", "/layoff-support"],
      ["For Employers", "/employers"],
      ["Pricing", "/pricing"],
      ["Guides", "/resources"],
      ["Privacy & Security", "/privacy-security"],
      ["About", "/about"],
      ["Visit Us", "/intake"],
      ["The Offboard Newsletter", "https://newsletter.offboard.co"],
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

  it("gives how it works the homepage's four steps, in order, with the toolkit and Lumo", () => {
    render(<MarketingHowItWorks />);

    // Plan 044: the long form of the homepage's four steps, same kickers.
    expect(screen.getByRole("heading", { level: 1, name: "One system that starts where you are." })).toBeInTheDocument();
    expect(screen.getByText("Your Career Context is the spine. The tools are the muscle.")).toBeInTheDocument();
    const kickers = ["Step 1 · Steady the first week", "Step 2 · Build your Career Context", "Step 3 · Connect it to the AI you use", "Step 4 · Run your search"];
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
    expect(screen.getAllByRole("link", { name: /talk about sponsored access/i })[0]).toHaveAttribute("href", expect.stringContaining("Employer%20support"));
    expect(screen.getByRole("link", { name: /post a role/i })).toHaveAttribute("href", expect.stringContaining("intent=recruit"));
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

  it("keeps every route out of search indexes while the site is pre-launch", () => {
    // Every page.tsx used to repeat this string in its own metadata export;
    // it now lives once on the root layout and every route inherits it, so
    // this asserts the single source of truth rather than 8 hand-copied ones.
    expect(layoutMetadata.robots).toBe("noindex, nofollow, noarchive");
  });

  it("keeps the deferred routes noindexed by their own metadata, not the layout's", () => {
    // The operator flips the layout value at cutover; these eight pages have
    // to stay hidden through that. Asserting the distinct DEFERRED_ROBOTS
    // string (not merely "is it noindexed") is what makes this fail if a
    // page loses its override and silently falls back to the layout.
    expect(DEFERRED_ROBOTS).not.toBe(layoutMetadata.robots);
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
    render(<MarketingResources sections={buildResourceSections()} />);

    expect(screen.getByRole("heading", { level: 1, name: "Guides & resources" })).toBeInTheDocument();
    expect(screen.getByText(/reported essays, practical guides/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Guides" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "AI & Technology" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What to do in your first week after a layoff" })).toBeInTheDocument();

    const guideLink = screen.getAllByRole("link", { name: /read the guide/i })[0];
    expect(guideLink).toHaveAttribute("href", "/resources/first-week-after-a-layoff");
    expect(screen.queryByText(/https:\/\/offboard\.co\/resources/)).not.toBeInTheDocument();
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
