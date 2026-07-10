import { Skeleton } from "#/components/ui/skeleton";

export const TaskDetailSkeleton = () => (
  <div role="status" aria-label="タスクを読み込み中" className="space-y-4">
    <div aria-hidden="true" className="space-y-4">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-7 w-2/3" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-5 w-1/3" />
    </div>
  </div>
);
