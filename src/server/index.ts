import { Hono } from "hono";

const app = new Hono();

export default app;

export type APIRouteType = typeof app;
