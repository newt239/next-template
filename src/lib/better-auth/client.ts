import { createAuthClient } from "better-auth/client";

import { env } from "#/lib/env";

export const authClient = createAuthClient({
  basePath: "/api/auth",
  baseURL: env.NEXT_PUBLIC_VERCEL_BRANCH_URL
    ? `https://${env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`
    : "http://localhost:3000",
});

export { authClient as client };
