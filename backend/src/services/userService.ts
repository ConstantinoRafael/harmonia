import { Prisma, User } from "@prisma/client";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";

export const userService = {
  async create(userData: Prisma.UserCreateInput): Promise<User> {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    if (!userData.password) {
      throw new Error("Password is required");
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return newUser;
  },

  async getUserWorkshops(userId: number) {
    const userData = await userRepository.findUserWorkshops(userId);

    if (!userData) {
      throw new Error("User not found");
    }

    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      workshops: userData.registrations.flatMap((reg) =>
        reg.workshops.map((w) => w.workshop)
      ),
    };
  },

  async getAllUsersWithWorkshopCount() {
    const users = await userRepository.findAllUsersWithWorkshopCount();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      workshopCount: new Set(
        user.registrations.flatMap((r) => r.workshops.map((w) => w.workshopId))
      ).size, // Conta workshops únicos
    }));
  },
};
