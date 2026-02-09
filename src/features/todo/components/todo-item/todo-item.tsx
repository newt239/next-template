"use client";

import Link from "next/link";
import { useTransition } from "react";

import { Button } from "#/components/ui/button";
import { Card, CardContent, CardTitle } from "#/components/ui/card";
import { Text } from "#/components/ui/text";
import { deleteTodo } from "#/features/todo/actions/delete-todo";
import { updateTodo } from "#/features/todo/actions/update-todo";

import type { Todo } from "#/features/todo/types/todo";

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
    if (!confirm("このタスクを削除しますか？")) {
      return;
    }

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
    <Card className={todo.isCompleted ? "opacity-70" : undefined}>
      <CardContent className="flex items-center gap-3 py-4">
        <Button
          type="button"
          intent="outline"
          size="sq-sm"
          onPress={handleToggle}
          isDisabled={isPending}
          aria-label={todo.isCompleted ? "未完了にマーク" : "完了にマーク"}
          className="shrink-0 min-w-9 min-h-9"
        >
          {todo.isCompleted ? "✓" : ""}
        </Button>
        <div className="min-w-0 flex-1">
          <CardTitle
            className={todo.isCompleted ? "font-normal text-muted-fg line-through" : undefined}
          >
            <Link href={`/todos/${todo.id}`} className="hover:underline">
              {todo.title}
            </Link>
          </CardTitle>
          <Text className="mt-1 text-sm">{todo.createdAt.toLocaleString("ja-JP")}</Text>
        </div>
        <Button
          type="button"
          intent="danger"
          size="sq-sm"
          onPress={handleDelete}
          isDisabled={isPending}
          aria-label="削除"
          className="shrink-0"
        >
          ×
        </Button>
      </CardContent>
    </Card>
  );
};
