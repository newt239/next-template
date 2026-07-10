import "server-only";
import { eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

import { GetTasksQuerySchema, GetTasksResponseSchema } from "#/features/task/schemas/task";
import { DBClient } from "#/lib/drizzle/client";
import { taskItems } from "#/lib/drizzle/schema";

type GetTasksOptions = {
  isCompleted?: boolean;
  limit?: number;
  offset?: number;
};

export const getTasks = async (options?: GetTasksOptions) => {
  "use cache";

  cacheLife({
    expire: 3600,
    revalidate: 300,
    stale: 60,
  });

  cacheTag("tasks");

  try {
    const query = GetTasksQuerySchema.parse({
      isCompleted: options?.isCompleted,
      limit: options?.limit,
      offset: options?.offset,
    });

    const tasks = await DBClient.select()
      .from(taskItems)
      .where(
        query.isCompleted === undefined ? undefined : eq(taskItems.isCompleted, query.isCompleted),
      )
      .orderBy(taskItems.createdAt)
      .limit(query.limit ?? 100)
      .offset(query.offset ?? 0);

    const response = GetTasksResponseSchema.parse({ tasks });
    return response;
  } catch (error) {
    console.error("タスク一覧取得エラー:", error);
    throw new Error("サーバーエラーが発生しました", { cause: error });
  }
};
