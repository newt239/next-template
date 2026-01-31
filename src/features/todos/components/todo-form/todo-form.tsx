"use client";

import { useState, useTransition } from "react";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/field";
import { TextField } from "#/components/ui/text-field";
import { createTodo } from "#/features/todos/actions/create-todo";

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
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <TextField className="min-w-0 flex-1">
          <Label>新しいタスク</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="新しいタスクを入力してください"
            disabled={isPending}
          />
        </TextField>
        <Button type="submit" isDisabled={isPending || !title.trim()} className="shrink-0">
          {isPending ? "追加中..." : "追加"}
        </Button>
      </div>
    </form>
  );
};
