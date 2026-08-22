# Next.js Template

- TypeScript
- Next.js App Router
- Tailwind CSS v4
- [Intent UI](https://intentui.com/)
- Oxlint
- Oxfmt
- Vercel
- Turso DB (SQLite)
- Drizzle
- Better Auth (メールアドレス + パスワード)
- Playwright (E2E)

## テンプレートから始める

「Use this template」で複製したあと、テンプレート由来の名前とアイコンを置き換えてください。

| ファイル                                  | 箇所                   | 現在の値                                            |
| ----------------------------------------- | ---------------------- | --------------------------------------------------- |
| `package.json`                            | `name`                 | `next-template`                                     |
| `src/lib/site.ts`                         | `SITE_NAME`            | `Next.js Template`                                  |
| `src/lib/better-auth/auth.ts`             | `appName`              | `next-template`                                     |
| `src/app/manifest.ts`                     | `short_name`           | `Template`                                          |
| `src/app/opengraph-image.tsx`             | サブタイトル           | `App Router / Tailwind CSS / Drizzle / Better Auth` |
| `src/app/icon.svg`・`src/app/favicon.ico` | アイコン               | Next.js の "N" ロゴ                                 |
| `README.md`                               | タイトル・技術スタック | このファイル                                        |

`SITE_URL` は環境変数から組み立てるためコードの変更は不要です（[環境変数](#環境変数)を参照）。

日本語圏以外に向ける場合は、`src/app/layout.tsx` の `lang="ja"`、`src/lib/time.ts` の `ja-JP` / `Asia/Tokyo`、`playwright.config.ts` の `locale` / `timezoneId`、および UI とエラーメッセージの日本語文言も置き換えてください。

サンプルとして実装されているタスク管理機能 (`src/features/task/`・`src/app/(protected)/tasks/`・`src/lib/drizzle/task-schema.ts`) は、不要になったら削除してください。Claude Code を使っている場合は `.claude/skills/customize-template/` のスキルが、技術スタックの取捨選択からこれらの削除までを対話形式で支援します。

## Development

<!-- setup-repo:start -->

### 0. リポジトリ設定の適用

テンプレートから作成したリポジトリには、GitHub 上のリポジトリ設定 (マージ後のブランチ自動削除・auto-merge の許可・ブランチ保護ルールセット) が引き継がれません。以下を実行し、対話形式で適用してください。

ルールセットには Codecheck と Playwright を必須ステータスチェックとして登録します。**これを適用しないと `dependabot-auto-merge.yml` が CI の完了を待たずに main へマージします。**

```bash
pnpm run setup:repo
```

実行には [GitHub CLI](https://cli.github.com/) と、対象リポジトリの管理者権限が必要です。適用後にこのスクリプト自体を削除するか確認されます。

<!-- setup-repo:end -->

### Node のバージョン

pnpm が `package.json` の `devEngines.runtime` を参照し、`pnpm run` 経由のコマンドを指定バージョンの Node で実行します。未取得の場合は自動でダウンロードされるため、別途バージョンマネージャーを用意する必要はありません。CI も同じフィールドを参照します。

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

`.env.example` を基に `.env` を作成し、値を設定してください。詳細は[環境変数](#環境変数)を参照してください。

### 3. DBマイグレーション

`drizzle/` の SQL をデータベースへ適用します。

```bash
pnpm run db:migrate
```

### 4. 開発サーバーの起動

```bash
pnpm run dev
```

### 5. 実装後のチェック

型チェック・Lint・フォーマット・ファイル名規約・未使用コード検出をまとめて実行します。

```bash
pnpm run codecheck
```

### E2E テスト

Playwright が自動でサーバーを起動します。別ポートで動かしているサーバーに対して実行する場合は `E2E_BASE_URL` を指定してください。

```bash
pnpm run test:e2e
```

テストユーザーは実行ごとに一意な `E2E_RUN_ID` で名前空間を分けて作成し、`tests/e2e/helpers/cleanup.ts` が終了時にその実行分だけを削除します（外部キーの cascade により session・account・task_items も消えます）。`E2E_RUN_ID` を明示しない場合は起動時刻が使われます。`rate_limit` テーブルはユーザーに紐づかないため cascade では消えません。

## 環境変数

`.env.example` を基に `.env` などの環境ファイルを作成し、以下の値を設定してください。値は `src/lib/env.ts` で検証されます。

- `TURSO_CONNECTION_URL`: Turso もしくは libsql の接続 URL。
- `TURSO_AUTH_TOKEN`: Turso のアクセストークン。
- `BETTER_AUTH_SECRET`: セッションの署名に使う 32 文字以上のランダム文字列。`openssl rand -base64 32` などで生成します。
- `BETTER_AUTH_URL`: アプリの URL。`src/lib/better-auth/auth.ts` の `baseURL` オプションに渡しています。未設定でもリクエストのオリジンから解決されますが、ビルド時に警告が出るためローカルでは `http://localhost:3000` を設定してください。**`/api/auth/*` の origin チェックはこの値を基準にするため、Host ヘッダを信用できないホスティングでは本番でも必ず設定してください。**
- `NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL`: `metadataBase` に使用します。Vercel では自動で設定されるため不要です。**他のホスティングでは設定しないと `metadataBase` が `http://localhost:3000` のままになります。**

GitHub Actions では Turso ではなくローカル SQLite (`TURSO_CONNECTION_URL=file:ci.db`) を使うため、リポジトリのシークレット登録は不要です。ジョブごとに空の DB を作ってマイグレーションを流すため、本番データに触れず並列実行もぶつかりません。

DB 認証情報を用意できない環境で型チェックやビルドのみを行う場合は、`SKIP_ENV_VALIDATION=1` を指定すると `src/lib/env.ts` の検証をスキップできます。ただし検証を飛ばしても `src/lib/drizzle/client.ts` の接続先は必要なので、ビルドまで通すなら値を与えるほうが確実です。

## 認証と認可

Better Auth によるメールアドレス + パスワード認証を実装しています。メール送信は行わないため、メールアドレスの検証やパスワードリセットは無効です。

- ログイン前のページ: `src/app/(public)/login`・`src/app/(public)/register`
- ログイン必須のページ: `src/app/(protected)/` 配下
- サーバー側のセッション取得は `src/lib/better-auth/helper.ts` を使用します。

### 認証だけは Server Actions を経由しない

サインイン・サインアップ・サインアウトは `src/lib/better-auth/client.ts` の `authClient` から `/api/auth/*` を呼びます。Better Auth のレートリミットと origin チェックは**ルーターの `onRequest` フックにしか実装されていない**ため、`auth.api.signInEmail()` のようにサーバーから直接呼ぶと両方とも素通りし、パスワードの総当たりが無制限になります。

`src/lib/better-auth/auth.ts` の `rateLimit` はサインイン 20 回 / 5 分、サインアップ 30 回 / 5 分に制限し、カウンタは `rate_limit` テーブルに永続化しています（サーバレスではインメモリだとインスタンスごとに分かれて機能しないため）。

- レートリミットは既定で production のみ有効です
- カウンタは IP とパスの組で持ちます。ローカルや CI では全リクエストが同一 IP になるため**テスト全体で 1 つのバケットを共有**します。E2E を増やすときは上限に当たらないか確認してください
- `rate_limit` の行は自動では消えません。`user` に紐づかないため削除の cascade も効かず、放置すると増え続けます。`last_request` はミリ秒の UNIX 時刻なので、定期実行のジョブなどで次のように掃除してください

  ```sql
  DELETE FROM rate_limit WHERE last_request < (unixepoch() - 86400) * 1000;
  ```

### セッションの cookieCache

`session.cookieCache` を有効にしているため、`getSession()` は既定で 5 分間は署名済み Cookie から読み、Turso への往復を省きます。

### 認可はデータ層で行う

**認可チェックはデータに触れるすべての経路で行います。** レイアウトやページでまとめてガードする方式は採用していません。

- `src/proxy.ts` は未ログイン時のリダイレクトのみを担う**楽観的チェック**です。`getSessionCookie` は Cookie の存在を見るだけで署名検証を行わないため、認可の根拠にはなりません。より強い判定が必要な場合は `getCookieCache`（HMAC 検証・期限・version チェックあり）への差し替えを検討してください
- Server Actions は UI を経由せず直接 POST できる公開エンドポイントです。`src/features/task/actions/` のように、**各アクションの冒頭で `getSession()` を呼び、所有者の絞り込みをセッション由来のユーザー ID で行います**
- Server Actions では `requireSession()` を使いません。`redirect()` は例外を投げて動作するため、`try`/`catch` の中で呼ぶと握り潰されます
- データフェッチ関数は `"use cache"` の中で `cookies()` / `headers()` を読めないため、**ユーザー ID を引数で受け取ってキャッシュキーに含めます**（`cacheTag(\`tasks-${userId}\`)`）。呼び出し側の fetcher コンポーネントが `requireSession()` でユーザー ID を取得します

> Vercel などサーバレス環境では `"use cache"` の既定はインメモリで、リクエスト間に永続しません。ユーザー単位のキャッシュは特に効きにくいため、永続化が必要な場合は `'use cache: remote'` を検討してください。

## セキュリティヘッダ

`next.config.ts` の `headers()` で全パスに付与しています。`poweredByHeader: false` により `x-powered-by` も出力しません。

`X-Frame-Options` は `DENY`、`Referrer-Policy` は `strict-origin-when-cross-origin` です。`cacheComponents`（Partial Prerendering）と nonce ベースの CSP は併用できないため、CSP は静的に定義しています。`upgrade-insecure-requests` は含めていません（http で動かすローカルの本番ビルドや E2E を壊すため）。HTTPS の強制は `Strict-Transport-Security` が担います。`script-src` は `'unsafe-inline'` を許容するため **CSP 単体で XSS を防ぐことはできません**。一方で `object-src 'none'`・`base-uri 'self'`・`form-action 'self'`・`frame-ancestors 'none'` により、clickjacking・base タグ注入・フォームの乗っ取り・外部への持ち出しは防げます。

## テーマ

ライト / ダーク / システム設定の 3 状態を切り替えられます。

- CSS 変数は `src/app/globals.css` の `:root` (ライト) と `.dark` (ダーク) で定義します。
- 状態管理は `src/components/providers/theme-provider.tsx`、参照は `useTheme` を使用します。
- ストレージキー・ダーククラス名・テーマ色・初回描画用のインラインスクリプトは `src/components/providers/theme.ts` にまとめています。
- 初回描画時のちらつきを防ぐため、このインラインスクリプトが `.dark` と `meta[name="theme-color"]` を先に反映します。`prefers-color-scheme` ベースの `viewport.themeColor` は手動切り替えに追従できないため使っていません。

## UI コンポーネント

`src/components/ui/` は [Intent UI](https://intentui.com/) のレジストリから取り込んだコンポーネント置き場です。`knip.json` で `entry` に指定してあるため**未使用でも検出されません**。使わなくなったものは手で削除してください。必要になれば `components.json` の `@intentui` レジストリから再取得できます。

## メタデータとエラー通知

- `src/app/robots.ts`・`src/app/sitemap.ts`・`src/app/manifest.ts`・`src/app/icon.svg`・`src/app/opengraph-image.tsx` を用意しています。URL の基点は `src/lib/site.ts` の `SITE_URL` です
- これらは `src/proxy.ts` の `matcher` から除外しています。メタデータルートを追加したら matcher も更新してください
- `src/instrumentation.ts` の `onRequestError` がサーバー側のエラーを受け取ります。現状は `console.error` に出すだけなので、外部の通知先はここに差し込んでください。**第 2 引数の `headers` には Cookie がそのまま入るため、ログには `method` と `path` だけを渡しています。** 通知先を追加するときも丸ごと送らないでください

## Drizzle

- スキーマは `src/lib/drizzle/schema.ts` を編集して管理します。
- スキーマ変更を SQL として生成: `pnpm run db:generate`
- 生成済みマイグレーションを適用: `pnpm run db:migrate`
- スキーマを直接データベースへ反映 (開発用): `pnpm run db:push`
- スキーマをブラウザで確認: `pnpm run db:studio`
