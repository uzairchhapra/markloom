import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["tests/{unit,contracts}/**/*.test.ts"],
    coverage: {
      reporter: ["text", "html"],
    },
  },
  resolve: {
    alias: {
      "@core": new URL("./src/core", import.meta.url).pathname,
      "@schema": new URL("./src/schema", import.meta.url).pathname,
      "@config": new URL("./src/config", import.meta.url).pathname,
      "@utilities": new URL("./src/utilities", import.meta.url).pathname,
      "@themes": new URL("./src/themes", import.meta.url).pathname,
    },
  },
});
