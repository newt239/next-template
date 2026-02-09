import { TaskDetail } from "#/features/task/components/task-detail";

const TaskDetailPage = ({ params }: { params: { id: string } }) => <TaskDetail params={params} />;

export default TaskDetailPage;
