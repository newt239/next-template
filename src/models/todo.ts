import { z } from "zod";

// Unix timestamp（秒）からDateオブジェクトへの変換用Codec
const epochSecondsToDate = z.codec(
  z.number().int().min(0), // 入力: Unix timestamp（秒）
  z.date(),                // 出力: Dateオブジェクト
  {
    decode: (seconds) => new Date(seconds * 1000), // Unix timestamp → Date
    encode: (date) => Math.floor(date.getTime() / 1000), // Date → Unix timestamp
  }
);

// JSONレスポンス用のスキーマ（Unix timestampをDateオブジェクトに変換）
const jsonEpochSecondsToDate = z.codec(
  z.number().int().min(0), // 入力: Unix timestamp（数値）
  z.date(),                // 出力: Dateオブジェクト
  {
    decode: (seconds) => new Date(seconds * 1000), // Unix timestamp → Date
    encode: (date) => Math.floor(date.getTime() / 1000), // Date → Unix timestamp
  }
);

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

// Todoレスポンス用のスキーマ（Date型の変換を含む）
export const TodoResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  isCompleted: z.boolean(),
  createdAt: epochSecondsToDate, // Unix timestampをDateオブジェクトに変換
});

// JSONレスポンス用のスキーマ（Unix timestampをDateオブジェクトに変換）
export const TodoResponseFromJsonSchema = z.object({
  id: z.number(),
  title: z.string(),
  isCompleted: z.boolean(),
  createdAt: jsonEpochSecondsToDate, // Unix timestampをDateオブジェクトに変換
});

export const GetTodosResponseSchema = z.object({
  todos: z.array(TodoResponseSchema),
});

export const GetTodosResponseFromJsonSchema = z.object({
  todos: z.array(TodoResponseFromJsonSchema),
});

// 型定義
export type CreateTodoRequestType = z.infer<typeof CreateTodoRequestSchema>;
export type UpdateTodoRequestType = z.infer<typeof UpdateTodoRequestSchema>;
export type GetTodosQueryType = z.infer<typeof GetTodosQuerySchema>;

export type TodoResponseType = z.infer<typeof TodoResponseSchema>;
export type GetTodosResponseType = z.infer<typeof GetTodosResponseSchema>;
