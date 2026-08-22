import { render, screen, within } from "@testing-library/react";
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

    const headerNav = screen.getByRole("navigation", { name: "Marketing navigation" });
    const headerLinks = within(headerNav).getAllByRole("link");
    expect(headerLinks).toHaveLength(4);
    expect(within(headerNav).getByRole("link", { name: "How it works" })).toHaveAttribute("href", "/how-it-works");
    expect(within(headerNav).getByRole("link", { name: "Pricing" })).toHaveAttribute("href", "/pricing");
    expect(within(headerNav).getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(within(headerNav).getByRole("link", { name: "For employers" })).toHaveAttribute("href", "/employers");
    expect(within(headerNav).queryByRole("link", { name: "For public partners" })).not.toBeInTheDocument();

    const footerNav = screen.getByRole("navigation", { name: "Footer navigation" });
    expect(within(footerNav).getByRole("link", { name: "For public partners" })).toHaveAttribute("href", "/public-partners");
  });

  it("gives how it works a five-step spine, a toolkit, and LUMO", () => {
    render(<MarketingHowItWorks />);

    expect(screen.getByRole("heading", { level: 1, name: "One plan that starts where you are." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /five steps from/i })).toBeInTheDocument();
    expect(screen.getByText("Tell us where you are")).toBeInTheDocument();
    expect(screen.getByText("See your money clearly")).toBeInTheDocument();
    expect(screen.getByText("Claim what exists")).toBeInTheDocument();
    expect(screen.getByText("Get ready, then run the search")).toBeInTheDocument();
    expect(screen.getByText("Close it, and make it count")).toBeInTheDocument();
    expect(screen.getByText(/we never promise funding/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /tools didn't go anywhere/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Job Packet" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "An AI guide that knows your actual situation." })).toBeInTheDocument();
    expect(screen.getByText(/never invents a dollar figure/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "You can do this yourself. You should not have to do it alone." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Stop repeating your story to every new tool." })).toBeInTheDocument();
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
    expect(screen.getByRole("heading", { name: "It started with the same questions, over and over." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "A newsletter and a community came first." })).toBeInTheDocument();
    expect(screen.getByText(/5,000\+ subscribers/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Calm is part of the product." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Offboard is not a government agency." })).toBeInTheDocument();
  });

  it("gives employers and public partners distinct messages and CTAs", () => {
    const employerView = render(<MarketingEmployers />);
    expect(screen.getByRole("heading", { level: 1, name: /outplacement, modernized/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /talk about sponsored access/i })[0]).toHaveAttribute("href", expect.stringContaining("Employer%20support"));
    expect(screen.getByRole("link", { name: /post a role/i })).toHaveAttribute("href", expect.stringContaining("Hiring%20on%20Offboard"));
    expect(screen.getByRole("heading", { name: "Agencies decide. Offboard helps people prepare and continue." })).toBeInTheDocument();
    employerView.unmount();

    render(<MarketingPublicPartners />);
    expect(screen.getByRole("heading", { level: 1, name: /scattered information to a workable plan/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see partner details on the employers page/i })).toHaveAttribute("href", "/employers");
    expect(screen.getAllByRole("link", { name: /discuss a public partnership|discuss a partnership/i })[0]).toHaveAttribute("href", expect.stringContaining("Public%20partner%20support"));
  });

  it("keeps every route out of search indexes while the site is pre-launch", () => {
    [homeMetadata, howMetadata, pricingMetadata, aboutMetadata, employerMetadata, publicPartnerMetadata].forEach((metadata) => {
      expect(metadata.robots).toBe("noindex, nofollow, noarchive");
    });
  });
});
