import "server-only";
import { cacheLife, cacheTag } from "next/cache";

import { DBClient } from "#/lib/drizzle/client";
import { todoItems } from "#/lib/drizzle/schema";

import { GetTodosQuerySchema, GetTodosResponseSchema } from "../schemas/todo";

type GetTodosOptions = {
  limit?: number;
  offset?: number;
};

export const getTodos = async (options?: GetTodosOptions) => {
  "use cache";

  cacheLife({
    expire: 3600,
    revalidate: 300,
    stale: 60,
  });

  cacheTag("todos");

  try {
    const query = GetTodosQuerySchema.parse({
      limit: options?.limit,
      offset: options?.offset,
    });

    const todos = await DBClient.select()
      .from(todoItems)
      .orderBy(todoItems.createdAt)
      .limit(query.limit ?? 100)
      .offset(query.offset ?? 0);

    const response = GetTodosResponseSchema.parse({ todos });
    return response;
  } catch (error) {
    console.error("TODO一覧取得エラー:", error);
    throw new Error("サーバーエラーが発生しました", { cause: error });
  }
};
