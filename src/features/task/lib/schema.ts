import { z } from "zod";

const CreatedAtSchema = z.union([z.date(), z.number().int().min(0)]).transform((value) => {
  if (value instanceof Date) {
    return value;
  }
  return new Date(value * 1000);
});

const TaskTitleSchema = z
  .string()
  .trim()
  .min(1, "タイトルは必須です")
  .max(100, "タイトルは100文字以内で入力してください");

export const TaskIdSchema = z.number("不正なIDです").int("不正なIDです").positive("不正なIDです");

export const CreateTaskRequestSchema = z.object({
  title: TaskTitleSchema,
});

export const UpdateTaskRequestSchema = z
  .object({
    isCompleted: z.boolean().optional(),
    title: TaskTitleSchema.optional(),
  })
  .refine((value) => value.isCompleted !== undefined || value.title !== undefined, {
    message: "更新する項目がありません",
  });

export const GetTasksQuerySchema = z.object({
  isCompleted: z.boolean().optional(),
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional(),
});

export const TaskStatusSchema = z.enum(["incomplete", "completed"]).catch("incomplete");

export const TaskResponseSchema = z.object({
  createdAt: CreatedAtSchema,
  id: z.number(),
  isCompleted: z.boolean(),
  title: z.string(),
  updatedAt: CreatedAtSchema.nullable(),
});

export const GetTasksResponseSchema = z.object({
  tasks: z.array(TaskResponseSchema),
});

export const TaskIdParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, "不正なIDです"),
});
