import { NewTodoDto, Todo } from './types';

export class FakeTodoRepository {
  todos: Todo[] = [];

  constructor() {
    this.todos = [];
  }

  getAll() {
    return this.todos;
  }

  create(newTodo: NewTodoDto) {
    const todoToInsert = { ...newTodo, id: 1 };
    this.todos.push(todoToInsert);
    return todoToInsert;
  }
}
