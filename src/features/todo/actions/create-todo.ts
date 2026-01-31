"use server";

import { CreateTodoRequestSchema, TodoResponseSchema } from "../schemas/todo";

import { DBClient } from "#/lib/drizzle/client";
import { todoItems } from "#/lib/drizzle/schema";

export const createTodo = async (data: { title: string }) => {
  try {
    const body = CreateTodoRequestSchema.parse(data);

    const [todo] = await DBClient.insert(todoItems)
      .values({
        title: body.title,
        isCompleted: false,
      })
      .returning();

    const response = TodoResponseSchema.parse(todo);
    return { success: true, todo: response } as const;
  } catch (error) {
    console.error("TODO作成エラー:", error);
    return { success: false, error: "TODOの作成に失敗しました" } as const;
  }
};
