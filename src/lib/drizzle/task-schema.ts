import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth-schema";

export const taskItems = sqliteTable(
  "task_items",
  {
    createdAt: integer("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    id: integer("id").primaryKey({ autoIncrement: true }),
    isCompleted: integer("is_completed", { mode: "boolean" }).notNull().default(false),
    title: text("title").notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .$onUpdateFn(() => new Date()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("idx_task_items_user_id_is_completed").on(table.userId, table.isCompleted)],
);
