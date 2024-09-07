import bcrypt from 'bcryptjs';

export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => bcrypt.compare(password, hashedPassword);
