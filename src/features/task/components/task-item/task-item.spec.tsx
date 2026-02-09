/// <reference types="@testing-library/jest-dom" />

import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TaskItem } from "./task-item";

import type { Task } from "#/features/task/types/task";

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
  it("タイトルと作成日時が表示される", () => {
    const task = createTask();

    render(<TaskItem task={task} />);

    expect(screen.getByText("テストタスク")).toBeInTheDocument();
    expect(screen.getByText(task.createdAt.toLocaleString("ja-JP"))).toBeInTheDocument();
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

  it("削除ボタンを押すと confirm が表示され、承認時に deleteTask が呼ばれる", async () => {
    const task = createTask();
    const { deleteTask } = await import("#/features/task/actions/delete-task");
    const deleteTaskMock = vi.mocked(deleteTask);
    deleteTaskMock.mockResolvedValueOnce({ success: true, task });

    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);

    const { container } = render(<TaskItem task={task} />);

    const button = within(container).getByRole("button", { name: "削除" });
    fireEvent.click(button);

    expect(confirmSpy).toHaveBeenCalled();
    expect(deleteTaskMock).toHaveBeenCalledWith(task.id);
  });
});
