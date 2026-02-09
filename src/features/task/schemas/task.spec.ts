import { describe, expect, it } from "vitest";

import { CreateTaskRequestSchema } from "./task";

describe("CreateTaskRequestSchema", () => {
  it("有効なタイトルをパースできる", () => {
    const result = CreateTaskRequestSchema.safeParse({ title: "買い物に行く" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe("買い物に行く");
    }
  });

  it("前後の空白はトリムされる", () => {
    const result = CreateTaskRequestSchema.safeParse({ title: "  タスク  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe("タスク");
    }
  });

  it("空文字は無効", () => {
    const result = CreateTaskRequestSchema.safeParse({ title: "" });
    expect(result.success).toBe(false);
  });
});
