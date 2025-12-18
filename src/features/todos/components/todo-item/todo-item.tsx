"use client";

import { useTransition } from "react";

import { deleteTodo } from "../../actions/delete-todo";
import { updateTodo } from "../../actions/update-todo";

import type { Todo } from "../../types/todo";

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
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
    <div
      className={`flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-all duration-200 ease-in-out hover:border-gray-300 hover:shadow-sm ${todo.isCompleted ? "bg-gray-50 opacity-70" : "bg-white"}`}
    >
      <div className="flex flex-1 items-center gap-3">
        <button
          onClick={handleToggle}
          disabled={isPending}
          className="flex h-6 w-6 items-center justify-center rounded border-2 border-gray-300 bg-white text-sm font-bold text-emerald-600 transition-all duration-200 ease-in-out hover:border-blue-500 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={todo.isCompleted ? "未完了にマーク" : "完了にマーク"}
        >
          {todo.isCompleted && "✓"}
        </button>
        <div className="flex-1">
          <h3
            className={`text-base font-medium leading-relaxed text-gray-900 ${todo.isCompleted ? "text-gray-500 line-through" : ""}`}
          >
            {todo.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{todo.createdAt.toLocaleString("ja-JP")}</p>
        </div>
      </div>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="flex h-8 w-8 items-center justify-center rounded bg-red-500 text-xl font-bold text-white transition-colors duration-200 ease-in-out hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-400"
        aria-label="削除"
      >
        ×
      </button>
    </div>
  );
};
