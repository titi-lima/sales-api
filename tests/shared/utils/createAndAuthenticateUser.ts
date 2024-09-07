import request from 'supertest';
import app from '../../../src/app';
import type { ICreateUserDTO } from '../../../src/DTOs/user/create';

export const createAndAuthenticateUser = async (user?: ICreateUserDTO) => {
  const userToCreate: ICreateUserDTO = {
    name: 'Tiago Lima',
    email: 'titisau@gmail.com',
    password: 'SantaCruz@123',
    address: 'Rua da Santa Cruz, 413',
    contact: '+55 81 98158-1826',
  };

  if (user) {
    userToCreate.email = user.email;
    userToCreate.password = user.password;
    userToCreate.name = user.name;
    userToCreate.address = user.address;
    userToCreate.contact = user.contact;
  }

  await request(app).post('/users').send(userToCreate);

  const response = await request(app).post('/sessions').send({
    email: 'titisau@gmail.com',
    password: 'SantaCruz@123',
  });

  return response.body.data;
};
