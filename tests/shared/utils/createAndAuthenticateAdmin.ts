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
  const adminToCreate = {
    email: 'titisauadmin@gmail.com',
    password: 'SantaCruz@123',
  };
  if (admin) {
    adminToCreate.email = admin.email;
    adminToCreate.password = admin.password;
  }
  const user = await prisma.user.create({
    data: {
      email: adminToCreate.email,
      password: await hashPassword(adminToCreate.password),
      type: 'ADMIN',
    },
  });

  const response = await request(app).post('/sessions').send({
    email: adminToCreate.email,
    password: adminToCreate.password,
  });

  return {
    email: adminToCreate.email,
    password: adminToCreate.password,
    id: user.id,
    accessToken: response.body.data,
  };
};
