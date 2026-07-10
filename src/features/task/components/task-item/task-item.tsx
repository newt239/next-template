"use client";

import { useState, useTransition } from "react";

import { CheckIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "#/components/ui/button";
import { Card, CardContent, CardTitle } from "#/components/ui/card";
import { DialogClose, DialogFooter, DialogHeader } from "#/components/ui/dialog";
import { ModalContent } from "#/components/ui/modal";
import { Text } from "#/components/ui/text";
import { deleteTask } from "#/features/task/actions/delete-task";
import { updateTask } from "#/features/task/actions/update-task";

import type { Task } from "#/features/task/types/task";

type TaskItemProps = {
  task: Task;
  formattedCreatedAt: string;
};

export const TaskItem = ({ task, formattedCreatedAt }: TaskItemProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [liveMessage, setLiveMessage] = useState("");

  const handleToggle = () => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await updateTask(task.id, { isCompleted: !task.isCompleted });

        if (result.success) {
          setLiveMessage(task.isCompleted ? "タスクを未完了にしました" : "タスクを完了にしました");
          router.refresh();
        } else {
          setError("タスクの更新に失敗しました");
        }
      } catch {
        setError("タスクの更新に失敗しました");
      }
    });
  };

  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await deleteTask(task.id);

        if (result.success) {
          setLiveMessage("タスクを削除しました");
          setIsConfirmOpen(false);
          router.refresh();
        } else {
          setError("タスクの削除に失敗しました");
          setIsConfirmOpen(false);
        }
      } catch {
        setError("タスクの削除に失敗しました");
        setIsConfirmOpen(false);
      }
    });
  };

  return (
    <Card className={task.isCompleted ? "bg-surface-subtle opacity-70" : "bg-surface-subtle"}>
      <CardContent className="flex items-center gap-3 py-4">
        <Button
          type="button"
          intent="outline"
          size="sq-sm"
          onPress={handleToggle}
          isDisabled={isPending}
          aria-label={task.isCompleted ? "未完了にマーク" : "完了にマーク"}
          className="min-h-9 min-w-9 shrink-0"
        >
          <CheckIcon data-slot="icon" className={task.isCompleted ? undefined : "opacity-0"} />
        </Button>
        <div className="min-w-0 flex-1">
          <CardTitle
            className={task.isCompleted ? "text-muted-fg font-normal line-through" : undefined}
          >
            <Link href={`/tasks/${task.id}`} className="hover:underline">
              {task.title}
            </Link>
          </CardTitle>
          <Text className="mt-1 text-sm">{formattedCreatedAt}</Text>
          {error && (
            <Text role="alert" className="text-danger mt-1 text-sm">
              {error}
            </Text>
          )}
        </div>
        <Button
          type="button"
          intent="danger"
          size="sq-sm"
          onPress={() => {
            setIsConfirmOpen(true);
          }}
          isDisabled={isPending}
          aria-label="削除"
          className="shrink-0"
        >
          <TrashIcon data-slot="icon" />
        </Button>
        <span aria-live="polite" className="sr-only">
          {liveMessage}
        </span>
        <ModalContent
          role="alertdialog"
          isOpen={isConfirmOpen}
          onOpenChange={setIsConfirmOpen}
          isDismissable={false}
        >
          <DialogHeader
            title="タスクの削除"
            description={`「${task.title}」を削除しますか？この操作は取り消せません。`}
          />
          <DialogFooter>
            <DialogClose isDisabled={isPending}>キャンセル</DialogClose>
            <Button intent="danger" onPress={handleDelete} isDisabled={isPending}>
              {isPending ? "削除中..." : "削除する"}
            </Button>
          </DialogFooter>
        </ModalContent>
      </CardContent>
    </Card>
  );
};
