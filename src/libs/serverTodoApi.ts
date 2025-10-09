import { createApiClientOnServer } from "./hono/server";
import type { Todo } from "@/types/todo";

export async function getTodosFromServer(): Promise<Todo[]> {
  const apiClient = await createApiClientOnServer();
  const response = await apiClient.todos.$get({ query: {} });
  const data = await response.json();
  if ("error" in data) {
    throw new Error(data.error);
  }
  return data.todos.map(todo => ({
    ...todo,
    createdAt: new Date(todo.createdAt)
  }));
}
