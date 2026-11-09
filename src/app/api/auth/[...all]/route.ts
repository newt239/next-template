import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "#/lib/better-auth/auth.ts";

export const { GET, POST } = toNextJsHandler(auth.handler);
