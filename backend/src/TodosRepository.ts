import { NewTodoDto, Todo, UpdateTodoDto } from './types';

export class TodosRepository {
  db: any;

  constructor(db: any) {
    this.db = db;
  }

  getAll() {
    return;
  }

  getById(id: number) {
    return;
  }

  create(newTodo: NewTodoDto) {
    return;
  }

  update(id: number, data: UpdateTodoDto) {
    return;
  }

  delete(id: number) {
    return;
  }

  truncate() {
    return;
  }
}
