import { Request, Response } from "express";
import { userService } from "../services/userService";

export const userController = {
  async create(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    try {
      const { phone, birthday } = req.body;
      const newUser = await userService.create({
        name,
        email,
        password,
        phone,
        birthday,
      });

      const { password: _, ...userWithoutPassword } = newUser;

      res.status(201).send(userWithoutPassword);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  },
};
