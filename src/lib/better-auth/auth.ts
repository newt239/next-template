import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { DBClient } from "#/lib/drizzle/client";
import { account, rateLimit, session, user, verification } from "#/lib/drizzle/schema";
import { env } from "#/lib/env";

export const auth = betterAuth({
  appName: "next-template",
  basePath: "/api/auth",
  baseURL: env.BETTER_AUTH_URL,
  database: drizzleAdapter(DBClient, {
    provider: "sqlite",
    schema: {
      account,
      rateLimit,
      session,
      user,
      verification,
    },
  }),
  emailAndPassword: {
    autoSignIn: true,
    enabled: true,
    maxPasswordLength: 128,
    minPasswordLength: 8,
    requireEmailVerification: false,
  },
  plugins: [nextCookies()],
  rateLimit: {
    customRules: {
      "/sign-in/email": { max: 20, window: 300 },
      "/sign-up/email": { max: 30, window: 300 },
    },
    storage: "database",
  },
  secret: env.BETTER_AUTH_SECRET,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 300,
    },
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});
