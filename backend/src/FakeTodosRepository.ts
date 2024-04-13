import { NewTodoDto, Todo, UpdateTodoDto } from './types';

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
    const newId = this.todos.length
      ? this.todos[this.todos.length - 1].id + 1
      : 1;
    const todoToInsert = { ...newTodo, id: newId };
    this.todos.push(todoToInsert);
    return todoToInsert;
  }

  update(id: number, data: UpdateTodoDto) {
    let todoToUpdateIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoToUpdateIndex >= 0) {
      if (data.description !== undefined) {
        this.todos[todoToUpdateIndex].description = data.description;
      }
      if (data.isComplete !== undefined) {
        this.todos[todoToUpdateIndex].isComplete = data.isComplete;
      }
    }
    return this.todos[todoToUpdateIndex];
  }

  delete(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  truncate() {
    this.todos = [];
  }
}
