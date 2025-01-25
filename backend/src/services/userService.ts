import { CreateUserDTO, userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";

export const userService = {
  async create(userData: CreateUserDTO): Promise<string> {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    await userRepository.create({ ...userData, password: hashedPassword });

    return "User created successfully";
  },
};
