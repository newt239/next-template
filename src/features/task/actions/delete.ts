"use server";

import { and, eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { z } from "zod";

import { TaskIdSchema, TaskResponseSchema } from "#/features/task/lib/schema";
import { getSession } from "#/lib/better-auth/helper";
import { DBClient } from "#/lib/drizzle/client";
import { taskItems } from "#/lib/drizzle/schema";

export const deleteTask = async (id: number) => {
  try {
    const session = await getSession();
    if (!session) {
      return { error: "ログインが必要です", success: false } as const;
    }

    const taskId = TaskIdSchema.parse(id);

    const deletedTasks = await DBClient.delete(taskItems)
      .where(and(eq(taskItems.id, taskId), eq(taskItems.userId, session.user.id)))
      .returning();
    const task = deletedTasks.at(0);

    if (!task) {
      return { error: "タスクが見つかりません", success: false } as const;
    }

    const response = TaskResponseSchema.parse(task);

    updateTag(`tasks-${session.user.id}`);
    updateTag(`task-${session.user.id}-${response.id}`);

    return { success: true, task: response } as const;
  } catch (error) {
    console.error("タスク削除エラー:", error);
    return {
      error: error instanceof z.ZodError ? error.issues[0].message : "タスクの削除に失敗しました",
      success: false,
    } as const;
  }
};
