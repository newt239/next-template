import TodoAppServer from "./_components/TodoAppServer";
import { getTodosFromServer } from "@/libs/serverTodoApi";

export default async function HomePage() {
  // サーバーコンポーネントでデータ取得
  const initialTodos = await getTodosFromServer();
  
  return <TodoAppServer initialTodos={initialTodos} />;
}
