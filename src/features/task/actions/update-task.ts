"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";

import { TaskResponseSchema, UpdateTaskRequestSchema } from "#/features/task/schemas/task";
import { DBClient } from "#/lib/drizzle/client";
import { taskItems } from "#/lib/drizzle/schema";

export const updateTask = async (id: number, data: { title?: string; isCompleted?: boolean }) => {
  try {
    if (Number.isNaN(id)) {
      return { error: "無効なIDです", success: false } as const;
    }

    const body = UpdateTaskRequestSchema.parse(data);

    const updateData: Partial<typeof taskItems.$inferInsert> = {};
    if (body.title !== undefined) {
      updateData.title = body.title;
    }
    if (body.isCompleted !== undefined) {
      updateData.isCompleted = body.isCompleted;
    }

    const updatedTasks = await DBClient.update(taskItems)
      .set(updateData)
      .where(eq(taskItems.id, id))
      .returning();
    const task = updatedTasks.at(0);

    if (!task) {
      return { error: "タスクが見つかりません", success: false } as const;
    }

    const response = TaskResponseSchema.parse(task);

    updateTag("tasks");
    updateTag(`task-${response.id}`);

    return { success: true, task: response } as const;
  } catch (error) {
    console.error("タスク更新エラー:", error);
    return { error: "タスクの更新に失敗しました", success: false } as const;
  }
};
