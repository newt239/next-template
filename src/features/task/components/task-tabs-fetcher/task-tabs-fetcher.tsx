import "server-only";
import { Suspense } from "react";

import { TaskListFetcher } from "#/features/task/components/task-list-fetcher";
import { TaskListSkeleton } from "#/features/task/components/task-list-skeleton";
import { TaskTabs } from "#/features/task/components/task-tabs";
import { TaskStatusSchema } from "#/features/task/schemas/task";

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
