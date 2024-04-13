import pg from 'pg';
import { beforeAll, describe, expect, test } from 'vitest';
import { TodosRepository } from '../src/TodosRepository';

describe('Todos repository', () => {
  let repository: TodosRepository;

  beforeAll(async () => {
    const { Client } = pg;
    const client = new Client({
      user: process.env.VITE_PGUSER,
      password: process.env.VITE_PGPASSWORD,
      host: process.env.PGHOST,
      port: process.env.PGPORT as unknown as number,
    });
    await client.connect();
    const result = await client.query(
      'CREATE TABLE IF NOT EXISTS todos (id serial, description VARCHAR(255), is_complete boolean);'
    );
    console.log(result.rows);
    repository = new TodosRepository(client);
  });

  test('Empty table returns empty array', async () => {
    expect(await repository.getAll()).toEqual([]);
  });
});
