import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json exists in the home directory; without this,
  // Turbopack infers the workspace root as ~ and warns on every build.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
