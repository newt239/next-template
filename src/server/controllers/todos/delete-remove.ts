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
      return c.json({ error: "IDパラメータが見つかりません" }, 400);
    }
    const id = Number.parseInt(idParam);

    if (Number.isNaN(id)) {
      return c.json({ error: "無効なIDです" }, 400);
    }

    const [deletedTodo] = await DBClient
      .delete(todoItems)
      .where(eq(todoItems.id, id))
      .returning();

    if (!deletedTodo) {
      return c.json({ error: "TODOが見つかりません" }, 404);
    }

    return c.json({ message: "TODOが削除されました" });
  } catch (error) {
    console.error("TODO削除エラー:", error);
    return c.json({ error: "TODOの削除に失敗しました" }, 500);
  }
});

export default handler;
