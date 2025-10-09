import type { CreateTodoRequest, UpdateTodoRequest } from "@/types/todo";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { DBClient } from "@/libs/drizzle/client";
import { todoItems } from "@/libs/drizzle/schema";

const app = new Hono();

// TODO一覧取得
app.get("/todos", async (c) => {
  try {
    const todos = await DBClient.select().from(todoItems).orderBy(todoItems.createdAt);
    return c.json(todos);
  }
  catch (error) {
    console.error("TODO一覧取得エラー:", error);
    return c.json({ error: "TODO一覧の取得に失敗しました" }, 500);
  }
});

// TODO作成
app.post("/todos", async (c) => {
  try {
    const body = await c.req.json() as CreateTodoRequest;

    if (!body.title || body.title.trim().length === 0) {
      return c.json({ error: "タイトルは必須です" }, 400);
    }

    const [newTodo] = await DBClient
      .insert(todoItems)
      .values({
        title: body.title.trim(),
        isCompleted: false,
      })
      .returning();

    return c.json(newTodo, 201);
  }
  catch (error) {
    console.error("TODO作成エラー:", error);
    return c.json({ error: "TODOの作成に失敗しました" }, 500);
  }
});

// TODO更新
app.put("/todos/:id", async (c) => {
  try {
    const id = Number.parseInt(c.req.param("id"));
    const body = await c.req.json() as UpdateTodoRequest;

    if (Number.isNaN(id)) {
      return c.json({ error: "無効なIDです" }, 400);
    }

    if (body.title !== undefined && body.title.trim().length === 0) {
      return c.json({ error: "タイトルは必須です" }, 400);
    }

    const updateData: Partial<typeof todoItems.$inferInsert> = {};
    if (body.title !== undefined)
      updateData.title = body.title.trim();
    if (body.isCompleted !== undefined)
      updateData.isCompleted = body.isCompleted;

    const [updatedTodo] = await DBClient
      .update(todoItems)
      .set(updateData)
      .where(eq(todoItems.id, id))
      .returning();

    if (!updatedTodo) {
      return c.json({ error: "TODOが見つかりません" }, 404);
    }

    return c.json(updatedTodo);
  }
  catch (error) {
    console.error("TODO更新エラー:", error);
    return c.json({ error: "TODOの更新に失敗しました" }, 500);
  }
});

// TODO削除
app.delete("/todos/:id", async (c) => {
  try {
    const id = Number.parseInt(c.req.param("id"));

    if (Number.isNaN(id)) {
      return c.json({ error: "無効なIDです" }, 400);
    }

    const [deletedTodo] = await DBClient
      .delete(todoItems)
      .where(eq(todoItems.id, id))
      .returning();

    if (!deletedTodo) {
      return c.json({ error: "TODOが見つかりません" }, 404);
    }

    return c.json({ message: "TODOが削除されました" });
  }
  catch (error) {
    console.error("TODO削除エラー:", error);
    return c.json({ error: "TODOの削除に失敗しました" }, 500);
  }
});

export default app;

export type APIRouteType = typeof app;
