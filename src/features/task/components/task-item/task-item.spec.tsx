/// <reference types="@testing-library/jest-dom" />

import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { formatRelativeTime } from "#/lib/format-relative-time";

import { TaskItem } from "./task-item";

import type { Task } from "#/features/task/types/task";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
  }),
}));

vi.mock("#/features/task/actions/update-task", () => ({
  updateTask: vi.fn(),
}));

vi.mock("#/features/task/actions/delete-task", () => ({
  deleteTask: vi.fn(),
}));

const createTask = (overrides?: Partial<Task>): Task => ({
  createdAt: new Date("2025-01-01T00:00:00.000Z"),
  id: 1,
  isCompleted: false,
  title: "テストタスク",
  ...overrides,
});

describe("TaskItem", () => {
  it("タイトルと相対時刻が表示される", () => {
    const task = createTask();

    render(<TaskItem task={task} />);

    expect(screen.getByText("テストタスク")).toBeInTheDocument();
    expect(screen.getByText(formatRelativeTime(task.createdAt))).toBeInTheDocument();
  });

  it("完了ボタンを押すと updateTask が呼び出される", async () => {
    const task = createTask({ isCompleted: false });
    const { updateTask } = await import("#/features/task/actions/update-task");
    const updateTaskMock = vi.mocked(updateTask);
    updateTaskMock.mockResolvedValueOnce({ success: true, task });

    const { container } = render(<TaskItem task={task} />);

    const button = within(container).getByRole("button", { name: "完了にマーク" });
    fireEvent.click(button);

    expect(updateTaskMock).toHaveBeenCalledWith(task.id, { isCompleted: true });
  });

  it("右スワイプで updateTask が呼び出される", async () => {
    const task = createTask({ isCompleted: false });
    const { updateTask } = await import("#/features/task/actions/update-task");
    const updateTaskMock = vi.mocked(updateTask);
    updateTaskMock.mockResolvedValueOnce({ success: true, task });

    const { container } = render(<TaskItem task={task} />);

    const swipeArea = container.firstElementChild;
    if (!swipeArea) {
      throw new Error("スワイプ領域が見つかりません");
    }

    fireEvent.pointerDown(swipeArea, { clientX: 100, clientY: 10, pointerId: 1 });
    fireEvent.pointerMove(swipeArea, { clientX: 180, clientY: 10, pointerId: 1 });
    fireEvent.pointerUp(swipeArea, { clientX: 200, clientY: 10, pointerId: 1 });

    await waitFor(() => {
      expect(updateTaskMock).toHaveBeenCalledWith(task.id, { isCompleted: true });
    });
  });

  it("左スワイプで確認ダイアログが表示され、削除実行で deleteTask が呼ばれる", async () => {
    const task = createTask();
    const { deleteTask } = await import("#/features/task/actions/delete-task");
    const deleteTaskMock = vi.mocked(deleteTask);
    deleteTaskMock.mockResolvedValueOnce({ success: true, task });

    const { container } = render(<TaskItem task={task} />);

    const swipeArea = container.firstElementChild;
    if (!swipeArea) {
      throw new Error("スワイプ領域が見つかりません");
    }

    fireEvent.pointerDown(swipeArea, { clientX: 200, clientY: 10, pointerId: 1 });
    fireEvent.pointerMove(swipeArea, { clientX: 120, clientY: 10, pointerId: 1 });
    fireEvent.pointerUp(swipeArea, { clientX: 100, clientY: 10, pointerId: 1 });

    const dialog = await screen.findByRole("alertdialog");
    fireEvent.click(within(dialog).getByRole("button", { name: "削除する" }));

    await waitFor(() => {
      expect(deleteTaskMock).toHaveBeenCalledWith(task.id);
    });
  });
});
