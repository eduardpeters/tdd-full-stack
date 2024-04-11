import { NewTodoDto, Todo } from './types';

export async function getAllTodos(): Promise<Todo[]> {
  return [];
}

export async function createTodo(todo: NewTodoDto): Promise<Todo> {
  return { ...todo, id: 1 };
}
