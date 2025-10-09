"use client";

import { useState } from "react";
import styles from "./TodoForm.module.css";

type TodoFormProps = {
  onSubmit: (title: string) => void
}

export default function TodoForm({ onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="新しいTODOを入力..."
        className={styles.input}
        maxLength={100}
      />
      <button type="submit" className={styles.submitButton}>
        追加
      </button>
    </form>
  );
}
