"use server";

import { DBClient } from "#/lib/drizzle/client";
import { todoItems } from "#/lib/drizzle/schema";

import { CreateTodoRequestSchema, TodoResponseSchema } from "../schemas/todo";

export const createTodo = async (data: { title: string }) => {
  try {
    const body = CreateTodoRequestSchema.parse(data);

    const [todo] = await DBClient.insert(todoItems)
      .values({
        isCompleted: false,
        title: body.title,
      })
      .returning();

    const response = TodoResponseSchema.parse(todo);
    return { success: true, todo: response } as const;
  } catch (error) {
    console.error("TODO作成エラー:", error);
    return { error: "TODOの作成に失敗しました", success: false } as const;
  }
};
