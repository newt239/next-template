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
- 実装後の必須作業として、`pnpm run codecheck`を実行してください。
  - 型エラーやリンターのエラーが出た場合は、コミット前に必ず修正してください。
  - エラーを解消するために`oxlintrc.json`や`tsconfig.json`を変更してはなりません。

## 開発コマンド

### 基本コマンド

- `pnpm run dev` - 開発サーバーを起動
- `pnpm run build` - 本番アプリケーションをビルド
- `pnpm run start` - 本番サーバーを開始
- `pnpm run typecheck` - TypeScript で型チェック

## アーキテクチャ

### 技術スタック

- **言語**: TypeScript
- **フレームワーク**: Next.js 16 with App Router
- **スタイリング**: Tailwind CSS v4
- **コード品質**: Oxlint
- **Git hooks**: Lefthook
- **デプロイ**: Vercel
- **データベース**: Turso DB (SQLite)
- **ORM**: Drizzle

### プロジェクト構造

```bash
src/
├── app/                    # Next.js App Router
│   ├── (public)/           # ログイン前のページ（認証実装時に追加）
│   │   ├── login/
│   │   └── register/
│   ├── (protected)/        # ログイン後のページ（認証実装時に追加）
│   │   ├── {pathname}/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css         # グローバルスタイル
│   ├── layout.tsx          # ルートレイアウト
│   └── page.tsx            # ホームページ
├── features/               # 機能ベースのディレクトリ構成
│   └── {feature-name}/
│       ├── actions/        # Server Actions およびデータフェッチ関数
│       ├── components/     # 機能固有のコンポーネント
│       │   └── {component-name}/
│       │       ├── {component-name}.tsx
│       │       ├── {component-name}.spec.tsx
│       │       ├── {component-name}.stories.tsx
│       │       └── index.ts
│       ├── schemas/        # Zod スキーマ（バリデーション用）
│       └── types/          # 機能固有の型定義
├── components/             # 汎用的に使用するコンポーネント
│   └── {category}/        # 例: ui/
│       ├── {name}.tsx
│       ├── {name}.spec.tsx
│       ├── {name}.stories.tsx
│       └── index.ts
├── lib/                    # グローバルユーティリティ・設定
│   ├── better-auth/        # 認証設定（認証実装時に使用）
│   ├── drizzle/            # Drizzle の設定・スキーマ
│   └── primitive.ts        # 共通プリミティブ
├── types/                  # グローバル型定義（必要に応じて追加）
└── hooks/                  # グローバルカスタムフック（必要に応じて追加）
```

- コンポーネントの名前はPascalCaseで命名し、ディレクトリ名はkebab-caseで命名してください。

### Feature 内モジュールの参照制限

- 各 feature 内の **actions**・**lib**（feature 内に配置した場合）・**hooks**（feature 内に配置した場合）は、**その feature の外から呼び出してはなりません**。
- 別の feature や、app・components などから、他 feature の actions / lib / hooks をインポートしたり呼び出したりしないでください。
- 共通化したい処理は、`src/lib/` や `src/hooks/` などグローバルな層に配置し、必要な feature や app から参照してください。

### インポートとパスエイリアス

- 同階層でないモジュールをインポートする場合は、**相対パスではなくパスエイリアスを使用してください**。
- プロジェクトでは `#/` が `src/` にマップされています。例: `#/components/ui/button` → `src/components/ui/button`。
- **同一 feature 内**（例: `features/todo/actions/` から `features/todo/types/`）や**同一ディレクトリ内**のインポートでは相対パス（`../types/todo` など）を使用して構いません。
- **別の feature・app・components・lib・types・hooks を参照する場合**は、必ず `#/` から始まるパスエイリアスで記述してください。例: `import { Button } from "#/components/ui/button"`。

## コーディングガイドライン

### `any`の禁止

- いかなる理由があっても`any`を使用してはなりません。
- `unknown`や`never`の使用も避けてください。
- 実データと一致する型を定義してください。

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

### Server Actionsとデータフェッチ

- **Server Actions**: フォーム操作などのクライアントからの操作には`"use server"`ディレクティブを使用したServer Actionsを使用します
- **データフェッチ関数**: 初期レンダリングのためのデータ取得には`import "server-only"`のみを使用した通常のサーバー関数を使用します
- **サーバーサイドファイル**: すべてのサーバーサイドで実行されるファイルには`import "server-only"`を付与してください
- **バリデーション**: すべてのServer Actionsとデータフェッチ関数ではZodスキーマを使用したバリデーションを実装してください

#### Server Actionsの実装例（フォーム操作用）

```ts
"use server";

import { z } from "zod";
import { CreateTodoRequestSchema } from "../types/todo";

export async function createTodo(data: { title: string }) {
  try {
    const body = CreateTodoRequestSchema.parse(data);
    // 処理...
    return { success: true, todo: result } as const;
  } catch (error) {
    return { success: false, error: "エラーメッセージ" } as const;
  }
}
```

#### データフェッチ関数の実装例（初期レンダリング用）

```ts
import "server-only";

import { z } from "zod";
import { GetTodosQuerySchema } from "../types/todo";

export async function getTodos(options?: { limit?: number; offset?: number }) {
  try {
    const query = GetTodosQuerySchema.parse(options);
    // 処理...
    return response;
  } catch (error) {
    throw new Error("エラーメッセージ");
  }
}
```

#### 構成ルール

- Server Actionsは`src/features/{feature-name}/actions/`に配置します
- データフェッチ関数も`src/features/{feature-name}/actions/`に配置します（`"use server"`は不要）
- 各ファイルでは名前付きエクスポートで関数をエクスポートしてください
- エラーハンドリングを適切に実装し、エラー情報を返り値に含めてください

### ローディング表示

- APIリクエストを行う際は`useTransition`を使用してローディング表示を行ってください。
- ボタンを連打できないように`disabled`を設定してください。
