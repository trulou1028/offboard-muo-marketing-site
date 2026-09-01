import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json exists in the home directory; without this,
  // Turbopack infers the workspace root as ~ and warns on every build.
  turbopack: {
    root: __dirname,
  },
  // 301 map for the domain cutover from the current production site
  // (see plans/006-resources-shell-redirects-cutover.md). `/intake` is
  // deliberately absent: it is a native route in this repo (plan 010) and
  // a redirect here would shadow it.
  async redirects() {
    return [
      { source: "/product", destination: "/how-it-works", permanent: true },
      { source: "/why-offboard", destination: "/how-it-works", permanent: true },
      { source: "/job-packet", destination: "/how-it-works#toolkit", permanent: true },
      { source: "/faq", destination: "/how-it-works#faq", permanent: true },
      { source: "/community", destination: "/#community", permanent: true },
      { source: "/founder-story", destination: "/about", permanent: true },
      // Retargeted from /about in plan 034, now that a real trust page exists.
      { source: "/security", destination: "/privacy-security", permanent: true },
      { source: "/for-organizations", destination: "/employers", permanent: true },
      { source: "/for-recruiters", destination: "/employers", permanent: true },
      { source: "/gift", destination: "/pricing", permanent: true },
      { source: "/tools", destination: "/resources", permanent: true },
      { source: "/tools/:slug*", destination: "/resources", permanent: true },
      // The 7 per-slug /resources/<essay> redirects that used to live here
      // (plan 013) are gone as of plan 016: those slugs are now seeded as
      // `retired` posts in the CMS, and src/app/resources/[slug]/page.tsx
      // issues the same permanent redirect at the route level (via
      // permanentRedirect() from next/navigation) after looking up the
      // slug's status — see docs/cms-architecture.md "One publish state,
      // not three" and "Decisions" #3.
    ];
  },
};

export default nextConfig;
