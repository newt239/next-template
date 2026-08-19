"use client";

import type { Route } from "next";
import { useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Text } from "#/components/ui/text";
import { TextField } from "#/components/ui/text-field";
import { SignInRequestSchema } from "#/features/auth/lib/schema";
import { authClient } from "#/lib/better-auth/client";

type SignInFormProps = {
  redirectTo: Route;
};

export const SignInForm = ({ redirectTo }: Readonly<SignInFormProps>) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const parsed = SignInRequestSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    startTransition(async () => {
      const result = await authClient.signIn.email(parsed.data);

      if (!result.error) {
        router.replace(redirectTo);
        router.refresh();
        return;
      }

      setError(
        result.error.status === 429
          ? "リクエストが多すぎます。しばらく待ってから再度お試しください"
          : "メールアドレスまたはパスワードが正しくありません",
      );
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <Input autoComplete="current-password" />
      </TextField>
      {error && (
        <Text role="alert" className="text-danger text-sm">
          {error}
        </Text>
      )}
      <Button type="submit" isDisabled={isPending}>
        {isPending ? "ログイン中..." : "ログイン"}
      </Button>
    </form>
  );
};
