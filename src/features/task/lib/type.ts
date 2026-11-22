import type { TaskResponseSchema, TaskStatusSchema } from "./schema";

import type * as z from "zod";

export type Task = z.infer<typeof TaskResponseSchema>;

export type TaskStatus = z.infer<typeof TaskStatusSchema>;
