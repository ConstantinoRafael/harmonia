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

  async getUserWorkshops(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);

    if (isNaN(userId)) {
      res.status(400).json({ error: "Invalid userId" });
    }

    try {
      const userData = await userService.getUserWorkshops(userId);
      res.json(userData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user workshops" });
    }
  },

  async getAllUsersWithWorkshopCount(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsersWithWorkshopCount();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users list" });
    }
  },

  async getUserWorkshopsByEmail(req: Request, res: Response) {
    const { email } = req.query;

    if (!email || typeof email !== "string") {
      res.status(400).json({ error: "Invalid or missing email parameter" });
    }

    try {
      if (typeof email === "string") {
        const userData = await userService.getUserWorkshopsByEmail(email);
        res.json(userData);
      } else {
        res.status(400).json({ error: "Invalid email parameter" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user workshops" });
    }
  },
};
