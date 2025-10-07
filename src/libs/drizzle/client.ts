import process from "node:process";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema/index";

const tursoUrl = process.env.TURSO_DATABASE_URL!;
const tursoToken = process.env.TURSO_AUTH_TOKEN!;

if (!tursoUrl) {
  throw new Error("TURSO_DATABASE_URL environment variable is required");
}

if (!tursoToken) {
  throw new Error("TURSO_AUTH_TOKEN environment variable is required");
}

// Turso接続設定
const sqlClient = createClient({
  url: tursoUrl,
  authToken: tursoToken,
});

// Drizzleクライアント初期化
export const DBClient = drizzle(sqlClient, { schema });

export type DrizzleDB = typeof DBClient;
export * from "./schema";
