import type {
  CreateTaskRequestSchema,
  GetTasksQuerySchema,
  GetTasksResponseSchema,
  TaskResponseSchema,
  UpdateTaskRequestSchema,
} from "#/features/task/schemas/task";
import type { z } from "zod";

export type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
};

export type CreateTaskRequestType = z.infer<typeof CreateTaskRequestSchema>;
export type UpdateTaskRequestType = z.infer<typeof UpdateTaskRequestSchema>;
export type GetTasksQueryType = z.infer<typeof GetTasksQuerySchema>;
export type TaskResponseType = z.infer<typeof TaskResponseSchema>;
export type GetTasksResponseType = z.infer<typeof GetTasksResponseSchema>;
