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
      { source: "/security", destination: "/about", permanent: true },
      { source: "/for-organizations", destination: "/employers", permanent: true },
      { source: "/for-recruiters", destination: "/employers", permanent: true },
      { source: "/gift", destination: "/pricing", permanent: true },
      { source: "/tools", destination: "/resources", permanent: true },
      { source: "/tools/:slug*", destination: "/resources", permanent: true },
    ];
  },
};

export default nextConfig;
