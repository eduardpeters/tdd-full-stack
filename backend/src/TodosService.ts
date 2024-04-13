import { FakeTodoRepository } from './FakeTodosRepository';
import { NewTodoDto, Todo } from './types';

const todoRepository = new FakeTodoRepository();

export class TodosService {
  repository: FakeTodoRepository;

  constructor(repository: FakeTodoRepository) {
    this.repository = repository;
  }

  async getAll(): Promise<Todo[]> {
    return todoRepository.getAll();
  }

  async getById(id: number): Promise<Todo | undefined> {
    return todoRepository.getById(id);
  }

  async create(todo: NewTodoDto): Promise<Todo> {
    return todoRepository.create(todo);
  }

  async update(id: number, data: any): Promise<Todo | undefined> {
    return todoRepository.update(id, data);
  }

  async deleteById(id: number): Promise<void> {
    return todoRepository.delete(id);
  }
}
