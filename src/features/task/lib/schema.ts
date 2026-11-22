import * as z from "zod";

const TaskTitleSchema = z
  .string()
  .trim()
  .min(1, "タイトルは必須です")
  .max(100, "タイトルは100文字以内で入力してください");

export const TaskIdSchema = z.int("不正なIDです").positive("不正なIDです");

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

export const TaskStatusSchema = z.enum(["incomplete", "completed"]).catch("incomplete");

export const TaskResponseSchema = z.object({
  createdAt: z.date(),
  id: z.number(),
  isCompleted: z.boolean(),
  title: z.string(),
  updatedAt: z.date().nullable(),
});

export const TaskIdParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, "不正なIDです").transform(Number).pipe(TaskIdSchema),
});
