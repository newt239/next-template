import type { Route } from "next";

import { z } from "zod";

export const SignUpRequestSchema = z.object({
  email: z.email("メールアドレスの形式が正しくありません"),
  name: z.string().trim().min(1, "名前は必須です").max(50, "名前は50文字以内で入力してください"),
  password: z
    .string()
    .min(8, "パスワードは8文字以上で入力してください")
    .max(128, "パスワードは128文字以内で入力してください"),
});

export const SignInRequestSchema = z.object({
  email: z.email("メールアドレスの形式が正しくありません"),
  password: z.string().min(1, "パスワードを入力してください"),
});

// アプリ内の絶対パスであることを Zod で検証済みのため typedRoutes の Route として扱う
export const RedirectToSchema = z
  .string()
  .regex(/^\/(?![/\\])/, "不正なリダイレクト先です")
  .catch("/")
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  .transform((value) => value as Route);
