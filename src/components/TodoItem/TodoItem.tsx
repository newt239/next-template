"use client";

import type { Todo } from "@/types/todo";
import styles from "./TodoItem.module.css";

type TodoItemProps = {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onUpdate: (id: number, title: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(todo.id, event.target.value);
  };

  return (
    <div className={styles.todoItem}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => onToggle(todo.id)}
        className={styles.checkbox}
      />
      <input
        type="text"
        value={todo.title}
        onChange={handleTitleChange}
        className={`${styles.title} ${todo.isCompleted ? styles.completed : ""}`}
      />
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className={styles.deleteButton}
        aria-label="削除"
      >
        ×
      </button>
    </div>
  );
}
