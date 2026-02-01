import { createAuthClient } from "better-auth/client";
import process from "node:process";

export const authClient = createAuthClient({
  basePath: "/api/auth",
  baseURL: process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`
    : "http://localhost:3000",
});

export { authClient as client };
