import { Prisma, User } from "@prisma/client";
import prisma from "../config/db";

export const userRepository = {
  async create(userData: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data: userData });
  },

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  },
};
