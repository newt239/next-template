import { expect, test } from "@playwright/test";

import { signUp } from "./helpers/auth";

test.describe("認証", () => {
  test("未ログインでトップを開くとログインへリダイレクトされる", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole("heading", { level: 1, name: "ログイン" })).toBeVisible();
  });

  test("誤ったパスワードではログインできない", async ({ page }) => {
    const { email } = await signUp(page);

    await page.getByRole("button", { name: "ログアウト" }).click();
    await expect(page).toHaveURL(/\/login/);

    await page.getByRole("textbox", { name: "メールアドレス" }).fill(email);
    await page.getByLabel("パスワード").fill("wrong-password");
    await page.getByRole("button", { exact: true, name: "ログイン" }).click();

    await expect(page.locator("form").getByRole("alert")).toHaveText(
      "メールアドレスまたはパスワードが正しくありません",
    );
  });

  test("登録・ログアウト・再ログインができる", async ({ page }) => {
    const { email, password } = await signUp(page);

    await page.getByRole("button", { name: "ログアウト" }).click();
    await expect(page).toHaveURL(/\/login/);

    await page.getByRole("textbox", { name: "メールアドレス" }).fill(email);
    await page.getByLabel("パスワード").fill(password);
    await page.getByRole("button", { exact: true, name: "ログイン" }).click();

    await expect(page.getByRole("heading", { level: 1, name: "Task App" })).toBeVisible();
  });
});

test.describe("redirectTo の検証", () => {
  for (const redirectTo of [
    "/\t/example.com",
    "/\n/example.com",
    "/\r/example.com",
    "//example.com",
    String.raw`/\example.com`,
  ]) {
    test(`ログイン済みで ${JSON.stringify(redirectTo)} を渡しても外部へ遷移しない`, async ({
      page,
    }) => {
      await signUp(page);

      await page.goto(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);

      await expect(page).toHaveURL((url) => url.host !== "example.com" && url.pathname === "/");
      await expect(page.getByRole("heading", { level: 1, name: "Task App" })).toBeVisible();
    });
  }

  test("ログイン操作後も外部へ遷移しない", async ({ page }) => {
    const { email, password } = await signUp(page);

    await page.getByRole("button", { name: "ログアウト" }).click();
    await expect(page).toHaveURL(/\/login/);

    await page.goto(`/login?redirectTo=${encodeURIComponent("/\t/example.com")}`);
    await page.getByRole("textbox", { name: "メールアドレス" }).fill(email);
    await page.getByLabel("パスワード").fill(password);
    await page.getByRole("button", { exact: true, name: "ログイン" }).click();

    await expect(page.getByRole("heading", { level: 1, name: "Task App" })).toBeVisible();
    await expect(page).toHaveURL((url) => url.host !== "example.com" && url.pathname === "/");
  });

  test("アプリ内のパスはクエリを含めて維持される", async ({ page }) => {
    const { email, password } = await signUp(page);

    await page.getByRole("button", { name: "ログアウト" }).click();
    await expect(page).toHaveURL(/\/login/);

    await page.goto(`/login?redirectTo=${encodeURIComponent("/tasks/xxx?tab=done")}`);
    await page.getByRole("textbox", { name: "メールアドレス" }).fill(email);
    await page.getByLabel("パスワード").fill(password);
    await page.getByRole("button", { exact: true, name: "ログイン" }).click();

    await expect(page).toHaveURL(
      (url) => url.pathname === "/tasks/xxx" && url.search === "?tab=done",
    );
  });
});
