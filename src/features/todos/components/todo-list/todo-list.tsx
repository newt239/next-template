import { TodoItem } from "../todo-item";

import type { Todo } from "../../types/todo";

type TodoListProps = {
  todos: Todo[];
};

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {todos.length === 0 ? (
        <div className="rounded-lg bg-white/10 p-8 text-center text-white">
          <p>タスクがありません。新しいタスクを追加してください。</p>
        </div>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
};
