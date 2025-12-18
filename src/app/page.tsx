import { TodoForm } from "#/features/todos/components/todo-form";
import { TodoListFetcher } from "#/features/todos/components/todo-list/todo-list-fetcher";

const HomePage = () => {
  return (
    <main className="py-12 bg-linear-to-br from-[#667eea] to-[#764ba2] min-h-screen px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">Todo App</h1>
        <TodoForm />
        <TodoListFetcher />
      </div>
    </main>
  );
};

export default HomePage;
