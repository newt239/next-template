import type { APIRouteType } from "#/server";

import process from "node:process";

import { hc } from "hono/client";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`
  : "http://localhost:3000";

/**
 * ブラウザ上で動作するAPIクライアントを作成
 */
function createApiClient() {
  return hc<APIRouteType>(`${baseUrl}/api`, {
    init: {
      credentials: "include",
    },
  });
}

export default createApiClient;
