"use server";

import { DBClient } from "#/lib/drizzle/client";
import { todoItems } from "#/lib/drizzle/schema";
import { eq } from "drizzle-orm";

import { TodoResponseSchema, UpdateTodoRequestSchema } from "../schemas/todo";

export const updateTodo = async (id: number, data: { title?: string; isCompleted?: boolean }) => {
  try {
    if (Number.isNaN(id)) {
      return { error: "無効なIDです", success: false } as const;
    }

    const body = UpdateTodoRequestSchema.parse(data);

    const updateData: Partial<typeof todoItems.$inferInsert> = {};
    if (body.title !== undefined) {
      updateData.title = body.title;
    }
    if (body.isCompleted !== undefined) {
      updateData.isCompleted = body.isCompleted;
    }

    const [todo] = await DBClient.update(todoItems)
      .set(updateData)
      .where(eq(todoItems.id, id))
      .returning();

    if (!todo) {
      return { error: "TODOが見つかりません", success: false } as const;
    }

    const response = TodoResponseSchema.parse(todo);
    return { success: true, todo: response } as const;
  } catch (error) {
    console.error("TODO更新エラー:", error);
    return { error: "TODOの更新に失敗しました", success: false } as const;
  }
};
