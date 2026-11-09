import "server-only";
import { Suspense } from "react";

import { TaskListFetcher } from "#/features/task/components/list-fetcher.tsx";
import { TaskListSkeleton } from "#/features/task/components/list-skeleton.tsx";
import { TaskTabs } from "#/features/task/components/tabs.tsx";
import { TaskStatusSchema } from "#/features/task/lib/schema.ts";

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
