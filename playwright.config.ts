import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.E2E_BASE_URL ?? "http://localhost:3000";

process.env.E2E_RUN_ID ??= String(Date.now());

export default defineConfig({
  forbidOnly: Boolean(process.env.CI),
  fullyParallel: true,
  globalTeardown: "./tests/e2e/helpers/cleanup.ts",
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never", outputFolder: "html-report" }]]
    : [["list"], ["html", { open: "never", outputFolder: "html-report" }]],
  retries: process.env.CI ? 2 : 0,
  testDir: "./tests/e2e",
  use: {
    actionTimeout: 30000,
    baseURL,
    channel: "chromium",
    headless: true,
    locale: "ja-JP",
    navigationTimeout: 10000,
    screenshot: process.env.CI ? "off" : "only-on-failure",
    timezoneId: "Asia/Tokyo",
    trace: process.env.CI ? "off" : "on-first-retry",
    video: process.env.CI ? "off" : "retain-on-failure",
  },
  webServer: {
    command: process.env.CI ? "pnpm run start" : "pnpm run dev",
    reuseExistingServer: !process.env.CI,
    url: baseURL,
  },
  workers: process.env.CI ? 2 : 4,
});
