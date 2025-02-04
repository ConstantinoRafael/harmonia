import { Request, Response } from "express";
import { registrationService } from "../services/registrationService";

export const registrationController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, telefone, birthday, workshopIds } = req.body;

      if (!name || !email || !telefone || !birthday || !workshopIds?.length) {
        res.status(400).json({ message: "Todos os campos são obrigatórios!" });
        return;
      }

      const registration = await registrationService.createRegistration(
        name,
        email,
        telefone,
        birthday,
        workshopIds
      );

      res.status(201).json(registration);
    } catch (error: any) {
      console.error("Erro ao criar inscrição:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  },

  getByUserId: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      if (isNaN(userId)) {
        res.status(400).json({ message: "ID inválido." });
        return;
      }

      const registrations = await registrationService.getRegistrationsByUser(
        userId
      );
      if (!registrations || registrations.workshops.length === 0) {
        res.status(404).json({ message: "Nenhuma inscrição encontrada." });
        return;
      }

      res.json(registrations);
    } catch (error: any) {
      console.error("Erro ao buscar inscrições:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  },
};
