"use client";

import { useState, useTransition } from "react";

import styles from "./todo-form.module.css";

import createApiClientOnBrowser from "@/libs/hono/browser";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();
  const client = createApiClientOnBrowser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    startTransition(async () => {
      try {
        await client.todos.$post({
          json: { title: title.trim() }
        });
        
        // フォームをリセット
        setTitle("");
        
        // ページをリロードして最新のデータを表示
        window.location.reload();
      } catch (error) {
        console.error("Todoの作成に失敗しました:", error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="新しいタスクを入力してください"
          className={styles.input}
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending || !title.trim()}
          className={styles.button}
        >
          {isPending ? "追加中..." : "追加"}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
