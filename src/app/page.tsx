import { Card, CardContent, CardHeader } from "#/components/ui/card";
import { Heading } from "#/components/ui/heading";
import { TodoForm } from "#/features/todo/components/todo-form";
import { TodoListFetcher } from "#/features/todo/components/todo-list/todo-list-fetcher";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-muted/30 py-12 px-4 sm:py-16 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <Heading level={1} className="text-center">
              Todo App
            </Heading>
          </CardHeader>
          <CardContent className="flex flex-col gap-8 pt-2">
            <TodoForm />
            <TodoListFetcher />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default HomePage;
