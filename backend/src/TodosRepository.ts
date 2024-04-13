import pg from 'pg';
import { NewTodoDto, Todo, UpdateTodoDto } from './types';

export class TodosRepository {
  db: pg.Client;

  constructor(db: pg.Client) {
    this.db = db;
  }

  async getAll() {
    const queryText = 'SELECT (id, description, is_complete) FROM todos;';
    const result = await this.db.query(queryText);
    return result.rows;
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
