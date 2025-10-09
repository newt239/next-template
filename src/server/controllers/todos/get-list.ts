import { createFactory } from "hono/factory";
import { zValidator } from "@hono/zod-validator";
import { DBClient } from "@/libs/drizzle/client";
import { todoItems } from "@/libs/drizzle/schema";
import { GetTodosQuerySchema } from "@/models/todo";

const factory = createFactory();

/**
 * TODO一覧取得
 */
const handler = factory.createHandlers(
  zValidator("query", GetTodosQuerySchema),
  async (c) => {
    try {
      const query = c.req.valid("query");
      
      const todos = await DBClient
        .select()
        .from(todoItems)
        .orderBy(todoItems.createdAt)
        .limit(query.limit || 100)
        .offset(query.offset || 0);
      return c.json({ todos });
    } catch (error) {
      console.error("TODO一覧取得エラー:", error);
      return c.json({ error: "サーバーエラーが発生しました" }, 500);
    }
  }
);

export default handler;
