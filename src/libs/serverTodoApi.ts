import type { Todo } from "@/types/todo";

import process from "node:process";

export async function getTodosFromServer(): Promise<Todo[]> {
  try {
    // サーバーサイドでのデータ取得
    // 実際の実装では、データベースから直接取得するか、
    // 内部APIエンドポイントを呼び出す
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/todos`, {
      cache: "no-store", // 常に最新データを取得
    });

    if (!response.ok) {
      throw new Error("TODO一覧の取得に失敗しました");
    }

    return response.json();
  }
  catch (error) {
    console.error("サーバーサイドでのTODO取得エラー:", error);
    return []; // エラー時は空配列を返す
  }
}
