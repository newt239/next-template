---
name: customize-template
description: このテンプレートから新規プロジェクトを始める際に、技術スタックの変更点（フレームワーク・スタイリング・UI ライブラリ・デプロイ先・認証・DB・テスト等）を対話しながら決定し、不要なコードや依存関係を削除・置換するスキル。「テンプレートをカスタマイズしたい」「このテンプレートで新しいプロジェクトを始めたい」「不要な機能を削除したい」といった依頼で使用する。
---

# テンプレートのカスタマイズ

このリポジトリは Next.js テンプレートであり、動作確認用のサンプルとしてタスク管理アプリが実装されています。このスキルは、新規プロジェクトの要件をユーザーと対話しながら確認し、テンプレートを要件に合わせて改変します。

## 現在の技術スタック

| 項目           | 現在の実装                                                                        |
| -------------- | --------------------------------------------------------------------------------- |
| フレームワーク | Next.js (App Router, Turbopack)                                                   |
| スタイリング   | Tailwind CSS v4                                                                   |
| UI ライブラリ  | Intent UI (react-aria-components ベース、`src/components/ui/` に配置)             |
| デプロイ先     | Vercel                                                                            |
| 認証           | better-auth (`src/lib/better-auth/`)                                              |
| DB / ORM       | Turso DB (libsql) + Drizzle (`src/lib/drizzle/`, `drizzle/`, `drizzle.config.ts`) |
| 環境変数       | t3-env (`src/lib/env.ts`)                                                         |
| ユニットテスト | Vitest + Testing Library (`tests/unit/`, `src/**/*.spec.{ts,tsx}`)                |
| E2E テスト     | Playwright (`tests/e2e/`, `playwright.config.ts`)                                 |
| サンプルアプリ | タスク管理 (`src/features/task/`, `src/app/(protected)/`)                         |

## 手順

### 1. 現状の把握

作業前に `package.json` と `src/` 以下の構成を確認し、上記の表と実際の状態に差分がないかを確かめる。テンプレートは更新されるため、このスキルの記述より実際のコードを優先する。

### 2. 要件の対話的な決定

AskUserQuestion ツールを使って以下を質問する。1 回の呼び出しで最大 4 問までのため、複数回に分けて質問する。推測で決めてはならず、必ずユーザーの回答を得ること。

**1 回目: 基盤**

- **フレームワーク**: Next.js を継続 / React Router / TanStack Start / その他
- **スタイリング**: Tailwind CSS v4 を継続 / CSS Modules / その他
- **UI コンポーネントライブラリ**: Intent UI を継続 / 別のライブラリ（shadcn/ui, HeroUI など） / 使わない（自作）
- **デプロイ先**: Vercel を継続 / Cloudflare / その他

**2 回目: バックエンド・品質**

- **認証**: better-auth を継続 / 不要 / 別の方式
- **DB / ORM**: Turso + Drizzle を継続 / 不要 / 別の DB・ORM
- **テスト**: Vitest + Playwright を継続 / ユニットテストのみ / E2E のみ / 不要
- **サンプルアプリ**: タスク管理アプリを削除する / 参考として残す

**3 回目: 自由記述**

- その他変更したい箇所がないかを Other（自由入力）も含めて確認する（例: プロジェクト名の変更、Storybook の追加、i18n など）。

### 3. 変更計画の提示と承認

回答をもとに「削除するファイル一覧」「変更・置換する内容」「影響範囲」をまとめて提示し、明示的な承認を得てから実行する。ファイル削除はプロジェクトのガイドライン上、必ず事前承認が必要である。

### 4. 変更の適用

各項目の対象は以下のとおり。削除する場合は依存関係・スクリプト・設定・参照元をすべて揃えて消すこと。

#### サンプルアプリの削除

- `src/features/task/` 全体
- `src/app/(protected)/` 以下のタスク関連ページ
- `src/app/page.tsx` からタスク関連の参照を除去し、最小限のトップページに置き換える
- `src/lib/drizzle/schema/` のタスク用テーブル定義と `drizzle/` の生成済みマイグレーション
- `tests/e2e/` のタスク関連テスト

#### 認証の削除・変更

- `src/lib/better-auth/` と `package.json` の `better-auth`
- Drizzle スキーマ内の認証用テーブルがあれば併せて対応
- 別方式に変更する場合は `src/lib/{方式名}/` に配置し、`src/app/(public)/`・`(protected)/` のルートグループ構成は維持する

#### DB / ORM の削除・変更

- `src/lib/drizzle/`, `drizzle/`, `drizzle.config.ts`
- `package.json` の `@libsql/client`, `drizzle-orm`, `drizzle-kit` と `db:*` スクリプト
- `src/lib/env.ts` の `TURSO_CONNECTION_URL`, `TURSO_AUTH_TOKEN` と `.env.example` の同項目
- README.md の DB・マイグレーションに関する節

#### テストの削除・変更

- ユニット: `vitest.config.ts`, `tests/unit/`, `src/**/*.spec.{ts,tsx}`, `package.json` の `vitest`・`@testing-library/*`・`jsdom`・`@vitejs/plugin-react`・`vite`・`vite-tsconfig-paths` と `test`・`test:watch` スクリプト、`knip.json` の関連 entry
- E2E: `playwright.config.ts`, `tests/e2e/`, `@playwright/test`, `test:e2e*` スクリプト, `.github/workflows/playwright.yml`

#### UI ライブラリの削除・変更

- `src/components/ui/` の各コンポーネント
- `package.json` の `react-aria-components`, `@react-aria/i18n`, `@internationalized/date`, `tailwindcss-react-aria-components`, `tailwind-variants`, `tailwind-merge`（新スタックで使うものは残す）
- `src/lib/primitive.ts` と `components.json`
- 置き換える場合は新ライブラリの導入手順に従い、`src/components/ui/` の構成ルール（1 コンポーネント 1 ディレクトリ + `index.ts`）を維持する

#### スタイリングの変更

- Tailwind をやめる場合: `@tailwindcss/postcss`, `tailwindcss`, `postcss.config.mjs`, `src/app/globals.css` の Tailwind ディレクティブ。Tailwind 依存の UI コンポーネントが残っていないか先に確認する
- CSS Modules へ移行する場合は `{component-name}.module.css` を各コンポーネントディレクトリに配置する

#### デプロイ先の変更

- `src/lib/env.ts` の `NEXT_PUBLIC_VERCEL_BRANCH_URL` などプラットフォーム固有の環境変数
- Cloudflare の場合は OpenNext (`@opennextjs/cloudflare`) の導入と `wrangler.jsonc` の追加を検討する

#### フレームワークの変更

Next.js から React Router / TanStack Start への移行は影響が全ファイルに及ぶため、このスキル内で完結させようとせず、以下を行う。

1. `src/features/` の構成・コーディング規約など維持すべき資産を整理する
2. 新フレームワークの公式スキャフォールドをベースに再構成する方針を提案する
3. ユーザーと段階的な移行計画を合意してから着手する

### 5. ドキュメントの更新

- `README.md`: 技術スタック一覧・セットアップ手順・環境変数の説明を新構成に合わせて書き換える
- `AGENTS.md`: 技術スタック・プロジェクト構造・ガイドラインのうち、削除・変更した項目に関する記述を更新する
- `.env.example`: 不要な変数を削除し、新たに必要な変数を追加する

### 6. 検証

1. `pnpm install` で lockfile を更新する
2. `pnpm run codecheck` を実行し、エラーがあればすべて修正する（`oxlintrc.json` や `tsconfig.json` の変更による回避は禁止）
3. テストを残した場合は `pnpm run test` を実行する
4. `pnpm run dev` で起動し、トップページが表示されることを確認する

### 7. 完了報告

変更内容のサマリー（削除した機能・変更した依存関係・更新したドキュメント）を提示し、残作業（外部サービスのセットアップ、環境変数の設定など）があれば案内する。
