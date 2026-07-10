import { Card, CardContent } from "#/components/ui/card";
import { Skeleton } from "#/components/ui/skeleton";

export const TaskListSkeleton = () => (
  <div role="status" aria-label="タスクを読み込み中" className="flex flex-col gap-4">
    {[0, 1, 2].map((index) => (
      <Card key={index} className="bg-surface-subtle" aria-hidden="true">
        <CardContent className="flex items-center gap-3 py-4">
          <Skeleton className="size-10 shrink-0 sm:size-8" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          <Skeleton className="size-10 shrink-0 sm:size-8" />
        </CardContent>
      </Card>
    ))}
  </div>
);
