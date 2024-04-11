export interface Todo {
  id: number;
  description: string;
  isComplete: boolean;
}

export interface NewTodoDto {
  description: string;
  isComplete: boolean;
}
