import "server-only";
import { eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

import { GetTaskByIdSchema, TaskResponseSchema } from "#/features/task/schemas/task";
import { DBClient } from "#/lib/drizzle/client";
import { taskItems } from "#/lib/drizzle/schema";

export const getTaskById = async (id: number) => {
  "use cache";

  cacheLife({
    expire: 3600,
    revalidate: 300,
    stale: 60,
  });

  cacheTag(`task-${id}`);

  try {
    const { id: validId } = GetTaskByIdSchema.parse({ id });

    const tasks = await DBClient.select().from(taskItems).where(eq(taskItems.id, validId)).limit(1);
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
