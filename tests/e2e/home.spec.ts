import { expect, test } from "@playwright/test";

test.describe("ホームページ", () => {
  test("Task App の見出しが表示される", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Task App" })).toBeVisible();
  });

  test("FABからタスク入力ダイアログを開ける", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "新しいタスクを追加" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByPlaceholder("タスクを入力")).toBeVisible();
  });

  test("タスクの追加・確認・完了・削除ができる", async ({ page }) => {
    const taskTitle = `E2Eタスク-${Date.now()}`;

    await page.goto("/");

    await page.getByRole("button", { name: "新しいタスクを追加" }).click();
    await page.getByPlaceholder("タスクを入力").fill(taskTitle);
    await page.getByRole("button", { exact: true, name: "追加" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);

    const createdTaskLink = page.getByRole("link", { name: taskTitle });
    await expect(createdTaskLink).toBeVisible();

    await createdTaskLink.click();
    await expect(page.getByText(taskTitle)).toBeVisible();
    await expect(page.getByText("未完了", { exact: true })).toBeVisible();

    await page.goto("/");
    const taskLinkOnHome = page.getByRole("link", { name: taskTitle }).first();
    await expect(taskLinkOnHome).toBeVisible();

    const taskItem = taskLinkOnHome.locator("xpath=ancestor::*[@data-slot='card'][1]");
    await taskItem.getByRole("button", { name: "完了にマーク" }).click();

    await expect(page.getByRole("link", { name: taskTitle })).toHaveCount(0);

    await page.getByRole("tab", { name: "完了済み" }).click();
    await expect(page).toHaveURL(/status=completed/);
    const completedTaskLink = page.getByRole("link", { name: taskTitle }).first();
    await expect(completedTaskLink).toBeVisible();

    await completedTaskLink.click();
    await expect(page.getByText("完了", { exact: true })).toBeVisible();

    await page.goto("/?status=completed");
    const completedTaskItem = page
      .getByRole("link", { name: taskTitle })
      .first()
      .locator("xpath=ancestor::*[@data-slot='card'][1]");

    await completedTaskItem.getByRole("button", { name: "削除" }).click();

    const alertDialog = page.getByRole("alertdialog");
    await expect(alertDialog).toBeVisible();
    await alertDialog.getByRole("button", { name: "削除する" }).click();

    await expect(page.getByRole("link", { name: taskTitle })).toHaveCount(0);
  });
});
