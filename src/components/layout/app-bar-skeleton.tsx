import { Skeleton } from "#/components/ui/skeleton";

export const AppBarSkeleton = () => (
  <div
    aria-hidden="true"
    className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
  >
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-8 w-16" />
  </div>
);
