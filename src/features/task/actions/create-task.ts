"use server";

import { updateTag } from "next/cache";

import { DBClient } from "#/lib/drizzle/client";
import { taskItems } from "#/lib/drizzle/schema";

import { CreateTaskRequestSchema, TaskResponseSchema } from "../schemas/task";

export const createTask = async (data: { title: string }) => {
  try {
    const body = CreateTaskRequestSchema.parse(data);

    const [task] = await DBClient.insert(taskItems)
      .values({
        isCompleted: false,
        title: body.title,
      })
      .returning();

    const response = TaskResponseSchema.parse(task);

    updateTag("tasks");
    updateTag(`task-${response.id}`);

    return { success: true, task: response } as const;
  } catch (error) {
    console.error("タスク作成エラー:", error);
    return { error: "タスクの作成に失敗しました", success: false } as const;
  }
};
