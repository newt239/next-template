"use server";

import { and, eq } from "drizzle-orm";
import { updateTag } from "next/cache";

import {
  TaskIdSchema,
  TaskResponseSchema,
  UpdateTaskRequestSchema,
} from "#/features/task/lib/schema.ts";
import { getSession } from "#/lib/better-auth/helper.ts";
import { DBClient } from "#/lib/drizzle/client.ts";
import { taskItems } from "#/lib/drizzle/schema.ts";

export const updateTask = async (id: number, data: { title?: string; isCompleted?: boolean }) => {
  try {
    const session = await getSession();
    if (!session) {
      return { error: "ログインが必要です", success: false } as const;
    }

    const taskId = TaskIdSchema.safeParse(id);
    if (!taskId.success) {
      return { error: taskId.error.issues[0].message, success: false } as const;
    }

    const body = UpdateTaskRequestSchema.safeParse(data);
    if (!body.success) {
      return { error: body.error.issues[0].message, success: false } as const;
    }

    const updatedTasks = await DBClient.update(taskItems)
      .set(body.data)
      .where(and(eq(taskItems.id, taskId.data), eq(taskItems.userId, session.user.id)))
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
      error: "タスクの更新に失敗しました",
      success: false,
    } as const;
  }
};
