"use client";

import { useEffect } from "react";

/* The marketing tree's global motion controller (plan 024). Renders nothing;
   it drives two document-level behaviors after hydration:

   1. Header scroll state - always on, even under reduced motion: a shadow on
      the fixed header once the page has scrolled is state, not motion.
   2. Scroll reveals - strictly opt-in. The hidden state in the CSS applies
      only under the `mh-motion` class this effect adds, and the class is
      never added when the visitor prefers reduced motion, when JS fails, or
      when IntersectionObserver is missing. Everyone else sees each
      [data-reveal] block fade and rise once as it enters the viewport.

   jsdom (the unit-test environment) implements neither matchMedia nor
   IntersectionObserver, so both are feature-detected before use. */
export function MotionController() {
  useEffect(() => {
    const header = document.querySelector(".mh-site-header");
    let cleanupScroll: (() => void) | undefined;
    if (header) {
      const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanupScroll = () => window.removeEventListener("scroll", onScroll);
    }

    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || typeof IntersectionObserver !== "function") {
      return cleanupScroll;
    }

    document.documentElement.classList.add("mh-motion");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      cleanupScroll?.();
    };
  }, []);

  return null;
}
