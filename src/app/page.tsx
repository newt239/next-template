import { Card, CardContent, CardHeader } from "#/components/ui/card";
import { Heading } from "#/components/ui/heading";
import { TaskForm } from "#/features/task/components/task-form";
import { TaskListFetcher } from "#/features/task/components/task-list/task-list-fetcher";

const HomePage = () => (
  <main className="min-h-screen bg-muted/30 py-12 px-4 sm:py-16 sm:px-6">
    <div className="mx-auto max-w-2xl">
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <Heading level={1} className="text-center">
            Task App
          </Heading>
        </CardHeader>
        <CardContent className="flex flex-col gap-8 pt-2">
          <TaskForm />
          <TaskListFetcher />
        </CardContent>
      </Card>
    </div>
  </main>
);

export default HomePage;
