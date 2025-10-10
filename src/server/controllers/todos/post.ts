import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";

import { z } from "zod";

import { DBClient } from "@/libs/drizzle/client";
import { todoItems } from "@/libs/drizzle/schema";

const CreateTodoRequestSchema = z.object({
  title: z.string().min(1, "タイトルは必須です").max(100, "タイトルは100文字以内で入力してください").trim(),
});

const factory = createFactory();

/**
 * TODO作成
 */
const handler = factory.createHandlers(
  zValidator("json", CreateTodoRequestSchema),
  async (c) => {
    try {
      const body = c.req.valid("json");

      const [todo] = await DBClient
        .insert(todoItems)
        .values({
          title: body.title,
          isCompleted: false,
        })
        .returning();

      return c.json({todo} as const, 201);
    } catch (error) {
      console.error("TODO作成エラー:", error);
      return c.json({ error: "TODOの作成に失敗しました" } as const, 500);
    }
  }
);

export default handler;
