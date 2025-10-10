import { Hono } from "hono";

import deleteTodoHandler from "./controllers/todos/[id]/delete";
import updateTodoHandler from "./controllers/todos/[id]/put";
import getTodosHandler from "./controllers/todos/get";
import createTodoHandler from "./controllers/todos/post";

const app = new Hono()
  .get("/todos", ...getTodosHandler)
  .post("/todos", ...createTodoHandler)
  .put("/todos/:id", ...updateTodoHandler)
  .delete("/todos/:id", ...deleteTodoHandler);

export default app;

export type APIRouteType = typeof app;
