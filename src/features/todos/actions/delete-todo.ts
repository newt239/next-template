"use server";

import { eq } from "drizzle-orm";

import { TodoResponseSchema } from "../types/todo";

import { DBClient } from "@/libs/drizzle/client";
import { todoItems } from "@/libs/drizzle/schema";

export const deleteTodo = async (id: number) => {
  try {
    if (Number.isNaN(id)) {
      return { success: false, error: "無効なIDです" } as const;
    }

    const [todo] = await DBClient.delete(todoItems).where(eq(todoItems.id, id)).returning();

    if (!todo) {
      return { success: false, error: "TODOが見つかりません" } as const;
    }

    const response = TodoResponseSchema.parse(todo);
    return { success: true, todo: response } as const;
  } catch (error) {
    console.error("TODO削除エラー:", error);
    return { success: false, error: "TODOの削除に失敗しました" } as const;
  }
};
