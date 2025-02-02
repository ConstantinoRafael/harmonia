import { Prisma, Workshop } from "@prisma/client";
import { workshopRepository } from "../repositories/workshopRepository";

export const workshopService = {
  async create(workshopData: Prisma.WorkshopCreateInput): Promise<Workshop> {
    return workshopRepository.create(workshopData);
  },

  async getById(id: string): Promise<Workshop | null> {
    return workshopRepository.findById(id);
  },

  async getAll(): Promise<Workshop[]> {
    return workshopRepository.findAll();
  },

  async update(
    id: string,
    workshopData: Prisma.WorkshopUpdateInput
  ): Promise<Workshop> {
    const existingWorkshop = await workshopRepository.findById(id);
    if (!existingWorkshop) {
      throw new Error("Workshop não encontrado!");
    }

    return workshopRepository.update(id, workshopData);
  },

  async delete(id: string): Promise<void> {
    const existingWorkshop = await workshopRepository.findById(id);
    if (!existingWorkshop) {
      throw new Error("Workshop não encontrado!");
    }

    return workshopRepository.delete(id);
  },
};
