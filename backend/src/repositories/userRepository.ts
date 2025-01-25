import { User } from "@prisma/client";
import prisma from "../config/db";

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export const userRepository = {
  async create(userData: CreateUserDTO): Promise<User> {
    return prisma.user.create({ data: userData });
  },

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  },
};
