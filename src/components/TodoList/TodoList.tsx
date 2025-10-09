"use client";

import type { Todo } from "@/types/todo";
import TodoItem from "../TodoItem";
import styles from "./TodoList.module.css";

type TodoListProps = {
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onUpdate: (id: number, title: string) => void
}

export default function TodoList({ todos, onToggle, onDelete, onUpdate }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>まだTODOがありません。</p>
        <p>新しいTODOを追加してみましょう！</p>
      </div>
    );
  }

  return (
    <div className={styles.todoList}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
