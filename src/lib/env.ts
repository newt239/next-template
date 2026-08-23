import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: {
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL:
      process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  server: {
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url(),
    TURSO_AUTH_TOKEN: z.string().min(1),
    TURSO_CONNECTION_URL: z.url(),
  },
  shared: {
    NODE_ENV: z.enum(["development", "production", "test"]).optional(),
  },
  skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION),
});
