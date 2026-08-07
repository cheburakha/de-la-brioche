import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/**/tables/*.table.ts",
  out: "./drizzle",
  dialect: "postgresql",
});
