import { createFactory } from "hono/factory";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { DBClient } from "@/libs/drizzle/client";
import { todoItems } from "@/libs/drizzle/schema";
import { UpdateTodoRequestSchema } from "@/models/todo";

const factory = createFactory();

/**
 * TODO更新
 */
const handler = factory.createHandlers(
  zValidator("json", UpdateTodoRequestSchema),
  async (c) => {
    try {
      const idParam = c.req.param("id");
      if (!idParam) {
        return c.json({ error: "IDパラメータが見つかりません" }, 400);
      }
      const id = Number.parseInt(idParam);
      const body = c.req.valid("json");

      if (Number.isNaN(id)) {
        return c.json({ error: "無効なIDです" }, 400);
      }

      const updateData: Partial<typeof todoItems.$inferInsert> = {};
      if (body.title !== undefined) {
        updateData.title = body.title;
      }
      if (body.isCompleted !== undefined) {
        updateData.isCompleted = body.isCompleted;
      }

      const [updatedTodo] = await DBClient
        .update(todoItems)
        .set(updateData)
        .where(eq(todoItems.id, id))
        .returning();

      if (!updatedTodo) {
        return c.json({ error: "TODOが見つかりません" }, 404);
      }

      return c.json(updatedTodo);
    } catch (error) {
      console.error("TODO更新エラー:", error);
      return c.json({ error: "TODOの更新に失敗しました" }, 500);
    }
  }
);

export default handler;
