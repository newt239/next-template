"use client";

import { useRef, useState, useTransition } from "react";

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
import { formatRelativeTime } from "#/lib/format-relative-time";

import type { Task } from "#/features/task/types/task";

type TaskItemProps = {
  task: Task;
};

type SwipeGesture = {
  pointerId: number;
  startX: number;
  startY: number;
  isHorizontal: boolean;
};

export const TaskItem = ({ task }: TaskItemProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [liveMessage, setLiveMessage] = useState("");
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const gestureRef = useRef<SwipeGesture | null>(null);
  const shouldSuppressClickRef = useRef(false);

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

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    shouldSuppressClickRef.current = false;
    if (isPending || isConfirmOpen || event.button > 0) {
      return;
    }
    gestureRef.current = {
      isHorizontal: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) {
      return;
    }
    const dx = event.clientX - gesture.startX;
    const dy = event.clientY - gesture.startY;
    if (!gesture.isHorizontal) {
      if (Math.abs(dx) < 10 || Math.abs(dx) <= Math.abs(dy)) {
        if (Math.abs(dy) > 10) {
          gestureRef.current = null;
        }
        return;
      }
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        gestureRef.current = null;
        return;
      }
      gesture.isHorizontal = true;
      shouldSuppressClickRef.current = true;
      setIsDragging(true);
    }
    setDragX(Math.max(-140, Math.min(140, dx)));
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) {
      return;
    }
    gestureRef.current = null;
    setIsDragging(false);
    setDragX(0);
    if (!gesture.isHorizontal) {
      return;
    }
    const dx = event.clientX - gesture.startX;
    if (dx >= 80) {
      handleToggle();
    } else if (dx <= -80) {
      setIsConfirmOpen(true);
    }
  };

  const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) {
      return;
    }
    gestureRef.current = null;
    setIsDragging(false);
    setDragX(0);
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      shouldSuppressClickRef.current &&
      event.target instanceof Node &&
      event.currentTarget.contains(event.target)
    ) {
      shouldSuppressClickRef.current = false;
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onClickCapture={handleClickCapture}
    >
      {dragX !== 0 && (
        <div
          aria-hidden="true"
          className={
            dragX > 0
              ? "bg-primary text-primary-fg absolute inset-0 flex items-center justify-start rounded-xl px-5"
              : "bg-danger text-danger-fg absolute inset-0 flex items-center justify-end rounded-xl px-5"
          }
        >
          {dragX > 0 ? <CheckIcon className="size-5" /> : <TrashIcon className="size-5" />}
        </div>
      )}
      <Card
        style={{ transform: `translateX(${dragX}px)` }}
        className={`bg-surface-subtle relative touch-pan-y select-none [--gutter:--spacing(4)]${task.isCompleted ? " opacity-70" : ""}${isDragging ? "" : " transition-transform"}`}
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
                  ? "text-muted-fg font-normal break-words line-through"
                  : "break-words"
              }
            >
              <Link
                href={`/tasks/${task.id}`}
                className="hover:underline"
                draggable={false}
                aria-keyshortcuts="Delete"
                onKeyDown={(event) => {
                  if (event.key === "Delete") {
                    setIsConfirmOpen(true);
                  }
                }}
              >
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
              title={task.createdAt.toLocaleString("ja-JP")}
              suppressHydrationWarning
            >
              {formatRelativeTime(task.createdAt)}
            </Text>
          </div>
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
    </div>
  );
};
