import type { z } from "zod";
import type {
  CreateTodoRequestSchema,
  GetTodosQuerySchema,
  GetTodosResponseSchema,
  TodoResponseSchema,
  UpdateTodoRequestSchema,
} from "#/features/todos/schemas/todo";

export type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
};

export type CreateTodoRequestType = z.infer<typeof CreateTodoRequestSchema>;
export type UpdateTodoRequestType = z.infer<typeof UpdateTodoRequestSchema>;
export type GetTodosQueryType = z.infer<typeof GetTodosQuerySchema>;
export type TodoResponseType = z.infer<typeof TodoResponseSchema>;
export type GetTodosResponseType = z.infer<typeof GetTodosResponseSchema>;
