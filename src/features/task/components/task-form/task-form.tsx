"use client";

import { useState, useTransition } from "react";

import { PlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Text } from "#/components/ui/text";
import { TextField } from "#/components/ui/text-field";
import { createTask } from "#/features/task/actions/create-task";

type TaskFormProps = {
  onSuccess?: () => void;
};

export const TaskForm = ({ onSuccess }: TaskFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        const result = await createTask({ title: title.trim() });

        if (result.success) {
          setTitle("");
          router.refresh();
          onSuccess?.();
        } else {
          setError(result.error);
        }
      } catch {
        setError("タスクの作成に失敗しました");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <TextField aria-label="新しいタスク" className="min-w-0 flex-1">
          <Input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="タスクを入力"
            disabled={isPending}
          />
        </TextField>
        <Button type="submit" isDisabled={isPending || !title.trim()} className="shrink-0">
          <PlusIcon data-slot="icon" />
          {isPending ? "追加中..." : "追加"}
        </Button>
      </div>
      {error && (
        <Text role="alert" className="text-danger mt-2 text-sm">
          {error}
        </Text>
      )}
    </form>
  );
};
