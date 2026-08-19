import "server-only";
import { ThemeToggle } from "#/components/layout/theme-toggle";
import { Text } from "#/components/ui/text";
import { SignOutButton } from "#/features/auth/components/sign-out-button";
import { requireSession } from "#/lib/better-auth/helper";

export const AppBar = async () => {
  const session = await requireSession();

  return (
    <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
      <Text className="text-muted-fg truncate text-sm">{session.user.name}</Text>
      <div className="flex shrink-0 items-center gap-1">
        <ThemeToggle />
        <SignOutButton />
      </div>
    </div>
  );
};
