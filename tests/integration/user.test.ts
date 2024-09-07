import request from 'supertest';
import { type ICreateUserDTO } from '../../src/DTOs/user/create';
import app from '../../src/app';

import { connection } from '../shared/config/database.config';

// you need to be running the back-end for this test to work
// because it tests the database (run "docker-compose up")

describe('User', () => {
  beforeAll(async () => {
    connection.create();
  });

  beforeEach(async () => connection.clear());

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  it('should create a user', async () => {
    const userToCreate: ICreateUserDTO = {
      name: 'Tiago Lima',
      email: 'titisau@gmail.com',
      password: 'SantaCruz@123',
      address: 'Rua da Santa Cruz, 413',
      contact: '+55 81 98158-1826',
    };

    const response = await request(app).post('/users').send(userToCreate);
    expect(response.status).toBe(201);
  });

  it('should not create a user with an existing email', async () => {
    const userToCreate: ICreateUserDTO = {
      name: 'Tiago Lima',
      email: 'titisau@gmail.com',
      password: 'SantaCruz@123',
      address: 'Rua da Santa Cruz, 413',
      contact: '+55 81 98158-1826',
    };

    await request(app).post('/users').send(userToCreate);

    const response = await request(app).post('/users').send(userToCreate);
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message', 'User already exists.');
  });

  it('should not be able create a user with an invalid email', async () => {
    const userToCreate: ICreateUserDTO = {
      name: 'Tiago Lima',
      email: 'titisau',
      password: 'SantaCruz@123',
      address: 'Rua da Santa Cruz, 413',
      contact: '+55 81 98158-1826',
    };

    const response = await request(app).post('/users').send(userToCreate);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid email');
  });

  it('should not be able create a user without email', async () => {
    const userToCreate: Omit<ICreateUserDTO, 'email'> = {
      name: 'Tiago Lima',
      password: 'SantaCruz@123',
      address: 'Rua da Santa Cruz, 413',
      contact: '+55 81 98158-1826',
    };

    const response = await request(app).post('/users').send(userToCreate);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Email is required');
  });
});
