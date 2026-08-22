import { expect, test } from "@playwright/test";

import { signUp } from "./helpers/auth";

test.describe("ホームページ", () => {
  test.beforeEach(async ({ page }) => {
    await signUp(page);
  });

  test("Task App の見出しが表示される", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1, name: "Task App" })).toBeVisible();
  });

  test("FABからタスク入力ダイアログを開ける", async ({ page }) => {
    await page.getByRole("button", { name: "新しいタスクを追加" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByPlaceholder("タスクを入力")).toBeVisible();
  });

  test("タスクの追加・確認・完了・削除ができる", async ({ page }) => {
    const taskTitle = "E2Eタスク";

    await page.getByRole("button", { name: "新しいタスクを追加" }).click();
    await page.getByPlaceholder("タスクを入力").fill(taskTitle);
    await page.getByRole("button", { exact: true, name: "追加" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);

    const taskLink = page.getByRole("link", { name: taskTitle });
    await expect(taskLink).toBeVisible();

    await taskLink.click();
    await expect(page.getByRole("heading", { level: 2, name: taskTitle })).toBeVisible();
    await expect(page.getByText("未完了", { exact: true })).toBeVisible();

    await page.goto("/");
    const toggle = page.getByRole("button", { name: `「${taskTitle}」を完了にする` });
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await toggle.click();
    await expect(taskLink).toHaveCount(0);

    await page.getByRole("tab", { name: "完了済み" }).click();
    await expect(page).toHaveURL(/status=completed/);
    await expect(taskLink).toBeVisible();

    await taskLink.click();
    await expect(page.getByText("完了", { exact: true })).toBeVisible();

    await page.goto("/?status=completed");
    await page.getByRole("button", { name: `「${taskTitle}」を削除` }).click();

    const alertDialog = page.getByRole("alertdialog");
    await expect(alertDialog).toBeVisible();
    await alertDialog.getByRole("button", { name: "削除する" }).click();

    await expect(taskLink).toHaveCount(0);
  });
});
