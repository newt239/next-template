export type Todo = {
  id: number
  title: string
  isCompleted: boolean
  createdAt: Date
}

export type CreateTodoRequest = {
  title: string
}

export type UpdateTodoRequest = {
  title?: string
  isCompleted?: boolean
}
