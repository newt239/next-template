import { Suspense } from "react";

import { TaskDetail } from "#/features/task/components/task-detail";

type TaskDetailPageProps = {
  params: Promise<{ id: string }>;
};

const TaskDetailPage = ({ params }: Readonly<TaskDetailPageProps>) => (
  <Suspense>
    <TaskDetail params={params} />
  </Suspense>
);

export default TaskDetailPage;
