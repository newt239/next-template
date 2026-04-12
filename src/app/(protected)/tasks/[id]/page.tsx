import { Suspense } from "react";

import { TaskDetail } from "#/features/task/components/task-detail";

type TaskDetailPageProps = {
  params: Promise<{ id: string }>;
};

const TaskDetailPage = async ({ params }: TaskDetailPageProps) => (
  <Suspense>
    <TaskDetailContent params={params} />
  </Suspense>
);

const TaskDetailContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <TaskDetail params={{ id }} />;
};

export default TaskDetailPage;
