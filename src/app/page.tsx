import { Card, CardContent, CardHeader } from "#/components/ui/card";
import { Heading } from "#/components/ui/heading";
import { TaskForm } from "#/features/task/components/task-form";
import { TaskListFetcher } from "#/features/task/components/task-list/task-list-fetcher";

const HomePage = () => (
  <main className="bg-bg min-h-screen px-4 py-12 sm:px-6 sm:py-16">
    <div className="mx-auto max-w-2xl">
      <Card className="border-line-strong">
        <CardHeader className="border-line-subtle border-b pb-4">
          <Heading level={1} className="text-center tracking-tight">
            Task App
          </Heading>
        </CardHeader>
        <CardContent className="flex flex-col gap-8 pt-6">
          <TaskForm />
          <TaskListFetcher />
        </CardContent>
      </Card>
    </div>
  </main>
);

export default HomePage;
