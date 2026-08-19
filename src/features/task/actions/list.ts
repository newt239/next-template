import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

import { GetTasksQuerySchema, GetTasksResponseSchema } from "#/features/task/lib/schema";
import { DBClient } from "#/lib/drizzle/client";
import { taskItems } from "#/lib/drizzle/schema";

type GetTasksOptions = {
  isCompleted?: boolean;
  limit?: number;
  offset?: number;
};

export const getTasks = async (userId: string, options?: GetTasksOptions) => {
  "use cache";

  cacheLife({
    expire: 3600,
    revalidate: 300,
    stale: 60,
  });

  cacheTag(`tasks-${userId}`);

  try {
    const query = GetTasksQuerySchema.parse({
      isCompleted: options?.isCompleted,
      limit: options?.limit,
      offset: options?.offset,
    });

    const tasks = await DBClient.select()
      .from(taskItems)
      .where(
        and(
          eq(taskItems.userId, userId),
          query.isCompleted === undefined
            ? undefined
            : eq(taskItems.isCompleted, query.isCompleted),
        ),
      )
      .orderBy(desc(taskItems.createdAt), desc(taskItems.id))
      .limit(query.limit ?? 100)
      .offset(query.offset ?? 0);

    const response = GetTasksResponseSchema.parse({ tasks });
    return response;
  } catch (error) {
    console.error("タスク一覧取得エラー:", error);
    throw new Error("サーバーエラーが発生しました", { cause: error });
  }
};
