"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";

import { TaskResponseSchema } from "#/features/task/schemas/task";
import { DBClient } from "#/lib/drizzle/client";
import { taskItems } from "#/lib/drizzle/schema";

export const deleteTask = async (id: number) => {
  try {
    if (Number.isNaN(id)) {
      return { error: "無効なIDです", success: false } as const;
    }

    const deletedTasks = await DBClient.delete(taskItems).where(eq(taskItems.id, id)).returning();
    const task = deletedTasks.at(0);

    if (!task) {
      return { error: "タスクが見つかりません", success: false } as const;
    }

    const response = TaskResponseSchema.parse(task);

    updateTag("tasks");
    updateTag(`task-${response.id}`);

    return { success: true, task: response } as const;
  } catch (error) {
    console.error("タスク削除エラー:", error);
    return { error: "タスクの削除に失敗しました", success: false } as const;
  }
};
