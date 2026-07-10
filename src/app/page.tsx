import { Suspense } from "react";

import { Heading } from "#/components/ui/heading";
import { TaskFormDialog } from "#/features/task/components/task-form";
import { TaskListFetcher } from "#/features/task/components/task-list/task-list-fetcher";
import { TaskListSkeleton } from "#/features/task/components/task-list/task-list-skeleton";

const HomePage = () => (
  <main className="bg-bg min-h-screen px-4 py-12 sm:px-6 sm:py-16">
    <div className="border-line-subtle lg:bg-surface lg:text-surface-fg mx-auto flex max-w-2xl flex-col gap-8 lg:rounded-xl lg:border lg:px-8 lg:py-10">
      <header className="border-line-subtle border-b pb-4">
        <Heading level={1} className="text-center tracking-tight">
          Task App
        </Heading>
      </header>
      <Suspense fallback={<TaskListSkeleton />}>
        <TaskListFetcher />
      </Suspense>
      <TaskFormDialog />
    </div>
  </main>
);

export default HomePage;
