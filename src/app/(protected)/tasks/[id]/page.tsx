import { TaskDetail } from "#/features/task/components/task-detail";

type TaskDetailPageProps = {
  params: Promise<{ id: string }>;
};

const TaskDetailPage = async ({ params }: TaskDetailPageProps) => {
  const { id } = await params;
  return <TaskDetail params={{ id }} />;
};

export default TaskDetailPage;
