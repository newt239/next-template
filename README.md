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

### 2. DBマイグレーション

```bash
pnpm run db:generate
```

```bash
pnpm run db:push
```

### 3. 開発サーバーの起動

```bash
pnpm run dev
```

## 環境変数

`.env.example` を基に `.env` などの環境ファイルを作成し、以下の値を設定してください。

- `TURSO_CONNECTION_URL`: Turso もしくは libsql の接続 URL。
- `TURSO_AUTH_TOKEN`: 認証が必要な場合のみ設定するアクセストークン。

## Drizzle

- スキーマは `src/db/schema.ts` を編集して管理します。
- スキーマ変更を SQL として生成: `pnpm run db:generate`
- スキーマをデータベースへ適用: `pnpm run db:push`
- スキーマをブラウザで確認: `pnpm run db:studio`
