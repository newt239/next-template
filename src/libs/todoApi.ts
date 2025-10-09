import createApiClient from "./hono/browser";
import type { Todo, CreateTodoRequest, UpdateTodoRequest } from "@/types/todo";

const apiClient = createApiClient();

export const todoApi = {
  async getTodos(): Promise<Todo[]> {
    const response = await apiClient.todos.$get({ query: {} });
    const data = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data.todos.map(todo => ({
      ...todo,
      createdAt: new Date(todo.createdAt)
    }));
  },

  async createTodo(todo: CreateTodoRequest): Promise<Todo> {
    const response = await apiClient.todos.$post({
      json: todo,
    });
    const data = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return {
      ...data,
      createdAt: new Date(data.createdAt)
    };
  },

  async updateTodo(id: number, todo: UpdateTodoRequest): Promise<Todo> {
    const response = await apiClient.todos[":id"].$put({
      param: { id: id.toString() },
      json: todo,
    });
    const data = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return {
      ...data,
      createdAt: new Date(data.createdAt)
    };
  },

  async deleteTodo(id: number): Promise<void> {
    const response = await apiClient.todos[":id"].$delete({
      param: { id: id.toString() },
    });
    const data = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
  },
};
