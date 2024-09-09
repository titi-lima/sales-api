import { type ICreateUserDTO } from '../../../src/DTOs/user/create';

export const MOCK_USERS: ICreateUserDTO[] = [
  {
    name: 'Tiago Lima',
    email: 'titisau@gmail.com',
    password: 'SantaCruz@123',
    address: 'Rua da Santa Cruz, 413',
    contact: '+55 81 98158-1826',
  },
  {
    name: 'Paulo Dybala',
    email: 'dybala@gmail.com',
    password: 'Juventus@123',
    address: 'Corso Gaetano Scirea, 50, 10151 Torino TO, Italy',
    contact: '+39 00 12345678',
  },
];
