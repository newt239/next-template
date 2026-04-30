import { Suspense } from "react";

import { TaskDetail } from "#/features/task/components/task-detail";

type TaskDetailPageProps = {
  params: Promise<{ id: string }>;
};

const TaskDetailPage = async ({ params }: Readonly<TaskDetailPageProps>) => {
  const { id } = await params;
  return (
    <Suspense>
      <TaskDetail params={{ id }} />
    </Suspense>
  );
};

export default TaskDetailPage;
