import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ApplicationPacketDemo } from "./ApplicationPacketDemo";
import { PACKET_DEMO_STEPS, PACKET_STEP_CHIP } from "./ApplicationPacketDemoData";

describe("ApplicationPacketDemo", () => {
  it("server-renders one complete packet view with all six outputs", () => {
    const html = renderToStaticMarkup(<ApplicationPacketDemo />);
    expect(html).toContain("One role, six connected outputs.");
    expect(html).toContain("Alex reviews and sends every application material.");
    for (const step of PACKET_DEMO_STEPS) {
      expect(html).toContain(step.label);
      expect(html).toContain(step.summary);
      expect(html).toContain(PACKET_STEP_CHIP[step.tier]);
    }
  });

  it("shows the fictional source record and no tab or playback controls", () => {
    render(<ApplicationPacketDemo />);
    expect(screen.getByLabelText("Illustrative candidate and role")).toHaveTextContent("Example Co.");
    expect(screen.getByLabelText("Complete packet example")).toBeVisible();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("tab")).not.toBeInTheDocument();
    expect(screen.queryByText("Play example")).not.toBeInTheDocument();
  });
});
