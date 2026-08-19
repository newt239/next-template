"use server";

import { and, eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { z } from "zod";

import {
  TaskIdSchema,
  TaskResponseSchema,
  UpdateTaskRequestSchema,
} from "#/features/task/lib/schema";
import { getSession } from "#/lib/better-auth/helper";
import { DBClient } from "#/lib/drizzle/client";
import { taskItems } from "#/lib/drizzle/schema";

export const updateTask = async (id: number, data: { title?: string; isCompleted?: boolean }) => {
  try {
    const session = await getSession();
    if (!session) {
      return { error: "ログインが必要です", success: false } as const;
    }

    const taskId = TaskIdSchema.parse(id);
    const body = UpdateTaskRequestSchema.parse(data);

    const updatedTasks = await DBClient.update(taskItems)
      .set(body)
      .where(and(eq(taskItems.id, taskId), eq(taskItems.userId, session.user.id)))
      .returning();
    const task = updatedTasks.at(0);

    if (!task) {
      return { error: "タスクが見つかりません", success: false } as const;
    }

    const response = TaskResponseSchema.parse(task);

    updateTag(`tasks-${session.user.id}`);
    updateTag(`task-${session.user.id}-${response.id}`);

    return { success: true, task: response } as const;
  } catch (error) {
    console.error("タスク更新エラー:", error);
    return {
      error: error instanceof z.ZodError ? error.issues[0].message : "タスクの更新に失敗しました",
      success: false,
    } as const;
  }
};
