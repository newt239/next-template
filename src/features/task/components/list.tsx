import { Card, CardContent } from "#/components/ui/card.tsx";
import { Text } from "#/components/ui/text.tsx";
import { TaskItem } from "#/features/task/components/item.tsx";

import type { Task } from "#/features/task/lib/type.ts";

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
