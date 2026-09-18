import { act, fireEvent, render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
}));

import { MarketingNav } from "./MarketingNav";

function installMediaQueries() {
  vi.stubGlobal("matchMedia", vi.fn((query: string) => ({
    matches: query.includes("hover: hover") || query.includes("min-width: 1181px") || query.includes("prefers-reduced-motion: reduce"),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })));
}

describe("MarketingNav pointer intent", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    installMediaQueries();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("delays hover opening and cancels a fly-by before it opens", () => {
    render(<MarketingNav current="home" />);
    const product = screen.getByRole("button", { name: "Product" });
    const group = product.parentElement!;

    fireEvent.pointerEnter(group);
    act(() => vi.advanceTimersByTime(99));
    expect(product).toHaveAttribute("aria-expanded", "false");

    fireEvent.pointerLeave(group);
    act(() => vi.advanceTimersByTime(200));
    expect(product).toHaveAttribute("aria-expanded", "false");
  });

  it("gives a hover-opened panel exit grace and lets a click keep ownership", () => {
    render(<MarketingNav current="home" />);
    const product = screen.getByRole("button", { name: "Product" });
    const group = product.parentElement!;

    fireEvent.pointerEnter(group);
    act(() => vi.advanceTimersByTime(100));
    expect(product).toHaveAttribute("aria-expanded", "true");

    fireEvent.pointerLeave(group);
    act(() => vi.advanceTimersByTime(119));
    expect(product).toHaveAttribute("aria-expanded", "true");
    fireEvent.pointerEnter(group);
    fireEvent.click(product);
    act(() => vi.advanceTimersByTime(200));
    fireEvent.pointerLeave(group);
    act(() => vi.advanceTimersByTime(200));
    expect(product).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(product);
    expect(product).toHaveAttribute("aria-expanded", "false");
  });

  it("closes on Escape and restores focus to the trigger", () => {
    render(<MarketingNav current="home" />);
    const product = screen.getByRole("button", { name: "Product" });

    fireEvent.click(product);
    expect(product).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(document, { key: "Escape" });

    expect(product).toHaveAttribute("aria-expanded", "false");
    expect(product).toHaveFocus();
  });
});
