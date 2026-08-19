import { expect, type Page } from "@playwright/test";

let sequence = 0;

export const signUp = async (page: Page) => {
  sequence += 1;
  const email = `e2e-${process.env.E2E_RUN_ID}-${process.pid}-${sequence}@example.com`;
  const password = "e2e-password-1234";

  await page.goto("/register");
  await page.getByRole("textbox", { name: "名前" }).fill("E2Eユーザー");
  await page.getByRole("textbox", { name: "メールアドレス" }).fill(email);
  await page.getByLabel("パスワード").fill(password);
  await page.getByRole("button", { name: "アカウントを作成" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Task App" })).toBeVisible();

  return { email, password };
};
