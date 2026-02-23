import Link from "next/link";

import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader } from "#/components/ui/card";
import { Heading } from "#/components/ui/heading";
import { Text } from "#/components/ui/text";

const NotFoundPage = () => (
  <main className="min-h-screen bg-bg py-12 px-4 sm:py-16 sm:px-6">
    <div className="mx-auto max-w-2xl">
      <Card className="border-line-strong">
        <CardHeader className="border-b border-line-subtle pb-4">
          <Heading level={1} className="text-center tracking-tight">
            ページが見つかりません
          </Heading>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Text className="text-sm text-muted-fg">
            お探しのページは存在しないか、削除された可能性があります。
          </Text>
          <Button intent="primary" size="md">
            <Link href="/">ホームに戻る</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  </main>
);

export default NotFoundPage;
