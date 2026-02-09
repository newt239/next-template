import "server-only";
import { cacheLife, cacheTag } from "next/cache";

import { DBClient } from "#/lib/drizzle/client";
import { taskItems } from "#/lib/drizzle/schema";
import { eq } from "drizzle-orm";

import { GetTaskByIdSchema, TaskResponseSchema } from "../schemas/task";

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

    const [task] = await DBClient.select()
      .from(taskItems)
      .where(eq(taskItems.id, validId))
      .limit(1);

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
