import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { env } from "#/lib/env";

import * as schema from "./schema/index";

const sqlClient = createClient({
  authToken: env.TURSO_AUTH_TOKEN,
  url: env.TURSO_CONNECTION_URL,
});

export const DBClient = drizzle(sqlClient, { schema });

export * from "./schema";
