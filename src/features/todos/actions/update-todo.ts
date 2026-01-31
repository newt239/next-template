"use server";

import { eq } from "drizzle-orm";

import { UpdateTodoRequestSchema, TodoResponseSchema } from "../schemas/todo";

import { DBClient } from "#/libs/drizzle/client";
import { todoItems } from "#/libs/drizzle/schema";

export const updateTodo = async (id: number, data: { title?: string; isCompleted?: boolean }) => {
  try {
    if (Number.isNaN(id)) {
      return { success: false, error: "無効なIDです" } as const;
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
      return { success: false, error: "TODOが見つかりません" } as const;
    }

    const response = TodoResponseSchema.parse(todo);
    return { success: true, todo: response } as const;
  } catch (error) {
    console.error("TODO更新エラー:", error);
    return { success: false, error: "TODOの更新に失敗しました" } as const;
  }
};
