import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const omitPassword = (user: User): User => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
