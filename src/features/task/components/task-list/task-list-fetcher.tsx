import "server-only";
import { getTasks } from "#/features/task/actions/get-tasks";

import { TaskList } from "./task-list";

export const TaskListFetcher = async () => {
  const response = await getTasks();

  return <TaskList tasks={response.tasks} />;
};
