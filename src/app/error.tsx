"use client";

import Link from "next/link";

import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader } from "#/components/ui/card";
import { Heading } from "#/components/ui/heading";
import { Text } from "#/components/ui/text";

const ErrorPage = () => (
  <main className="bg-bg min-h-screen px-4 py-12 sm:px-6 sm:py-16">
    <div className="mx-auto max-w-2xl">
      <Card className="border-line-strong">
        <CardHeader className="border-line-subtle border-b pb-4">
          <Heading level={1} className="text-center tracking-tight">
            エラーが発生しました
          </Heading>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Text className="text-muted-fg text-sm">
            一時的な問題の可能性があります。ページを再読み込みするか、時間をおいて再度お試しください。
          </Text>
          <div className="flex gap-3">
            <Button intent="outline" size="md">
              <Link href="/">ホームに戻る</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </main>
);

export default ErrorPage;
