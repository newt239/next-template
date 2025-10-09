# Next.js Template

- TypeScript
- Next.js App Router
- ESLint Flat Config
  - @antfu/eslint-config
- Stylelint
  - stylelint-config-recess-order
  - stylelint-config-standard
  - stylelint-plugin-use-baseline
  - @css-modules-kit/stylelint-plugin
- CSS Modules Kit
- Vitest
- Playwright
- Storybook
- Vercel
- Turso DB (SQLite)
- Drizzle

## Development

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

`.env.example` を基に `.env.local` などの環境ファイルを作成し、以下の値を設定してください。

- `DATABASE_URL`: Turso もしくは libsql の接続 URL。
- `DATABASE_AUTH_TOKEN`: 認証が必要な場合のみ設定するアクセストークン。

## Drizzle

- スキーマは `src/db/schema.ts` を編集して管理します。
- スキーマ変更を SQL として生成: `pnpm run db:generate`
- スキーマをデータベースへ適用: `pnpm run db:push`
- スキーマをブラウザで確認: `pnpm run db:studio`
