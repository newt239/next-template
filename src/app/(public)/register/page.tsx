import type { Metadata } from "next";
import { Suspense } from "react";

import Link from "next/link";

import { Card, CardContent, CardHeader } from "#/components/ui/card";
import { Heading } from "#/components/ui/heading";
import { Text } from "#/components/ui/text";
import { AuthFormSkeleton } from "#/features/auth/components/form-skeleton";
import { SignUpFetcher } from "#/features/auth/components/sign-up-fetcher";

export const metadata: Metadata = {
  title: "新規登録",
};

type RegisterPageProps = {
  searchParams: Promise<{ redirectTo?: string | string[] }>;
};

const RegisterPage = ({ searchParams }: Readonly<RegisterPageProps>) => (
  <main className="bg-bg flex min-h-dvh items-center justify-center px-4 py-12 sm:px-6">
    <div className="w-full max-w-sm">
      <Card>
        <CardHeader className="border-line-subtle border-b pb-4">
          <Heading level={1} className="text-center tracking-tight">
            新規登録
          </Heading>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 pt-6">
          <Suspense fallback={<AuthFormSkeleton fieldCount={3} />}>
            <SignUpFetcher searchParams={searchParams} />
          </Suspense>
          <Text className="text-muted-fg text-center text-sm">
            既にアカウントをお持ちの方は{" "}
            <Link href="/login" className="text-fg underline">
              ログイン
            </Link>
          </Text>
        </CardContent>
      </Card>
    </div>
  </main>
);

export default RegisterPage;
