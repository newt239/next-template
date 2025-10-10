import { createFactory } from "hono/factory";

import { eq } from "drizzle-orm";

import { DBClient } from "@/libs/drizzle/client";
import { todoItems } from "@/libs/drizzle/schema";

const factory = createFactory();

/**
 * TODO削除
 */
const handler = factory.createHandlers(async (c) => {
  try {
    const idParam = c.req.param("id");
    if (!idParam) {
      return c.json({ error: "IDパラメータが見つかりません" } as const, 400);
    }
    const id = Number.parseInt(idParam);

    if (Number.isNaN(id)) {
      return c.json({ error: "無効なIDです" } as const, 400);
    }

    const [todo] = await DBClient
      .delete(todoItems)
      .where(eq(todoItems.id, id))
      .returning();

    if (!todo) {
      return c.json({ error: "TODOが見つかりません" } as const, 404);
    }

    return c.json({todo} as const);
  } catch (error) {
    console.error("TODO削除エラー:", error);
    return c.json({ error: "TODOの削除に失敗しました" } as const, 500);
  }
});

export default handler;
