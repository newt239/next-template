import "server-only";
import { Suspense } from "react";

import { TaskStatusSchema } from "#/features/task/schemas/task";

import { TaskListFetcher } from "../task-list-fetcher";
import { TaskListSkeleton } from "../task-list-skeleton";
import { TaskTabs } from "../task-tabs";

type TaskTabsFetcherProps = {
  searchParams: Promise<{ status?: string | string[] }>;
};

export const TaskTabsFetcher = async ({ searchParams }: TaskTabsFetcherProps) => {
  const resolvedSearchParams = await searchParams;
  const status = TaskStatusSchema.parse(resolvedSearchParams.status);

  return (
    <TaskTabs status={status}>
      <Suspense key={status} fallback={<TaskListSkeleton />}>
        <TaskListFetcher status={status} />
      </Suspense>
    </TaskTabs>
  );
};
