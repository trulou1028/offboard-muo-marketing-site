import { act, fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./MarketingMotion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./MarketingMotion")>();
  return {
    ...actual,
    animatePacketOutput: vi.fn(() => ({ cancel: vi.fn() })),
  };
});

import { ApplicationPacketDemo } from "./ApplicationPacketDemo";
import { PACKET_DEMO_STEPS } from "./ApplicationPacketDemoData";

type MediaListener = (event: MediaQueryListEvent) => void;

function installMotionPreference(initiallyReduced = false) {
  let reduced = initiallyReduced;
  const listeners = new Set<MediaListener>();
  const mediaQuery = {
    get matches() { return reduced; },
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    addEventListener: vi.fn((_type: string, listener: MediaListener) => listeners.add(listener)),
    removeEventListener: vi.fn((_type: string, listener: MediaListener) => listeners.delete(listener)),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  };
  vi.stubGlobal("matchMedia", vi.fn(() => mediaQuery));
  return {
    setReduced(next: boolean) {
      reduced = next;
      const event = { matches: next } as MediaQueryListEvent;
      listeners.forEach((listener) => listener(event));
    },
  };
}

describe("ApplicationPacketDemo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    installMotionPreference();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("server-renders the complete example and every step description without interactive controls", () => {
    const html = renderToStaticMarkup(<ApplicationPacketDemo />);

    expect(html).toContain("One role, six connected outputs.");
    expect(html).toContain("Alex reviews and sends every application material.");
    for (const step of PACKET_DEMO_STEPS) {
      expect(html).toContain(step.label);
      expect(html).toContain(step.description);
      expect(html).toContain(step.summary);
    }
    expect(html).not.toContain("Play example");
    expect(html).not.toContain("aria-pressed");
  });

  it("selects each output directly and keeps focus on the activated step", () => {
    render(<ApplicationPacketDemo />);
    const coverLetter = screen.getByRole("button", { name: /Cover Letter Draft a cover letter/ });
    coverLetter.focus();
    fireEvent.click(coverLetter);

    expect(coverLetter).toHaveAttribute("aria-pressed", "true");
    expect(coverLetter).toHaveFocus();
    expect(screen.getByLabelText("Cover Letter example output")).toHaveTextContent("Example excerpt");
    expect(screen.getByLabelText("Cover Letter example output")).toHaveTextContent("12-person team");
  });

  it("plays in order, stops on manual selection, and can skip to the complete packet", () => {
    render(<ApplicationPacketDemo />);
    const play = screen.getByRole("button", { name: "Play example" });
    fireEvent.click(play);

    expect(screen.getByRole("button", { name: /Ghost Check/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Pause" })).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(2400));
    expect(screen.getByRole("button", { name: /Company Intel/ })).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: /Tailor Resume/ }));
    act(() => vi.advanceTimersByTime(9600));
    expect(screen.getByRole("button", { name: /Tailor Resume/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.queryByRole("button", { name: "Pause" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Show complete packet" }));
    expect(screen.getByLabelText("Complete packet example")).toHaveTextContent("One role, six connected outputs.");
  });

  it("finishes on the complete summary and offers an explicit replay", () => {
    render(<ApplicationPacketDemo />);
    fireEvent.click(screen.getByRole("button", { name: "Play example" }));
    for (let index = 0; index < PACKET_DEMO_STEPS.length; index += 1) {
      act(() => vi.advanceTimersByTime(2400));
    }

    expect(screen.getByLabelText("Complete packet example")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Replay example" }));
    expect(screen.getByRole("button", { name: /Ghost Check/ })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Pause" }));
    expect(screen.queryByRole("button", { name: "Pause" })).not.toBeInTheDocument();
  });

  it("cancels playback when reduced motion is enabled and keeps direct selection available", () => {
    const motion = installMotionPreference();
    render(<ApplicationPacketDemo />);
    fireEvent.click(screen.getByRole("button", { name: "Play example" }));

    act(() => motion.setReduced(true));
    expect(screen.queryByRole("button", { name: "Pause" })).not.toBeInTheDocument();
    expect(screen.getByText("Motion reduced. Choose any step or show the complete packet.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Path to a Person/ }));
    expect(screen.getByLabelText("Path to a Person example output")).toHaveTextContent("Customer Success Operations leader");
  });

  it("cancels playback when the example leaves the viewport or the tab is hidden", () => {
    let intersectionCallback: IntersectionObserverCallback = () => undefined;
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback: IntersectionObserverCallback) { intersectionCallback = callback; }
      observe() {}
      disconnect() {}
      unobserve() {}
      takeRecords() { return []; }
      root = null;
      rootMargin = "0px";
      thresholds = [0.15];
    });
    render(<ApplicationPacketDemo />);

    fireEvent.click(screen.getByRole("button", { name: "Play example" }));
    act(() => intersectionCallback([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver));
    expect(screen.queryByRole("button", { name: "Pause" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Play example" }));
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(screen.queryByRole("button", { name: "Pause" })).not.toBeInTheDocument();
    Object.defineProperty(document, "hidden", { configurable: true, value: false });
  });
});
