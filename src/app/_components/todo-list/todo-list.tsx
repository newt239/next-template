import TodoForm from "../todo-form";
import TodoItem from "../todo-item";

import styles from "./todo-list.module.css";

import type { Todo } from "./types";

type TodoListProps = {
  todos: Todo[];
};

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Todoアプリ</h1>
        <p>
          {todos.length}個のタスクがあります
        </p>
      </div>
      
      <TodoForm />
      
      <div>
        {todos.length === 0 ? (
          <div>
            <p>タスクがありません。新しいタスクを追加してください。</p>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
