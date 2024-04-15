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
    return result.rows.map((todo) => this.toCamelCase(todo));
  }

  async getById(id: number): Promise<Todo | undefined> {
    const queryText =
      'SELECT id, description, is_complete FROM todos WHERE id = $1';
    const result = await this.db.query(queryText, [id]);
    if (result.rows.length > 0) {
      return this.toCamelCase(result.rows[0]);
    }
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

  async update(id: number, data: UpdateTodoDto): Promise<Todo | undefined> {
    let queryText = 'UPDATE todos SET ';
    let values: any[] = [id];
    if (data.description && data.isComplete !== undefined) {
      queryText += 'description = $2, is_complete = $3';
      values.push(data.description, data.isComplete);
    } else if (data.description && data.isComplete === undefined) {
      queryText += 'description = $2';
      values.push(data.description);
    } else {
      queryText += 'is_complete = $2';
      values.push(data.isComplete);
    }
    queryText += ' WHERE id = $1 RETURNING *';
    const result = await this.db.query(queryText, values);
    if (result.rows.length > 0) {
      return this.toCamelCase(result.rows[0]);
    }
  }

  async delete(id: number): Promise<void> {
    const queryText = 'DELETE FROM todos WHERE id = $1';
    await this.db.query(queryText, [id]);
  }

  async truncate(): Promise<void> {
    const queryText = 'TRUNCATE TABLE todos;';
    await this.db.query(queryText);
  }
}
