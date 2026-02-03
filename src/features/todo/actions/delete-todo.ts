"use server";

import { DBClient } from "#/lib/drizzle/client";
import { todoItems } from "#/lib/drizzle/schema";
import { eq } from "drizzle-orm";

import { TodoResponseSchema } from "../schemas/todo";

export const deleteTodo = async (id: number) => {
  try {
    if (Number.isNaN(id)) {
      return { error: "無効なIDです", success: false } as const;
    }

    const [todo] = await DBClient.delete(todoItems).where(eq(todoItems.id, id)).returning();

    if (!todo) {
      return { error: "TODOが見つかりません", success: false } as const;
    }

    const response = TodoResponseSchema.parse(todo);
    return { success: true, todo: response } as const;
  } catch (error) {
    console.error("TODO削除エラー:", error);
    return { error: "TODOの削除に失敗しました", success: false } as const;
  }
};
