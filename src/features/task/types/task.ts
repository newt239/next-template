export type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
};

export type TaskStatus = "incomplete" | "completed";
