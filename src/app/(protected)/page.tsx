import type { Metadata } from "next";
import { Suspense } from "react";

import { Heading } from "#/components/ui/heading";
import { TaskFormDialog } from "#/features/task/components/form-dialog";
import { TaskListSkeleton } from "#/features/task/components/list-skeleton";
import { TaskTabsFetcher } from "#/features/task/components/tabs-fetcher";

export const metadata: Metadata = {
  title: "タスク一覧",
};

type HomePageProps = {
  searchParams: Promise<{ status?: string | string[] }>;
};

const HomePage = ({ searchParams }: Readonly<HomePageProps>) => (
  <main className="bg-bg min-h-dvh">
    <div className="lg:border-line-subtle lg:bg-surface lg:text-surface-fg mx-auto flex min-h-dvh max-w-2xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:border-x lg:px-8">
      <header className="border-line-subtle border-b pb-4">
        <Heading level={1} className="text-center tracking-tight">
          Task App
        </Heading>
      </header>
      <Suspense fallback={<TaskListSkeleton />}>
        <TaskTabsFetcher searchParams={searchParams} />
      </Suspense>
      <TaskFormDialog />
    </div>
  </main>
);

export default HomePage;
