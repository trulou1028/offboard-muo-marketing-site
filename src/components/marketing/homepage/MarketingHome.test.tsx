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
    expect(screen.getByRole("img", { name: "Snowflake" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "General Motors" })).toBeInTheDocument();
    expect(screen.getByText(/5,000\+ readers/)).toBeInTheDocument();
    expect(screen.queryByText(/8,000\+/)).not.toBeInTheDocument();
    expect(screen.getByText("30 monthly credits")).toBeInTheDocument();
    expect(screen.getByText("Three daily LUMO messages")).toBeInTheDocument();
    expect(screen.getByText("300 monthly credits")).toBeInTheDocument();
    expect(screen.getByText("Unlimited LUMO")).toBeInTheDocument();
    expect(screen.getAllByText(/government agency/i).length).toBeGreaterThanOrEqual(3);
    expect(screen.getByText(/not affiliated with, endorsed by, or acting on behalf of any government agency/i)).toBeInTheDocument();
    expect(screen.queryByText(/rated 4\.8|12\.7k reviews|daily signups|partner communities/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/free pro trial|try pro free/i)).not.toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("tells one step framework, not three", () => {
    renderHomepage();

    expect(screen.getByRole("heading", { name: /your next steps, in the right order/i })).toBeInTheDocument();
    expect(screen.getByText("Tell us what happened")).toBeInTheDocument();
    expect(screen.getByText("See what matters first")).toBeInTheDocument();
    expect(screen.getByText("Work the plan")).toBeInTheDocument();

    // Retired frameworks must not resurface alongside the canonical steps.
    expect(screen.queryByText(/a simple framework for moving forward/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /^know\.$/i })).not.toBeInTheDocument();
    expect(screen.queryByText("You tell us what happened")).not.toBeInTheDocument();
    expect(screen.queryByText("We verify what applies")).not.toBeInTheDocument();
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

    const heroImage = screen.getByRole("img", { name: /beginning the next chapter after a job loss/i });
    expect(heroImage).toBeInTheDocument();
    expect(heroImage.parentElement).toHaveClass("mh-hero-media");
    expect(container.querySelector(".mh-hero-media .mh-card")).not.toBeInTheDocument();
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

  it("sells the full toolkit with nine bento cards", () => {
    renderHomepage();

    const bento = screen.getByLabelText("What Offboard gives you for the job search");
    expect(screen.getByRole("heading", { name: /stop rebuilding your application for every role/i })).toBeInTheDocument();

    ["One link becomes an application",
     "Walk in with the questions already answered",
     "Know if the job is even real",
     "One master resume, tailored per role",
     "Every role in one place",
     "Paperwork review",
     "Runway calculator",
     "Funded training explorer",
     "Ask LUMO"].forEach((title) => {
      expect(within(bento).getByRole("heading", { name: title })).toBeInTheDocument();
    });

    // Compliance register on the money tools: understand before signing; agency decides.
    expect(within(bento).getByText(/before you sign/i)).toBeInTheDocument();
    expect(within(bento).getByText(/the agency decides/i)).toBeInTheDocument();
  });

  it("offers the community: newsletter, Slack, and a human", () => {
    renderHomepage();

    expect(screen.getByRole("heading", { name: /real people, in it with you/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /subscribe free/i })).toHaveAttribute("href", "https://newsletter.offboard.co");
    expect(screen.getByRole("link", { name: /join the slack/i })).toHaveAttribute("href", expect.stringContaining("join.slack.com/t/offboardco"));
    expect(screen.getByRole("link", { name: /meet with a human/i })).toHaveAttribute("href", "https://offboard.co/intake");
  });

  it("never claims the Job Packet produces an interview briefing", () => {
    renderHomepage();

    // The shipped packet pipeline ends at Path to a Person; briefings generate on
    // the Interview record. Guards the fixture against regressing.
    const bento = screen.getByLabelText("What Offboard gives you for the job search");
    expect(within(bento).getByText("Path to a person")).toBeInTheDocument();
    expect(within(bento).queryByText(/interview briefing/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ghost check, research, resume, and briefing/i)).not.toBeInTheDocument();
  });

  it("answers who can see a member's information", () => {
    renderHomepage();

    const privacy = screen.getByLabelText("What stays private and who can see it");
    expect(within(privacy).getByText("What you share")).toBeInTheDocument();
    expect(within(privacy).getByText("Who can see it")).toBeInTheDocument();
    expect(within(privacy).getByText("Only you.")).toBeInTheDocument();
    expect(within(privacy).getByText("What a sponsor sees")).toBeInTheDocument();
    expect(within(privacy).getByText("48 people")).toBeInTheDocument();
    expect(within(privacy).getByText(/no names, documents, conversations, or individual behaviour/i)).toBeInTheDocument();

    // The source-transparency argument belongs to the Benefits section, not here.
    expect(within(privacy).queryByText(/official source/i)).not.toBeInTheDocument();
  });

  it("renders the abstract product scenes with their compliance labels", () => {
    renderHomepage();

    expect(screen.getByLabelText("Illustrative California benefits summary")).toBeInTheDocument();
    expect(screen.getByLabelText("Interactive seven-stage Offboard path")).toBeInTheDocument();
    expect(screen.getByLabelText("What Offboard gives you for the job search")).toBeInTheDocument();
    expect(screen.getByLabelText("What stays private and who can see it")).toBeInTheDocument();
    expect(screen.getAllByText("Illustrative").length).toBeGreaterThanOrEqual(1);
  });

  it("renders Maya's walkthrough as a timeline, not a testimonial", () => {
    const { container } = renderHomepage();

    expect(screen.getByRole("heading", { name: /know what to do today, what can wait, and what comes next/i })).toBeInTheDocument();
    expect(screen.getByText(/an illustrative walkthrough, not a member testimonial/i)).toBeInTheDocument();
    expect(screen.getByText("Claim filed")).toBeInTheDocument();
    expect(screen.getByText("Training deadline protected")).toBeInTheDocument();
    expect(screen.getByText("First Job Packet created")).toBeInTheDocument();
    expect(container.querySelector(".mh-customer-story blockquote")).toBeNull();
  });

  it("closes on the transformation, not a slogan", () => {
    renderHomepage();

    expect(screen.getByRole("heading", { name: /turn uncertainty into a clear plan/i })).toBeInTheDocument();
    expect(screen.getByText(/take each next step with confidence/i)).toBeInTheDocument();
    expect(screen.queryByText(/know sooner\. move forward/i)).not.toBeInTheDocument();
  });

  it("gives the Pro plan its own CTA", () => {
    renderHomepage();

    const proCta = screen.getByRole("link", { name: /choose pro/i });
    expect(proCta).toHaveAttribute("href", "https://app.offboard.co/auth?tab=signup");
  });
});
