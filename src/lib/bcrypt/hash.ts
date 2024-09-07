import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const ROUNDS = 6;
  return bcrypt.hash(password, ROUNDS);
};
