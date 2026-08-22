import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from "vitest";

import { metadata as aboutMetadata } from "@/app/about/page";
import { metadata as employerMetadata } from "@/app/employers/page";
import { metadata as howMetadata } from "@/app/how-it-works/page";
import { metadata as homeMetadata } from "@/app/page";
import { metadata as pricingMetadata } from "@/app/pricing/page";
import { metadata as publicPartnerMetadata } from "@/app/public-partners/page";

import MarketingHome from "./MarketingHome";
import {
  MarketingAbout,
  MarketingEmployers,
  MarketingHowItWorks,
  MarketingPricing,
  MarketingPublicPartners,
} from "./MarketingRoutePages";

describe("Offboard marketing routes", () => {
  let fetchSpy: MockInstance<typeof globalThis.fetch>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 200 }));
  });

  afterEach(() => fetchSpy.mockRestore());

  it("keeps the homepage focused on what Offboard does and who it serves", () => {
    render(<MarketingHome />);

    expect(screen.getByRole("heading", { level: 1, name: "The Modern Unemployment Office" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /most people find out what they were entitled to/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A layoff gives you three jobs at once." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /\$12,000/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /one place for the decisions/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /checked by people, never generated/i })).toBeInTheDocument();
    expect(screen.getByText("$0 forever")).toBeInTheDocument();
    expect(screen.getByText("$20/month")).toBeInTheDocument();
    expect(screen.getByText(/5,000\+ subscribers/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /find out first/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Where are you right now?" })).not.toBeInTheDocument();
    expect(screen.queryByRole("tablist", { name: "Job search stages" })).not.toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("uses real routes for product, company, and partner navigation", () => {
    render(<MarketingHome />);

    expect(screen.getAllByRole("link", { name: "How it works" })[0]).toHaveAttribute("href", "/how-it-works");
    expect(screen.getAllByRole("link", { name: "Pricing" })[0]).toHaveAttribute("href", "/pricing");
    expect(screen.getAllByRole("link", { name: "About" })[0]).toHaveAttribute("href", "/about");
    expect(screen.getAllByRole("link", { name: "For employers" })[0]).toHaveAttribute("href", "/employers");
    expect(screen.getAllByRole("link", { name: "For public partners" })[0]).toHaveAttribute("href", "/public-partners");
  });

  it("moves the detailed product journey to how it works", () => {
    render(<MarketingHowItWorks />);

    expect(screen.getByRole("heading", { level: 1, name: "Start with your situation. Build from there." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Every part of unemployment lives somewhere else." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Where are you right now?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Know what deserves attention before it becomes urgent." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Find support you may qualify for before deadlines pass." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Run your search as one connected system." })).toBeInTheDocument();

    const tabs = screen.getByRole("tablist", { name: "Job search stages" });
    const interview = within(tabs).getByRole("tab", { name: "04Interview" });
    fireEvent.click(interview);
    expect(interview).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("heading", { name: "Walk in knowing what to practice." })).toBeInTheDocument();
  });

  it("gives pricing a dedicated evaluation page", () => {
    render(<MarketingPricing />);

    expect(screen.getByRole("heading", { level: 1, name: /begin with a plan/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /start free.*more support/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Do I need a payment method to start?" })).toBeInTheDocument();
    expect(screen.getByText(/shows the price and what is included before you buy/i)).toBeInTheDocument();
  });

  it("separates the company story from member conversion", () => {
    render(<MarketingAbout />);

    expect(screen.getByRole("heading", { level: 1, name: /should not leave you alone with a search box/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "We kept hearing the same questions." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Calm is part of the product." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Offboard is not a government agency." })).toBeInTheDocument();
  });

  it("gives employers and public partners distinct messages and CTAs", () => {
    const employerView = render(<MarketingEmployers />);
    expect(screen.getByRole("heading", { level: 1, name: /clear place to start after separation/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /talk about employer support|talk about sponsored access/i })[0]).toHaveAttribute("href", expect.stringContaining("Employer%20support"));
    employerView.unmount();

    render(<MarketingPublicPartners />);
    expect(screen.getByRole("heading", { level: 1, name: /scattered information to a workable plan/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /discuss a public partnership|discuss a partnership/i })[0]).toHaveAttribute("href", expect.stringContaining("Public%20partner%20support"));
  });

  it("keeps every route out of search indexes while the site is pre-launch", () => {
    [homeMetadata, howMetadata, pricingMetadata, aboutMetadata, employerMetadata, publicPartnerMetadata].forEach((metadata) => {
      expect(metadata.robots).toBe("noindex, nofollow, noarchive");
    });
  });
});
