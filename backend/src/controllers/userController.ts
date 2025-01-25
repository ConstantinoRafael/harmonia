import { Request, Response } from "express";
import { userService } from "../services/userService";

export const userController = {
  async create(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    try {
      const message = await userService.create({ name, email, password });
      res.status(201).send({ message });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  },
};
