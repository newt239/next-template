import { parseResponse } from "hono/client";

import TodoList from "./todo-list";

import createApiClientOnServer from "@/libs/hono/server";
import { GetTodosResponseFromJsonSchema } from "@/models/todo";

const TodoListFetcher = async () => {
  // サーバーコンポーネントでデータ取得
  const client = await createApiClientOnServer();
  const res = await parseResponse(client.todos.$get({query: {}}));
  
  const validatedResponse = GetTodosResponseFromJsonSchema.parse(res);
  
  return <TodoList todos={validatedResponse.todos} />;
};

export default TodoListFetcher;
