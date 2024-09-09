import request from 'supertest';
import { createAndAuthenticateUser } from '../shared/utils/createAndAuthenticateUser';
import { type ICreateUserDTO } from '../../src/DTOs/user/create';
import app from '../../src/app';

import { connection } from '../shared/config/database.config';
import { createAndAuthenticateAdmin } from '../shared/utils/createAndAuthenticateAdmin';
import { MOCK_USERS } from '../shared/constants/user';

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
    const response = await request(app).post('/users').send(MOCK_USERS[0]);
    expect(response.status).toBe(201);
  });

  it('should not create a user with an existing email', async () => {
    await request(app).post('/users').send(MOCK_USERS[0]);

    const response = await request(app).post('/users').send(MOCK_USERS[0]);
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message', 'User already exists.');
  });

  it('should not be able to create a user with an invalid email', async () => {
    const userToCreateWithInvalidEmail = {
      ...MOCK_USERS[0],
      email: 'titisau',
    };

    const response = await request(app)
      .post('/users')
      .send(userToCreateWithInvalidEmail);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid email');
  });

  it('should not be able to create a user without email', async () => {
    const userToCreateWithoutEmail = { ...MOCK_USERS[0], email: undefined };

    const response = await request(app)
      .post('/users')
      .send(userToCreateWithoutEmail);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Email is required');
  });

  it('should be able to update a user', async () => {
    const user = await createAndAuthenticateUser();
    const fieldsToUpdate: Partial<ICreateUserDTO> = {
      email: 'tmsl@cin.ufpe.br',
      password: 'SantaCruz@1914',
    };
    const response = await request(app)
      .patch(`/users/${user.id}`)
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send(fieldsToUpdate);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'User updated successfully.',
    );
    expect(response.body).toHaveProperty('data');
  });

  it('should not be able to update a user you do not own', async () => {
    const user = await createAndAuthenticateUser();
    const otherUser = await request(app).post('/users').send(MOCK_USERS[1]);
    const fieldsToUpdate: Partial<ICreateUserDTO> = {
      email: 'tmsl@cin.ufpe.br',
      password: 'SantaCruz@1914',
    };
    const response = await request(app)
      .patch(`/users/${otherUser.body.data.id}`)
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send(fieldsToUpdate);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty(
      'message',
      "You can not access another user's data.",
    );
  });

  it('should allow admin to update any user', async () => {
    const admin = await createAndAuthenticateAdmin();
    const otherUser = await request(app).post('/users').send(MOCK_USERS[1]);
    const fieldsToUpdate: Partial<ICreateUserDTO> = {
      email: 'tmsl@cin.ufpe.br',
      password: 'SantaCruz@1914',
    };
    const response = await request(app)
      .patch(`/users/${otherUser.body.data.id}`)
      .set('Authorization', `Bearer ${admin.accessToken}`)
      .send(fieldsToUpdate);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'User updated successfully.',
    );
    expect(response.body).toHaveProperty('data');
  });
  it('should be able to delete a user', async () => {
    const user = await createAndAuthenticateUser();
    const response = await request(app)
      .delete(`/users/${user.id}`)
      .set('Authorization', `Bearer ${user.accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'User deleted successfully.',
    );
  });

  it('should not be able to delete a user you do not own', async () => {
    const user = await createAndAuthenticateUser();
    const otherUser = await request(app).post('/users').send(MOCK_USERS[1]);
    console.log(otherUser.body);
    const response = await request(app)
      .delete(`/users/${otherUser.body.data.id}`)
      .set('Authorization', `Bearer ${user.accessToken}`);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty(
      'message',
      "You can not access another user's data.",
    );
  });

  it('should allow admin to delete any user', async () => {
    const admin = await createAndAuthenticateAdmin();
    const otherUser = await request(app).post('/users').send(MOCK_USERS[1]);
    const response = await request(app)
      .delete(`/users/${otherUser.body.data.id}`)
      .set('Authorization', `Bearer ${admin.accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'User deleted successfully.',
    );
  });

  it('should not be able to find all users without admin', async () => {
    const user = await createAndAuthenticateUser();
    await request(app).post('/users').send(MOCK_USERS[1]);
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${user.accessToken}`);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message', 'Forbidden.');
  });

  it('should be able to find all users with admin', async () => {
    const admin = await createAndAuthenticateAdmin();
    await request(app).post('/users').send(MOCK_USERS[0]);
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${admin.accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Users found.');
    expect(response.body).toHaveProperty('data');
  });

  it('should be able to filter clients by email', async () => {
    const admin = await createAndAuthenticateAdmin();
    await request(app).post('/users').send(MOCK_USERS[0]);
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${admin.accessToken}`)
      .query({ email: 'titisau' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Users found.');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.length).toBe(1);
  });
});
