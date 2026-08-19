"use client";

import { useState, useTransition } from "react";

import { CheckIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "#/components/ui/button";
import { Card, CardContent, CardTitle } from "#/components/ui/card";
import { DialogClose, DialogFooter, DialogHeader } from "#/components/ui/dialog";
import { ModalContent } from "#/components/ui/modal";
import { Text } from "#/components/ui/text";
import { deleteTask } from "#/features/task/actions/delete";
import { updateTask } from "#/features/task/actions/update";
import { formatDateTime, formatRelativeTime } from "#/lib/time";

import type { Task } from "#/features/task/lib/type";

type TaskItemProps = {
  task: Task;
};

export const TaskItem = ({ task }: Readonly<TaskItemProps>) => {
  const [isPending, startTransition] = useTransition();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = () => {
    setError(null);
    startTransition(async () => {
      const result = await updateTask(task.id, { isCompleted: !task.isCompleted });

      if (result.success) {
        toast.success(task.isCompleted ? "タスクを未完了にしました" : "タスクを完了にしました");
        return;
      }

      setError(result.error);
    });
  };

  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      const result = await deleteTask(task.id);
      setIsConfirmOpen(false);

      if (result.success) {
        toast.success("タスクを削除しました");
        return;
      }

      setError(result.error);
    });
  };

  return (
    <Card
      className={`bg-surface-subtle [--gutter:--spacing(4)]${task.isCompleted ? " opacity-70" : ""}`}
    >
      <CardContent className="flex items-start gap-3">
        <Button
          type="button"
          intent="outline"
          size="sq-sm"
          onPress={handleToggle}
          isDisabled={isPending}
          aria-label={task.isCompleted ? "未完了にマーク" : "完了にマーク"}
          className="shrink-0"
        >
          <CheckIcon data-slot="icon" className={task.isCompleted ? undefined : "opacity-0"} />
        </Button>
        <div className="min-w-0 flex-1">
          <CardTitle
            className={
              task.isCompleted
                ? "text-muted-fg font-normal wrap-break-word line-through"
                : "wrap-break-word"
            }
          >
            <Link href={`/tasks/${task.id}`} className="hover:underline">
              {task.title}
            </Link>
          </CardTitle>
          {error && (
            <Text role="alert" className="text-danger mt-1 text-sm">
              {error}
            </Text>
          )}
          <Text
            className="mt-1 text-sm"
            title={formatDateTime(task.createdAt)}
            suppressHydrationWarning
          >
            {formatRelativeTime(task.createdAt)}
          </Text>
        </div>
        <Button
          type="button"
          intent="plain"
          size="sq-sm"
          onPress={() => {
            setIsConfirmOpen(true);
          }}
          isDisabled={isPending}
          aria-label={`「${task.title}」を削除`}
          className="shrink-0 [--btn-icon-active:var(--color-danger)] [--btn-icon:var(--color-danger)]"
        >
          <TrashIcon data-slot="icon" />
        </Button>
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
