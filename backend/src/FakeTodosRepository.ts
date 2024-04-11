import { Todo } from './types';

export class FakeTodoRepository {
  todos: Todo[] = [];

  constructor() {
    this.todos = [];
  }

  getAll() {
    return this.todos;
  }
}
