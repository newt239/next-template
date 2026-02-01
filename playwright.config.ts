import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  forbidOnly: Boolean(process.env.CI),
  fullyParallel: false,
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
  retries: 0,
  testDir: "./tests/e2e",
  use: {
    actionTimeout: 30000,
    baseURL: "http://localhost:3000",
    channel: "chromium",
    extraHTTPHeaders: {
      "x-playwright-test": "true",
    },
    headless: true,
    locale: "ja-JP",
    navigationTimeout: 10000,
    screenshot: process.env.CI ? "off" : "only-on-failure",
    timezoneId: "Asia/Tokyo",
    trace: process.env.CI ? "off" : "on-first-retry",
    video: process.env.CI ? "off" : "retain-on-failure",
  },
  webServer: {
    command: "pnpm run dev",
    reuseExistingServer: !process.env.CI,
    url: "http://localhost:3000",
  },
  workers: process.env.CI ? 2 : 4,
});
