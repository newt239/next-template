import { expect, test } from "@playwright/test";

test.describe("ホームページ", () => {
  test("Task App の見出しが表示される", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Task App" })).toBeVisible();
  });

  test("新しいタスクの入力欄が表示される", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByPlaceholder("新しいタスクを入力してください")).toBeVisible();
  });

  test("タスクの追加・確認・完了・削除ができる", async ({ page }) => {
    const taskTitle = `E2Eタスク-${Date.now()}`;

    await page.goto("/");

    await page.getByPlaceholder("新しいタスクを入力してください").fill(taskTitle);
    await page.getByRole("button", { name: "追加" }).click();

    const createdTaskLink = page.getByRole("link", { name: taskTitle });
    await expect(createdTaskLink).toBeVisible();

    await createdTaskLink.click();
    await expect(page.getByText(taskTitle)).toBeVisible();
    await expect(page.getByText("ステータス: 未完了")).toBeVisible();

    await page.goto("/");
    const taskLinkOnHome = page.getByRole("link", { name: taskTitle }).first();
    await expect(taskLinkOnHome).toBeVisible();

    const taskItem = taskLinkOnHome.locator("xpath=ancestor::*[@data-slot='card'][1]");
    await taskItem.getByRole("button", { name: "完了にマーク" }).click();

    await expect(taskItem.getByRole("button", { name: "未完了にマーク" })).toBeVisible();

    await taskLinkOnHome.click();
    await expect(page.getByText("ステータス: 完了")).toBeVisible();

    await page.goto("/");

    page.once("dialog", async (dialog) => {
      await dialog.accept();
    });
    await taskItem.getByRole("button", { name: "削除" }).click();

    await expect(page.getByRole("link", { name: taskTitle })).toHaveCount(0);
  });
});
