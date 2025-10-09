import { createFactory } from "hono/factory";
import { zValidator } from "@hono/zod-validator";
import { DBClient } from "@/libs/drizzle/client";
import { todoItems } from "@/libs/drizzle/schema";
import { CreateTodoRequestSchema } from "@/models/todo";

const factory = createFactory();

/**
 * TODO作成
 */
const handler = factory.createHandlers(
  zValidator("json", CreateTodoRequestSchema),
  async (c) => {
    try {
      const body = c.req.valid("json");

      const [newTodo] = await DBClient
        .insert(todoItems)
        .values({
          title: body.title,
          isCompleted: false,
        })
        .returning();

      return c.json(newTodo, 201);
    } catch (error) {
      console.error("TODO作成エラー:", error);
      return c.json({ error: "TODOの作成に失敗しました" }, 500);
    }
  }
);

export default handler;
