import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwtUtils";
import { User } from "@prisma/client";

interface AuthResponse {
  user: Omit<User, "password">;
  token: string;
}

export const authService = {
  async authenticate(email: string, password: string): Promise<AuthResponse> {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken({ id: user.id, email: user.email });

    return {
      user,
      token,
    };
  },
};
