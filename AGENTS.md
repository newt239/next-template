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
- `pnpm run codecheck` - 型チェック・Lint・フォーマット・ファイル名規約・未使用コード検出をまとめて実行
- `pnpm run test:e2e` - Playwright で E2E テストを実行
- `pnpm run db:generate` - スキーマ変更から SQL マイグレーションを生成
- `pnpm run db:migrate` - マイグレーションをデータベースへ適用

### Playwright MCP による動作確認

- Playwright MCP で撮影したスクリーンショットは、必ず `.playwright-mcp/` ディレクトリに保存してください(`filename` に `.playwright-mcp/xxx.png` のようにディレクトリ付きで指定します)。
- `.playwright-mcp/` は gitignore 済みです。プロジェクトルート直下にスクリーンショット等の検証用ファイルを作成しないでください。

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
- **認証**: Better Auth（メールアドレス + パスワード、メール送信なし）
- **E2E テスト**: Playwright

### プロジェクト構造

```bash
src/
├── app/                    # Next.js App Router
│   ├── (public)/           # ログイン前のページ
│   │   ├── login/
│   │   └── register/
│   ├── (protected)/        # ログイン後のページ
│   │   ├── {pathname}/
│   │   │   └── page.tsx
│   │   ├── layout.tsx      # アプリバー
│   │   └── page.tsx
│   ├── api/auth/[...all]/  # Better Auth のルートハンドラ
│   ├── favicon.ico
│   ├── globals.css         # グローバルスタイル
│   ├── layout.tsx          # ルートレイアウト
│   ├── error.tsx           # エラーバウンダリ
│   ├── global-error.tsx    # ルートレイアウトのエラーバウンダリ
│   └── not-found.tsx       # 404 ページ
├── features/               # 機能ベースのディレクトリ構成
│   └── {feature-name}/
│       ├── actions/        # Server Actions およびデータフェッチ関数
│       ├── components/     # 機能固有のコンポーネント
│       │   └── {component-name}.tsx
│       └── lib/             # 機能固有のスキーマ・型・ユーティリティ
│           ├── schema.ts    # Zod スキーマ（バリデーション用）
│           └── type.ts      # 機能固有の型定義
├── components/             # 汎用的に使用するコンポーネント
│   └── {category}/        # 例: ui/
│       └── {name}.tsx
├── lib/                    # グローバルユーティリティ・設定
│   ├── better-auth/        # 認証設定とサーバー側のセッション取得 (getSession / requireSession)
│   ├── drizzle/            # Drizzle の設定・スキーマ
│   └── primitive.ts        # 共通プリミティブ
├── proxy.ts                # 未ログイン時のリダイレクト (楽観的チェックのみ)
├── types/                  # グローバル型定義（必要に応じて追加）
└── hooks/                  # グローバルカスタムフック（必要に応じて追加）
```

- コンポーネントの名前はPascalCaseで命名し、ディレクトリ名はkebab-caseで命名してください。
- コンポーネントごとにディレクトリを作らず、`{component-name}.tsx` として直接配置し、名前付きエクスポートしてください。`index.ts` による再エクスポートは行いません。

### Feature 内モジュールの参照制限

- 各 feature 内の **actions**・**lib**（feature 内に配置した場合）・**hooks**（feature 内に配置した場合）は、**その feature の外から呼び出してはなりません**。
- 別の feature や、app・components などから、他 feature の actions / lib / hooks をインポートしたり呼び出したりしないでください。
- 共通化したい処理は、`src/lib/` や `src/hooks/` などグローバルな層に配置し、必要な feature や app から参照してください。

### インポートとパスエイリアス

- 同階層でないモジュールをインポートする場合は、**相対パスではなくパスエイリアスを使用してください**。
- プロジェクトでは `#/` が `src/` にマップされています。例: `#/components/ui/button` → `src/components/ui/button`。
- **同一 feature 内**（例: `features/task/actions/` から `features/task/lib/type.ts`）や**同一ディレクトリ内**のインポートでは相対パス（`../lib/type` など）を使用して構いません。
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

### Zod スキーマの命名

- Zod スキーマの変数名は PascalCase で命名し、末尾に `Schema` を付けてください。
- エクスポートしない内部スキーマも同様に PascalCase で命名してください。

### コメントの禁止

- 原則としてコメントは記述してはなりません。
- 型アサーションやuseEffectの使用理由など、他のガイドラインが記述を求める場合のみ例外とします。
- コメントを書く場合は括弧を使用しないでください。

### UIコンポーネントの棚卸し

`src/components/ui/` は[Intent UI](https://intentui.com/)のレジストリから取り込んだコンポーネント置き場です。`knip.json`で`entry`に指定してあるため**未使用でも検出されません**。レジストリから追加したあとに使わなくなったものは手で削除してください。必要になれば`components.json`の`@intentui`レジストリから再取得できます。

### 過度な抽象化の禁止

- 無駄に関数化・定数化しすぎてはなりません。
- 再利用される明確な根拠がない限り、処理の切り出しや定数への抽出を行わないでください。

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

#### 認可は必ずデータ層で行う

Server Actionsは`"use server"`を付けた時点で、UIを経由せずとも直接POSTできる公開エンドポイントになります。ページ側での認証チェックはそのページのServer Actionsには及びません。また`src/proxy.ts`の`getSessionCookie`はCookieの存在を見るだけで署名検証を行わない楽観的チェックであり、認可の根拠にはなりません。

- **すべてのServer Actionsの冒頭でセッションを検証してください**。`src/lib/better-auth/helper.ts`の`getSession()`を使い、`null`ならエラー結果を返します
- Server Actionsの中で`requireSession()`を使ってはなりません。`redirect()`は例外を投げて動作するため、`try`/`catch`の中で呼ぶと`NEXT_REDIRECT`が握り潰されます。`requireSession()`はデータフェッチ関数やServer Component側でのみ使用してください
- **クライアントから受け取ったIDを信頼してはなりません**。所有者の絞り込みはセッションから引いたユーザーIDで行い、`where`条件に含めてください
- データフェッチ関数も同様に、呼び出し側でセッションを検証したうえでユーザーIDを引数として受け取ってください。`"use cache"`の中では`cookies()`や`headers()`を読めないため、ユーザーIDは引数として渡してキャッシュキーに含めます

#### Server Actionsの実装例（フォーム操作用）

```ts
"use server";

import { z } from "zod";

import { CreateTaskRequestSchema } from "#/features/task/lib/schema";
import { getSession } from "#/lib/better-auth/helper";

export const createTask = async (data: { title: string }) => {
  try {
    const session = await getSession();
    if (!session) {
      return { error: "ログインが必要です", success: false } as const;
    }

    const body = CreateTaskRequestSchema.parse(data);
    // 処理...
    return { success: true, task: result } as const;
  } catch (error) {
    return { error: "エラーメッセージ", success: false } as const;
  }
};
```

#### データフェッチ関数の実装例（初期レンダリング用）

```ts
import "server-only";
import { cacheLife, cacheTag } from "next/cache";

import { GetTasksQuerySchema } from "#/features/task/lib/schema";

export const getTasks = async (userId: string, options?: { limit?: number; offset?: number }) => {
  "use cache";

  cacheLife({ expire: 3600, revalidate: 300, stale: 60 });
  cacheTag(`tasks-${userId}`);

  try {
    const query = GetTasksQuerySchema.parse(options);
    // 処理...
    return response;
  } catch (error) {
    throw new Error("エラーメッセージ", { cause: error });
  }
};
```

#### 構成ルール

- Server Actionsは`src/features/{feature-name}/actions/`に配置します
- データフェッチ関数も`src/features/{feature-name}/actions/`に配置します（`"use server"`は不要）
- 各ファイルでは名前付きエクスポートで関数をエクスポートしてください
- エラーハンドリングを適切に実装し、エラー情報を返り値に含めてください
- ミューテーション後は`updateTag()`でキャッシュを無効化します。タグ名はユーザー単位にしてください

#### 認証だけは Server Actions を使わない

`src/features/auth/` にはServer Actionsを置きません。サインイン・サインアップ・サインアウトは`src/lib/better-auth/client.ts`の`authClient`から`/api/auth/*`を呼びます。

Better Authのレートリミットとorigin チェックは**ルーターの`onRequest`フックにしか実装されていない**ため、`auth.api.signInEmail()`のようにサーバー側から直接呼ぶと両方とも素通りし、パスワードの総当たりが無制限になります。HTTPエンドポイント経由にすることで`src/lib/better-auth/auth.ts`の`rateLimit`設定が効きます。

入力のバリデーションは送信前に`src/features/auth/lib/schema.ts`のZodスキーマで行い、Better Auth側でも再度検証されます。

### ローディング表示

- APIリクエストを行う際は`useTransition`を使用してローディング表示を行ってください。
- ボタンを連打できないように`disabled`を設定してください。

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
