import { Card, CardContent } from "#/components/ui/card";
import { Text } from "#/components/ui/text";
import { TaskItem } from "#/features/task/components/task-item";

import type { Task } from "#/features/task/types/task";

type TaskListProps = {
  tasks: Task[];
  emptyMessage?: string;
};

export const TaskList = ({ tasks, emptyMessage = "タスクがありません" }: TaskListProps) => (
  <div className="flex flex-col gap-4">
    {tasks.length === 0 ? (
      <Card className="border-line-subtle bg-surface-subtle">
        <CardContent className="py-8 text-center">
          <Text>{emptyMessage}</Text>
        </CardContent>
      </Card>
    ) : (
      tasks.map((task) => <TaskItem key={task.id} task={task} />)
    )}
  </div>
);
