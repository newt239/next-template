"use client";

import type { Route } from "next";
import { useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Text } from "#/components/ui/text";
import { TextField } from "#/components/ui/text-field";
import { SignUpRequestSchema } from "#/features/auth/lib/schema";
import { authClient } from "#/lib/better-auth/client";

type SignUpFormProps = {
  redirectTo: Route;
};

const signUpErrorMessage = (code: string | undefined, status: number) => {
  if (status === 429) {
    return "リクエストが多すぎます。しばらく待ってから再度お試しください";
  }
  if (code === "USER_ALREADY_EXISTS") {
    return "このメールアドレスは既に登録されています";
  }
  return "アカウントの登録に失敗しました";
};

export const SignUpForm = ({ redirectTo }: Readonly<SignUpFormProps>) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const parsed = SignUpRequestSchema.safeParse({ email, name, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    startTransition(async () => {
      const result = await authClient.signUp.email(parsed.data);

      if (!result.error) {
        router.replace(redirectTo);
        router.refresh();
        return;
      }

      setError(signUpErrorMessage(result.error.code, result.error.status));
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextField isRequired value={name} onChange={setName} isDisabled={isPending}>
        <Label>名前</Label>
        <Input autoComplete="name" placeholder="山田 太郎" />
      </TextField>
      <TextField isRequired type="email" value={email} onChange={setEmail} isDisabled={isPending}>
        <Label>メールアドレス</Label>
        <Input autoComplete="email" placeholder="you@example.com" />
      </TextField>
      <TextField
        isRequired
        type="password"
        value={password}
        onChange={setPassword}
        isDisabled={isPending}
      >
        <Label>パスワード</Label>
        <Input autoComplete="new-password" />
        <Text slot="description" className="text-muted-fg text-sm">
          8文字以上で入力してください
        </Text>
      </TextField>
      {error && (
        <Text role="alert" className="text-danger text-sm">
          {error}
        </Text>
      )}
      <Button type="submit" isDisabled={isPending}>
        {isPending ? "登録中..." : "アカウントを作成"}
      </Button>
    </form>
  );
};
