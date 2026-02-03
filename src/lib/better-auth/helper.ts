import { headers } from "next/headers";

import { auth } from "./auth";

export const getSession = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch (error) {
    console.error("Failed to get session:", error);
  }
};

export const getUser = async () => {
  try {
    const session = await getSession();
    return session?.user || undefined;
  } catch (error) {
    console.error("Failed to get user:", error);
  }
};

export const requireAuth = async () => {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Authentication required");
  }
  return session;
};
