import { TodoDetail } from "#/features/todo/components/todo-detail";

const TodoDetailPage = ({ params }: { params: { id: string } }) => <TodoDetail params={params} />;

export default TodoDetailPage;
