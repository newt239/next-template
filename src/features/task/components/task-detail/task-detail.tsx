import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <div className="space-y-4">
      <Link
        href="/"
        className="text-muted-fg hover:text-fg focus-visible:outline-ring inline-flex items-center gap-1.5 text-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <ArrowLeftIcon className="size-4" />
        トップへ戻る
      </Link>
      <Heading level={2} className={task.isCompleted ? "text-muted-fg line-through" : undefined}>
        {task.title}
      </Heading>
      <Text className="text-sm">作成日時: {task.createdAt.toLocaleString("ja-JP")}</Text>
      <Text className="text-sm">ステータス: {task.isCompleted ? "完了" : "未完了"}</Text>
    </div>
  );
};
