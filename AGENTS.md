# Coding Agent Guidelines

## 目次

- [基本原則](#基本原則)
- [開発コマンド](#開発コマンド)
- [アーキテクチャ](#アーキテクチャ)
- [コーディングガイドライン](#コーディングガイドライン)

## 基本原則

- 常に日本語でコミュニケーションを行ってください。すべてのコミットメッセージ、コメント、エラーメッセージ、ユーザーとのやり取りは日本語で行ってください。
- ファイルの削除を行う場合は、必ず実行前に以下を報告し、明示的なユーザー承認を得てください。
  - 対象ファイルのリスト
  - 実行する変更の詳細説明
  - 影響範囲の説明
- 不明な点がある場合は常に質問し、推測で進めてはなりません。
- 実装後の必須作業として、以下のコマンドを実行してください。
    - `npx tsc --noEmit && pnpm run lint:fix`
    - 型エラーやリンターのエラーが出た場合は、コミット前に必ず修正してください。
    - エラーを解消するために`eslint.config.mjs`や`tsconfig.json`を変更してはなりません。

## 開発コマンド

### 基本コマンド

- `pnpm run dev` - 開発サーバーを起動
- `pnpm run build` - 本番アプリケーションをビルド
- `pnpm run start` - 本番サーバーを開始
- `npx tsc --noEmit` - TypeScript で型チェック

## アーキテクチャ

### 技術スタック

- **言語**: TypeScript
- **フレームワーク**: Next.js 15 with App Router
- **スタイリング**: CSS Modules
- **コード品質**: ESlint, Prettier, Stylelint
- **Git hooks**: Lefthook
- **テスト**: Vitest, Playwright
- **コンポーネント管理**: Storybook
- **デプロイ**: Vercel
- **データベース**: Turso DB (SQLite)
- **ORM**: Drizzle

### プロジェクト構造

```bash
src/
├── app/                    # Next.js App Router
│   ├── api/               # APIルーティング
│   ├── (public)/          # ログイン前のページ
│   │   ├── login/
│   │   └── register/
│   ├── (protected)/          # ログイン後のページ
│   │   ├── {pathname}/
│   │   │   ├── _components/
│   │   │   │   └── {name}.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── globals.css           # グローバルスタイル
│   ├── layout.tsx            # ルートレイアウト
│   └── page.tsx              # ホームページ
├── components/{name}/         # 汎用的に使用するコンポーネント
│    ├─ {name}.tsx          # 機能固有のコンポーネント
│    ├─ {name}.module.css   # 機能固有のスタイル
│    ├─ {name}.spec.tsx     # 機能固有のユニットテスト
│    ├─ {name}.stories.tsx  # 機能固有のストーリー
│    └─ index.ts            # 機能固有のインデックスファイル
├── libs/                   # グローバルユーティリティ関数
│    └─ drizzle/            # Drizzleの設定
├── types/                  # グローバル型定義
└── hooks/                  # グローバルカスタムフック
```

- コンポーネントの名前はUpperCamelCaseで命名し、ディレクトリ名はkebab-caseで命名してください。

## コーディングガイドライン

## `any`の禁止

- いかなる理由があっても`any`を使用してはなりません。

### 型アサーションの禁止

- 型アサーションは禁止です。
- 型アサーションを使用する場合は、明確な理由をコメントアウトとして記述してください。

### `interface`の禁止

- 型定義に`interface`を使用してはなりません。`type`を使用してください。

### クライアントコンポーネントを最小限に

- クライアントコンポーネントは最小限にし、サーバーコンポーネントでデータ取得を行い、propsで子コンポーネントに渡してください。

### useEffectの禁止

- 初期データを取得するためにuseEffectを使用してはなりません。
- データ取得はpage.tsxでサーバーコンポーネントとして実装し、propsで子コンポーネントに渡してください。
- ブラウザAPIアクセスやイベントリスナー登録など、真に必要な場合のみuseEffectを使用を許可します。この場合は明確な理由をコメントアウトとして記述すべきです。

### API Routes

**Server Actionsは使用禁止とします。** すべてAPI Routesで実装してください。

- データベースとのやり取りが必要な場合は`src/server`以下に新たなエンドポイントを実装してください
- API RoutesのルートはすべてHonoで管理します
- エントリーポイントは`src/server/index.ts`で管理します
- ルートを追加する際は`src/server/index.ts`に追加してください
- コントローラーの実装は`src/server/controllers/`に追加してください
- **バリデーションには必ず`zValidator`を使用**してください（リクエストボディ、クエリパラメータ両方）
- **バリデーションスキーマは`src/models/`で定義**し、UpperCamelCaseで命名してください
- データベースとのやり取りは`src/utils/cloud-db.ts`や`repositories`以下で行ってください
- **APIクライアント**: クライアントサイドでは`apiClient`、サーバーサイドでは`createApiClientOnServer()`を使用してください。生のfetchは使用しないでください

**バリデーション実装例:**

```typescript
import { zValidator } from "@hono/zod-validator";
import { GetPlayersQuerySchema } from "@/models/players";

const handler = factory.createHandlers(
  zValidator("query", GetPlayersQuerySchema), // クエリパラメータ
  zValidator("json", CreatePlayerSchema), // リクエストボディ
  async (c) => {
    const query = c.req.valid("query");
    const body = c.req.valid("json");
    // 処理...
  }
);
```

**Controllers構成ルール:**

- `src/server/controllers/`以下のハンドラーは1ファイルにつき1個とします
- 機能ごとにディレクトリを分割してください（`game/`, `player/`, `user/`, `auth/`など）
- ファイル名はメソッドタイプ-機能名の形式で命名してください
  - 例: `game/get-list.ts`, `game/post-create.ts`, `game/get-detail.ts`, `game/patch-update.ts`
  - 例: `player/get-list.ts`, `player/post-create.ts`
  - 例: `user/get-preferences.ts`, `user/update-preferences.ts`
- 各ファイルでは`default export`でハンドラーをエクスポートしてください
- `src/server/index.ts`でimportして使用してください
- **必ず`factory.createHandlers`を使用してください**: 既存の実装パターンに合わせて、すべてのハンドラーで`createFactory()`から生成したfactoryの`createHandlers`メソッドを使用してください
- **既存ファイルとの統合を優先**: 新しい機能を実装する際は、新しいファイルを作成するのではなく、既存の同種ファイル（例：`models/player.ts`、`repositories/player.ts`）に機能を追加してください

### Models管理

サーバーサイドの型定義とスキーマ定義は`src/models/`で機能ごとに管理してください。

**ファイル構成:**

```
src/models/
├── game.ts            # ゲーム関連の型定義・スキーマ
├── player.ts          # プレイヤー関連の型定義・スキーマ
└── user-preference.ts # ユーザー設定関連の型定義・スキーマ
```

**使用ルール:**

- 各機能のZodスキーマは対応するmodelsファイルで定義してください
- スキーマ名は**UpperCamelCase**で命名してください（例：`CreateGameSchema`, `UpdateUserPreferencesSchema`）
- 各エンドポイントのリクエストを定義するスキーマや型名は、先頭をCRUDの動詞にしたうえで、リクエストのスキーマなのか、レスポンスのスキーマなのかを明示してください（例：`CreateGameRequestSchema`, `UpdateUserPreferencesResponseType`）
- TypeScriptの型定義もmodelsファイルで管理してください
- Controllers・Repositoriesからmodelsファイルを`@/models/`でimportして使用してください
- バリデーションスキーマと型定義を同じファイルで管理することで、保守性を向上させてください
- 新しい機能を追加する際は、対応するmodelsファイルを作成してください
- **データ変換関数の禁止**: modelsディレクトリには型とスキーマのみ配置してください。レスポンスデータを変換する関数は作成しないでください。APIレスポンスはそのまま受け入れてください

### ローディング表示

- APIリクエストを行う際は`useTransition`を使用してローディング表示を行ってください。
- ボタンを連打できないように`disabled`を設定してください。
