import { TodoForm } from "@/features/todos/components/todo-form";
import { TodoListFetcher } from "@/features/todos/components/todo-list/todo-list-fetcher";
import styles from "@/features/todos/components/todo-list/todo-list.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <TodoForm />
      <TodoListFetcher />
    </div>
  );
};

export default HomePage;
