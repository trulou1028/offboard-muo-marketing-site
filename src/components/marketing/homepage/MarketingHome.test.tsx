import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from "vitest";

import { metadata } from "@/app/page";

import MarketingHome from "./MarketingHome";

describe("MarketingHome", () => {
  let fetchSpy: MockInstance<typeof globalThis.fetch>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 200 }));
  });

  afterEach(() => fetchSpy.mockRestore());

  it("renders the Paper full-rewrite narrative and remains backend-free", () => {
    render(<MarketingHome />);

    expect(screen.getByRole("heading", { level: 1, name: "The Modern Unemployment Office" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A layoff gives you three jobs at once." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Know what deserves attention before it becomes urgent." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Find support you may qualify for before deadlines pass." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Run your search as one connected system." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Your transition is yours." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Start with the next right step." })).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("keeps the three jobs clear and scannable", () => {
    render(<MarketingHome />);

    ["Protect your runway", "Find available support", "Find what comes next"].forEach((title) => {
      expect(screen.getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
    });
    expect(screen.getByRole("img", { name: /desk scene representing financial planning/i })).toBeInTheDocument();
    expect(screen.getAllByText(/official source/i).length).toBeGreaterThanOrEqual(4);
  });

  it("shows the latest visual onboarding and fragmentation scenes", () => {
    render(<MarketingHome />);

    expect(screen.getByRole("img", { name: /layered collage of the disconnected tools/i })).toBeInTheDocument();
    expect(screen.getByLabelText("An abstracted preview of Offboard onboarding")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Where are you right now?" })).toBeInTheDocument();
    expect(screen.getByText("I was just laid off")).toBeInTheDocument();
    expect(screen.getByText("I know what I need")).toBeInTheDocument();
  });

  it("routes plan CTAs to the Offboard app and human support to intake", () => {
    render(<MarketingHome />);

    const appLinks = screen.getAllByRole("link").filter((link) =>
      link.getAttribute("href") === "https://app.offboard.co/auth?tab=signup",
    );
    expect(appLinks.length).toBeGreaterThanOrEqual(7);
    expect(screen.getByRole("link", { name: "Talk to someone" })).toHaveAttribute("href", "https://offboard.co/intake");
    expect(screen.getByRole("link", { name: "Talk to a person" })).toHaveAttribute("href", "https://offboard.co/intake");
  });

  it("switches the connected-search scene without losing its role context", () => {
    render(<MarketingHome />);

    const tabs = screen.getByRole("tablist", { name: "Job search stages" });
    const interview = within(tabs).getByRole("tab", { name: "04Interview" });
    fireEvent.click(interview);

    expect(interview).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("heading", { name: "Walk in knowing what to practice." })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Role-specific interview preparation in Offboard" })).toBeInTheDocument();
    expect(screen.getByText("Ask Lumo with this role attached")).toBeInTheDocument();
  });

  it("states independence, eligibility boundaries, privacy, and sponsorship terms", () => {
    render(<MarketingHome />);

    expect(screen.getAllByText(/not a government agency/i).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/agency or provider responsible for each program/i)).toBeInTheDocument();
    expect(screen.getByText(/we do not sell personal information for money/i)).toBeInTheDocument();
    expect(screen.getByText(/what that sponsor can and cannot see before you enroll/i)).toBeInTheDocument();
    expect(screen.queryByText(/guaranteed eligibility|guaranteed placement/i)).not.toBeInTheDocument();
  });

  it("includes the nine questions from the Paper artboard", () => {
    render(<MarketingHome />);

    [
      "Is Offboard part of the government?",
      "Can Offboard tell me whether I qualify for benefits?",
      "Is Offboard only for people in tech?",
      "Can I use Offboard without an employer sponsor?",
      "Can my former employer see my information?",
      "Can I speak with a person?",
      "What if I only need help with one part of my transition?",
      "Does Offboard guarantee benefits, interviews, offers, or placement?",
      "How is Lumo different from a general AI assistant?",
    ].forEach((question) => expect(screen.getByRole("heading", { level: 3, name: question })).toBeInTheDocument());
  });

  it("keeps the prototype out of search indexes", () => {
    expect(metadata.robots).toBe("noindex, nofollow, noarchive");
    expect(metadata.title).toBe("Offboard | The modern unemployment office");
    expect(metadata.description).toBe("A private, practical plan for benefits, funded training, and the job search after a layoff.");
  });
});
