import { headers } from "next/headers";

import { auth } from "./auth";

export async function getSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch (error) {
    console.error("Failed to get session:", error);
    return;
  }
}

export async function getUser() {
  try {
    const session = await getSession();
    return session?.user || undefined;
  } catch (error) {
    console.error("Failed to get user:", error);
    return;
  }
}

export async function requireAuth() {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Authentication required");
  }
  return session;
}
