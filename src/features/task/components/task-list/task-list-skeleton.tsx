import { Card, CardContent } from "#/components/ui/card";
import { Skeleton } from "#/components/ui/skeleton";

export const TaskListSkeleton = () => (
  <div role="status" aria-label="タスクを読み込み中" className="flex flex-col gap-4">
    {[0, 1, 2].map((index) => (
      <Card key={index} className="bg-surface-subtle [--gutter:--spacing(4)]" aria-hidden="true">
        <CardContent className="flex items-start gap-3">
          <Skeleton className="size-10 shrink-0 sm:size-8" />
          <div className="min-w-0 flex-1 pt-2 sm:pt-1">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="mt-2 h-4 w-24" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);
