import "server-only";
import { redirect } from "next/navigation";

import { SignUpForm } from "#/features/auth/components/sign-up-form.tsx";
import { RedirectToSchema } from "#/features/auth/lib/schema.ts";
import { getSession } from "#/lib/better-auth/helper.ts";

type SignUpFetcherProps = {
  searchParams: Promise<{ redirectTo?: string | string[] }>;
};

export const SignUpFetcher = async ({ searchParams }: Readonly<SignUpFetcherProps>) => {
  const { redirectTo } = await searchParams;
  const destination = RedirectToSchema.parse(redirectTo);

  if (await getSession()) {
    redirect(destination);
  }

  return <SignUpForm redirectTo={destination} />;
};
