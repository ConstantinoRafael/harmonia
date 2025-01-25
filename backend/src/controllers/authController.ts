import { Request, Response } from "express";
import { authService } from "../services/authService";

export const authController = {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const authResponse = await authService.authenticate(email, password);
      res.json(authResponse);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  },
};
