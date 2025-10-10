import TodoForm from "./_components/todo-form";
import TodoListFetcher from "./_components/todo-list/todo-list-fetcher";
import styles from "./_components/todo-list/todo-list.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <TodoForm />
      <TodoListFetcher />
    </div>
  );
};

export default HomePage;
