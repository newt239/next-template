import { createClient } from "@libsql/client";
import { existsSync } from "node:fs";

const cleanupTestUsers = async () => {
  if (existsSync(".env")) {
    process.loadEnvFile();
  }

  const url = process.env.TURSO_CONNECTION_URL;
  const runId = process.env.E2E_RUN_ID;
  if (!url || !runId) {
    return;
  }

  const client = createClient({ authToken: process.env.TURSO_AUTH_TOKEN, url });

  try {
    await client.execute({
      args: [`e2e-${runId}-%`],
      sql: "DELETE FROM user WHERE email LIKE ?",
    });
  } finally {
    client.close();
  }
};

export default cleanupTestUsers;
