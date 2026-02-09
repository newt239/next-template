"use server";

import { updateTag } from "next/cache";

import { DBClient } from "#/lib/drizzle/client";
import { taskItems } from "#/lib/drizzle/schema";
import { eq } from "drizzle-orm";

import { TaskResponseSchema } from "../schemas/task";

export const deleteTask = async (id: number) => {
  try {
    if (Number.isNaN(id)) {
      return { error: "無効なIDです", success: false } as const;
    }

    const [task] = await DBClient.delete(taskItems).where(eq(taskItems.id, id)).returning();

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
