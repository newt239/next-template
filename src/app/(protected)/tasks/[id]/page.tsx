import { Suspense } from "react";

import { Heading } from "#/components/ui/heading";
import { TaskDetail } from "#/features/task/components/task-detail";

type TaskDetailPageProps = {
  params: Promise<{ id: string }>;
};

const TaskDetailPage = ({ params }: Readonly<TaskDetailPageProps>) => (
  <main className="bg-bg min-h-screen px-4 py-12 sm:px-6 sm:py-16">
    <div className="border-line-subtle lg:bg-surface lg:text-surface-fg mx-auto flex max-w-2xl flex-col gap-6 lg:rounded-xl lg:border lg:px-8 lg:py-10">
      <header className="border-line-subtle border-b pb-4">
        <Heading level={1} className="text-center tracking-tight">
          タスク詳細
        </Heading>
      </header>
      <Suspense>
        <TaskDetail params={params} />
      </Suspense>
    </div>
  </main>
);

export default TaskDetailPage;
