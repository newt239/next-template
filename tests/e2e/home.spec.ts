import { expect, test } from "@playwright/test";

test.describe("ホームページ", () => {
  test("Todo App の見出しが表示される", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Todo App", level: 1 })).toBeVisible();
  });

  test("新しいタスクの入力欄が表示される", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByPlaceholder("新しいタスクを入力してください")).toBeVisible();
  });
});
