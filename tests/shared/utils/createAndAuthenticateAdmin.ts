import request from 'supertest';
import { hashPassword } from '../../../src/lib/bcrypt/hash';
import { prisma } from '../../../src/lib/prisma/db';
import app from '../../../src/app';

type AdminUser = {
  email: string;
  password: string;
  id: string;
};

type Return = AdminUser & { accessToken: string };

export const createAndAuthenticateAdmin = async (admin?: {
  email: string;
  password: string;
}): Promise<Return> => {
  const userToCreate = {
    email: 'titisau+admin@gmail.com',
    password: 'SantaCruz@123',
  };
  if (admin) {
    userToCreate.email = admin.email;
    userToCreate.password = admin.password;
  }
  const user = await prisma.user.create({
    data: {
      email: userToCreate.email,
      password: await hashPassword(userToCreate.password),
      type: 'ADMIN',
    },
  });

  const response = await request(app).post('/sessions').send({
    email: userToCreate.email,
    password: userToCreate.password,
  });

  return {
    email: userToCreate.email,
    password: userToCreate.password,
    id: user.id,
    accessToken: response.body.data,
  };
};
