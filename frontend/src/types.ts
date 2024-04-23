export interface Todo {
  id: number;
  description: string;
  isComplete: boolean;
}

export interface TodoDto {
  description?: string;
  isComplete?: boolean;
}

export interface ResponseError {
  error: string;
}
