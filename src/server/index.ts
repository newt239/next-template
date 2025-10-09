import { Hono } from "hono";
import getTodosHandler from "./controllers/todos/get-list";
import createTodoHandler from "./controllers/todos/post-create";
import updateTodoHandler from "./controllers/todos/put-update";
import deleteTodoHandler from "./controllers/todos/delete-remove";

const app = new Hono()
  .get("/todos", ...getTodosHandler)
  .post("/todos", ...createTodoHandler)
  .put("/todos/:id", ...updateTodoHandler)
  .delete("/todos/:id", ...deleteTodoHandler);

export default app;

export type APIRouteType = typeof app;
