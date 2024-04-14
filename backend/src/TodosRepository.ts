import pg from 'pg';
import { NewTodoDto, Todo, UpdateTodoDto } from './types';

interface TodoResult {
  id: number;
  description: string;
  is_complete: boolean;
}

export class TodosRepository {
  db: pg.Client;

  constructor(db: pg.Client) {
    this.db = db;
  }

  toCamelCase(result: TodoResult): Todo {
    return {
      id: result.id,
      description: result.description,
      isComplete: result.is_complete,
    };
  }

  async getAll() {
    const queryText = 'SELECT id, description, is_complete FROM todos;';
    const result = await this.db.query(queryText);
    return result.rows;
  }

  getById(id: number) {
    return;
  }

  async create(newTodo: NewTodoDto) {
    const queryText =
      'INSERT INTO todos (description, is_complete) VALUES ($1, $2) RETURNING id, description, is_complete;';
    const result = await this.db.query(queryText, [
      newTodo.description,
      newTodo.isComplete,
    ]);
    return this.toCamelCase(result.rows[0]);
  }

  update(id: number, data: UpdateTodoDto) {
    return;
  }

  delete(id: number) {
    return;
  }

  async truncate(): Promise<void> {
    const queryText = 'TRUNCATE TABLE todos;';
    await this.db.query(queryText);
  }
}
