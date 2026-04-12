import Link from "next/link";

import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader } from "#/components/ui/card";
import { Heading } from "#/components/ui/heading";
import { Text } from "#/components/ui/text";

const TaskNotFoundPage = () => (
  <main className="bg-bg min-h-screen px-4 py-12 sm:px-6 sm:py-16">
    <div className="mx-auto max-w-2xl">
      <Card className="border-line-strong">
        <CardHeader className="border-line-subtle border-b pb-4">
          <Heading level={1} className="text-center tracking-tight">
            タスクが見つかりません
          </Heading>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Text className="text-muted-fg text-sm">
            指定されたタスクは存在しないか、削除された可能性があります。
          </Text>
          <Button intent="primary" size="md">
            <Link href="/">タスク一覧に戻る</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  </main>
);

export default TaskNotFoundPage;
