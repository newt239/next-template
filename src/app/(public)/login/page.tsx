import type { Metadata } from "next";
import { Suspense } from "react";

import Link from "next/link";

import { Card, CardContent, CardHeader } from "#/components/ui/card";
import { Heading } from "#/components/ui/heading";
import { Text } from "#/components/ui/text";
import { AuthFormSkeleton } from "#/features/auth/components/form-skeleton";
import { SignInFetcher } from "#/features/auth/components/sign-in-fetcher";

export const metadata: Metadata = {
  title: "ログイン",
};

type LoginPageProps = {
  searchParams: Promise<{ redirectTo?: string | string[] }>;
};

const LoginPage = ({ searchParams }: Readonly<LoginPageProps>) => (
  <main className="bg-bg flex min-h-dvh items-center justify-center px-4 py-12 sm:px-6">
    <div className="w-full max-w-sm">
      <Card>
        <CardHeader className="border-line-subtle border-b pb-4">
          <Heading level={1} className="text-center tracking-tight">
            ログイン
          </Heading>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 pt-6">
          <Suspense fallback={<AuthFormSkeleton fieldCount={2} />}>
            <SignInFetcher searchParams={searchParams} />
          </Suspense>
          <Text className="text-muted-fg text-center text-sm">
            アカウントをお持ちでない方は{" "}
            <Link href="/register" className="text-fg underline">
              新規登録
            </Link>
          </Text>
        </CardContent>
      </Card>
    </div>
  </main>
);

export default LoginPage;
