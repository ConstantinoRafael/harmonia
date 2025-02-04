import { Request, Response } from "express";
import { registrationService } from "../services/registrationService";

export const registrationController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      let { name, email, phone, birthday, workshopIds } = req.body;

      if (!name || !email || !phone || !birthday || !workshopIds?.length) {
        res.status(400).json({ message: "Todos os campos são obrigatórios!" });
        return;
      }

      // Converte a string "DD/MM/YYYY" para um objeto Date
      const parts = birthday.split("/");
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Mês começa do 0 no JS
        const year = parseInt(parts[2], 10);
        birthday = new Date(year, month, day);
      } else {
        res.status(400).json({ message: "Formato de data inválido!" });
        return;
      }

      if (isNaN(birthday.getTime())) {
        res.status(400).json({ message: "Data de nascimento inválida!" });
        return;
      }

      const registration = await registrationService.createRegistration(
        name,
        email,
        phone,
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
