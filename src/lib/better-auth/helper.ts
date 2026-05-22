import { headers } from "next/headers";

import { auth } from "./auth";

export const getSession = async () => {
  try {
    return await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Failed to get session:", error);
    throw error;
  }
};

export const getUser = async () => {
  const session = await getSession();
  return session?.user;
};

export const requireAuth = async () => {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Authentication required");
  }
  return session;
};
