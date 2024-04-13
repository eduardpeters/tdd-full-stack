import { FakeTodoRepository } from './FakeTodosRepository';
import { NewTodoDto, Todo } from './types';

const todoRepository = new FakeTodoRepository();

export async function getAllTodos(): Promise<Todo[]> {
  return todoRepository.getAll();
}

export async function getTodoById(id: number): Promise<Todo | undefined> {
  return todoRepository.getById(id);
}

export async function createTodo(todo: NewTodoDto): Promise<Todo> {
  return todoRepository.create(todo);
}

export async function updateTodo(
  id: number,
  data: any
): Promise<Todo | undefined> {
  return todoRepository.update(id, data);
}
