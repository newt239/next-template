"use server";

import { updateTag } from "next/cache";

import { CreateTaskRequestSchema, TaskResponseSchema } from "#/features/task/lib/schema.ts";
import { getSession } from "#/lib/better-auth/helper.ts";
import { DBClient } from "#/lib/drizzle/client.ts";
import { taskItems } from "#/lib/drizzle/schema.ts";

export const createTask = async (data: { title: string }) => {
  try {
    const session = await getSession();
    if (!session) {
      return { error: "ログインが必要です", success: false } as const;
    }

    const body = CreateTaskRequestSchema.safeParse(data);
    if (!body.success) {
      return { error: body.error.issues[0].message, success: false } as const;
    }

    const [task] = await DBClient.insert(taskItems)
      .values({
        isCompleted: false,
        title: body.data.title,
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
      error: "タスクの作成に失敗しました",
      success: false,
    } as const;
  }
};
