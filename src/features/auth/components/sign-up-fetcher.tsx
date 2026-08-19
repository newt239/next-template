import "server-only";
import { redirect } from "next/navigation";

import { SignUpForm } from "#/features/auth/components/sign-up-form";
import { RedirectToSchema } from "#/features/auth/lib/schema";
import { getSession } from "#/lib/better-auth/helper";

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
