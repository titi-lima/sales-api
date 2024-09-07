import request from 'supertest';
import { type ICreateUserDTO } from '../../src/DTOs/user/create';
import app from '../../src/app';

import { connection } from '../shared/config/database.config';

// you need to be running the back-end for this test to work
// because it tests the database (run "docker-compose up")

describe('Session', () => {
  beforeAll(async () => {
    connection.create();
  });

  beforeEach(async () => connection.clear());

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  it('should sign in a user', async () => {
    const userToCreate: ICreateUserDTO = {
      name: 'Tiago Lima',
      email: 'titisau@gmail.com',
      password: 'SantaCruz@123',
      address: 'Rua da Santa Cruz, 413',
      contact: '+55 81 98158-1826',
    };

    await request(app).post('/users').send(userToCreate);

    const response = await request(app).post('/sessions').send({
      email: 'titisau@gmail.com',
      password: 'SantaCruz@123',
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Login successful.');
    expect(response.body).toHaveProperty('data');
  });

  it('should not sign in a user with invalid credentials', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'titisau@gmail.com',
      password: 'SantaCruz@123',
    });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid credentials.');
  });
});
