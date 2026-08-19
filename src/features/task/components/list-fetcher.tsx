import "server-only";
import { getTasks } from "#/features/task/actions/list";
import { TaskList } from "#/features/task/components/list";
import { requireSession } from "#/lib/better-auth/helper";

import type { TaskStatus } from "#/features/task/lib/type";

type TaskListFetcherProps = {
  status: TaskStatus;
};

export const TaskListFetcher = async ({ status }: TaskListFetcherProps) => {
  const session = await requireSession();
  const response = await getTasks(session.user.id, { isCompleted: status === "completed" });

  return (
    <TaskList
      tasks={response.tasks}
      emptyMessage={
        status === "completed" ? "完了済みのタスクはありません" : "未着手のタスクはありません"
      }
    />
  );
};
