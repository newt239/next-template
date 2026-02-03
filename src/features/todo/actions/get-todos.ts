import "server-only";
import { DBClient } from "#/lib/drizzle/client";
import { todoItems } from "#/lib/drizzle/schema";

import { GetTodosQuerySchema, GetTodosResponseSchema } from "../schemas/todo";

interface GetTodosOptions {
  limit?: number;
  offset?: number;
}

export const getTodos = async (options?: GetTodosOptions) => {
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
