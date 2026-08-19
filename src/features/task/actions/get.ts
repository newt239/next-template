import "server-only";
import { and, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

import { TaskIdSchema, TaskResponseSchema } from "#/features/task/lib/schema";
import { DBClient } from "#/lib/drizzle/client";
import { taskItems } from "#/lib/drizzle/schema";

export const getTaskById = async (userId: string, id: number) => {
  "use cache";

  cacheLife({
    expire: 3600,
    revalidate: 300,
    stale: 60,
  });

  cacheTag(`task-${userId}-${id}`);

  try {
    const validId = TaskIdSchema.parse(id);

    const tasks = await DBClient.select()
      .from(taskItems)
      .where(and(eq(taskItems.id, validId), eq(taskItems.userId, userId)))
      .limit(1);
    const task = tasks.at(0);

    if (!task) {
      return null;
    }

    const response = TaskResponseSchema.parse(task);

    return response;
  } catch (error) {
    console.error("タスク詳細取得エラー:", error);
    throw new Error("サーバーエラーが発生しました", { cause: error });
  }
};
