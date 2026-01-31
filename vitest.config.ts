import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    include: ["src/**/*.{spec,test}.{ts,tsx}"],
    globals: false,
    setupFiles: ["./tests/unit/vitest.setup.ts"],
  },
});
