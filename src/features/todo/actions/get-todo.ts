import "server-only";
import { cacheLife, cacheTag } from "next/cache";

import { DBClient } from "#/lib/drizzle/client";
import { todoItems } from "#/lib/drizzle/schema";
import { eq } from "drizzle-orm";

import { GetTodoByIdSchema, TodoResponseSchema } from "../schemas/todo";

export const getTodoById = async (id: number) => {
  "use cache";

  cacheLife({
    expire: 3600,
    revalidate: 300,
    stale: 60,
  });

  cacheTag(`todo-${id}`);

  try {
    const { id: validId } = GetTodoByIdSchema.parse({ id });

    const [todo] = await DBClient.select()
      .from(todoItems)
      .where(eq(todoItems.id, validId))
      .limit(1);

    if (!todo) {
      return null;
    }

    const response = TodoResponseSchema.parse(todo);

    return response;
  } catch (error) {
    console.error("TODO詳細取得エラー:", error);
    throw new Error("サーバーエラーが発生しました", { cause: error });
  }
};
