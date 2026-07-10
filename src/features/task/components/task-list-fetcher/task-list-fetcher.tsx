import "server-only";
import { getTasks } from "#/features/task/actions/get-tasks";

import { TaskList } from "../task-list";

import type { TaskStatus } from "#/features/task/types/task";

type TaskListFetcherProps = {
  status: TaskStatus;
};

export const TaskListFetcher = async ({ status }: TaskListFetcherProps) => {
  const response = await getTasks({ isCompleted: status === "completed" });

  return (
    <TaskList
      tasks={response.tasks}
      emptyMessage={
        status === "completed" ? "完了済みのタスクはありません" : "未着手のタスクはありません"
      }
    />
  );
};
