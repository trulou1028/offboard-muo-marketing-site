"use client";

import { animate } from "motion/mini";
import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const MARKETING_MOTION = {
  navigationDuration: 0.18,
  navigationEase: [0.2, 0, 0, 1] as [number, number, number, number],
} as const;

function subscribeToReducedMotion(onChange: () => void) {
  if (typeof window.matchMedia !== "function") return () => undefined;
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return typeof window.matchMedia === "function" && window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeToReducedMotion, getReducedMotionSnapshot, () => false);
}

export function animateNavigationPanel(panel: HTMLElement, phase: "enter" | "exit") {
  return animate(
    panel,
    phase === "enter"
      ? { opacity: 1, transform: "translateY(0px)" }
      : { opacity: 0, transform: "translateY(-4px)" },
    {
      duration: MARKETING_MOTION.navigationDuration,
      ease: MARKETING_MOTION.navigationEase,
    },
  );
}
