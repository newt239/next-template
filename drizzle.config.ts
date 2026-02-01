import { defineConfig } from "drizzle-kit";
import process from "node:process";

const databaseUrl = process.env.TURSO_CONNECTION_URL;
if (typeof databaseUrl !== "string" || databaseUrl.length === 0) {
  throw new Error("TURSO_CONNECTION_URL が設定されていません。");
}

const authToken = process.env.TURSO_AUTH_TOKEN!;
if (typeof authToken !== "string" || authToken.length === 0) {
  throw new Error("TURSO_AUTH_TOKEN が設定されていません。");
}

export default defineConfig({
  dbCredentials: { authToken, url: databaseUrl },
  dialect: "turso",
  out: "./drizzle",
  schema: "./src/lib/drizzle/schema/index.ts",
});
