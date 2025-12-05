"use client";

import { useTransition } from "react";

import { deleteTodo } from "../../actions/delete-todo";
import { updateTodo } from "../../actions/update-todo";

import styles from "./todo-item.module.css";

import type { Todo } from "../../types/todo";


type TodoItemProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isPending, startTransition] = useTransition();

  const handleToggle = async () => {
    startTransition(async () => {
      try {
        const result = await updateTodo(todo.id, { isCompleted: !todo.isCompleted });
        
        if (result.success) {
          window.location.reload();
        } else {
          console.error("Todoの更新に失敗しました:", result.error);
        }
      } catch (error) {
        console.error("Todoの更新に失敗しました:", error);
      }
    });
  };

  const handleDelete = async () => {
    if (!confirm("このタスクを削除しますか？")) return;

    startTransition(async () => {
      try {
        const result = await deleteTodo(todo.id);
        
        if (result.success) {
          window.location.reload();
        } else {
          console.error("Todoの削除に失敗しました:", result.error);
        }
      } catch (error) {
        console.error("Todoの削除に失敗しました:", error);
      }
    });
  };

  return (
    <div className={`${styles.todoItem} ${todo.isCompleted ? styles.completed : ""}`}>
      <div className={styles.content}>
        <button
          onClick={handleToggle}
          disabled={isPending}
          className={styles.checkbox}
          aria-label={todo.isCompleted ? "未完了にマーク" : "完了にマーク"}
        >
          {todo.isCompleted && "✓"}
        </button>
        <div className={styles.text}>
          <h3 className={styles.title}>{todo.title}</h3>
          <p className={styles.date}>
            {todo.createdAt.toLocaleString("ja-JP")}
          </p>
        </div>
      </div>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className={styles.deleteButton}
        aria-label="削除"
      >
        ×
      </button>
    </div>
  );
};

export default TodoItem;

