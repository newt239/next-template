"use client";

import { useState, useTransition } from "react";

import { createTodo } from "../../actions/create-todo";

import styles from "./todo-form.module.css";


const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }

    startTransition(async () => {
      try {
        const result = await createTodo({ title: title.trim() });
        
        if (result.success) {
          setTitle("");
          window.location.reload();
        } else {
          console.error("Todoの作成に失敗しました:", result.error);
        }
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

