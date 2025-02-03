import { Request, Response } from "express";
import { workshopService } from "../services/workshopService";

export const workshopController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const newWorkshop = await workshopService.create(req.body);
      res.status(201).json(newWorkshop);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const workshop = await workshopService.getById(Number(req.params.id));
      if (!workshop) {
        res.status(404).json({ message: "Workshop não encontrado!" });
        return;
      }
      res.json(workshop);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const isInfantojuvenil =
        req.query.isInfantojuvenil === "true"
          ? true
          : req.query.isInfantojuvenil === "false"
          ? false
          : undefined;
      const workshops = await workshopService.getAll(isInfantojuvenil);
      res.json(workshops);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      const updatedWorkshop = await workshopService.update(
        Number(req.params.id),
        req.body
      );
      res.json(updatedWorkshop);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await workshopService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};
