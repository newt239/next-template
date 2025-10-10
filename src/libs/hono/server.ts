

import { hc } from "hono/client";
import { headers } from "next/headers";

import process from "node:process";

import { getUser } from "../better-auth/helper";

import type { APIRouteType } from "#/server";

/**
 * サーバーサイドで使用するAPIクライアント
 * ユーザーがログインしている場合はx-user-idヘッダーを追加
 * @returns APIクライアント
 */
const createApiClientOnServer = async () => {
  // サーバーサイドでのベースURL決定
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  // ユーザー情報を取得
  const user = await getUser();

  const requestHeaders = Object.fromEntries(headersList.entries());

  // ユーザーIDがある場合はヘッダーに追加
  if (user?.id) {
    requestHeaders["x-user-id"] = user.id;
  }

  return hc<APIRouteType>(`${baseUrl}/api`, {
    init: {
      credentials: "include",
      headers: requestHeaders,
    },
  });
};

export default createApiClientOnServer;
