import { NewTodoDto, Todo } from './types';

export class FakeTodoRepository {
  todos: Todo[] = [];

  constructor() {
    this.todos = [];
  }

  getAll() {
    return this.todos;
  }

  getById(id: number) {
    return this.todos.find((todo) => todo.id === id);
  }

  create(newTodo: NewTodoDto) {
    const todoToInsert = { ...newTodo, id: 1 };
    this.todos.push(todoToInsert);
    return todoToInsert;
  }

  truncate() {
    this.todos = [];
  }
}
