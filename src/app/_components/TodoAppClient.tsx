"use client";

import { useState } from "react";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { todoApi } from "@/libs/todoApi";
import type { Todo } from "@/types/todo";
import styles from "./TodoApp.module.css";

type TodoAppClientProps = {
  initialTodos: Todo[]
}

export default function TodoAppClient({ initialTodos }: TodoAppClientProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [error, setError] = useState<string | null>(null);

  const handleAddTodo = async (title: string) => {
    try {
      const newTodo = await todoApi.createTodo({ title });
      setTodos(prev => [...prev, newTodo]);
    }
    catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    }
  };

  const handleToggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo)
      return;

    try {
      const updatedTodo = await todoApi.updateTodo(id, {
        isCompleted: !todo.isCompleted,
      });
      setTodos(prev =>
        prev.map(t => (t.id === id ? updatedTodo : t)),
      );
    }
    catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    }
  };

  const handleUpdateTodo = async (id: number, title: string) => {
    try {
      const updatedTodo = await todoApi.updateTodo(id, { title });
      setTodos(prev =>
        prev.map(t => (t.id === id ? updatedTodo : t)),
      );
    }
    catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));
    }
    catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>TODOアプリ</h1>
        {error && (
          <div className={styles.error}>
            {error}
            <button
              type="button"
              onClick={() => setError(null)}
              className={styles.errorClose}
            >
              ×
            </button>
          </div>
        )}
      </header>

      <main className={styles.main}>
        <TodoForm onSubmit={handleAddTodo} />
        <TodoList
          todos={todos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onUpdate={handleUpdateTodo}
        />
      </main>
    </div>
  );
}
