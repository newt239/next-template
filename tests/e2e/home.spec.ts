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
});
