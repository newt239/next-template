import "server-only";

import { getTodos } from "../../actions/get-todos";

import { TodoList } from "./todo-list";

export const TodoListFetcher = async () => {
  const response = await getTodos();

  return <TodoList todos={response.todos} />;
};
