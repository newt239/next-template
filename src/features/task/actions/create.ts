"use server";

import { updateTag } from "next/cache";
import { z } from "zod";

import { CreateTaskRequestSchema, TaskResponseSchema } from "#/features/task/lib/schema";
import { getSession } from "#/lib/better-auth/helper";
import { DBClient } from "#/lib/drizzle/client";
import { taskItems } from "#/lib/drizzle/schema";

export const createTask = async (data: { title: string }) => {
  try {
    const session = await getSession();
    if (!session) {
      return { error: "ログインが必要です", success: false } as const;
    }

    const body = CreateTaskRequestSchema.parse(data);

    const [task] = await DBClient.insert(taskItems)
      .values({
        isCompleted: false,
        title: body.title,
        userId: session.user.id,
      })
      .returning();

    const response = TaskResponseSchema.parse(task);

    updateTag(`tasks-${session.user.id}`);
    updateTag(`task-${session.user.id}-${response.id}`);

    return { success: true, task: response } as const;
  } catch (error) {
    console.error("タスク作成エラー:", error);
    return {
      error: error instanceof z.ZodError ? error.issues[0].message : "タスクの作成に失敗しました",
      success: false,
    } as const;
  }
};
