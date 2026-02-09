/// <reference types="@testing-library/jest-dom" />

import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TodoItem } from "./todo-item";

import type { Todo } from "#/features/todo/types/todo";

vi.mock("#/features/todo/actions/update-todo", () => ({
  updateTodo: vi.fn(),
}));

vi.mock("#/features/todo/actions/delete-todo", () => ({
  deleteTodo: vi.fn(),
}));

const createTodo = (overrides?: Partial<Todo>): Todo => ({
  createdAt: new Date("2025-01-01T00:00:00.000Z"),
  id: 1,
  isCompleted: false,
  title: "テストタスク",
  ...overrides,
});

describe("TodoItem", () => {
  it("タイトルと作成日時が表示される", () => {
    const todo = createTodo();

    render(<TodoItem todo={todo} />);

    expect(screen.getByText("テストタスク")).toBeInTheDocument();
    expect(screen.getByText(todo.createdAt.toLocaleString("ja-JP"))).toBeInTheDocument();
  });

  it("完了ボタンを押すと updateTodo が呼び出される", async () => {
    const todo = createTodo({ isCompleted: false });
    const { updateTodo } = await import("#/features/todo/actions/update-todo");
    const updateTodoMock = vi.mocked(updateTodo);
    updateTodoMock.mockResolvedValueOnce({ success: true, todo });

    const { container } = render(<TodoItem todo={todo} />);

    const button = within(container).getByRole("button", { name: "完了にマーク" });
    fireEvent.click(button);

    expect(updateTodoMock).toHaveBeenCalledWith(todo.id, { isCompleted: true });
  });

  it("削除ボタンを押すと confirm が表示され、承認時に deleteTodo が呼ばれる", async () => {
    const todo = createTodo();
    const { deleteTodo } = await import("#/features/todo/actions/delete-todo");
    const deleteTodoMock = vi.mocked(deleteTodo);
    deleteTodoMock.mockResolvedValueOnce({ success: true, todo });

    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);

    const { container } = render(<TodoItem todo={todo} />);

    const button = within(container).getByRole("button", { name: "削除" });
    fireEvent.click(button);

    expect(confirmSpy).toHaveBeenCalled();
    expect(deleteTodoMock).toHaveBeenCalledWith(todo.id);
  });
});
