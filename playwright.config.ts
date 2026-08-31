import { defineConfig, devices } from "@playwright/test";

const port = process.env.PLAYWRIGHT_PORT ?? "4177";
const externalBaseURL = process.env.PLAYWRIGHT_BASE_URL;
const baseURL = externalBaseURL ?? `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    // Plan 024: the motion controller adds no reveal classes under reduced
    // motion, so every suite sees the fully visible static page. The suites
    // assert content, layout, and contrast - never motion; motion is
    // verified manually.
    contextOptions: { reducedMotion: "reduce" },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // Production server, not `next dev`: the e2e asserts zero console errors,
  // which dev-mode HMR/overlay noise would break.
  webServer: externalBaseURL
    ? undefined
    : {
        command: `npm run build && npm run start -- -p ${port}`,
        url: baseURL,
        reuseExistingServer: false,
        timeout: 120_000,
        // e2e/intake.spec.ts's third test relies on SUPABASE_SERVICE_ROLE_KEY
        // and RESEND_API_KEY being absent so the intake server action takes
        // its graceful-degradation path instead of actually writing to
        // Supabase / sending through Resend. Without this override, a
        // developer's .env.local (which the webServer inherits) supplies
        // real keys and every e2e run would insert a live row into
        // production Supabase. Blanking them here — before Next.js starts
        // and reads .env.local — keeps e2e deterministic and side-effect
        // free: Next.js only fills in a var from .env.local when it is not
        // already present in process.env, so an explicit "" here wins.
        env: {
          ...process.env,
          SUPABASE_SERVICE_ROLE_KEY: "",
          RESEND_API_KEY: "",
        },
      },
});
