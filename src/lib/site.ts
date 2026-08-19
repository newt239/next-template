import { env } from "#/lib/env";

export const SITE_URL = new URL(
  env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000",
);

export const SITE_NAME = "Next.js Template";
