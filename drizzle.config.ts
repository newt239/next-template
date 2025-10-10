import process from "node:process";

import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;

if (typeof databaseUrl !== "string" || databaseUrl.length === 0) {
  throw new Error("DATABASE_URL が設定されていません。");
}

const authToken = process.env.DATABASE_AUTH_TOKEN;

const dbCredentials: {
  url: string
  authToken?: string
} = typeof authToken === "string" && authToken.length > 0
  ? { url: databaseUrl, authToken }
  : { url: databaseUrl };

export default defineConfig({
  schema: "./src/libs/drizzle/schema/index.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials,
});
