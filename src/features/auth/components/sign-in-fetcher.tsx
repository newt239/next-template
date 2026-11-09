import "server-only";
import { redirect } from "next/navigation";

import { SignInForm } from "#/features/auth/components/sign-in-form.tsx";
import { RedirectToSchema } from "#/features/auth/lib/schema.ts";
import { getSession } from "#/lib/better-auth/helper.ts";

type SignInFetcherProps = {
  searchParams: Promise<{ redirectTo?: string | string[] }>;
};

export const SignInFetcher = async ({ searchParams }: Readonly<SignInFetcherProps>) => {
  const { redirectTo } = await searchParams;
  const destination = RedirectToSchema.parse(redirectTo);

  if (await getSession()) {
    redirect(destination);
  }

  return <SignInForm redirectTo={destination} />;
};
