import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_VERCEL_BRANCH_URL: z.string().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_VERCEL_BRANCH_URL: process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  server: {
    TURSO_AUTH_TOKEN: z.string().min(1),
    TURSO_CONNECTION_URL: z.url(),
  },
  shared: {
    NODE_ENV: z.enum(["development", "production", "test"]).optional(),
  },
});
