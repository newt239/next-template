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
  isCompleted: z.boolean().optional(),
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(100, "タイトルは100文字以内で入力してください")
    .trim()
    .optional(),
});

export const GetTodosQuerySchema = z.object({
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional(),
});

export const TodoResponseSchema = z.object({
  createdAt: epochSecondsToDate,
  id: z.number(),
  isCompleted: z.boolean(),
  title: z.string(),
});

export const TodoResponseFromJsonSchema = z.object({
  createdAt: jsonEpochSecondsToDate,
  id: z.number(),
  isCompleted: z.boolean(),
  title: z.string(),
});

export const GetTodosResponseSchema = z.object({
  todos: z.array(TodoResponseSchema),
});

export const GetTodosResponseFromJsonSchema = z.object({
  todos: z.array(TodoResponseFromJsonSchema),
});

export const GetTodoByIdSchema = z.object({
  id: z.number().int().positive(),
});

export const TodoIdParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, "不正なIDです"),
});
