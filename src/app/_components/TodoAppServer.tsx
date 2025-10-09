import TodoAppClient from "./TodoAppClient";
import { getTodosFromServer } from "@/libs/serverTodoApi";
import type { Todo } from "@/types/todo";

type TodoAppServerProps = {
  initialTodos: Todo[]
}

export default function TodoAppServer({ initialTodos }: TodoAppServerProps) {
  return <TodoAppClient initialTodos={initialTodos} />;
}
