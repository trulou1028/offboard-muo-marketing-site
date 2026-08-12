import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from "vitest";

import { metadata } from "@/app/page";

import MarketingHome from "./MarketingHome";

function renderHomepage() {
  return render(<MarketingHome />);
}

describe("MarketingHome", () => {
  let fetchSpy: MockInstance<typeof globalThis.fetch>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 200 }));
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it("renders the mixed-media story, current pricing, honest proof, and independence language", () => {
    renderHomepage();

    expect(screen.getByRole("heading", { level: 1, name: /the modern unemployment office/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /see what you may qualify for before important deadlines pass/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /tell us once.*never start from scratch again/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /private by default\. yours to keep/i })).toBeInTheDocument();
    expect(screen.getByText("Our members come from teams at")).toBeInTheDocument();
    expect(screen.getByText("Snowflake")).toBeInTheDocument();
    expect(screen.getByText("Starbucks")).toBeInTheDocument();
    expect(screen.queryByText("General Motors")).not.toBeInTheDocument();
    expect(screen.getByText(/more than 5,000 people/i)).toBeInTheDocument();
    expect(screen.queryByText(/8,000\+/)).not.toBeInTheDocument();
    expect(screen.getByText("Navigator · First Application Packet · 30 credits · Daily LUMO")).toBeInTheDocument();
    expect(screen.getByText(/everything in free.*300 credits.*unlimited lumo/i)).toBeInTheDocument();
    expect(screen.getAllByText(/government agency/i).length).toBeGreaterThanOrEqual(3);
    expect(screen.getByText(/not affiliated with, endorsed by, or acting on behalf of any government agency/i)).toBeInTheDocument();
    expect(screen.queryByText(/rated 4\.8|12\.7k reviews|daily signups|partner communities/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/free pro trial|try pro free/i)).not.toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("opens with the functional promise and the honest trust line", () => {
    renderHomepage();

    expect(
      screen.getByText(/everything you need after a layoff, organized into one clear plan/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/know what you're eligible for, what matters now, and what to do next/i)).toBeInTheDocument();
    expect(
      screen.getByText("Private by default. Independent of government agencies. No credit card required."),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see how it works/i })).toHaveAttribute("href", "#how-it-works");
  });

  it("reframes overwhelm into a clear plan with three steps", () => {
    renderHomepage();

    expect(screen.getByRole("heading", { name: /your next steps, in the right order/i })).toBeInTheDocument();
    expect(screen.getByText(/i just lost my job\. what the hell do i do\?/i)).toBeInTheDocument();
    expect(screen.getByText(/i know exactly what matters today, this week, and next/i)).toBeInTheDocument();
    expect(screen.getByText("Understand where you stand")).toBeInTheDocument();
    expect(screen.getByText("Build your plan")).toBeInTheDocument();
    expect(screen.getByText("Move forward")).toBeInTheDocument();

    // Retired step frameworks must not resurface alongside the canonical steps.
    expect(screen.queryByText("Tell us what happened")).not.toBeInTheDocument();
    expect(screen.queryByText("See what matters first")).not.toBeInTheDocument();
    expect(screen.queryByText("Work the plan")).not.toBeInTheDocument();
    expect(screen.queryByText(/a simple framework for moving forward/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /^know\.$/i })).not.toBeInTheDocument();
  });

  it("keeps member-facing vocabulary: no layoff plan", () => {
    renderHomepage();

    expect(screen.queryByText(/layoff plan/i)).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /start free\. add more support when you need it/i })).toBeInTheDocument();
  });

  it("keeps the prototype out of search indexes", () => {
    // With the Next Metadata API the head is rendered by the framework layer,
    // not the component — assert on the declared source of truth. The rendered
    // meta tag itself is covered end-to-end by e2e/homepage.spec.ts.
    expect(metadata.robots).toBe("noindex, nofollow, noarchive");
    expect(metadata.title).toBe("Offboard | The modern unemployment office");
    expect(metadata.description).toBe(
      "A private, practical plan for benefits, funded training, and the job search after a layoff.",
    );
  });

  it("keeps the emotional hero photography unobstructed", () => {
    const { container } = renderHomepage();

    const heroImage = screen.getByRole("img", { name: /at her desk by the window.*after a job loss/i });
    expect(heroImage).toBeInTheDocument();
    expect(heroImage.parentElement).toHaveClass("mh-hero-media");
    expect(container.querySelector(".mh-hero-media .mh-card")).not.toBeInTheDocument();

    // Torn-paper collage accents are decoration: hidden from assistive tech.
    const collage = container.querySelectorAll(".mh-hero-collage");
    expect(collage.length).toBeGreaterThanOrEqual(3);
    collage.forEach((scrap) => {
      expect(scrap).toHaveAttribute("aria-hidden", "true");
      expect(scrap).toHaveAttribute("alt", "");
    });
  });

  it("keeps every primary CTA portable to the app domain", () => {
    renderHomepage();

    const ctas = screen.getAllByRole("link", { name: /build my free plan/i });
    expect(ctas.length).toBeGreaterThanOrEqual(4);
    ctas.forEach((cta) => {
      expect(cta).toHaveAttribute("href", "https://app.offboard.co/auth?tab=signup");
    });
  });

  it("explains illustrative benefit matches without implying eligibility", () => {
    renderHomepage();

    const disclosure = screen.getByRole("button", { name: /what.*possible match.*means/i });
    expect(disclosure).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(disclosure);

    expect(disclosure).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("status")).toHaveTextContent(/agency decides eligibility and funding/i);
  });

  it("updates the sample path and supports arrow-key tab navigation", async () => {
    renderHomepage();

    const pathTabs = screen.getByRole("tablist", { name: /choose a stage/i });
    const firstTab = within(pathTabs).getByRole("tab", { name: /protect the first week/i });
    firstTab.focus();
    fireEvent.keyDown(firstTab, { key: "ArrowRight" });

    await waitFor(() => expect(within(pathTabs).getByRole("tab", { name: /steady yourself/i })).toHaveFocus());
    expect(screen.getByRole("heading", { name: "Where am I, honestly?" })).toBeInTheDocument();

    fireEvent.keyDown(within(pathTabs).getByRole("tab", { name: /steady yourself/i }), { key: "End" });
    await waitFor(() => expect(within(pathTabs).getByRole("tab", { name: /land.*give back/i })).toHaveFocus());

    fireEvent.keyDown(within(pathTabs).getByRole("tab", { name: /land.*give back/i }), { key: "Home" });
    await waitFor(() => expect(firstTab).toHaveFocus());

    fireEvent.click(within(pathTabs).getByRole("tab", { name: /choose your path/i }));
    expect(screen.getByRole("heading", { name: "Which direction is mine?" })).toBeInTheDocument();
    expect(screen.getByText("Review funded training")).toBeInTheDocument();
    expect(screen.getByText(/suggested route, not a gate/i)).toBeInTheDocument();
  });

  it("connects everything through one understanding of you", () => {
    renderHomepage();

    expect(screen.getByRole("heading", { name: /tell us once\. never start from scratch again/i })).toBeInTheDocument();
    expect(screen.getByText(/everything works from the same understanding of you/i)).toBeInTheDocument();

    const diagram = screen.getByLabelText("How your information powers everything");
    expect(within(diagram).getByText("You + your information")).toBeInTheDocument();
    expect(within(diagram).getByText("Career plan")).toBeInTheDocument();
    expect(within(diagram).getByText("Job search")).toBeInTheDocument();
    expect(within(diagram).getByText("Support")).toBeInTheDocument();
  });

  it("lists six capabilities, one line each", () => {
    renderHomepage();

    const section = screen.getByLabelText(/everything you need to move forward/i);
    const items = within(section).getAllByRole("heading", { level: 3 });
    expect(items.map((h) => h.textContent)).toEqual([
      "Know what you're eligible for",
      "Build stronger applications",
      "Stay organized",
      "Prepare for interviews",
      "Know what comes next",
      "Get human support",
    ]);
  });

  it("shows one connected toolkit category at a time", () => {
    renderHomepage();

    const toolkit = screen.getByLabelText("Connected job-search toolkit");
    const tabs = within(toolkit).getByRole("tablist", { name: /choose a toolkit category/i });
    const categoryTabs = within(tabs).getAllByRole("tab");

    expect(screen.getByRole("heading", { name: /every part of your search, connected/i })).toBeInTheDocument();
    expect(screen.getByText(/build the packet, tailor the resume, track the application/i)).toBeInTheDocument();
    expect(categoryTabs).toHaveLength(4);
    expect(categoryTabs.map((tab) => tab.getAttribute("aria-label"))).toEqual([
      "Job Packets",
      "Resumes",
      "Applications",
      "Interviews",
    ]);
    expect(categoryTabs[0]).toHaveAttribute("aria-selected", "true");
    expect(within(toolkit).getByRole("img", { name: /your job packet/i })).toBeInTheDocument();
    expect(within(toolkit).getByText("LUMO keeps this role in context")).toBeInTheDocument();
    expect(within(toolkit).getByRole("link", { name: /build my first job packet/i })).toHaveAttribute(
      "href",
      "https://app.offboard.co/auth?tab=signup",
    );

    ["Paperwork review", "Runway calculator", "Funded training explorer", "Know if the job is even real"].forEach((title) => {
      expect(within(toolkit).queryByText(title)).not.toBeInTheDocument();
    });
  });

  it("updates toolkit scenes, CTAs, and LUMO guidance with accessible keyboard navigation", async () => {
    renderHomepage();

    const toolkit = screen.getByLabelText("Connected job-search toolkit");
    const tabs = within(toolkit).getByRole("tablist", { name: /choose a toolkit category/i });
    const packetsTab = within(tabs).getByRole("tab", { name: "Job Packets" });
    const resumesTab = within(tabs).getByRole("tab", { name: "Resumes" });
    const applicationsTab = within(tabs).getByRole("tab", { name: "Applications" });
    const interviewsTab = within(tabs).getByRole("tab", { name: "Interviews" });

    packetsTab.focus();
    fireEvent.keyDown(packetsTab, { key: "ArrowRight" });
    await waitFor(() => expect(resumesTab).toHaveFocus());
    expect(resumesTab).toHaveAttribute("aria-selected", "true");
    expect(within(toolkit).getByRole("img", { name: /review the northstar version/i })).toBeInTheDocument();
    expect(within(toolkit).getByText(/strongest evidence is the system work/i)).toBeInTheDocument();
    expect(within(toolkit).getByRole("link", { name: /create my resume/i })).toHaveAttribute(
      "href",
      "https://app.offboard.co/auth?tab=signup",
    );

    fireEvent.click(applicationsTab);
    expect(within(toolkit).getByRole("img", { name: /prepare for the interview/i })).toBeInTheDocument();
    expect(within(toolkit).getByRole("link", { name: /track my applications/i })).toHaveAttribute(
      "href",
      "https://app.offboard.co/auth?tab=signup",
    );

    fireEvent.click(resumesTab);
    resumesTab.focus();
    fireEvent.keyDown(resumesTab, { key: "End" });
    await waitFor(() => expect(interviewsTab).toHaveFocus());
    expect(within(toolkit).getByRole("img", { name: /northstar interview/i })).toBeInTheDocument();
    expect(within(toolkit).getByRole("img", { name: /start interview practice/i })).toBeInTheDocument();
    expect(within(toolkit).getByText(/lead with the launch you owned/i)).toBeInTheDocument();
    expect(within(toolkit).getByRole("link", { name: /prepare for an interview/i })).toHaveAttribute(
      "href",
      "https://app.offboard.co/auth?tab=signup",
    );

    fireEvent.keyDown(interviewsTab, { key: "Home" });
    await waitFor(() => expect(packetsTab).toHaveFocus());
    expect(within(toolkit).getByRole("img", { name: /your job packet/i })).toBeInTheDocument();
  });

  it("shows only verifiable proof and labels the illustrative quote", () => {
    renderHomepage();

    const proof = screen.getByLabelText(/thousands of job seekers shouldn't have to figure unemployment out alone/i);
    expect(within(proof).getByText("5,000+")).toBeInTheDocument();
    expect(within(proof).getByText(/read the offboard newsletter/i)).toBeInTheDocument();
    expect(within(proof).getByText("An illustrative member quote, not a testimonial")).toBeInTheDocument();
    expect(within(proof).getByRole("link", { name: /build my free plan/i })).toHaveAttribute(
      "href",
      "https://app.offboard.co/auth?tab=signup",
    );

    // No invented product metrics: the only number in the proof section is the
    // verifiable newsletter readership.
    expect(within(proof).queryByText(/members|applications created|interviews landed/i)).not.toBeInTheDocument();
  });

  it("itemizes the seven things included in your Offboard", () => {
    renderHomepage();

    const included = screen.getByLabelText(/everything in your offboard/i);
    const titles = within(included).getAllByRole("listitem").map((li) => li.querySelector("strong")?.textContent);
    expect(titles).toEqual([
      "Your personalized plan",
      "Benefits and deadlines",
      "Job search workspace",
      "Application support",
      "Interview preparation",
      "Community and human support",
      "Your information and history",
    ]);
  });

  it("compares on your own, point solutions, and Offboard honestly", () => {
    renderHomepage();

    expect(screen.getByRole("heading", { name: /you can do this yourself\. you shouldn't have to/i })).toBeInTheDocument();

    const table = screen.getByRole("table", { name: /on your own.*point solutions.*offboard/i });
    const columnHeaders = within(table).getAllByRole("columnheader").map((th) => th.textContent);
    expect(columnHeaders).toEqual(["What you need", "On your own", "Point solutions", "Offboard"]);

    const rowHeaders = within(table).getAllByRole("rowheader").map((th) => th.textContent);
    expect(rowHeaders).toEqual([
      "Benefits and deadlines",
      "Personalized next steps",
      "Application support",
      "Job search organization",
      "Ongoing guidance",
      "Human and community support",
    ]);

    // Honest comparison: not every competitor cell is a red X.
    expect(within(table).getAllByText("Included").length).toBeGreaterThan(6);
    expect(within(table).getAllByText("Partial").length).toBeGreaterThanOrEqual(4);
  });

  it("answers the eight objection-killing FAQs without overpromising", () => {
    renderHomepage();

    [
      "Is Offboard a government agency?",
      "Is this only for people who were laid off?",
      "Can I use Offboard if my employer didn't provide it?",
      "What does Offboard actually help with?",
      "How much does it cost?",
      "What happens to my personal information?",
      "Do I have to use everything?",
      "Can I cancel anytime?",
    ].forEach((question) => {
      expect(screen.getByText(question)).toBeInTheDocument();
    });

    expect(screen.getByText(/government agencies decide eligibility and pay benefits/i)).toBeInTheDocument();
    expect(screen.getByText(/your workspace, documents, and history stay yours/i)).toBeInTheDocument();
    // Cancellation copy must not promise refunds.
    expect(screen.queryByText(/refund/i)).not.toBeInTheDocument();
  });

  it("walks through life after a layoff as photography, not UI", () => {
    renderHomepage();

    const strip = screen.getByLabelText("Life after a layoff, in real moments");
    const photos = within(strip).getAllByRole("img");
    expect(photos).toHaveLength(5);
    photos.forEach((photo) => {
      expect(photo).toHaveAttribute("loading", "lazy");
      expect(photo.getAttribute("alt")).toBeTruthy();
    });

    // The emotional payoff stays free of product chrome.
    expect(within(strip).queryByRole("heading")).not.toBeInTheDocument();
    expect(within(strip).queryByRole("link")).not.toBeInTheDocument();
    expect(within(strip).queryByRole("button")).not.toBeInTheDocument();
  });

  it("offers the community: newsletter, Slack, and a human", () => {
    renderHomepage();

    expect(screen.getByRole("heading", { name: /real people, in it with you/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /subscribe free/i })).toHaveAttribute("href", "https://newsletter.offboard.co");
    expect(screen.getByRole("link", { name: /join the slack/i })).toHaveAttribute("href", expect.stringContaining("join.slack.com/t/offboardco"));
    expect(screen.getByRole("link", { name: /meet with a human/i })).toHaveAttribute("href", "https://offboard.co/intake");
  });

  it("keeps interview preparation separate from the Job Packet", () => {
    renderHomepage();

    // The shipped packet pipeline ends at Path to a Person; briefings generate on
    // the Interview record. Guards the fixture against regressing.
    const toolkit = screen.getByLabelText("Connected job-search toolkit");
    expect(within(toolkit).getByRole("img", { name: /understand the role.*build your materials.*find your way in/i })).toBeInTheDocument();
    expect(within(toolkit).queryByText(/interview briefing/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ghost check, research, resume, and briefing/i)).not.toBeInTheDocument();
  });

  it("answers who can see a member's information", () => {
    renderHomepage();

    const privacy = screen.getByLabelText("What stays private and who can see it");
    expect(within(privacy).getByText("Only you.")).toBeInTheDocument();
    expect(within(privacy).getByRole("img", { name: /personal information.*private sleeve.*sponsor sees anonymous activation totals/i })).toBeInTheDocument();
    expect(within(privacy).getByText(/never names, documents, or conversations/i)).toBeInTheDocument();

    // The source-transparency argument belongs to the Benefits section, not here.
    expect(within(privacy).queryByText(/official source/i)).not.toBeInTheDocument();
  });

  it("renders the generated product scenes with accessible descriptions", () => {
    renderHomepage();

    expect(screen.getByLabelText("Illustrative California benefits summary")).toBeInTheDocument();
    expect(screen.getByLabelText("Interactive seven-stage Offboard path")).toBeInTheDocument();
    expect(screen.getByLabelText("Connected job-search toolkit")).toBeInTheDocument();
    expect(screen.getByLabelText("What stays private and who can see it")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /benefits illustration showing california training benefits/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /seven-stage offboard path illustration/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /privacy illustration showing personal information/i })).toBeInTheDocument();
  });

  it("renders Maya's walkthrough as a timeline, not a testimonial", () => {
    const { container } = renderHomepage();

    expect(screen.getByRole("heading", { name: /know what to do today, what can wait, and what comes next/i })).toBeInTheDocument();
    expect(screen.getByText(/an illustrative walkthrough, not a member testimonial/i)).toBeInTheDocument();
    expect(screen.getByText("Claim filed")).toBeInTheDocument();
    expect(screen.getByText("Training deadline protected")).toBeInTheDocument();
    expect(screen.getByText("First Application Packet created")).toBeInTheDocument();
    expect(container.querySelector(".mh-customer-story blockquote")).toBeNull();
  });

  it("closes on the transformation, not a slogan", () => {
    renderHomepage();

    expect(screen.getByRole("heading", { name: /turn uncertainty into a clear plan/i })).toBeInTheDocument();
    expect(screen.getByText(/take each next step with confidence/i)).toBeInTheDocument();
    expect(screen.queryByText(/know sooner\. move forward/i)).not.toBeInTheDocument();
  });

  it("gives the Plus plan its own CTA", () => {
    renderHomepage();

    const plusCta = screen.getByRole("link", { name: /choose plus/i });
    expect(plusCta).toHaveAttribute("href", "https://app.offboard.co/auth?tab=signup");
  });
});
