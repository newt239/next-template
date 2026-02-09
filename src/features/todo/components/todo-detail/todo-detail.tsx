import { notFound } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Heading } from "#/components/ui/heading";
import { Text } from "#/components/ui/text";
import { getTodoById } from "#/features/todo/actions/get-todo";
import { TodoIdParamsSchema } from "#/features/todo/schemas/todo";

type TodoDetailProps = {
  params: {
    id: string;
  };
};

export const TodoDetail = async ({ params }: TodoDetailProps) => {
  const parsedParams = TodoIdParamsSchema.safeParse(params);

  if (!parsedParams.success) {
    notFound();
  }

  const id = Number(parsedParams.data.id);
  const todo = await getTodoById(id);

  if (!todo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-muted/30 py-12 px-4 sm:py-16 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <Heading level={1} className="text-center">
              Todo 詳細
            </Heading>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <CardTitle className={todo.isCompleted ? "text-muted-fg line-through" : undefined}>
              {todo.title}
            </CardTitle>
            <Text className="text-sm">作成日時: {todo.createdAt.toLocaleString("ja-JP")}</Text>
            <Text className="text-sm">ステータス: {todo.isCompleted ? "完了" : "未完了"}</Text>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
