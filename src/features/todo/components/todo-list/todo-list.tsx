import { Card, CardContent } from "#/components/ui/card";
import { Text } from "#/components/ui/text";

import { TodoItem } from "../todo-item";

import type { Todo } from "#/features/todo/types/todo";

type TodoListProps = {
  todos: Todo[];
};

export const TodoList = ({ todos }: TodoListProps) => (
  <div className="flex flex-col gap-4">
    {todos.length === 0 ? (
      <Card className="bg-muted/30">
        <CardContent className="py-8 text-center">
          <Text>タスクがありません。新しいタスクを追加してください。</Text>
        </CardContent>
      </Card>
    ) : (
      todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
    )}
  </div>
);
