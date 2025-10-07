import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const filePath = fileURLToPath(import.meta.url);
const directoryPath = dirname(filePath);

export default defineConfig({
  resolve: {
    alias: {
      "#": resolve(directoryPath, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setupTests.ts"],
    globals: true,
    css: {
      modules: {
        classNameStrategy: "stable",
      },
    },
    esbuild: {
      jsx: "automatic",
      jsxImportSource: "react",
    },
  },
});
