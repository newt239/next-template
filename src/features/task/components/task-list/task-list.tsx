import { Card, CardContent } from "#/components/ui/card";
import { Text } from "#/components/ui/text";

import { TaskItem } from "../task-item";

import type { Task } from "#/features/task/types/task";

type TaskListProps = {
  tasks: Task[];
};

export const TaskList = ({ tasks }: TaskListProps) => (
  <div className="flex flex-col gap-4">
    {tasks.length === 0 ? (
      <Card className="bg-muted/30">
        <CardContent className="py-8 text-center">
          <Text>タスクがありません。新しいタスクを追加してください。</Text>
        </CardContent>
      </Card>
    ) : (
      tasks.map((task) => <TaskItem key={task.id} task={task} />)
    )}
  </div>
);
