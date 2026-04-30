import { notFound } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Heading } from "#/components/ui/heading";
import { Text } from "#/components/ui/text";
import { getTaskById } from "#/features/task/actions/get-task";
import { TaskIdParamsSchema } from "#/features/task/schemas/task";

type TaskDetailProps = {
  params: Promise<{ id: string }>;
};

export const TaskDetail = async ({ params }: Readonly<TaskDetailProps>) => {
  const resolvedParams = await params;
  const parsedParams = TaskIdParamsSchema.safeParse(resolvedParams);

  if (!parsedParams.success) {
    notFound();
  }

  const id = Number(parsedParams.data.id);
  const task = await getTaskById(id);

  if (!task) {
    notFound();
  }

  return (
    <main className="bg-bg min-h-screen px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <Card className="border-line-strong">
          <CardHeader className="border-line-subtle border-b pb-4">
            <Heading level={1} className="text-center tracking-tight">
              タスク詳細
            </Heading>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <CardTitle className={task.isCompleted ? "text-muted-fg line-through" : undefined}>
              {task.title}
            </CardTitle>
            <Text className="text-sm">作成日時: {task.createdAt.toLocaleString("ja-JP")}</Text>
            <Text className="text-sm">ステータス: {task.isCompleted ? "完了" : "未完了"}</Text>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
