import { Prisma, User } from "@prisma/client";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";

export const userService = {
  async create(userData: Prisma.UserCreateInput): Promise<User> {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return newUser;
  },
};
