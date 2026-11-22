import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import * as z from "zod";

import { TaskResponseSchema } from "#/features/task/lib/schema.ts";
import { DBClient } from "#/lib/drizzle/client.ts";
import { taskItems } from "#/lib/drizzle/schema.ts";

export const getTasks = async (userId: string, isCompleted: boolean) => {
  "use cache";

  cacheLife({
    expire: 3600,
    revalidate: 300,
    stale: 60,
  });

  cacheTag(`tasks-${userId}`);

  try {
    const tasks = await DBClient.select()
      .from(taskItems)
      .where(and(eq(taskItems.userId, userId), eq(taskItems.isCompleted, isCompleted)))
      .orderBy(desc(taskItems.createdAt), desc(taskItems.id))
      .limit(100);

    return z.array(TaskResponseSchema).parse(tasks);
  } catch (error) {
    console.error("タスク一覧取得エラー:", error);
    throw new Error("サーバーエラーが発生しました", { cause: error });
  }
};
