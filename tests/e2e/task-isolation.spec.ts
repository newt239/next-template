import { expect, test } from "@playwright/test";

import { signUp } from "./helpers/auth";

test.describe("タスクのユーザー間分離", () => {
  test("他ユーザーのタスクは一覧にも詳細にも現れない", async ({ browser }) => {
    const ownerContext = await browser.newContext();
    const ownerPage = await ownerContext.newPage();
    await signUp(ownerPage);

    const taskTitle = "他人には見えないタスク";
    await ownerPage.getByRole("button", { name: "新しいタスクを追加" }).click();
    await ownerPage.getByPlaceholder("タスクを入力").fill(taskTitle);
    await ownerPage.getByRole("button", { exact: true, name: "追加" }).click();

    const ownerTaskLink = ownerPage.getByRole("link", { name: taskTitle });
    await expect(ownerTaskLink).toBeVisible();

    const taskHref = await ownerTaskLink.getAttribute("href");
    expect(taskHref).not.toBeNull();

    const otherContext = await browser.newContext();
    const otherPage = await otherContext.newPage();
    await signUp(otherPage);

    await expect(otherPage.getByRole("link", { name: taskTitle })).toHaveCount(0);

    await otherPage.goto(taskHref ?? "/");
    await expect(otherPage.getByRole("heading", { name: "タスクが見つかりません" })).toBeVisible();

    await expect(ownerTaskLink).toBeVisible();

    await ownerContext.close();
    await otherContext.close();
  });
});
