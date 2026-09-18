import { fireEvent, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CareerContextExample } from "./CareerContextExample";

function installReducedMotion() {
  vi.stubGlobal("matchMedia", vi.fn((query: string) => ({
    matches: query.includes("prefers-reduced-motion: reduce"),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })));
}

describe("CareerContextExample", () => {
  beforeEach(installReducedMotion);

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("server renders the first example and readable task labels without inert controls", () => {
    const markup = renderToStaticMarkup(<CareerContextExample />);

    expect(markup).toContain("Tailored resume");
    expect(markup).toContain("Interview preparation");
    expect(markup).toContain("Compare an opportunity");
    expect(markup).toContain("reducing average onboarding time from 14 to 10 days");
    expect(markup).not.toContain("<button");
  });

  it("maps every task to its grounded source details and keeps focus on the selector", () => {
    render(<CareerContextExample />);

    const output = screen.getByRole("region", { name: "Tailored resume" });
    expect(output).not.toHaveAttribute("aria-live");
    const interview = screen.getByRole("button", { name: "Interview preparation" });
    interview.focus();
    fireEvent.click(interview);

    expect(interview).toHaveFocus();
    expect(interview).toHaveAttribute("aria-pressed", "true");
    expect(interview).toHaveAttribute("aria-controls", "career-context-example-output");
    expect(within(output).getByText("Tell me about a time you got a stalled customer rollout moving again.")).toBeInTheDocument();
    expect(
      Array.from(document.querySelectorAll(".mh-context-source-facts.is-desktop > .is-relevant")).map((item) => item.textContent),
    ).toEqual(expect.arrayContaining([
      expect.stringContaining("Experience"),
      expect.stringContaining("Interview story"),
    ]));

    const compare = screen.getByRole("button", { name: "Compare an opportunity" });
    fireEvent.click(compare);
    expect(within(output).getByText("The ownership of adoption matches Alex's goal for the next role.")).toBeInTheDocument();
    expect(
      Array.from(document.querySelectorAll(".mh-context-source-facts.is-desktop > .is-relevant")).map((item) => item.textContent),
    ).toEqual(expect.arrayContaining([
      expect.stringContaining("Preference"),
      expect.stringContaining("Goal"),
    ]));
  });

  it("lets the latest rapid selection win without making a request", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<CareerContextExample />);

    fireEvent.click(screen.getByRole("button", { name: "Interview preparation" }));
    fireEvent.click(screen.getByRole("button", { name: "Tailored resume" }));
    fireEvent.click(screen.getByRole("button", { name: "Compare an opportunity" }));

    expect(screen.getByRole("button", { name: "Compare an opportunity" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Own customer adoption after onboarding, with three fixed office days each week.")).toBeInTheDocument();
    expect(screen.queryByText("Illustrative resume bullet")).not.toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
