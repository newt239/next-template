"use client";

import { useState, useTransition } from "react";

import { createTodo } from "../../actions/create-todo";

export const TodoForm = () => {
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
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="新しいタスクを入力してください"
          className="flex-1 rounded-md border border-gray-300 p-3 text-base transition-colors duration-200 ease-in-out focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-gray-50"
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending || !title.trim()}
          className="rounded-md bg-blue-500 px-6 py-3 text-base font-medium text-white transition-colors duration-200 ease-in-out hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isPending ? "追加中..." : "追加"}
        </button>
      </div>
    </form>
  );
};
