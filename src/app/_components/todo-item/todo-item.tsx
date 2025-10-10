"use client";

import { useTransition } from "react";

import styles from "./todo-item.module.css";

import type { Todo } from "../todo-list/types";

import createApiClientOnBrowser from "@/libs/hono/browser";

type TodoItemProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isPending, startTransition] = useTransition();
  const client = createApiClientOnBrowser();

  const handleToggle = async () => {
    startTransition(async () => {
      try {
        await client.todos[":id"].$put({
          param: { id: todo.id.toString() },
          json: { isCompleted: !todo.isCompleted }
        });
        
        // ページをリロードして最新のデータを表示
        window.location.reload();
      } catch (error) {
        console.error("Todoの更新に失敗しました:", error);
      }
    });
  };

  const handleDelete = async () => {
    if (!confirm("このタスクを削除しますか？")) return;

    startTransition(async () => {
      try {
        const client = createApiClientOnBrowser();
        await client.todos[":id"].$delete({
          param: { id: todo.id.toString() }
        });
        
        // ページをリロードして最新のデータを表示
        window.location.reload();
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
