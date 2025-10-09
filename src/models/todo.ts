import { z } from "zod";

// バリデーションスキーマ
export const CreateTodoRequestSchema = z.object({
  title: z.string().min(1, "タイトルは必須です").max(100, "タイトルは100文字以内で入力してください").trim(),
});

export const UpdateTodoRequestSchema = z.object({
  title: z.string().min(1, "タイトルは必須です").max(100, "タイトルは100文字以内で入力してください").trim().optional(),
  isCompleted: z.boolean().optional(),
});

export const GetTodosQuerySchema = z.object({
  limit: z.string().optional().transform(val => val ? Number.parseInt(val) : undefined),
  offset: z.string().optional().transform(val => val ? Number.parseInt(val) : undefined),
});

// 型定義
export type CreateTodoRequestType = z.infer<typeof CreateTodoRequestSchema>;
export type UpdateTodoRequestType = z.infer<typeof UpdateTodoRequestSchema>;
export type GetTodosQueryType = z.infer<typeof GetTodosQuerySchema>;

export type TodoResponseType = {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
};

export type GetTodosResponseType = {
  todos: TodoResponseType[];
};
