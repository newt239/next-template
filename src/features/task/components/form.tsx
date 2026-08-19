"use client";

import { useState, useTransition } from "react";

import { PlusIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Text } from "#/components/ui/text";
import { TextField } from "#/components/ui/text-field";
import { createTask } from "#/features/task/actions/create";

type TaskFormProps = {
  onSuccess?: () => void;
};

export const TaskForm = ({ onSuccess }: Readonly<TaskFormProps>) => {
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
      const result = await createTask({ title: title.trim() });

      if (result.success) {
        setTitle("");
        toast.success("タスクを追加しました");
        onSuccess?.();
        return;
      }

      setError(result.error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <TextField
          aria-label="新しいタスク"
          value={title}
          onChange={setTitle}
          isDisabled={isPending}
          className="min-w-0 flex-1"
        >
          <Input placeholder="タスクを入力" />
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
