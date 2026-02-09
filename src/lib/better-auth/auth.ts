import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import process from "node:process";

import { DBClient } from "../drizzle/client";
import { account, session, user, verification } from "../drizzle/schema";

export const auth = betterAuth({
  appName: "Score Watcher",
  basePath: "/api/auth",
  baseURL: process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`
    : "http://localhost:3000",
  database: drizzleAdapter(DBClient, {
    provider: "sqlite",
    schema: {
      account,
      session,
      user,
      verification,
    },
  }),
  emailAndPassword: {
    // テスト環境のみ有効化
    enabled: process.env.NODE_ENV !== "production",
    requireEmailVerification: false, // テスト用のため検証不要
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  trustedOrigins: [
    process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`
      : "http://localhost:3000",
  ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;

export type AuthType = {
  user: User | null;
  session: Session | null;
};
