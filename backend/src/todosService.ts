import { FakeTodoRepository } from './FakeTodosRepository';
import { NewTodoDto, Todo } from './types';

const todoRepository = new FakeTodoRepository();

export async function getAllTodos(): Promise<Todo[]> {
  return todoRepository.getAll();
}

export async function createTodo(todo: NewTodoDto): Promise<Todo> {
  return todoRepository.create(todo);
}
