import { Skeleton } from "#/components/ui/skeleton";

type AuthFormSkeletonProps = {
  fieldCount: number;
};

export const AuthFormSkeleton = ({ fieldCount }: Readonly<AuthFormSkeletonProps>) => (
  <div role="status" aria-label="読み込み中" className="flex flex-col gap-4">
    {Array.from({ length: fieldCount }, (_, index) => (
      <div key={index} aria-hidden="true" className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
    ))}
    <Skeleton aria-hidden="true" className="h-10 w-full" />
  </div>
);
