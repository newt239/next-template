import { sql } from "drizzle-orm";
import {
  index,
  integer,
  sqliteTable,
  text,
  unique,
} from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

// ユーザーテーブル
export const user = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
});

export const themeEnum = ["light", "dark"] as const;

// ユーザー環境設定テーブル
export const userPreference = sqliteTable("user_preference", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  userId: text("user_id").references(() => user.id),
  // 表示設定
  theme: text("theme", { enum: themeEnum }).notNull().default("light"),
  showWinthroughPopup: integer("show_winthrough_popup", { mode: "boolean" })
    .notNull()
    .default(true),
  showBoardHeader: integer("show_board_header", { mode: "boolean" })
    .notNull()
    .default(true),
  showQn: integer("show_qn", { mode: "boolean" }).notNull().default(false),
  showSignString: integer("show_sign_string", { mode: "boolean" })
    .notNull()
    .default(true),
  reversePlayerInfo: integer("reverse_player_info", { mode: "boolean" })
    .notNull()
    .default(false),
  wrongNumber: integer("wrong_number", { mode: "boolean" })
    .notNull()
    .default(true),
  // Webhook設定
  webhookUrl: text("webhook_url"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
});

// ユーザー環境設定テーブルのユーザーごとのインデックス
export const userPreferenceUserIdIdx = index("idx_user_preference_user_id").on(
  userPreference.userId,
);

// セッションテーブル
export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const sessionExpiresAtIdx = index("idx_session_expires_at").on(
  session.expiresAt,
);

// アカウントテーブル（OAuth用）
export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
});

export const accountUniqueIdx = unique("idx_account_unique").on(
  account.providerId,
  account.accountId,
);

// 認証用検証テーブル
export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
});
