import Link from "next/link";

import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader } from "#/components/ui/card";
import { Heading } from "#/components/ui/heading";
import { Text } from "#/components/ui/text";

const TodoNotFoundPage = () => (
  <main className="min-h-screen bg-muted/30 py-12 px-4 sm:py-16 sm:px-6">
    <div className="mx-auto max-w-2xl">
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <Heading level={1} className="text-center">
            Todo が見つかりません
          </Heading>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 pt-2">
          <Text className="text-sm text-muted-fg">
            指定された Todo は存在しないか、削除された可能性があります。
          </Text>
          <Button intent="primary" size="md">
            <Link href="/">Todo 一覧に戻る</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  </main>
);

export default TodoNotFoundPage;
