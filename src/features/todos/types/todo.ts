import { z } from "zod";

const epochSecondsToDate = z.codec(z.number().int().min(0), z.date(), {
  decode: (seconds) => new Date(seconds * 1000),
  encode: (date) => Math.floor(date.getTime() / 1000),
});

const jsonEpochSecondsToDate = z.codec(z.number().int().min(0), z.date(), {
  decode: (seconds) => new Date(seconds * 1000),
  encode: (date) => Math.floor(date.getTime() / 1000),
});

export const CreateTodoRequestSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(100, "タイトルは100文字以内で入力してください")
    .trim(),
});

export const UpdateTodoRequestSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(100, "タイトルは100文字以内で入力してください")
    .trim()
    .optional(),
  isCompleted: z.boolean().optional(),
});

export const GetTodosQuerySchema = z.object({
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional(),
});

export const TodoResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  isCompleted: z.boolean(),
  createdAt: epochSecondsToDate,
});

export const TodoResponseFromJsonSchema = z.object({
  id: z.number(),
  title: z.string(),
  isCompleted: z.boolean(),
  createdAt: jsonEpochSecondsToDate,
});

export const GetTodosResponseSchema = z.object({
  todos: z.array(TodoResponseSchema),
});

export const GetTodosResponseFromJsonSchema = z.object({
  todos: z.array(TodoResponseFromJsonSchema),
});

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
