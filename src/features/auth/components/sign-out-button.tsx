"use client";

import { useTransition } from "react";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

import { Button } from "#/components/ui/button";
import { authClient } from "#/lib/better-auth/client";

export const SignOutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handlePress = () => {
    startTransition(async () => {
      await authClient.signOut();
      router.replace("/login");
    });
  };

  return (
    <Button
      intent="plain"
      size="sq-sm"
      onPress={handlePress}
      isDisabled={isPending}
      aria-label="ログアウト"
    >
      <ArrowRightStartOnRectangleIcon data-slot="icon" />
    </Button>
  );
};
