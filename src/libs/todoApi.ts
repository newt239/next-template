import type { CreateTodoRequest, Todo, UpdateTodoRequest } from "@/types/todo";

export const todoApi = {
  async getTodos(): Promise<Todo[]> {
    const response = await fetch("/api/todos");
    if (!response.ok) {
      throw new Error("TODO一覧の取得に失敗しました");
    }
    return response.json();
  },

  async createTodo(data: CreateTodoRequest): Promise<Todo> {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("TODOの追加に失敗しました");
    }

    return response.json();
  },

  async updateTodo(id: number, data: UpdateTodoRequest): Promise<Todo> {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("TODOの更新に失敗しました");
    }

    return response.json();
  },

  async deleteTodo(id: number): Promise<void> {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("TODOの削除に失敗しました");
    }
  },
};
