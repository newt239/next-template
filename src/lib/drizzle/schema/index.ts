import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

// ユーザーテーブル
export const user = sqliteTable("user", {
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  image: text("image"),
  name: text("name").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
});

// セッションテーブル
export const session = sqliteTable("session", {
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  id: text("id").primaryKey(),
  ipAddress: text("ip_address"),
  token: text("token").notNull().unique(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const sessionExpiresAtIdx = index("idx_session_expires_at").on(session.expiresAt);

// アカウントテーブル（OAuth用）
export const account = sqliteTable("account", {
  accessToken: text("access_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  accountId: text("account_id").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
  id: text("id").primaryKey(),
  idToken: text("id_token"),
  password: text("password"),
  providerId: text("provider_id").notNull(),
  refreshToken: text("refresh_token"),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const accountUniqueIdx = unique("idx_account_unique").on(
  account.providerId,
  account.accountId,
);

// 認証用検証テーブル
export const verification = sqliteTable("verification", {
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
  value: text("value").notNull(),
});

export const todoItems = sqliteTable("todo_items", {
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s','now'))`),
  id: integer("id").primaryKey({ autoIncrement: true }),
  isCompleted: integer("is_completed", { mode: "boolean" }).notNull().default(false),
  title: text("title").notNull(),
});
