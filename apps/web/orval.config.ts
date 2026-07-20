import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "http://localhost:3005/api-docs-json",
    output: {
      target: "./src/generated/api.ts",
      client: "fetch",
      baseUrl: "http://localhost:3005",
    },
  },
});
