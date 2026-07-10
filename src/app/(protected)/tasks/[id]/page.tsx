import { Suspense } from "react";

import { Heading } from "#/components/ui/heading";
import { TaskDetail } from "#/features/task/components/task-detail";
import { TaskDetailSkeleton } from "#/features/task/components/task-detail/task-detail-skeleton";

type TaskDetailPageProps = {
  params: Promise<{ id: string }>;
};

const TaskDetailPage = ({ params }: Readonly<TaskDetailPageProps>) => (
  <main className="bg-bg min-h-screen">
    <div className="lg:border-line-subtle lg:bg-surface lg:text-surface-fg mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-4 py-12 sm:px-6 sm:py-16 lg:border-x lg:px-8">
      <header className="border-line-subtle border-b pb-4">
        <Heading level={1} className="text-center tracking-tight">
          タスク詳細
        </Heading>
      </header>
      <Suspense fallback={<TaskDetailSkeleton />}>
        <TaskDetail params={params} />
      </Suspense>
    </div>
  </main>
);

export default TaskDetailPage;
