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

## Development

<!-- setup-repo:start -->

### 0. リポジトリ設定の適用

テンプレートから作成したリポジトリには、GitHub 上のリポジトリ設定 (マージ後のブランチ自動削除・auto-merge の許可・ブランチ保護ルールセット) が引き継がれません。以下を実行し、対話形式で適用してください。

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

`.env.example` を基に `.env` を作成し、値を設定してください。値は `src/lib/env.ts` で検証されます。

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

## Drizzle

- スキーマは `src/lib/drizzle/schema.ts` を編集して管理します。
- スキーマ変更を SQL として生成: `pnpm run db:generate`
- 生成済みマイグレーションを適用: `pnpm run db:migrate`
- スキーマを直接データベースへ反映 (開発用): `pnpm run db:push`
- スキーマをブラウザで確認: `pnpm run db:studio`
