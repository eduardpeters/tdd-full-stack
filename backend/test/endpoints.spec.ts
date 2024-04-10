import { expect, test } from 'vitest';
import supertest from 'supertest';
import { app } from '../src/index';

test('Server app responds', async () => {
  const response = await supertest(app).get('/').expect(200);

  console.log(response);
  expect(response.body).toBeTruthy();
});
