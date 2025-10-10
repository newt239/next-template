import { createFactory } from "hono/factory";

import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq } from "drizzle-orm";

import { DBClient } from "@/libs/drizzle/client";
import { todoItems } from "@/libs/drizzle/schema";

const factory = createFactory();

const UpdateTodoRequestBodySchema = z.object({
  title: z.string().min(1, "タイトルは必須です").max(100, "タイトルは100文字以内で入力してください").trim().optional(),
  isCompleted: z.boolean().optional(),
});

/**
 * TODO更新
 */
const handler = factory.createHandlers(
  zValidator("json", UpdateTodoRequestBodySchema),
  async (c) => {
    try {
      const idParam = c.req.param("id");
      if (!idParam) {
        return c.json({ error: "IDパラメータが見つかりません" } as const, 400);
      }
      const id = Number.parseInt(idParam);
      const body = c.req.valid("json");

      if (Number.isNaN(id)) {
        return c.json({ error: "無効なIDです" } as const, 400);
      }

      const updateData: Partial<typeof todoItems.$inferInsert> = {};
      if (body.title !== undefined) {
        updateData.title = body.title;
      }
      if (body.isCompleted !== undefined) {
        updateData.isCompleted = body.isCompleted;
      }

      const [todo] = await DBClient
        .update(todoItems)
        .set(updateData)
        .where(eq(todoItems.id, id))
        .returning();

      if (!todo) {
        return c.json({ error: "TODOが見つかりません" } as const, 404);
      }

      return c.json({todo} as const);
    } catch (error) {
      console.error("TODO更新エラー:", error);
      return c.json({ error: "TODOの更新に失敗しました" } as const, 500);
    }
  }
);

export default handler;
