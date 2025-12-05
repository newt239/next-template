import { TodoItem } from "../todo-item";

import styles from "./todo-list.module.css";

import type { Todo } from "../../types/todo";

type TodoListProps = {
  todos: Todo[];
};

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <div className={styles.container}>
      {todos.length === 0 ? (
        <div>
          <p>タスクがありません。新しいタスクを追加してください。</p>
        </div>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
};
